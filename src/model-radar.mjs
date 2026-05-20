const DAY_MS = 24 * 60 * 60 * 1000;

const scoreWeights = {
  reasoning: 0.24,
  coding: 0.2,
  agent: 0.18,
  vision: 0.09,
  context: 0.1,
  cost: 0.06,
  freshness: 0.13
};

export function validateRadarData(snapshot) {
  const errors = [];
  const providerIds = new Set();
  const sourceIds = new Set();

  if (!snapshot || typeof snapshot !== "object") return ["snapshot missing"];
  if (!Array.isArray(snapshot.providers) || snapshot.providers.length === 0) errors.push("missing providers");
  if (!Array.isArray(snapshot.models) || snapshot.models.length === 0) errors.push("missing models");
  if (!Array.isArray(snapshot.sources) || snapshot.sources.length === 0) errors.push("missing sources");

  for (const provider of snapshot.providers ?? []) {
    if (!provider.id) errors.push("provider missing id");
    if (providerIds.has(provider.id)) errors.push(`duplicate provider: ${provider.id}`);
    providerIds.add(provider.id);
    if (!provider.name) errors.push(`${provider.id}: missing name`);
    if (!Array.isArray(provider.releaseHistory) || provider.releaseHistory.length < 2) {
      errors.push(`${provider.id}: releaseHistory needs at least two dots`);
    }
    for (const entry of provider.releaseHistory ?? []) {
      if (!isIsoDate(entry.date)) errors.push(`${provider.id}: invalid release date ${entry.date}`);
      if (!entry.label) errors.push(`${provider.id}: release dot missing label`);
    }
    if (provider.sunsetAt && !isIsoDate(provider.sunsetAt)) errors.push(`${provider.id}: invalid sunsetAt`);
  }

  for (const source of snapshot.sources ?? []) {
    if (!source.id) errors.push("source missing id");
    if (sourceIds.has(source.id)) errors.push(`duplicate source: ${source.id}`);
    sourceIds.add(source.id);
    if (!providerIds.has(source.providerId)) errors.push(`${source.id}: unknown provider ${source.providerId}`);
    if (!source.official) errors.push(`${source.id}: source is not marked official`);
    if (!/^https:\/\//.test(source.url ?? "")) errors.push(`${source.id}: source url must be https`);
    if (!Array.isArray(source.watch) || source.watch.length === 0) errors.push(`${source.id}: missing watch terms`);
  }

  for (const model of snapshot.models ?? []) {
    if (!model.id) errors.push("model missing id");
    if (!providerIds.has(model.providerId)) errors.push(`${model.id}: unknown provider ${model.providerId}`);
    if (!model.name) errors.push(`${model.id}: missing name`);
    if (!isIsoDate(model.releasedAt)) errors.push(`${model.id}: invalid releasedAt`);
    if (!Array.isArray(model.modelIds) || model.modelIds.length === 0) errors.push(`${model.id}: missing modelIds`);
    if (!Array.isArray(model.sourceRefs) || model.sourceRefs.length === 0) errors.push(`${model.id}: missing sourceRefs`);
    for (const sourceRef of model.sourceRefs ?? []) {
      if (!sourceIds.has(sourceRef)) errors.push(`${model.id}: unknown sourceRef ${sourceRef}`);
    }
    for (const dimension of ["reasoning", "coding", "agent", "vision", "context", "cost"]) {
      const value = model.scores?.[dimension];
      if (!Number.isFinite(value) || value < 0 || value > 100) {
        errors.push(`${model.id}: invalid ${dimension} score`);
      }
    }
  }

  return errors;
}

export function buildRadarViewModel(snapshot, today = new Date()) {
  const now = toDate(today);
  const leaders = getFrontierModels(snapshot, { limit: 6, today: now });
  const providerClocks = estimateReleaseClocks(snapshot.providers, now)
    .map((clock) => ({
      ...clock,
      provider: snapshot.providers.find((provider) => provider.id === clock.providerId)
    }));
  const sourceAlerts = (snapshot.sources ?? [])
    .filter((source) => source.changed || source.ok === false)
    .map((source) => ({
      kind: "source-change",
      label: source.ok === false ? `${source.label} check failed` : `${source.label} changed`,
      providerId: source.providerId,
      sourceId: source.id
    }));
  const clockAlerts = providerClocks
    .filter((clock) => ["watch", "overdue", "sunset"].includes(clock.status))
    .map((clock) => ({
      kind: "launch-window",
      label: `${clock.provider.name}: ${clock.nextWindowLabel}`,
      providerId: clock.providerId
    }));

  return {
    generatedAt: snapshot.generatedAt,
    refreshedLabel: formatDateTime(snapshot.generatedAt),
    leaders,
    providerClocks,
    watchlist: [...sourceAlerts, ...clockAlerts].slice(0, 8),
    recentModels: [...snapshot.models].sort((left, right) => toDate(right.releasedAt) - toDate(left.releasedAt)).slice(0, 5),
    sources: snapshot.sources,
    dimensions: snapshot.dimensions,
    worldSignals: buildWorldSignals(snapshot, leaders, providerClocks, now),
    notes: snapshot.notes ?? []
  };
}

export function getFrontierModels(snapshot, { limit = 6, today = new Date() } = {}) {
  return [...(snapshot.models ?? [])]
    .map((model) => ({
      ...model,
      provider: snapshot.providers.find((provider) => provider.id === model.providerId),
      normalizedScore: normalizeModelScore(model, today)
    }))
    .sort((left, right) => {
      if (right.normalizedScore !== left.normalizedScore) return right.normalizedScore - left.normalizedScore;
      return toDate(right.releasedAt) - toDate(left.releasedAt);
    })
    .slice(0, limit);
}

export function normalizeModelScore(model, today = new Date()) {
  const scores = model.scores ?? {};
  const freshness = freshnessScore(model.releasedAt, today);

  return roundScore(
    (scores.reasoning ?? 0) * scoreWeights.reasoning
    + (scores.coding ?? 0) * scoreWeights.coding
    + (scores.agent ?? 0) * scoreWeights.agent
    + (scores.vision ?? 0) * scoreWeights.vision
    + (scores.context ?? 0) * scoreWeights.context
    + (scores.cost ?? 0) * scoreWeights.cost
    + freshness * scoreWeights.freshness
  );
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

      if (provider.sunsetAt) {
        const daysToSunset = daysBetween(now, provider.sunsetAt);
        if (daysToSunset <= 180) {
          return {
            providerId: provider.id,
            latestLabel: latest?.label ?? "unknown",
            latestDate: latest?.date ?? "",
            cycleDays,
            daysSinceLatest,
            progress: clamp(progress, 0, 1.4),
            status: "sunset",
            nextWindowLabel: `${Math.max(0, Math.round(daysToSunset))} days to retirement window`
          };
        }
      }

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
        nextWindowLabel: `next watch ${formatMonthDay(start)}-${formatMonthDay(end)}`
      };
    })
    .sort((left, right) => {
      const statusRank = { sunset: 4, overdue: 3, watch: 2, tracking: 1, cooldown: 0 };
      return (statusRank[right.status] ?? 0) - (statusRank[left.status] ?? 0) || right.progress - left.progress;
    });
}

