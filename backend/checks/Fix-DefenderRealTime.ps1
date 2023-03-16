# This scripts disables the guest account
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force



# Check if bitlocker is enabled
$defender = Get-MpPreference
if ($defender.DisableRealtimeMonitoring -eq $true)
{
    Add-CodexOutput -CheckName "Windows Defender" -State Ok -Message "Windows Defender is enabled. Realtime monitoring is enabled which will scan files as they are created or modified therefore improving the security of your system."
}
else
{
    Set-MpPreference -DisableRealtimeMonitoring $false
    $defender = Get-MpPreference
    if ($defender.DisableRealtimeMonitoring -eq $true)
    {
        Add-CodexOutput -CheckName "Windows Defender" -State Crit -Message "Windows Defender could not be enabled."
    }
    else
    {
        Add-CodexOutput -CheckName "Windows Defender" -State Ok -Message "Windows Defender is now enabled."
    }
}

Write-CodexOutput