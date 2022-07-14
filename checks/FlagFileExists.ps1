# This check looks for the presence of 'here' in the file path specified.

param (
    # File path of flag.txt
    [Parameter(Mandatory)]
    [String]
    $FilePath
)

$content = Get-Content -Path $FilePath -ErrorAction SilentlyContinue
if ($content -eq 'here') {
    Write-Output "OK"
}
else {
    Write-Output "CRIT"
}