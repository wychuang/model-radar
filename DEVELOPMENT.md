# Development / 开发说明

This is a dependency-free static app using browser ES modules and Node's built-in
test runner.

这是一个无依赖静态应用，使用浏览器 ES modules 和 Node 内置测试运行器。

## Commands / 命令

```powershell
npm start
npm test
npm run update
.\scripts\check.ps1
```

## Data Flow / 数据流

```text
model-radar-seed.mjs
  -> update-model-radar.mjs checks fixed public pages
  -> model-radar-snapshot.mjs
  -> model-radar.mjs validates and ranks each metric
  -> app.mjs renders V1 / app-v2.mjs renders the V2 research desk
  -> radar-layout.mjs projects truthful benchmark/freshness coordinates
  -> model-profile.mjs builds five-axis profiles and missing-data reasons
  -> model-choice.mjs ranks use-case choices with explicit weights and coverage gates
  -> app-radar.mjs renders the local radar observatory
```

The updater records source status only. Curated models, events, prices, and
benchmark values remain unchanged until reviewed in the seed file.

更新器只记录来源状态。模型、事件、价格和 benchmark 分值需要在 seed 文件中确认后更新。

## Files / 文件

- `src/model-radar-seed.mjs`: providers, models, benchmark definitions, events, values, and fixed sources.
- `src/model-radar-snapshot.mjs`: generated static snapshot consumed by the UI.
- `src/model-radar.mjs`: validation, metric ranking, coverage, formatting, and release-clock logic.
- `src/ui-helpers.mjs`: pure display helpers.
- `src/app.mjs`: DOM rendering, metric tabs, model selection, and source links.
- `src/app-v2.mjs`: Apple-inspired research desk with the shared seven-metric switcher, measured specialist evidence, linked ranking/inspector interactions, events, clocks, and source ledger.
- `v2.html` and `styles-v2.css`: standalone V2 entry point and responsive visual system; all paths remain relative for GitHub Pages subpaths.
- `DESIGN.md`: product identity, radar semantics, palette, layout, motion, and content rules.
- `src/radar-layout.mjs`: pure benchmark/freshness projection and compact signal labels.
- `src/model-profile.mjs`: five-axis normalization, incomplete geometry, and reasoned missing states.
- `src/model-choice.mjs`: transparent use-case weights, evidence coverage, ranking, and automatic comparison selection.
- `src/app-radar.mjs`: linked radar, five-axis profile, metric, ranking, inspector, event, cadence, and source interactions.
- `radar.html` and `styles-radar.css`: published radar-first entry with a direct switch to the Apple-inspired research desk.
- `scripts/update-model-radar.mjs`: serial low-frequency source checker and snapshot writer.
- `.github/workflows/model-radar.yml`: daily snapshot refresh.
- GitHub Pages: branch deployment from the `main` repository root.

## Editing Data / 编辑数据

1. Confirm the model on an official provider page.
2. Update the provider `latestModelId` and `releaseHistory`.
3. Add or replace the model row and connect at least one official `sourceRef`.
4. Add benchmark entries only when the model variant, harness, value, and date can be identified.
5. Set `provenance: "vendor-reported"` or `preliminary: true` when applicable.
6. Leave missing metrics absent; the UI will render `N/A` with a reason based on metric type.
7. Run `npm run update`, then `npm test`.

1. 先用企业官方页面确认模型。
2. 更新 provider 的 `latestModelId` 和 `releaseHistory`。
3. 添加或替换模型行，并连接至少一个官方 `sourceRef`。
4. 能确认模型变体、harness、数值和日期时，才录入 benchmark。
5. 厂商自报或初步结果分别填写 `provenance: "vendor-reported"`、`preliminary: true`。
6. 缺失指标保持为空，界面会根据指标类型显示 `N/A` 及原因。
7. 运行 `npm run update`，随后运行 `npm test`。

## V2 Verification / V2 验证

Run `npm start`, then inspect `/v2.html` at 1440px, 768px, and 375px. The metric
picker may scroll inside its own boundary on narrow screens; the document itself
must not gain horizontal overflow. Metric tabs support Left/Right/Home/End, and
ranking rows support Up/Down/Home/End. The main picker must contain the same seven
metrics as the radar page. Specialist evidence only renders measured rows for the
selected model, and the `RADAR VIEW` link must remain visible on mobile.

运行 `npm start` 后，在 1440px、768px 和 375px 下检查 `/v2.html`。窄屏时指标
选择器允许在控件内部横向滚动，页面本身不能出现横向溢出。指标标签支持
Left/Right/Home/End，排名行支持 Up/Down/Home/End。主指标必须与雷达页保持同样的
七项口径；专项证据仅显示所选模型已有实测值的项目；移动端保留 `RADAR VIEW` 入口。

## Radar Edition Verification / 雷达版验证

Run `npm start`, then inspect `/radar.html` at desktop and narrow viewports.
Verify that changing metrics moves model signals, lower-is-better metrics still
place better values toward the right, missing measurements stay in `NO SIGNAL`,
radar/leader/inspector selection remains linked, and incomplete five-axis
profiles never close across a missing dimension. In dense top-score clusters,
selected/top-three labels must stay disjoint, avoid model nodes, and retain
visible connector lines. At 2560px width, the scan sweep must reach the farthest
corner of the measured radar field. The four decision modes must update the
winner and automatic comparison without exposing a manual pair selector.

运行 `npm start` 后，在桌面与窄屏视口检查 `/radar.html`。确认切换指标会移动模型
信号；越低越优的指标仍把更优值放在右侧；缺失测量停留在 `NO SIGNAL`；雷达、
排名和详情选择保持联动；五维剖面遇到缺失维度时不封闭连线。
高分密集区还需确认选中项与前三名标签互不遮挡、不压住模型节点，并保留清晰引导线。
在 2560px 宽屏下，扫描束必须覆盖实际雷达区域的最远角。四种选型用途需自动更新首选
和对手，界面不再提供手动排列组合下拉框。

## Low-Risk Source Rules / 低风控来源规则

- Keep every URL fixed in `src/model-radar-seed.mjs` and mirrored in the exact-host allowlist.
- Keep requests serial, daily, and retry-free.
- Do not add authentication, cookies, proxies, stealth headers, CAPTCHA handling,
  link discovery, endpoint discovery, or security probing.
- Preserve curated rows when a source fails; inspect `ok`, `error`, and `changed` in the generated snapshot.

- URL 固定写在 `src/model-radar-seed.mjs`，并同步加入精确主机白名单。
- 请求保持串行、每天一次、无重试。
- 不加入登录、cookie、代理、伪装请求头、验证码处理、链接发现、接口发现或安全探测。
- 来源失败时保留人工整理行，通过生成快照里的 `ok`、`error`、`changed` 复核。
