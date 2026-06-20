$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$url = Read-Host "貼上 YouTube HDR 連結"
$title = Read-Host "影片標題"
$category = Read-Host "主題分類：3c / travel / photo"

if ([string]::IsNullOrWhiteSpace($category)) {
  $category = "3c"
}

node manage-site.js video --url $url --title $title --category $category --featured yes

Write-Host ""
Write-Host "已更新 site-data.js。請先執行 .\start-local-preview.ps1 預覽。"
Write-Host "確認沒問題後，再執行 .\publish-github.ps1 發布到 GitHub Pages。"
