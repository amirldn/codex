# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

#Check if Windows Defender is enabled
$defender = Get-MpPreference
if ($defender.DisableRealtimeMonitoring -eq $false)
{
    Add-CodexOutput -CheckName "Windows Defender" -State Ok -Message "Windows Defender is enabled. Realtime monitoring is enabled which will scan files as they are created or modified therefore improving the security of your system."
}
else
{
    $params = @{
        "CheckName" = "Windows Defender"
        "State" = "Crit"
        "Message" = "Windows Defender is enabled but realtime monitoring is disabled. This means that files will not be scanned as they are created or modified. This is a potential security risk as it means that files could be created or modified by an attacker and then executed without being scanned."
        "ResolveSteps" = @("Search for 'Windows Security' from your start menu and click on it.",
        "On the sidebar, click on 'Virus & threat protection'.",
        "Click the 'Turn On' button next to 'Real-time protection'.",
        "Accept the UAC prompt."
        )
        "ResolveImg" = @("WggLeGY.png", "3dbdhuj.png", "kWPJChv.png", "5vx4Fu3.png")
        "ResolveScript" = "fixwindowsdefender"
    }
    Add-CodexOutput @params
}

# Check when the last scan was run
# If greater than 7 days ago, return a warning
$lastScan = Get-MpComputerStatus
if ($lastScan.QuickScanEndTime)
{
    $lastScanRunString = 'The last quick run scan was on ' + $lastScan.QuickScanEndTime + '.'
}
else
{
    Add-CodexOutput -CheckName "Windows Defender Last Quick Scan" -State Crit -Message "A Windows Defender scan has never been ran on this system."
    return
}
if ($lastScan.QuickScanEndTime -lt (Get-Date).AddDays(-7))
{

    if ($lastScan.QuickScanEndTime -lt (Get-Date).AddDays(-30))
    {
        Add-CodexOutput -CheckName "Windows Defender Last Scan" -State Crit -Message "Windows Defender has not run a scan in over 30 days. $( $lastScanRunString )"
    }
    else
    {
        Add-CodexOutput -CheckName "Windows Defender Last Scan" -State Warn -Message "Windows Defender has not run a scan in over 7 days. The last run was on $( $lastScanRunString )"
    }
}
else
{
    Add-CodexOutput -CheckName "Windows Defender Last Scan" -State Ok -Message "Windows Defender scan has been run in the last 7 days. $( $lastScanRunString )"
}


Write-CodexOutput