import assert from "node:assert/strict";
import { test } from "node:test";

import { autoMatchModel, evidenceLabel, rankModelsForMode } from "../src/model-choice.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

test("balanced mode produces one direct winner from well-covered evidence", () => {
  const ranking = rankModelsForMode(modelRadarSnapshot, "balanced");
  const winner = ranking[0];

  assert.equal(winner.eligible, true);
  assert.equal(winner.choiceRank, 1);
  assert.ok(winner.evidenceRatio >= 0.9);
  assert.ok(winner.evidence.some((entry) => entry.metric.id === "output-speed"));
});

test("automatic comparison uses the mode winner unless it is already selected", () => {
  const flashDecision = autoMatchModel(modelRadarSnapshot, "deepseek-v4-flash-0731", "value");
  assert.equal(flashDecision.winner.id, "deepseek-v4-flash-0731");
  assert.notEqual(flashDecision.comparison.id, flashDecision.winner.id);
  assert.notEqual(flashDecision.comparison.providerId, flashDecision.winner.providerId);

  const otherDecision = autoMatchModel(modelRadarSnapshot, "amazon-nova-2-omni", "value");
  assert.equal(otherDecision.comparison.id, otherDecision.winner.id);
});

test("code-agent mode requires enough specialist evidence", () => {
  const decision = autoMatchModel(modelRadarSnapshot, "amazon-nova-2-omni", "code-agent");
  const flash = decision.ranking.find((model) => model.id === "deepseek-v4-flash-0731");
  const nova = decision.ranking.find((model) => model.id === "amazon-nova-2-omni");

  assert.equal(decision.winner.id, "openai-gpt-5-6-sol");
  assert.equal(flash.eligible, true);
  assert.ok(flash.evidence.some((entry) => entry.metric.id === "terminalbench"));
  assert.equal(nova.eligible, false);
  assert.match(evidenceLabel(nova.evidenceRatio), /证据不足/);
});
