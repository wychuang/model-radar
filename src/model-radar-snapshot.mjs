export const modelRadarSnapshot = {
  "schemaVersion": 1,
  "generatedAt": "2026-07-17T23:03:59.540Z",
  "refresh": {
    "cadence": "daily",
    "nextRunHint": "daily low-frequency official-source refresh; failures keep the curated rows intact",
    "workflow": ".github/workflows/model-radar.yml"
  },
  "dimensions": [
    {
      "id": "reasoning",
      "label": "Reasoning",
      "shortLabel": "reason"
    },
    {
      "id": "coding",
      "label": "Coding",
      "shortLabel": "code"
    },
    {
      "id": "agent",
      "label": "Agentic work",
      "shortLabel": "agent"
    },
    {
      "id": "vision",
      "label": "Multimodal",
      "shortLabel": "vision"
    },
    {
      "id": "context",
      "label": "Context window",
      "shortLabel": "ctx"
    },
    {
      "id": "cost",
      "label": "Cost pressure",
      "shortLabel": "cost"
    }
  ],
  "providers": [
    {
      "id": "openai",
      "name": "OpenAI",
      "region": "US",
      "accent": "#ff5a1f",
      "latestModelId": "openai-gpt-5-5",
      "cycleLabel": "numbered frontier train",
      "sourceIds": [
        "openai-models"
      ],
      "releaseHistory": [
        {
          "date": "2025-04-14",
          "label": "GPT-4.1"
        },
        {
          "date": "2025-08-07",
          "label": "GPT-5"
        },
        {
          "date": "2025-11-12",
          "label": "GPT-5.1"
        },
        {
          "date": "2025-12-11",
          "label": "GPT-5.2"
        },
        {
          "date": "2026-04-23",
          "label": "GPT-5.5"
        }
      ]
    },
    {
      "id": "anthropic",
      "name": "Anthropic",
      "region": "US",
      "accent": "#00bfb2",
      "latestModelId": "anthropic-claude-opus-4-7",
      "cycleLabel": "Opus/Sonnet alternating workhorses",
      "sourceIds": [
        "anthropic-models"
      ],
      "releaseHistory": [
        {
          "date": "2025-05-22",
          "label": "Claude 4"
        },
        {
          "date": "2025-09-29",
          "label": "Claude Sonnet 4.5"
        },
        {
          "date": "2025-11-24",
          "label": "Claude Opus 4.5"
        },
        {
          "date": "2026-02-17",
          "label": "Claude Sonnet 4.6"
        },
        {
          "date": "2026-04-16",
          "label": "Claude Opus 4.7"
        }
      ]
    },
    {
      "id": "google",
      "name": "Google DeepMind",
      "region": "US",
      "accent": "#f9ca24",
      "latestModelId": "google-gemini-3-1-pro-preview",
      "cycleLabel": "Gemini preview to stable cadence",
      "sourceIds": [
        "google-gemini-models"
      ],
      "releaseHistory": [
        {
          "date": "2025-03-25",
          "label": "Gemini 2.5 Pro"
        },
        {
          "date": "2025-06-17",
          "label": "Gemini 2.5 stable"
        },
        {
          "date": "2025-11-18",
          "label": "Gemini 3 Pro"
        },
        {
          "date": "2026-02-19",
          "label": "Gemini 3.1 Pro Preview"
        }
      ]
    },
    {
      "id": "xai",
      "name": "xAI",
      "region": "US",
      "accent": "#cfff26",
      "latestModelId": "xai-grok-4-3",
      "cycleLabel": "rapid Grok reasoning releases",
      "sourceIds": [
        "xai-models"
      ],
      "releaseHistory": [
        {
          "date": "2025-02-17",
          "label": "Grok 3"
        },
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
        }
      ]
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "region": "CN",
      "accent": "#3157ff",
      "latestModelId": "deepseek-v4-pro",
      "cycleLabel": "price pressure plus long reasoning",
      "sourceIds": [
        "deepseek-pricing"
      ],
      "releaseHistory": [
        {
          "date": "2025-01-20",
          "label": "DeepSeek-R1"
        },
        {
          "date": "2025-05-28",
          "label": "DeepSeek-R1-0528"
        },
        {
          "date": "2025-12-01",
          "label": "DeepSeek-V3.2"
        },
        {
          "date": "2026-04-24",
          "label": "DeepSeek-V4-Pro"
        }
      ]
    },
    {
      "id": "moonshot",
      "name": "Moonshot AI",
      "region": "CN",
      "accent": "#f05c9a",
      "latestModelId": "moonshot-kimi-k2-6",
      "cycleLabel": "Kimi coding and agent upgrades",
      "sourceIds": [
        "moonshot-docs"
      ],
      "releaseHistory": [
        {
          "date": "2025-07-11",
          "label": "Kimi K2"
        },
        {
          "date": "2025-09-05",
          "label": "Kimi K2 0905"
        },
        {
          "date": "2025-11-06",
          "label": "Kimi K2 Thinking"
        },
        {
          "date": "2026-05-18",
          "label": "Kimi K2.6 observed"
        }
      ]
    },
    {
      "id": "mistral",
      "name": "Mistral AI",
      "region": "EU",
      "accent": "#ff8a00",
      "latestModelId": "mistral-large-3",
      "cycleLabel": "open and enterprise model lattice",
      "sourceIds": [
        "mistral-models"
      ],
      "releaseHistory": [
        {
          "date": "2025-05-07",
          "label": "Medium 3"
        },
        {
          "date": "2025-08-01",
          "label": "Le Chat enterprise"
        },
        {
          "date": "2025-12-01",
          "label": "Mistral Large 3"
        },
        {
          "date": "2026-03-18",
          "label": "Medium 3.5"
        }
      ]
    },
    {
      "id": "qwen",
      "name": "Alibaba Qwen",
      "region": "CN",
      "accent": "#8d66ff",
      "latestModelId": "qwen3-thinking-2507",
      "cycleLabel": "open-weight dense/MoE stream",
      "sourceIds": [
        "qwen-blog"
      ],
      "releaseHistory": [
        {
          "date": "2025-04-29",
          "label": "Qwen3"
        },
        {
          "date": "2025-07-21",
          "label": "Qwen3-2507"
        },
        {
          "date": "2025-09-10",
          "label": "Qwen3 Coder"
        },
        {
          "date": "2026-01-15",
          "label": "Qwen3 long-context updates"
        }
      ]
    },
    {
      "id": "meta",
      "name": "Meta",
      "region": "US",
      "accent": "#00a3ff",
      "latestModelId": "meta-llama-4-scout-maverick",
      "cycleLabel": "open-weight multimodal waves",
      "sourceIds": [
        "meta-llama"
      ],
      "releaseHistory": [
        {
          "date": "2024-07-23",
          "label": "Llama 3.1"
        },
        {
          "date": "2024-12-06",
          "label": "Llama 3.3"
        },
        {
          "date": "2025-04-05",
          "label": "Llama 4 Scout/Maverick"
        }
      ]
    },
    {
      "id": "cohere",
      "name": "Cohere",
      "region": "CA",
      "accent": "#08a045",
      "latestModelId": "cohere-command-a-reasoning-08-2025",
      "cycleLabel": "enterprise RAG and command models",
      "sourceIds": [
        "cohere-models"
      ],
      "releaseHistory": [
        {
          "date": "2025-03-13",
          "label": "Command A"
        },
        {
          "date": "2025-08-19",
          "label": "Command A Reasoning"
        }
      ]
    },
    {
      "id": "amazon",
      "name": "Amazon",
      "region": "US",
      "accent": "#111111",
      "latestModelId": "amazon-nova-2-omni",
      "cycleLabel": "Bedrock lifecycle train",
      "sourceIds": [
        "amazon-nova"
      ],
      "sunsetAt": "2026-09-14",
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
      "name": "Zhipu GLM",
      "region": "CN",
      "accent": "#e0332f",
      "latestModelId": "zhipu-glm-4-6",
      "cycleLabel": "Chinese agent/coding release stream",
      "sourceIds": [
        "zhipu-docs"
      ],
      "releaseHistory": [
        {
          "date": "2025-01-20",
          "label": "GLM-4-Plus"
        },
        {
          "date": "2025-06-30",
          "label": "GLM-4.5"
        },
        {
          "date": "2025-09-30",
          "label": "GLM-4.6"
        }
      ]
    }
  ],
  "models": [
    {
      "id": "openai-gpt-5-5",
      "providerId": "openai",
      "name": "GPT-5.5",
      "modelIds": [
        "gpt-5.5",
        "gpt-5.5-2026-04-23"
      ],
      "releasedAt": "2026-04-23",
      "dateConfidence": "official-doc",
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
      "scores": {
        "reasoning": 100,
        "coding": 99,
        "agent": 99,
        "vision": 94,
        "context": 98,
        "cost": 60
      },
      "posture": "new top-end general intelligence lane",
      "shift": "Raises the ceiling; best when the task has hidden dependencies and long horizon planning.",
      "nearFuture": "Watch whether smaller GPT-5.5 derivatives inherit the planning gains.",
      "badges": [
        "frontier",
        "long context",
        "agentic"
      ],
      "sourceRefs": [
        "openai-models"
      ]
    },
    {
      "id": "anthropic-claude-opus-4-7",
      "providerId": "anthropic",
      "name": "Claude Opus 4.7",
      "modelIds": [
        "claude-opus-4-7-20260416"
      ],
      "releasedAt": "2026-04-16",
      "dateConfidence": "official-doc",
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
      "scores": {
        "reasoning": 98,
        "coding": 99,
        "agent": 99,
        "vision": 95,
        "context": 96,
        "cost": 62
      },
      "posture": "agent and code reliability lane",
      "shift": "The signal is agent endurance: fewer dropped threads over long tool chains.",
      "nearFuture": "Sonnet usually follows Opus pressure; watch the next cheaper workhorse.",
      "badges": [
        "frontier",
        "coding",
        "agentic"
      ],
      "sourceRefs": [
        "anthropic-models"
      ]
    },
    {
      "id": "google-gemini-3-1-pro-preview",
      "providerId": "google",
      "name": "Gemini 3.1 Pro Preview",
      "modelIds": [
        "gemini-3.1-pro-preview"
      ],
      "releasedAt": "2026-02-19",
      "dateConfidence": "official-doc",
      "stage": "preview",
      "access": [
        "api",
        "ai-studio",
        "vertex"
      ],
      "contextTokens": 1000000,
      "outputTokens": 65536,
      "priceUsd": {
        "inputPerMTok": 2,
        "outputPerMTok": 12
      },
      "scores": {
        "reasoning": 98,
        "coding": 96,
        "agent": 95,
        "vision": 97,
        "context": 96,
        "cost": 72
      },
      "posture": "multimodal and search-connected frontier lane",
      "shift": "Strong world model plus native multimodal surface; useful when text, images, and web context mix.",
      "nearFuture": "The preview clock points toward a stable Gemini 3.1 family refresh.",
      "badges": [
        "preview",
        "multimodal",
        "long context"
      ],
      "sourceRefs": [
        "google-gemini-models"
      ]
    },
    {
      "id": "xai-grok-4-3",
      "providerId": "xai",
      "name": "Grok 4.3",
      "modelIds": [
        "grok-4-3",
        "grok-4-3-fast"
      ],
      "releasedAt": "2026-05-09",
      "dateConfidence": "official-doc",
      "stage": "frontier",
      "access": [
        "api",
        "x"
      ],
      "contextTokens": 1000000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 1.25,
        "outputPerMTok": 2.5
      },
      "scores": {
        "reasoning": 95,
        "coding": 93,
        "agent": 96,
        "vision": 89,
        "context": 95,
        "cost": 86
      },
      "posture": "fast reasoning and live-information lane",
      "shift": "The pressure point is speed per unit of reasoning rather than pure benchmark peak.",
      "nearFuture": "If the fast tier holds quality, the market has to price latency differently.",
      "badges": [
        "recent",
        "fast",
        "long context"
      ],
      "sourceRefs": [
        "xai-models"
      ]
    },
    {
      "id": "deepseek-v4-pro",
      "providerId": "deepseek",
      "name": "DeepSeek-V4-Pro",
      "modelIds": [
        "deepseek-v4-pro",
        "deepseek-v4"
      ],
      "releasedAt": "2026-04-24",
      "dateConfidence": "official-doc",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": 384000,
      "priceUsd": {
        "inputPerMTok": 0.44,
        "outputPerMTok": 0.87
      },
      "scores": {
        "reasoning": 94,
        "coding": 95,
        "agent": 95,
        "vision": 30,
        "context": 97,
        "cost": 98
      },
      "posture": "price-performance shock lane",
      "shift": "Long context and low output price make large-batch reasoning economically different.",
      "nearFuture": "Watch whether western providers answer with price cuts or smaller routed models.",
      "badges": [
        "cost shock",
        "long output",
        "api"
      ],
      "sourceRefs": [
        "deepseek-pricing"
      ]
    },
    {
      "id": "moonshot-kimi-k2-6",
      "providerId": "moonshot",
      "name": "Kimi K2.6",
      "modelIds": [
        "kimi-k2.6",
        "kimi-k2-6"
      ],
      "releasedAt": "2026-05-18",
      "dateConfidence": "official-doc",
      "stage": "frontier",
      "access": [
        "api",
        "web"
      ],
      "contextTokens": 1000000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 0.6,
        "outputPerMTok": 2.5
      },
      "scores": {
        "reasoning": 93,
        "coding": 96,
        "agent": 94,
        "vision": 82,
        "context": 96,
        "cost": 88
      },
      "posture": "coding and long-context Chinese frontier lane",
      "shift": "Kimi is competing on usable coding depth, not only chat quality.",
      "nearFuture": "Watch K2.6 stability and whether the agent surface becomes a default product.",
      "badges": [
        "recent",
        "coding",
        "cn frontier"
      ],
      "sourceRefs": [
        "moonshot-docs"
      ]
    },
    {
      "id": "mistral-large-3",
      "providerId": "mistral",
      "name": "Mistral Large 3",
      "modelIds": [
        "mistral-large-2512",
        "mistral-large-3"
      ],
      "releasedAt": "2025-12-01",
      "dateConfidence": "official-doc",
      "stage": "frontier",
      "access": [
        "api",
        "enterprise"
      ],
      "contextTokens": 256000,
      "outputTokens": 128000,
      "priceUsd": null,
      "scores": {
        "reasoning": 91,
        "coding": 92,
        "agent": 90,
        "vision": 86,
        "context": 82,
        "cost": 70
      },
      "posture": "European open-enterprise alternative lane",
      "shift": "Mistral keeps a credible non-US frontier option in the enterprise stack.",
      "nearFuture": "Watch the next open-weight release because it can reset deployment choices.",
      "badges": [
        "eu",
        "enterprise",
        "multimodal"
      ],
      "sourceRefs": [
        "mistral-models"
      ]
    },
    {
      "id": "qwen3-thinking-2507",
      "providerId": "qwen",
      "name": "Qwen3 Thinking 2507",
      "modelIds": [
        "qwen3-thinking-2507",
        "qwen3-235b-a22b-thinking-2507"
      ],
      "releasedAt": "2025-07-21",
      "dateConfidence": "official-blog",
      "stage": "open-weight",
      "access": [
        "open-weight",
        "api"
      ],
      "contextTokens": 262000,
      "outputTokens": 65536,
      "priceUsd": null,
      "scores": {
        "reasoning": 92,
        "coding": 93,
        "agent": 87,
        "vision": 62,
        "context": 83,
        "cost": 92
      },
      "posture": "open-weight reasoning and localization lane",
      "shift": "Qwen keeps open deployment pressure high, especially for Chinese and code-heavy workloads.",
      "nearFuture": "A new Qwen open-weight wave would immediately reshape local inference decisions.",
      "badges": [
        "open weight",
        "reasoning",
        "cn"
      ],
      "sourceRefs": [
        "qwen-blog"
      ]
    },
    {
      "id": "meta-llama-4-scout-maverick",
      "providerId": "meta",
      "name": "Llama 4 Scout/Maverick",
      "modelIds": [
        "llama-4-scout",
        "llama-4-maverick"
      ],
      "releasedAt": "2025-04-05",
      "dateConfidence": "official-blog",
      "stage": "open-weight",
      "access": [
        "open-weight"
      ],
      "contextTokens": 10000000,
      "outputTokens": 8192,
      "priceUsd": null,
      "scores": {
        "reasoning": 86,
        "coding": 84,
        "agent": 78,
        "vision": 90,
        "context": 100,
        "cost": 95
      },
      "posture": "open multimodal and extreme-context lane",
      "shift": "The memorable fact is Scout's extreme context window and broad open-weight availability.",
      "nearFuture": "The clock is old; the next Llama wave is a major open-model watch point.",
      "badges": [
        "open weight",
        "10M context",
        "multimodal"
      ],
      "sourceRefs": [
        "meta-llama"
      ]
    },
    {
      "id": "cohere-command-a-reasoning-08-2025",
      "providerId": "cohere",
      "name": "Command A Reasoning",
      "modelIds": [
        "command-a-reasoning-08-2025"
      ],
      "releasedAt": "2025-08-19",
      "dateConfidence": "official-doc",
      "stage": "enterprise",
      "access": [
        "api",
        "enterprise"
      ],
      "contextTokens": 256000,
      "outputTokens": 32000,
      "priceUsd": {
        "inputPerMTok": 2.5,
        "outputPerMTok": 10
      },
      "scores": {
        "reasoning": 88,
        "coding": 84,
        "agent": 82,
        "vision": 35,
        "context": 82,
        "cost": 74
      },
      "posture": "enterprise RAG and controlled generation lane",
      "shift": "Cohere matters where deployment control, retrieval, and enterprise surface area beat raw hype.",
      "nearFuture": "Watch for a Command A successor that narrows the reasoning gap.",
      "badges": [
        "enterprise",
        "rag",
        "reasoning"
      ],
      "sourceRefs": [
        "cohere-models"
      ]
    },
    {
      "id": "amazon-nova-2-omni",
      "providerId": "amazon",
      "name": "Amazon Nova 2 Omni",
      "modelIds": [
        "amazon.nova-2-omni-v1:0",
        "nova-2-omni"
      ],
      "releasedAt": "2025-12-02",
      "dateConfidence": "official-doc",
      "stage": "platform",
      "access": [
        "bedrock"
      ],
      "contextTokens": 1000000,
      "outputTokens": 32000,
      "priceUsd": null,
      "scores": {
        "reasoning": 86,
        "coding": 80,
        "agent": 82,
        "vision": 94,
        "context": 96,
        "cost": 68
      },
      "posture": "cloud platform integration lane",
      "shift": "The signal is lifecycle and platform reach: Bedrock can move enterprises even when benchmarks lag.",
      "nearFuture": "Bedrock users should watch Nova Premier retirement and the Nova 2 migration path.",
      "badges": [
        "bedrock",
        "multimodal",
        "lifecycle watch"
      ],
      "sourceRefs": [
        "amazon-nova"
      ]
    },
    {
      "id": "zhipu-glm-4-6",
      "providerId": "zhipu",
      "name": "GLM-4.6",
      "modelIds": [
        "glm-4.6",
        "glm-4-6"
      ],
      "releasedAt": "2025-09-30",
      "dateConfidence": "official-doc",
      "stage": "frontier",
      "access": [
        "api",
        "chat"
      ],
      "contextTokens": 200000,
      "outputTokens": 32768,
      "priceUsd": null,
      "scores": {
        "reasoning": 90,
        "coding": 92,
        "agent": 89,
        "vision": 78,
        "context": 78,
        "cost": 82
      },
      "posture": "Chinese agent/coding workhorse lane",
      "shift": "GLM keeps pressure on Chinese-language agent workflows and practical coding.",
      "nearFuture": "Watch whether GLM moves from workhorse to clear frontier challenger.",
      "badges": [
        "cn",
        "coding",
        "agent"
      ],
      "sourceRefs": [
        "zhipu-docs"
      ]
    }
  ],
  "sources": [
    {
      "id": "openai-models",
      "providerId": "openai",
      "label": "OpenAI model docs",
      "url": "https://platform.openai.com/docs/models/gpt-5.5",
      "official": true,
      "watch": [
        "gpt-5.5",
        "gpt-5.4",
        "gpt-5.5-2026-04-23"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "96bf11716e656d8bc389158c9d5546e3e990770db5c47b0dae1bc59f9faa064c",
      "foundSignals": [
        "gpt-5.5",
        "gpt-5.4",
        "gpt-5.5-2026-04-23"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "anthropic-models",
      "providerId": "anthropic",
      "label": "Anthropic model docs",
      "url": "https://docs.anthropic.com/en/docs/about-claude/models/overview",
      "official": true,
      "watch": [
        "claude-opus-4-7",
        "claude-sonnet-4-6",
        "claude-opus-4-7-20260416"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "c6c15b12f3b4975f9d1b3a66df16b33cb19a6ec4945f875fbff7176334a213ff",
      "foundSignals": [
        "claude-opus-4-7",
        "claude-sonnet-4-6"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "google-gemini-models",
      "providerId": "google",
      "label": "Gemini API model docs",
      "url": "https://ai.google.dev/gemini-api/docs/models",
      "official": true,
      "watch": [
        "gemini-3.1-pro",
        "gemini-3.1-pro-preview",
        "gemini-3-pro"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "2b9299bab68b3cb9d8c3f7f70b421da01c332ea4d4992a57feedce6dc64da329",
      "foundSignals": [
        "gemini-3.1-pro",
        "gemini-3.1-pro-preview",
        "gemini-3-pro"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "xai-models",
      "providerId": "xai",
      "label": "xAI model docs",
      "url": "https://docs.x.ai/docs/models",
      "official": true,
      "watch": [
        "grok-4-3",
        "grok-4-3-fast",
        "grok-4"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "c6b27a05d4191259ccdd88c9478d7eeaef60d6bbb665600da2409922ea05cf91",
      "foundSignals": [
        "grok-4"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "deepseek-pricing",
      "providerId": "deepseek",
      "label": "DeepSeek API docs",
      "url": "https://api-docs.deepseek.com/quick_start/pricing",
      "official": true,
      "watch": [
        "deepseek-v4-pro",
        "deepseek-v4",
        "deepseek-v3.2"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "5ed7309f6b8bf5dbae559a012341aa604d02b0cce2e20c48aaa6f0a0bf287f89",
      "foundSignals": [
        "deepseek-v4-pro",
        "deepseek-v4"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "moonshot-docs",
      "providerId": "moonshot",
      "label": "Moonshot platform docs",
      "url": "https://platform.moonshot.ai/docs/intro",
      "official": true,
      "watch": [
        "kimi-k2.6",
        "kimi-k2-6",
        "kimi-k2-thinking"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "32a8c2f707b0e4936fbf0bb372f3272ac4452f70aa37caff9a71f9de630eb833",
      "foundSignals": [
        "kimi-k2.6",
        "kimi-k2-6",
        "kimi-k2-thinking"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "mistral-models",
      "providerId": "mistral",
      "label": "Mistral model overview",
      "url": "https://docs.mistral.ai/getting-started/models/models_overview/",
      "official": true,
      "watch": [
        "mistral-large-3",
        "mistral-large-2512",
        "medium-3.5"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "a00c7d082b3798773aadf28f7bf1ed8d2dc66a6a2c1efe71962538617a6a87c3",
      "foundSignals": [
        "mistral-large-3",
        "medium-3.5"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "qwen-blog",
      "providerId": "qwen",
      "label": "Qwen official blog",
      "url": "https://qwenlm.github.io/blog/qwen3-2507/",
      "official": true,
      "watch": [
        "qwen3-2507",
        "qwen3-thinking-2507",
        "qwen3-235b-a22b"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": false,
      "sha256": "",
      "foundSignals": [],
      "changed": false,
      "error": "HTTP 404 Not Found"
    },
    {
      "id": "meta-llama",
      "providerId": "meta",
      "label": "Meta Llama 4 announcement",
      "url": "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
      "official": true,
      "watch": [
        "llama-4-scout",
        "llama-4-maverick",
        "llama-4"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "c6dfab5bb5d15e9cc6e5b3e735a719149c948bb7936ef9f51803cc0e0a51d69a",
      "foundSignals": [
        "llama-4-scout",
        "llama-4-maverick",
        "llama-4"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "cohere-models",
      "providerId": "cohere",
      "label": "Cohere model docs",
      "url": "https://docs.cohere.com/docs/models",
      "official": true,
      "watch": [
        "command-a-reasoning-08-2025",
        "command-a",
        "command-r"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "a39f61c2b17a895589bd970ff19b17dc494e844cb8ff6c4e8551829400164d27",
      "foundSignals": [
        "command-a-reasoning-08-2025",
        "command-a",
        "command-r"
      ],
      "changed": false,
      "error": ""
    },
    {
      "id": "amazon-nova",
      "providerId": "amazon",
      "label": "Amazon Nova",
      "url": "https://aws.amazon.com/ai/generative-ai/nova/",
      "official": true,
      "watch": [
        "nova-2-omni",
        "nova-premier",
        "amazon.nova-2-omni-v1:0"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "7d46938a193747365d7091be72431aece0f451c7d4b79dc2cc44f7266b22ce35",
      "foundSignals": [],
      "changed": false,
      "error": ""
    },
    {
      "id": "zhipu-docs",
      "providerId": "zhipu",
      "label": "Zhipu GLM docs",
      "url": "https://docs.bigmodel.cn/cn/guide/models",
      "official": true,
      "watch": [
        "glm-4.6",
        "glm-4-6",
        "glm-4.5"
      ],
      "lastCheckedAt": "2026-07-17T23:03:59.540Z",
      "ok": true,
      "sha256": "02687984882c1f15629a9d750ee5aa6941fe7650f678ac6347d6a0b879200f3f",
      "foundSignals": [
        "glm-4.6",
        "glm-4.5"
      ],
      "changed": false,
      "error": ""
    }
  ],
  "notes": [
    "Scores are a normalized scan layer made from official benchmark claims, model cards, context windows, pricing, and product posture. They are for situational awareness, not a lab benchmark.",
    "Release clocks are inferred from public release dots. They show watch pressure, not promised launch dates.",
    "The daily job checks official pages for source changes and model-name signals, then regenerates this static snapshot."
  ]
};
