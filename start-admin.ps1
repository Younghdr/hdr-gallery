$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4174
$url = "http://127.0.0.1:$port/admin.html"

Set-Location $root

Write-Host "Young HDR Admin"
Write-Host "Folder: $root"
Write-Host "URL:    $url"
Write-Host ""
Write-Host "Leave this window open while using the GUI. Press Ctrl+C to stop."
Write-Host ""

Start-Process $url
& "C:\Program Files\nodejs\node.exe" admin-server.js
