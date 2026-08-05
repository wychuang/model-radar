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
const firstMetricId = view.benchmarks[0]?.id;
const initialLeader = firstMetricId
  ? rankModelsByMetric(modelRadarSnapshot, firstMetricId).find((row) => Number.isFinite(row.metricValue))
  : null;
const state = {
  metricId: firstMetricId,
  selectedId: initialLeader?.id ?? view.models[0]?.id
};

const elements = {
  asOfLabel: document.querySelector("#as-of-label"),
  refreshLabel: document.querySelector("#refresh-label"),
  signals: document.querySelector("#signals"),
  metricTabs: document.querySelector("#metric-tabs"),
  metricHero: document.querySelector("#metric-hero"),
  leaderboard: document.querySelector("#leaderboard"),
  selectedModel: document.querySelector("#selected-model"),
  eventList: document.querySelector("#event-list"),
  clockList: document.querySelector("#clock-list"),
  sourceList: document.querySelector("#source-list"),
  notes: document.querySelector("#notes")
};

function init() {
  elements.asOfLabel.textContent = view.asOfLabel;
  elements.refreshLabel.textContent = `checked ${view.refreshedLabel}`;
  renderSignals();
  renderMetricTabs();
  renderScoreboard();
  renderEvents();
  renderClocks();
  renderSources();
  renderNotes();
}

function renderSignals() {
  elements.signals.replaceChildren(...view.worldSignals.map((signal) => {
    const block = document.createElement("article");
    block.className = "signal-block";
    block.dataset.tone = signal.tone;
    block.innerHTML = `
      <span>${signal.label}</span>
      <strong>${signal.value}</strong>
      <p>${signal.detail}</p>
    `;
    return block;
  }));
}

