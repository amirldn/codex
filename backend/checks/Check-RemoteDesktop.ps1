#This check ensures that Windows Firewall is operational and not disabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

#Check if Remote Desktop is enabled
if ((Get-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name 'fDenyTSConnections').fDenyTSConnections -eq 0)
{
    $params = @{
        CheckName = "Remote Desktop enabled"
        State = 'Warn'
        Message = "Remote Desktop is enabled on this system, which could provide an attacker access your system remotely. Please ensure that it is properly secured by configuring your firewall rules and limiting access to authorized users."
        ResolveSteps = @("Disable Remote Desktop by searching on the start menu for 'remote desktop settings'.",
        "Uncheck 'Remote Desktop' to disable connections to this system.")
        ResolveImg = @("7iArBxi.png", "d0sj0Ys.png")
        ResolveScript = 'fixremotedesktop'
    }
    Add-CodexOutput @params
}
else
{
    Add-CodexOutput -CheckName "Remote Desktop disabled" -State Ok -Message "Remote Desktop is disabled on this system."
}

Write-CodexOutput