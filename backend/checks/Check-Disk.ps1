# This script checks the disk usage on the server

param (
    # Drive letter to check (e.g. "C", "D", etc.)
    [String]
    $DriveLetter = "C"
)

# Import the Codex module
$modulePath = Join-Path (Get-Location) "checks" -AdditionalChildPath @("Codex","Codex.psm1")
Import-Module $modulePath -Force

$drive = Get-WmiObject -Class Win32_LogicalDisk | where {$_.deviceID -eq ($DriveLetter + ":")}
$freeSpace = "{0:N2}" -f ($drive.FreeSpace / 1GB)
$totalSpace = "{0:N2}" -f ($drive.Size / 1GB)
$percentFree = "{0:P2}" -f ($drive.FreeSpace / $drive.Size)

if ($percentFree -lt 0.1) {
    Add-CodexOutput -CheckName "Disk Usage on $($DriveLetter + ":")" -State Crit -Message "Drive $($DriveLetter + ":") is low on disk space. Only $percentFree ($freeSpace GB) of $totalSpace GB available."
}
else {
    Add-CodexOutput -CheckName "Disk Usage on $($DriveLetter + ":")" -State Ok -Message "Drive $($DriveLetter + ":") has $percentFree ($freeSpace GB) free out of $totalSpace GB total."
}

# Check if bitlocker is enabled
$bitlocker = Get-BitLockerVolume -MountPoint $DriveLetter

if ($bitlocker.VolumeStatus -eq "FullyEncrypted") {
    Add-CodexOutput -CheckName "Bitlocker on $($DriveLetter + ":")" -State Ok -Message "Bitlocker is enabled on $($DriveLetter + ":")"
}
else {
    Add-CodexOutput -CheckName "Bitlocker on $($DriveLetter + ":")" -State Warn -Message "Bitlocker is not enabled on $($DriveLetter + ":")"
}


Write-CodexOutput
