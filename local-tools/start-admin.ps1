$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$siteRoot = Split-Path -Parent $root
$port = 4174
$devPort = 3000
$mode = Read-Host "Mode: press Enter for local only, or type iphone for same Wi-Fi iPhone upload"
$hostName = "127.0.0.1"

# Load environment variables from .env file in project root
$envFile = Join-Path $siteRoot ".env"
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq "" -or $line.StartsWith("#")) { return }
    if ($line -match "^([^=]+)=(.*)$") {
      $name = $matches[1].Trim()
      $value = $matches[2].Trim().Trim('"').Trim("'")
      [Environment]::SetEnvironmentVariable($name, $value, "Process") | Out-Null
    }
  }
}

if ($mode -eq "iphone") {
  $hostName = "0.0.0.0"
  $ip = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.PrefixOrigin -ne "WellKnown" } |
    Select-Object -First 1 -ExpandProperty IPAddress
  $url = "http://$ip`:$port/admin.html"
  $devUrl = "http://$ip`:$devPort/"
} else {
  $url = "http://127.0.0.1:$port/admin.html"
  $devUrl = "http://127.0.0.1:$devPort/"
}

# Start Next.js dev server in the background if it is not already running
$devRunning = Get-NetTCPConnection -LocalPort $devPort -ErrorAction SilentlyContinue | Where-Object { $_.State -eq "Listen" }
if (-not $devRunning) {
  Write-Host "Starting Next.js dev server on port $devPort..."
  Start-Process -FilePath "powershell.exe" `
    -ArgumentList "-ExecutionPolicy", "Bypass", "-Command", "cd '$siteRoot'; npm run dev" `
    -WindowStyle Minimized

  $timeout = 60
  $elapsed = 0
  while (-not (Get-NetTCPConnection -LocalPort $devPort -ErrorAction SilentlyContinue | Where-Object { $_.State -eq "Listen" })) {
    Start-Sleep -Seconds 1
    $elapsed++
    if ($elapsed -ge $timeout) {
      Write-Host "WARNING: Next.js dev server did not start within $timeout seconds. Preview Next.js site may not work."
      break
    }
  }
  if ($elapsed -lt $timeout) {
    Write-Host "Next.js dev server ready: $devUrl"
  }
} else {
  Write-Host "Next.js dev server already running on port $devPort."
}

Set-Location $root

Write-Host ""
Write-Host "Young HDR Admin"
Write-Host "Site folder: $siteRoot"
Write-Host "Tool folder: $root"
Write-Host "Admin URL:    $url"
Write-Host "Preview URL:  $devUrl"
if (Test-Path $envFile) {
  Write-Host "Loaded env: $envFile"
}
Write-Host ""
if ($mode -eq "iphone") {
  Write-Host "iPhone must be on the same Wi-Fi. Open this URL on iPhone Safari:"
  Write-Host $url
  Write-Host ""
}
Write-Host "Leave this window open while using the GUI. Press Ctrl+C to stop the admin server."
Write-Host "The Next.js dev server window can also be closed when finished."
Write-Host ""

Start-Process $url
$env:HOST = $hostName
& "C:\Program Files\nodejs\node.exe" admin-server.js
