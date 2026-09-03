export const modelRadarSnapshot = {
  "schemaVersion": 2,
  "generatedAt": "2026-09-03T00:09:48.617Z",
  "refresh": {
    "cadence": "daily",
    "nextRunHint": "daily low-frequency source refresh; failures keep curated benchmark rows intact",
    "workflow": ".github/workflows/model-radar.yml"
  },
  "benchmarks": [
    {
      "id": "aa-index",
      "label": "Artificial Analysis Intelligence Index",
      "shortLabel": "AA INTEL",
      "displayLabel": "AA 智力",
      "direction": "higher",
      "format": "index",
      "min": 20,
      "max": 65,
      "sourceId": "benchmark-aa",
      "asOf": "2026-08-06",
      "description": "Independent composite intelligence index. Max-reasoning configurations are used when listed."
    },
    {
      "id": "arena-elo",
      "label": "Arena Text Leaderboard",
      "shortLabel": "ARENA",
      "displayLabel": "人类偏好",
      "direction": "higher",
      "format": "elo",
      "min": 1350,
      "max": 1520,
      "sourceId": "benchmark-arena",
      "asOf": "2026-08-07",
      "description": "Crowd preference score from blind side-by-side votes. Preliminary rows are marked."
    },
    {
      "id": "output-speed",
      "label": "Artificial Analysis output speed",
      "shortLabel": "OUTPUT T/S",
      "displayLabel": "生成速度",
      "direction": "higher",
      "format": "speed",
      "min": 30,
      "max": 220,
      "sourceId": "benchmark-aa",
      "asOf": "2026-08-07",
      "description": "Measured output tokens per second from the model's first-party API or the benchmark's documented provider representation."
    },
    {
      "id": "swebench-pro",
      "label": "SWE-Bench Pro",
      "shortLabel": "SWE PRO",
      "displayLabel": "真实工程",
      "direction": "higher",
      "format": "percent",
      "min": 40,
      "max": 85,
      "sourceId": "benchmark-swe",
      "asOf": "2026-08-06",
      "description": "Repository-level software engineering tasks. Values here are vendor-reported unless noted."
    },
    {
      "id": "terminalbench",
      "label": "Terminal-Bench 2.1",
      "shortLabel": "TERMINAL",
      "displayLabel": "终端 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 40,
      "max": 90,
      "sourceId": "benchmark-terminal",
      "asOf": "2026-08-06",
      "description": "Vendor-published Terminal-Bench 2.1 results. Agent harness and run configuration can change the score."
    },
    {
      "id": "output-price",
      "label": "API output price",
      "shortLabel": "OUTPUT $",
      "displayLabel": "输出价格",
      "direction": "lower",
      "format": "usd",
      "min": 0,
      "max": 50,
      "scale": "log",
      "sourceId": null,
      "derivedFrom": "outputPrice",
      "asOf": "2026-08-06",
      "description": "Public list price in USD per million output tokens. Lower is better; the visual position uses a documented log scale so sub-dollar differences remain visible. Discounts and cache tiers are excluded."
    },
    {
      "id": "context-window",
      "label": "Advertised context window",
      "shortLabel": "CONTEXT",
      "displayLabel": "上下文",
      "direction": "higher",
      "format": "tokens",
      "min": 128000,
      "max": 1050000,
      "sourceId": null,
      "derivedFrom": "contextTokens",
      "asOf": "2026-08-06",
      "description": "Advertised input context. Effective long-context quality is a separate question."
    },
    {
      "id": "agent-last-exam",
      "label": "Agents' Last Exam",
      "shortLabel": "ALE",
      "displayLabel": "长程 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 60,
      "sourceId": "benchmark-ale",
      "asOf": "2026-08-07",
      "radar": false,
      "description": "Long-running professional workflows across many fields. Displayed only when the exact model configuration is documented."
    },
    {
      "id": "aa-coding-agent",
      "label": "Artificial Analysis Coding Agent Index",
      "shortLabel": "AA CODING",
      "displayLabel": "编程 Agent 指数",
      "direction": "higher",
      "format": "index",
      "min": 0,
      "max": 85,
      "sourceId": "benchmark-aa-coding",
      "asOf": "2026-08-07",
      "radar": false,
      "description": "Independent coding-agent index pairing models with documented agent harnesses across DeepSWE, Terminal-Bench and SWE-Atlas-QnA."
    },
    {
      "id": "gdpval-aa-v2",
      "label": "GDPval-AA v2",
      "shortLabel": "GDPVAL-AA",
      "displayLabel": "专业工作",
      "direction": "higher",
      "format": "elo",
      "min": 1000,
      "max": 1900,
      "sourceId": "benchmark-aa-gdpval",
      "asOf": "2026-08-07",
      "radar": false,
      "description": "Independent agentic real-world knowledge-work evaluation reported as Elo."
    },
    {
      "id": "aa-briefcase",
      "label": "AA-Briefcase Elo",
      "shortLabel": "AA BRIEFCASE",
      "displayLabel": "知识工作交付",
      "direction": "higher",
      "format": "elo",
      "min": 1000,
      "max": 1800,
      "sourceId": "benchmark-aa-briefcase",
      "asOf": "2026-08-07",
      "radar": false,
      "description": "Independent agentic knowledge-work benchmark combining rubric completion and output quality."
    },
    {
      "id": "terminalbench-vendor",
      "label": "Terminal-Bench 2.1 provider run",
      "shortLabel": "TERMINAL VENDOR",
      "displayLabel": "厂商终端 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 40,
      "max": 90,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Provider-reported Terminal-Bench 2.1 result retained beside an independent run when both configurations are available."
    },
    {
      "id": "nl2repo",
      "label": "NL2Repo",
      "shortLabel": "NL2REPO",
      "displayLabel": "需求到仓库",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 70,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Repository construction from natural-language requirements, reported with DeepSeek Harness."
    },
    {
      "id": "cybergym",
      "label": "CyberGym",
      "shortLabel": "CYBERGYM",
      "displayLabel": "网络任务",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 90,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Cybersecurity agent tasks reported by DeepSeek under its published harness configuration."
    },
    {
      "id": "deepswe",
      "label": "DeepSWE",
      "shortLabel": "DEEPSWE",
      "displayLabel": "长程工程",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 80,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Long-horizon software engineering tasks reported by the model provider."
    },
    {
      "id": "toolathlon",
      "label": "Toolathlon Verified",
      "shortLabel": "TOOLATHLON",
      "displayLabel": "工具调用",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 80,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Verified multi-tool task performance reported by DeepSeek."
    },
    {
      "id": "automation-bench",
      "label": "Automation Bench Public",
      "shortLabel": "AUTOMATION",
      "displayLabel": "自动化工作流",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 60,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Public automation workflow benchmark reported by DeepSeek."
    },
    {
      "id": "dsbench-fullstack",
      "label": "DSBench FullStack",
      "shortLabel": "DS FULLSTACK",
      "displayLabel": "全栈 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 80,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Full-stack agent benchmark reported by DeepSeek."
    },
    {
      "id": "dsbench-hard",
      "label": "DSBench Hard",
      "shortLabel": "DS HARD",
      "displayLabel": "困难 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 70,
      "sourceId": "deepseek-v4-flash",
      "asOf": "2026-07-31",
      "radar": false,
      "description": "Hard subset of DSBench reported by DeepSeek."
    }
  ],
  "providers": [
    {
      "id": "openai",
      "name": "OpenAI",
      "region": "US",
      "accent": "#e8e6df",
      "accentText": "#11120f",
      "latestModelId": "openai-gpt-5-6-sol",
      "cycleLabel": "numbered frontier train",
      "releaseHistory": [
        {
          "date": "2025-08-07",
          "label": "GPT-5"
        },
        {
          "date": "2025-12-11",
          "label": "GPT-5.2"
        },
        {
          "date": "2026-04-23",
          "label": "GPT-5.5"
        },
        {
          "date": "2026-07-09",
          "label": "GPT-5.6 Sol"
        }
      ]
    },
    {
      "id": "anthropic",
      "name": "Anthropic",
      "region": "US",
      "accent": "#d97757",
      "accentText": "#11120f",
      "latestModelId": "anthropic-claude-opus-5",
      "cycleLabel": "Opus/Sonnet alternating train",
      "releaseHistory": [
        {
          "date": "2025-11-24",
          "label": "Claude Opus 4.5"
        },
        {
          "date": "2026-02-17",
          "label": "Claude Sonnet 4.6"
        },
        {
          "date": "2026-06-09",
          "label": "Claude Fable 5"
        },
        {
          "date": "2026-07-24",
          "label": "Claude Opus 5"
        }
      ]
    },
    {
      "id": "google",
      "name": "Google DeepMind",
      "region": "US",
      "accent": "#4285f4",
      "accentText": "#ece7d6",
      "latestModelId": "google-gemini-3-6-flash",
      "cycleLabel": "Gemini preview to stable stream",
      "releaseHistory": [
        {
          "date": "2025-11-18",
          "label": "Gemini 3 Pro"
        },
        {
          "date": "2026-02-19",
          "label": "Gemini 3.1 Pro"
        },
        {
          "date": "2026-05-12",
          "label": "Gemini 3.5 Flash"
        },
        {
          "date": "2026-07-21",
          "label": "Gemini 3.6 Flash"
        }
      ]
    },
    {
      "id": "xai",
      "name": "xAI",
      "region": "US",
      "accent": "#c7c9c2",
      "accentText": "#11120f",
      "latestModelId": "xai-grok-4-5",
      "cycleLabel": "rapid Grok reasoning stream",
      "releaseHistory": [
        {
          "date": "2025-07-09",
          "label": "Grok 4"
        },
        {
          "date": "2025-11-17",
          "label": "Grok 4.1"
        },
        {
          "date": "2026-05-09",
          "label": "Grok 4.3"
        },
        {
          "date": "2026-07-16",
          "label": "Grok 4.5"
        }
      ]
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "region": "CN",
      "accent": "#4d6bfe",
      "accentText": "#ece7d6",
      "latestModelId": "deepseek-v4-flash-0731",
      "cycleLabel": "price pressure plus long reasoning",
      "releaseHistory": [
        {
          "date": "2025-01-20",
          "label": "DeepSeek-R1"
        },
        {
          "date": "2025-12-01",
          "label": "DeepSeek-V3.2"
        },
        {
          "date": "2026-04-24",
          "label": "DeepSeek-V4 Pro Preview"
        },
        {
          "date": "2026-07-31",
          "label": "DeepSeek-V4 Flash 0731"
        }
      ]
    },
    {
      "id": "moonshot",
      "name": "Moonshot AI",
      "region": "CN",
      "accent": "#d85c9a",
      "accentText": "#11120f",
      "latestModelId": "moonshot-kimi-k3",
      "cycleLabel": "Kimi coding and agent stream",
      "releaseHistory": [
        {
          "date": "2025-07-11",
          "label": "Kimi K2"
        },
        {
          "date": "2025-11-06",
          "label": "Kimi K2 Thinking"
        },
        {
          "date": "2026-05-18",
          "label": "Kimi K2.6"
        },
        {
          "date": "2026-07-16",
          "label": "Kimi K3"
        }
      ]
    },
    {
      "id": "mistral",
      "name": "Mistral AI",
      "region": "EU",
      "accent": "#f0a202",
      "accentText": "#11120f",
      "latestModelId": "mistral-medium-3-5",
      "cycleLabel": "open and enterprise model lattice",
      "releaseHistory": [
        {
          "date": "2025-05-07",
          "label": "Mistral Medium 3"
        },
        {
          "date": "2025-12-01",
          "label": "Mistral Large 3"
        },
        {
          "date": "2026-03-18",
          "label": "Mistral Medium 3.5"
        }
      ]
    },
    {
      "id": "qwen",
      "name": "Alibaba Qwen",
      "region": "CN",
      "accent": "#7c6cf2",
      "accentText": "#11120f",
      "latestModelId": "qwen-3-7-max",
      "cycleLabel": "dense and MoE release stream",
      "releaseHistory": [
        {
          "date": "2025-04-29",
          "label": "Qwen3"
        },
        {
          "date": "2025-07-21",
          "label": "Qwen3 2507"
        },
        {
          "date": "2026-01-15",
          "label": "Qwen3 long context"
        },
        {
          "date": "2026-05-20",
          "label": "Qwen3.7 Max"
        }
      ]
    },
    {
      "id": "meta",
      "name": "Meta",
      "region": "US",
      "accent": "#168cf0",
      "accentText": "#11120f",
      "latestModelId": "meta-muse-spark-1-1",
      "cycleLabel": "open and API multimodal waves",
      "releaseHistory": [
        {
          "date": "2024-12-06",
          "label": "Llama 3.3"
        },
        {
          "date": "2025-04-05",
          "label": "Llama 4"
        },
        {
          "date": "2026-04-29",
          "label": "Muse Spark"
        },
        {
          "date": "2026-07-09",
          "label": "Muse Spark 1.1"
        }
      ]
    },
    {
      "id": "cohere",
      "name": "Cohere",
      "region": "CA",
      "accent": "#73c69a",
      "accentText": "#11120f",
      "latestModelId": "cohere-command-a-plus",
      "cycleLabel": "enterprise RAG and Command stream",
      "releaseHistory": [
        {
          "date": "2025-03-13",
          "label": "Command A"
        },
        {
          "date": "2025-08-19",
          "label": "Command A Reasoning"
        },
        {
          "date": "2026-05-20",
          "label": "Command A+"
        }
      ]
    },
    {
      "id": "amazon",
      "name": "Amazon",
      "region": "US",
      "accent": "#ff9900",
      "accentText": "#11120f",
      "latestModelId": "amazon-nova-2-omni",
      "cycleLabel": "Bedrock platform train",
      "releaseHistory": [
        {
          "date": "2024-12-03",
          "label": "Nova family"
        },
        {
          "date": "2025-04-30",
          "label": "Nova Premier"
        },
        {
          "date": "2025-12-02",
          "label": "Nova 2 family"
        }
      ]
    },
    {
      "id": "zhipu",
      "name": "Z.ai",
      "region": "CN",
      "accent": "#e5484d",
      "accentText": "#ece7d6",
      "latestModelId": "zhipu-glm-5-2",
      "cycleLabel": "GLM agent and coding stream",
      "releaseHistory": [
        {
          "date": "2025-06-30",
          "label": "GLM-4.5"
        },
        {
          "date": "2025-09-30",
          "label": "GLM-4.6"
        },
        {
          "date": "2026-02-11",
          "label": "GLM-5"
        },
        {
          "date": "2026-06-16",
          "label": "GLM-5.2"
        }
      ]
    }
  ],
  "models": [
    {
      "id": "openai-gpt-5-6-sol",
      "providerId": "openai",
      "name": "GPT-5.6 Sol",
      "modelIds": [
        "gpt-5.6-sol",
        "gpt-5.6-sol-xhigh"
      ],
      "releasedAt": "2026-07-09",
      "stage": "frontier",
      "access": [
        "api",
        "chat"
      ],
      "contextTokens": 1050000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 5,
        "outputPerMTok": 30
      },
      "posture": "Highest-cost general frontier lane with strong software and agent results.",
      "watch": "Track whether smaller GPT-5.6 tiers inherit Sol's agent gains.",
      "benchmarks": {
        "aa-index": {
          "value": 59,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1487,
          "rank": 15,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "variant": "xhigh"
        },
        "output-speed": {
          "value": 62.9,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "aa-coding-agent": {
          "value": 80,
          "sourceId": "benchmark-aa-coding",
          "asOf": "2026-07-17",
          "variant": "max / Codex"
        },
        "gdpval-aa-v2": {
          "value": 1730,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-08-05",
          "variant": "max"
        },
        "aa-briefcase": {
          "value": 1495,
          "sourceId": "benchmark-aa-briefcase",
          "asOf": "2026-07-24",
          "variant": "max"
        },
        "swebench-pro": {
          "value": 64.6,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported"
        },
        "terminalbench": {
          "value": 88.8,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported"
        },
        "agent-last-exam": {
          "value": 52.7,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported"
        }
      },
      "sourceRefs": [
        "openai-gpt-56"
      ]
    },
    {
      "id": "anthropic-claude-opus-5",
      "providerId": "anthropic",
      "name": "Claude Opus 5",
      "modelIds": [
        "claude-opus-5",
        "claude-opus-5-high"
      ],
      "releasedAt": "2026-07-24",
      "stage": "frontier",
      "access": [
        "api",
        "claude"
      ],
      "contextTokens": 1000000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 5,
        "outputPerMTok": 25
      },
      "posture": "Current Anthropic workhorse at near-Fable intelligence and half its price.",
      "watch": "The practical question is how quickly Opus 5 becomes the default agent model.",
      "benchmarks": {
        "aa-index": {
          "value": 61,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1493,
          "rank": 9,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "variant": "high"
        },
        "output-speed": {
          "value": 54.5,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "terminalbench": {
          "value": 89,
          "sourceId": "benchmark-aa",
          "asOf": "2026-07-24",
          "variant": "max"
        },
        "gdpval-aa-v2": {
          "value": 1852,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-08-05",
          "variant": "max"
        },
        "aa-briefcase": {
          "value": 1720,
          "sourceId": "benchmark-aa-briefcase",
          "asOf": "2026-07-24",
          "variant": "max"
        }
      },
      "sourceRefs": [
        "anthropic-opus-5"
      ]
    },
    {
      "id": "anthropic-claude-fable-5",
      "providerId": "anthropic",
      "name": "Claude Fable 5",
      "modelIds": [
        "claude-fable-5"
      ],
      "releasedAt": "2026-06-09",
      "stage": "frontier",
      "access": [
        "api",
        "claude"
      ],
      "contextTokens": 1000000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 10,
        "outputPerMTok": 50
      },
      "posture": "Anthropic's expensive ceiling model and a current Arena preference front-runner.",
      "watch": "Watch for capability transfer into the cheaper Opus and Sonnet lanes.",
      "benchmarks": {
        "aa-index": {
          "value": 60,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1513,
          "rank": 2,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07"
        },
        "output-speed": {
          "value": 66.8,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "aa-coding-agent": {
          "value": 77,
          "sourceId": "benchmark-aa-coding",
          "asOf": "2026-07-17",
          "variant": "max / Claude Code"
        },
        "gdpval-aa-v2": {
          "value": 1760,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-07-17",
          "variant": "max"
        },
        "aa-briefcase": {
          "value": 1574,
          "sourceId": "benchmark-aa-briefcase",
          "asOf": "2026-07-24",
          "variant": "max"
        },
        "agent-last-exam": {
          "value": 40.5,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported"
        },
        "swebench-pro": {
          "value": 80,
          "sourceId": "anthropic-fable-5",
          "asOf": "2026-06-09",
          "provenance": "vendor-reported"
        },
        "terminalbench": {
          "value": 84.3,
          "sourceId": "anthropic-fable-5",
          "asOf": "2026-06-09",
          "provenance": "vendor-reported"
        }
      },
      "sourceRefs": [
        "anthropic-fable-5"
      ]
    },
    {
      "id": "google-gemini-3-6-flash",
      "providerId": "google",
      "name": "Gemini 3.6 Flash",
      "modelIds": [
        "gemini-3.6-flash"
      ],
      "releasedAt": "2026-07-21",
      "stage": "frontier",
      "access": [
        "api",
        "ai-studio",
        "vertex"
      ],
      "contextTokens": 1000000,
      "outputTokens": 65536,
      "priceUsd": {
        "inputPerMTok": 1.5,
        "outputPerMTok": 7.5
      },
      "posture": "High-throughput multimodal model with unusually strong agent scores for a Flash tier.",
      "watch": "The next signal is whether Gemini's Pro lane converts this speed into a new ceiling.",
      "benchmarks": {
        "aa-index": {
          "value": 50,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1491,
          "rank": 10,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "preliminary": true
        },
        "output-speed": {
          "value": 200.5,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "high"
        },
        "gdpval-aa-v2": {
          "value": 1423,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-08-07",
          "variant": "high"
        },
        "swebench-pro": {
          "value": 58.7,
          "sourceId": "google-gemini",
          "asOf": "2026-07-21",
          "provenance": "vendor-reported"
        },
        "terminalbench": {
          "value": 78,
          "sourceId": "google-gemini",
          "asOf": "2026-07-21",
          "provenance": "vendor-reported"
        }
      },
      "sourceRefs": [
        "google-gemini"
      ]
    },
    {
      "id": "xai-grok-4-5",
      "providerId": "xai",
      "name": "Grok 4.5",
      "modelIds": [
        "grok-4.5"
      ],
      "releasedAt": "2026-07-16",
      "stage": "frontier",
      "access": [
        "api",
        "x"
      ],
      "contextTokens": 500000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 2,
        "outputPerMTok": 6
      },
      "posture": "Fast reasoning and terminal-agent challenger with aggressive list pricing.",
      "watch": "Latency and sustained tool-use reliability are now the pressure points.",
      "benchmarks": {
        "aa-index": {
          "value": 54,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1473,
          "rank": 37,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07"
        },
        "output-speed": {
          "value": 56.8,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "high"
        },
        "aa-coding-agent": {
          "value": 76,
          "sourceId": "benchmark-aa-coding",
          "asOf": "2026-07-17",
          "variant": "high / Grok Build"
        },
        "swebench-pro": {
          "value": 64.7,
          "sourceId": "xai-grok-45",
          "asOf": "2026-07-16",
          "provenance": "vendor-reported"
        },
        "terminalbench": {
          "value": 83.3,
          "sourceId": "xai-grok-45",
          "asOf": "2026-07-16",
          "provenance": "vendor-reported"
        }
      },
      "sourceRefs": [
        "xai-grok-45"
      ]
    },
    {
      "id": "deepseek-v4-pro",
      "providerId": "deepseek",
      "name": "DeepSeek-V4 Pro",
      "modelIds": [
        "deepseek-v4-pro"
      ],
      "releasedAt": "2026-04-24",
      "stage": "preview",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": 384000,
      "priceUsd": {
        "inputPerMTok": 0.435,
        "outputPerMTok": 0.87
      },
      "posture": "The strongest price shock in this board, paired with a million-token context.",
      "watch": "Its economics force every frontier provider to explain its premium.",
      "benchmarks": {
        "aa-index": {
          "value": 44,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1466,
          "rank": 50,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07"
        },
        "output-speed": {
          "value": 62.8,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        }
      },
      "sourceRefs": [
        "deepseek-v4"
      ]
    },
    {
      "id": "deepseek-v4-flash-0731",
      "providerId": "deepseek",
      "name": "DeepSeek-V4 Flash 0731",
      "modelIds": [
        "deepseek-v4-flash",
        "deepseek-v4-flash-0731",
        "deepseek-v4-flash-high-preview"
      ],
      "releasedAt": "2026-07-31",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": 384000,
      "priceUsd": {
        "inputPerMTok": 0.14,
        "outputPerMTok": 0.28
      },
      "posture": "The board's clearest quality-per-dollar shock, with a broad official agent evaluation suite and million-token context.",
      "watch": "Independent long-horizon replication is now the decisive follow-up signal.",
      "benchmarks": {
        "aa-index": {
          "value": 50,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "arena-elo": {
          "value": 1446,
          "rank": 81,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07"
        },
        "output-speed": {
          "value": 102.4,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "terminalbench": {
          "value": 79,
          "sourceId": "benchmark-aa",
          "asOf": "2026-07-31",
          "variant": "max"
        },
        "terminalbench-vendor": {
          "value": 82.7,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "gdpval-aa-v2": {
          "value": 1559,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-07-31",
          "variant": "max"
        },
        "nl2repo": {
          "value": 54.2,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "cybergym": {
          "value": 76.7,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "deepswe": {
          "value": 54.4,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "toolathlon": {
          "value": 70.3,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "agent-last-exam": {
          "value": 25.2,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "automation-bench": {
          "value": 25.1,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "dsbench-fullstack": {
          "value": 68.7,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        },
        "dsbench-hard": {
          "value": 59.6,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
        }
      },
      "sourceRefs": [
        "deepseek-v4-flash"
      ]
    },
    {
      "id": "moonshot-kimi-k3",
      "providerId": "moonshot",
      "name": "Kimi K3",
      "modelIds": [
        "kimi-k3",
        "kimi-k3-max"
      ],
      "releasedAt": "2026-07-16",
      "stage": "open-weight",
      "access": [
        "api",
        "web",
        "open-weight"
      ],
      "contextTokens": 1000000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 3,
        "outputPerMTok": 15
      },
      "posture": "Large open-weight coding and agent model competing in the global top tier.",
      "watch": "Open weights turn leaderboard movement into immediate deployment pressure.",
      "benchmarks": {
        "aa-index": {
          "value": 57,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1494,
          "rank": 8,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "preliminary": true,
          "variant": "max"
        },
        "output-speed": {
          "value": 38.5,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "gdpval-aa-v2": {
          "value": 1685,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-08-05",
          "variant": "max"
        },
        "aa-briefcase": {
          "value": 1547,
          "sourceId": "benchmark-aa-briefcase",
          "asOf": "2026-07-17",
          "variant": "max"
        }
      },
      "sourceRefs": [
        "moonshot-kimi-k3"
      ]
    },
    {
      "id": "mistral-medium-3-5",
      "providerId": "mistral",
      "name": "Mistral Medium 3.5",
      "modelIds": [
        "mistral-medium-3.5"
      ],
      "releasedAt": "2026-03-18",
      "stage": "enterprise",
      "access": [
        "api",
        "enterprise"
      ],
      "contextTokens": 262144,
      "outputTokens": 65536,
      "priceUsd": {
        "inputPerMTok": 1.5,
        "outputPerMTok": 7.5
      },
      "posture": "European enterprise alternative optimized around deployment control and latency.",
      "watch": "A new Mistral flagship would reset the oldest clock on this board.",
      "benchmarks": {
        "aa-index": {
          "value": 30,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1445,
          "rank": 82,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07"
        },
        "output-speed": {
          "value": 140,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07"
        }
      },
      "sourceRefs": [
        "mistral-models"
      ]
    },
    {
      "id": "qwen-3-7-max",
      "providerId": "qwen",
      "name": "Qwen3.7 Max",
      "modelIds": [
        "qwen3.7-max",
        "qwen3.7-max-preview"
      ],
      "releasedAt": "2026-05-20",
      "stage": "preview",
      "access": [
        "api",
        "web"
      ],
      "contextTokens": 1000000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 2.5,
        "outputPerMTok": 7.5
      },
      "posture": "Chinese general frontier model with strong human-preference placement.",
      "watch": "Arena already shows a Qwen3.8 label; official confirmation is the next decisive event.",
      "benchmarks": {
        "aa-index": {
          "value": 46,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1475,
          "rank": 33,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "preliminary": true
        },
        "output-speed": {
          "value": 201.9,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07"
        }
      },
      "sourceRefs": [
        "qwen-models"
      ]
    },
    {
      "id": "meta-muse-spark-1-1",
      "providerId": "meta",
      "name": "Muse Spark 1.1",
      "modelIds": [
        "muse-spark-1.1"
      ],
      "releasedAt": "2026-07-09",
      "stage": "preview",
      "access": [
        "api-preview"
      ],
      "contextTokens": 1000000,
      "outputTokens": 65536,
      "priceUsd": {
        "inputPerMTok": 1.25,
        "outputPerMTok": 4.25
      },
      "posture": "Meta's multimodal agentic API model and a sharp break from the Llama-only storyline.",
      "watch": "Public API availability and open-weight strategy remain the missing pieces.",
      "benchmarks": {
        "aa-index": {
          "value": 51,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1488,
          "rank": 14,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "preliminary": true
        },
        "output-speed": {
          "value": 214.5,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "xhigh"
        },
        "aa-coding-agent": {
          "value": 69,
          "sourceId": "benchmark-aa-coding",
          "asOf": "2026-07-17",
          "variant": "xhigh / OpenCode"
        },
        "gdpval-aa-v2": {
          "value": 1371,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-08-05",
          "variant": "xhigh"
        }
      },
      "sourceRefs": [
        "meta-muse"
      ]
    },
    {
      "id": "cohere-command-a-plus",
      "providerId": "cohere",
      "name": "Command A+",
      "modelIds": [
        "command-a-plus"
      ],
      "releasedAt": "2026-05-20",
      "stage": "open-weight",
      "access": [
        "open-weight",
        "enterprise"
      ],
      "contextTokens": 128000,
      "outputTokens": 64000,
      "priceUsd": null,
      "posture": "Apache-licensed enterprise model with 25B active parameters and broad language coverage.",
      "watch": "Independent benchmark coverage is still thin, so the missing cells matter here.",
      "benchmarks": {
        "aa-index": {
          "value": 23,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07"
        },
        "output-speed": {
          "value": 197,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07"
        }
      },
      "sourceRefs": [
        "cohere-command-a-plus"
      ]
    },
    {
      "id": "amazon-nova-2-omni",
      "providerId": "amazon",
      "name": "Amazon Nova 2 Omni",
      "modelIds": [
        "amazon.nova-2-omni-v1:0"
      ],
      "releasedAt": "2025-12-02",
      "stage": "platform",
      "access": [
        "bedrock"
      ],
      "contextTokens": 1000000,
      "outputTokens": 32000,
      "priceUsd": null,
      "posture": "Bedrock-native multimodal model whose distribution signal exceeds public benchmark coverage.",
      "watch": "The next Nova lifecycle update matters most to existing AWS fleets.",
      "benchmarks": {},
      "sourceRefs": [
        "amazon-nova"
      ]
    },
    {
      "id": "zhipu-glm-5-2",
      "providerId": "zhipu",
      "name": "GLM-5.2",
      "modelIds": [
        "glm-5.2",
        "glm-5.2-max"
      ],
      "releasedAt": "2026-06-16",
      "stage": "frontier",
      "access": [
        "api",
        "chat"
      ],
      "contextTokens": 1000000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 1.4,
        "outputPerMTok": 4.4
      },
      "posture": "Fast Chinese frontier challenger with strong terminal and software results.",
      "watch": "Its speed and price make sustained agent reliability the key follow-up test.",
      "benchmarks": {
        "aa-index": {
          "value": 51,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1479,
          "rank": 26,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "output-speed": {
          "value": 139.5,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-07",
          "variant": "max"
        },
        "gdpval-aa-v2": {
          "value": 1510,
          "sourceId": "benchmark-aa-gdpval",
          "asOf": "2026-07-31",
          "variant": "max"
        },
        "swebench-pro": {
          "value": 62.1,
          "sourceId": "zhipu-glm-52",
          "asOf": "2026-06-16",
          "provenance": "vendor-reported"
        },
        "terminalbench": {
          "value": 81,
          "sourceId": "zhipu-glm-52",
          "asOf": "2026-06-16",
          "provenance": "vendor-reported"
        }
      },
      "sourceRefs": [
        "zhipu-glm-52"
      ]
    }
  ],
  "events": [
    {
      "id": "opus-5-live",
      "date": "2026-07-24",
      "status": "released",
      "providerId": "anthropic",
      "label": "Claude Opus 5 released",
      "detail": "AA leader at 61; priced at $5 / $25 per million tokens.",
      "sourceId": "anthropic-opus-5"
    },
    {
      "id": "gemini-36-live",
      "date": "2026-07-21",
      "status": "released",
      "providerId": "google",
      "label": "Gemini 3.6 Flash released",
      "detail": "A Flash-tier model enters the front pack on speed and agent tasks.",
      "sourceId": "google-gemini"
    },
    {
      "id": "july-frontier-cluster",
      "date": "2026-07-16",
      "status": "released",
      "providerId": "xai",
      "label": "Grok 4.5 and Kimi K3 land together",
      "detail": "Two different release strategies converge on coding and agent work.",
      "sourceId": "xai-grok-45"
    },
    {
      "id": "deepseek-v4-flash-0731-live",
      "date": "2026-07-31",
      "status": "released",
      "providerId": "deepseek",
      "label": "DeepSeek-V4 Flash 0731 released",
      "detail": "Official results cover terminal, repository, cyber, tool-use and full-stack agent tasks; independent AA measurements add intelligence and speed.",
      "sourceId": "deepseek-v4-flash"
    },
    {
      "id": "qwen-38-watch",
      "date": "2026-08-01",
      "status": "watch",
      "providerId": "qwen",
      "label": "Qwen3.8 appears in Arena",
      "detail": "A preliminary leaderboard row is visible; official model confirmation is pending.",
      "sourceId": "benchmark-arena"
    },
    {
      "id": "sonnet-price-window",
      "date": "2026-08-31",
      "status": "deadline",
      "providerId": "anthropic",
      "label": "Claude Sonnet 5 launch pricing window",
      "detail": "Temporary launch pricing is scheduled to close; verify the API page before purchase decisions.",
      "sourceId": "anthropic-opus-5"
    },
    {
      "id": "qwen-retirement",
      "date": "2026-10-10",
      "status": "deadline",
      "providerId": "qwen",
      "label": "Legacy Qwen snapshot retirement window",
      "detail": "Pinned production deployments should check model aliases before this date.",
      "sourceId": "qwen-models"
    }
  ],
  "sources": [
    {
      "id": "openai-gpt-56",
      "providerId": "openai",
      "sourceType": "provider",
      "label": "OpenAI GPT-5.6",
      "url": "https://openai.com/index/gpt-5-6",
      "official": true,
      "watch": [
        "gpt-5.6",
        "gpt-5.6-sol",
        "swe-bench pro"
      ],
      "sha256": "",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": false,
      "foundSignals": [],
      "changed": false,
      "error": "HTTP 403 Forbidden"
    },
    {
      "id": "anthropic-opus-5",
      "providerId": "anthropic",
      "sourceType": "provider",
      "label": "Anthropic Claude Opus 5",
      "url": "https://www.anthropic.com/news/claude-opus-5",
      "official": true,
      "watch": [
        "claude opus 5",
        "claude-opus-5",
        "1m"
      ],
      "sha256": "84100a79e0403b649770d24f36808c445e53097fb0314bff7adfa9645b8c6e8f",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "claude opus 5",
        "claude-opus-5",
        "1m"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "anthropic-fable-5",
      "providerId": "anthropic",
      "sourceType": "provider",
      "label": "Anthropic Claude Fable 5",
      "url": "https://www.anthropic.com/news/claude-fable-5-mythos-5",
      "official": true,
      "watch": [
        "claude fable 5",
        "terminal-bench",
        "swe-bench"
      ],
      "sha256": "40dfe7c77bb4ae04fd98b346d75fc07fbe2e77bec7f6008ad722851ba6794a98",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "claude fable 5"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "google-gemini",
      "providerId": "google",
      "sourceType": "provider",
      "label": "Google Gemini models",
      "url": "https://deepmind.google/models/gemini/",
      "official": true,
      "watch": [
        "gemini 3.6 flash",
        "gemini 3.5 pro",
        "1m"
      ],
      "sha256": "144747ac5f5f8fa078ba048aec97ad50991e4367c483fca88b09cef217aebed0",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "gemini 3.6 flash",
        "1m"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "xai-grok-45",
      "providerId": "xai",
      "sourceType": "provider",
      "label": "xAI Grok 4.5",
      "url": "https://x.ai/news/grok-4-5",
      "official": true,
      "watch": [
        "grok 4.5",
        "terminal-bench",
        "swe-bench"
      ],
      "sha256": "09e4a29231748c18601cf4bdf663d00a1e180b92183d372fcb0a04cceaa86734",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "grok 4.5",
        "terminal-bench",
        "swe-bench"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "deepseek-v4",
      "providerId": "deepseek",
      "sourceType": "provider",
      "label": "DeepSeek V4 Pro Preview",
      "url": "https://api-docs.deepseek.com/updates/",
      "official": true,
      "watch": [
        "deepseek-v4-pro",
        "v4 pro",
        "preview"
      ],
      "sha256": "9f0e83b23b4e5aaf47b973a222821bb033d0541c8eae67d03a5ab73858d4713a",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "deepseek-v4-pro",
        "v4 pro",
        "preview"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "deepseek-v4-flash",
      "providerId": "deepseek",
      "sourceType": "provider",
      "label": "DeepSeek V4 Flash 0731",
      "url": "https://api-docs.deepseek.com/updates/",
      "official": true,
      "watch": [
        "deepseek-v4-flash",
        "terminal bench 2.1",
        "nl2repo",
        "82.7"
      ],
      "sha256": "9f0e83b23b4e5aaf47b973a222821bb033d0541c8eae67d03a5ab73858d4713a",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "deepseek-v4-flash",
        "terminal bench 2.1",
        "nl2repo",
        "82.7"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "moonshot-kimi-k3",
      "providerId": "moonshot",
      "sourceType": "provider",
      "label": "Moonshot Kimi K3",
      "url": "https://www.kimi.com/blog/kimi-k3",
      "official": true,
      "watch": [
        "kimi k3",
        "open source",
        "1m"
      ],
      "sha256": "416697fd8a3e1e121ae902a4f8f677ed7ad1b94092af59e3c4d0485af843bcaa",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "kimi k3",
        "open source",
        "1m"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "mistral-models",
      "providerId": "mistral",
      "sourceType": "provider",
      "label": "Mistral model overview",
      "url": "https://docs.mistral.ai/getting-started/models/models_overview/",
      "official": true,
      "watch": [
        "medium 3.5",
        "mistral large",
        "262k"
      ],
      "sha256": "d3a3dfa779128241c663236e133d979b79268cc543fe00751ba8bdc228784603",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "medium 3.5",
        "mistral large"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "qwen-models",
      "providerId": "qwen",
      "sourceType": "provider",
      "label": "Qwen official models",
      "url": "https://qwen.ai/home",
      "official": true,
      "watch": [
        "qwen3.7",
        "qwen3.8",
        "qwen max"
      ],
      "sha256": "a655c2f23c8f16dfba923500f57192e954b7b503f14ffc7a3f904e43e439b5d6",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "qwen3.8",
        "qwen max"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "meta-muse",
      "providerId": "meta",
      "sourceType": "provider",
      "label": "Meta Muse Spark 1.1",
      "url": "https://ai.meta.com/blog/introducing-muse-spark-meta-model-api/",
      "official": true,
      "watch": [
        "muse spark",
        "1.1",
        "model api"
      ],
      "sha256": "d48de95d99d8cb8470cac676666428000582fc03a2df954d20824809bff4ab55",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "muse spark",
        "1.1",
        "model api"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "cohere-command-a-plus",
      "providerId": "cohere",
      "sourceType": "provider",
      "label": "Cohere Command A+",
      "url": "https://docs.cohere.com/docs/command-a-plus",
      "official": true,
      "watch": [
        "command a+",
        "command-a-plus",
        "apache 2.0"
      ],
      "sha256": "b1156c3b9e2229046dc672aa2dc44de3b41aaab5de8bbe26e4dab85d11546c9b",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "command a+",
        "command-a-plus",
        "apache 2.0"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "amazon-nova",
      "providerId": "amazon",
      "sourceType": "provider",
      "label": "Amazon Nova",
      "url": "https://aws.amazon.com/ai/generative-ai/nova/",
      "official": true,
      "watch": [
        "nova 2 omni",
        "nova 2",
        "bedrock"
      ],
      "sha256": "83724e7dd48c434e601007d0fd84ad30f8e87f05941da807dd1e57da67d16303",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "nova 2",
        "bedrock"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "zhipu-glm-52",
      "providerId": "zhipu",
      "sourceType": "provider",
      "label": "Z.ai GLM-5.2",
      "url": "https://z.ai/blog/glm-5.2",
      "official": true,
      "watch": [
        "glm-5.2",
        "terminal-bench",
        "swe-bench"
      ],
      "sha256": "a9e8c2b6f34717d69e3a0aa26bb117256a4d8c95bd299910c2a693000ee88fe8",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "glm-5.2"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "benchmark-aa",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "Artificial Analysis",
      "url": "https://artificialanalysis.ai/models",
      "official": false,
      "watch": [
        "intelligence index",
        "claude opus 5",
        "gpt-5.6"
      ],
      "sha256": "1334cdad3b107fa1b7b99e5849a7135fbc6378a4bd2be90cb524ce56fed848e7",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "intelligence index",
        "claude opus 5",
        "gpt-5.6"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "benchmark-aa-coding",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "AA Coding Agent Index",
      "url": "https://artificialanalysis.ai/agents/coding-agents",
      "official": false,
      "watch": [
        "coding agent index",
        "deepswe",
        "terminal-bench",
        "swe-atlas"
      ],
      "sha256": "547755f92e98057e098c371ddd40772a2f4e800be20346c2160b5613c80b76ce",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "coding agent index",
        "deepswe",
        "terminal-bench",
        "swe-atlas"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "benchmark-aa-gdpval",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "GDPval-AA v2",
      "url": "https://artificialanalysis.ai/evaluations/gdpval-aa",
      "official": false,
      "watch": [
        "gdpval-aa v2",
        "agentic real-world work",
        "elo"
      ],
      "sha256": "02ee830646dbf2ac16744aceb693a995bced37ca82abb374d49733d647077338",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "gdpval-aa v2",
        "elo"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "benchmark-aa-briefcase",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "AA-Briefcase",
      "url": "https://artificialanalysis.ai/evaluations/aa-briefcase",
      "official": false,
      "watch": [
        "aa-briefcase",
        "agentic knowledge work",
        "elo"
      ],
      "sha256": "8d8fdce93786b14d070d7f99402f455731f98d27b94c561cb7fd357b5b787f69",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "aa-briefcase",
        "agentic knowledge work",
        "elo"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "benchmark-arena",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "Arena Text Leaderboard",
      "url": "https://arena.ai/leaderboard/text",
      "official": false,
      "watch": [
        "leaderboard",
        "claude-fable-5",
        "qwen3.8"
      ],
      "sha256": "65fe04e6592dbd3382fc263aebf45b766a4b83c60ea72266b6d7279449a2b6dd",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "leaderboard",
        "claude-fable-5",
        "qwen3.8"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "benchmark-swe",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "SWE-bench",
      "url": "https://www.swebench.com/",
      "official": false,
      "watch": [
        "swe-bench",
        "verified",
        "pro"
      ],
      "sha256": "4d572d2bea5c7235133db2b9d8768f47de81dd677bc12434703e3a47360ca63f",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "swe-bench",
        "verified",
        "pro"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "benchmark-terminal",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "Terminal-Bench 2.0 reference",
      "url": "https://www.tbench.ai/leaderboard/terminal-bench/2.0",
      "official": false,
      "watch": [
        "terminal-bench",
        "leaderboard",
        "agent"
      ],
      "sha256": "5616a37b244b889e481f8cb44cf862df1257b9000b77132219bb5609c2d9a1e5",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "terminal-bench",
        "leaderboard",
        "agent"
      ],
      "changed": true,
      "error": ""
    },
    {
      "id": "benchmark-arc",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "ARC Prize Leaderboard",
      "url": "https://arcprize.org/leaderboard",
      "official": false,
      "watch": [
        "arc-agi",
        "leaderboard",
        "verified"
      ],
      "sha256": "6721d2bc37b8b3913191b181ac180ecf40c87b75b0286543940fc07ab564923e",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "arc-agi",
        "leaderboard",
        "verified"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "benchmark-ale",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "Agents Last Exam",
      "url": "https://agents-last-exam.org/",
      "official": false,
      "watch": [
        "agents last exam",
        "leaderboard",
        "agent"
      ],
      "sha256": "be0723a17bd6eab4f8334f54b6a3c751306ee8a35b373172fa0385db8a837197",
      "lastCheckedAt": "2026-09-03T00:09:48.617Z",
      "ok": true,
      "foundSignals": [
        "agents last exam",
        "leaderboard",
        "agent"
      ],
      "changed": false,
      "error": ""
    }
  ],
  "notes": [
    "Every displayed benchmark value keeps its source and measurement date. Missing coverage stays visible as N/A with a current verification reason.",
    "Arena and Artificial Analysis are independent signals. SWE-Bench Pro and Terminal-Bench values can be vendor-reported and are labeled in the detail view.",
    "Release timing compares elapsed days with each provider's historical average interval. It carries no launch probability or promise.",
    "The daily job checks a fixed source list serially, records page changes, and keeps curated values intact for human review."
  ]
};
