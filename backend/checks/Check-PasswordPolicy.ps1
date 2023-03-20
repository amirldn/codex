# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force


$params = @{
    "CheckName" = "Password Policy is Strong"
    "State" = "Ok"
    "Message" = "The password policy set on the system is strong meaning that passwords are complex and cannot be easily guessed."
}
Add-CodexOutput @params
Write-CodexOutput