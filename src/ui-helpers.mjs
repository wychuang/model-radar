export function clockStatusLabel(status) {
  return {
    cooldown: "周期前段",
    tracking: "接近常见区间",
    watch: "进入常见区间",
    overdue: "超过常见区间"
  }[status] ?? "节奏未知";
}

export function eventStatusLabel(status) {
  return {
    released: "已发生",
    watch: "待官方确认",
    deadline: "将到期"
  }[status] ?? "信号";
}

export function metricBarStyle(value, metric = {}) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return "--value: 0%;";
  const min = Number.isFinite(metric.min) ? metric.min : 0;
  const max = Number.isFinite(metric.max) ? metric.max : 100;
  const span = Math.max(1, max - min);
  const raw = ((Number(value) - min) / span) * 100;
  const percentage = metric.direction === "lower" ? 100 - raw : raw;
  return `--value: ${round(clamp(percentage, 2, 100))}%;`;
}

export function shortDate(value) {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "unknown";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC"
  }).format(date);
}

export function isoShortDate(value) {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC"
  }).format(date);
}

function toDate(value) {
  return value instanceof Date ? new Date(value.getTime()) : new Date(value);
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value * 10) / 10;
}
