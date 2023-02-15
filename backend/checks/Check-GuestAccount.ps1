# This checks that no guest accounts are enabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$','') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

$accounts = Get-LocalUser
$guest = $accounts | Where-Object { $_.Name -eq 'Guest' }
if ($guest.Enabled -eq 'True') {
    Add-CodexOutput -CheckName 'Check-GuestAccount' -State Crit -Message 'Guest account is enabled'
}
else {
    Add-CodexOutput -CheckName 'Check-GuestAccount' -State Ok -Message 'Guest account is disabled'
}

Write-CodexOutput