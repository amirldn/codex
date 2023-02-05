# This check looks for the presence of 'here' in the file path specified.

param (
    # File path of flag.txt
    [String]
    $FilePath
)

# Import the Codex module
$pwd = Get-Location
if ($pwd -notlike "*backend*")
{
    $modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
}
else
{
    $modulePath = Join-Path (Get-Location) "checks" -AdditionalChildPath @("Codex","Codex.psm1")
}
Import-Module $modulePath -Force


if (!$FilePath) {
    $FilePath = Join-Path (Get-Location) "tests" -AdditionalChildPath @("NewFile.txt")
}

try
{
    New-Item -Path $FilePath -ItemType File -Force | Out-Null
    Add-CodexOutput -CheckName "NewFile" -State Ok -Message "File '$FilePath' was created"
}
catch
{
    Add-CodexOutput -CheckName "NewFile" -State Crit -Message "File '$FilePath' was not created"
}

Write-CodexOutput