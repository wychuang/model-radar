const DAY_MS = 24 * 60 * 60 * 1000;
const FRESHNESS_WINDOW_DAYS = 180;

export function projectRadarModels(ranking, metric, today = new Date()) {
  const covered = ranking.filter((model) => Number.isFinite(model.metricValue));
  const missing = ranking.filter((model) => !Number.isFinite(model.metricValue));

  const coveredPoints = covered.map((model, index) => {
    const quality = metricQuality(model.metricValue, metric);
    const ageDays = modelAgeDays(model.releasedAt, today);
    const x = round(18 + quality * 74);
    const y = round(9 + Math.min(ageDays, FRESHNESS_WINDOW_DAYS) / FRESHNESS_WINDOW_DAYS * 82);
    const offset = labelOffset(x, y, index);

    return {
      ...model,
      radar: {
        x,
        y,
        quality,
        ageDays,
        missing: false,
        labelDx: offset.x,
        labelDy: offset.y
      }
    };
  });

  const missingPoints = missing.map((model, index) => ({
    ...model,
    radar: {
      x: 5,
      y: round(missingLanePosition(index, missing.length)),
      quality: null,
      ageDays: modelAgeDays(model.releasedAt, today),
      missing: true,
      labelDx: 12,
      labelDy: -15
    }
  }));

  return [...coveredPoints, ...missingPoints];
}

export function placeRadarLabels(points, options = {}) {
  const width = Math.max(1, Number(options.width) || 900);
  const height = Math.max(1, Number(options.height) || 600);
  const labelWidth = Math.max(60, Number(options.labelWidth) || 106);
  const labelHeight = Math.max(30, Number(options.labelHeight) || 44);
  const nodeSize = Math.max(10, Number(options.nodeSize) || 18);
  const gap = Math.max(8, Number(options.gap) || 14);
  const padding = Math.max(0, Number(options.padding) || 6);
  const topRankCount = Number.isFinite(options.topRankCount) ? Math.max(0, options.topRankCount) : 0;
  const nodes = points.map((point) => ({
    id: point.id,
    x: point.radar.x / 100 * width,
    y: point.radar.y / 100 * height
  }));
  const persistentIds = new Set(points
    .filter((point) => Number.isFinite(point.computedRank) && point.computedRank <= topRankCount)
    .map((point) => point.id));
  const persistent = points
    .filter((point) => persistentIds.has(point.id))
    .sort((left, right) => (left.computedRank ?? Number.MAX_SAFE_INTEGER) - (right.computedRank ?? Number.MAX_SAFE_INTEGER));
  const transient = points.filter((point) => !persistentIds.has(point.id));
  const occupied = [];
  const placements = new Map();

  for (const point of persistent) {
    const placement = chooseLabelPlacement(point, nodes, occupied, {
      width,
      height,
      labelWidth,
      labelHeight,
      nodeSize,
      gap,
      padding
    });
    placements.set(point.id, placement);
    occupied.push(placement.rect);
  }

  for (const point of transient) {
    placements.set(point.id, chooseLabelPlacement(point, nodes, occupied, {
      width,
      height,
      labelWidth,
      labelHeight,
      nodeSize,
      gap,
      padding
    }));
  }

  return points.map((point) => {
    const placement = placements.get(point.id);
    return {
      ...point,
      radar: {
        ...point.radar,
        labelDx: placement.labelDx,
        labelDy: placement.labelDy,
        labelPosition: placement.position,
        labelRect: placement.rect,
        linkLength: placement.linkLength,
        linkAngle: placement.linkAngle
      }
    };
  });
}

export function metricQuality(value, metric = {}) {
  if (!Number.isFinite(Number(value))) return null;
  const min = Number.isFinite(metric.min) ? metric.min : 0;
  const max = Number.isFinite(metric.max) ? metric.max : 100;
  const span = Math.max(1, max - min);
  const distance = clamp(Number(value) - min, 0, span);
  const normalized = metric.scale === "log"
    ? Math.log1p(distance) / Math.log1p(span)
    : distance / span;
  return metric.direction === "lower" ? 1 - normalized : normalized;
}

