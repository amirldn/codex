# This check ensures that Windows Firewall is operational and not disabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

$firewall = Get-NetFirewallProfile
$firewall | ForEach-Object {
    if ($_.Enabled -eq 'True')
    {
        $params = @{
            CheckName = "$( $_.Name ) Firewall is Enabled"
            State = 'Ok'
            Message = "The firewall for the profile '$( $_.Name )' is enabled - you should keep it enabled to protect your system from malicious traffic (e.g. intrusion attempts, ransomware attacks, etc.)."
        }
        Add-CodexOutput @params
    }
    else
    {
        $params = @{
            CheckName = "$( $_.Name ) Firewall Disabled"
            State = 'Warn'
            Message = "The firewall for the profile '$( $_.Name )' is disabled - you should enable it to protect your system from malicious traffic (e.g. intrusion attempts, ransomware attacks, etc.)."
            ResolveSteps = @("Search for 'Windows Firewall' from your start menu and launch the 'Windows Defender Firewall with Advanced Security'."
            ,"Click on 'Windows Defender Firewall Properties'.",
            "For each profile, in this case, $( $_.Name ), click on the 'Firewall State' dropdown and select 'On'.",
            "Click 'OK' to save your changes.")
            ResolveImg = @("4qriKO1.png", "WHNeBk9.png", "YXYUWVy.png", "kiJA0V5.png")
            ResolveScript = 'fixwindowsfirewall'
        }
        Add-CodexOutput @params
    }
}

Write-CodexOutput