@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "SOURCE_DIR=C:\Users\HPOMEN\Desktop\HDR"
set "OUTPUT_DIR=%SOURCE_DIR%\AVIF_1280x720"
set "MAGICK_EXE="
set /a COUNT=0
set /a OK=0
set /a FAIL=0

for %%I in ("C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe" "C:\Program Files\ImageMagick-7.1.2-Q16\magick.exe") do (
    if exist "%%~fI" set "MAGICK_EXE=%%~fI"
)

if not defined MAGICK_EXE (
    for /f "delims=" %%I in ('where magick 2^>nul') do (
        if not defined MAGICK_EXE set "MAGICK_EXE=%%I"
    )
)

if not defined MAGICK_EXE (
    echo Could not find ImageMagick ^(magick.exe^).
    echo Please install ImageMagick first.
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
echo %MAGICK_EXE%
echo.

for %%F in ("%SOURCE_DIR%\*.avif" "%SOURCE_DIR%\*.AVIF") do (
    if exist "%%~fF" (
        set /a COUNT+=1
        echo [!COUNT!] Processing: %%~nxF
        "%MAGICK_EXE%" "%%~fF[0]" -auto-orient -resize 1280x720 -background black -gravity center -extent 1280x720 -quality 92 "%OUTPUT_DIR%\%%~nF.jpg"
        if errorlevel 1 (
            set /a FAIL+=1
            echo Failed: %%~nxF
        ) else (
            set /a OK+=1
            echo Done: %OUTPUT_DIR%\%%~nF.jpg
        )
        echo.
    )
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
