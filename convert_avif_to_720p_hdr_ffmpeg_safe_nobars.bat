@echo off
setlocal

set "SCRIPT=%~dp0convert_avif_to_720p_hdr_ffmpeg_safe_nobars.ps1"

powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT%"
