# Model Radar Design Canon / 世界大模型雷达设计原典

This document defines the product identity and visual rules for Model Radar.
The radar is the product's primary instrument. Rankings, evidence, events, and
release cadence exist to explain what the radar is showing.

本文定义 Model Radar 的产品身份与视觉规则。雷达是产品的主仪器，排名、证据、
事件和发行节奏共同解释雷达中的信号。

## 1. Product Context / 产品语境

Model Radar answers four questions in one glance:

1. 现在谁在领先？
2. 哪些模型刚刚发布，哪些仍待官方确认？
3. 哪些企业正在接近自己过去常见的发布间隔？
4. 面对当前用途，到底应该选哪个模型？

The product is an observation instrument, not a promise engine. Benchmark
scores are source-backed measurements. Release timing is inferred from public
history and carries no probability. Missing evidence remains visible as `N/A`
with a reason.

产品承担观测与比较职责。Benchmark 分数来自可追溯来源。历史发布节奏根据公开记录
推算，不携带发布概率。缺失证据始终显示为带原因的 `N/A`。用途推荐采用公开权重和
最低证据覆盖，界面只显示选择顺序与覆盖置信，不把内部排序值冒充 benchmark。

### First-glance map / 一眼读取地图

```text
┌──────────────────────────────────────────────────────────────┐
│ WORLD MODEL RADAR       snapshot       mode / metric         │
├──────────────────────────────────────────────┬───────────────┤
│                                              │  NOW          │
│                  RADAR                       │  01 leader    │
│       y = release freshness                  │  02 runner-up │
│       x = selected benchmark                 │  03 mover     │
│                                              ├───────────────┤
│                                              │  INSPECT      │
├──────────────────────────────────────────────┴───────────────┤
│ DECIDE / use case -> winner -> auto rival -> five axes       │
├──────────────────────────────────────────────────────────────┤
│ release timing + released / confirmation / deadline events  │
├──────────────────────────────────────────────────────────────┤
│ evidence ledger / source state                               │
└──────────────────────────────────────────────────────────────┘
```

The reading order is fixed: radar, current order, selected evidence, automatic
choice, five-axis profile, release timing, dated events, source ledger.

阅读顺序固定为：雷达、当前排名、选中证据、自动选型、五维剖面、历史发布节奏、日期事件、来源账本。

## 2. Aesthetic Direction / 美学方向

### Name: Signal Observatory / 信号观测站

The visual reference is a late-1970s control room rebuilt with contemporary web
precision: phosphor geometry, printed instrument labels, hard-edged panels, and
calm motion. It should feel like a purpose-built global model instrument with a
clear point of view.

视觉参考是一间以当代网页精度重建的 1970 年代末控制室：荧光几何线、印刷式仪表
标签、硬边面板和缓慢运动。它应当像一件专门用于观察全球大模型的仪器。

### Preserve / 必须保留

- A large, unmistakable radar in the first viewport.
- Model dots that are directly selectable.
- Hard borders, square geometry, instrument labels, and dense readouts.
- Large flat color blocks where they communicate state.
- Visible freshness, benchmark position, release cadence, and evidence gaps.
- A little theatrical tension: scan sweep, pulse, and dated watch signals.

### Remove / 必须移除

- Generic AI gradients, glass panels, chat metaphors, and glowing decoration.
- A giant editorial headline competing with the data.
- Saturated color applied to every panel.
- Decorative cards that fragment one continuous instrument.
- Opaque aggregate scores, unlabeled mixed harnesses, or hidden benchmark gaps.
- Animation that changes layout or distracts from reading.

## 3. Radar Contract / 雷达契约

The recovered `radar-map` and `model-dots` interaction is the foundation. Its
meaning is updated for the current evidence schema.

