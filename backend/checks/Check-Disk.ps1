# This script checks the disk usage on the server

param (
    # Drive letter to check (e.g. "C", "D", etc.)
    [String]
    $DriveLetter = "C"
)

#TODO: check bitlocker enabled
# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
Import-Module $modulePath -Force

$drive = Get-WmiObject -Class Win32_LogicalDisk -Filter "DeviceID='$DriveLetter:'"
$freeSpace = "{0:N2}" -f ($drive.FreeSpace / 1GB)
$totalSpace = "{0:N2}" -f ($drive.Size / 1GB)
$percentFree = "{0:P2}" -f ($drive.FreeSpace / $drive.Size)

if ($percentFree -lt 0.1) {
    Add-CodexOutput -CheckName "DiskUsage" -State Crit -Message "Drive $DriveLetter: is low on disk space. Only $percentFree ($freeSpace GB) of $totalSpace GB available."
}
else {
    Add-CodexOutput -CheckName "DiskUsage" -State Ok -Message "Drive $DriveLetter: has $percentFree ($freeSpace GB) of $totalSpace GB available."
}

Write-CodexOutput
