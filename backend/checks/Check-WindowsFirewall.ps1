# This check ensures that Windows Firewall is operational and not disabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$','') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

$firewall = Get-NetFirewallProfile
$firewall | ForEach-Object {
    if ($_.Enabled -eq 'True') {
        Add-CodexOutput -CheckName "$_.Name Firewall Disabled" -State Ok -Message "$_.Name is enabled"
    }
    else {
        Add-CodexOutput -CheckName "$_.Name Firewall Disabled" -State Crit -Message "$_.Name is disabled"
    }
}

Write-CodexOutput