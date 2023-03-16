# This scripts disables the guest account
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force



Get-Service -Name wuauserv | Start-Service | Out-Null

$service = Get-Service -Name wuauserv
if ($service.Status -ne "Running") {
    Add-CodexOutput -CheckName 'Windows Update Service still disabled ' -State Crit -Message 'The Windows Update service could not be started.'
}
else {
    Add-CodexOutput -CheckName 'Windows Update Service is Enabled' -State Ok -Message 'Windows Update service is now running.'
}

Write-CodexOutput