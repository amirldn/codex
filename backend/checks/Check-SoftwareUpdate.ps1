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
            Add-CodexOutput -CheckName 'Google Chrome is up to date' -State Ok -Message "Google Chrome is up to date. Version $chromeVersionInstalled is installed."
        }
        else
        {
            Add-CodexOutput -CheckName 'Google Chrome is out of date' -State Warn -Message "Google Chrome is out of date. Version $chromeVersionInstalled is installed but version $chromeVersionLatest is available."
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
