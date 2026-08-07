import {
  buildRadarViewModel,
  formatMetricValue,
  formatTokenWindow,
  getBenchmarkMetric,
  getMetricMeasurement,
  metricCoverage,
  rankModelsByMetric,
  sourceFreshnessLabel
} from "./model-radar.mjs";
import { modelRadarSnapshot } from "./model-radar-snapshot.mjs";
import {
  clockStatusLabel,
  eventStatusLabel,
  isoShortDate,
  metricBarStyle,
  shortDate
} from "./ui-helpers.mjs";

const today = new Date();
const view = buildRadarViewModel(modelRadarSnapshot, today);
const primaryMetrics = view.benchmarks.filter((metric) => metric.radar !== false);
const specialistMetrics = view.benchmarks.filter((metric) => metric.radar === false);
const initialMetricId = primaryMetrics[0]?.id ?? null;
const initialRanking = initialMetricId ? rankModelsByMetric(modelRadarSnapshot, initialMetricId) : [];
const initialLeader = initialRanking.find((row) => Number.isFinite(row.metricValue));

const state = {
  metricId: initialMetricId,
  selectedId: initialLeader?.id ?? view.models[0]?.id ?? null
};

const elements = {
  snapshotDate: document.querySelector("#snapshot-date"),
  refreshDate: document.querySelector("#refresh-date"),
  leaderStory: document.querySelector("#leader-story"),
  metricTabs: document.querySelector("#metric-tabs"),
  glanceEvents: document.querySelector("#glance-events"),
  coverageReadout: document.querySelector("#coverage-readout"),
  rankingList: document.querySelector("#ranking-list"),
  modelInspector: document.querySelector("#model-inspector"),
  viewStatus: document.querySelector("#view-status"),
  eventList: document.querySelector("#event-list"),
  releaseClocks: document.querySelector("#release-clocks"),
  sourceList: document.querySelector("#source-list"),
  methodNotes: document.querySelector("#method-notes")
};

function init() {
  elements.snapshotDate.textContent = view.asOfLabel;
  elements.refreshDate.textContent = `checked ${view.refreshedLabel}`;
  renderMetricTabs();
  renderGlanceEvents();
  renderMetricWorkspace();
  renderEvents();
  renderReleaseClocks();
  renderSources();
  renderNotes();
}

function renderMetricTabs() {
  const tabs = primaryMetrics.map((metric, index) => {
    const button = createElement("button", "metric-tab");
    button.type = "button";
    button.id = `v2-metric-${metric.id}`;
    button.role = "tab";
    button.dataset.metricId = metric.id;
    button.setAttribute("aria-controls", "ranking-list");
    button.setAttribute("aria-selected", String(metric.id === state.metricId));
    button.tabIndex = metric.id === state.metricId ? 0 : -1;
    button.append(
      createElement("span", "metric-index", String(index + 1).padStart(2, "0")),
      createElement("strong", "", metric.displayLabel),
      createElement("small", "", metric.shortLabel)
    );
    button.addEventListener("click", () => selectMetric(metric.id, true));
    button.addEventListener("keydown", (event) => moveMetricFocus(event, index));
    return button;
  });

  elements.metricTabs.replaceChildren(...tabs);
}

function moveMetricFocus(event, index) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();

  let nextIndex = index;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = primaryMetrics.length - 1;
  if (event.key === "ArrowLeft") nextIndex = (index - 1 + primaryMetrics.length) % primaryMetrics.length;
  if (event.key === "ArrowRight") nextIndex = (index + 1) % primaryMetrics.length;

  const nextMetric = primaryMetrics[nextIndex];
  selectMetric(nextMetric.id, false);
  document.querySelector(`#v2-metric-${nextMetric.id}`)?.focus();
}

function selectMetric(metricId, announce) {
  if (metricId === state.metricId) return;
  state.metricId = metricId;

  for (const tab of elements.metricTabs.querySelectorAll("[role='tab']")) {
    const active = tab.dataset.metricId === metricId;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  }

  renderMetricWorkspace();

  if (announce) {
    const metric = getBenchmarkMetric(modelRadarSnapshot, metricId);
    const leader = rankModelsByMetric(modelRadarSnapshot, metricId).find((row) => Number.isFinite(row.metricValue));
    elements.viewStatus.textContent = leader
      ? `已切换到${metric.displayLabel}。当前领先：${leader.name}，${formatMetricValue(metric, leader.metricValue)}。`
      : `已切换到${metric.displayLabel}，暂无可比较数据。`;
  }
}