| Visual property | Data meaning | Rule |
| --- | --- | --- |
| Horizontal position | Selected benchmark | Right means better for every metric; lower-is-better metrics are inverted. |
| Vertical position | Release freshness | Top means newer; 0 to 180 days maps into the field. |
| Dot color | Provider identity | Provider accent is used on the marker and outline only. |
| Dot size | Hover/focus preview | Only the pointed or keyboard-focused node expands. |
| Dot fill and outer ring | Selection state | Clicking selects the model, fills its node, and keeps a compact provider-colored ring. |
| Solid/dashed outline | Distribution stage | Open-weight models use a dashed outline. |
| Dimmed signal rail | Missing measurement | `N/A` models sit in a dedicated no-signal rail; the inspector states why the value is currently missing. |
| Sweep contact | Current scan | Cosmetic only; it never changes rank or coordinates. |
| Sweep reach | Measured radar rectangle | Diameter is twice the farthest corner distance from the 55% / 50% origin; no viewport-width cap. |
| Label placement | Point identity | Exactly one large label appears for the hovered or keyboard-focused point; selection never keeps a label open. |
| Connector line | Label ownership | The fixed-length provider-colored line belongs to the temporary label and does not scale with the node. |

The radar must remain truthful when metrics switch. A dot moves because the
underlying selected benchmark changed. A missing measurement leaves the active
field instead of receiving a synthetic midpoint.

Model selection never enters the layout solver. Clicking a model only toggles
its active state and updates the readouts. Radar nodes, label coordinates, grid,
rings, and sweep geometry stay fixed until the benchmark or viewport changes.
The five-axis SVG follows the same rule: its grid, axes, labels, and viewport are
created once; selection updates only the two data-shape layers.
On desktop, the radar shell owns its row height. The command strip uses a zero
minimum block size and scrolls model evidence internally, so a longer inspector
can never stretch the radar map or move the scan origin.

切换指标时，模型位置必须跟随真实数据变化。缺失测量的模型离开有效比较区，进入
`NO SIGNAL` 轨道，不使用虚构中位数。

选择模型不参与布局计算。点击只切换选中状态并更新读数；雷达节点、标签坐标、网格、
圆环和扫描束保持固定，只有切换指标或视口尺寸变化时才重新计算。
五维 SVG 使用同一规则：网格、轴线、标签和视口只创建一次，选择模型时只更新两层数据形状。
桌面端雷达外框独立决定行高；右侧详情栏允许缩小并在内部滚动，任何模型的长证据列表都不能
撑高雷达地图或移动扫描中心。

Dense clusters use one temporary identity label at a time. Its precomputed box
avoids model nodes, its connector ends at that box, and pointer exit closes both
the label and connector immediately. Clicking updates the compact selected-node
ring and the readouts without keeping the hover label visible.

高密度区域每次只显示一个临时名称框。预计算位置避开模型节点，引导线终点固定在名称框；
鼠标离开后名称框与引导线立即关闭。点击只更新紧凑的选中外环和读数，不让悬浮框常驻。

### Five-axis profile contract / 五维剖面契约

| Axis | Source value | Visual direction |
| --- | --- | --- |
| 智能 / INTEL | Artificial Analysis Intelligence Index | Higher plots farther outward. |
| 偏好 / PREFERENCE | Arena Text Elo | Higher plots farther outward. |
| 速度 / SPEED | Artificial Analysis output tokens per second | Higher plots farther outward. |
| 价格效率 / VALUE | Public API output price | Lower price plots farther outward. |
| 上下文 / CONTEXT | Advertised context window | Higher plots farther outward. |

Each axis is normalized only against its own documented display range. The raw
value remains beside the chart. Price efficiency uses a documented logarithmic
display scale so sub-dollar differences remain legible. A complete `5/5` profile
may close and fill its polygon. An incomplete profile draws only adjacent known
segments; missing axes use an `N/A` mark and a verification reason. Engineering
and agent benchmarks remain in the raw specialist-evidence area.

每条轴只在自己的公开显示区间内归一化，原始值始终放在图旁。价格效率采用标注过的
对数轴，让低价区差异仍然可见。完整的 `5/5` 剖面允许封闭并填色；数据不完整时只
连接相邻的已知点，缺失轴显示 `N/A` 标记和核对原因。SWE-Bench、Terminal-Bench、
AA Coding Agent Index 与其他专项评测继续显示在模型证据区，不拿缺失项强行补齐图形。

### Automatic choice contract / 自动选型契约

The user chooses a use case, not an arbitrary model pair. The system ranks all
models with documented weights, rejects rows below the evidence threshold, and
automatically compares the selected model with the current winner. If the
selected model is already the winner, the strongest eligible model from another
provider becomes the comparison.

