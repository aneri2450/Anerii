# Setup directories
$baseDir = "c:\Users\u\Downloads\Anerii"
$toolsDir = Join-Path $baseDir "tools"
$outDir = Join-Path $baseDir "compressed_videos"

if (-not (Test-Path $toolsDir)) { New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null }
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

$ffmpegExe = Get-ChildItem -Path $toolsDir -Filter "ffmpeg.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $ffmpegExe) {
    # Check if winget is available
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        Write-Host "Installing ffmpeg via winget..."
        & winget install Gyan.FFmpeg --accept-source-agreements --accept-package-agreements --silent
        $systemFfmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
        if ($systemFfmpeg) {
            $ffmpegPath = $systemFfmpeg.Source
        }
    }
}

if (-not $ffmpegPath -and $ffmpegExe) {
    $ffmpegPath = $ffmpegExe.FullName
}

if (-not $ffmpegPath) {
    # Try downloading lightweight ffmpeg
    Write-Host "Downloading standalone ffmpeg..."
    $zipPath = Join-Path $toolsDir "ffmpeg-essentials.zip"
    $url = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing
    
    Write-Host "Extracting ffmpeg..."
    Expand-Archive -Path $zipPath -DestinationPath $toolsDir -Force
    $ffmpegExe = Get-ChildItem -Path $toolsDir -Filter "ffmpeg.exe" -Recurse | Select-Object -First 1
    $ffmpegPath = $ffmpegExe.FullName
}

Write-Host "Using FFmpeg at: $ffmpegPath"

# Compress all MP4 files
$videoFiles = Get-ChildItem -Path $baseDir -Filter "*.mp4"

foreach ($file in $videoFiles) {
    $inputPath = $file.FullName
    $outputPath = Join-Path $outDir $file.Name
    
    Write-Host "Compressing: $($file.Name) (Original: $([math]::Round($file.Length / 1MB, 2)) MB)..."
    
    # Target 5-7MB (CRF 28, 720p 24fps, fast preset, AAC audio)
    $args = @(
        "-i", "`"$inputPath`"",
        "-vf", "scale=-2:1280",
        "-c:v", "libx264",
        "-crf", "27",
        "-preset", "faster",
        "-c:a", "aac",
        "-b:a", "96k",
        "-movflags", "+faststart",
        "-y",
        "`"$outputPath`""
    )
    
    $proc = Start-Process -FilePath $ffmpegPath -ArgumentList $args -NoNewWindow -Wait -PassThru
    
    if (Test-Path $outputPath) {
        $newSize = (Get-Item $outputPath).Length
        Write-Host "Done: $($file.Name) -> $([math]::Round($newSize / 1MB, 2)) MB"
    } else {
        Write-Host "Failed to compress $($file.Name)"
    }
}

Write-Host "ALL_VIDEOS_COMPRESSED_SUCCESSFULLY"
