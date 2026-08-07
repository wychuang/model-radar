export const modelRadarSnapshot = {
  "schemaVersion": 2,
  "generatedAt": "2026-08-07T01:33:20.317Z",
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
      "min": 25,
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
      "asOf": "2026-08-01",
      "description": "Crowd preference score from blind side-by-side votes. Preliminary rows are marked."
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
      "label": "Terminal-Bench 2.x",
      "shortLabel": "TERMINAL",
      "displayLabel": "终端 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 40,
      "max": 90,
      "sourceId": "benchmark-terminal",
      "asOf": "2026-08-06",
      "description": "Agent performance on practical terminal tasks. Harness and version can affect comparability."
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
      "sourceId": null,
      "derivedFrom": "outputPrice",
      "asOf": "2026-08-06",
      "description": "Public list price in USD per million output tokens. Lower is better; discounts and cache tiers are excluded."
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
    }
  ],
  "providers": [
    {
      "id": "openai",
      "name": "OpenAI",
      "region": "US",
      "accent": "#ff4f00",
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
      "accent": "#00a88f",
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
      "accent": "#ffd400",
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
      "accent": "#cfff26",
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
      "accent": "#2667ff",
      "latestModelId": "deepseek-v4-pro",
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
          "label": "DeepSeek-V4 Pro"
        }
      ]
    },
    {
      "id": "moonshot",
      "name": "Moonshot AI",
      "region": "CN",
      "accent": "#ff477e",
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
      "accent": "#f57c00",
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
      "accent": "#985eff",
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
      "accent": "#00a3ff",
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
      "accent": "#00a36c",
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
      "accent": "#6f7782",
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
      "accent": "#e53935",
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
        "gpt-5.6-sol"
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
          "value": 1483,
          "rank": 15,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
        },
        "swebench-pro": {
          "value": 64.6,
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
        "claude-opus-5"
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
          "value": 1490,
          "rank": 8,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
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
      "posture": "Anthropic's expensive ceiling model and the current Arena preference leader.",
      "watch": "Watch for capability transfer into the cheaper Opus and Sonnet lanes.",
      "benchmarks": {
        "aa-index": {
          "value": 60,
          "sourceId": "benchmark-aa",
          "asOf": "2026-08-06"
        },
        "arena-elo": {
          "value": 1509,
          "rank": 1,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
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
          "value": 1483,
          "rank": 16,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01",
          "preliminary": true
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
          "value": 1469,
          "rank": 35,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
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
      "stage": "frontier",
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
          "value": 1458,
          "rank": 49,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
        }
      },
      "sourceRefs": [
        "deepseek-v4"
      ]
    },
    {
      "id": "moonshot-kimi-k3",
      "providerId": "moonshot",
      "name": "Kimi K3",
      "modelIds": [
        "kimi-k3"
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
          "value": 1485,
          "rank": 13,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01",
          "preliminary": true
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
          "value": 1427,
          "rank": 94,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
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
          "rank": 23,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01",
          "preliminary": true
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
          "value": 1490,
          "rank": 9,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01",
          "preliminary": true
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
      "benchmarks": {},
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
        "glm-5.2"
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
          "value": 1469,
          "rank": 33,
          "sourceId": "benchmark-arena",
          "asOf": "2026-08-01"
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
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "4be8ecf1f3e269fa3ddbe9c8a2e2527e232210b0b57591202e65a89a1f4a1b18",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "03c0eaf36bc0aec4fbc5b8795915960e724d76db32979097c78969049c62b812",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "bbf2a9bc844f8140a3e3ad73ec8d29dd4b94016c1732582a6544659d1816b330",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
      "ok": false,
      "foundSignals": [],
      "changed": false,
      "error": "HTTP 403 Forbidden"
    },
    {
      "id": "deepseek-v4",
      "providerId": "deepseek",
      "sourceType": "provider",
      "label": "DeepSeek V4 Pro update",
      "url": "https://api-docs.deepseek.com/updates/",
      "official": true,
      "watch": [
        "deepseek-v4-pro",
        "v4 pro",
        "1m"
      ],
      "sha256": "899d498fccaa28ae24dcb6146ad1a01c2ed03c5e8abed22d7c1d9b93e93c7796",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
      "ok": true,
      "foundSignals": [
        "deepseek-v4-pro",
        "v4 pro"
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
      "sha256": "bb47fae040fd36e866162f42a316f45a829ab6c32af8a5337bed997dae45f441",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "6cf86e76f11f013e5e7c0ca4a12e010296ed13013c4d5e9ab12387055e079171",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
      "ok": true,
      "foundSignals": [
        "medium 3.5",
        "mistral large"
      ],
      "changed": false,
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
      "sha256": "933633b7ee8e715f6a35edc166d2c836525aa1747dee3fcf545572d0b91fc265",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "7898aef08c96b275f42e17a5d0a1ccddd1f3f54a058c7671438a5aa9cf083874",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "b0df881e4fb0c1c18b35c0e70db2bf888db37a50c630c5409a71b66b7cb7b5aa",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "c228dff2eb3b09664eee843c39cc985e94b7a8f27302df6f6cfc8c7a73c5a4c5",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "d0299326d21fd363483eabe4f4a719efc842022bc843f6e7c2d4ee77d4d8a5c0",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "b85301e452a182bb8ffeba5037b9c035811100fb30e81aa84e94d3b474759e41",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "014dcc01a1a4d3905e2a6541a09b4a519123c6b86441a10ca3e3c6b1cdc939a6",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "32df14822f5e5cb76bc25c3d83a27ec0fb75f8f57828cec5f73821d75931b783",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "label": "Terminal-Bench",
      "url": "https://www.tbench.ai/leaderboard/terminal-bench/2.0",
      "official": false,
      "watch": [
        "terminal-bench",
        "leaderboard",
        "agent"
      ],
      "sha256": "ad6ded3e63cdd840918091a424d51a44f68bc6bcaf2915247ab8aa8c49ff4a95",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
      "sha256": "032a162f2850b6cd3924c304e56e32e38a7b6b27c3af9b437992b9373e326f6a",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
      "ok": true,
      "foundSignals": [
        "arc-agi",
        "leaderboard",
        "verified"
      ],
      "changed": true,
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
      "sha256": "b67ffe51f4b0dddc477409102636be9d511569faa5ca1cd616267aeffa53e7c0",
      "lastCheckedAt": "2026-08-07T01:33:20.317Z",
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
    "Every displayed benchmark value keeps its source and measurement date. Missing coverage stays visible as N/A.",
    "Arena and Artificial Analysis are independent signals. SWE-Bench Pro and Terminal-Bench values can be vendor-reported and are labeled in the detail view.",
    "Release clocks infer watch pressure from public release dates. They do not promise future launches.",
    "The daily job checks a fixed source list serially, records page changes, and keeps curated values intact for human review."
  ]
};
