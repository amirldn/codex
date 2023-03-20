param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

# Check if web filtering is enabled
$defender = Get-MpPreference
if ($defender.DisableHttpParsing -eq $true)
{
    $params = @{
        "CheckName" = "Windows Defender Network Protection is Disabled"
        "State" = "Crit"
        "Message" = "Windows Defender is enabled but network protection is disabled. This means that network traffic is not being scanned. This is a potential security risk as it means that malicious network traffic from an attacker could distrupt your system."
        "ResolveSteps" = @("This fix can be applied automatically by clicking the 'Fix' button above.")
        "ResolveImg" = @("")
        "ResolveScript" = "fixdefenderhttp"
    }
    Add-CodexOutput @params
}
else
{
    Add-CodexOutput -CheckName "Web Filtering Enabled" -State "Ok" -Message "Web filtering is enabled and configured on this system, which blocks access to malicious websites and reduces the risk of malware infections."
}

Write-CodexOutput
