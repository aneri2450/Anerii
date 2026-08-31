Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zipPath = "c:\Users\u\Downloads\Anerii\anerii-luxury-shopify-theme.zip"
$sourceDir = "c:\Users\u\Downloads\Anerii\anerii-shopify-theme"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $sourceDir -Recurse -File
foreach ($file in $files) {
    $relPath = $file.FullName.Substring($sourceDir.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relPath, [System.IO.Compression.CompressionLevel]::Optimal)
    Write-Host "Added: $relPath"
}

$zip.Dispose()
Write-Host "SUCCESS: ZIP Created at $zipPath"
