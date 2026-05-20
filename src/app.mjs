import {
  buildRadarViewModel,
  formatTokenWindow,
  sourceFreshnessLabel
} from "./model-radar.mjs";
import { modelRadarSnapshot } from "./model-radar-snapshot.mjs";
import {
  clockStatusLabel,
  metricBarStyle,
  modelDotStyle,
  shortDate
} from "./ui-helpers.mjs";

const today = new Date();
const view = buildRadarViewModel(modelRadarSnapshot, today);
const state = {
  selectedId: view.leaders[0]?.id ?? modelRadarSnapshot.models[0]?.id
};

const elements = {
  refreshLabel: document.querySelector("#refresh-label"),
  signals: document.querySelector("#signals"),
  modelDots: document.querySelector("#model-dots"),
  topModel: document.querySelector("#top-model"),
  leaderList: document.querySelector("#leader-list"),
  selectedModel: document.querySelector("#selected-model"),
  clockList: document.querySelector("#clock-list"),
  sourceList: document.querySelector("#source-list")
};

function init() {
  elements.refreshLabel.textContent = view.refreshedLabel;
  renderSignals();
  renderRadar();
  renderLeaders();
  renderClocks();
  renderSources();
  renderSelected();
}

function renderSignals() {
  elements.signals.replaceChildren(...view.worldSignals.map((signal) => {
    const card = document.createElement("article");
    card.className = "signal-card";
    card.dataset.tone = signal.tone;
    card.innerHTML = `
      <span>${signal.label}</span>
      <strong>${signal.value}</strong>
      <p>${signal.detail}</p>
    `;
    return card;
  }));
}

function renderRadar() {
  elements.modelDots.replaceChildren(...modelRadarSnapshot.models.map((model) => {
    const entry = view.leaders.find((leader) => leader.id === model.id) ?? {
      ...model,
      normalizedScore: 60
    };
    const provider = modelRadarSnapshot.providers.find((item) => item.id === model.providerId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "model-dot";
    button.dataset.stage = model.stage;
    button.dataset.active = String(model.id === state.selectedId);
    button.style.cssText = `${modelDotStyle(entry, today)} --accent: ${provider?.accent ?? "#fff"};`;
    button.innerHTML = `<span>${provider?.name ?? model.providerId}</span><strong>${model.name}</strong>`;
    button.addEventListener("click", () => {
      state.selectedId = model.id;
      renderRadar();
      renderLeaders();
      renderSelected();
    });
    return button;
  }));
}

function renderLeaders() {
  const top = view.leaders[0];
  elements.topModel.textContent = top ? `${top.provider.name} ${top.name}` : "--";
  elements.leaderList.replaceChildren(...view.leaders.map((model, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "leader-row";
    button.dataset.active = String(model.id === state.selectedId);
    button.style.setProperty("--accent", model.provider?.accent ?? "#fff");
    button.innerHTML = `
      <span class="rank">${String(index + 1).padStart(2, "0")}</span>
      <span>
        <strong>${model.name}</strong>
        <em>${model.provider.name} / ${shortDate(model.releasedAt)}</em>
      </span>
      <b>${Math.round(model.normalizedScore)}</b>
    `;
    button.addEventListener("click", () => {
      state.selectedId = model.id;
      renderRadar();
      renderLeaders();
      renderSelected();
    });
    return button;
  }));
}

function renderSelected() {
  const model = modelRadarSnapshot.models.find((item) => item.id === state.selectedId) ?? modelRadarSnapshot.models[0];
  const provider = modelRadarSnapshot.providers.find((item) => item.id === model.providerId);
  const sourceLinks = model.sourceRefs
    .map((sourceId) => modelRadarSnapshot.sources.find((source) => source.id === sourceId))
    .filter(Boolean)
    .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`)
    .join("");

  elements.selectedModel.style.setProperty("--accent", provider?.accent ?? "#fff");
  elements.selectedModel.innerHTML = `
    <div class="model-title">
      <span>${provider?.name ?? model.providerId}</span>
      <h2>${model.name}</h2>
      <p>${model.posture}</p>
    </div>
    <div class="model-facts">
      <div><span>release</span><strong>${shortDate(model.releasedAt)}</strong></div>
      <div><span>context</span><strong>${formatTokenWindow(model.contextTokens)}</strong></div>
      <div><span>output</span><strong>${formatTokenWindow(model.outputTokens)}</strong></div>
      <div><span>stage</span><strong>${model.stage}</strong></div>
    </div>
    <div class="metric-grid">
      ${renderMetric("reason", model.scores.reasoning)}
      ${renderMetric("code", model.scores.coding)}
      ${renderMetric("agent", model.scores.agent)}
      ${renderMetric("vision", model.scores.vision)}
      ${renderMetric("ctx", model.scores.context)}
      ${renderMetric("cost", model.scores.cost)}
    </div>
    <div class="signal-copy">
      <p><strong>发生了什么</strong>${model.shift}</p>
      <p><strong>将要看什么</strong>${model.nearFuture}</p>
    </div>
    <div class="badge-row">${model.badges.map((badge) => `<span>${badge}</span>`).join("")}</div>
    <div class="source-links">${sourceLinks}</div>
  `;
}

function renderMetric(label, value) {
  return `
    <div class="metric">
      <span>${label}</span>
      <i style="${metricBarStyle(value)}"></i>
      <strong>${Math.round(value)}</strong>
    </div>
  `;
}

function renderClocks() {
  elements.clockList.replaceChildren(...view.providerClocks.map((clock) => {
    const row = document.createElement("article");
    row.className = "clock-row";
    row.dataset.status = clock.status;
    row.style.setProperty("--accent", clock.provider?.accent ?? "#fff");
    row.innerHTML = `
      <div>
        <strong>${clock.provider.name}</strong>
        <span>${clock.latestLabel} / ${shortDate(clock.latestDate)}</span>
      </div>
      <div class="clock-bar"><i style="--value: ${Math.round(Math.min(100, clock.progress * 100))}%;"></i></div>
      <b>${clockStatusLabel(clock.status)}</b>
      <em>${clock.nextWindowLabel}</em>
    `;
    return row;
  }));
}

function renderSources() {
  elements.sourceList.replaceChildren(...modelRadarSnapshot.sources.map((source) => {
    const provider = modelRadarSnapshot.providers.find((item) => item.id === source.providerId);
    const link = document.createElement("a");
    link.className = "source-row";
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.style.setProperty("--accent", provider?.accent ?? "#fff");
    link.innerHTML = `
      <span>${provider?.name ?? source.providerId}</span>
      <strong>${source.label}</strong>
      <em>${sourceFreshnessLabel(source, today)} / ${source.foundSignals?.slice(0, 2).join(", ") || "watch"}</em>
    `;
    return link;
  }));
}

init();