function renderMetricTabs() {
  elements.metricTabs.replaceChildren(...view.benchmarks.map((metric, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "metric-tab";
    button.id = `metric-tab-${metric.id}`;
    button.role = "tab";
    button.tabIndex = metric.id === state.metricId ? 0 : -1;
    button.ariaSelected = String(metric.id === state.metricId);
    button.dataset.active = String(metric.id === state.metricId);
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${metric.displayLabel}</strong><small>${metric.shortLabel}</small>`;
    button.addEventListener("click", () => selectMetric(metric.id));
    button.addEventListener("keydown", (event) => moveMetricFocus(event, index));
    return button;
  }));
}

function moveMetricFocus(event, index) {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  const offset = event.key === "ArrowRight" ? 1 : -1;
  const nextIndex = (index + offset + view.benchmarks.length) % view.benchmarks.length;
  const nextMetric = view.benchmarks[nextIndex];
  selectMetric(nextMetric.id);
  document.querySelector(`#metric-tab-${nextMetric.id}`)?.focus();
}

function selectMetric(metricId) {
  state.metricId = metricId;
  renderMetricTabs();
  renderScoreboard();
}

function renderScoreboard() {
  const metric = getBenchmarkMetric(modelRadarSnapshot, state.metricId);
  const ranking = rankModelsByMetric(modelRadarSnapshot, state.metricId);
  renderMetricHero(metric, ranking);
  renderLeaderboard(metric, ranking);
  renderSelected(metric, ranking);
}

function renderMetricHero(metric, ranking) {
  const coverage = metricCoverage(modelRadarSnapshot, metric.id);
  const leader = ranking.find((row) => Number.isFinite(row.metricValue));
  const source = leader ? sourceForMeasurement(leader.measurement, metric) : sourceById(metric.sourceId);
  const coveragePercent = Math.round(coverage.ratio * 100);

  elements.metricHero.innerHTML = `
    <div class="metric-code">${metric.shortLabel}</div>
    <p class="metric-direction">${metric.direction === "lower" ? "LOWER WINS" : "HIGHER WINS"}</p>
    <h3>${metric.displayLabel}</h3>
    <p class="metric-full-name">${metric.label}</p>
    <div class="hero-value">
      <span>LEADER</span>
      <strong>${leader ? formatMetricValue(metric, leader.metricValue) : "N/A"}</strong>
      <p>${leader ? `${leader.provider.name}<br>${leader.name}` : "No comparable rows"}</p>
    </div>
    <div class="coverage-readout">
      <span>COVERAGE</span>
      <strong>${coverage.covered}/${coverage.total}</strong>
      <i style="--coverage: ${coveragePercent}%;"></i>
    </div>
    <p class="metric-description">${metric.description}</p>
    ${source ? `<a class="raw-link" href="${source.url}" target="_blank" rel="noreferrer">OPEN SOURCE ↗</a>` : ""}
    <small>MEASURED ${metric.asOf}</small>
  `;
}

function renderLeaderboard(metric, ranking) {
  elements.leaderboard.replaceChildren(...ranking.map((model) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ranking-row";
    button.dataset.active = String(model.id === state.selectedId);
    button.dataset.missing = String(!Number.isFinite(model.metricValue));
    button.style.setProperty("--accent", model.provider?.accent ?? "#ffffff");
    button.setAttribute("aria-label", `${model.provider?.name} ${model.name}, ${formatMetricValue(metric, model.metricValue)}`);
    const rankLabel = model.measurement?.rank ? `#${model.measurement.rank}` : model.computedRank ? `#${model.computedRank}` : "--";
    const qualifier = model.measurement?.preliminary
      ? "PRELIM"
      : model.measurement?.provenance === "vendor-reported"
        ? "VENDOR"
        : model.measurement?.derived
          ? "LIST"
          : "MEASURED";
    button.innerHTML = `
      <span class="row-rank">${rankLabel}</span>
      <span class="row-model">
        <i></i>
        <strong>${model.name}</strong>
        <small>${model.provider?.name ?? model.providerId} / ${shortDate(model.releasedAt)}</small>
      </span>
      <span class="row-bar"><i style="${metricBarStyle(model.metricValue, metric)}"></i><small>${Number.isFinite(model.metricValue) ? qualifier : "NO DATA"}</small></span>
      <b>${formatMetricValue(metric, model.metricValue)}</b>
    `;
    button.addEventListener("click", () => {
      state.selectedId = model.id;
      renderScoreboard();
    });
    return button;
  }));
}

function renderSelected(activeMetric, ranking) {
  const model = view.models.find((item) => item.id === state.selectedId) ?? view.models[0];
  const provider = view.providers.find((item) => item.id === model.providerId);
  const activeRow = ranking.find((row) => row.id === model.id);
  const officialLinks = model.sourceRefs
    .map(sourceById)
    .filter(Boolean)
    .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label} ↗</a>`)
    .join("");

  elements.selectedModel.style.setProperty("--accent", provider?.accent ?? "#ffffff");
  elements.selectedModel.innerHTML = `
    <header class="model-title">
      <span>${provider?.region ?? "--"} / ${provider?.name ?? model.providerId}</span>
      <h3>${model.name}</h3>
      <p>${model.posture}</p>
    </header>
    <div class="active-score">
      <span>${activeMetric.shortLabel}</span>
      <strong>${formatMetricValue(activeMetric, activeRow?.metricValue)}</strong>
      <small>${activeRow?.measurement?.rank ? `source rank #${activeRow.measurement.rank}` : activeRow?.computedRank ? `board rank #${activeRow.computedRank}` : "coverage missing"}</small>
    </div>
    <div class="model-facts">
      <div><span>RELEASE</span><strong>${isoShortDate(model.releasedAt)}</strong></div>
      <div><span>CONTEXT</span><strong>${formatTokenWindow(model.contextTokens)}</strong></div>
      <div><span>OUTPUT</span><strong>${formatTokenWindow(model.outputTokens)}</strong></div>
      <div><span>PRICE IN / OUT</span><strong>${formatPricePair(model.priceUsd)}</strong></div>
    </div>
    <div class="benchmark-matrix">
      ${view.benchmarks.map((metric) => renderBenchmarkCell(model, metric)).join("")}
    </div>
    <div class="watch-copy">
      <span>NEXT WATCH</span>
      <p>${model.watch}</p>
    </div>
    <div class="official-links">${officialLinks}</div>
  `;
}

function renderBenchmarkCell(model, metric) {
  const measurement = getMetricMeasurement(model, metric);
  const source = sourceForMeasurement(measurement, metric);
  const label = measurement?.preliminary
    ? "PRELIM"
    : measurement?.provenance === "vendor-reported"
      ? "VENDOR"
      : measurement?.derived
        ? "LIST"
        : measurement
          ? "INDEPENDENT"
          : "NO COVERAGE";
  const value = formatMetricValue(metric, measurement?.value);
  const content = `<span>${metric.shortLabel}</span><strong>${value}</strong><small>${label}</small>`;
  return source && measurement
    ? `<a href="${source.url}" target="_blank" rel="noreferrer">${content}</a>`
    : `<div data-missing="${String(!measurement)}">${content}</div>`;
}

function renderEvents() {
  elements.eventList.replaceChildren(...view.events.map((event) => {
    const provider = view.providers.find((item) => item.id === event.providerId);
    const source = sourceById(event.sourceId);
    const item = document.createElement(source ? "a" : "article");
    item.className = "event-item";
    item.dataset.status = event.status;
    item.style.setProperty("--accent", provider?.accent ?? "#ffffff");
    if (source) {
      item.href = source.url;
      item.target = "_blank";
      item.rel = "noreferrer";
    }
    item.innerHTML = `
      <span>${isoShortDate(event.date)}</span>
      <b>${eventStatusLabel(event.status)}</b>
      <strong>${event.label}</strong>
      <p>${event.detail}</p>
    `;
    return item;
  }));
}

function renderClocks() {
  elements.clockList.replaceChildren(...view.providerClocks.map((clock) => {
    const row = document.createElement("article");
    row.className = "clock-row";
    row.dataset.status = clock.status;
    row.style.setProperty("--accent", clock.provider?.accent ?? "#ffffff");
    row.innerHTML = `
      <span class="clock-name"><i></i><strong>${clock.provider.name}</strong><small>${clock.latestLabel} / ${shortDate(clock.latestDate)}</small></span>
      <span class="clock-track"><i style="--value: ${Math.round(Math.min(100, clock.progress * 100))}%;"></i></span>
      <b>${clockStatusLabel(clock.status)}</b>
      <em>${clock.nextWindowLabel}</em>
    `;
    return row;
  }));
}

function renderSources() {
  const benchmarkSources = view.sources.filter((source) => source.sourceType === "benchmark");
  elements.sourceList.replaceChildren(...benchmarkSources.map((source, index) => {
    const link = document.createElement("a");
    link.className = "source-row";
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.innerHTML = `
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${source.label}</strong>
      <small>${sourceFreshnessLabel(source, today)} / ${source.foundSignals?.slice(0, 2).join(" · ") || "watching"}</small>
      <b>↗</b>
    `;
    return link;
  }));
}

function renderNotes() {
  elements.notes.replaceChildren(...view.notes.map((note, index) => {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>${note}`;
    return paragraph;
  }));
}

function sourceForMeasurement(measurement, metric) {
  return sourceById(measurement?.sourceId ?? metric?.sourceId);
}

function sourceById(sourceId) {
  return view.sources.find((source) => source.id === sourceId);
}

function formatPricePair(price) {
  if (!price) return "N/A";
  return `$${price.inputPerMTok} / $${price.outputPerMTok}`;
}

init();
