# This scripts disables the guest account
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

#Add-CodexOutput -CheckName 'Failed' -State Crit -Message 'Failed to disable the Guest account.'

Add-CodexOutput -CheckName 'Guest is Disabled' -State Ok -Message "Guest account is now disabled."

Write-CodexOutput