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
  const winner = rankModelsForMode(modelRadarSnapshot, "value")[0];
  const flashDecision = autoMatchModel(modelRadarSnapshot, winner.id, "value");
  assert.equal(flashDecision.winner.id, winner.id);
  assert.notEqual(flashDecision.comparison.id, flashDecision.winner.id);
  assert.notEqual(flashDecision.comparison.providerId, flashDecision.winner.providerId);

  const otherDecision = autoMatchModel(modelRadarSnapshot, "amazon-nova-2-omni", "value");
  assert.equal(otherDecision.comparison.id, otherDecision.winner.id);
});

test("code-agent mode requires enough specialist evidence", () => {
  const decision = autoMatchModel(modelRadarSnapshot, "amazon-nova-2-omni", "code-agent");
  const flash = decision.ranking.find((model) => model.id === "zhipu-glm-5-3-flash");
  const nova = decision.ranking.find((model) => model.id === "amazon-nova-2-omni");

  assert.equal(decision.winner.eligible, true);
  assert.ok(decision.winner.evidence.some((entry) => entry.metric.id === "aa-coding-agent"));
  assert.equal(flash.eligible, true);
  assert.ok(flash.evidence.some((entry) => entry.metric.id === "terminalbench"));
  assert.equal(nova.eligible, false);
  assert.match(evidenceLabel(nova.evidenceRatio), /证据覆盖/);
});

test("evidence coverage is described without claiming recommendation confidence", () => {
  assert.equal(evidenceLabel(1), "证据覆盖 100%");
  assert.equal(evidenceLabel(0.55), "证据覆盖 55%");
});
