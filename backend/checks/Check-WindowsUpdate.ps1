# This check looks for the presence of 'here' in the file path specified.
param (
    # File path of flag.txt
    [Parameter(Mandatory)]
    [String]
    $FilePath
)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
Import-Module $modulePath -Force

# use the codex helper module to install PSWindowsUpdate module correctly
Use-CodexModule -ModuleName PSWindowsUpdate

$update = Get-WindowsUpdate
if ($update) {
    $update | ForEach-Object {
        Add-CodexOutput -CheckName 'Check-WindowsUpdate' -State Warn -Message "$_ is avaliable for install"
    }
}
else {
    Add-CodexOutput -CheckName 'Check-WindowsUpdate' -State Ok -Message "No updates are avaliable"
}

Write-CodexOutput