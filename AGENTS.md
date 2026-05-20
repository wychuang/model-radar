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

The daily refresh is a normal official-doc checker, not a crawler or security
tool. Keep it boring:

每日刷新只是普通官方文档检查器，不是爬虫或网安工具。保持克制：

- Fixed official URL allowlist only.
- Serial low-frequency requests only.
- No login, cookies, proxying, endpoint discovery, fuzzing, bypassing, or high-frequency retry.
- Preserve the previous curated model rows if sources fail.

## Product Taste / 产品审美

- The first screen should be the dashboard itself, not a landing page.
- Favor giant flat color blocks, compact source-backed labels, and a retro-future control-room feel.
- Avoid generic AI product cues: purple gradients, chat bubbles, glass cards, glowing orbs, mascot art.
- Make "what changed" and "what may be next" obvious at a glance.

- 第一屏就是仪表盘，不做落地页。
- 倾向大色块、紧凑来源标签、复古未来控制室气质。
- 避免常见 AI 产品符号：紫色渐变、聊天气泡、玻璃卡片、发光圆球、吉祥物插画。
- 让“发生了什么”和“可能接下来发生什么”一眼可见。