function renderMetricWorkspace() {
  const metric = getBenchmarkMetric(modelRadarSnapshot, state.metricId);
  if (!metric) return;

  const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
  renderLeaderStory(metric, ranking);
  renderCoverage(metric);
  renderRanking(metric, ranking);
  renderInspector(metric, ranking);
}

function renderLeaderStory(metric, ranking) {
  const coveredRows = ranking.filter((row) => Number.isFinite(row.metricValue));
  const leader = coveredRows[0];
  const runnerUp = coveredRows[1];
  const wrapper = document.createDocumentFragment();

  if (!leader) {
    wrapper.append(
      createElement("h1", "", "当前口径暂无可比数据"),
      createElement("p", "leader-summary", metric.description)
    );
    elements.leaderStory.replaceChildren(wrapper);
    return;
  }

  const provider = leader.provider?.name ?? leader.providerId;
  const title = createElement("h1");
  title.append(
    createElement("span", "leader-name", leader.name),
    createElement("span", "leader-verb", " 当前领先")
  );

  const scoreRow = createElement("div", "leader-score-row");
  scoreRow.append(
    createElement("strong", "leader-score", formatMetricValue(metric, leader.metricValue)),
    createElement("span", "leader-metric", `${metric.displayLabel} · ${metric.direction === "lower" ? "越低越优" : "越高越优"}`)
  );

  const summary = createElement("p", "leader-summary");
  summary.append(document.createTextNode(`${provider} · 测量日期 ${leader.measurement?.asOf ?? metric.asOf}`));
  if (runnerUp) {
    const gap = Math.abs(leader.metricValue - runnerUp.metricValue);
    const relation = metric.direction === "lower" ? "低于" : "领先";
    summary.append(document.createTextNode(` · ${relation} #2 ${formatMetricValue(metric, gap)}`));
  }

  wrapper.append(title, scoreRow, summary);
  elements.leaderStory.replaceChildren(wrapper);
}

function renderCoverage(metric) {
  const coverage = metricCoverage(modelRadarSnapshot, metric.id);
  const percent = Math.round(coverage.ratio * 100);
  const textBlock = createElement("span");
  textBlock.append(
    createElement("strong", "", `${coverage.covered}/${coverage.total}`),
    createElement("small", "", `覆盖 · ${percent}%`)
  );
  const meter = createElement("i", "coverage-meter");
  meter.style.setProperty("--coverage", `${percent}%`);
  meter.setAttribute("aria-hidden", "true");
  elements.coverageReadout.replaceChildren(textBlock, meter);
}

function renderRanking(metric, ranking) {
  const rows = ranking.map((model, index) => {
    const article = createElement("article", "ranking-row");
    article.role = "listitem";
    article.dataset.selected = String(model.id === state.selectedId);
    article.dataset.missing = String(!Number.isFinite(model.metricValue));

    const button = createElement("button", "ranking-select");
    button.type = "button";
    button.dataset.modelId = model.id;
    button.setAttribute("aria-pressed", String(model.id === state.selectedId));
    button.setAttribute("aria-label", rankingAriaLabel(model, metric));

    const rank = model.measurement?.rank ?? model.computedRank;
    const rankLabel = Number.isFinite(rank) ? `#${rank}` : "—";
    const providerAccent = model.provider?.accent ?? "#8b8b90";
    const modelName = createElement("span", "rank-model");
    const identity = createElement("span", "rank-identity");
    const marker = createElement("i", "provider-marker");
    marker.style.setProperty("--provider-accent", providerAccent);
    identity.append(
      marker,
      createElement("strong", "", model.name),
      createElement("small", "", `${model.provider?.name ?? model.providerId} · ${shortDate(model.releasedAt)}`)
    );
    modelName.append(identity);

    const evidence = createElement("span", "rank-evidence");
    evidence.append(
      createElement("b", qualifierLabel(model.measurement)),
      createElement("small", "", model.measurement?.asOf ?? metric.asOf)
    );

    const bar = createElement("span", "rank-bar");
    const fill = createElement("i");
    fill.setAttribute("style", metricBarStyle(model.metricValue, metric));
    bar.append(fill);

    const value = createElement("strong", "rank-value", formatMetricValue(metric, model.metricValue));
    button.append(createElement("span", "rank-number", rankLabel), modelName, evidence, bar, value);
    button.addEventListener("click", () => selectModel(model.id, false));
    button.addEventListener("keydown", (event) => moveModelFocus(event, index, ranking));
    article.append(button);
    return article;
  });

  elements.rankingList.replaceChildren(...rows);
}

