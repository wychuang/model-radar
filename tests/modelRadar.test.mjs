import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildRadarViewModel,
  estimateReleaseClocks,
  formatMetricValue,
  formatTokenWindow,
  metricCoverage,
  rankModelsByMetric,
  validateRadarData
} from "../src/model-radar.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

test("snapshot covers current provider lanes and traceable benchmark sources", () => {
  const errors = validateRadarData(modelRadarSnapshot);

  assert.deepEqual(errors, []);
  assert.ok(modelRadarSnapshot.providers.length >= 12);
  assert.ok(modelRadarSnapshot.models.length >= 13);
  assert.ok(modelRadarSnapshot.benchmarks.length >= 6);

  for (const model of modelRadarSnapshot.models) {
    assert.ok(model.sourceRefs.length >= 1, `${model.id} is missing official source refs`);
  }

  for (const source of modelRadarSnapshot.sources) {
    assert.match(source.url, /^https:\/\//);
    assert.ok(["provider", "benchmark"].includes(source.sourceType));
  }
});

test("AA index and Arena preserve their own source-backed ranking", () => {
  const aa = rankModelsByMetric(modelRadarSnapshot, "aa-index");
  const arena = rankModelsByMetric(modelRadarSnapshot, "arena-elo");

  assert.equal(aa[0].id, "anthropic-claude-opus-5");
  assert.equal(aa[0].metricValue, 61);
  assert.equal(arena[0].id, "anthropic-claude-fable-5");
  assert.equal(arena[0].measurement.rank, 1);
});

test("lower-is-better metrics invert the order and leave missing rows last", () => {
  const price = rankModelsByMetric(modelRadarSnapshot, "output-price");
  const covered = price.filter((row) => Number.isFinite(row.metricValue));
  const missing = price.filter((row) => !Number.isFinite(row.metricValue));

  assert.equal(covered[0].id, "deepseek-v4-pro");
  assert.equal(covered[0].metricValue, 0.87);
  assert.ok(missing.some((row) => row.id === "cohere-command-a-plus"));
  assert.ok(price.indexOf(missing[0]) > price.indexOf(covered.at(-1)));
});

test("coverage counts expose benchmark gaps instead of inventing scores", () => {
  assert.deepEqual(metricCoverage(modelRadarSnapshot, "aa-index"), {
    covered: 11,
    total: 13,
    ratio: 11 / 13
  });
  assert.equal(metricCoverage(modelRadarSnapshot, "terminalbench").covered, 4);
});

test("release clocks expose inferred watch pressure", () => {
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

  assert.equal(formatMetricValue(percent, 64.6), "64.6%");
  assert.equal(formatMetricValue(price, 0.87), "$0.87");
  assert.equal(formatMetricValue(price, null), "N/A");
  assert.equal(formatTokenWindow(1050000), "1.05M");
  assert.equal(formatTokenWindow(128000), "128K");
  assert.equal(formatTokenWindow(null), "N/A");
});
