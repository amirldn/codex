# This check looks for the presence of 'here' in the file path specified.
param ()

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

# use the codex helper module to install PSWindowsUpdate module correctly
Use-CodexModule -ModuleName PSWindowsUpdate

# Check Windows Update service is running
$service = Get-Service -Name wuauserv
if ($service.Status -ne "Running")
{
    $params = @{
        "CheckName" = "Windows Update Service is Disabled"
        "State" = "Crit"
        "Message" = "The Windows Update service is not running - you should enable this service to ensure your operating system and other software is up to date."
        "ResolveSteps" = @("Search for 'Services' from the start menu and click on it.",
        "Double-click on the 'Windows Update' service.",
        "Click 'Start' on the 'Windows Update' service.",
        "Click 'Apply' and then 'OK'.")
        "ResolveImg" = @("baNNiBk.png", "CYnogxJ.png", "UQHfFvs.png", "BKhbIv0.png")
        "ResolveScript" = "enablewindowsupdateservice"
    }
    Add-CodexOutput @params
    Write-CodexOutput
    return
}
else
{
    Add-CodexOutput -CheckName "Windows Update Service is Enabled" -State Ok -Message "Windows Update service is running. This service is used to ensure your operating system and other software is up to date."
}


# Get list of available updates
$update = Get-WindowsUpdate
if ($update)
{
    $updateList = ""
    $update | foreach { $updateList += (($_.Title -replace ',', '') + ", ") }
    $updateList = $updateList.Substring(0, $updateList.Length - 2)

    $params = @{
        "CheckName" = "Updates Avaliable"
        "State" = "Warn"
        "Message" = "It looks like there are update(s) avaliable for your system. The following updates are avaliable for install: [$updateList]"
        "ResolveSteps" = @("Search for 'Windows Update' from the start menu and click on it.",
        "Click 'Check for updates' and then follow the on-screen instructions.")
        "ResolveImg" = @("CfXpVA7.png", "EC4Kyfc.png")
        "ResolveScript" = ""
    }

    Add-CodexOutput @params
}
else
{
    Add-CodexOutput -CheckName 'Check-WindowsUpdate' -State Ok -Message "No updates are avaliable. You should ensure your operating system and other software is up to date so that you are protected from security vulnerabilities. Keep in mind that some updates may require a reboot to take effect."
}

Write-CodexOutput