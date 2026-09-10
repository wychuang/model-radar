import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildRadarViewModel,
  estimateReleaseClocks,
  formatMetricValue,
  formatTokenWindow,
  getMetricMeasurement,
  metricCoverage,
  rankModelsByMetric,
  validateRadarData
} from "../src/model-radar.mjs";

test("price evidence belongs to its price row, and mismatched benchmark versions are excluded", () => {
  const model = { sourceRefs: ["release"], priceUsd: { outputPerMTok: 1.32, sourceId: "pricing", asOf: "2026-09-10", note: "高峰价" },
    benchmarks: { "aa-index": { value: 50, version: "4.2" } } };
  const price = getMetricMeasurement(model, { derivedFrom: "outputPrice", asOf: "2026-08-01" });
  assert.equal(price.asOf, "2026-09-10");
  assert.equal(price.sourceId, "pricing");
  assert.equal(price.note, "高峰价");
  assert.equal(getMetricMeasurement(model, { id: "aa-index", version: "4.3" }), null);
});
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

test("snapshot covers current provider lanes and traceable benchmark sources", () => {
  const errors = validateRadarData(modelRadarSnapshot);

  assert.deepEqual(errors, []);
  assert.ok(modelRadarSnapshot.providers.length >= 12);
  assert.ok(modelRadarSnapshot.models.length >= 14);
  assert.ok(modelRadarSnapshot.benchmarks.length >= 14);

  for (const model of modelRadarSnapshot.models) {
    assert.ok(model.sourceRefs.length >= 1, `${model.id} is missing official source refs`);
  }

  for (const source of modelRadarSnapshot.sources) {
    assert.match(source.url, /^https:\/\//);
    assert.ok(["provider", "benchmark"].includes(source.sourceType));
  }
});

test("published views share seven primary metrics and retain measured specialist evidence", () => {
  const primaryMetricIds = modelRadarSnapshot.benchmarks
    .filter((metric) => metric.radar !== false)
    .map((metric) => metric.id);
  const specialistMetricIds = new Set(
    modelRadarSnapshot.benchmarks
      .filter((metric) => metric.radar === false)
      .map((metric) => metric.id)
  );
  const deepSeekFlash = modelRadarSnapshot.models.find((model) => model.id === "deepseek-v4-flash-0731");
  const measuredSpecialists = Object.entries(deepSeekFlash?.benchmarks ?? {})
    .filter(([metricId, measurement]) => specialistMetricIds.has(metricId) && Number.isFinite(measurement?.value));

  assert.deepEqual(primaryMetricIds, [
    "aa-index",
    "arena-elo",
    "output-speed",
    "swebench-pro",
    "terminalbench",
    "output-price",
    "context-window"
  ]);
  assert.equal(measuredSpecialists.length, 9);
});

test("AA index and Arena preserve their own source-backed ranking", () => {
  const aa = rankModelsByMetric(modelRadarSnapshot, "aa-index");
  const arena = rankModelsByMetric(modelRadarSnapshot, "arena-elo");

  assert.equal(aa[0].id, "anthropic-claude-fable-5-1");
  assert.equal(aa[0].metricValue, 53.37);
  assert.equal(arena[0].id, "anthropic-claude-fable-5");
  assert.equal(arena[0].measurement.rank, 1);
});

test("lower-is-better metrics invert the order and leave missing rows last", () => {
  const price = rankModelsByMetric(modelRadarSnapshot, "output-price");
  const covered = price.filter((row) => Number.isFinite(row.metricValue));
  const missing = price.filter((row) => !Number.isFinite(row.metricValue));

  assert.equal(covered[0].id, "zhipu-glm-5-3-flash");
  assert.equal(covered[0].metricValue, 0.5);
  assert.ok(missing.some((row) => row.id === "cohere-command-a-plus"));
  assert.ok(price.indexOf(missing[0]) > price.indexOf(covered.at(-1)));
});

test("coverage counts expose benchmark gaps instead of inventing scores", () => {
  assert.deepEqual(metricCoverage(modelRadarSnapshot, "aa-index"), {
    covered: 17,
    total: 20,
    ratio: 17 / 20
  });
  assert.equal(metricCoverage(modelRadarSnapshot, "output-speed").covered, 17);
  assert.equal(metricCoverage(modelRadarSnapshot, "terminalbench").covered, 16);
  assert.equal(metricCoverage(modelRadarSnapshot, "aa-coding-agent").covered, 5);
});

test("release clocks expose inferred historical cadence bands", () => {
  const clocks = estimateReleaseClocks(modelRadarSnapshot.providers, "2026-08-06");
  const anthropic = clocks.find((clock) => clock.providerId === "anthropic");
  const amazon = clocks.find((clock) => clock.providerId === "amazon");

  assert.equal(anthropic.status, "cooldown");
  assert.ok(anthropic.nextWindowLabel.includes("watch"));
  assert.equal(amazon.status, "overdue");
});

test("view model carries benchmarks, events, sources, and glance signals", () => {
  const view = buildRadarViewModel(modelRadarSnapshot, "2026-08-06");
  const noisySnapshot = {
    ...modelRadarSnapshot,
    sources: modelRadarSnapshot.sources.map((source) => ({ ...source, changed: true }))
  };
  const noisyView = buildRadarViewModel(noisySnapshot, "2026-08-06");

  assert.equal(view.generatedAt, modelRadarSnapshot.generatedAt);
  assert.equal(view.benchmarks.length, modelRadarSnapshot.benchmarks.length);
  assert.ok(view.events.length >= 6);
  assert.ok(view.providerClocks.length >= 12);
  assert.ok(view.worldSignals.length >= 5);
  assert.ok(view.watchlist.some((entry) => entry.kind === "event"));
  assert.ok(noisyView.watchlist.some((entry) => entry.kind === "event"));
  assert.ok(noisyView.watchlist.some((entry) => entry.kind === "source-change"));
});

test("metric and token values stay compact and explicit", () => {
  const percent = modelRadarSnapshot.benchmarks.find((metric) => metric.id === "swebench-pro");
  const price = modelRadarSnapshot.benchmarks.find((metric) => metric.id === "output-price");
  const speed = modelRadarSnapshot.benchmarks.find((metric) => metric.id === "output-speed");

  assert.equal(formatMetricValue(percent, 64.6), "64.6%");
  assert.equal(formatMetricValue(price, 0.87), "$0.87");
  assert.equal(formatMetricValue(speed, 102.4), "102.4 t/s");
  assert.equal(formatMetricValue(price, null), "N/A");
  assert.equal(formatTokenWindow(1050000), "1.05M");
  assert.equal(formatTokenWindow(128000), "128K");
  assert.equal(formatTokenWindow(null), "N/A");
});

test("view separates actual measurement dates from a recent source check", () => {
  const snapshot = { ...modelRadarSnapshot, generatedAt: "2026-09-10T00:00:00.000Z",
    models: [{ ...modelRadarSnapshot.models[0], benchmarks: { "aa-index": { value: 50, asOf: "2026-08-01" },
      "arena-elo": { value: 1400, asOf: "2026-08-07" } } }],
    sources: [{ id: "healthy", ok: true }, { id: "unread", ok: null },
      { id: "failed", ok: false, error: "HTTP 403" }] };
  const view = buildRadarViewModel(snapshot, "2026-09-10");

  assert.deepEqual(view.evidenceSummary, {
    oldest: "2026-08-01", newest: "2026-08-07", ageDays: 34,
    total: 3, successful: 1, failed: 1, unchecked: 1
  });
  assert.equal(view.sources[0].id, "failed");
  assert.equal(snapshot.sources[0].id, "healthy", "sorting must not mutate the snapshot");
});
