# This check looks for the presence of 'here' in the file path specified.
param ()

$ErrorActionPreference = 'Stop'

# Import the Codex module
$modulePath = Join-Path (Get-Location) "checks" -AdditionalChildPath @("Codex","Codex.psm1")
Import-Module $modulePath -Force

# use the codex helper module to install PSWindowsUpdate module correctly
Use-CodexModule -ModuleName PSWindowsUpdate

# Check Windows Update service is running
$service = Get-Service -Name wuauserv
if ($service.Status -ne "Running") {
    Add-CodexOutput -CheckName "Windows Update Service is Disabled" -State Crit -Message "Windows Update service is not running"
    Write-CodexOutput
    return
}
else
{
    Add-CodexOutput -CheckName "Windows Update Service is Enabled" -State Ok -Message "Windows Update service is running"
}


# Get list of available updates
$update = Get-WindowsUpdate
if ($update) {
    $updateList = ""
    $update | foreach {$updateList += (($_.Title -replace ',','') + ", ")}
    $updateList = $updateList.Substring(0, $updateList.Length - 2)
    Add-CodexOutput -CheckName "Updates Avaliable" -State Warn -Message "The following updates are avaliable for install: [$updateList]"
}
else {
    Add-CodexOutput -CheckName 'Check-WindowsUpdate' -State Ok -Message "No updates are avaliable"
}

Write-CodexOutput