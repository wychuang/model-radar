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
import { autoMatchModel, CHOICE_MODES, evidenceLabel as choiceEvidenceLabel } from "./model-choice.mjs";
import { buildModelProfile, missingMetricReason, profileGeometry } from "./model-profile.mjs";
import { modelAgeDays, placeRadarLabels, projectRadarModels, radarSweepDiameter, shortModelName } from "./radar-layout.mjs";
import { clockStatusLabel, eventStatusLabel, isoShortDate, shortDate } from "./ui-helpers.mjs";

const today = new Date();
const view = buildRadarViewModel(modelRadarSnapshot, today);
const radarMetrics = view.benchmarks.filter((metric) => metric.radar !== false);
const initialMetric = radarMetrics[0] ?? null;
const initialLeader = initialMetric
  ? rankModelsByMetric(modelRadarSnapshot, initialMetric.id).find((model) => Number.isFinite(model.metricValue))
  : null;
const initialProfileModel = initialMetric
  ? rankModelsByMetric(modelRadarSnapshot, initialMetric.id).find((model) => buildModelProfile(modelRadarSnapshot, model)?.complete)
  : null;

const state = {
  metricId: initialMetric?.id ?? null,
  selectedId: initialProfileModel?.id ?? initialLeader?.id ?? view.models[0]?.id ?? null,
  choiceModeId: CHOICE_MODES[0].id
};

const elements = {
  snapshotDate: document.querySelector("#snapshot-date"),
  refreshDate: document.querySelector("#refresh-date"),
  metricTabs: document.querySelector("#metric-tabs"),
  coverageReadout: document.querySelector("#coverage-readout"),
  metricAxis: document.querySelector("#metric-axis"),
  radarCaption: document.querySelector("#radar-caption"),
  radarSweep: document.querySelector(".radar-sweep"),
  modelDots: document.querySelector("#model-dots"),
  nowTitle: document.querySelector("#now-title"),
  leaderList: document.querySelector("#leader-list"),
  modelInspector: document.querySelector("#model-inspector"),
  choiceModes: document.querySelector("#choice-modes"),
  choiceVerdict: document.querySelector("#choice-verdict"),
  profileChart: document.querySelector("#profile-chart"),
  profileReadout: document.querySelector("#profile-readout"),
  releaseClocks: document.querySelector("#release-clocks"),
  eventList: document.querySelector("#event-list"),
  sourceList: document.querySelector("#source-list"),
  methodNote: document.querySelector("#method-note"),
  viewStatus: document.querySelector("#view-status")
};

function init() {
  elements.snapshotDate.textContent = view.asOfLabel;
  elements.refreshDate.textContent = `CHECKED ${view.refreshedLabel}`;
  renderMetricTabs();
  renderMetricWorkspace();
  renderReleaseClocks();
  renderEvents();
  renderSources();
  syncRadarSweepGeometry();
  bindResponsiveRadar();
}

