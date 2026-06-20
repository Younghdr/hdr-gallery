$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$git = "C:\Program Files\Git\cmd\git.exe"

Set-Location $root

& $git status --short

$message = Read-Host "Commit 訊息"
if ([string]::IsNullOrWhiteSpace($message)) {
  $message = "Update HDR gallery"
}

& $git add .
& $git commit -m $message
& $git push

Write-Host ""
Write-Host "GitHub Pages 已收到更新，通常 1-3 分鐘後生效："
Write-Host "https://younghdr.github.io/hdr-gallery/"
