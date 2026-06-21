@echo off
setlocal

set "SCRIPT=%~dp0convert_avif_to_1280x720_hdr_ffmpeg_safe.ps1"

powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%"
