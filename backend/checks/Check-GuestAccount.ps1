# This checks that no guest accounts are enabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

$accounts = Get-LocalUser
$guest = $accounts | Where-Object { $_.Name -eq 'Guest' }
if ($guest.Enabled -eq 'True')
{
    $params = @{
        "CheckName" = "Guest is Enabled"
        "State" = "Warn"
        "Message" = "The Guest account on this machine is enabled. This is not inherently a security risk, but it is a potential security risk as it is a default account that could be used by potential attackers if access to the machine is gained."
        "ResolveSteps" = @("Search for 'Computer Management' from the start menu and click on it.",
        "On the sidebar, click on 'Local Users and Groups' and then 'Users'.",
        "Right-click on the 'Guest' account and click 'Properties'.",
        "Tick the 'Account is disabled' checkbox and click 'OK'.")
        "ResolveImg" = @("12dfsLY.png", "A35k4Ri.png", "DKyYcRp.png", "Gz768go.png")
        "ResolveScript" = "fixguestaccount"
    }
    Add-CodexOutput @params
}
else
{
    Add-CodexOutput -CheckName 'Guest is Disabled' -State Ok -Message "The Guest account on this machine is disabled. This is not inherently a security risk, but it is a potential security risk as it is a default account that could be used by potential attackers if access to the machine is gained so it's best to disable it if unused."
}

Write-CodexOutput