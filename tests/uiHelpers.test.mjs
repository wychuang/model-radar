import assert from "node:assert/strict";
import { test } from "node:test";
import * as helpers from "../src/ui-helpers.mjs";

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

test("source labels expose failure details and persistent dated changes", () => {
  assert.equal(typeof helpers.sourceStatusLabel, "function");
  const { sourceStatusLabel } = helpers;
  assert.match(sourceStatusLabel({ ok: false, error: "HTTP 403 Forbidden" }), /检查失败.*HTTP 403 Forbidden/);
  assert.match(sourceStatusLabel({ ok: true, changed: false, lastChangedAt: "2026-09-02T00:00:00.000Z" }), /最近页面变化 2026-09-02/);
  assert.match(sourceStatusLabel({ ok: true, signalChange: { detectedAt: "2026-09-02", added: ["new model"], removed: ["old model"] } }), /新增 new model.*消失 old model/);
  assert.match(sourceStatusLabel({ ok: null }), /尚未检查/);
});

test("summary makes the age of the newest measured value visible", () => {
  assert.equal(typeof helpers.evidenceSummaryLabel, "function");
  const { evidenceSummaryLabel } = helpers;
  assert.match(evidenceSummaryLabel({ oldest: "2026-06-09", newest: "2026-08-07", ageDays: 34 }), /2026-06-09.*2026-08-07.*34 天/);
  assert.match(evidenceSummaryLabel({ oldest: null, newest: null, ageDays: null }), /评测日期未知/);
});

test("past deadlines ask for verification without claiming the event occurred", () => {
  assert.equal(eventStatusLabel("deadline", "2026-08-31", "2026-09-10"), "日期已过，待核实");
  assert.equal(eventStatusLabel("deadline", "2026-09-10", "2026-09-10"), "今日到期，待核实");
  assert.equal(eventStatusLabel("deadline", "2026-10-10", "2026-09-10"), "将到期");
  assert.equal(eventStatusLabel("watch", "2026-08-01", "2026-09-10"), "待官方确认");
});
