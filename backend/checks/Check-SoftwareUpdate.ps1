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