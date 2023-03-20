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
if ($defender.DisableHttpParsing -eq $false)
{
    Add-CodexOutput -CheckName "Network Protection" -State Ok -Message "Web filtering is enabled and configured on this system, which blocks access to malicious websites and reduces the risk of malware infections."
}
else
{
    Set-MpPreference -DisableHttpParsing $false
    $defender = Get-MpPreference
    if ($defender.DisableHttpParsing -eq $true)
    {
        Add-CodexOutput -CheckName "Windows Defender" -State Crit -Message "Windows Defender Web Filtering could not be enabled."
    }
    else
    {
        Add-CodexOutput -CheckName "Windows Defender" -State Ok -Message "Windows Defender Web Filtering is now enabled."
    }
}

Write-CodexOutput