$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if ($ffmpeg) {
    Write-Host "FFMPEG_FOUND: $($ffmpeg.Source)"
} else {
    Write-Host "FFMPEG_NOT_FOUND"
}

$files = Get-ChildItem -Path "c:\Users\u\Downloads\Anerii\*.mp4"
foreach ($f in $files) {
    $sizeMB = [math]::Round($f.Length / 1MB, 2)
    Write-Host "$($f.Name) : $sizeMB MB"
}
