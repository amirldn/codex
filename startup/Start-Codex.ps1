$codexFrontEndPath = "C:\Program Files (x86)\Codex\codex-io.exe"
$codexBackEndPath = "C:\Program Files (x86)\Codex\codex-io-backend.exe"
$redisPath = "C:\Program Files\Memurai\memurai.exe"


$yes = New-Object System.Management.Automation.Host.ChoiceDescription "&Yes", "Description."
$no = New-Object System.Management.Automation.Host.ChoiceDescription "&No", "Description."
$options = [System.Management.Automation.Host.ChoiceDescription[]]($yes, $no)

# Check Redis is installed
if (-not(Test-Path $redisPath))
{
    $title = "Redis is not installed"
    $message = "It looks like a prerequisite (Redis) is not installed, would you like to install it? Codex cannot function without it."
    $result = $host.ui.PromptForChoice($title, $message, $options, 0)
    switch ($result)
    {
        0{
            msiexec /i "C:\Program Files (x86)\Codex\redist\memurai-v3.1.4.msi" /qn /norestart
            Write-Host "Memurai (Redis) is installing in the background. Please wait."
            # Wait until installation is complete
            $redisProcess = Get-Process -Name memurai -ErrorAction SilentlyContinue
            while (-not $redisProcess)
            {
                Start-Sleep -Seconds 5
                $redisProcess = Get-Process -Name memurai -ErrorAction SilentlyContinue
            }

        }1{
            Write-Error "Memurai (Redis) is not installed hence Codex cannot function. Please install it manually. Exiting."
            exit 1
        }
    }

}


# Check redis is running
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
