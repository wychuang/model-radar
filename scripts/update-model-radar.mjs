import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { modelRadarSeed } from "../src/model-radar-seed.mjs";
import { modelRadarSnapshot } from "../src/model-radar-snapshot.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const snapshotPath = resolve(projectRoot, "src", "model-radar-snapshot.mjs");
const politeDelayMs = Number(process.env.MODEL_RADAR_DELAY_MS ?? 1600);

export function extractSignals(text, watchTerms) {
  const haystack = normalizeText(text);

  return [...new Set(watchTerms.filter((term) => haystack.includes(normalizeText(term))))];
}

export async function buildSourceStatus(source, options = {}) {
  const fetchedAt = options.fetchedAt ?? new Date().toISOString();
  const fetchText = options.fetchText ?? defaultFetchText;

  try {
    const text = await fetchText(source.url);
    const hash = sha256(text);

    return {
      id: source.id,
      lastCheckedAt: fetchedAt,
      ok: true,
      sha256: hash,
      foundSignals: extractSignals(text, source.watch ?? []),
      error: ""
    };
  } catch (error) {
    return {
      id: source.id,
      lastCheckedAt: fetchedAt,
      ok: false,
      sha256: "",
      foundSignals: [],
      error: String(error?.message ?? error).slice(0, 240)
    };
  }
}

export function mergeSourceStatuses(seed, statuses, generatedAt = new Date().toISOString()) {
  const statusesById = new Map(statuses.map((status) => [status.id, status]));

  return {
    ...seed,
    generatedAt,
    refresh: {
      ...seed.refresh,
      nextRunHint: "daily low-frequency source refresh; failures keep curated benchmark rows intact"
    },
    sources: seed.sources.map((source) => {
      const status = statusesById.get(source.id);
      if (!status) return { ...source, ok: null, foundSignals: [] };

      return {
        ...source,
        lastCheckedAt: status.lastCheckedAt,
        ok: status.ok,
        sha256: status.ok ? status.sha256 : source.sha256 ?? "",
        foundSignals: status.foundSignals,
        changed: Boolean(status.ok && source.sha256 && source.sha256 !== status.sha256),
        error: status.error
      };
    })
  };
}

export async function runUpdate({ seed = modelRadarSeed, previousSnapshot = modelRadarSnapshot, outputPath = snapshotPath } = {}) {
  const fetchedAt = new Date().toISOString();
  const statuses = [];
  const previousSources = new Map((previousSnapshot?.sources ?? []).map((source) => [source.id, source]));
  const seedWithHistory = {
    ...seed,
    sources: seed.sources.map((source) => ({
      ...source,
      sha256: previousSources.get(source.id)?.sha256 ?? source.sha256 ?? ""
    }))
  };

  for (const source of seedWithHistory.sources) {
    statuses.push(await buildSourceStatus(source, { fetchedAt }));
    await delay(politeDelayMs);
  }

  const snapshot = mergeSourceStatuses(seedWithHistory, statuses, fetchedAt);
  await writeSnapshot(outputPath, snapshot);

  return snapshot;
}

async function defaultFetchText(url) {
  if (!isAllowedOfficialUrl(url)) {
    throw new Error(`Refusing non-allowlisted or non-https URL: ${url}`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "accept": "text/html,application/json,text/plain;q=0.9,*/*;q=0.5",
        "user-agent": "model-radar/0.2 low-frequency public-source checker"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function isAllowedOfficialUrl(rawUrl) {
  const url = new URL(rawUrl);
  const allowedHosts = new Set([
    "openai.com",
    "www.anthropic.com",
    "deepmind.google",
    "x.ai",
    "api-docs.deepseek.com",
    "www.kimi.com",
    "docs.mistral.ai",
    "qwen.ai",
    "ai.meta.com",
    "docs.cohere.com",
    "aws.amazon.com",
    "z.ai",
    "artificialanalysis.ai",
    "arena.ai",
    "www.swebench.com",
    "www.tbench.ai",
    "arcprize.org",
    "agents-last-exam.org"
  ]);

  return url.protocol === "https:" && allowedHosts.has(url.hostname);
}

async function writeSnapshot(outputPath, snapshot) {
  const body = `export const modelRadarSnapshot = ${JSON.stringify(snapshot, null, 2)};\n`;
  await writeFile(outputPath, body, "utf8");
}

function normalizeText(text) {
  return String(text).toLowerCase().replace(/[\s_]+/g, "-");
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function delay(ms) {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runUpdate()
    .then((snapshot) => {
      const okCount = snapshot.sources.filter((source) => source.ok).length;
      console.log(`model-radar snapshot refreshed: ${okCount}/${snapshot.sources.length} allowlisted sources checked`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
