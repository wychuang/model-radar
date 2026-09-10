import assert from "node:assert/strict";
import { test } from "node:test";
import * as frontier from "../src/model-frontier.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

const model = (id, price, intelligence) => ({ id, name: id,
  priceUsd: { outputPerMTok: price }, benchmarks: { "aa-index": { value: intelligence, asOf: "2026-08-07" } } });

test("a previous intelligence index version cannot eliminate current models", () => {
  const old = model("old", 0.1, 99);
  old.benchmarks["aa-index"].version = "4.2";
  const current = model("current", 2, 50);
  current.benchmarks["aa-index"].version = "4.3";
  const result = frontier.buildValueFrontier({ benchmarks: [{ id: "aa-index", version: "4.3" }], models: [old, current] });
  assert.deepEqual(result.frontier.map((row) => row.id), ["current"]);
  assert.equal(result.missing[0].id, "old");
});

test("cheaper and equally capable or same-price stronger models dominate; exact ties survive", () => {
  assert.equal(typeof frontier.buildValueFrontier, "function");
  const result = frontier.buildValueFrontier({ models: [model("a", 1, 50), model("tie", 1, 50),
    model("costlier", 2, 50), model("weaker", 1, 49), model("premium", 5, 60)] });
  assert.deepEqual(result.frontier.map((row) => row.id), ["a", "tie", "premium"]);
  assert.deepEqual(result.comparable.find((row) => row.id === "costlier").dominatedBy, ["a", "tie"]);
  assert.equal(result.comparable.find((row) => row.id === "weaker").dominatedBy.length, 2);
});

test("unknown values cannot kill a model and a free measured model is comparable", () => {
  assert.equal(typeof frontier.buildValueFrontier, "function");
  const result = frontier.buildValueFrontier({ models: [model("free", 0, 50), model("unknown-price", null, 99),
    model("unknown-intel", 1, null), model("invalid-price", -1, 70)] });
  assert.deepEqual(result.frontier.map((row) => row.id), ["free"]);
  assert.equal(result.missing.length, 3);
});

test("budget and intelligence filters are inclusive and retain the global comparison", () => {
  assert.equal(typeof frontier.buildValueFrontier, "function");
  const models = [model("value", 1, 50), model("premium", 5, 60), model("waste", 2, 45)];
  const result = frontier.buildValueFrontier({ models }, { budget: 1, minIntelligence: 50 });
  assert.deepEqual(result.shortlist.map((row) => row.id), ["value"]);
  assert.equal(result.comparable.length, 3);
  assert.equal(frontier.buildValueFrontier({ models }, { budget: 0 }).shortlist.length, 0);
});

test("curated data has traceable dominance examples and missing rows remain separate", () => {
  assert.equal(typeof frontier.buildValueFrontier, "function");
  const result = frontier.buildValueFrontier(modelRadarSnapshot);
  const flash = result.frontier.find((row) => row.id === "zhipu-glm-5-3-flash");
  const pro = result.comparable.find((row) => row.id === "deepseek-v4-pro");
  assert.ok(flash);
  assert.ok(pro.dominatedBy.includes(flash.id));
  assert.equal(flash.price, 0.5);
  assert.equal(flash.intelligence, 41.91);
  assert.ok(result.missing.some((row) => row.id === "cohere-command-a-plus"));
});
