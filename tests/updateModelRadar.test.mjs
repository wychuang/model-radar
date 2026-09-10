import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import {
  buildSourceStatus,
  extractSignals,
  mergeSourceStatuses,
  runUpdate
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

test("a failed check preserves the last successful signals and change history", () => {
  const firstDay = "2026-09-01T00:00:00.000Z";
  const changedDay = "2026-09-02T00:00:00.000Z";
  const seed = { ...modelRadarSeed, sources: [{ ...modelRadarSeed.sources[0], watch: ["old model", "new model"] }] };
  const initial = mergeSourceStatuses(seed, [{ id: seed.sources[0].id, ok: true,
    lastCheckedAt: firstDay, sha256: "old", foundSignals: ["old model"], error: "" }], firstDay);
  const changed = mergeSourceStatuses(seed, [{ id: seed.sources[0].id, ok: true,
    lastCheckedAt: changedDay, sha256: "new", foundSignals: ["new model"], error: "" }], changedDay, initial);
  const failed = mergeSourceStatuses(seed, [{ id: seed.sources[0].id, ok: false,
    lastCheckedAt: "2026-09-03T00:00:00.000Z", sha256: "", foundSignals: [], error: "HTTP 403 Forbidden" }],
  "2026-09-03T00:00:00.000Z", changed);
  const recovered = mergeSourceStatuses(seed, [{ id: seed.sources[0].id, ok: true,
    lastCheckedAt: "2026-09-04T00:00:00.000Z", sha256: "new", foundSignals: ["new model"], error: "" }],
  "2026-09-04T00:00:00.000Z", failed);

  assert.deepEqual(initial.sources[0].signalChange, null, "first fetch establishes a baseline");
  assert.equal(failed.sources[0].lastSuccessAt, changedDay);
  assert.equal(failed.sources[0].lastChangedAt, changedDay);
  assert.equal(failed.sources[0].sha256, "new");
  assert.deepEqual(failed.sources[0].foundSignals, ["new model"]);
  assert.deepEqual(failed.sources[0].signalChange, { detectedAt: changedDay, added: ["new model"], removed: ["old model"] });
  assert.equal(recovered.sources[0].changed, false);
  assert.equal(recovered.sources[0].lastChangedAt, changedDay);
  assert.deepEqual(recovered.sources[0].signalChange, failed.sources[0].signalChange);
  assert.deepEqual(recovered.models, seed.models);
});

test("changing a source URL resets its observation baseline", () => {
  const source = modelRadarSeed.sources[0];
  const previous = { sources: [{ ...source, ok: true, sha256: "old", foundSignals: ["old"],
    lastChangedAt: "2026-09-01T00:00:00.000Z", signalChange: { added: ["old"], removed: [] } }] };
  const seed = { ...modelRadarSeed, sources: [{ ...source, url: `${source.url}?revision=2` }] };
  const snapshot = mergeSourceStatuses(seed, [{ id: source.id, ok: true, sha256: "new",
    foundSignals: ["new"], lastCheckedAt: "2026-09-02T00:00:00.000Z" }], "2026-09-02T00:00:00.000Z", previous);

  assert.equal(snapshot.sources[0].changed, false);
  assert.equal(snapshot.sources[0].lastChangedAt, null);
  assert.equal(snapshot.sources[0].signalChange, null);
});

test("editing watched terms does not invent page signals, even across a failed check", () => {
  const source = { ...modelRadarSeed.sources[0], watch: ["old", "shared"] };
  const previous = { sources: [{ ...source, ok: true, sha256: "same-page", foundSignals: ["old", "shared"],
    lastCheckedAt: "2026-09-01T00:00:00.000Z" }] };
  const seed = { ...modelRadarSeed, sources: [{ ...source, watch: ["new", "shared"] }] };
  const status = { id: source.id, ok: true, sha256: "same-page", foundSignals: ["new", "shared"],
    lastCheckedAt: "2026-09-02T00:00:00.000Z" };
  const direct = mergeSourceStatuses(seed, [status], status.lastCheckedAt, previous);
  const failed = mergeSourceStatuses(seed, [{ ...status, ok: false, foundSignals: [], error: "timeout" }], status.lastCheckedAt, previous);
  const recovered = mergeSourceStatuses(seed, [status], status.lastCheckedAt, failed);
  assert.equal(direct.sources[0].signalChange, null);
  assert.equal(recovered.sources[0].signalChange, null);
  assert.deepEqual(recovered.sources[0].foundSignals, ["new", "shared"]);
  const changed = mergeSourceStatuses(seed, [{ ...status, sha256: "changed", foundSignals: ["new"] }], status.lastCheckedAt, recovered);
  assert.deepEqual(changed.sources[0].signalChange.removed, ["shared"], "terms still being monitored retain real changes");
});

test("runUpdate writes a snapshot using previous observations without changing curated rows", async () => {
  const directory = await mkdtemp(join(tmpdir(), "model-radar-test-"));
  try {
    const source = modelRadarSeed.sources[0];
    const seed = { ...modelRadarSeed, sources: [source] };
    const previousSnapshot = { sources: [{ ...source, ok: true, sha256: "baseline",
      foundSignals: [], lastCheckedAt: "2026-09-01T00:00:00.000Z" }] };
    const outputPath = join(directory, "snapshot.mjs");
    const requested = [];
    const result = await runUpdate({ seed, previousSnapshot, outputPath, delayMs: 0,
      fetchText: async (url) => { requested.push(url); return source.watch[0]; } });
    const saved = JSON.parse((await readFile(outputPath, "utf8")).replace(/^export const modelRadarSnapshot = /, "").replace(/;\s*$/, ""));

    assert.deepEqual(requested, [source.url]);
    assert.deepEqual(saved, result);
    assert.deepEqual(result.models, seed.models);
    assert.deepEqual(result.events, seed.events);
    assert.deepEqual(result.sources[0].signalChange.added, [source.watch[0]]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
