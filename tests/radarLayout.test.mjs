import assert from "node:assert/strict";
import { test } from "node:test";

import { rankModelsByMetric } from "../src/model-radar.mjs";
import { metricQuality, modelAgeDays, placeRadarLabels, projectRadarModels, radarSweepDiameter, shortModelName } from "../src/radar-layout.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

test("radar projects higher-is-better metrics toward the right", () => {
  const metric = modelRadarSnapshot.benchmarks.find((entry) => entry.id === "aa-index");
  const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
  const points = projectRadarModels(ranking, metric, "2026-08-06");
  const leader = points.find((entry) => entry.id === "anthropic-claude-opus-5");
  const mistral = points.find((entry) => entry.id === "mistral-medium-3-5");

  assert.ok(leader.radar.x > mistral.radar.x);
  assert.equal(leader.radar.missing, false);
  assert.equal(leader.radar.ageDays, 13);
});

test("radar inverts lower-is-better metrics without changing raw values", () => {
  const metric = modelRadarSnapshot.benchmarks.find((entry) => entry.id === "output-price");
  const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
  const points = projectRadarModels(ranking, metric, "2026-08-06");
  const deepseek = points.find((entry) => entry.id === "deepseek-v4-pro");
  const fable = points.find((entry) => entry.id === "anthropic-claude-fable-5");

  assert.ok(deepseek.radar.x > fable.radar.x);
  assert.equal(deepseek.metricValue, 0.87);
  assert.ok(metricQuality(0.87, metric) > metricQuality(50, metric));
});

test("confirmed measurements leave the no-signal lane", () => {
  const metric = modelRadarSnapshot.benchmarks.find((entry) => entry.id === "terminalbench");
  const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
  const points = projectRadarModels(ranking, metric, "2026-08-06");
  const openai = points.find((entry) => entry.id === "openai-gpt-5-6-sol");
  const grok = points.find((entry) => entry.id === "xai-grok-4-5");

  assert.equal(openai.radar.missing, false);
  assert.ok(openai.radar.x > grok.radar.x);
  assert.equal(grok.radar.missing, false);
  assert.ok(grok.radar.x >= 18);
});

test("freshness and compact callsigns remain deterministic", () => {
  assert.equal(modelAgeDays("2026-07-24", "2026-08-06"), 13);
  assert.equal(modelAgeDays("2026-07-24", "2026-08-06T23:59:00.000Z"), 13);
  assert.equal(shortModelName("Claude Opus 5"), "OPUS 5");
  assert.equal(shortModelName("DeepSeek-V4 Pro"), "DS V4 PRO");
});

test("scan sweep reaches the farthest corner on 2K and narrow radar fields", () => {
  for (const [width, height] of [[1850, 650], [390, 500]]) {
    const diameter = radarSweepDiameter(width, height);
    const centerX = width * 0.55;
    const centerY = height * 0.5;
    const farthestCorner = Math.max(
      Math.hypot(centerX, centerY),
      Math.hypot(width - centerX, centerY),
      Math.hypot(centerX, height - centerY),
      Math.hypot(width - centerX, height - centerY)
    );
    assert.ok(diameter / 2 >= farthestCorner);
  }
});

test("clustered persistent labels avoid each other and stay inside the radar field", () => {
  const clustered = [
    radarPoint("one", 1, 78, 17),
    radarPoint("two", 2, 80, 20),
    radarPoint("three", 3, 76, 23),
    radarPoint("selected", 4, 82, 18)
  ];
  const placed = placeRadarLabels(clustered, {
    width: 600,
    height: 400,
    labelWidth: 106,
    labelHeight: 44,
    topRankCount: 3,
    activeId: "selected"
  });

  for (const point of placed) {
    const rect = point.radar.labelRect;
    assert.ok(rect.x >= 0);
    assert.ok(rect.y >= 0);
    assert.ok(rect.x + rect.width <= 600);
    assert.ok(rect.y + rect.height <= 400);
    assert.ok(point.radar.linkLength >= 8);
  }

  for (let left = 0; left < placed.length; left += 1) {
    for (let right = left + 1; right < placed.length; right += 1) {
      assert.equal(overlapArea(placed[left].radar.labelRect, placed[right].radar.labelRect), 0);
    }
  }
});

test("hover-only labels avoid the persistent top-three layout", () => {
  const points = [
    radarPoint("one", 1, 78, 17),
    radarPoint("two", 2, 80, 20),
    radarPoint("three", 3, 76, 23),
    radarPoint("hover", 8, 79, 27)
  ];
  const placed = placeRadarLabels(points, { width: 600, height: 400, labelWidth: 106, labelHeight: 44, topRankCount: 3 });
  const hover = placed.find((point) => point.id === "hover");

  for (const persistent of placed.filter((point) => point.computedRank <= 3)) {
    assert.equal(overlapArea(hover.radar.labelRect, persistent.radar.labelRect), 0);
  }
});

test("changing the active model cannot move radar labels", () => {
  const points = [
    radarPoint("one", 1, 78, 17),
    radarPoint("two", 2, 80, 20),
    radarPoint("three", 3, 76, 23),
    radarPoint("selected-a", 6, 82, 18),
    radarPoint("selected-b", 7, 79, 27)
  ];
  const options = { width: 600, height: 400, labelWidth: 106, labelHeight: 44 };
  const first = placeRadarLabels(points, { ...options, activeId: "selected-a" });
  const second = placeRadarLabels(points, { ...options, activeId: "selected-b" });

  assert.deepEqual(
    first.map((point) => point.radar.labelRect),
    second.map((point) => point.radar.labelRect)
  );
});

test("current Arena leaders stay readable in the real top-score cluster", () => {
  const metric = modelRadarSnapshot.benchmarks.find((entry) => entry.id === "arena-elo");
  const ranking = rankModelsByMetric(modelRadarSnapshot, metric.id);
  const projected = projectRadarModels(ranking, metric, "2026-08-07");
  const placed = placeRadarLabels(projected, {
    width: 900,
    height: 600,
    labelWidth: 106,
    labelHeight: 44,
    topRankCount: 3,
    activeId: "anthropic-claude-fable-5"
  });
  const persistent = placed.filter((point) => point.computedRank <= 3 || point.id === "anthropic-claude-fable-5");

  for (let left = 0; left < persistent.length; left += 1) {
    for (let right = left + 1; right < persistent.length; right += 1) {
      assert.equal(overlapArea(persistent[left].radar.labelRect, persistent[right].radar.labelRect), 0);
    }
  }

  for (const label of persistent) {
    for (const point of placed.filter((entry) => entry.id !== label.id)) {
      const node = { x: point.radar.x / 100 * 900, y: point.radar.y / 100 * 600 };
      assert.equal(pointInside(node, label.radar.labelRect), false);
    }
  }
});

function radarPoint(id, computedRank, x, y) {
  return {
    id,
    computedRank,
    radar: { x, y, missing: false }
  };
}

function overlapArea(left, right) {
  const width = Math.max(0, Math.min(left.x + left.width, right.x + right.width) - Math.max(left.x, right.x));
  const height = Math.max(0, Math.min(left.y + left.height, right.y + right.height) - Math.max(left.y, right.y));
  return width * height;
}

function pointInside(point, rect) {
  return point.x >= rect.x
    && point.x <= rect.x + rect.width
    && point.y >= rect.y
    && point.y <= rect.y + rect.height;
}
