@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "SOURCE_DIR=C:\Users\HPOMEN\Desktop\HDR"
set "OUTPUT_DIR=%SOURCE_DIR%\AVIF_1280x720_AVIF_HDR"
set "FFMPEG_EXE="
set /a COUNT=0
set /a OK=0
set /a FAIL=0

for %%I in ("C:\Program Files\digiKam\ffmpeg.exe") do (
    if exist "%%~fI" set "FFMPEG_EXE=%%~fI"
)

if not defined FFMPEG_EXE (
    for /f "delims=" %%I in ('where ffmpeg 2^>nul') do (
        if not defined FFMPEG_EXE set "FFMPEG_EXE=%%I"
    )
)

if not defined FFMPEG_EXE (
    echo Could not find ffmpeg.exe
    pause
    exit /b 1
)

if not exist "%SOURCE_DIR%" (
    echo Source folder not found:
    echo %SOURCE_DIR%
    pause
    exit /b 1
)

if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo Using:
echo %FFMPEG_EXE%
echo.
echo Output format: AVIF 1280x720 HDR
echo Keep: BT.2020, PQ, 10-bit, 4:4:4
echo Quality mode: very high
echo.

for /f "delims=" %%F in ('dir /b /a:-d "%SOURCE_DIR%\*.avif" 2^>nul') do (
    set /a COUNT+=1
    echo [!COUNT!] Processing: %%F
    "%FFMPEG_EXE%" -y -hide_banner -loglevel error -analyzeduration 100M -probesize 100M -i "%SOURCE_DIR%\%%F" -map 0:v:0 -vf "scale=1280:720:force_original_aspect_ratio=decrease:flags=lanczos,pad=1280:720:(ow-iw)/2:(oh-ih)/2:black" -frames:v 1 -pix_fmt yuv444p10le -color_range pc -colorspace bt2020nc -color_primaries bt2020 -color_trc smpte2084 -map_metadata 0 -movflags +write_colr -c:v libaom-av1 -still-picture 1 -cpu-used 0 -crf 1 "%OUTPUT_DIR%\%%~nF.avif"
    if errorlevel 1 (
        set /a FAIL+=1
        echo Failed: %%F
    ) else (
        set /a OK+=1
        echo Done: %OUTPUT_DIR%\%%~nF.avif
    )
    echo.
)

if %COUNT%==0 (
    echo No .avif files found in:
    echo %SOURCE_DIR%
    pause
    exit /b 1
)

echo Finished.
echo Total: %COUNT%
echo Success: %OK%
echo Failed: %FAIL%
echo Output: %OUTPUT_DIR%
pause
