# This check looks for the presence of 'here' in the file path specified.

param (
    # File path of flag.txt
    [Parameter(Mandatory)]
    [String]
    $FilePath
)

Import-Module /Users/amaula/GitHub/codex/runner/checks/Codex/Codex.psm1 -Force

$content = Get-Content -Path $FilePath -ErrorAction SilentlyContinue
if ($content -eq 'here') {
    Add-CodexOutput -CheckName "FlagFileExists" -State Ok -Message "Content '$content' was found"
}
else {
    Add-CodexOutput -CheckName "FlagFileExists" -State Crit -Message "Content was not found"
}