function renderMetricTabs() {
  const tabs = radarMetrics.map((metric, index) => {
    const button = createElement("button", "metric-tab");
    button.type = "button";
    button.id = `radar-metric-${metric.id}`;
    button.role = "tab";
    button.dataset.metricId = metric.id;
    button.setAttribute("aria-controls", "model-dots");
    button.setAttribute("aria-selected", String(metric.id === state.metricId));
    button.tabIndex = metric.id === state.metricId ? 0 : -1;
    button.append(
      createElement("span", "", String(index + 1).padStart(2, "0")),
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
  if (event.key === "End") nextIndex = radarMetrics.length - 1;
  if (event.key === "ArrowLeft") nextIndex = (index - 1 + radarMetrics.length) % radarMetrics.length;
  if (event.key === "ArrowRight") nextIndex = (index + 1) % radarMetrics.length;

  const nextMetric = radarMetrics[nextIndex];
  selectMetric(nextMetric.id, false);
  document.querySelector(`#radar-metric-${nextMetric.id}`)?.focus();
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
    const leader = rankModelsByMetric(modelRadarSnapshot, metricId).find((model) => Number.isFinite(model.metricValue));
    elements.viewStatus.textContent = leader
      ? `已切换到${metric.displayLabel}。当前领先是${leader.name}，${formatMetricValue(metric, leader.metricValue)}。`
      : `已切换到${metric.displayLabel}，暂无可比数据。`;
  }
}

function renderMetricWorkspace() {
  const metric = getBenchmarkMetric(modelRadarSnapshot, state.metricId);
  if (!metric) return;

  const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
  renderCoverage(metric);
  renderAxis(metric);
  renderRadar(metric, ranking);
  renderLeaders(metric, ranking);
  renderInspector(metric, ranking);
  renderModelProfiles();
}

function renderCoverage(metric) {
  const coverage = metricCoverage(modelRadarSnapshot, metric.id);
  const percent = Math.round(coverage.ratio * 100);
  const meter = createElement("span", "coverage-meter");
  const fill = createElement("i");
  fill.style.setProperty("--coverage", `${percent}%`);
  meter.append(fill);

  elements.coverageReadout.replaceChildren(
    createElement("strong", "", `${coverage.covered}/${coverage.total}`),
    createElement("span", "", `COVERAGE ${percent}%`),
    meter
  );
}

function renderAxis(metric) {
  const direction = metric.direction === "lower" ? "LOWER IS BETTER / INVERTED" : "HIGHER IS BETTER";
  elements.metricAxis.textContent = `${metric.shortLabel} / ${direction}`;
  elements.radarCaption.textContent = `X / ${metric.displayLabel.toUpperCase()}`;
  elements.nowTitle.textContent = metric.displayLabel;
  elements.methodNote.textContent = `右侧代表 ${metric.displayLabel} 表现更优；上方代表发布时间更近；左侧 N/A 会在模型详情中说明当前缺失原因。`;
}

function renderRadar(metric, ranking) {
  const projected = projectRadarModels(ranking, metric, today);
  const radarStyle = getComputedStyle(elements.modelDots);
  const points = placeRadarLabels(projected, {
    width: elements.modelDots.clientWidth || 900,
    height: elements.modelDots.clientHeight || 600,
    labelWidth: parseCssPixels(radarStyle.getPropertyValue("--signal-label-width"), 106),
    labelHeight: parseCssPixels(radarStyle.getPropertyValue("--signal-label-height"), 44),
    topRankCount: 0
  });
  const signals = points.map((model) => {
    const provider = model.provider ?? providerById(model.providerId);
    const button = createElement("button", "model-signal");
    button.type = "button";
    button.dataset.modelId = model.id;
    button.dataset.active = String(model.id === state.selectedId);
    button.dataset.missing = String(model.radar.missing);
    button.dataset.stage = model.stage;
    button.dataset.labelPosition = model.radar.labelPosition;
    button.style.setProperty("--x", `${model.radar.x}%`);
    button.style.setProperty("--y", `${model.radar.y}%`);
    button.style.setProperty("--label-x", `${model.radar.labelDx}px`);
    button.style.setProperty("--label-y", `${model.radar.labelDy}px`);
    button.style.setProperty("--link-length", `${model.radar.linkLength}px`);
    button.style.setProperty("--link-angle", `${model.radar.linkAngle}deg`);
    button.style.setProperty("--accent", model.accent ?? provider?.accent ?? "#ece7d6");
    button.style.setProperty("--accent-text", model.accentText ?? provider?.accentText ?? "#11120f");
    button.title = model.radar.missing
      ? `${model.name} / N/A / ${missingMetricReason(metric.id).short}`
      : `${model.name} / ${formatMetricValue(metric, model.metricValue)}`;
    button.setAttribute("aria-pressed", String(model.id === state.selectedId));
    button.setAttribute("aria-label", radarAriaLabel(model, metric));

    const label = createElement("span", "signal-label");
    label.append(
      createElement("small", "", provider?.name ?? model.providerId),
      createElement("strong", "", shortModelName(model.name)),
      createElement("b", "", formatMetricValue(metric, model.metricValue))
    );
    const link = createElement("span", "signal-link");
    link.setAttribute("aria-hidden", "true");
    button.append(link, createElement("span", "signal-node"), label);
    button.addEventListener("click", () => selectModel(model.id, false));
    return button;
  });

  elements.modelDots.replaceChildren(...signals);
}

function bindResponsiveRadar() {
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      syncRadarSweepGeometry();
      renderMetricWorkspace();
    }, 120);
  });
}

