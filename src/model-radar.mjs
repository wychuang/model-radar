const DAY_MS = 24 * 60 * 60 * 1000;

export function validateRadarData(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return ["snapshot missing"];

  const errors = [];
  const providerIds = uniqueIds(snapshot.providers, "provider", errors);
  const sourceIds = uniqueIds(snapshot.sources, "source", errors);
  const benchmarkIds = uniqueIds(snapshot.benchmarks, "benchmark", errors);
  const modelIds = uniqueIds(snapshot.models, "model", errors);

  if (providerIds.size === 0) errors.push("missing providers");
  if (sourceIds.size === 0) errors.push("missing sources");
  if (benchmarkIds.size === 0) errors.push("missing benchmarks");
  if (modelIds.size === 0) errors.push("missing models");

  for (const provider of snapshot.providers ?? []) {
    if (!provider.name) errors.push(`${provider.id}: missing name`);
    if (!modelIds.has(provider.latestModelId)) errors.push(`${provider.id}: unknown latestModelId ${provider.latestModelId}`);
    if (!Array.isArray(provider.releaseHistory) || provider.releaseHistory.length < 2) {
      errors.push(`${provider.id}: releaseHistory needs at least two dots`);
    }
    for (const entry of provider.releaseHistory ?? []) {
      if (!isIsoDate(entry.date)) errors.push(`${provider.id}: invalid release date ${entry.date}`);
      if (!entry.label) errors.push(`${provider.id}: release dot missing label`);
    }
  }

  for (const source of snapshot.sources ?? []) {
    if (source.providerId !== null && !providerIds.has(source.providerId)) {
      errors.push(`${source.id}: unknown provider ${source.providerId}`);
    }
    if (!['provider', 'benchmark'].includes(source.sourceType)) errors.push(`${source.id}: invalid sourceType`);
    if (source.sourceType === "provider" && !source.official) errors.push(`${source.id}: provider source is not official`);
    if (!/^https:\/\//.test(source.url ?? "")) errors.push(`${source.id}: source url must be https`);
    if (!Array.isArray(source.watch) || source.watch.length === 0) errors.push(`${source.id}: missing watch terms`);
  }

  for (const benchmark of snapshot.benchmarks ?? []) {
    if (!benchmark.label) errors.push(`${benchmark.id}: missing label`);
    if (!['higher', 'lower'].includes(benchmark.direction)) errors.push(`${benchmark.id}: invalid direction`);
    if (!benchmark.derivedFrom && !sourceIds.has(benchmark.sourceId)) {
      errors.push(`${benchmark.id}: unknown source ${benchmark.sourceId}`);
    }
    if (!isIsoDate(benchmark.asOf)) errors.push(`${benchmark.id}: invalid asOf`);
  }

  for (const model of snapshot.models ?? []) {
    if (!providerIds.has(model.providerId)) errors.push(`${model.id}: unknown provider ${model.providerId}`);
    if (!model.name) errors.push(`${model.id}: missing name`);
    if (!isIsoDate(model.releasedAt)) errors.push(`${model.id}: invalid releasedAt`);
    if (!Array.isArray(model.modelIds) || model.modelIds.length === 0) errors.push(`${model.id}: missing modelIds`);
    if (!Array.isArray(model.sourceRefs) || model.sourceRefs.length === 0) errors.push(`${model.id}: missing sourceRefs`);
    for (const sourceRef of model.sourceRefs ?? []) {
      if (!sourceIds.has(sourceRef)) errors.push(`${model.id}: unknown sourceRef ${sourceRef}`);
    }
    for (const [benchmarkId, entry] of Object.entries(model.benchmarks ?? {})) {
      if (!benchmarkIds.has(benchmarkId)) errors.push(`${model.id}: unknown benchmark ${benchmarkId}`);
      if (!Number.isFinite(entry.value)) errors.push(`${model.id}: invalid ${benchmarkId} value`);
      if (!sourceIds.has(entry.sourceId)) errors.push(`${model.id}: unknown benchmark source ${entry.sourceId}`);
      if (!isIsoDate(entry.asOf)) errors.push(`${model.id}: invalid ${benchmarkId} asOf`);
    }
  }

  for (const event of snapshot.events ?? []) {
    if (!isIsoDate(event.date)) errors.push(`${event.id}: invalid event date`);
    if (!['released', 'watch', 'deadline'].includes(event.status)) errors.push(`${event.id}: invalid event status`);
    if (!sourceIds.has(event.sourceId)) errors.push(`${event.id}: unknown source ${event.sourceId}`);
  }

  return errors;
}

export function buildRadarViewModel(snapshot, today = new Date()) {
  const now = toDate(today);
  const providerClocks = estimateReleaseClocks(snapshot.providers, now).map((clock) => ({
    ...clock,
    provider: snapshot.providers.find((provider) => provider.id === clock.providerId)
  }));
  const defaultMetric = snapshot.benchmarks[0];
  const defaultRanking = defaultMetric ? rankModelsByMetric(snapshot, defaultMetric.id) : [];
  const sourceAlerts = (snapshot.sources ?? [])
    .filter((source) => source.changed || source.ok === false)
    .map((source) => ({
      kind: "source-change",
      label: source.ok === false ? `${source.label} check failed` : `${source.label} changed`,
      sourceId: source.id
    }));
  const eventAlerts = [...(snapshot.events ?? [])]
    .filter((event) => event.status !== "released" || daysBetween(event.date, now) <= 45)
    .sort((left, right) => toDate(left.date) - toDate(right.date))
    .map((event) => ({ kind: "event", label: event.label, sourceId: event.sourceId }));

  return {
    generatedAt: snapshot.generatedAt,
    refreshedLabel: formatDateTime(snapshot.generatedAt),
    asOfLabel: latestBenchmarkDate(snapshot.benchmarks),
    benchmarks: snapshot.benchmarks,
    models: snapshot.models,
    providers: snapshot.providers,
    providerClocks,
    events: [...(snapshot.events ?? [])].sort((left, right) => toDate(right.date) - toDate(left.date)),
    sources: snapshot.sources,
    watchlist: [...sourceAlerts, ...eventAlerts].slice(0, 10),
    worldSignals: buildWorldSignals(snapshot, defaultRanking, now),
    notes: snapshot.notes ?? []
  };
}

export function rankModelsByMetric(snapshot, metricId) {
  const metric = getBenchmarkMetric(snapshot, metricId);
  if (!metric) return [];

  const rows = (snapshot.models ?? []).map((model) => {
    const measurement = getMetricMeasurement(model, metric);
    return {
      ...model,
      provider: snapshot.providers.find((provider) => provider.id === model.providerId),
      metric,
      measurement,
      metricValue: measurement?.value ?? null
    };
  });

  rows.sort((left, right) => {
    const leftMissing = !Number.isFinite(left.metricValue);
    const rightMissing = !Number.isFinite(right.metricValue);
    if (leftMissing !== rightMissing) return leftMissing ? 1 : -1;
    if (leftMissing && rightMissing) return toDate(right.releasedAt) - toDate(left.releasedAt);
    const valueOrder = metric.direction === "lower"
      ? left.metricValue - right.metricValue
      : right.metricValue - left.metricValue;
    return valueOrder || toDate(right.releasedAt) - toDate(left.releasedAt);
  });

  let rank = 0;
  let previousValue;
  return rows.map((row, index) => {
    if (Number.isFinite(row.metricValue) && row.metricValue !== previousValue) rank = index + 1;
    previousValue = row.metricValue;
    return { ...row, computedRank: Number.isFinite(row.metricValue) ? rank : null };
  });
}

export function metricCoverage(snapshot, metricId) {
  const ranking = rankModelsByMetric(snapshot, metricId);
  const covered = ranking.filter((row) => Number.isFinite(row.metricValue)).length;
  return { covered, total: ranking.length, ratio: ranking.length ? covered / ranking.length : 0 };
}

export function getBenchmarkMetric(snapshot, metricId) {
  return (snapshot.benchmarks ?? []).find((metric) => metric.id === metricId) ?? null;
}

export function getMetricMeasurement(model, metric) {
  if (!model || !metric) return null;
  if (metric.derivedFrom === "outputPrice") {
    const value = model.priceUsd?.outputPerMTok;
    return Number.isFinite(value)
      ? { value, derived: true, asOf: metric.asOf, sourceId: model.sourceRefs?.[0] }
      : null;
  }
  if (metric.derivedFrom === "contextTokens") {
    return Number.isFinite(model.contextTokens)
      ? { value: model.contextTokens, derived: true, asOf: metric.asOf, sourceId: model.sourceRefs?.[0] }
      : null;
  }
  return model.benchmarks?.[metric.id] ?? null;
}

export function formatMetricValue(metric, value) {
  if (!metric || !Number.isFinite(value)) return "N/A";
  if (metric.format === "percent") return `${trimNumber(value)}%`;
  if (metric.format === "elo") return new Intl.NumberFormat("en-US").format(value);
  if (metric.format === "usd") return `$${trimNumber(value)}`;
  if (metric.format === "tokens") return formatTokenWindow(value);
  return trimNumber(value);
}

export function estimateReleaseClocks(providers, today = new Date()) {
  const now = toDate(today);

  return [...providers]
    .map((provider) => {
      const history = [...(provider.releaseHistory ?? [])]
        .filter((entry) => isIsoDate(entry.date))
        .sort((left, right) => toDate(left.date) - toDate(right.date));
      const latest = history.at(-1);
      const cycleDays = inferCycleDays(history);
      const daysSinceLatest = latest ? daysBetween(latest.date, now) : 0;
      const progress = cycleDays > 0 ? daysSinceLatest / cycleDays : 0;
      const status = progress < 0.62
        ? "cooldown"
        : progress < 0.9
          ? "tracking"
          : progress < 1.15
            ? "watch"
            : "overdue";
      const start = addDays(latest?.date ?? now, Math.round(cycleDays * 0.78));
      const end = addDays(latest?.date ?? now, Math.round(cycleDays * 1.22));

      return {
        providerId: provider.id,
        latestLabel: latest?.label ?? "unknown",
        latestDate: latest?.date ?? "",
        cycleDays,
        daysSinceLatest,
        progress: clamp(progress, 0, 1.4),
        status,
        nextWindowLabel: `watch ${formatMonthDay(start)}-${formatMonthDay(end)}`
      };
    })
    .sort((left, right) => {
      const statusRank = { overdue: 3, watch: 2, tracking: 1, cooldown: 0 };
      return (statusRank[right.status] ?? 0) - (statusRank[left.status] ?? 0) || right.progress - left.progress;
    });
}

export function formatTokenWindow(tokens) {
  if (!Number.isFinite(tokens) || tokens <= 0) return "N/A";
  if (tokens >= 1000000) {
    const value = tokens / 1000000;
    return `${Number.isInteger(value) ? value : value.toFixed(2).replace(/0+$/, "")}M`;
  }
  if (tokens >= 1000) return `${Math.round(tokens / 1000)}K`;
  return String(tokens);
}

export function sourceFreshnessLabel(source, today = new Date()) {
  if (!source?.lastCheckedAt) return "seed";
  const age = daysBetween(source.lastCheckedAt, today);
  if (age <= 1) return "fresh";
  if (age <= 3) return `${Math.round(age)}d`;
  return "stale";
}

export function formatDateTime(value) {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return `${new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
  }).format(date)} UTC`;
}

function buildWorldSignals(snapshot, defaultRanking, today) {
  const leader = defaultRanking.find((row) => Number.isFinite(row.metricValue));
  const recentCount = snapshot.models.filter((model) => daysBetween(model.releasedAt, today) <= 45).length;
  const benchmarkCount = snapshot.sources.filter((source) => source.sourceType === "benchmark").length;
  const futureCount = (snapshot.events ?? []).filter((event) => toDate(event.date) >= today && event.status !== "released").length;

  return [
    { id: "leader", label: "AA INDEX LEADER", value: leader ? formatMetricValue(leader.metric, leader.metricValue) : "N/A", detail: leader ? `${leader.provider.name} / ${leader.name}` : "No coverage", tone: "signal" },
    { id: "models", label: "MODELS ON BOARD", value: String(snapshot.models.length), detail: `${snapshot.providers.length} provider lanes`, tone: "paper" },
    { id: "recent", label: "45-DAY ARRIVALS", value: String(recentCount), detail: "official release rows", tone: "acid" },
    { id: "sources", label: "BENCHMARK FEEDS", value: String(benchmarkCount), detail: "independent source pages", tone: "sky" },
    { id: "future", label: "NEXT-WATCH ITEMS", value: String(futureCount), detail: "signals, never promises", tone: "rose" }
  ];
}

function uniqueIds(items, label, errors) {
  const ids = new Set();
  for (const item of items ?? []) {
    if (!item.id) errors.push(`${label} missing id`);
    if (ids.has(item.id)) errors.push(`duplicate ${label}: ${item.id}`);
    ids.add(item.id);
  }
  return ids;
}

function inferCycleDays(history) {
  if (history.length < 2) return 120;
  const intervals = [];
  for (let index = 1; index < history.length; index += 1) {
    intervals.push(daysBetween(history[index - 1].date, history[index].date));
  }
  return Math.max(30, Math.round(intervals.reduce((total, days) => total + days, 0) / intervals.length));
}

function trimNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(3)));
}

function daysBetween(left, right) {
  return (toDate(right) - toDate(left)) / DAY_MS;
}

function addDays(value, days) {
  const date = toDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

function formatMonthDay(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", timeZone: "UTC" }).format(toDate(value));
}

function formatDate(value) {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }).format(date);
}

function latestBenchmarkDate(benchmarks) {
  const dates = (benchmarks ?? []).map((benchmark) => benchmark.asOf).filter(isIsoDate).sort();
  return dates.at(-1) ?? "unknown";
}

function toDate(value) {
  return value instanceof Date ? new Date(value.getTime()) : new Date(value);
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") && !Number.isNaN(new Date(`${value}T00:00:00.000Z`).getTime());
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
