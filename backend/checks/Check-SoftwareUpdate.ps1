# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force


# This check ensures that Google Chrome is up to date
try
{
    $chromeVersionInstalled = (Get-Item (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe').'(Default)').VersionInfo | select -ExpandProperty productversion
}
catch
{
    continue
}
if ($chromeVersionInstalled)
{
    try
    {
        $chromeVersionLatest = ((Invoke-WebRequest -Uri 'https://omahaproxy.appspot.com/all.json' -UseBasicParsing).Content | ConvertFrom-Json) | where { $_.os -eq 'win' } | select -ExpandProperty versions | where { $_.channel -eq 'stable' } | select -ExpandProperty current_version
        #   Compare the two versions
        if ($chromeVersionInstalled -ge $chromeVersionLatest)
        {
            Add-CodexOutput -CheckName 'Google Chrome is up to date' -State Ok -Message "Google Chrome is up to date. Version $chromeVersionInstalled is installed. Keeping software up to date is important to ensure that you have the latest security patches and bug fixes."
        }
        else
        {
            $params = @{
                "CheckName" = "Google Chrome is out of date"
                "State" = "Warn"
                "Message" = "Google Chrome is out of date. Version $chromeVersionInstalled is installed but version $chromeVersionLatest is available. Keeping software up to date is important to ensure that you have the latest security patches and bug fixes."
                "ResolveSteps" = @("Search for 'Google Chrome' from the start menu and click on it.",
                "Click on the three dots in the top right corner and click 'Settings'.",
                "Click on 'About Google Chrome' and click 'Relaunch'.")
                "ResolveImg" = @("fapB8jz.png", "CnmRIak.png", "2CwPTAL.png")
                "ResolveScript" = ""
            }
            Add-CodexOutput @params
        }
    }
    catch
    {
        continue
    }
}
else {
    Add-CodexOutput -CheckName 'Google Chrome is not installed' -State Ok -Message 'Google Chrome is not installed.'
}


Write-CodexOutput
