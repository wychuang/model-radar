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

$port = Get-Random -Minimum 4300 -Maximum 4900
$oldPort = $env:PORT
$env:PORT = "$port"
$server = $null

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
  $dom = & $browser --headless=new --disable-gpu --no-first-run --virtual-time-budget=2500 --dump-dom "http://127.0.0.1:$port/" 2>$null

  if ($LASTEXITCODE -ne 0) {
    throw "Headless browser smoke check failed with exit code $LASTEXITCODE."
  }

  if ($dom -notmatch 'data-smoke="model-radar"') {
    throw "Expected app title was not rendered."
  }

  if ($dom -notmatch 'GPT-5.5') {
    throw "Expected model radar content was not rendered."
  }

  Write-Host "All checks passed."
} finally {
  if ($null -ne $server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force
  }
  $env:PORT = $oldPort
}