用户只选择用途，无需手动排列模型组合。系统按照固定权重排序，低于证据门槛的模型
不进入推荐；当前模型会自动和该用途首选对比。当前模型已经是首选时，自动对手改为
其他供应商中证据充分且排名最高的模型。

| Mode | Weights | Minimum evidence |
| --- | --- | --- |
| 综合 | AA 30%, Arena 20%, speed 18%, output price 17%, context 15% | 70% |
| 编程 Agent | AA Coding Agent 30%, Terminal 35%, SWE Pro 10%, ALE 10%, AA 5%, speed 5%, price 5% | 50% |
| 高吞吐 | speed 50%, AA 15%, output price 20%, context 15% | 75% |
| 性价比 | output price 45%, AA 25%, speed 20%, context 10% | 75% |

The internal weighted value only orders candidates. The UI displays rank and
evidence coverage, never that internal value as if it were a measured score.

## 4. Typography / 字体

Two voices are enough:

- Display and controls: `Bahnschrift`, `Aptos Display`, `Microsoft YaHei UI`.
- Values and metadata: `Cascadia Mono`, `IBM Plex Mono`, `Consolas`.

Display type may be wide and blunt in the mast and selected model name. Compact
panels use normal-size headings. All letter spacing is `0`; uppercase is reserved
for short instrument labels.

标题可以宽、硬、有机械感。紧凑面板中的标题保持正常尺寸。所有字距为 `0`，大写只
用于短仪表标签。

## 5. Color / 色彩

The palette restores the original radar identity while assigning each color a
single job.

| Token | Value | Job |
| --- | --- | --- |
| Night | `#11120F` | Main instrument field |
| Panel | `#1B1E19` | Secondary dark surfaces |
| Paper | `#ECE7D6` | Readable evidence surfaces and text |
| Muted | `#999482` | Secondary labels |
| Acid | `#CFFF26` | Radar geometry, active metric, scan state |
| Hot | `#FF5A1F` | New release and urgent watch signal |
| Sky | `#35A7FF` | Informational event and source link |
| Rose | `#EF5D91` | Deadline pressure only |

Rules:

- The radar field stays dark.
- Acid may occupy one structural block and active controls.
- Hot and rose appear only where time pressure exists.
- Provider accents stay local to model signals.
- Paper panels provide visual rest and long-form readability.
- No gradients except the radar sweep mask and subtle scan texture.

Provider-family accents are brand-inspired interface colors, not claims about
legal logo-color specifications. A family keeps one hue across the radar,
inspector, and five-axis profile.

A model row may define its own `accent` only when that model has a clearly
source-backed visual identity. Otherwise it inherits the provider-family hue;
unverified model-by-model color variation is not invented.

| Family | Accent | Basis |
| --- | --- | --- |
| OpenAI | `#E8E6DF` | Monochrome identity / warm neutral |
| Claude / Anthropic | `#D97757` | Terracotta orange-red |
| Google | `#4285F4` | Google blue |
| xAI | `#C7C9C2` | Monochrome silver |
| DeepSeek | `#4D6BFE` | DeepSeek blue |
| Moonshot / Kimi | `#D85C9A` | Restrained magenta fallback |
| Mistral | `#F0A202` | Amber/orange |
| Qwen | `#7C6CF2` | Indigo fallback |
| Meta | `#168CF0` | Meta blue |
| Cohere | `#73C69A` | Cohere green |
| Amazon Nova | `#FF9900` | Amazon orange |
| Z.ai / GLM | `#E5484D` | Warm red fallback |

## 6. Spacing And Layout / 间距与布局

The base rhythm is `4px`. Major gaps use `8 / 12 / 16 / 24 / 32px`.

- Desktop instrument width: full viewport up to `1800px`.
- First-view radar height: `min(72vh, 760px)`, never below `590px` on desktop.
- Radar and command rail: `minmax(0, 1fr) / 340px`.
- Corners: `0` on instrument structure, up to `4px` on small buttons.
- Borders: `1px` paper or low-opacity paper; active model uses `2px`.
- No card nesting. Sections form continuous horizontal bands.

On narrow screens the command rail moves below the radar. The radar keeps a
stable square-like field with a minimum usable height. Model labels become short
callsigns; the full model identity remains in the inspector.

