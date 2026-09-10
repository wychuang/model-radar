import { buildValueFrontier } from "./model-frontier.mjs";

export function initValueFrontier(snapshot) {
  const host = document.querySelector("#value-frontier");
  const field = host.querySelector(".frontier-field");
  const budget = host.querySelector("#frontier-budget");
  const minimum = host.querySelector("#frontier-minimum");
  const picker = host.querySelector("#frontier-model");
  const initial = buildValueFrontier(snapshot);
  const missing = host.querySelector("#frontier-missing");
  missing.textContent = initial.missing.length
    ? `暂不参战：${initial.missing.map((row) => `${row.name}（${[
      !Number.isFinite(row.price) || row.price < 0 ? "价格待确认" : null,
      !Number.isFinite(row.intelligence) ? "智能分数待确认" : null
    ].filter(Boolean).join("、")}）`).join("、")}。`
    : "所有收录模型都有可比数据。";
  if (!initial.comparable.length) {
    host.querySelector("#frontier-counts").textContent = "0 个可比较 · 等待补充证据";
    for (const selector of [".frontier-controls", ".frontier-chart", ".frontier-legend", "#frontier-shortlist"]) {
      host.querySelector(selector).hidden = true;
    }
    host.querySelector("#frontier-inspector").textContent = "还没有同时具备价格和智能分数的模型。";
    return;
  }
  const maxPrice = Math.max(1, Math.ceil(Math.max(...initial.comparable.map((row) => row.price)) / 10) * 10);
  const minIntel = Math.floor(Math.min(...initial.comparable.map((row) => row.intelligence)) / 10) * 10;
  const maxIntel = Math.max(minIntel + 10, Math.ceil(Math.max(...initial.comparable.map((row) => row.intelligence)) / 10) * 10);
  const x = (price) => Math.log1p(price) / Math.log1p(maxPrice) * 100;
  const y = (intel) => (maxIntel - intel) / (maxIntel - minIntel) * 100;
  budget.max = String(maxPrice);
  budget.value = String(maxPrice);
  minimum.min = String(minIntel);
  minimum.max = String(maxIntel);
  minimum.value = String(minIntel);
  let selectedId = initial.frontier[0].id;

  // The field is built once: filtering and selection never move model coordinates.
  for (let value = minIntel; value <= maxIntel; value += 10) {
    const line = element("div", "frontier-gridline");
    line.style.top = `${y(value)}%`;
    line.append(element("span", "", String(value)));
    field.append(line);
  }
  for (const value of [...new Set([0, 1, 5, 10, 25, maxPrice])].filter((value) => value <= maxPrice)) {
    const tick = element("span", "frontier-price-tick", `$${value}`);
    tick.style.left = `${x(value)}%`;
    field.append(tick);
  }
  const zone = element("div", "frontier-zone");
  zone.setAttribute("aria-hidden", "true");
  field.append(zone);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("frontier-line");
  const path = document.createElementNS(svg.namespaceURI, "polyline");
  path.setAttribute("points", initial.frontier.map((row) => `${x(row.price)},${y(row.intelligence)}`).join(" "));
  path.setAttribute("vector-effect", "non-scaling-stroke");
  svg.append(path);
  field.append(svg);

  const buttons = new Map();
  for (const row of initial.comparable) {
    const provider = snapshot.providers?.find((item) => item.id === row.providerId);
    const button = element("button", "frontier-dot");
    button.type = "button";
    button.style.left = `${x(row.price)}%`;
    button.style.top = `${y(row.intelligence)}%`;
    button.style.setProperty("--dot-color", row.accent ?? provider?.accent ?? "#cfff26");
    button.dataset.side = x(row.price) > 65 ? "left" : "right";
    button.dataset.frontier = String(!row.dominatedBy.length);
    button.setAttribute("aria-label", `${row.name}，智力 ${row.intelligence}，输出价 $${row.price}，${row.dominatedBy.length ? "有更优替代" : "性价比前沿"}`);
    button.append(element("span", "frontier-dot-label", `${row.name} · ${row.intelligence} / $${row.price}`));
    button.addEventListener("click", () => { selectedId = row.id; render(); });
    field.append(button);
    buttons.set(row.id, button);
    const option = element("option", "", row.name);
    option.value = row.id;
    picker.append(option);
  }

  function render() {
    const result = buildValueFrontier(snapshot, { budget: Number(budget.value), minIntelligence: Number(minimum.value) });
    const selected = result.comparable.find((row) => row.id === selectedId);
    picker.value = selectedId;
    host.querySelector("#frontier-budget-value").textContent = `$${budget.value}`;
    host.querySelector("#frontier-minimum-value").textContent = `${minimum.value} 分`;
    host.querySelector("#frontier-counts").textContent = `${result.comparable.length} 个可比较 · ${result.frontier.length} 个在前沿 · ${result.comparable.length - result.frontier.length} 个有更优替代`;
    for (const row of result.comparable) {
      const button = buttons.get(row.id);
      button.dataset.filtered = String(!row.withinBudget);
      button.setAttribute("aria-pressed", String(row.id === selectedId));
    }
    zone.style.left = `${x(selected.price)}%`;
    zone.style.top = `${y(selected.intelligence)}%`;
    zone.style.width = `${100 - x(selected.price)}%`;
    zone.style.height = `${100 - y(selected.intelligence)}%`;

    const inspector = host.querySelector("#frontier-inspector");
    const rival = result.comparable.find((row) => row.id === selected.dominatedBy[0]);
    const killed = result.comparable.filter((row) => row.dominatedBy.includes(selectedId));
    const status = rival ? "被斩杀了 · 有更优替代" : "守住前沿 · 这个价位有优势";
    const note = rival
      ? `${rival.name} 每百万输出 tokens 便宜 $${number(selected.price - rival.price)}，智能${rival.intelligence === selected.intelligence ? "相同" : `高 ${number(rival.intelligence - selected.intelligence)} 分`}。`
      : `在这批模型中，没有模型能以更低价格提供同等智能，或同价提供更高智能。它可以斩杀 ${killed.length} 个模型。`;
    inspector.replaceChildren(element("small", "frontier-verdict", status), element("h3", "", selected.name),
      element("p", "frontier-values", `${selected.intelligence} 分 / $${selected.price}`), element("p", "", note));
    if (!selected.withinBudget) inspector.append(element("p", "frontier-filter-note", "这个模型超出你的预算或未达到最低智能。"));
    const alternatives = rival ? selected.dominatedBy : killed.map((row) => row.id);
    if (alternatives.length) {
      const links = element("div", "frontier-alternatives");
      links.append(element("small", "", rival ? "看看更优替代" : "被它斩杀的模型"));
      for (const id of alternatives) {
        const row = result.comparable.find((item) => item.id === id);
        const button = element("button", "", row.name);
        button.type = "button";
        button.addEventListener("click", () => { selectedId = id; render(); picker.focus(); });
        links.append(button);
      }
      inspector.append(links);
    }
    const evidence = element("div", "frontier-evidence");
    const measurement = selected.benchmarks["aa-index"];
    for (const [label, sourceId] of [[`AA v${measurement.version ?? "?"} · 读取 ${measurement.asOf}`, measurement.sourceId],
      [`价格来源 · 核实 ${selected.priceUsd.asOf ?? "日期未知"}`, selected.priceUsd.sourceId]]) {
      const source = snapshot.sources?.find((item) => item.id === sourceId);
      if (!source) continue;
      const link = element("a", "", `${label} ↗`);
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      evidence.append(link);
    }
    inspector.append(evidence);
    if (selected.priceUsd.note) inspector.append(element("p", "frontier-price-note", selected.priceUsd.note));

    const shortlist = host.querySelector("#frontier-shortlist");
    shortlist.replaceChildren(element("strong", "", result.shortlist.length ? `预算内，优先看这 ${result.shortlist.length} 个` : "当前条件下没有匹配模型"));
    for (const row of result.shortlist) {
      const button = element("button", "", `${row.name} · ${row.intelligence} 分 / $${row.price}`);
      button.type = "button";
      button.addEventListener("click", () => { selectedId = row.id; render(); picker.focus(); });
      shortlist.append(button);
    }
    if (!result.shortlist.length) shortlist.append(element("span", "", "试着提高预算，或调低最低智能。"));
  }

  budget.addEventListener("input", render);
  minimum.addEventListener("input", render);
  picker.addEventListener("change", () => { selectedId = picker.value; render(); });
  render();
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function number(value) {
  return String(Number(value.toFixed(3)));
}