function syncRadarSweepGeometry() {
  const field = elements.modelDots;
  if (!field || !elements.radarSweep) return;
  const diameter = radarSweepDiameter(field.clientWidth, field.clientHeight);
  elements.radarSweep.style.setProperty("--radar-sweep-size", `${diameter}px`);
}

function renderLeaders(metric, ranking) {
  const covered = ranking.filter((model) => Number.isFinite(model.metricValue)).slice(0, 5);
  const rows = covered.map((model, index) => {
    const button = createElement("button", "leader-row");
    button.type = "button";
    button.role = "listitem";
    button.dataset.modelId = model.id;
    button.dataset.active = String(model.id === state.selectedId);
    button.setAttribute("aria-pressed", String(model.id === state.selectedId));

    const identity = createElement("span", "leader-identity");
    identity.append(
      createElement("strong", "", model.name),
      createElement("small", "", `${model.provider?.name ?? model.providerId} / ${shortDate(model.releasedAt)}`)
    );

    button.append(
      createElement("span", "leader-rank", `#${model.computedRank ?? index + 1}`),
      identity,
      createElement("strong", "leader-value", formatMetricValue(metric, model.metricValue))
    );
    button.addEventListener("click", () => selectModel(model.id, false));
    button.addEventListener("keydown", (event) => moveLeaderFocus(event, index, covered));
    return button;
  });

  elements.leaderList.replaceChildren(...rows);
}

function moveLeaderFocus(event, index, leaders) {
  if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
  event.preventDefault();

  let nextIndex = index;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = leaders.length - 1;
  if (event.key === "ArrowUp") nextIndex = Math.max(0, index - 1);
  if (event.key === "ArrowDown") nextIndex = Math.min(leaders.length - 1, index + 1);

  selectModel(leaders[nextIndex].id, true);
}

function selectModel(modelId, restoreFocus) {
  if (modelId === state.selectedId) return;
  state.selectedId = modelId;

  syncModelSelectionState();
  const metric = getBenchmarkMetric(modelRadarSnapshot, state.metricId);
  if (metric) {
    const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
    renderInspector(metric, ranking);
    renderModelProfiles();
  }

  const model = view.models.find((entry) => entry.id === modelId);
  elements.viewStatus.textContent = `${model?.name ?? "模型"}详情已打开。`;

  if (restoreFocus) {
    const target = [...document.querySelectorAll(".leader-row")].find((button) => button.dataset.modelId === modelId);
    target?.focus();
  }
}

function syncModelSelectionState() {
  for (const container of [elements.modelDots, elements.leaderList]) {
    for (const control of container.querySelectorAll("[data-model-id]")) {
      const active = control.dataset.modelId === state.selectedId;
      control.dataset.active = String(active);
      control.setAttribute("aria-pressed", String(active));
    }
  }
}

function renderInspector(metric, ranking) {
  const model = view.models.find((entry) => entry.id === state.selectedId) ?? view.models[0];
  if (!model) return;

  const provider = providerById(model.providerId);
  const activeRow = ranking.find((entry) => entry.id === model.id);
  const activeMeasurement = activeRow?.measurement ?? null;
  const activeMissingReason = activeMeasurement ? null : missingMetricReason(metric.id);
  const activeSource = sourceForMeasurement(activeMeasurement, metric, model);

  const head = createElement("header", "inspector-head");
  const providerLine = createElement("div", "provider-line");
  const providerMark = createElement("i", "provider-mark");
  providerMark.style.setProperty("--provider-accent", model.accent ?? provider?.accent ?? "#11120f");
  providerLine.append(providerMark, createElement("span", "", `${provider?.region ?? "--"} / ${provider?.name ?? model.providerId}`));
  const title = createElement("h2", "", model.name);
  title.id = "inspector-title";
  head.append(providerLine, title, createElement("p", "", model.posture));

  const score = createElement("section", "active-score");
  const scoreLabel = createElement("span");
  scoreLabel.append(
    createElement("span", "", `${metric.shortLabel} / ${activeMeasurement?.asOf ?? metric.asOf}`),
    createElement("b", "", activeMissingReason?.short ?? evidenceLabel(activeMeasurement))
  );
  if (activeMissingReason) score.title = activeMissingReason.detail;
  score.append(scoreLabel, createElement("strong", "", formatMetricValue(metric, activeRow?.metricValue)));
  if (activeSource && activeMeasurement) {
    score.append(externalLink(activeSource.url, `打开 ${activeSource.label}`, "", "OPEN SOURCE ↗"));
  }

  const facts = createElement("dl", "inspector-facts");
  const factRows = [
    ["RELEASE", isoShortDate(model.releasedAt)],
    ["AGE", `${modelAgeDays(model.releasedAt, today)}D`],
    ["CONTEXT", formatTokenWindow(model.contextTokens)]
  ];
  for (const [label, value] of factRows) {
    const group = createElement("div");
    group.append(createElement("dt", "", label), createElement("dd", "", value));
    facts.append(group);
  }

  const matrix = createElement("section", "metric-matrix");
  for (const matrixMetric of radarMetrics) {
    matrix.append(renderMetricCell(model, matrixMetric));
  }

  const specialty = renderSpecialtyScores(model);

  const official = createElement("nav", "official-links");
  official.setAttribute("aria-label", `${model.name} 官方来源`);
  for (const source of model.sourceRefs.map(sourceById).filter(Boolean)) {
    official.append(externalLink(source.url, `打开 ${source.label}`, "", `${source.label} ↗`));
  }

  elements.modelInspector.replaceChildren(head, score, facts, matrix, specialty, official);
}

