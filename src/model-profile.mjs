import { getBenchmarkMetric, getMetricMeasurement } from "./model-radar.mjs";
import { metricQuality } from "./radar-layout.mjs";

export const PROFILE_DIMENSIONS = Object.freeze([
  { metricId: "aa-index", label: "智能", shortLabel: "INTEL" },
  { metricId: "arena-elo", label: "偏好", shortLabel: "PREFERENCE" },
  { metricId: "output-speed", label: "速度", shortLabel: "SPEED" },
  { metricId: "output-price", label: "价格效率", shortLabel: "VALUE" },
  { metricId: "context-window", label: "上下文", shortLabel: "CONTEXT" }
]);

const MISSING_REASONS = {
  "aa-index": {
    code: "leaderboard-unconfirmed",
    short: "榜单未确认",
    detail: "当前已核对榜单未找到完全同名、同版本条目。"
  },
  "arena-elo": {
    code: "leaderboard-unconfirmed",
    short: "榜单未确认",
    detail: "当前已核对榜单未找到完全同名、同版本条目。"
  },
  "swebench-pro": {
    code: "comparable-result-unpublished",
    short: "未公布同口径成绩",
    detail: "当前官方资料未确认同版本、同 benchmark 口径的成绩。"
  },
  terminalbench: {
    code: "comparable-result-unpublished",
    short: "未公布同口径成绩",
    detail: "当前官方资料未确认同版本、同 harness 的 Terminal-Bench 2.1 成绩。"
  },
  "output-speed": {
    code: "independent-speed-unconfirmed",
    short: "独立速度未确认",
    detail: "Artificial Analysis 当前未确认该版本的一方 API 或可比托管端生成速度。"
  },
  "output-price": {
    code: "public-price-unconfirmed",
    short: "公开价格未确认",
    detail: "当前官方资料未确认可直接比较的公开 API 输出价格。"
  },
  "context-window": {
    code: "public-spec-unconfirmed",
    short: "公开规格未确认",
    detail: "当前官方资料未确认可直接比较的上下文规格。"
  }
};

export function missingMetricReason(metricId) {
  return MISSING_REASONS[metricId] ?? {
    code: "measurement-unconfirmed",
    short: "可比数据未确认",
    detail: "当前来源中尚未确认可直接比较的测量值。"
  };
}

export function buildModelProfile(snapshot, modelOrId) {
  const model = typeof modelOrId === "string"
    ? snapshot.models.find((entry) => entry.id === modelOrId)
    : modelOrId;
  if (!model) return null;

  const provider = snapshot.providers.find((entry) => entry.id === model.providerId) ?? null;
  const dimensions = PROFILE_DIMENSIONS.map((definition) => {
    const metric = getBenchmarkMetric(snapshot, definition.metricId);
    const measurement = getMetricMeasurement(model, metric);
    const available = Number.isFinite(measurement?.value);
    const quality = available ? metricQuality(measurement.value, metric) : null;

    return {
      ...definition,
      metric,
      measurement,
      available,
      score: available ? round(quality * 100) : null,
      missingReason: available ? null : missingMetricReason(definition.metricId)
    };
  });

  const knownCount = dimensions.filter((dimension) => dimension.available).length;
  return {
    model,
    provider,
    accent: model.accent ?? provider?.accent ?? "#ece7d6",
    accentText: model.accentText ?? provider?.accentText ?? "#11120f",
    dimensions,
    knownCount,
    complete: knownCount === dimensions.length
  };
}

export function profileGeometry(profile, options = {}) {
  const centerX = options.centerX ?? 180;
  const centerY = options.centerY ?? 165;
  const radius = options.radius ?? 106;
  const total = profile?.dimensions?.length ?? 0;
  if (total === 0) return { axes: [], points: [], segments: [], polygon: null };

  const axes = profile.dimensions.map((dimension, index) => {
    const angle = -90 + index * 360 / total;
    return {
      index,
      dimension,
      angle,
      end: polarPoint(centerX, centerY, radius, angle),
      label: polarPoint(centerX, centerY, radius + 30, angle)
    };
  });

  const points = axes.map((axis) => axis.dimension.available
    ? polarPoint(centerX, centerY, radius * axis.dimension.score / 100, axis.angle)
    : null);
  const segments = [];

  for (let index = 0; index < total; index += 1) {
    const nextIndex = (index + 1) % total;
    if (points[index] && points[nextIndex]) {
      segments.push({ from: points[index], to: points[nextIndex], fromIndex: index, toIndex: nextIndex });
    }
  }

  return {
    center: { x: centerX, y: centerY },
    radius,
    axes,
    points,
    segments,
    polygon: profile.complete ? points.map(pointString).join(" ") : null
  };
}

function polarPoint(centerX, centerY, radius, angleDegrees) {
  const radians = angleDegrees * Math.PI / 180;
  return {
    x: round(centerX + Math.cos(radians) * radius),
    y: round(centerY + Math.sin(radians) * radius)
  };
}

function pointString(point) {
  return `${point.x},${point.y}`;
}

function round(value) {
  return Math.round(value * 10) / 10;
}
