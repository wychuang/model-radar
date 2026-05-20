Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

param(
  [string]$TaskName = "ModelRadarDailyRefresh",
  [string]$Time = "06:12"
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$node = (Get-Command node -ErrorAction Stop).Source
$script = Join-Path $projectRoot "scripts\update-model-radar.mjs"
$action = New-ScheduledTaskAction -Execute $node -Argument "`"$script`"" -WorkingDirectory $projectRoot
$trigger = New-ScheduledTaskTrigger -Daily -At $Time
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 10)

Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings -Description "Daily low-frequency official-source refresh for Model Radar." -Force

Write-Host "Registered $TaskName at $Time."
