# Import the Codex module
$modulePath = Join-Path (Get-Location) "checks" -AdditionalChildPath @("Codex","Codex.psm1")
Import-Module $modulePath -Force