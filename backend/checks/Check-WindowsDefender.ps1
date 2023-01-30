# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
Import-Module $modulePath -Force