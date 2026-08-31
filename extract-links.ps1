$url = "https://anerii.com/"
$request = [System.Net.HttpWebRequest]::Create($url)
$request.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
$request.Headers.Add("Accept-Language", "en-US,en;q=0.9")

try {
    $response = $request.GetResponse()
    $stream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $html = $reader.ReadToEnd()
    $reader.Close()
    $response.Close()

    $matches = [regex]::Matches($html, 'https://cdn\.shopify\.com/[^"''\s><]+\.mp4(\?[^"''\s><]+)?')
    Write-Host "FOUND_MP4_LINKS:"
    foreach ($m in $matches) {
        Write-Host $m.Value
    }
} catch {
    Write-Host "ERROR: $_"
}