function renderMetricCell(model, metric) {
  const measurement = getMetricMeasurement(model, metric);
  const missingReason = measurement ? null : missingMetricReason(metric.id);
  const source = sourceForMeasurement(measurement, metric, model);
  const tag = source && measurement ? "a" : "div";
  const cell = createElement(tag, "matrix-cell");
  cell.dataset.active = String(metric.id === state.metricId);
  cell.dataset.missing = String(!measurement);
  if (missingReason) cell.title = missingReason.detail;
  cell.append(
    createElement("span", "", metric.shortLabel),
    createElement("strong", "", formatMetricValue(metric, measurement?.value)),
    createElement("small", "", missingReason?.short ?? evidenceLabel(measurement))
  );
  if (source && measurement) setExternalLink(cell, source.url, `打开 ${metric.label} 来源`);
  return cell;
}

function renderSpecialtyScores(model) {
  const section = createElement("section", "specialty-scores");
  const measurements = view.benchmarks
    .filter((metric) => metric.radar === false)
    .map((metric) => ({ metric, measurement: getMetricMeasurement(model, metric) }))
    .filter((entry) => Number.isFinite(entry.measurement?.value));

  if (measurements.length === 0) {
    section.hidden = true;
    return section;
  }

  const heading = createElement("header", "specialty-heading");
  heading.append(
    createElement("span", "", "SPECIALIST EVIDENCE"),
    createElement("strong", "", `专项评测 / ${measurements.length} 项`)
  );
  const grid = createElement("div", "specialty-grid");

  for (const { metric, measurement } of measurements) {
    const source = sourceForMeasurement(measurement, metric, model);
    const item = createElement(source ? "a" : "div", "specialty-score");
    item.append(
      createElement("span", "", metric.shortLabel),
      createElement("strong", "", formatMetricValue(metric, measurement.value)),
      createElement("small", "", evidenceLabel(measurement))
    );
    if (source) setExternalLink(item, source.url, `打开 ${metric.label} 来源`);
    grid.append(item);
  }

  section.append(heading, grid);
  return section;
}

function renderModelProfiles() {
  const selectedModel = view.models.find((model) => model.id === state.selectedId) ?? view.models[0];
  if (!selectedModel) return;
  const decision = autoMatchModel(modelRadarSnapshot, selectedModel.id, state.choiceModeId);
  if (!decision.comparison) return;
  renderChoiceControls(decision);
  const primary = buildModelProfile(modelRadarSnapshot, selectedModel);
  const comparison = buildModelProfile(modelRadarSnapshot, decision.comparison.id);
  renderProfileChart(primary, comparison);
  renderProfileReadout(primary, comparison, decision);
}

