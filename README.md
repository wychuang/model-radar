# Model Radar / 世界大模型雷达

Model Radar is a static, source-backed switchboard for current frontier models,
benchmark rankings, official launches, and inferred provider release cadence.

世界大模型雷达是一块可追溯来源的静态观察台，用来切换查看前沿模型排名、官方发布、benchmark 覆盖和企业发行节奏。

Public site / 在线页面:

<https://wychuang.github.io/model-radar/>

V2 research desk / V2 研究桌面:

<https://wychuang.github.io/model-radar/v2.html>

Radar observatory / 雷达观测站:

<https://wychuang.github.io/model-radar/radar.html>

V2 keeps the same curated snapshot and ranking logic while presenting the
current leader, NOW/NEXT signals, evidence labels, and release timing in a
responsive evidence workspace. Its main switcher uses the same seven comparable
metrics as the radar observatory, while model-specific specialist scores appear
only when an exact measured row exists. Both views link directly to each other.

V2 继续使用同一份人工确认快照与排序逻辑，并把当前领先、NOW/NEXT 信号、
证据标签和发布节奏组织为响应式研究桌面。主切换器与雷达观测站共用七项可比指标，
模型专项分数只在存在完全匹配的实测记录时显示。两个视图可直接来回切换。

Radar observatory details / 雷达观测站说明:

<http://127.0.0.1:4174/radar.html>

The local radar edition restores the original spatial `radar-map / model-dots`
identity. Its horizontal axis follows the selected source-backed benchmark,
its vertical axis shows release freshness, and missing measurements move into a
visible `NO SIGNAL` lane with a verification reason. A second five-axis decision
profile compares intelligence, preference, output speed, price efficiency, and
context coverage. Four use-case modes automatically select the strongest current
choice and the most relevant alternative; engineering and agent benchmarks stay
visible as separate raw evidence. The visual and interaction rules live in
[`DESIGN.md`](./DESIGN.md).

本地雷达版恢复原始 `radar-map / model-dots` 空间交互。横轴跟随当前选择的可追溯
benchmark，纵轴显示发布新鲜度，缺失测量进入清晰的 `NO SIGNAL` 轨道。视觉与
详情会说明当前缺失原因。第二层五维选型对比智能、偏好、生成速度、价格效率和上下文，
并按综合、编程 Agent、高吞吐、性价比四种用途自动给出首选与最相关替代。工程与 Agent
专项 benchmark 保留原始分值。视觉与交互规则记录在 [`DESIGN.md`](./DESIGN.md)。

## What It Shows / 展示内容

- 14 current model rows across 12 provider lanes, including DeepSeek-V4 Flash 0731.
- Seven switchable views: Artificial Analysis Intelligence Index, Arena Text,
  output speed, SWE-Bench Pro, Terminal-Bench, output price, and advertised context.
- Raw values, measurement dates, source links, preliminary/vendor labels, and
  visible `N/A` cells where comparable evidence is missing.
- A five-axis decision profile with four automatic use-case recommendations,
  coverage gates, honest gaps, and provider-family colors.
- Model-specific specialist evidence including AA Coding Agent Index, GDPval-AA,
  AA-Briefcase, Agents' Last Exam, and DeepSeek's published agent suite.
- Dated release/confirmation/deadline events and cadence windows inferred from public release dates.
- Additional watched sources for ARC Prize and Agents Last Exam.

- 12 家企业、14 个当前模型条目，包含 DeepSeek-V4 Flash 0731。
- 7 种可切换视图：AA 智力指数、Arena 人类偏好、生成速度、SWE-Bench Pro、
  Terminal-Bench、输出价格、标称上下文。
- 展示原始分值、测量日期、来源链接、初步/厂商自报标签；缺少可比证据时明确显示 `N/A`。
- 带证据门槛、真实缺口、模型家族色和四种用途自动推荐的五维选型。
- 模型详情按需显示 AA Coding Agent Index、GDPval-AA、AA-Briefcase、
  Agents' Last Exam 和 DeepSeek 官方 Agent 套件等专项原始分数。
- 已发布、待确认、截止事件，以及根据公开发布日期推算的历史节奏窗口。
- 额外观察 ARC Prize 和 Agents Last Exam。

## Run / 运行

```powershell
npm start
```

Open <http://127.0.0.1:4174/>.

Open V2 at <http://127.0.0.1:4174/v2.html>.

Open the local radar edition at <http://127.0.0.1:4174/radar.html>.

## Refresh / 刷新

```powershell
npm run update
```

The refresh performs one serial pass over a fixed 23-page allowlist. It records
freshness, page hashes, failures, and watched terms. It has no login, cookies,
proxy, link crawling, endpoint discovery, bypass behavior, or retry loop.

刷新任务每天串行检查固定的 23 个公开页面，记录新鲜度、页面摘要、失败状态和观察词。任务不登录、不带 cookie、不使用代理、不扩展爬取链接、不探测接口、不绕过限制，也不进行循环重试。

Benchmark values stay curated because leaderboards use different harnesses,
variants, and update schedules. A source page change becomes a review signal;
it does not silently overwrite a score.

Benchmark 分数保留人工确认流程，因为各榜单的 harness、模型变体和更新时间并不统一。来源页面变化会形成复核信号，不会静默覆盖已有分数。

GitHub automation:

```text
.github/workflows/model-radar.yml  # daily source check and snapshot commit
main / repository root             # GitHub Pages branch deployment
```

GitHub Pages serves the repository root directly from `main`. This keeps the
static deployment independent from the daily source-check workflow.

GitHub Pages 直接发布 `main` 根目录，静态页面部署与每日来源检查互不依赖。

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
| `N/A / 榜单未确认` | The checked leaderboard has no exact model/version row. / 已核对榜单没有完全同名、同版本条目。 |
| `N/A / 未公布同口径成绩` | No same-version benchmark and harness result was confirmed. / 未确认同版本、同 benchmark 与同 harness 成绩。 |
| `N/A / 公开价格未确认` | No directly comparable public API output price was confirmed. / 未确认可直接比较的公开 API 输出价格。 |

Release timing uses `days since latest release / average historical interval`.
`1.0` means the elapsed time has reached that provider's historical average.
It is an attention hint; it carries no launch probability and no official countdown.

历史发布节奏使用“距最近一次发布的天数 / 过去平均发布间隔”。`1.0` 表示已经走到
该企业过去的平均间隔附近。它只用于安排观察注意力，不代表发布概率或官方倒计时。
