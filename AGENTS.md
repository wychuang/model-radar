# Agent Notes for Model Radar / Agent 工作说明

This project lives at `F:\Projects\codex\apps\model-radar`.

本项目位于 `F:\Projects\codex\apps\model-radar`。

## Boundaries / 边界

- Keep changes inside this project unless updating `F:\Projects\WORKSPACE.md`.
- Do not move or edit sibling projects.
- Do not turn `F:\Projects\codex` into a single git repository.
- Keep the app dependency-free unless the user explicitly asks for a framework.

- 除了同步更新 `F:\Projects\WORKSPACE.md`，修改应限制在本项目内。
- 不要移动或编辑同级项目。
- 不要把 `F:\Projects\codex` 变成一个总仓库。
- 除非用户明确要求框架，否则保持无依赖。

## Refresh Safety / 刷新安全

The daily refresh is a small public-source checker. Keep it boring:

每日刷新只是小型公开来源检查器。保持克制：

- Fixed provider and benchmark URL allowlist only.
- Serial low-frequency requests only.
- No login, cookies, proxying, endpoint discovery, fuzzing, bypassing, or high-frequency retry.
- Preserve the previous curated model rows if sources fail.

## Product Taste / 产品审美

- Read `DESIGN.md` before changing the radar-first edition. It is the product's visual and interaction canon.
- Keep `radar-map` and directly selectable `model-dots` as the first-view center of gravity.
- Use the selected source-backed benchmark for horizontal position and release freshness for vertical position.
- Keep missing measurements in the visible `NO SIGNAL` lane.
- Assign color by job: provider-family accents identify signals; acid marks scan state; hot/rose mark dated events; paper provides rest.
- Keep Claude in terracotta orange-red, DeepSeek in blue, and OpenAI in a monochrome neutral. Use restrained brand-inspired fallbacks for other families.
- Allow a model-level accent override only when a source-backed model identity supports it; otherwise inherit the provider-family accent.
- Keep the five-axis decision surface on broadly covered metrics: intelligence, preference, output speed, price efficiency, and context.
- Use `model-choice.mjs` for use-case recommendations. Keep weights explicit, enforce evidence coverage, and never present the internal ordering value as a benchmark score.
- Keep engineering and agent benchmarks as raw specialist evidence; preserve `N/A` where a comparable run is unavailable.
- Keep the Apple-inspired desk and radar observatory on the same seven primary metrics. Show specialist metrics only as measured, model-specific evidence, and keep a direct switch between the two published views.
- Keep dense radar clusters readable with one hover/focus label at a time; the fixed connector belongs to that label, while click selection uses only node fill/ring and readouts.
- Keep model selection geometry-free: a click may update active styling and readouts, but must not rebuild or reposition the radar layer.
- Keep the desktop command strip at `min-height: 0` inside a fixed radar grid row; long inspector evidence must scroll internally.
- Size the scan sweep from the measured radar rectangle so wide displays reach the farthest corner.

- The first screen should be the dashboard itself, not a landing page.
- Favor a retro-future observatory feel: dark radar field, hard instrument borders, normal-width type, paper readout surfaces, and restrained state colors.
- Keep the information dense but visually calm enough for long monitoring sessions.
- Avoid generic AI product cues: purple gradients, chat bubbles, glass cards, glowing orbs, mascot art.
- Make "what changed" and "what may be next" obvious at a glance.
- Preserve raw benchmark values, source dates, provenance labels, and visible `N/A` gaps.
- Treat release clocks as historical timing hints, never as promised launch dates or probabilities.

- 修改雷达优先版本前先阅读 `DESIGN.md`，它是本产品的视觉与交互原典。
- 首屏视觉重心保持为 `radar-map` 和可直接选择的 `model-dots`。
- 横轴使用当前选择的可追溯 benchmark，纵轴使用发布新鲜度。
- 缺失测量放入清晰可见的 `NO SIGNAL` 轨道。
- 色彩各司其职：供应商色识别信号，酸绿色表示扫描状态，橙色与玫红表示时间压力，纸色提供视觉休息。
- 第一屏就是仪表盘，不做落地页。
- 倾向复古未来观测站：深色雷达场、硬边仪表线、正常字宽、纸色读数面和克制的状态色。
- 信息可以密集，视觉必须适合长时间查看。
- 避免常见 AI 产品符号：紫色渐变、聊天气泡、玻璃卡片、发光圆球、吉祥物插画。
- 让“发生了什么”和“可能接下来发生什么”一眼可见。
- 保留 benchmark 原始值、来源日期、口径标签和清晰的 `N/A` 缺口。
- Claude 使用陶土橙红，DeepSeek 使用蓝色，OpenAI 使用黑白中性色；其他家族使用克制、和谐的品牌启发色。
- 只有模型自身存在可追溯的视觉识别时才覆盖家族色；其余型号继承供应商家族色。
- 五维选型面使用覆盖较广的智能、偏好、生成速度、价格效率和上下文；缺失维度保留断点，不能把 `N/A` 当成零分。
- 用 `model-choice.mjs` 维护用途推荐，权重和证据门槛必须明确，内部排序值不能伪装成 benchmark 分数。
- 工程与 Agent benchmark 保留为专项原始证据；没有同口径结果时继续显示 `N/A`。
- 高密度雷达区域每次只显示一个悬浮或键盘聚焦名称框；固定引导线属于名称框，点击选中只使用节点填充、外环和读数。
- 模型选择不能触发布局：点击只更新选中样式和读数，不得重建或移动雷达图层。
- 桌面端右侧详情栏在固定雷达网格行内保持 `min-height: 0`，长证据列表必须内部滚动。
- 扫描束尺寸根据实际雷达矩形计算，宽屏下必须覆盖最远角。
- 历史发布节奏只表示观察提示，不能写成承诺发布日期、发布概率或官方倒计时。
