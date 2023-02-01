# Import the Codex module
$modulePath = Join-Path (Get-Location) "backend" -AdditionalChildPath @("checks","Codex","Codex.psm1")
Import-Module $modulePath -Force

#Check if Windows Defender is enabled
$defender = Get-MpPreference
if ($defender.DisableRealtimeMonitoring -eq $false) {
    Add-CodexOutput -CheckName "Windows Defender" -State Ok -Message "Windows Defender is enabled"
} else {
    Add-CodexOutput -CheckName "Windows Defender" -State Crit -Message "Windows Defender is disabled"
}


Write-CodexOutput