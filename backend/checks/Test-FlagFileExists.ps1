# This check looks for the presence of 'here' in the file path specified.

param (
    # File path of flag.txt
    [String]
    $FilePath = "/Users/amaula/GitHub/codex/backend/tests/flag.txt"
)

# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
Import-Module $modulePath -Force

$content = Get-Content -Path $FilePath -ErrorAction SilentlyContinue
if ($content -eq 'here') {
    Add-CodexOutput -CheckName "FlagFileExists" -State Ok -Message "Content '$content' was found"
}
else {
    Add-CodexOutput -CheckName "FlagFileExists" -State Crit -Message "Content was not found"
}

Write-CodexOutput