# Model Radar / 世界大模型雷达

Model Radar is a static dashboard for tracking official frontier LLM releases,
performance posture, source changes, and inferred release-cycle pressure.

世界大模型雷达是一个静态网页应用，用来查看官方大模型更新、能力姿态、来源变化，以及根据公开发布时间点推断出的发行周期压力。

## What It Shows / 展示内容

- Latest official model rows from a fixed allowlist of provider sources.
- A capability radar across reasoning, coding, agentic work, multimodal ability,
  context, and cost pressure.
- Release clocks that show watch windows without promising exact launch dates.
- A source panel linking directly to official pages.

- 固定白名单官方来源里的最新模型条目。
- 从推理、代码、agent 工作、多模态、上下文、成本压力组成的能力雷达。
- 只提示观察窗口、不承诺具体发布日期的发行周期钟。
- 直接跳转官方页面的来源面板。

## Run / 运行

```powershell
npm start
```

Open:

```text
http://127.0.0.1:4174/
```

## Refresh / 刷新

```powershell
npm run update
```

The refresh job is deliberately low-risk: one daily pass over a small fixed
official-source allowlist, serial requests, no login, no cookies, no proxy, no
crawling, no endpoint discovery, no bypass behavior, and no repeated aggressive
retry loop.

刷新任务刻意保持低风控：每天一次，只访问少量固定官方来源，串行请求，不登录、不带 cookie、不使用代理、不爬取扩展链接、不做接口探测、不做绕过，也不做高频重试。

GitHub Actions schedule:

```text
.github/workflows/model-radar.yml
```

GitHub Pages deployment:

```text
.github/workflows/pages.yml
```

Expected public URL after the first successful deployment:

```text
https://wychuang.github.io/model-radar/
```

Optional local Windows task registration script:

```powershell
.\scripts\register-daily-task.ps1 -Time "06:12"
```

## Verify / 验证

```powershell
npm test
```

```powershell
.\scripts\check.ps1
```

## Data Caveat / 数据说明

Scores are a compact situational-awareness layer, not a lab benchmark. They
combine official model information, public source posture, context windows,
pricing pressure, and release recency into a visual scan.

分数不是实验室基准，而是面向“快速看懂世界变化”的态势层：综合官方模型信息、公开来源姿态、上下文窗口、价格压力和发布时间新鲜度。
