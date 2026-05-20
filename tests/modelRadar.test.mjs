import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildRadarViewModel,
  estimateReleaseClocks,
  formatTokenWindow,
  getFrontierModels,
  normalizeModelScore,
  validateRadarData
} from "../src/model-radar.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

test("snapshot covers official frontier providers with source-backed latest models", () => {
  const errors = validateRadarData(modelRadarSnapshot);

  assert.deepEqual(errors, []);
  assert.ok(modelRadarSnapshot.providers.length >= 10);
  assert.ok(modelRadarSnapshot.models.length >= 10);

  for (const model of modelRadarSnapshot.models) {
    assert.ok(model.sourceRefs.length >= 1, `${model.id} is missing official source refs`);
    assert.ok(model.scores.reasoning >= 0 && model.scores.reasoning <= 100);
    assert.ok(model.scores.coding >= 0 && model.scores.coding <= 100);
    assert.ok(model.scores.agent >= 0 && model.scores.agent <= 100);
    assert.ok(model.scores.context >= 0 && model.scores.context <= 100);
  }

  for (const source of modelRadarSnapshot.sources) {
    assert.match(source.url, /^https:\/\//);
    assert.ok(source.official);
  }
});

test("frontier ranking rewards capability and freshness before price alone", () => {
  const models = getFrontierModels(modelRadarSnapshot, { limit: 6, today: "2026-05-19" });
  const ids = models.map((entry) => entry.id);

  assert.equal(ids[0], "openai-gpt-5-5");
  assert.ok(ids.includes("anthropic-claude-opus-4-7"));
  assert.ok(ids.includes("google-gemini-3-1-pro-preview"));
  assert.ok(ids.indexOf("deepseek-v4-pro") > ids.indexOf("openai-gpt-5-5"));
});

test("normalized score blends reasoning, coding, agency, context, cost, and freshness", () => {
  const openai = modelRadarSnapshot.models.find((model) => model.id === "openai-gpt-5-5");
  const meta = modelRadarSnapshot.models.find((model) => model.id === "meta-llama-4-scout-maverick");

  assert.ok(openai);
  assert.ok(meta);
  assert.ok(normalizeModelScore(openai, "2026-05-19") > normalizeModelScore(meta, "2026-05-19"));
});

test("release clocks show watch windows without promising launch dates", () => {
  const clocks = estimateReleaseClocks(modelRadarSnapshot.providers, "2026-05-19");
  const anthropic = clocks.find((clock) => clock.providerId === "anthropic");
  const amazon = clocks.find((clock) => clock.providerId === "amazon");

  assert.ok(anthropic);
  assert.equal(anthropic.status, "cooldown");
  assert.ok(anthropic.nextWindowLabel.includes("watch"));

  assert.ok(amazon);
  assert.equal(amazon.status, "sunset");
  assert.ok(amazon.nextWindowLabel.includes("retirement"));
});

test("view model compresses the world into glanceable lanes", () => {
  const view = buildRadarViewModel(modelRadarSnapshot, "2026-05-19");

  assert.equal(view.generatedAt, modelRadarSnapshot.generatedAt);
  assert.ok(view.leaders.length >= 5);
  assert.ok(view.providerClocks.length >= 10);
  assert.ok(view.worldSignals.length >= 4);
  assert.ok(view.watchlist.some((entry) => entry.kind === "source-change" || entry.kind === "launch-window"));
});

test("large context windows are formatted as scan labels", () => {
  assert.equal(formatTokenWindow(1000000), "1M");
  assert.equal(formatTokenWindow(128000), "128K");
  assert.equal(formatTokenWindow(null), "n/a");
});
