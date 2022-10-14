# This check returns a simple value back as stdout. Used as a test file to ensure things are set up correctly.

Import-Module /Users/amaula/GitHub/codex/backend/checks/Codex/Codex.psm1 -Force


# Add some Codex output and display it

Add-CodexOutput -CheckName "Test_Ok" -State Ok -Message "This is OK test output"
Add-CodexOutput -CheckName "Test_Warn" -State Warn -Message "This is WARN test output"
Add-CodexOutput -CheckName "Test_Crit" -State Crit -Message "This is CRIT test output"

Write-CodexOutput