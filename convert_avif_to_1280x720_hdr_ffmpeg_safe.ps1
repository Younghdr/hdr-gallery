$ErrorActionPreference = "Stop"

$sourceDir = "C:\Users\HPOMEN\Desktop\HDR"
$outputDir = Join-Path $sourceDir "AVIF_1280x720_AVIF_HDR"
$magickCandidates = @(
    "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe",
    "C:\Program Files\ImageMagick-7.1.2-Q16\magick.exe"
)
$ffmpegCandidates = @(
    "C:\Program Files\digiKam\ffmpeg.exe"
)

$magickExe = $magickCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $magickExe) {
    $magickExe = (Get-Command magick -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -First 1)
}

$ffmpegExe = $ffmpegCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $ffmpegExe) {
    $ffmpegExe = (Get-Command ffmpeg -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -First 1)
}

if (-not $magickExe) {
    Write-Host "Could not find magick.exe"
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not $ffmpegExe) {
    Write-Host "Could not find ffmpeg.exe"
    Read-Host "Press Enter to exit"
    exit 1
}

if (-not (Test-Path $sourceDir)) {
    Write-Host "Source folder not found:`n$sourceDir"
    Read-Host "Press Enter to exit"
    exit 1
}

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$tempRoot = Join-Path $env:TEMP ("hdr-avif-work-" + [guid]::NewGuid().ToString("N"))
$logPath = Join-Path $outputDir "convert_log.txt"
New-Item -ItemType Directory -Force -Path $tempRoot | Out-Null
Set-Content -LiteralPath $logPath -Value ("Started: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")) -Encoding UTF8

$files = Get-ChildItem -LiteralPath $sourceDir -File | Where-Object { $_.Extension -match '^\.avif$' }

if (-not $files) {
    Write-Host "No .avif files found in:`n$sourceDir"
    Remove-Item -LiteralPath $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
    Read-Host "Press Enter to exit"
    exit 1
}

$count = 0
$ok = 0
$fail = 0

Write-Host "Using:"
Write-Host $magickExe
Write-Host $ffmpegExe
Write-Host ""
Write-Host "Output format: AVIF 1280x720 HDR"
Write-Host "Decode/resize: ImageMagick"
Write-Host "Encode: ffmpeg AV1 10-bit 4:4:4"
Write-Host "Mode: safe temp ASCII filenames"
Write-Host ""

foreach ($file in $files) {
    $count++
    $tempIn = Join-Path $tempRoot ("input_{0:D4}.avif" -f $count)
    $tempPng = Join-Path $tempRoot ("stage_{0:D4}.png" -f $count)
    $tempOut = Join-Path $tempRoot ("output_{0:D4}.avif" -f $count)
    $finalOut = Join-Path $outputDir ($file.BaseName + ".avif")

    Write-Host ("[{0}] Processing: {1}" -f $count, $file.Name)

    try {
        Copy-Item -LiteralPath $file.FullName -Destination $tempIn -Force

        $magickInput = $tempIn + "[0]"
        & $magickExe $magickInput -auto-orient -resize 1280x720 -background black -gravity center -extent 1280x720 $tempPng
        if ($LASTEXITCODE -ne 0) {
            throw "ImageMagick resize failed with exit code: $LASTEXITCODE"
        }

        if (-not (Test-Path $tempPng)) {
            throw "Intermediate PNG file was not created."
        }

        $args = @(
            "-y",
            "-hide_banner",
            "-loglevel", "error",
            "-i", $tempPng,
            "-vf", "setparams=range=pc:color_primaries=bt2020:color_trc=smpte2084:colorspace=bt2020nc",
            "-frames:v", "1",
            "-pix_fmt", "yuv444p10le",
            "-movflags", "+write_colr",
            "-c:v", "libaom-av1",
            "-still-picture", "1",
            "-cpu-used", "0",
            "-crf", "1",
            $tempOut
        )

        & $ffmpegExe @args
        if ($LASTEXITCODE -ne 0) {
            throw "ffmpeg exit code: $LASTEXITCODE"
        }

        if (-not (Test-Path $tempOut)) {
            throw "Output file was not created."
        }

        Move-Item -LiteralPath $tempOut -Destination $finalOut -Force
        $size = (Get-Item -LiteralPath $finalOut).Length
        Add-Content -LiteralPath $logPath -Value ("OK   `t{0}`t{1} bytes" -f $file.Name, $size) -Encoding UTF8
        $ok++
        Write-Host ("Done: {0}" -f $file.Name)
    }
    catch {
        $fail++
        Add-Content -LiteralPath $logPath -Value ("FAIL `t{0}`t{1}" -f $file.Name, $_.Exception.Message) -Encoding UTF8
        Write-Host ("Failed: {0}" -f $file.Name)
        Write-Host $_.Exception.Message
    }
    finally {
        Remove-Item -LiteralPath $tempIn -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $tempPng -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $tempOut -Force -ErrorAction SilentlyContinue
    }

    Write-Host ""
}

Remove-Item -LiteralPath $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
Add-Content -LiteralPath $logPath -Value ("Finished: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")) -Encoding UTF8
Add-Content -LiteralPath $logPath -Value ("Total: $count / Success: $ok / Failed: $fail") -Encoding UTF8

Write-Host "Finished."
Write-Host "Total: $count"
Write-Host "Success: $ok"
Write-Host "Failed: $fail"
Write-Host "Output: $outputDir"
Write-Host "Log: $logPath"
Read-Host "Press Enter to exit"