function renderChoiceControls(decision) {
  const buttons = CHOICE_MODES.map((mode, index) => {
    const button = createElement("button", "choice-mode", mode.label);
    button.type = "button";
    button.role = "tab";
    button.dataset.modeId = mode.id;
    button.setAttribute("aria-selected", String(mode.id === state.choiceModeId));
    button.tabIndex = mode.id === state.choiceModeId ? 0 : -1;
    button.title = mode.description;
    button.addEventListener("click", () => selectChoiceMode(mode.id, true));
    button.addEventListener("keydown", (event) => moveChoiceFocus(event, index));
    return button;
  });
  elements.choiceModes.replaceChildren(...buttons);

  const verdict = decision.winner;
  elements.choiceVerdict.replaceChildren(
    createElement("small", "", `${decision.mode.shortLabel} / 当前首选`),
    createElement("strong", "", verdict?.name ?? "证据不足"),
    createElement("span", "", verdict
      ? `#1 / ${choiceEvidenceLabel(verdict.evidenceRatio)}`
      : "没有达到最低证据覆盖")
  );
}

function selectChoiceMode(modeId, announce) {
  state.choiceModeId = modeId;
  renderModelProfiles();
  if (!announce) return;
  const decision = autoMatchModel(modelRadarSnapshot, state.selectedId, modeId);
  elements.viewStatus.textContent = `${decision.mode.label}用途的当前首选是${decision.winner?.name ?? "暂无"}。`;
}

function moveChoiceFocus(event, index) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  let nextIndex = index;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = CHOICE_MODES.length - 1;
  if (event.key === "ArrowLeft") nextIndex = (index - 1 + CHOICE_MODES.length) % CHOICE_MODES.length;
  if (event.key === "ArrowRight") nextIndex = (index + 1) % CHOICE_MODES.length;
  selectChoiceMode(CHOICE_MODES[nextIndex].id, true);
  elements.choiceModes.querySelector(`[data-mode-id="${CHOICE_MODES[nextIndex].id}"]`)?.focus();
}

function renderProfileChart(primary, comparison) {
  const frame = ensureProfileChart(primary);
  frame.title.textContent = `${primary.model.name} 与 ${comparison.model.name} 五维对比`;
  frame.description.textContent = "各轴按公开指标区间归一化到零至一百。价格效率轴已反转，价格越低越靠外。编程与 Agent 专项成绩在模型详情中单列，缺失数据不按零分处理。";

  drawProfile(frame.comparisonLayer, comparison, profileGeometry(comparison), "comparison");
  drawProfile(frame.primaryLayer, primary, profileGeometry(primary), "primary");
}

function ensureProfileChart(profile) {
  const existing = elements.profileChart.querySelector("svg");
  if (existing) {
    return {
      title: existing.querySelector("#profile-svg-title"),
      description: existing.querySelector("#profile-svg-description"),
      comparisonLayer: existing.querySelector('[data-profile-layer="comparison"]'),
      primaryLayer: existing.querySelector('[data-profile-layer="primary"]')
    };
  }

  const svg = createSvgElement("svg", {
    viewBox: "0 0 360 330",
    role: "img",
    "aria-labelledby": "profile-svg-title profile-svg-description"
  });
  const title = createSvgElement("title", { id: "profile-svg-title" });
  const description = createSvgElement("desc", { id: "profile-svg-description" });
  svg.append(title, description);

  const frameGeometry = profileGeometry(profile);
  for (const scale of [0.25, 0.5, 0.75, 1]) {
    const points = frameGeometry.axes.map((axis) => scaledPoint(frameGeometry.center, axis.end, scale));
    svg.append(createSvgElement("polygon", {
      class: "profile-grid-ring",
      points: points.map(pointString).join(" ")
    }));
  }

  for (const axis of frameGeometry.axes) {
    svg.append(createSvgElement("line", {
      class: "profile-axis-line",
      x1: frameGeometry.center.x,
      y1: frameGeometry.center.y,
      x2: axis.end.x,
      y2: axis.end.y
    }));
    const anchor = axis.label.x < 165 ? "end" : axis.label.x > 195 ? "start" : "middle";
    const label = createSvgElement("text", {
      class: "profile-axis-label",
      x: axis.label.x,
      y: axis.label.y,
      "text-anchor": anchor
    });
    label.append(
      createSvgElement("tspan", { x: axis.label.x, dy: 0 }, axis.dimension.label),
      createSvgElement("tspan", { x: axis.label.x, dy: 12 }, axis.dimension.shortLabel)
    );
    svg.append(label);
  }

  const comparisonLayer = createSvgElement("g", {
    class: "profile-shape profile-shape-comparison",
    "data-profile-layer": "comparison"
  });
  const primaryLayer = createSvgElement("g", {
    class: "profile-shape profile-shape-primary",
    "data-profile-layer": "primary"
  });
  svg.append(comparisonLayer, primaryLayer);
  elements.profileChart.replaceChildren(svg);

  return { title, description, comparisonLayer, primaryLayer };
}

