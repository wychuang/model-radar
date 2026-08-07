import assert from "node:assert/strict";
import { test } from "node:test";

import {
  clockStatusLabel,
  eventStatusLabel,
  isoShortDate,
  metricBarStyle,
  shortDate
} from "../src/ui-helpers.mjs";

test("clock and event labels stay compact", () => {
  assert.equal(clockStatusLabel("cooldown"), "周期前段");
  assert.equal(clockStatusLabel("tracking"), "接近常见区间");
  assert.equal(clockStatusLabel("watch"), "进入常见区间");
  assert.equal(clockStatusLabel("overdue"), "超过常见区间");
  assert.equal(eventStatusLabel("released"), "已发生");
  assert.equal(eventStatusLabel("watch"), "待官方确认");
  assert.equal(eventStatusLabel("deadline"), "将到期");
});

test("metric bars respect source ranges and lower-is-better direction", () => {
  assert.equal(metricBarStyle(65, { min: 25, max: 65, direction: "higher" }), "--value: 100%;");
  assert.equal(metricBarStyle(25, { min: 25, max: 65, direction: "higher" }), "--value: 2%;");
  assert.equal(metricBarStyle(0, { min: 0, max: 50, direction: "lower" }), "--value: 100%;");
  assert.equal(metricBarStyle(50, { min: 0, max: 50, direction: "lower" }), "--value: 2%;");
  assert.equal(metricBarStyle(null, { min: 0, max: 100 }), "--value: 0%;");
});

test("date helpers keep absolute dates scan-friendly", () => {
  assert.equal(shortDate("2026-08-06"), "Aug 06");
  assert.equal(isoShortDate("2026-08-06"), "2026-08-06");
});
