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

- The first screen should be the dashboard itself, not a landing page.
- Favor a quiet research-terminal feel: neutral surfaces, normal-width type, fine rules, and one restrained signal color.
- Keep the information dense but visually calm enough for long monitoring sessions.
- Avoid generic AI product cues: purple gradients, chat bubbles, glass cards, glowing orbs, mascot art.
- Make "what changed" and "what may be next" obvious at a glance.
- Preserve raw benchmark values, source dates, provenance labels, and visible `N/A` gaps.
- Treat release clocks as observation pressure, never as promised launch dates.

- 第一屏就是仪表盘，不做落地页。
- 倾向安静的研究终端：中性底色、正常字宽、细分隔线，只使用一种克制的信号色。
- 信息可以密集，视觉必须适合长时间查看。
- 避免常见 AI 产品符号：紫色渐变、聊天气泡、玻璃卡片、发光圆球、吉祥物插画。
- 让“发生了什么”和“可能接下来发生什么”一眼可见。
- 保留 benchmark 原始值、来源日期、口径标签和清晰的 `N/A` 缺口。
- 发行压力钟只表示观察压力，不能写成承诺发布日期。
