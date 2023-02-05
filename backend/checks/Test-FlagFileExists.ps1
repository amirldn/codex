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
    $FilePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("tests","flag.txt")
}

$content = Get-Content -Path $FilePath -ErrorAction SilentlyContinue
if ($content -eq 'here') {
    Add-CodexOutput -CheckName "FlagFileExists" -State Ok -Message "Content '$content' was found"
}
else {
    Add-CodexOutput -CheckName "FlagFileExists" -State Crit -Message "Content was not found"
}

Write-CodexOutput