import assert from "node:assert/strict";
import { test } from "node:test";

import {
  clockStatusLabel,
  metricBarStyle,
  modelDotStyle,
  shortDate
} from "../src/ui-helpers.mjs";

test("clock labels are short enough for dense radar lanes", () => {
  assert.equal(clockStatusLabel("cooldown"), "cool");
  assert.equal(clockStatusLabel("tracking"), "track");
  assert.equal(clockStatusLabel("watch"), "watch");
  assert.equal(clockStatusLabel("overdue"), "late");
  assert.equal(clockStatusLabel("sunset"), "retire");
});

test("metric bar style clamps model scores to stable percentages", () => {
  assert.equal(metricBarStyle(123), "--value: 100%;");
  assert.equal(metricBarStyle(-10), "--value: 0%;");
  assert.equal(metricBarStyle(87.4), "--value: 87.4%;");
});

test("model dot style projects score and release recency into a radar coordinate", () => {
  const style = modelDotStyle({ normalizedScore: 93, releasedAt: "2026-05-09" }, "2026-05-19");

  assert.match(style, /--x: 93%/);
  assert.match(style, /--fresh: 90%/);
});

test("shortDate keeps absolute dates compact", () => {
  assert.equal(shortDate("2026-05-19"), "May 19");
});