export function radarSweepDiameter(width, height, centerXRatio = 0.55, centerYRatio = 0.5) {
  const safeWidth = Math.max(1, Number(width) || 1);
  const safeHeight = Math.max(1, Number(height) || 1);
  const centerX = safeWidth * clamp(Number(centerXRatio) || 0, 0, 1);
  const centerY = safeHeight * clamp(Number(centerYRatio) || 0, 0, 1);
  const radius = Math.max(
    Math.hypot(centerX, centerY),
    Math.hypot(safeWidth - centerX, centerY),
    Math.hypot(centerX, safeHeight - centerY),
    Math.hypot(safeWidth - centerX, safeHeight - centerY)
  );
  return Math.ceil(radius * 2 + 4);
}

export function modelAgeDays(releasedAt, today = new Date()) {
  const releaseDate = toDate(releasedAt);
  const currentDate = toDate(today);
  if (Number.isNaN(releaseDate.getTime()) || Number.isNaN(currentDate.getTime())) return FRESHNESS_WINDOW_DAYS;
  return Math.max(0, Math.floor((currentDate - releaseDate) / DAY_MS));
}

export function shortModelName(name = "") {
  return name
    .replace(/^Claude\s+/i, "")
    .replace(/^Amazon\s+/i, "")
    .replace(/^Mistral\s+/i, "")
    .replace(/^Gemini\s+/i, "GEM ")
    .replace(/^DeepSeek-/i, "DS ")
    .replace(/^Command\s+/i, "CMD ")
    .replace(/^Muse Spark\s+/i, "MUSE ")
    .replace(/Medium\s+/i, "MED ")
    .toUpperCase();
}

function missingLanePosition(index, total) {
  if (total <= 1) return 50;
  return 12 + index / (total - 1) * 76;
}

function labelOffset(x, y, index) {
  const rightSide = x < 68;
  const topRankOffsets = [12, 18, -72];
  if (index < topRankOffsets.length) {
    return { x: rightSide ? 12 : -116, y: topRankOffsets[index] };
  }
  const below = y < 22 || (y < 72 && index % 2 === 1);
  const xOffset = rightSide ? 12 : -116;
  const yOffset = below ? 10 : -38;
  return { x: xOffset, y: yOffset };
}

function chooseLabelPlacement(point, nodes, occupied, options) {
  const nodeX = point.radar.x / 100 * options.width;
  const nodeY = point.radar.y / 100 * options.height;
  const candidates = labelCandidates(nodeX, nodeY, options);
  let best = null;

  candidates.forEach((candidate, index) => {
    const score = candidateScore(candidate.rect, point.id, nodes, occupied, options, index);
    if (!best || score < best.score) best = { ...candidate, score };
  });

  const connector = connectorGeometry(nodeX, nodeY, best.rect);
  const buttonLeft = nodeX - options.nodeSize / 2;
  const buttonTop = nodeY - options.nodeSize / 2;
  return {
    position: best.position,
    rect: roundRect(best.rect),
    labelDx: round(best.rect.x - buttonLeft),
    labelDy: round(best.rect.y - buttonTop),
    linkLength: round(connector.length),
    linkAngle: round(connector.angle)
  };
}

