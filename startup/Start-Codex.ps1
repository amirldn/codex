$codexFrontEndPath = "C:\Program Files (x86)\Codex\codex-io.exe"
$codexBackEndPath = "C:\Program Files (x86)\Codex\codex-io-backend.exe"
$redisPath = "C:\Program Files\Memurai\memurai.exe"

# Check Redis is running
if (-not(Test-Path $redisPath))
{
    Write-Error "Memurai (Redis) path does not exist. Please double check that it is installed."
    exit 1
}

$redisProcess = Get-Process -Name redis-server -ErrorAction SilentlyContinue
if (-not$redisProcess)
{
    Start-Process -FilePath $redisPath
}

# Start the Codex backend
if (-not(Test-Path $codexBackEndPath))
{
    Write-Error "Codex backend path does not exist. Please double check the path in the Codex startup script."
    exit 1
}

$backendProcess = Get-Process -Name codex-io-backend -ErrorAction SilentlyContinue
if ($backendProcess)
{
    foreach ($process in $backendProcess)
    {
        $process | Stop-Process -Force -ErrorAction SilentlyContinue
    }
}
Start-Process -FilePath $codexBackEndPath -WindowStyle Hidden

# Start the Codex frontend
if (-not(Test-Path $codexFrontEndPath))
{
    Write-Error "Codex frontend path does not exist. Please double check the path in the Codex startup script."
    exit 1
}

$frontendProcess = Get-Process -Name codex-io -ErrorAction SilentlyContinue
if (-not$frontendProcess)
{
    Start-Process -FilePath $codexFrontEndPath
}
else
{
    Write-Warning "It looks like Codex is already running? Check your taskbar for the Codex icon."
    exit 1
}

# Wait until Codex frontend is no longer running then stop the backend
$frontendProcess = Get-Process -Name codex-io -ErrorAction SilentlyContinue
while ($frontendProcess)
{
    Start-Sleep -Seconds 10
    $frontendProcess = Get-Process -Name codex-io -ErrorAction SilentlyContinue
}
$backendProcess = Get-Process -Name codex-io-backend -ErrorAction SilentlyContinue
foreach ($process in $backendProcess)
{
    $process | Stop-Process -Force -ErrorAction SilentlyContinue
}
