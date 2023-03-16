# This script checks the disk usage on the server

param (
    # Drive letter to check (e.g. "C", "D", etc.)
    [String]
    $DriveLetter = "C"
)

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$','') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

$drive = Get-WmiObject -Class Win32_LogicalDisk | where {$_.deviceID -eq ($DriveLetter + ":")}
$freeSpace = "{0:N2}" -f ($drive.FreeSpace / 1GB)
$totalSpace = "{0:N2}" -f ($drive.Size / 1GB)
$percentFree = "{0:P2}" -f ($drive.FreeSpace / $drive.Size)

if ($percentFree -lt 0.1) {
    $params = @{
        "CheckName" = "Disk Usage on $($DriveLetter + ":")"
        "State" = "Crit"
        "Message" = "Drive $($DriveLetter + ":") is low on disk space. Only $percentFree ($freeSpace GB) of $totalSpace GB available."
        "ResolveSteps" = @("Search for 'Disk Cleanup' from the start menu and click on it.",
            "Select the drive you want to clean up and click 'OK'.",
            "Select the files you want to delete and click 'OK'.",
            "Click 'Delete Files' to delete the files.")
        "ResolveImg" = @("rdBmA1R.png", "RWSNeWZ.png","RWSNeWZ.png","RWSNeWZ.png")
    }
    Add-CodexOutput @params
}
else {
    $params = @{
        "CheckName" = "Disk Usage on $($DriveLetter + ":")"
        "State" = "Ok"
        "Message" = "Drive $($DriveLetter + ":") has $percentFree ($freeSpace GB) free out of $totalSpace GB total."
    }
    Add-CodexOutput @params
}

# Check if bitlocker is enabled
$bitlocker = Get-BitLockerVolume -MountPoint $DriveLetter

if ($bitlocker.VolumeStatus -eq "FullyEncrypted") {
    $params = @{
        "CheckName" = "Bitlocker on $($DriveLetter + ":")"
        "State" = "Ok"
        "Message" = "Bitlocker is enabled on $($DriveLetter + ":")"
    }
    Add-CodexOutput @params
}
else {
    $params = @{
        "CheckName" = "Bitlocker on $($DriveLetter + ":")"
        "State" = "Warn"
        "Message" = "Bitlocker is not enabled on $($DriveLetter + ":")"
        "ResolveSteps" = @("Search for 'Manage Bitlocker' from the start menu and click on it.",
            "Select the drive you want to encrypt and click 'Turn on Bitlocker'.",
            "Click 'Next' and follow the on-screen instructions.")
        "ResolveImg" = @("0kkkas.png", "5Ow2kna.png","BecMbOr.png")
        "ResolveScript" = "enablebitlocker"
    }
    Add-CodexOutput @params
}


Write-CodexOutput
