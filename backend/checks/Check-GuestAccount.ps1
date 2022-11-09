# This checks that no guest accounts are enabled
param (

)

$ErrorActionPreference = 'Stop'

Import-Module /Users/amaula/GitHub/codex/backend/runner/Codex/Codex.psm1 -Force

$accounts = Get-LocalUser
$guest = $accounts | Where-Object { $_.Name -eq 'Guest' }
if ($guest.Enabled -eq 'True') {
    Add-CodexOutput -CheckName 'Check-GuestAccount' -State Crit -Message 'Guest account is enabled'
}
else {
    Add-CodexOutput -CheckName 'Check-GuestAccount' -State Ok -Message 'Guest account is disabled'
}

Write-CodexOutput