export function formatTokenWindow(tokens) {
  if (!Number.isFinite(tokens) || tokens <= 0) return "n/a";
  if (tokens >= 1000000) {
    const value = tokens / 1000000;
    return `${Number.isInteger(value) ? value : value.toFixed(1)}M`;
  }
  if (tokens >= 1000) {
    const value = tokens / 1000;
    return `${Number.isInteger(value) ? value : value.toFixed(0)}K`;
  }
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

function buildWorldSignals(snapshot, leaders, clocks, today) {
  const recentCount = snapshot.models.filter((model) => daysBetween(model.releasedAt, today) <= 45).length;
  const openWeightCount = snapshot.models.filter((model) => model.access.includes("open-weight")).length;
  const hotClocks = clocks.filter((clock) => ["watch", "overdue", "sunset"].includes(clock.status)).length;
  const costLeader = [...snapshot.models].sort((left, right) => (right.scores.cost ?? 0) - (left.scores.cost ?? 0))[0];
  const top = leaders[0];

  return [
    {
      id: "frontier",
      label: "Frontier ceiling",
      value: top ? `${Math.round(top.normalizedScore)}` : "n/a",
      detail: top ? `${top.provider.name} ${top.name}` : "No leader",
      tone: "hot"
    },
    {
      id: "recent",
      label: "45-day launches",
      value: String(recentCount),
      detail: "fresh official model rows in this snapshot",
      tone: "acid"
    },
    {
      id: "open",
      label: "Open-weight pressure",
      value: String(openWeightCount),
      detail: "models you can self-host or inspect more directly",
      tone: "sky"
    },
    {
      id: "watch",
      label: "Cycle pressure",
      value: String(hotClocks),
      detail: "providers in launch-window or lifecycle watch",
      tone: "ink"
    },
    {
      id: "cost",
      label: "Price shock",
      value: costLeader ? shortProviderCode(costLeader.providerId) : "n/a",
      detail: costLeader ? costLeader.name : "No cost leader",
      tone: "rose"
    }
  ];
}

function shortProviderCode(providerId) {
  return {
    deepseek: "DS",
    openai: "OAI",
    anthropic: "ANT",
    google: "GEM",
    moonshot: "KIMI"
  }[providerId] ?? providerId.slice(0, 4).toUpperCase();
}

function inferCycleDays(history) {
  if (history.length < 2) return 120;
  const intervals = [];

  for (let index = 1; index < history.length; index += 1) {
    intervals.push(daysBetween(history[index - 1].date, history[index].date));
  }

  const average = intervals.reduce((total, days) => total + days, 0) / intervals.length;
  return Math.max(30, Math.round(average));
}

function freshnessScore(releasedAt, today) {
  const days = Math.max(0, daysBetween(releasedAt, today));
  return clamp(100 - days / 4, 35, 100);
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
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC"
  }).format(toDate(value));
}

function toDate(value) {
  return value instanceof Date ? new Date(value.getTime()) : new Date(value);
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") && !Number.isNaN(new Date(`${value}T00:00:00.000Z`).getTime());
}

function roundScore(value) {
  return Math.round(value * 10) / 10;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
