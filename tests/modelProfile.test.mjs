import assert from "node:assert/strict";
import { test } from "node:test";

import { buildModelProfile, missingMetricReason, profileGeometry } from "../src/model-profile.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

test("five-dimensional profile keeps lower price as higher value", () => {
  const deepseek = buildModelProfile(modelRadarSnapshot, "deepseek-v4-pro");
  const fable = buildModelProfile(modelRadarSnapshot, "anthropic-claude-fable-5");
  const deepseekValue = deepseek.dimensions.find((dimension) => dimension.metricId === "output-price");
  const fableValue = fable.dimensions.find((dimension) => dimension.metricId === "output-price");

  assert.ok(deepseekValue.score > fableValue.score);
  assert.equal(deepseekValue.measurement.value, 0.87);
  assert.equal(deepseek.accent, "#4d6bfe");
  assert.equal(fable.accent, "#d97757");
});

test("complete profiles close while incomplete profiles preserve gaps", () => {
  const grok = buildModelProfile(modelRadarSnapshot, "xai-grok-4-5");
  const command = buildModelProfile(modelRadarSnapshot, "cohere-command-a-plus");
  const grokGeometry = profileGeometry(grok);
  const commandGeometry = profileGeometry(command);

  assert.equal(grok.knownCount, 5);
  assert.equal(grok.complete, true);
  assert.equal(grokGeometry.polygon.split(" ").length, 5);
  assert.equal(grokGeometry.segments.length, 5);
  assert.equal(command.complete, false);
  assert.equal(commandGeometry.polygon, null);
  assert.ok(command.dimensions.some((dimension) => dimension.missingReason));
});

test("five-axis frame geometry stays fixed across model selections", () => {
  const grokGeometry = profileGeometry(buildModelProfile(modelRadarSnapshot, "xai-grok-4-5"));
  const commandGeometry = profileGeometry(buildModelProfile(modelRadarSnapshot, "cohere-command-a-plus"));
  const frame = (geometry) => ({
    center: geometry.center,
    radius: geometry.radius,
    axes: geometry.axes.map((axis) => ({ end: axis.end, label: axis.label, angle: axis.angle }))
  });

  assert.deepEqual(frame(grokGeometry), frame(commandGeometry));
});

test("missing values explain the current verification state", () => {
  assert.equal(missingMetricReason("arena-elo").short, "榜单未确认");
  assert.equal(missingMetricReason("terminalbench").short, "未公布同口径成绩");
  assert.equal(missingMetricReason("output-price").short, "公开价格未确认");
});