function drawProfile(group, profile, geometry, role) {
  const color = profile.accent;
  group.replaceChildren();
  if (geometry.polygon) {
    group.append(createSvgElement("polygon", {
      class: "profile-area",
      points: geometry.polygon,
      fill: color,
      stroke: color
    }));
  } else {
    for (const segment of geometry.segments) {
      group.append(createSvgElement("line", {
        class: "profile-segment",
        x1: segment.from.x,
        y1: segment.from.y,
        x2: segment.to.x,
        y2: segment.to.y,
        stroke: color
      }));
    }
  }

  geometry.points.forEach((point, index) => {
    if (point) {
      group.append(createSvgElement("circle", {
        class: "profile-point",
        cx: point.x,
        cy: point.y,
        r: role === "primary" ? 4 : 3,
        fill: role === "primary" ? color : "#11120f",
        stroke: color
      }));
      return;
    }

    const marker = scaledPoint(geometry.center, geometry.axes[index].end, 0.84);
    group.append(
      createSvgElement("line", { class: "profile-missing-mark", x1: marker.x - 4, y1: marker.y - 4, x2: marker.x + 4, y2: marker.y + 4, stroke: color }),
      createSvgElement("line", { class: "profile-missing-mark", x1: marker.x + 4, y1: marker.y - 4, x2: marker.x - 4, y2: marker.y + 4, stroke: color })
    );
  });
}

function renderProfileReadout(primary, comparison, decision) {
  const verdict = createElement("div", "profile-decision");
  verdict.append(
    createElement("span", "", `${decision.mode.label}首选`),
    createElement("strong", "", decision.winner?.name ?? "证据不足"),
    createElement("small", "", decision.winner
      ? `${choiceEvidenceLabel(decision.winner.evidenceRatio)} / 自动对手 ${comparison.model.name}`
      : "没有模型达到最低证据覆盖")
  );

  const header = createElement("div", "profile-readout-header");
  const selectedDecision = decision.ranking.find((model) => model.id === primary.model.id);
  const comparisonDecision = decision.ranking.find((model) => model.id === comparison.model.id);
  header.append(
    createProfileLegend(primary, "当前模型", selectedDecision),
    createProfileLegend(comparison, "自动对手", comparisonDecision)
  );

  const table = createElement("div", "profile-table");
  primary.dimensions.forEach((dimension, index) => {
    const compareDimension = comparison.dimensions[index];
    const label = createElement("div", "profile-dimension-label");
    label.append(createElement("strong", "", dimension.label), createElement("small", "", dimension.shortLabel));
    table.append(label, createProfileValue(dimension), createProfileValue(compareDimension));
  });
  elements.profileReadout.replaceChildren(verdict, header, table);
}

