$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$siteRoot = Split-Path -Parent $root
$port = 4174
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
} else {
  $url = "http://127.0.0.1:$port/admin.html"
}

Set-Location $root

Write-Host "Young HDR Admin"
Write-Host "Site folder: $siteRoot"
Write-Host "Tool folder: $root"
Write-Host "URL:    $url"
if (Test-Path $envFile) {
  Write-Host "Loaded env: $envFile"
}
Write-Host ""
if ($mode -eq "iphone") {
  Write-Host "iPhone must be on the same Wi-Fi. Open this URL on iPhone Safari:"
  Write-Host $url
  Write-Host ""
}
Write-Host "Leave this window open while using the GUI. Press Ctrl+C to stop."
Write-Host ""

Start-Process $url
$env:HOST = $hostName
& "C:\Program Files\nodejs\node.exe" admin-server.js
