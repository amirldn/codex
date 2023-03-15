# This check returns a simple value back as stdout. Used as a test file to ensure things are set up correctly.

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$','') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

# Add some Codex output and display it
Add-CodexOutput -CheckName "Test_Ok" -State Ok -Message "This is OK test output"
Add-CodexOutput -CheckName "Test_Warn" -State Warn -Message "This is WARN test output" -ResolveSteps @("Step 1 of resolving","Step 2 of resolving","Step 3 of resolving") -ResolveImg @("t2Eths8.png","","t2Eths8.png")
Add-CodexOutput -CheckName "Test_Crit" -State Crit -Message "This is CRIT test output" -ResolveSteps @("Step 1 of resolving","Step 2 of resolving","Step 3 of resolving") -ResolveImg @("t2Eths8.png","","t2Eths8.png") -ResolveScript "fixtestoutput"
Add-CodexOutput -CheckName "Test_Ok" -State Ok -Message "This is another OK test output"

Write-CodexOutput