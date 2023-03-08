$codexFrontEndPath = "C:\Program Files (x86)\Codex\codex-io.exe"
$codexBackEndPath = "C:\Program Files (x86)\Codex\codex-io-backend.exe"
$redisPath = "C:\Program Files\Memurai\memurai.exe"

# Check Redis is running
if (-not (Test-Path $redisPath))
{
    Write-Error "Memurai (Redis) path does not exist. Please double check the path in the Codex startup script."
    exit 1
}

$redisProcess = Get-Process -Name redis-server -ErrorAction SilentlyContinue
if (-not $redisProcess)
{
    Start-Process -FilePath $redisPath
}

# Start the Codex backend
if (-not (Test-Path $codexBackEndPath))
{
    Write-Error "Codex backend path does not exist. Please double check the path in the Codex startup script."
#    exit 1
}
Start-Process -FilePath $codexBackEndPath

# Start the Codex frontend
if (-not (Test-Path $codexFrontEndPath))
{
    Write-Error "Codex frontend path does not exist. Please double check the path in the Codex startup script."
#    exit 1
}
Start-Process -FilePath $codexFrontEndPath

