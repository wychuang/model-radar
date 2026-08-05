# Model Radar / 世界大模型雷达

Model Radar is a static, source-backed switchboard for current frontier models,
benchmark rankings, official launches, and inferred provider release cadence.

世界大模型雷达是一块可追溯来源的静态观察台，用来切换查看前沿模型排名、官方发布、benchmark 覆盖和企业发行节奏。

Public site / 在线页面:

<https://wychuang.github.io/model-radar/>

## What It Shows / 展示内容

- 13 current model rows across 12 provider lanes.
- Six switchable views: Artificial Analysis Intelligence Index, Arena Text,
  SWE-Bench Pro, Terminal-Bench, output price, and advertised context.
- Raw values, measurement dates, source links, preliminary/vendor labels, and
  visible `N/A` cells where comparable evidence is missing.
- A NOW/NEXT event line and release clocks inferred from public release dates.
- Additional watched sources for ARC Prize and Agents Last Exam.

- 12 家企业、13 个当前模型条目。
- 6 种可切换视图：AA 智力指数、Arena 人类偏好、SWE-Bench Pro、
  Terminal-Bench、输出价格、标称上下文。
- 展示原始分值、测量日期、来源链接、初步/厂商自报标签；缺少可比证据时明确显示 `N/A`。
- NOW/NEXT 世界线，以及根据公开发布日期推断的发行压力钟。
- 额外观察 ARC Prize 和 Agents Last Exam。

## Run / 运行

```powershell
npm start
```

Open <http://127.0.0.1:4174/>.

## Refresh / 刷新

```powershell
npm run update
```

The refresh performs one serial pass over a fixed 19-page allowlist. It records
freshness, page hashes, failures, and watched terms. It has no login, cookies,
proxy, link crawling, endpoint discovery, bypass behavior, or retry loop.

刷新任务每天串行检查固定的 19 个公开页面，记录新鲜度、页面摘要、失败状态和观察词。任务不登录、不带 cookie、不使用代理、不扩展爬取链接、不探测接口、不绕过限制，也不进行循环重试。

Benchmark values stay curated because leaderboards use different harnesses,
variants, and update schedules. A source page change becomes a review signal;
it does not silently overwrite a score.

Benchmark 分数保留人工确认流程，因为各榜单的 harness、模型变体和更新时间并不统一。来源页面变化会形成复核信号，不会静默覆盖已有分数。

GitHub automation:

```text
.github/workflows/model-radar.yml  # daily source check and snapshot commit
.github/workflows/pages.yml        # GitHub Pages deployment
```

## Verify / 验证

```powershell
npm test
.\scripts\check.ps1
```

## Reading Scores / 读分规则

| Label | Meaning / 含义 |
| --- | --- |
| `INDEPENDENT` | Value taken from the named independent leaderboard. / 独立榜单分值。 |
| `VENDOR` | Vendor-reported result; benchmark and harness version still matter. / 厂商自报结果，仍需核对 benchmark 与 harness 版本。 |
| `PRELIM` | Preliminary leaderboard row. / 尚未稳定的榜单条目。 |
| `LIST` | Public list price or advertised context. / 公开标价或标称上下文。 |
| `N/A` | Comparable source coverage is missing. / 缺少可比来源。 |

Release clocks are pattern estimates for attention management. Exact launch
dates always require an official announcement.

发行压力钟用于安排观察注意力。具体发布日期始终以企业官方公告为准。
