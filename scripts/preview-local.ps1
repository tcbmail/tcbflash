$ErrorActionPreference = 'Stop'
$previewRepoRoot = Split-Path -Parent $PSScriptRoot
New-Item -ItemType Directory -Path (Join-Path $previewRepoRoot '.private') -Force | Out-Null
$previewOutput = Join-Path $previewRepoRoot 'dist'
$expectedHomepage = Get-Content -LiteralPath (Join-Path $previewOutput 'index.html') -Raw -Encoding utf8
$previewUrl = 'http://127.0.0.1:49817/'

try {
  $existingReply = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
} catch {
  $existingReply = $null
}
if ($existingReply) {
  $existingHomepage = [System.Text.Encoding]::UTF8.GetString($existingReply.RawContentStream.ToArray())
  if ($existingHomepage -cne $expectedHomepage) { throw 'Port 49817 serves a different page. Existing service preserved.' }
  Write-Output ('TCBFlash preview is already running: ' + $previewUrl)
  exit 0
}

$previewProbe = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 49817)
try { $previewProbe.Start() } finally { $previewProbe.Stop() }
$previewNode = (Get-Command node -ErrorAction Stop).Source
$previewVite = Join-Path $previewRepoRoot 'node_modules\vite\bin\vite.js'
$previewStartParameters = @{
  FilePath = $previewNode
  ArgumentList = @($previewVite, 'preview', '--outDir', 'dist', '--host', '127.0.0.1', '--port', '49817', '--strictPort')
  WorkingDirectory = $previewRepoRoot
  WindowStyle = 'Hidden'
  PassThru = $true
  RedirectStandardOutput = (Join-Path $previewRepoRoot '.private\editorial-preview-server.out.log')
  RedirectStandardError = (Join-Path $previewRepoRoot '.private\editorial-preview-server.err.log')
}
$previewProcess = Start-Process @previewStartParameters
$previewProcess.Id | Set-Content -LiteralPath (Join-Path $previewRepoRoot '.private\editorial-preview-server.pid') -Encoding ascii

for ($previewAttempt = 0; $previewAttempt -lt 15; $previewAttempt++) {
  try {
    $readyReply = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
    $readyHomepage = [System.Text.Encoding]::UTF8.GetString($readyReply.RawContentStream.ToArray())
    if ($readyHomepage -cne $expectedHomepage) { throw 'Unexpected preview homepage' }
    Write-Output ('Verified TCBFlash background preview: ' + $previewUrl)
    Write-Output ('PID: ' + $previewProcess.Id)
    exit 0
  } catch {
    if ($previewProcess.HasExited) { throw 'TCBFlash preview exited; see .private/editorial-preview-server.err.log' }
    Start-Sleep -Milliseconds 200
  }
}
throw 'TCBFlash preview did not become ready; inspect its local logs.'
