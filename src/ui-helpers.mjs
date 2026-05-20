const DAY_MS = 24 * 60 * 60 * 1000;

export function clockStatusLabel(status) {
  return {
    cooldown: "cool",
    tracking: "track",
    watch: "watch",
    overdue: "late",
    sunset: "retire"
  }[status] ?? "scan";
}

export function metricBarStyle(score) {
  return `--value: ${clamp(Number(score), 0, 100)}%;`;
}

export function modelDotStyle(model, today = new Date()) {
  const score = clamp(Number(model.normalizedScore), 0, 100);
  const days = Math.max(0, (toDate(today) - toDate(model.releasedAt)) / DAY_MS);
  const fresh = clamp(100 - days, 0, 100);

  return `--x: ${round(score)}%; --fresh: ${round(fresh)}%;`;
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
