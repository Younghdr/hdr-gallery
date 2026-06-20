$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173
$url = "http://127.0.0.1:$port"

Set-Location $root

Write-Host "HDR local preview"
Write-Host "Folder: $root"
Write-Host "URL:    $url"
Write-Host ""
Write-Host "Leave this window open while previewing. Press Ctrl+C to stop."
Write-Host ""

Start-Process $url
python -m http.server $port --bind 127.0.0.1
