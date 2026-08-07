import { getBenchmarkMetric, getMetricMeasurement } from "./model-radar.mjs";
import { metricQuality } from "./radar-layout.mjs";

export const CHOICE_MODES = Object.freeze([
  {
    id: "balanced",
    label: "综合",
    shortLabel: "BALANCED",
    description: "质量、偏好、速度、价格与上下文的平衡选择",
    minEvidence: 0.7,
    weights: {
      "aa-index": 0.3,
      "arena-elo": 0.2,
      "output-speed": 0.18,
      "output-price": 0.17,
      "context-window": 0.15
    }
  },
  {
    id: "code-agent",
    label: "编程 Agent",
    shortLabel: "CODE + AGENT",
    description: "工程修复、终端执行与 Agent 任务优先",
    minEvidence: 0.5,
    weights: {
      "aa-coding-agent": 0.3,
      terminalbench: 0.35,
      "swebench-pro": 0.1,
      "agent-last-exam": 0.1,
      "aa-index": 0.05,
      "output-speed": 0.05,
      "output-price": 0.05
    }
  },
  {
    id: "throughput",
    label: "高吞吐",
    shortLabel: "THROUGHPUT",
    description: "生成速度优先，同时保留质量与成本底线",
    minEvidence: 0.75,
    weights: {
      "output-speed": 0.5,
      "aa-index": 0.15,
      "output-price": 0.2,
      "context-window": 0.15
    }
  },
  {
    id: "value",
    label: "性价比",
    shortLabel: "VALUE",
    description: "单位输出价格优先，兼顾智能与速度",
    minEvidence: 0.75,
    weights: {
      "output-price": 0.45,
      "aa-index": 0.25,
      "output-speed": 0.2,
      "context-window": 0.1
    }
  }
]);

export function rankModelsForMode(snapshot, modeId = CHOICE_MODES[0].id) {
  const mode = CHOICE_MODES.find((entry) => entry.id === modeId) ?? CHOICE_MODES[0];
  const totalWeight = Object.values(mode.weights).reduce((sum, weight) => sum + weight, 0);
  const rows = (snapshot.models ?? []).map((model) => {
    const evidence = [];

    for (const [metricId, weight] of Object.entries(mode.weights)) {
      const metric = getBenchmarkMetric(snapshot, metricId);
      const measurement = getMetricMeasurement(model, metric);
      if (!metric || !Number.isFinite(measurement?.value)) continue;
      evidence.push({
        metric,
        measurement,
        weight,
        quality: metricQuality(measurement.value, metric)
      });
    }

    const coveredWeight = evidence.reduce((sum, entry) => sum + entry.weight, 0);
    const evidenceRatio = totalWeight > 0 ? coveredWeight / totalWeight : 0;
    const rawScore = coveredWeight > 0
      ? evidence.reduce((sum, entry) => sum + entry.quality * entry.weight, 0) / coveredWeight
      : 0;
    const score = rawScore * (0.8 + evidenceRatio * 0.2);

    return {
      ...model,
      provider: snapshot.providers.find((provider) => provider.id === model.providerId) ?? null,
      mode,
      evidence,
      evidenceRatio,
      eligible: evidenceRatio >= mode.minEvidence,
      score: round(score * 100)
    };
  });

  rows.sort((left, right) => {
    if (left.eligible !== right.eligible) return left.eligible ? -1 : 1;
    return right.score - left.score
      || right.evidenceRatio - left.evidenceRatio
      || new Date(right.releasedAt) - new Date(left.releasedAt);
  });

  let rank = 0;
  return rows.map((row) => ({
    ...row,
    choiceRank: row.eligible ? ++rank : null
  }));
}

export function autoMatchModel(snapshot, selectedId, modeId = CHOICE_MODES[0].id) {
  const ranking = rankModelsForMode(snapshot, modeId);
  const selected = ranking.find((model) => model.id === selectedId) ?? ranking[0] ?? null;
  const winner = ranking.find((model) => model.eligible) ?? null;
  const comparison = (winner?.id !== selected?.id ? winner : null)
    ?? ranking.find((model) => model.eligible
      && model.id !== selected?.id
      && model.providerId !== selected?.providerId)
    ?? ranking.find((model) => model.eligible && model.id !== selected?.id)
    ?? null;

  return {
    mode: ranking[0]?.mode ?? CHOICE_MODES[0],
    ranking,
    selected,
    winner,
    comparison
  };
}

export function evidenceLabel(evidenceRatio) {
  const percent = Math.round((Number(evidenceRatio) || 0) * 100);
  if (percent >= 90) return `高置信 / ${percent}%`;
  if (percent >= 70) return `可用 / ${percent}%`;
  return `证据不足 / ${percent}%`;
}

function round(value) {
  return Math.round(value * 10) / 10;
}
