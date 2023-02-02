# This check ensures that Windows Firewall is operational and not disabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$modulePath = Join-Path (Get-Location) "checks" -AdditionalChildPath @("Codex","Codex.psm1")
Import-Module $modulePath -Force

$firewall = Get-NetFirewallProfile
$firewall | ForEach-Object {
    if ($_.Enabled -eq 'True') {
        Add-CodexOutput -CheckName 'Check-WindowsFirewall' -State Ok -Message "$_.Name is enabled"
    }
    else {
        Add-CodexOutput -CheckName 'Check-WindowsFirewall' -State Crit -Message "$_.Name is disabled"
    }
}

Write-CodexOutput