function moveModelFocus(event, index, ranking) {
  if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
  event.preventDefault();

  let nextIndex = index;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = ranking.length - 1;
  if (event.key === "ArrowUp") nextIndex = Math.max(0, index - 1);
  if (event.key === "ArrowDown") nextIndex = Math.min(ranking.length - 1, index + 1);

  const nextModel = ranking[nextIndex];
  selectModel(nextModel.id, true);
  document.querySelector(`[data-model-id="${nextModel.id}"]`)?.focus();
}

function selectModel(modelId, fromKeyboard) {
  if (modelId === state.selectedId) return;
  state.selectedId = modelId;
  const metric = getBenchmarkMetric(modelRadarSnapshot, state.metricId);
  const ranking = rankModelsByMetric(modelRadarSnapshot, state.metricId);
  renderRanking(metric, ranking);
  renderInspector(metric, ranking);

  const model = view.models.find((item) => item.id === modelId);
  elements.viewStatus.textContent = `${model?.name ?? "模型"}详情已打开。`;

  if (!fromKeyboard && window.matchMedia("(max-width: 767px)").matches) {
    elements.modelInspector.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

function renderInspector(activeMetric, ranking) {
  const model = view.models.find((item) => item.id === state.selectedId) ?? view.models[0];
  if (!model) {
    elements.modelInspector.replaceChildren(createElement("p", "empty-state", "暂无模型数据"));
    return;
  }

  const provider = view.providers.find((item) => item.id === model.providerId);
  const activeRow = ranking.find((row) => row.id === model.id);
  const header = createElement("header", "inspector-header");
  const providerLine = createElement("div", "provider-line");
  const marker = createElement("i", "provider-marker");
  marker.style.setProperty("--provider-accent", provider?.accent ?? "#8b8b90");
  providerLine.append(marker, createElement("span", "", `${provider?.region ?? "—"} · ${provider?.name ?? model.providerId}`));
  header.append(
    providerLine,
    createElement("h2", "", model.name),
    createElement("p", "", model.posture)
  );
  header.querySelector("h2").id = "inspector-title";

  const activeScore = createElement("section", "active-evidence");
  const activeLabel = createElement("div");
  activeLabel.append(
    createElement("span", "", activeMetric.displayLabel),
    createElement("small", "", activeRow?.measurement?.asOf ?? activeMetric.asOf)
  );
  activeScore.append(
    activeLabel,
    createElement("strong", "", formatMetricValue(activeMetric, activeRow?.metricValue)),
    createElement("b", "evidence-badge", qualifierLabel(activeRow?.measurement))
  );
  const activeSource = sourceForMeasurement(activeRow?.measurement, activeMetric);
  if (activeSource && activeRow?.measurement) {
    activeScore.append(externalLink(activeSource.url, `打开 ${activeSource.label} 原始来源`, "source-jump", "查看原始来源 ↗"));
  }

  const facts = createElement("dl", "model-facts");
  const factRows = [
    ["RELEASE", isoShortDate(model.releasedAt)],
    ["CONTEXT", formatTokenWindow(model.contextTokens)],
    ["OUTPUT", formatTokenWindow(model.outputTokens)],
    ["PRICE IN / OUT", formatPricePair(model.priceUsd)]
  ];
  for (const [label, value] of factRows) {
    const group = createElement("div");
    group.append(createElement("dt", "", label), createElement("dd", "", value));
    facts.append(group);
  }

  const matrix = createElement("section", "metric-matrix");
  matrix.append(createElement("h3", "", "七项主口径 / Core evidence matrix"));
  const cells = createElement("div", "metric-cells");
  for (const metric of primaryMetrics) cells.append(renderMetricCell(model, metric));
  matrix.append(cells);

  const specialist = renderSpecialistEvidence(model);

  const watch = createElement("section", "model-watch");
  watch.append(createElement("span", "", "NEXT WATCH"), createElement("p", "", model.watch));

  const official = createElement("nav", "official-links");
  official.setAttribute("aria-label", `${model.name} 官方来源`);
  const officialSources = model.sourceRefs.map(sourceById).filter(Boolean);
  for (const source of officialSources) {
    official.append(externalLink(source.url, `打开 ${source.label}`, "", `${source.label} ↗`));
  }

  elements.modelInspector.replaceChildren(header, activeScore, facts, matrix, specialist, watch, official);
}

function renderSpecialistEvidence(model) {
  const section = createElement("section", "specialist-evidence");
  const measurements = specialistMetrics
    .map((metric) => ({ metric, measurement: getMetricMeasurement(model, metric) }))
    .filter((entry) => Number.isFinite(entry.measurement?.value));

  if (measurements.length === 0) {
    section.hidden = true;
    return section;
  }

  const heading = createElement("header", "specialist-heading");
  heading.append(
    createElement("h3", "", "专项实测 / Specialist evidence"),
    createElement("span", "", `${measurements.length} SCORES`)
  );
  const grid = createElement("div", "specialist-grid");

  for (const { metric, measurement } of measurements) {
    const source = sourceForMeasurement(measurement, metric);
    const item = createElement(source ? "a" : "div", "specialist-score");
    item.append(
      createElement("span", "", metric.shortLabel),
      createElement("strong", "", formatMetricValue(metric, measurement.value)),
      createElement("small", "", `${qualifierLabel(measurement)} · ${measurement.asOf ?? metric.asOf}`)
    );
    if (source) setExternalLink(item, source.url, `打开 ${metric.label} 原始来源`);
    grid.append(item);
  }

  section.append(heading, grid);
  return section;
}

function renderMetricCell(model, metric) {
  const measurement = getMetricMeasurement(model, metric);
  const source = sourceForMeasurement(measurement, metric);
  const content = createElement("div", "metric-cell-content");
  content.append(
    createElement("span", "", metric.shortLabel),
    createElement("strong", "", formatMetricValue(metric, measurement?.value)),
    createElement("small", "", `${qualifierLabel(measurement)} · ${measurement?.asOf ?? metric.asOf}`)
  );

  if (source && measurement) {
    const link = externalLink(source.url, `${metric.label} 原始来源`, "metric-cell");
    link.append(content);
    if (metric.id === state.metricId) link.dataset.active = "true";
    return link;
  }

  const cell = createElement("div", "metric-cell");
  cell.dataset.missing = String(!measurement);
  if (metric.id === state.metricId) cell.dataset.active = "true";
  cell.append(content);
  return cell;
}

function renderGlanceEvents() {
  const latestRelease = [...view.events]
    .filter((event) => event.status === "released")
    .sort((left, right) => new Date(right.date) - new Date(left.date))[0];
  const activeWatch = [...view.events]
    .filter((event) => event.status === "watch")
    .sort((left, right) => new Date(right.date) - new Date(left.date))[0];
  const urgentClock = view.providerClocks[0];
  const items = [];

  if (latestRelease) items.push(glanceEvent("NOW", latestRelease.label, latestRelease.detail, latestRelease.sourceId));
  if (activeWatch) items.push(glanceEvent("NEXT", activeWatch.label, activeWatch.detail, activeWatch.sourceId));
  if (urgentClock) {
    items.push(glanceEvent(
      "PRESSURE",
      `${urgentClock.provider.name} · ${clockStatusLabel(urgentClock.status)}`,
      urgentClock.nextWindowLabel
    ));
  }

  elements.glanceEvents.replaceChildren(...items);
}

function glanceEvent(label, title, detail, sourceId) {
  const source = sourceById(sourceId);
  const item = createElement(source ? "a" : "article", "glance-item");
  if (source) setExternalLink(item, source.url, `打开 ${source.label}`);
  item.append(
    createElement("span", "", label),
    createElement("strong", "", title),
    createElement("p", "", detail)
  );
  return item;
}

function renderEvents() {
  const events = [...view.events].sort((left, right) => new Date(left.date) - new Date(right.date));
  const cards = events.map((event) => {
    const source = sourceById(event.sourceId);
    const provider = view.providers.find((item) => item.id === event.providerId);
    const item = createElement(source ? "a" : "article", "event-card");
    item.dataset.status = event.status;
    if (source) setExternalLink(item, source.url, `打开 ${event.label} 的来源`);

    const top = createElement("div", "event-meta");
    const marker = createElement("i", "provider-marker");
    marker.style.setProperty("--provider-accent", provider?.accent ?? "#8b8b90");
    top.append(
      marker,
      createElement("span", "", isoShortDate(event.date)),
      createElement("b", "", eventStatusLabel(event.status))
    );
    item.append(top, createElement("strong", "", event.label), createElement("p", "", event.detail));
    return item;
  });
  elements.eventList.replaceChildren(...cards);
}

function renderReleaseClocks() {
  const rows = view.providerClocks.map((clock) => {
    const row = createElement("article", "release-row");
    row.dataset.status = clock.status;
    const identity = createElement("div", "release-identity");
    const marker = createElement("i", "provider-marker");
    marker.style.setProperty("--provider-accent", clock.provider?.accent ?? "#8b8b90");
    identity.append(
      marker,
      createElement("strong", "", clock.provider?.name ?? clock.providerId),
      createElement("small", "", `${clock.latestLabel} · ${shortDate(clock.latestDate)}`)
    );

    const track = createElement("div", "release-track");
    const fill = createElement("i");
    fill.style.setProperty("--progress", `${Math.round(Math.min(100, clock.progress * 100))}%`);
    track.append(fill);
    track.setAttribute("aria-hidden", "true");

    row.append(
      identity,
      track,
      createElement("b", "release-status", clockStatusLabel(clock.status)),
      createElement("span", "release-window", clock.nextWindowLabel)
    );
    return row;
  });
  elements.releaseClocks.replaceChildren(...rows);
}

function renderSources() {
  const benchmarkSources = view.sources.filter((source) => source.sourceType === "benchmark");
  const rows = benchmarkSources.map((source, index) => {
    const link = externalLink(source.url, `打开 ${source.label}`, "source-row");
    link.dataset.status = source.ok === false ? "error" : source.changed ? "changed" : "ok";
    link.append(
      createElement("span", "source-index", String(index + 1).padStart(2, "0")),
      createElement("strong", "", source.label),
      createElement("small", "", sourceSignalSummary(source)),
      createElement("b", "", "↗")
    );
    return link;
  });
  elements.sourceList.replaceChildren(...rows);
}

function renderNotes() {
  const notes = view.notes.map((note, index) => {
    const paragraph = createElement("p");
    paragraph.append(createElement("span", "", String(index + 1).padStart(2, "0")), document.createTextNode(note));
    return paragraph;
  });
  elements.methodNotes.replaceChildren(...notes);
}

function sourceSignalSummary(source) {
  const freshness = sourceFreshnessLabel(source, today);
  if (source.ok === false) return `${freshness} · check failed`;
  if (source.changed) return `${freshness} · page changed`;
  return `${freshness} · ${source.foundSignals?.slice(0, 2).join(" · ") || "watching"}`;
}

function sourceForMeasurement(measurement, metric) {
  return sourceById(measurement?.sourceId ?? metric?.sourceId);
}

function sourceById(sourceId) {
  return view.sources.find((source) => source.id === sourceId);
}

function qualifierLabel(measurement) {
  if (!measurement) return "N/A";
  if (measurement.preliminary) return "PRELIM";
  if (measurement.provenance === "vendor-reported") return "VENDOR";
  if (measurement.derived) return "LIST";
  return "INDEPENDENT";
}

function rankingAriaLabel(model, metric) {
  const provider = model.provider?.name ?? model.providerId;
  const value = formatMetricValue(metric, model.metricValue);
  const evidence = qualifierLabel(model.measurement);
  return `${model.name}，${provider}，${value}，${evidence}。打开模型详情。`;
}

function formatPricePair(price) {
  if (!price) return "N/A";
  return `$${price.inputPerMTok} / $${price.outputPerMTok}`;
}

function createElement(tag, className = "", text = null) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== null) node.textContent = text;
  return node;
}

function externalLink(url, label, className = "", text = null) {
  const link = createElement("a", className, text);
  setExternalLink(link, url, label);
  return link;
}

function setExternalLink(link, url, label) {
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `${label}（新窗口）`);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

init();
