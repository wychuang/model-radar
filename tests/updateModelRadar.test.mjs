import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildSourceStatus,
  extractSignals,
  mergeSourceStatuses
} from "../scripts/update-model-radar.mjs";
import { modelRadarSeed } from "../src/model-radar-seed.mjs";

test("extractSignals finds model and benchmark identifiers from watched pages", () => {
  const signals = extractSignals("<main>GPT-5.6, Claude Opus 5, and Terminal-Bench are listed.</main>", [
    "gpt-5.6",
    "claude opus 5",
    "terminal-bench",
    "qwen3.8"
  ]);

  assert.deepEqual(signals, ["gpt-5.6", "claude opus 5", "terminal-bench"]);
});

test("buildSourceStatus records freshness without live network in tests", async () => {
  const fetchedAt = "2026-08-06T00:00:00.000Z";
  const source = modelRadarSeed.sources.find((item) => item.id === "benchmark-arena");
  const status = await buildSourceStatus(source, {
    fetchedAt,
    fetchText: async () => "Leaderboard includes Claude-Fable-5 and Qwen3.8."
  });

  assert.equal(status.id, source.id);
  assert.equal(status.lastCheckedAt, fetchedAt);
  assert.equal(status.ok, true);
  assert.match(status.sha256, /^[a-f0-9]{64}$/);
  assert.deepEqual(status.foundSignals, ["leaderboard", "claude-fable-5", "qwen3.8"]);
});

test("mergeSourceStatuses preserves curated benchmark rows", () => {
  const status = {
    id: modelRadarSeed.sources[0].id,
    lastCheckedAt: "2026-08-06T00:00:00.000Z",
    ok: true,
    sha256: "a".repeat(64),
    foundSignals: modelRadarSeed.sources[0].watch.slice(0, 1)
  };
  const snapshot = mergeSourceStatuses(modelRadarSeed, [status], "2026-08-06T00:00:00.000Z");

  assert.equal(snapshot.generatedAt, "2026-08-06T00:00:00.000Z");
  assert.equal(snapshot.sources[0].lastCheckedAt, status.lastCheckedAt);
  assert.equal(snapshot.models.length, modelRadarSeed.models.length);
  assert.equal(snapshot.benchmarks.length, modelRadarSeed.benchmarks.length);
  assert.ok(snapshot.refresh.nextRunHint.includes("daily"));
});

test("mergeSourceStatuses compares with the previous successful page hash", () => {
  const source = { ...modelRadarSeed.sources[0], sha256: "a".repeat(64) };
  const seed = { ...modelRadarSeed, sources: [source, ...modelRadarSeed.sources.slice(1)] };
  const changed = mergeSourceStatuses(seed, [{
    id: source.id,
    lastCheckedAt: "2026-08-06T01:00:00.000Z",
    ok: true,
    sha256: "b".repeat(64),
    foundSignals: []
  }], "2026-08-06T01:00:00.000Z");
  const failed = mergeSourceStatuses(seed, [{
    id: source.id,
    lastCheckedAt: "2026-08-06T02:00:00.000Z",
    ok: false,
    sha256: "",
    foundSignals: [],
    error: "timeout"
  }], "2026-08-06T02:00:00.000Z");

  assert.equal(changed.sources[0].changed, true);
  assert.equal(failed.sources[0].sha256, source.sha256);
});
