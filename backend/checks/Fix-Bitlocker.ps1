# This scripts disables the guest account
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force



# Check if bitlocker is enabled
$bitlocker = Get-BitLockerVolume -MountPoint $DriveLetter

if ($bitlocker.VolumeStatus -eq "FullyEncrypted") {
    $params = @{
        "CheckName" = "Bitlocker on $($DriveLetter + ":")"
        "State" = "Ok"
        "Message" = "Bitlocker is already enabled on $($DriveLetter + ":")"
    }
    Add-CodexOutput @params
}
else {
    Enable-BitLocker -MountPoint $DriveLetter -UsedSpaceOnly -EncryptionMethod AES256 -PasswordProtector -RecoveryPasswordProtector -SkipHardwareTest -Force
    $params = @{
        "CheckName" = "Bitlocker on $($DriveLetter + ":")"
        "State" = "Ok"
        "Message" = "Bitlocker has now been enabled on $($DriveLetter + ":")"
    }
    Add-CodexOutput @params
}

Write-CodexOutput