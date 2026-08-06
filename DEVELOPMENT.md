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
  -> app.mjs renders the switchboard
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
- `scripts/update-model-radar.mjs`: serial low-frequency source checker and snapshot writer.
- `.github/workflows/model-radar.yml`: daily snapshot refresh.
- GitHub Pages: branch deployment from the `main` repository root.

## Editing Data / 编辑数据

1. Confirm the model on an official provider page.
2. Update the provider `latestModelId` and `releaseHistory`.
3. Add or replace the model row and connect at least one official `sourceRef`.
4. Add benchmark entries only when the model variant, harness, value, and date can be identified.
5. Set `provenance: "vendor-reported"` or `preliminary: true` when applicable.
6. Leave missing metrics absent; the UI will render `N/A`.
7. Run `npm run update`, then `npm test`.

1. 先用企业官方页面确认模型。
2. 更新 provider 的 `latestModelId` 和 `releaseHistory`。
3. 添加或替换模型行，并连接至少一个官方 `sourceRef`。
4. 能确认模型变体、harness、数值和日期时，才录入 benchmark。
5. 厂商自报或初步结果分别填写 `provenance: "vendor-reported"`、`preliminary: true`。
6. 缺失指标保持为空，界面会显示 `N/A`。
7. 运行 `npm run update`，随后运行 `npm test`。

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
