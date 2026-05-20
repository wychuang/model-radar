import { modelRadarSeed } from "./model-radar-seed.mjs";

const checkedAt = "2026-05-19T12:05:00.000Z";

export const modelRadarSnapshot = {
  ...modelRadarSeed,
  generatedAt: checkedAt,
  refresh: {
    ...modelRadarSeed.refresh,
    nextRunHint: "Daily scheduled refresh is configured; source checks update this generated snapshot."
  },
  sources: modelRadarSeed.sources.map((source) => ({
    ...source,
    lastCheckedAt: checkedAt,
    ok: null,
    sha256: "",
    foundSignals: source.watch.slice(0, 2),
    changed: source.id === "openai-models",
    note: "Seeded until the first scheduled source refresh writes live status."
  }))
};