窄屏下，指挥栏移动到雷达下方。雷达保留稳定、近似方形的有效区域。模型标签使用短
呼号，完整名称继续显示在详情区。

## 7. Interaction / 交互

### Metric switch

- Use a segmented instrument strip.
- Click or use Left/Right/Home/End.
- Every switch animates dots to their new evidence-backed coordinates.
- The axis, leader list, coverage, source date, and selected value update together.

### Model selection

- Click a radar dot or ranking row.
- Selection is shared by radar, ranking, and inspector.
- The active dot rises above overlaps and exposes its value.
- Keyboard focus is visible and uses the same selection state.

### Time and cadence

- Dated events use `已发生`, `待官方确认`, and `将到期`.
- Release timing uses `days since latest / historical average interval`.
- Status labels are `周期前段`, `接近常见区间`, `进入常见区间`, and `超过常见区间`.
- Every inferred window includes an explicit `推测关注窗口` label.
- Dated events link to their source when available.

## 8. Motion / 动效

Motion should feel physical and slow:

- Radar sweep: `12s` linear rotation.
- Sweep radius extends beyond the outer ring and clips only at the radar field boundary.
- Scan pulse: `2.4s` soft opacity cycle on the center point.
- Dot movement: `420ms` with an ease-out curve.
- Selection response: `140ms`.
- No page-entry choreography and no continuous panel movement.
- `prefers-reduced-motion` disables sweep, pulse, and coordinate transitions.

## 9. Content Rules / 内容规则

- Lead with model name and raw value.
- Show the selected benchmark's direction and measurement date.
- Keep evidence labels explicit: `INDEPENDENT`, `VENDOR`, `PRELIM`, `LIST`, and reasoned `N/A`.
- Keep source links attached to the data they support.
- Write inferred cadence as historical timing, never as probability or a promised launch date.
- Keep product copy short. The instrument itself teaches the interaction.

## 10. Decisions Log / 决策记录

### 2026-08-06: Recover radar primacy

The research-desk exploration improved evidence presentation but removed the
signature spatial model. The new local edition restores `radar-map` and
`model-dots` as the first-view center of gravity.

### 2026-08-06: Replace aggregate position with active benchmark

The historical radar used a subjective normalized aggregate. The current data
model has source-backed benchmark values and explicit missing data. Horizontal
position now follows the selected metric, with lower-is-better inversion.

### 2026-08-06: Separate identity color from state color

Provider accents identify model dots. Acid, hot, sky, and rose communicate UI
state and time pressure. This preserves the original energy while controlling
visual noise.

### 2026-08-06: Keep the new edition local during review

The new edition uses an independent `radar.html` entry. The deployed root and
the uncommitted V2 exploration stay untouched until visual review is complete.

### 2026-08-07: Add an honest five-axis model profile

The world radar remains the primary view. A second profile instrument compares
five source-backed dimensions. Incomplete profiles retain visible breaks, and
every missing cell explains its current verification state.

### 2026-08-07: Replace time jargon and stabilize family colors

`发行压力` becomes `历史发布节奏`; `发生与将至` becomes three explicit event
states. Provider-family accents now remain stable across every model view, with
Claude terracotta, DeepSeek blue, and OpenAI monochrome as anchor identities.

### 2026-08-07: Resolve dense signal clusters

Fixed label offsets failed when several frontier models occupied the same
high-score zone. Labels now use deterministic collision avoidance, preserve
node visibility, and draw connector lines. The scan arm also extends beyond the
outer ring so the sweep reads as a full radar beam.

### 2026-08-07: Replace manual pairing with use-case decisions

Manual comparison forced the user to enumerate combinations before learning
anything. Four use-case modes now select a winner and a relevant comparison
automatically. The five-axis surface moves to broadly covered decision metrics;
engineering and agent benchmarks remain visible as raw specialist evidence.

### 2026-08-07: Measure scan reach and expand evidence depth

The former `1180px` sweep cap failed on wide radar fields. Sweep diameter now
comes from the farthest corner of the measured field and is tested at 2K and
narrow sizes. DeepSeek-V4 Flash 0731 adds independent intelligence, speed,
Terminal-Bench and GDPval results beside its provider-reported agent suite; the
source ledger gains dedicated Coding Agent, GDPval-AA, and AA-Briefcase entries.
