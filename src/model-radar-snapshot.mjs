export const modelRadarSnapshot = {
  "schemaVersion": 2,
  "generatedAt": "2026-09-12T00:13:42.167Z",
  "refresh": {
    "cadence": "daily",
    "nextRunHint": "daily low-frequency source refresh; failures keep curated benchmark rows intact",
    "workflow": ".github/workflows/model-radar.yml"
  },
  "benchmarks": [
    {
      "id": "aa-index",
      "label": "Artificial Analysis Intelligence Index v4.3",
      "shortLabel": "AA v4.3",
      "displayLabel": "AA 智力",
      "direction": "higher",
      "format": "index",
      "min": 0,
      "max": 60,
      "sourceId": "benchmark-aa",
      "asOf": "2026-09-10",
      "description": "AA 智力指数 v4.3；2026-09-10 读取榜单。10 项评测组成，各型号保留所测推理档位；不与旧版指数直接比较。读取日不代表所有测试在当天运行。",
      "version": "4.3",
      "dateBasis": "observed"
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
      "asOf": "2026-09-02",
      "description": "Arena 文字偏好榜；榜单标注更新于 2026-09-02。保留原始型号、推理档位及初步结果标记。"
    },
    {
      "id": "output-speed",
      "label": "Artificial Analysis output speed",
      "shortLabel": "OUTPUT T/S",
      "displayLabel": "生成速度",
      "direction": "higher",
      "format": "speed",
      "min": 0,
      "max": 400,
      "sourceId": "benchmark-aa",
      "asOf": "2026-09-10",
      "description": "2026-09-10 读取 AA 输出速度；长提示词口径。速度表示开始输出后的 tokens/s，不包含思考等待时间。",
      "dateBasis": "observed"
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
      "label": "Terminal-Bench 4.0 / AA harness",
      "shortLabel": "TERMINAL",
      "displayLabel": "终端 Agent",
      "direction": "higher",
      "format": "percent",
      "min": 0,
      "max": 70,
      "sourceId": "benchmark-aa",
      "asOf": "2026-09-10",
      "description": "AA 公布的 Terminal-Bench 4.0，同一通用评测框架。与厂商框架及 2.1 版成绩分开，2026-09-10 读取。",
      "version": "4.0",
      "dateBasis": "observed"
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
      "asOf": "2026-09-10",
      "description": "美元 / 百万输出 tokens；按各模型的价格来源与核实日期。默认标准 API，DeepSeek 采用高峰价，限时价单独注明；输入、缓存、工具调用及实际任务用量另计。"
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
      "asOf": "2026-09-10",
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
      "max": 70,
      "sourceId": "benchmark-aa-coding",
      "asOf": "2026-09-09",
      "radar": false,
      "description": "AA 2026-09-09 对比：模型搭配各自编程工具的 Coding Agent Index。保留工具名，不能当作裸模型成绩。",
      "version": "2026-09-09"
    },
    {
      "id": "gdpval-aa-v2",
      "label": "GDPval-AA v2",
      "shortLabel": "GDPVAL-AA",
      "displayLabel": "专业工作",
      "direction": "higher",
      "format": "elo",
      "min": 800,
      "max": 1900,
      "sourceId": "benchmark-aa-gdpval",
      "asOf": "2026-09-10",
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
      "min": 400,
      "max": 1800,
      "sourceId": "benchmark-aa-briefcase",
      "asOf": "2026-09-10",
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
      "latestModelId": "openai-gpt-6-astra",
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
        },
        {
          "date": "2026-09-03",
          "label": "GPT-6 Astra"
        }
      ]
    },
    {
      "id": "anthropic",
      "name": "Anthropic",
      "region": "US",
      "accent": "#d97757",
      "accentText": "#11120f",
      "latestModelId": "anthropic-claude-fable-5-1",
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
        },
        {
          "date": "2026-09-01",
          "label": "Claude Fable 5.1"
        }
      ]
    },
    {
      "id": "google",
      "name": "Google DeepMind",
      "region": "US",
      "accent": "#4285f4",
      "accentText": "#ece7d6",
      "latestModelId": "google-gemini-3-8-flash",
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
        },
        {
          "date": "2026-09-02",
          "label": "Gemini 3.8 Flash"
        }
      ]
    },
    {
      "id": "xai",
      "name": "xAI",
      "region": "US",
      "accent": "#c7c9c2",
      "accentText": "#11120f",
      "latestModelId": "xai-grok-4-6",
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
        },
        {
          "date": "2026-08-12",
          "label": "Grok 4.6"
        }
      ]
    },
    {
      "id": "deepseek",
      "name": "DeepSeek",
      "region": "CN",
      "accent": "#4d6bfe",
      "accentText": "#ece7d6",
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
          "label": "DeepSeek-V4 Pro Preview"
        },
        {
          "date": "2026-07-31",
          "label": "DeepSeek-V4 Flash 0731"
        },
        {
          "date": "2026-08-13",
          "label": "DeepSeek-V4 Pro 0813"
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
          "date": "2026-04-28",
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
      "latestModelId": "qwen-3-8-max-0902",
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
        },
        {
          "date": "2026-09-02",
          "label": "Qwen3.8 Max 0902"
        }
      ]
    },
    {
      "id": "meta",
      "name": "Meta",
      "region": "US",
      "accent": "#168cf0",
      "accentText": "#11120f",
      "latestModelId": "meta-muse-spark-1-3",
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
          "date": "2026-04-08",
          "label": "Muse Spark"
        },
        {
          "date": "2026-07-09",
          "label": "Muse Spark 1.1"
        },
        {
          "date": "2026-09-02",
          "label": "Muse Spark 1.3"
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
      "latestModelId": "zhipu-glm-5-3-flash",
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
        },
        {
          "date": "2026-08-18",
          "label": "GLM-5.3"
        },
        {
          "date": "2026-08-26",
          "label": "GLM-5.3 Flash"
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
        "inputPerMTok": 4,
        "outputPerMTok": 20,
        "sourceId": "openai-pricing",
        "asOf": "2026-09-10",
        "note": "标准 API 价；输入超过 272K 时，整次请求输出单价乘 1.5，输入单价乘 2。 当前优惠至少持续至 2026-11-21，届时复核。"
      },
      "posture": "GPT-5.6 的高能力档位，API 已调整为 $4 输入 / $20 输出。",
      "watch": "优惠至少持续至 2026-11-21；与 Astra 比较实际任务完成成本。",
      "benchmarks": {
        "swebench-pro": {
          "value": 64.6,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported"
        },
        "agent-last-exam": {
          "value": 52.7,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported"
        },
        "terminalbench-vendor": {
          "value": 88.8,
          "sourceId": "openai-gpt-56",
          "asOf": "2026-07-09",
          "provenance": "vendor-reported",
          "variant": "Terminal-Bench 2.1 / provider harness"
        },
        "aa-index": {
          "value": 47.06,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Sol (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 64.17,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Sol (max) / long prompt"
        },
        "terminalbench": {
          "value": 39.9,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Sol (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1624.11,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Sol (max)"
        },
        "aa-briefcase": {
          "value": 1475,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Sol (max)"
        },
        "arena-elo": {
          "value": 1483,
          "rank": 17,
          "variant": "gpt-5.6-sol-xhigh",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        },
        "aa-coding-agent": {
          "value": 55,
          "variant": "max / Codex",
          "version": "2026-09-09",
          "asOf": "2026-09-09",
          "sourceId": "benchmark-aa-astra"
        }
      },
      "sourceRefs": [
        "openai-gpt-56"
      ],
      "contextSourceId": "openai-pricing",
      "contextAsOf": "2026-09-10"
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
        "outputPerMTok": 25,
        "sourceId": "anthropic-pricing",
        "asOf": "2026-09-10",
        "note": "标准 API 价，非 Fast 模式；1M 上下文不额外加价。"
      },
      "posture": "Anthropic 的高能力型号；输出单价为 Fable 5.1 的一半。",
      "watch": "The practical question is how quickly Opus 5 becomes the default agent model.",
      "benchmarks": {
        "aa-index": {
          "value": 50.7,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Opus 5 (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 51.41,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Opus 5 (max) / long prompt"
        },
        "terminalbench": {
          "value": 48.99,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Opus 5 (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1735.09,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Opus 5 (max)"
        },
        "aa-briefcase": {
          "value": 1644.9,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Opus 5 (max)"
        },
        "arena-elo": {
          "value": 1493,
          "rank": 9,
          "variant": "claude-opus-5-high",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        },
        "aa-coding-agent": {
          "value": 60,
          "variant": "max / Claude Code",
          "version": "2026-09-09",
          "asOf": "2026-09-09",
          "sourceId": "benchmark-aa-astra"
        }
      },
      "sourceRefs": [
        "anthropic-opus-5"
      ],
      "contextSourceId": "anthropic-pricing",
      "contextAsOf": "2026-09-10"
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
        "outputPerMTok": 50,
        "sourceId": "anthropic-pricing",
        "asOf": "2026-09-10",
        "note": "标准 API 价，非 Fast 模式；1M 上下文不额外加价。"
      },
      "posture": "上一版 Fable 仍有 Arena 偏好优势；与 5.1 保留为两个型号比较。",
      "watch": "Watch for capability transfer into the cheaper Opus and Sonnet lanes.",
      "benchmarks": {
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
        "terminalbench-vendor": {
          "value": 84.3,
          "sourceId": "anthropic-fable-5",
          "asOf": "2026-06-09",
          "provenance": "vendor-reported",
          "variant": "Terminal-Bench 2.1 / provider harness"
        },
        "aa-index": {
          "value": 49.7,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5 (with fallback)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 63.26,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5 (with fallback) / long prompt"
        },
        "terminalbench": {
          "value": 42.42,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5 (with fallback) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1631.46,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5 (with fallback)"
        },
        "aa-briefcase": {
          "value": 1529.62,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5 (with fallback)"
        },
        "arena-elo": {
          "value": 1507,
          "rank": 1,
          "variant": "claude-fable-5",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "anthropic-fable-5"
      ],
      "contextSourceId": "anthropic-pricing",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "google-gemini-3-8-flash",
      "providerId": "google",
      "name": "Gemini 3.8 Flash",
      "modelIds": [
        "gemini-3.8-flash"
      ],
      "releasedAt": "2026-09-02",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": 65536,
      "priceUsd": {
        "inputPerMTok": 0.75,
        "outputPerMTok": 3.75,
        "sourceId": "google-gemini-38",
        "asOf": "2026-09-10",
        "note": "优惠价至 2026-12-31；2027-01-01 起输入 $1.50、输出 $7.50 / 百万 tokens。"
      },
      "posture": "生成速度快，支持图片、视频及长上下文；当前采用年末前的优惠价。",
      "watch": "关注长任务中的实际耗时，以及 2027 年起的价格变化。",
      "benchmarks": {
        "aa-index": {
          "value": 41.19,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.8 Flash (high)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 271.29,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.8 Flash (high) / long prompt"
        },
        "terminalbench": {
          "value": 19.7,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.8 Flash (high) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1463.81,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.8 Flash (high)"
        },
        "aa-briefcase": {
          "value": 1201.59,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.8 Flash (high)"
        },
        "arena-elo": {
          "value": 1494,
          "rank": 8,
          "variant": "gemini-3.8-flash-high",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02",
          "preliminary": true
        }
      },
      "sourceRefs": [
        "google-gemini-38"
      ],
      "contextSourceId": "google-gemini-38",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "xai-grok-4-6",
      "providerId": "xai",
      "name": "Grok 4.6",
      "modelIds": [
        "grok-4.6"
      ],
      "releasedAt": "2026-08-12",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 500000,
      "outputTokens": null,
      "priceUsd": {
        "inputPerMTok": 2,
        "outputPerMTok": 6,
        "sourceId": "xai-grok-46",
        "asOf": "2026-09-10",
        "note": "输入少于 200K 的标准价；超过 200K 时采用输入 $4、输出 $12 的长上下文档。"
      },
      "posture": "支持图片理解、工具调用和 500K 上下文，提供多档思考强度。",
      "watch": "Arena high 档位仍为初步结果，继续观察偏好分数。",
      "benchmarks": {
        "aa-index": {
          "value": 44.41,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Grok 4.6 (high)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 52.76,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Grok 4.6 (high) / long prompt"
        },
        "terminalbench": {
          "value": 21.21,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Grok 4.6 (high) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1642.96,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Grok 4.6 (high)"
        },
        "aa-briefcase": {
          "value": 1534.13,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Grok 4.6 (high)"
        },
        "arena-elo": {
          "value": 1461,
          "rank": 49,
          "variant": "grok-4.6-high",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02",
          "preliminary": true
        }
      },
      "sourceRefs": [
        "xai-grok-46"
      ],
      "contextSourceId": "xai-grok-46",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "deepseek-v4-pro",
      "providerId": "deepseek",
      "name": "DeepSeek-V4 Pro 0813",
      "modelIds": [
        "deepseek-v4-pro"
      ],
      "releasedAt": "2026-08-13",
      "stage": "open-weight",
      "access": [
        "api",
        "open-weight"
      ],
      "contextTokens": 1000000,
      "outputTokens": 384000,
      "priceUsd": {
        "inputPerMTok": 1.32,
        "outputPerMTok": 3.96,
        "sourceId": "deepseek-pricing",
        "asOf": "2026-09-10",
        "note": "图中采用高峰价；闲时输入 $0.66、输出 $1.98 / 百万 tokens。高峰为 UTC 01–04、06–10 点（北京时间 09–12、14–18 点），2026-08-16 16:00 UTC 起生效。"
      },
      "posture": "V4 Pro 已转正式版，强化 Agent 工作流，并加入原生 Responses API。",
      "watch": "官方 API 别名不变；使用时核对 0813 版本与峰谷计费时段。",
      "benchmarks": {
        "aa-index": {
          "value": 36.28,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "DeepSeek V4 Pro 0813 (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 78.47,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "DeepSeek V4 Pro 0813 (max) / long prompt"
        },
        "terminalbench": {
          "value": 14.14,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "DeepSeek V4 Pro 0813 (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1493.31,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "DeepSeek V4 Pro 0813 (max)"
        },
        "aa-briefcase": {
          "value": 1264.67,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "DeepSeek V4 Pro 0813 (max)"
        },
        "arena-elo": {
          "value": 1460,
          "rank": 52,
          "variant": "deepseek-v4-pro-high-20260813",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "deepseek-pro-0813"
      ],
      "contextSourceId": "deepseek-pricing",
      "contextAsOf": "2026-09-10"
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
        "inputPerMTok": 0.44,
        "outputPerMTok": 1.32,
        "sourceId": "deepseek-pricing",
        "asOf": "2026-09-10",
        "note": "图中采用高峰价；闲时输入 $0.22、输出 $0.66 / 百万 tokens。高峰为 UTC 01–04、06–10 点（北京时间 09–12、14–18 点），2026-08-16 16:00 UTC 起生效。"
      },
      "posture": "保留 0731 正式版；低价且输出较快，API 已更新为峰谷定价。",
      "watch": "Independent long-horizon replication is now the decisive follow-up signal.",
      "benchmarks": {
        "terminalbench-vendor": {
          "value": 82.7,
          "sourceId": "deepseek-v4-flash",
          "asOf": "2026-07-31",
          "provenance": "vendor-reported"
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
        },
        "aa-index": {
          "value": 35,
          "sourceId": "benchmark-aa-flash",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "max / 0731",
          "version": "4.3"
        },
        "output-speed": {
          "value": 122.6,
          "sourceId": "benchmark-aa-flash",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "max / 0731"
        }
      },
      "sourceRefs": [
        "deepseek-v4-flash"
      ],
      "contextSourceId": "deepseek-pricing",
      "contextAsOf": "2026-09-10"
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
      "contextTokens": 1048576,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 3,
        "outputPerMTok": 15,
        "sourceId": "kimi-pricing",
        "asOf": "2026-09-10"
      },
      "posture": "Large open-weight coding and agent model competing in the global top tier.",
      "watch": "Open weights turn leaderboard movement into immediate deployment pressure.",
      "benchmarks": {
        "aa-index": {
          "value": 43.78,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Kimi K3 (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 35.51,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Kimi K3 (max) / long prompt"
        },
        "terminalbench": {
          "value": 12.63,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Kimi K3 (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1583.53,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Kimi K3 (max)"
        },
        "aa-briefcase": {
          "value": 1496.56,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Kimi K3 (max)"
        },
        "arena-elo": {
          "value": 1489,
          "rank": 12,
          "variant": "kimi-k3-max",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "moonshot-kimi-k3"
      ],
      "contextSourceId": "benchmark-aa",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "mistral-medium-3-5",
      "providerId": "mistral",
      "name": "Mistral Medium 3.5",
      "modelIds": [
        "mistral-medium-3-5"
      ],
      "releasedAt": "2026-04-28",
      "stage": "open-weight",
      "access": [
        "api",
        "open-weight",
        "enterprise"
      ],
      "contextTokens": 256000,
      "outputTokens": 65536,
      "priceUsd": {
        "inputPerMTok": 1.5,
        "outputPerMTok": 7.5,
        "sourceId": "mistral-medium-spec",
        "asOf": "2026-09-10"
      },
      "posture": "European enterprise alternative optimized around deployment control and latency.",
      "watch": "A new Mistral flagship would reset the oldest clock on this board.",
      "benchmarks": {
        "aa-index": {
          "value": 14.89,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Mistral Medium 3.5",
          "version": "4.3"
        },
        "output-speed": {
          "value": 136.55,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Mistral Medium 3.5 / long prompt"
        },
        "terminalbench": {
          "value": 0,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Mistral Medium 3.5 / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 875.14,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Mistral Medium 3.5"
        },
        "aa-briefcase": {
          "value": 523.63,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Mistral Medium 3.5"
        },
        "arena-elo": {
          "value": 1427,
          "rank": 103,
          "variant": "mistral-medium-3.5",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "mistral-medium-spec"
      ],
      "contextSourceId": "mistral-medium-spec",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "qwen-3-8-max-0902",
      "providerId": "qwen",
      "name": "Qwen3.8 Max 0902",
      "modelIds": [
        "qwen3.8-max-0902"
      ],
      "releasedAt": "2026-09-02",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": 131072,
      "priceUsd": {
        "inputPerMTok": 2,
        "outputPerMTok": 6,
        "sourceId": "qwen-38-0902",
        "asOf": "2026-09-10",
        "note": "QwenCloud 国际 API 标价；精确对应 0902 快照，不继承旧版评测。"
      },
      "posture": "9 月 2 日快照加强工程项目、工具协作与视觉理解，保留 1M 上下文。",
      "watch": "等待 0902 精确版本的独立评测；不沿用 Qwen3.8 Max 或开放权重版的分数。",
      "benchmarks": {},
      "sourceRefs": [
        "qwen-38-0902"
      ],
      "contextSourceId": "qwen-38-0902",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "meta-muse-spark-1-3",
      "providerId": "meta",
      "name": "Muse Spark 1.3",
      "modelIds": [
        "muse-spark-1.3"
      ],
      "releasedAt": "2026-09-02",
      "stage": "preview",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": null,
      "priceUsd": {
        "inputPerMTok": 1.25,
        "outputPerMTok": 4.25,
        "sourceId": "benchmark-aa",
        "asOf": "2026-09-10",
        "note": "AA 记录的 Meta API 价格；2026-09-10 读取，官方定价页尚未直接复核。"
      },
      "posture": "Meta 多模态模型更新到 1.3，主攻长程 Agent 与编程，输出速度较快。",
      "watch": "API 仍为 public preview；价格暂采用 AA 记录，等待官方定价页直接复核。",
      "benchmarks": {
        "aa-index": {
          "value": 48.17,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Muse Spark 1.3 (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 219.66,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Muse Spark 1.3 (max) / long prompt"
        },
        "terminalbench": {
          "value": 33.33,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Muse Spark 1.3 (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1703.34,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Muse Spark 1.3 (max)"
        },
        "aa-briefcase": {
          "value": 1589.18,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Muse Spark 1.3 (max)"
        },
        "aa-coding-agent": {
          "value": 54,
          "variant": "max / Muse Code",
          "version": "2026-09-09",
          "asOf": "2026-09-09",
          "sourceId": "benchmark-aa-astra"
        }
      },
      "sourceRefs": [
        "meta-muse"
      ],
      "contextSourceId": "benchmark-aa",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "cohere-command-a-plus",
      "providerId": "cohere",
      "name": "Command A+",
      "modelIds": [
        "command-a-plus-05-2026"
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
      ],
      "contextSourceId": "cohere-command-a-plus",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "amazon-nova-2-omni",
      "providerId": "amazon",
      "name": "Amazon Nova 2 Omni",
      "modelIds": [
        "amazon.nova-2-omni-v1:0"
      ],
      "releasedAt": "2025-12-02",
      "stage": "preview",
      "access": [
        "bedrock-preview",
        "nova-forge"
      ],
      "contextTokens": 1000000,
      "outputTokens": 32000,
      "priceUsd": null,
      "posture": "Bedrock-native multimodal model whose distribution signal exceeds public benchmark coverage.",
      "watch": "官方目前仍写明 Nova Forge 客户预览，未确认普通公开 API 价格与同版本独立分数。",
      "benchmarks": {},
      "sourceRefs": [
        "amazon-nova"
      ],
      "contextSourceId": "amazon-nova",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "zhipu-glm-5-3",
      "providerId": "zhipu",
      "name": "GLM-5.3",
      "modelIds": [
        "glm-5.3"
      ],
      "releasedAt": "2026-08-18",
      "stage": "open-weight",
      "access": [
        "api",
        "open-weight"
      ],
      "contextTokens": 1000000,
      "outputTokens": null,
      "priceUsd": {
        "inputPerMTok": 1.4,
        "outputPerMTok": 4.4,
        "sourceId": "zhipu-pricing",
        "asOf": "2026-09-10"
      },
      "posture": "GLM 的新旗舰，重点提升编码、长任务与工具协作。",
      "watch": "将厂商框架的能力报告与独立测试分开观察。",
      "benchmarks": {
        "aa-index": {
          "value": 44.86,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3 (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 58.79,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3 (max) / long prompt"
        },
        "terminalbench": {
          "value": 41.92,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3 (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1674.94,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3 (max)"
        },
        "aa-briefcase": {
          "value": 1514.59,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3 (max)"
        },
        "arena-elo": {
          "value": 1482,
          "rank": 20,
          "variant": "glm-5.3-max",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "zhipu-release"
      ],
      "contextSourceId": "benchmark-aa",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "openai-gpt-6-astra",
      "providerId": "openai",
      "name": "GPT-6 Astra",
      "modelIds": [
        "gpt-6-astra"
      ],
      "releasedAt": "2026-09-03",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1050000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 10,
        "outputPerMTok": 50,
        "sourceId": "openai-astra",
        "asOf": "2026-09-10",
        "note": "标准 API 价；输入超过 272K 时，整次请求输出单价乘 1.5，输入单价乘 2。"
      },
      "posture": "OpenAI 最新高端型号，覆盖复杂推理、编程与完整工作任务。",
      "watch": "单价高；同样任务下的总 token 消耗和完成质量更值得实测。",
      "benchmarks": {
        "aa-index": {
          "value": 52.81,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-6 Astra (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 54.29,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-6 Astra (max) / long prompt"
        },
        "terminalbench": {
          "value": 59.09,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-6 Astra (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1580.2,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-6 Astra (max)"
        },
        "aa-briefcase": {
          "value": 1562.01,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-6 Astra (max)"
        },
        "aa-coding-agent": {
          "value": 62,
          "variant": "max / Codex",
          "version": "2026-09-09",
          "asOf": "2026-09-09",
          "sourceId": "benchmark-aa-astra"
        }
      },
      "sourceRefs": [
        "openai-astra"
      ],
      "contextSourceId": "openai-astra",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "openai-gpt-5-6-terra",
      "providerId": "openai",
      "name": "GPT-5.6 Terra",
      "modelIds": [
        "gpt-5.6-terra"
      ],
      "releasedAt": "2026-07-09",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1050000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 2,
        "outputPerMTok": 12,
        "sourceId": "openai-pricing",
        "asOf": "2026-09-10",
        "note": "标准 API 价；输入超过 272K 时，整次请求输出单价乘 1.5，输入单价乘 2。"
      },
      "posture": "GPT-5.6 的中间档位，支持 1.05M 上下文。",
      "watch": "比较具体工作中相对 Sol 的能力损失与费用节省。",
      "benchmarks": {
        "aa-index": {
          "value": 42.25,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Terra (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 82.17,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Terra (max) / long prompt"
        },
        "terminalbench": {
          "value": 35.35,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Terra (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1476.96,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Terra (max)"
        },
        "aa-briefcase": {
          "value": 1330,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Terra (max)"
        },
        "arena-elo": {
          "value": 1466,
          "rank": 43,
          "variant": "gpt-5.6-terra-xhigh",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "openai-pricing"
      ],
      "contextSourceId": "openai-pricing",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "openai-gpt-5-6-luna",
      "providerId": "openai",
      "name": "GPT-5.6 Luna",
      "modelIds": [
        "gpt-5.6-luna"
      ],
      "releasedAt": "2026-07-09",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1050000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 0.2,
        "outputPerMTok": 1.2,
        "sourceId": "openai-luna",
        "asOf": "2026-09-10",
        "note": "标准 API 价；输入超过 272K 时，整次请求输出单价乘 1.5，输入单价乘 2。"
      },
      "posture": "GPT-5.6 的低价型号，适合高频、预算敏感任务。",
      "watch": "评测使用 max 思考档；真实任务的等待时间与 token 消耗需另测。",
      "benchmarks": {
        "aa-index": {
          "value": 37.5,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Luna (max)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 109.98,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Luna (max) / long prompt"
        },
        "terminalbench": {
          "value": 11.62,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Luna (max) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1489.33,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Luna (max)"
        },
        "aa-briefcase": {
          "value": 1339.38,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GPT-5.6 Luna (max)"
        },
        "arena-elo": {
          "value": 1453,
          "rank": 65,
          "variant": "gpt-5.6-luna-xhigh",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "openai-luna"
      ],
      "contextSourceId": "openai-luna",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "anthropic-claude-fable-5-1",
      "providerId": "anthropic",
      "name": "Claude Fable 5.1",
      "modelIds": [
        "claude-fable-5-1"
      ],
      "releasedAt": "2026-09-01",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": 128000,
      "priceUsd": {
        "inputPerMTok": 10,
        "outputPerMTok": 50,
        "sourceId": "anthropic-pricing",
        "asOf": "2026-09-10",
        "note": "标准 API 价，非 Fast 模式；1M 上下文不额外加价。"
      },
      "posture": "Anthropic 最新公开型号，保留 1M 上下文，降低了缓存命中价格。",
      "watch": "AA 使用 max with fallback；非常接近的分数差不代表实际任务稳赢。",
      "benchmarks": {
        "aa-index": {
          "value": 53.37,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5.1 (max with fallback)",
          "version": "4.3"
        },
        "output-speed": {
          "value": 65.24,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5.1 (max with fallback) / long prompt"
        },
        "terminalbench": {
          "value": 52.02,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5.1 (max with fallback) / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1763.64,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5.1 (max with fallback)"
        },
        "aa-briefcase": {
          "value": 1661.82,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Claude Fable 5.1 (max with fallback)"
        },
        "arena-elo": {
          "value": 1504,
          "rank": 3,
          "variant": "claude-fable-5.1-max",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        },
        "aa-coding-agent": {
          "value": 62,
          "variant": "max / Claude Code",
          "version": "2026-09-09",
          "asOf": "2026-09-09",
          "sourceId": "benchmark-aa-astra"
        }
      },
      "sourceRefs": [
        "anthropic-fable-51"
      ],
      "contextSourceId": "anthropic-pricing",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "zhipu-glm-5-3-flash",
      "providerId": "zhipu",
      "name": "GLM-5.3 Flash",
      "modelIds": [
        "glm-5.3-flash"
      ],
      "releasedAt": "2026-08-26",
      "stage": "open-weight",
      "access": [
        "api",
        "open-weight"
      ],
      "contextTokens": 1000000,
      "outputTokens": null,
      "priceUsd": {
        "inputPerMTok": 0.15,
        "outputPerMTok": 0.5,
        "sourceId": "zhipu-pricing",
        "asOf": "2026-09-10"
      },
      "posture": "原生多模态的低价模型；每百万输出 tokens 为 $0.50。",
      "watch": "斩杀线表现突出，仍需按自己的代码、文档和图片任务检验。",
      "benchmarks": {
        "aa-index": {
          "value": 41.91,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3-Flash",
          "version": "4.3"
        },
        "output-speed": {
          "value": 75.97,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3-Flash / long prompt"
        },
        "terminalbench": {
          "value": 32.83,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3-Flash / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1669.27,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3-Flash"
        },
        "aa-briefcase": {
          "value": 1454.58,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "GLM-5.3-Flash"
        },
        "arena-elo": {
          "value": 1474,
          "rank": 29,
          "variant": "glm-5.3-flash",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "zhipu-release"
      ],
      "contextSourceId": "benchmark-aa",
      "contextAsOf": "2026-09-10"
    },
    {
      "id": "google-gemini-3-5-flash-lite",
      "providerId": "google",
      "name": "Gemini 3.5 Flash-Lite",
      "modelIds": [
        "gemini-3.5-flash-lite"
      ],
      "releasedAt": "2026-07-21",
      "stage": "frontier",
      "access": [
        "api"
      ],
      "contextTokens": 1000000,
      "outputTokens": null,
      "priceUsd": {
        "inputPerMTok": 0.3,
        "outputPerMTok": 2.5,
        "sourceId": "benchmark-aa",
        "asOf": "2026-09-10",
        "note": "AA 记录的 API 价格；2026-09-10 读取，官方定价页尚未直接复核。"
      },
      "posture": "高吞吐小型号，适合快速处理大量轻量请求。",
      "watch": "AA 公布的 API 价格暂作为参考，和更强模型比较任务成功率。",
      "benchmarks": {
        "aa-index": {
          "value": 22.66,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.5 Flash-Lite",
          "version": "4.3"
        },
        "output-speed": {
          "value": 369.2,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.5 Flash-Lite / long prompt"
        },
        "terminalbench": {
          "value": 1.01,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.5 Flash-Lite / AA harness",
          "version": "4.0"
        },
        "gdpval-aa-v2": {
          "value": 1063.25,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.5 Flash-Lite"
        },
        "aa-briefcase": {
          "value": 645.32,
          "sourceId": "benchmark-aa",
          "asOf": "2026-09-10",
          "dateBasis": "observed",
          "variant": "Gemini 3.5 Flash-Lite"
        },
        "arena-elo": {
          "value": 1457,
          "rank": 57,
          "variant": "gemini-3.5-flash-lite",
          "sourceId": "benchmark-arena",
          "asOf": "2026-09-02"
        }
      },
      "sourceRefs": [
        "google-gemini"
      ],
      "contextSourceId": "benchmark-aa",
      "contextAsOf": "2026-09-10"
    }
  ],
  "events": [
    {
      "id": "astra-live",
      "date": "2026-09-03",
      "status": "released",
      "providerId": "openai",
      "label": "GPT-6 Astra 已发布",
      "detail": "新增高端型号；标准 API 每百万 tokens 输入 $10、输出 $50。",
      "sourceId": "openai-astra"
    },
    {
      "id": "fable-51-live",
      "date": "2026-09-01",
      "status": "released",
      "providerId": "anthropic",
      "label": "Claude Fable 5.1 已发布",
      "detail": "公开 API 已上线；AA max with fallback 与 Arena max 分开记录。",
      "sourceId": "anthropic-fable-51"
    },
    {
      "id": "gemini-38-live",
      "date": "2026-09-02",
      "status": "released",
      "providerId": "google",
      "label": "Gemini 3.8 Flash 已发布",
      "detail": "输出速度与长程任务更新，年末前采用 $0.75 / $3.75 优惠价。",
      "sourceId": "google-gemini-38"
    },
    {
      "id": "qwen-0902-live",
      "date": "2026-09-02",
      "status": "released",
      "providerId": "qwen",
      "label": "Qwen3.8 Max 0902 已发布",
      "detail": "官方版本已确认；等待精确对应 0902 的独立成绩。",
      "sourceId": "qwen-38-0902"
    },
    {
      "id": "muse-13-live",
      "date": "2026-09-02",
      "status": "released",
      "providerId": "meta",
      "label": "Muse Spark 1.3 已发布",
      "detail": "重点提升长程编程任务；Meta Model API 仍为公开预览。",
      "sourceId": "meta-muse"
    },
    {
      "id": "glm-flash-live",
      "date": "2026-08-26",
      "status": "released",
      "providerId": "zhipu",
      "label": "GLM-5.3 Flash 已发布",
      "detail": "原生多模态，标准 API 输出 $0.50 / 百万 tokens。",
      "sourceId": "zhipu-release"
    },
    {
      "id": "glm-53-live",
      "date": "2026-08-18",
      "status": "released",
      "providerId": "zhipu",
      "label": "GLM-5.3 已发布",
      "detail": "强化编码与长程 Agent；厂商与独立测试框架分别保留。",
      "sourceId": "zhipu-release"
    },
    {
      "id": "deepseek-pro-ga",
      "date": "2026-08-13",
      "status": "released",
      "providerId": "deepseek",
      "label": "DeepSeek V4 Pro 转正式版",
      "detail": "0813 版本上线；8 月 17 日北京时间零点起采用峰谷定价。",
      "sourceId": "deepseek-pro-0813"
    },
    {
      "id": "grok-46-live",
      "date": "2026-08-12",
      "status": "released",
      "providerId": "xai",
      "label": "Grok 4.6 已发布",
      "detail": "500K 上下文，图片输入、工具调用及多档思考强度。",
      "sourceId": "xai-grok-46"
    },
    {
      "id": "sonnet-price-confirmed",
      "date": "2026-09-10",
      "status": "released",
      "providerId": "anthropic",
      "label": "Sonnet 5 保持 $2 / $10",
      "detail": "本次核实：原定 9 月 1 日涨至 $3 / $15 的安排已取消，启动优惠价成为标准价。",
      "sourceId": "anthropic-pricing"
    },
    {
      "id": "sol-price-review",
      "date": "2026-11-21",
      "status": "deadline",
      "providerId": "openai",
      "label": "Sol 优惠价格复核日",
      "detail": "官方保证 $4 / $20 优惠至少持续到此日，未承诺当日涨价。",
      "sourceId": "openai-pricing"
    },
    {
      "id": "gemini-price-window",
      "date": "2026-12-31",
      "status": "deadline",
      "providerId": "google",
      "label": "Gemini 3.8 Flash 优惠结束",
      "detail": "2027-01-01 起输入 $1.50、输出 $7.50 / 百万 tokens。",
      "sourceId": "google-gemini-38"
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": false,
      "lastSuccessAt": null,
      "lastSuccessfulWatch": [],
      "sha256": "",
      "foundSignals": [],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "claude opus 5",
        "claude-opus-5",
        "1m"
      ],
      "sha256": "eab0b65aa33cf0c9abf4fc628d0730941103ba6c68a4815285da43b295e78ef9",
      "foundSignals": [
        "claude opus 5",
        "claude-opus-5",
        "1m"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "claude fable 5",
        "terminal-bench",
        "swe-bench"
      ],
      "sha256": "f147911a152da8b10374f6b19a0729f46e3f8c9ecfbb23dc3aa145ae5aa6d850",
      "foundSignals": [
        "claude fable 5"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "gemini 3.6 flash",
        "gemini 3.5 pro",
        "1m"
      ],
      "sha256": "79680930acf1090fb239881439701af6b359c8787e9c6644e58a04d1c774e14d",
      "foundSignals": [
        "gemini 3.6 flash",
        "1m"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "grok 4.5",
        "terminal-bench",
        "swe-bench"
      ],
      "sha256": "213ce5cf7cf9086bc2df25ecadbbd46e03793cc1b8f2032f409e2c605c9a6ec3",
      "foundSignals": [
        "grok 4.5",
        "terminal-bench",
        "swe-bench"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "deepseek-v4",
      "providerId": "deepseek",
      "sourceType": "provider",
      "label": "DeepSeek · 更新记录",
      "url": "https://api-docs.deepseek.com/updates/",
      "official": true,
      "watch": [
        "v4-pro",
        "0813",
        "flash-vision"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "v4-pro",
        "0813",
        "flash-vision"
      ],
      "sha256": "da7f5c4919ed8874ff575dc1c7c91da36e5b141a1b17b43309f3d75156469185",
      "foundSignals": [
        "v4-pro",
        "0813",
        "flash-vision"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "deepseek-v4-flash",
        "terminal bench 2.1",
        "nl2repo",
        "82.7"
      ],
      "sha256": "da7f5c4919ed8874ff575dc1c7c91da36e5b141a1b17b43309f3d75156469185",
      "foundSignals": [
        "deepseek-v4-flash",
        "terminal bench 2.1",
        "nl2repo",
        "82.7"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "kimi k3",
        "open source",
        "1m"
      ],
      "sha256": "89eeded55c10636a8f75a6f86ad3b77e932d55c107d5e742aa6581f7b4e3f9e8",
      "foundSignals": [
        "kimi k3",
        "open source",
        "1m"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "mistral-models",
      "providerId": "mistral",
      "sourceType": "provider",
      "label": "Mistral model overview",
      "url": "https://docs.mistral.ai/models",
      "official": true,
      "watch": [
        "medium 3.5",
        "small 4"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "medium 3.5",
        "small 4"
      ],
      "sha256": "aa9a6f0634516eb1479aadccc63b03698eeb96d8d190b1cd0f9185362b49dc35",
      "foundSignals": [
        "medium 3.5",
        "small 4"
      ],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "qwen3.7",
        "qwen3.8",
        "qwen max"
      ],
      "sha256": "d518caebf84b05ffe4ed741cb79a713ec68ecde751ffd7b20d87b613caf40fda",
      "foundSignals": [
        "qwen3.8",
        "qwen max"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "meta-muse",
      "providerId": "meta",
      "sourceType": "provider",
      "label": "Meta Muse · 最新型号",
      "url": "https://ai.meta.com/llama",
      "official": true,
      "watch": [
        "muse spark 1.3",
        "public preview"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "muse spark 1.3",
        "public preview"
      ],
      "sha256": "f717ced60a4715a7e0270723458089b719df880a5c05fb272e0bef9e591e9df6",
      "foundSignals": [
        "muse spark 1.3",
        "public preview"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "command a+",
        "command-a-plus",
        "apache 2.0"
      ],
      "sha256": "b1156c3b9e2229046dc672aa2dc44de3b41aaab5de8bbe26e4dab85d11546c9b",
      "foundSignals": [
        "command a+",
        "command-a-plus",
        "apache 2.0"
      ],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "nova 2 omni",
        "nova 2",
        "bedrock"
      ],
      "sha256": "b97ac8e925c2b984ddd9e0c0956b141f127592eb9db9f7dbeecad5384962d771",
      "foundSignals": [
        "nova 2",
        "bedrock"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "glm-5.2",
        "terminal-bench",
        "swe-bench"
      ],
      "sha256": "a9e8c2b6f34717d69e3a0aa26bb117256a4d8c95bd299910c2a693000ee88fe8",
      "foundSignals": [
        "glm-5.2"
      ],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
      "error": ""
    },
    {
      "id": "benchmark-aa",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "Artificial Analysis · 智力 v4.3",
      "url": "https://artificialanalysis.ai/models",
      "official": false,
      "watch": [
        "v4.3",
        "gpt-6-astra",
        "glm-5.3-flash"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "v4.3",
        "gpt-6-astra",
        "glm-5.3-flash"
      ],
      "sha256": "272abf541aff12eaa8b7348c2d7b7f9e2fd23f972647208f19a69de2f35d11b3",
      "foundSignals": [
        "v4.3",
        "gpt-6-astra",
        "glm-5.3-flash"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "coding agent index",
        "deepswe",
        "terminal-bench",
        "swe-atlas"
      ],
      "sha256": "8570062c6036af6a36bdaa4e8db49fa90b93421aeb59f0d8315a50155ca1c3d2",
      "foundSignals": [
        "coding agent index",
        "deepswe",
        "terminal-bench",
        "swe-atlas"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "gdpval-aa v2",
        "agentic real-world work",
        "elo"
      ],
      "sha256": "e5d296d2f26597ea8663f830d6a66124e8c1967724d8ee085ae0867ecef8fea6",
      "foundSignals": [
        "gdpval-aa v2",
        "elo"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "aa-briefcase",
        "agentic knowledge work",
        "elo"
      ],
      "sha256": "d7bb93d3fd8ff0e7d49234ca19b1d898ac94dd345443d51a10982540df98a115",
      "foundSignals": [
        "aa-briefcase",
        "agentic knowledge work",
        "elo"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "leaderboard",
        "claude-fable-5",
        "qwen3.8"
      ],
      "sha256": "650f665bc302042db95d06a2d1e6c7bf7618d7afe39cb845b1951496edac839c",
      "foundSignals": [
        "leaderboard",
        "claude-fable-5",
        "qwen3.8"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "swe-bench",
        "verified",
        "pro"
      ],
      "sha256": "5d031921be2267f0d210fde3c654d56e9be7fc5ee45b3bab3b9f5888cce73d5a",
      "foundSignals": [
        "swe-bench",
        "verified",
        "pro"
      ],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "terminal-bench",
        "leaderboard",
        "agent"
      ],
      "sha256": "8e97c8041a4fc8b6cc0a4e80cd7a5ede2c4cc31d97cb777e3a3ce4190d188294",
      "foundSignals": [
        "terminal-bench",
        "leaderboard",
        "agent"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "arc-agi",
        "leaderboard",
        "verified"
      ],
      "sha256": "1af05c4fcbbcb33dff6098211db029f6fd446da75028cb0438e1033c01dc75cf",
      "foundSignals": [
        "arc-agi",
        "leaderboard",
        "verified"
      ],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
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
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "agents last exam",
        "leaderboard",
        "agent"
      ],
      "sha256": "54dbe0a4119f51fd9a1f2c2b408a3cf268ef6f0a91acda6b8add8931c60a8fac",
      "foundSignals": [
        "agents last exam",
        "leaderboard",
        "agent"
      ],
      "changed": false,
      "lastChangedAt": "2026-09-10T00:09:32.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "openai-astra",
      "providerId": "openai",
      "sourceType": "provider",
      "label": "OpenAI GPT-6 Astra · 规格与价格",
      "url": "https://developers.openai.com/api/docs/models/gpt-6-astra",
      "official": true,
      "watch": [
        "gpt-6-astra",
        "50.00"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "gpt-6-astra",
        "50.00"
      ],
      "sha256": "54decc3ba27dc9a096b16dcb653c51058b93df9245ff705561e94e123b1e05a4",
      "foundSignals": [
        "gpt-6-astra",
        "50.00"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "openai-pricing",
      "providerId": "openai",
      "sourceType": "provider",
      "label": "OpenAI Sol / Terra · 规格与价格",
      "url": "https://developers.openai.com/api/docs/models/compare",
      "official": true,
      "watch": [
        "gpt-5.6-sol",
        "gpt-5.6-terra"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "gpt-5.6-sol",
        "gpt-5.6-terra"
      ],
      "sha256": "95e9d3ce1218f4224dfed8e6a24cfbab65f3f3fa53855295e79d6c6262390371",
      "foundSignals": [
        "gpt-5.6-sol",
        "gpt-5.6-terra"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "openai-luna",
      "providerId": "openai",
      "sourceType": "provider",
      "label": "OpenAI GPT-5.6 Luna · 规格与价格",
      "url": "https://developers.openai.com/api/docs/models/gpt-5.6-luna",
      "official": true,
      "watch": [
        "gpt-5.6-luna",
        "1.20"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "gpt-5.6-luna",
        "1.20"
      ],
      "sha256": "b181fe360d91c9ab32dedfd563dea7eb4a77659f43e5e6e5603dc1c3e02480cb",
      "foundSignals": [
        "gpt-5.6-luna",
        "1.20"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "anthropic-fable-51",
      "providerId": "anthropic",
      "sourceType": "provider",
      "label": "Claude Fable 5.1 · 发布与规格",
      "url": "https://platform.claude.com/docs/en/models/fable-5-1/overview",
      "official": true,
      "watch": [
        "claude-fable-5-1",
        "1m"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "claude-fable-5-1",
        "1m"
      ],
      "sha256": "b41a0ad9d60f4733853c05ac8cb8166b3caebe4d3988466a826b6ec90388026a",
      "foundSignals": [
        "claude-fable-5-1",
        "1m"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": {
        "detectedAt": "2026-09-11T00:05:07.821Z",
        "added": [
          "claude-fable-5-1",
          "1m"
        ],
        "removed": []
      },
      "error": ""
    },
    {
      "id": "anthropic-pricing",
      "providerId": "anthropic",
      "sourceType": "provider",
      "label": "Claude · 官方价格",
      "url": "https://platform.claude.com/docs/en/about-claude/pricing",
      "official": true,
      "watch": [
        "fable 5.1",
        "sonnet 5",
        "standard price"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "fable 5.1",
        "sonnet 5",
        "standard price"
      ],
      "sha256": "669ab901a91c8f020bb5fbc8864f255cc6b887f725ba9c4796f84bd13d0e6b3d",
      "foundSignals": [
        "fable 5.1",
        "sonnet 5",
        "standard price"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": {
        "detectedAt": "2026-09-11T00:05:07.821Z",
        "added": [
          "fable 5.1",
          "sonnet 5",
          "standard price"
        ],
        "removed": []
      },
      "error": ""
    },
    {
      "id": "google-gemini-38",
      "providerId": "google",
      "sourceType": "provider",
      "label": "Gemini 3.8 Flash · 规格与优惠价",
      "url": "https://ai.google.dev/gemini-api/docs/latest-model",
      "official": true,
      "watch": [
        "gemini-3.8-flash",
        "introductory",
        "3.75"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "gemini-3.8-flash",
        "introductory",
        "3.75"
      ],
      "sha256": "c4a8faecfa54b5619b5032a5681a8b774ff7b996ae1788587334be7199594ac0",
      "foundSignals": [
        "gemini-3.8-flash",
        "introductory",
        "3.75"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "xai-grok-46",
      "providerId": "xai",
      "sourceType": "provider",
      "label": "Grok 4.6 · 官方规格与价格",
      "url": "https://docs.x.ai/developers/grok-4-6",
      "official": true,
      "watch": [
        "grok-4.6",
        "500,000"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "grok-4.6",
        "500,000"
      ],
      "sha256": "83953b0b113d0e51afc4569964b7fe064d276d25614856a52f90e333c380b472",
      "foundSignals": [
        "grok-4.6",
        "500,000"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "deepseek-pricing",
      "providerId": "deepseek",
      "sourceType": "provider",
      "label": "DeepSeek · 峰谷价格与版本",
      "url": "https://api-docs.deepseek.com/quick_start/pricing",
      "official": true,
      "watch": [
        "0813",
        "0731",
        "peak"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "0813",
        "0731",
        "peak"
      ],
      "sha256": "755aa9b488d1185cba016ca4de3b3b6b8f593f5e13e5f9f961305289a5c8d242",
      "foundSignals": [
        "0813",
        "peak"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": {
        "detectedAt": "2026-09-11T00:05:07.821Z",
        "added": [],
        "removed": [
          "0731"
        ]
      },
      "error": ""
    },
    {
      "id": "deepseek-pro-0813",
      "providerId": "deepseek",
      "sourceType": "provider",
      "label": "DeepSeek V4 Pro 0813 · 正式版发布",
      "url": "https://api-docs.deepseek.com/news/news260813/",
      "official": true,
      "watch": [
        "v4-pro",
        "off-peak"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "v4-pro",
        "off-peak"
      ],
      "sha256": "976de6fe301b9fe08b77df15925c3a5adee89643c5716248f548172614e0fd16",
      "foundSignals": [
        "v4-pro",
        "off-peak"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "kimi-pricing",
      "providerId": "moonshot",
      "sourceType": "provider",
      "label": "Kimi · 官方 API 价格",
      "url": "https://platform.kimi.ai/",
      "official": true,
      "watch": [
        "kimi k3",
        "15.00"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "kimi k3",
        "15.00"
      ],
      "sha256": "e321ce01cb1f80cf3739c181d5d367fa28a2d2717a6191df6122d486b561f57f",
      "foundSignals": [
        "kimi k3",
        "15.00"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "mistral-medium-spec",
      "providerId": "mistral",
      "sourceType": "provider",
      "label": "Mistral Medium 3.5 · 规格与价格",
      "url": "https://docs.mistral.ai/models/mistral-medium-3-5-26-04",
      "official": true,
      "watch": [
        "medium 3.5",
        "256k"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "medium 3.5",
        "256k"
      ],
      "sha256": "95bc8f95f0c12e90c9aa09ba2f55cbc2a4c49d23bf12b50c4d9c06fab0eacc1c",
      "foundSignals": [
        "medium 3.5",
        "256k"
      ],
      "changed": false,
      "lastChangedAt": null,
      "signalChange": null,
      "error": ""
    },
    {
      "id": "qwen-38-0902",
      "providerId": "qwen",
      "sourceType": "provider",
      "label": "Qwen3.8-Max-0902 · 规格与价格",
      "url": "https://www.qwencloud.com/models/qwen3.8-max-0902",
      "official": true,
      "watch": [
        "qwen3.8-max-0902",
        "upgraded snapshot"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "qwen3.8-max-0902",
        "upgraded snapshot"
      ],
      "sha256": "6f422226e3fa3b49671658d05eff8d50f897bb32ef56e3a11693a8f3ffdd1b9d",
      "foundSignals": [
        "qwen3.8-max-0902",
        "upgraded snapshot"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "zhipu-release",
      "providerId": "zhipu",
      "sourceType": "provider",
      "label": "GLM-5.3 / Flash · 发布记录",
      "url": "https://docs.z.ai/release-notes/new-released",
      "official": true,
      "watch": [
        "glm-5.3",
        "glm-5.3-flash"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "glm-5.3",
        "glm-5.3-flash"
      ],
      "sha256": "b40310ea4dc9b02259f764369ff10e00ebd273981ad87817fd78624a099450f2",
      "foundSignals": [
        "glm-5.3",
        "glm-5.3-flash"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "zhipu-pricing",
      "providerId": "zhipu",
      "sourceType": "provider",
      "label": "Z.ai · 官方价格",
      "url": "https://docs.z.ai/guides/overview/pricing",
      "official": true,
      "watch": [
        "glm-5.3-flash",
        "0.50"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "glm-5.3-flash",
        "0.50"
      ],
      "sha256": "1a0072e511031179fa14f87f1fb2a085b811fb77572f070de1a5406c7c68c155",
      "foundSignals": [
        "glm-5.3-flash",
        "0.50"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "benchmark-aa-flash",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "AA · DeepSeek V4 Flash 0731",
      "url": "https://artificialanalysis.ai/models/deepseek-v4-flash",
      "official": false,
      "watch": [
        "v4.3",
        "0731"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "v4.3",
        "0731"
      ],
      "sha256": "5035876762ada555fbcc2b8579aaa48db9da2dcb6c5a49d04dd1d54307722700",
      "foundSignals": [
        "v4.3",
        "0731"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    },
    {
      "id": "benchmark-aa-astra",
      "providerId": null,
      "sourceType": "benchmark",
      "label": "AA · Astra 与最新编程 Agent 对比",
      "url": "https://artificialanalysis.ai/articles/benchmarking-gpt-6-astra",
      "official": false,
      "watch": [
        "astra",
        "coding agent",
        "terminal-bench"
      ],
      "lastCheckedAt": "2026-09-12T00:13:42.167Z",
      "ok": true,
      "lastSuccessAt": "2026-09-12T00:13:42.167Z",
      "lastSuccessfulWatch": [
        "astra",
        "coding agent",
        "terminal-bench"
      ],
      "sha256": "7da09041db2b619fb2519337e2f89b63ac1cc5d6916aa01a7e5ceef58989ca46",
      "foundSignals": [
        "astra",
        "coding agent",
        "terminal-bench"
      ],
      "changed": true,
      "lastChangedAt": "2026-09-12T00:13:42.167Z",
      "signalChange": null,
      "error": ""
    }
  ],
  "notes": [
    "模型资料人工核实于 2026-09-10；AA 统一 v4.3，日期表示榜单读取日；Arena 保留榜单公布的 2026-09-02。",
    "价格保留各自来源、核实日期及适用条件；Meta 与 Gemini Flash-Lite 当前采用 AA 记录，明确注明。",
    "终端主指标统一为 AA Terminal-Bench 4.0；旧版厂商成绩仅作带日期的专项记录。",
    "新型号不继承旧版分数。Qwen 0902、Command A+、Nova 2 Omni 的可比缺口保持 N/A。",
    "每日任务仅低频串行检查固定来源，失败保留人工核实数据；不会自动将观察词转换为模型或分数。",
    "历史发布节奏只提示关注时间，不承诺发布日期或发布概率。"
  ],
  "curatedAt": "2026-09-10"
};
