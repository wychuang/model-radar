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

## Files / 文件

- `src/model-radar-seed.mjs`: curated providers, models, official source allowlist, score vectors, and release dots.
- `src/model-radar-snapshot.mjs`: generated static snapshot consumed by the UI.
- `src/model-radar.mjs`: pure ranking, release-clock, validation, and view-model logic.
- `src/ui-helpers.mjs`: pure display helpers for compact radar labels and styles.
- `src/app.mjs`: DOM rendering and dashboard interaction.
- `scripts/update-model-radar.mjs`: low-frequency official-source checker and snapshot writer.
- `scripts/register-daily-task.ps1`: optional Windows Task Scheduler registration.
- `.github/workflows/model-radar.yml`: daily GitHub Actions refresh.

## Low-Risk Refresh Rules / 低风控刷新规则

- Keep source URLs fixed in `src/model-radar-seed.mjs`; do not crawl discovered links.
- Use only `https` official domains on the allowlist in `scripts/update-model-radar.mjs`.
- Keep requests serial and low frequency.
- Do not add authentication, cookies, proxies, stealth headers, CAPTCHA handling,
  endpoint discovery, or vulnerability/security probing.
- If a source fails, preserve curated model rows and record the failure in the snapshot.

- 来源 URL 固定在 `src/model-radar-seed.mjs`，不要继续爬取页面里发现的链接。
- 只访问 `scripts/update-model-radar.mjs` 白名单里的 HTTPS 官方域名。
- 请求保持串行、低频。
- 不加入登录、cookie、代理、伪装请求头、验证码处理、接口发现、漏洞或安全探测。
- 来源失败时保留已有人工整理模型行，只在快照里记录失败。

## Editing Data / 编辑数据

When adding a model, update the provider's `latestModelId`, add a model row,
connect `sourceRefs`, and add at least one release dot. Run `npm test`.

新增模型时，更新 provider 的 `latestModelId`，添加模型条目，连接 `sourceRefs`，并补至少一个发布时间点。完成后运行 `npm test`。
