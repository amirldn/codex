# Import the Codex module
$modulePath = Join-Path (Get-Location) "checks" -AdditionalChildPath @("Codex","Codex.psm1")
Import-Module $modulePath -Force

#Check if Windows Defender is enabled
$defender = Get-MpPreference
if ($defender.DisableRealtimeMonitoring -eq $false) {
    Add-CodexOutput -CheckName "Windows Defender" -State Ok -Message "Windows Defender is enabled"
} else {
    Add-CodexOutput -CheckName "Windows Defender" -State Crit -Message "Windows Defender is disabled"
}

# Check when the last scan was run
# If greater than 7 days ago, return a warning
$lastScan = Get-MpComputerStatus
if ($lastScan.QuickScanEndTime) {
    $lastScanRunString = 'The last quick run scan was on ' + $lastScan.QuickScanEndTime + '.'
}
else {
    Add-CodexOutput -CheckName "Windows Defender Last Quick Scan" -State Crit -Message "A Windows Defender scan has never been ran on this system."
    return
}
if ($lastScan.QuickScanEndTime -lt (Get-Date).AddDays(-7)) {

    if ($lastScan.QuickScanEndTime -lt (Get-Date).AddDays(-30)) {
        Add-CodexOutput -CheckName "Windows Defender Last Scan" -State Crit -Message "Windows Defender has not run a scan in over 30 days. $($lastScanRunString)"
    } else {
        Add-CodexOutput -CheckName "Windows Defender Last Scan" -State Warn -Message "Windows Defender has not run a scan in over 7 days. The last run was on $($lastScanRunString)"
    }
} else {
    Add-CodexOutput -CheckName "Windows Defender Last Scan" -State Ok -Message "Windows Defender scan has been run in the last 7 days. $($lastScanRunString)"
}


Write-CodexOutput