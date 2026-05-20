import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildSourceStatus,
  extractSignals,
  mergeSourceStatuses
} from "../scripts/update-model-radar.mjs";
import { modelRadarSeed } from "../src/model-radar-seed.mjs";

test("extractSignals finds exact official model identifiers from source pages", () => {
  const signals = extractSignals("<main>Now featuring gpt-5.5, claude-opus-4-7, and grok-4-3.</main>", [
    "gpt-5.5",
    "claude-opus-4-7",
    "gemini-3.1-pro",
    "grok-4-3"
  ]);

  assert.deepEqual(signals, ["gpt-5.5", "claude-opus-4-7", "grok-4-3"]);
});

test("buildSourceStatus records source freshness without live network in tests", async () => {
  const fetchedAt = "2026-05-19T12:05:00.000Z";
  const source = {
    id: "openai-models",
    providerId: "openai",
    label: "OpenAI models",
    url: "https://platform.openai.com/docs/models/gpt-5.5",
    official: true,
    watch: ["gpt-5.5", "gpt-5.4"]
  };

  const status = await buildSourceStatus(source, {
    fetchedAt,
    fetchText: async () => "Official docs list GPT-5.5 and gpt-5.4."
  });

  assert.equal(status.id, source.id);
  assert.equal(status.lastCheckedAt, fetchedAt);
  assert.equal(status.ok, true);
  assert.match(status.sha256, /^[a-f0-9]{64}$/);
  assert.deepEqual(status.foundSignals, ["gpt-5.5", "gpt-5.4"]);
});

test("mergeSourceStatuses creates a generated snapshot and preserves curated rows", () => {
  const status = {
    id: modelRadarSeed.sources[0].id,
    lastCheckedAt: "2026-05-19T12:05:00.000Z",
    ok: true,
    sha256: "a".repeat(64),
    foundSignals: modelRadarSeed.sources[0].watch.slice(0, 1)
  };
  const snapshot = mergeSourceStatuses(modelRadarSeed, [status], "2026-05-19T12:05:00.000Z");

  assert.equal(snapshot.generatedAt, "2026-05-19T12:05:00.000Z");
  assert.equal(snapshot.sources[0].lastCheckedAt, status.lastCheckedAt);
  assert.equal(snapshot.models.length, modelRadarSeed.models.length);
  assert.ok(snapshot.refresh.nextRunHint.includes("daily"));
});
