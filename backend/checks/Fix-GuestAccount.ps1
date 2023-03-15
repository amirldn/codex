# This scripts disables the guest account
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
    Disable-LocalUser -Name 'Guest'
    $accounts = Get-LocalUser
    $guest = $accounts | Where-Object { $_.Name -eq 'Guest' }
    if ($guest.Enabled -eq 'True')
    {
        Add-CodexOutput -CheckName 'Failed' -State Crit -Message 'Failed to disable the Guest account.'
    }
    else
    {
        Add-CodexOutput -CheckName 'Guest is Disabled' -State Ok -Message "Guest account is now disabled."
    }
}
else
{
    Add-CodexOutput -CheckName 'Guest is already disabled' -State Ok -Message "The Guest account on this machine is disabled."
}

Write-CodexOutput