function labelCandidates(nodeX, nodeY, options) {
  const { width, height, labelWidth, labelHeight, gap } = options;
  const horizontalOrder = nodeX > width * 0.58 ? ["left", "right"] : ["right", "left"];
  const verticalOrder = nodeY < height * 0.3
    ? ["below", "center", "above"]
    : nodeY > height * 0.7
      ? ["above", "center", "below"]
      : ["center", "above", "below"];
  const candidates = [];

  for (const side of horizontalOrder) {
    for (const vertical of verticalOrder) {
      candidates.push({
        position: `${side}-${vertical}`,
        rect: sideRect(side, vertical, nodeX, nodeY, labelWidth, labelHeight, gap)
      });
    }
  }

  for (const distance of [2, 3]) {
    for (const side of horizontalOrder) {
      for (const vertical of verticalOrder) {
        candidates.push({
          position: `${side}-${distance}-${vertical}`,
          rect: sideRect(side, vertical, nodeX, nodeY, labelWidth, labelHeight, gap, distance)
        });
      }
    }
  }

  const centeredOrder = nodeY < height * 0.5 ? ["below", "above"] : ["above", "below"];
  for (const vertical of centeredOrder) {
    candidates.push({
      position: `center-${vertical}`,
      rect: {
        x: nodeX - labelWidth / 2,
        y: vertical === "above" ? nodeY - gap - labelHeight : nodeY + gap,
        width: labelWidth,
        height: labelHeight
      }
    });
  }

  return candidates;
}

function sideRect(side, vertical, nodeX, nodeY, labelWidth, labelHeight, gap, distance = 1) {
  const horizontalReach = gap * distance + labelWidth * distance;
  const x = side === "left" ? nodeX - horizontalReach : nodeX + horizontalReach - labelWidth;
  const y = vertical === "above"
    ? nodeY - gap - labelHeight
    : vertical === "below"
      ? nodeY + gap
      : nodeY - labelHeight / 2;
  return { x, y, width: labelWidth, height: labelHeight };
}

function candidateScore(rect, pointId, nodes, occupied, options, index) {
  const right = rect.x + rect.width;
  const bottom = rect.y + rect.height;
  const overflow = Math.max(0, options.padding - rect.x)
    + Math.max(0, right - (options.width - options.padding))
    + Math.max(0, options.padding - rect.y)
    + Math.max(0, bottom - (options.height - options.padding));
  let score = overflow * 100000 + index * 18;

  for (const box of occupied) {
    const overlap = intersectionArea(rect, box);
    if (overlap > 0) score += 1000000 + overlap * 1000;
  }

  const paddedRect = expandRect(rect, 5);
  for (const node of nodes) {
    if (node.id !== pointId && pointInsideRect(node, paddedRect)) score += 500000;
  }

  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;
  const ownNode = nodes.find((node) => node.id === pointId);
  score += Math.hypot(centerX - ownNode.x, centerY - ownNode.y) * 0.1;
  return score;
}

function connectorGeometry(nodeX, nodeY, rect) {
  const targetX = clamp(nodeX, rect.x, rect.x + rect.width);
  const targetY = clamp(nodeY, rect.y, rect.y + rect.height);
  const dx = targetX - nodeX;
  const dy = targetY - nodeY;
  return {
    length: Math.hypot(dx, dy),
    angle: Math.atan2(dy, dx) * 180 / Math.PI
  };
}

function intersectionArea(left, right) {
  const width = Math.max(0, Math.min(left.x + left.width, right.x + right.width) - Math.max(left.x, right.x));
  const height = Math.max(0, Math.min(left.y + left.height, right.y + right.height) - Math.max(left.y, right.y));
  return width * height;
}

function pointInsideRect(point, rect) {
  return point.x >= rect.x
    && point.x <= rect.x + rect.width
    && point.y >= rect.y
    && point.y <= rect.y + rect.height;
}

function expandRect(rect, amount) {
  return {
    x: rect.x - amount,
    y: rect.y - amount,
    width: rect.width + amount * 2,
    height: rect.height + amount * 2
  };
}

function roundRect(rect) {
  return {
    x: round(rect.x),
    y: round(rect.y),
    width: round(rect.width),
    height: round(rect.height)
  };
}

function toDate(value) {
  if (value instanceof Date) return new Date(value.getTime());
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") ? `${value}T00:00:00.000Z` : value;
  return new Date(normalized);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round(value) {
  return Math.round(value * 10) / 10;
}
