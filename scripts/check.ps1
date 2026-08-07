Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

Write-Host "Checking JavaScript syntax..."
node --check src/model-radar.mjs
node --check src/model-radar-seed.mjs
node --check src/model-radar-snapshot.mjs
node --check src/ui-helpers.mjs
node --check src/app.mjs
node --check src/app-v2.mjs
node --check src/radar-layout.mjs
node --check src/model-choice.mjs
node --check src/model-profile.mjs
node --check src/app-radar.mjs
node --check scripts/update-model-radar.mjs
node --check scripts/dev-server.mjs

Write-Host "Running tests..."
npm test

$browserCandidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ }

if ($browserCandidates.Count -eq 0) {
  Write-Warning "Chrome/Edge not found; skipped browser smoke check."
  exit 0
}

function Get-RenderedDom {
  param(
    [Parameter(Mandatory = $true)][string]$Browser,
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][string]$ScratchRoot,
    [Parameter(Mandatory = $true)][string]$Name
  )

  $profile = Join-Path $ScratchRoot "$Name-profile"
  $stdout = Join-Path $ScratchRoot "$Name.html"
  $stderr = Join-Path $ScratchRoot "$Name.log"
  New-Item -ItemType Directory -Path $profile -Force | Out-Null
  $arguments = @(
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "`"--user-data-dir=$profile`"",
    "--virtual-time-budget=2500",
    "--dump-dom",
    $Url
  )
  $process = Start-Process -FilePath $Browser -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr

  if ($process.ExitCode -ne 0) {
    throw "$Name headless browser smoke check failed with exit code $($process.ExitCode)."
  }

  if (-not (Test-Path -LiteralPath $stdout)) {
    throw "$Name headless browser smoke check produced no DOM output."
  }

  $dom = Get-Content -LiteralPath $stdout -Raw -Encoding UTF8
  if ([string]::IsNullOrWhiteSpace($dom)) {
    throw "$Name headless browser smoke check produced an empty DOM."
  }

  return $dom
}

$portProbe = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 0)
$portProbe.Start()
$port = ([System.Net.IPEndPoint]$portProbe.LocalEndpoint).Port
$portProbe.Stop()
$oldPort = $env:PORT
$env:PORT = "$port"
$server = $null
$browserScratch = Join-Path ([System.IO.Path]::GetTempPath()) "model-radar-check-$([System.Guid]::NewGuid().ToString('N'))"
New-Item -ItemType Directory -Path $browserScratch | Out-Null

try {
  Write-Host "Starting local server on port $port..."
  $server = Start-Process -FilePath "node" -ArgumentList @("scripts/dev-server.mjs") -WorkingDirectory $projectRoot -PassThru -WindowStyle Hidden

  $ready = $false
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    try {
      $response = Invoke-WebRequest -Uri "http://127.0.0.1:$port/" -UseBasicParsing -TimeoutSec 1
      if ($response.StatusCode -eq 200) {
        $ready = $true
        break
      }
    } catch {
      Start-Sleep -Milliseconds 200
    }
  }

  if (-not $ready) {
    throw "Local server did not become ready."
  }

  $browser = $browserCandidates[0]
  Write-Host "Running headless browser smoke check with $browser..."
  $v1Dom = Get-RenderedDom -Browser $browser -Url "http://127.0.0.1:$port/" -ScratchRoot $browserScratch -Name "v1"

  if ($v1Dom -notmatch 'data-smoke="model-radar"') {
    throw "Expected V1 app shell was not rendered."
  }

  if ($v1Dom -notmatch 'GPT-5.6 Sol') {
    throw "Expected current V1 model content was not rendered."
  }

  $v2Dom = Get-RenderedDom -Browser $browser -Url "http://127.0.0.1:$port/v2.html" -ScratchRoot $browserScratch -Name "v2"

  if ($v2Dom -notmatch 'data-smoke="model-radar-v2"') {
    throw "Expected V2 app shell was not rendered."
  }

  if ($v2Dom -notmatch 'Claude Opus 5') {
    throw "Expected current V2 leader content was not rendered."
  }

  if ($v2Dom -notmatch 'RADAR VIEW') {
    throw "Expected V2-to-radar view switch was not rendered."
  }

  if ($v2Dom -notmatch '专项实测 / Specialist evidence') {
    throw "Expected selected-model specialist evidence was not rendered."
  }

  $v2Markup = $v2Dom -join "`n"
  $v2MetricCount = [regex]::Matches($v2Markup, 'class="metric-tab"').Count
  if ($v2MetricCount -ne 7) {
    throw "Expected 7 shared primary metrics in V2, found $v2MetricCount."
  }

  $radarDom = Get-RenderedDom -Browser $browser -Url "http://127.0.0.1:$port/radar.html" -ScratchRoot $browserScratch -Name "radar"

  if ($radarDom -notmatch 'data-smoke="model-radar-observatory"') {
    throw "Expected radar observatory app shell was not rendered."
  }

  if ($radarDom -notmatch 'class="model-signal"') {
    throw "Expected radar model signals were not rendered."
  }

  if ($radarDom -notmatch '五维选型') {
    throw "Expected five-axis model profile was not rendered."
  }

  if ($radarDom -notmatch 'DeepSeek-V4 Flash 0731') {
    throw "Expected DeepSeek V4 Flash evidence was not rendered."
  }

  if ($radarDom -notmatch 'APPLE VIEW') {
    throw "Expected radar-to-V2 view switch was not rendered."
  }

  Write-Host "All checks passed."
} finally {
  if ($null -ne $server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force
  }
  if (Test-Path -LiteralPath $browserScratch) {
    Remove-Item -LiteralPath $browserScratch -Recurse -Force
  }
  $env:PORT = $oldPort
}
