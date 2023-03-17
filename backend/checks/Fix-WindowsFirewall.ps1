# This scripts disables the guest account
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force



$firewall = Get-NetFirewallProfile

$firewall | ForEach-Object {
    if ($_.Enabled -eq 'False')
    {
        Set-NetFirewallProfile -Profile $_.Name -Enabled True
        $changedFirewall = Get-NetFirewallProfile -Name $_.Name
        if ($changedFirewall.Enabled -eq 'True')
        {
            $params = @{
                CheckName = "$( $_.Name ) Firewall Enabled"
                State = 'Ok'
                Message = "The firewall for the profile '$( $_.Name )' is enabled"
            }
            Add-CodexOutput @params
            Write-CodexOutput
            exit 0
        }
        else
        {
            $params = @{
                CheckName = "$( $_.Name ) Firewall Disabled"
                State = 'Crit'
                Message = "The firewall for the profile '$( $_.Name )' could not be enabled."
            }
            Add-CodexOutput @params
            Write-CodexOutput
            exit 0
        }
    }
}

Add-CodexOutput -CheckName 'All Enabled' -State Ok -Message 'All firewalls are already enabled.'
Write-CodexOutput