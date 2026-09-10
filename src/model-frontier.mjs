// Intelligence and output price are compared as separate raw measurements.
import { getMetricMeasurement } from "./model-radar.mjs";

export function buildValueFrontier(snapshot, { budget = Infinity, minIntelligence = -Infinity } = {}) {
  const metric = snapshot.benchmarks?.find((item) => item.id === "aa-index") ?? { id: "aa-index" };
  const rows = (snapshot.models ?? []).map((model) => ({
    ...model,
    price: model.priceUsd?.outputPerMTok,
    intelligence: getMetricMeasurement(model, metric)?.value
  }));
  const known = (row) => Number.isFinite(row.price) && row.price >= 0 && Number.isFinite(row.intelligence);
  const comparable = rows.filter(known).map((row) => ({
    ...row,
    dominatedBy: rows.filter((other) => known(other) && other.id !== row.id
      && other.price <= row.price && other.intelligence >= row.intelligence
      && (other.price < row.price || other.intelligence > row.intelligence))
      .sort((a, b) => a.price - b.price || b.intelligence - a.intelligence)
      .map((other) => other.id),
    withinBudget: row.price <= budget && row.intelligence >= minIntelligence
  }));
  const frontier = comparable.filter((row) => row.dominatedBy.length === 0)
    .sort((a, b) => a.price - b.price || b.intelligence - a.intelligence);
  return {
    comparable,
    missing: rows.filter((row) => !known(row)),
    frontier,
    shortlist: frontier.filter((row) => row.withinBudget)
  };
}
