# This check returns a simple value back as stdout. Used as a test file to ensure things are set up correctly.

# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
Write-Output "Module path: $modulePath"
Import-Module $modulePath -Force

# Add some Codex output and display it

Add-CodexOutput -CheckName "Test_Ok" -State Ok -Message "This is OK test output"
Add-CodexOutput -CheckName "Test_Warn" -State Warn -Message "This is WARN test output"
Add-CodexOutput -CheckName "Test_Crit" -State Crit -Message "This is CRIT test output"

Write-CodexOutput