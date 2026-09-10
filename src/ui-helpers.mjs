export function clockStatusLabel(status) {
  return {
    cooldown: "周期前段",
    tracking: "接近常见区间",
    watch: "进入常见区间",
    overdue: "超过常见区间"
  }[status] ?? "节奏未知";
}

export function eventStatusLabel(status, date, today = new Date()) {
  if (status === "deadline" && date) {
    const currentDate = isoShortDate(today);
    if (date < currentDate) return "日期已过，待核实";
    if (date === currentDate) return "今日到期，待核实";
  }
  return {
    released: "已发生",
    watch: "待官方确认",
    deadline: "将到期"
  }[status] ?? "信号";
}

export function evidenceSummaryLabel(summary) {
  if (!summary.newest) return "评测日期未知；每日检查仅观察来源页面。";
  return `评测记录 ${summary.oldest} 至 ${summary.newest}；最新记录距今 ${summary.ageDays} 天。每日检查仅观察来源页面。`;
}

export function sourceCheckSummaryLabel(summary) {
  return `来源检查：${summary.successful}/${summary.total} 成功 · ${summary.failed} 失败`
    + (summary.unchecked ? ` · ${summary.unchecked} 未检查` : "");
}

export function sourceStatusLabel(source) {
  const parts = [source.sourceType === "provider" ? "官方发布" : "评测来源"];
  if (source.ok === false) parts.push(`检查失败：${source.error || "原因未知"}`);
  else if (source.ok === true) parts.push("检查成功");
  else parts.push("尚未检查");
  if (source.lastCheckedAt) parts.push(`检查 ${isoShortDate(source.lastCheckedAt)}`);
  const lastSuccessAt = source.lastSuccessAt ?? (source.ok === true ? source.lastCheckedAt : null);
  if (source.ok !== true && lastSuccessAt) parts.push(`最近成功 ${isoShortDate(lastSuccessAt)}`);
  const change = source.signalChange;
  if (change?.detectedAt) {
    const terms = [];
    if (change.added?.length) terms.push(`新增 ${change.added.join("、")}`);
    if (change.removed?.length) terms.push(`消失 ${change.removed.join("、")}`);
    parts.push(`观察词变化 ${isoShortDate(change.detectedAt)}：${terms.join("；")}`);
  }
  const lastChangedAt = source.lastChangedAt ?? (source.changed ? source.lastCheckedAt : null);
  if (lastChangedAt) parts.push(`最近页面变化 ${isoShortDate(lastChangedAt)}（未核实内容）`);
  return parts.join(" · ");
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
