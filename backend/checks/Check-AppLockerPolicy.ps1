param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force


# Check if AppLocker is enabled
$appLockerEnabled = Get-AppLockerPolicy -Effective | Where-Object { $_.RuleType -eq "Path" } | Select-Object -ExpandProperty EnforcementMode
if ($appLockerEnabled -eq "NotConfigured")
{
    Add-CodexOutput -CheckName "AppLocker Policy Configured" -State "Error" -Message "AppLocker is not configured on this system, which means applications are not restricted from running. Please enable and configure AppLocker policies to enhance system security." -ResolveSteps @("Open the Group Policy editor by running 'gpedit.msc' from the Run dialog box or command prompt.",
    "In the Group Policy editor, go to Computer Configuration > Windows Settings > Security Settings > Application Control Policies > AppLocker.",
    "Configure the AppLocker policies as required to restrict applications from running on the system.") -ResolveImg @("", "", "") -ResolveScript ""
}
elseif ($appLockerEnabled -eq "AuditOnly")
{
    Add-CodexOutput -CheckName "AppLocker Policy Configured" -State "Warn" -Message "AppLocker is configured to audit-only mode, which means applications are not restricted from running. Please consider enabling AppLocker enforcement mode to enhance system security." -ResolveSteps @("Open the Group Policy editor by running 'gpedit.msc' from the Run dialog box or command prompt.",
    "In the Group Policy editor, go to Computer Configuration > Windows Settings > Security Settings > Application Control Policies > AppLocker.",
    "Configure the AppLocker policies as required to restrict applications from running on the system.",
    "Change the enforcement mode from Audit-only to Enforce rules.") -ResolveImg @("", "", "", "") -ResolveScript ""
}
else
{
    Add-CodexOutput -CheckName "AppLocker Policy Configured" -State "Ok" -Message "AppLocker is configured and enforcing policies on this system, which restricts applications from running." -ResolveScript ""
}

Write-CodexOutput