function createProfileLegend(profile, roleLabel, decisionRow) {
  const legend = createElement("div", "profile-legend");
  const swatch = createElement("i");
  swatch.style.setProperty("--profile-accent", profile.accent);
  const copy = createElement("span");
  copy.append(
    createElement("small", "", `${roleLabel} / ${decisionRow?.choiceRank ? `#${decisionRow.choiceRank}` : "证据不足"} / ${profile.knownCount}/5`),
    createElement("strong", "", profile.model.name)
  );
  legend.append(swatch, copy);
  return legend;
}

function createProfileValue(dimension) {
  const value = createElement("div", "profile-value");
  value.dataset.missing = String(!dimension.available);
  value.append(createElement("strong", "", formatMetricValue(dimension.metric, dimension.measurement?.value)));
  if (dimension.available) {
    value.append(createElement("small", "", `五维位置 ${Math.round(dimension.score)}`));
  } else {
    value.append(createElement("small", "", dimension.missingReason.short));
    value.title = dimension.missingReason.detail;
  }
  return value;
}

function renderReleaseClocks() {
  const rows = view.providerClocks.map((clock) => {
    const row = createElement("article", "release-row");
    row.dataset.status = clock.status;

    const identity = createElement("div", "release-identity");
    identity.append(
      createElement("strong", "", clock.provider?.name ?? clock.providerId),
      createElement("small", "", `${clock.latestLabel} / ${shortDate(clock.latestDate)}`)
    );

    const track = createElement("div", "release-track");
    const fill = createElement("i");
    fill.style.setProperty("--progress", `${Math.round(Math.min(100, clock.progress * 100))}%`);
    track.append(fill);
    track.setAttribute("aria-hidden", "true");

    row.append(
      identity,
      createElement("b", "release-status", clockStatusLabel(clock.status)),
      track,
      createElement("span", "release-cycle", `已过 ${Math.round(clock.daysSinceLatest)} 天 / 历史平均 ${clock.cycleDays} 天`),
      createElement("span", "release-window", `推测关注窗口 / ${clock.nextWindowLabel.replace(/^watch\s+/i, "")}`)
    );
    return row;
  });

  elements.releaseClocks.replaceChildren(...rows);
}

function renderEvents() {
  const events = [...view.events].sort((left, right) => new Date(right.date) - new Date(left.date));
  const items = events.map((event) => {
    const source = sourceById(event.sourceId);
    const item = createElement(source ? "a" : "article", "event-item");
    item.dataset.status = event.status;
    if (source) setExternalLink(item, source.url, `打开 ${event.label} 来源`);

    const meta = createElement("div", "event-meta");
    meta.append(createElement("span", "", isoShortDate(event.date)), createElement("span", "", eventStatusLabel(event.status)));
    item.append(meta, createElement("strong", "", event.label), createElement("p", "", event.detail));
    return item;
  });

  elements.eventList.replaceChildren(...items);
}

function renderSources() {
  const sources = view.sources.filter((source) => source.sourceType === "benchmark");
  const rows = sources.map((source, index) => {
    const link = externalLink(source.url, `打开 ${source.label}`, "source-row");
    const copy = createElement("span", "source-copy");
    copy.append(
      createElement("strong", "", source.label),
      createElement("small", "", sourceStatus(source))
    );
    link.append(
      createElement("span", "source-index", String(index + 1).padStart(2, "0")),
      copy,
      createElement("b", "", "↗")
    );
    return link;
  });

  elements.sourceList.replaceChildren(...rows);
}

function radarAriaLabel(model, metric) {
  const value = formatMetricValue(metric, model.metricValue);
  const position = model.radar.missing
    ? missingMetricReason(metric.id).detail.replace(/[。.]$/, "")
    : `${model.radar.ageDays} 天前发布`;
  return `${model.name}，${value}，${position}。打开模型详情。`;
}

function evidenceLabel(measurement) {
  if (!measurement) return "N/A";
  if (measurement.preliminary) return "PRELIM";
  if (measurement.provenance === "vendor-reported") return "VENDOR";
  if (measurement.derived) return "LIST";
  return "INDEPENDENT";
}

function sourceStatus(source) {
  const freshness = sourceFreshnessLabel(source, today).toUpperCase();
  if (source.ok === false) return `${freshness} / CHECK FAILED`;
  if (source.changed) return `${freshness} / PAGE CHANGED`;
  return `${freshness} / ${source.foundSignals?.slice(0, 2).join(" / ") || "WATCHING"}`;
}

function sourceForMeasurement(measurement, metric, model) {
  return sourceById(measurement?.sourceId ?? metric?.sourceId ?? model?.sourceRefs?.[0]);
}

function providerById(providerId) {
  return view.providers.find((provider) => provider.id === providerId);
}

function sourceById(sourceId) {
  return view.sources.find((source) => source.id === sourceId);
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

function createSvgElement(tag, attributes = {}, text = null) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, String(value));
  if (text !== null) node.textContent = text;
  return node;
}

function scaledPoint(center, end, scale) {
  return {
    x: center.x + (end.x - center.x) * scale,
    y: center.y + (end.y - center.y) * scale
  };
}

function pointString(point) {
  return `${point.x},${point.y}`;
}

function parseCssPixels(value, fallback) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

init();
