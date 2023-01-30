# This checks that no guest accounts are enabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
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