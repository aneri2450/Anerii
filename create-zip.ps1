Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { "e:\Download\Anerii" }
$zipPath = "$baseDir\anerii-luxury-shopify-theme.zip"
$themeFolders = @("assets", "config", "layout", "locales", "sections", "snippets", "templates")

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

foreach ($folder in $themeFolders) {
    $folderPath = Join-Path $baseDir $folder
    if (Test-Path $folderPath) {
        $files = Get-ChildItem -Path $folderPath -Recurse -File
        foreach ($file in $files) {
            $relPath = $file.FullName.Substring($baseDir.Length + 1).Replace('\', '/')
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relPath, [System.IO.Compression.CompressionLevel]::Optimal)
            Write-Host "Added: $relPath"
        }
    }
}

$zip.Dispose()
Write-Host "SUCCESS: Shopify Theme ZIP updated at $zipPath"
