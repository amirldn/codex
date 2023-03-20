# This scripts disables the guest account
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force



$rdp = Get-ItemProperty 'HKLM:\System\CurrentControlSet\Control\Terminal Server'-Name "fDenyTSConnections" -ErrorAction SilentlyContinue

if ($null -eq $rdp)
{
    Add-CodexOutput -CheckName "Remote Desktop" -State Ok -Message "Remote Desktop is already disabled on this machine."
}
elseif ($rdp.fDenyTSConnections -eq 1)
{
    Add-CodexOutput -CheckName "Remote Desktop" -State Ok -Message "Remote Desktop is already disabled on this machine."
}
else
{
    Set-ItemProperty 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name "fDenyTSConnections" -Value 1
    $rdp = Get-ItemProperty 'HKLM:\System\CurrentControlSet\Control\Terminal Server'-Name "fDenyTSConnections" -ErrorAction SilentlyContinue
    if ($null -eq $rdp -or $rdp.fDenyTSConnections -eq 0)
    {
        Add-CodexOutput -CheckName "Remote Desktop" -State Crit -Message "Failed to disable Remote Desktop on this machine."
    }
    else
    {
        Add-CodexOutput -CheckName "Remote Desktop" -State Ok -Message "Remote Desktop has been successfully disabled on this machine."
    }
}

Write-CodexOutput