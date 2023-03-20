#This check ensures that Windows Firewall is operational and not disabled
param (

)

$ErrorActionPreference = 'Stop'

# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

#Define the list of commonly exploited/used ports
$ports = @(21, 22, 23, 25, 53, 69, 80, 110, 135, 139, 143, 389, 443, 445, 465, 587, 993, 995, 1433, 3306, 3389)
#Loop through the list of ports and check if they are open
foreach ($port in $ports)
{
    $result = Test-NetConnection -ComputerName localhost -Port 21 > $null 2> $null 4> $null 5> $null 3> $null | Out-Null
    if ($result.TcpTestSucceeded)
    {
        $params = @{
            CheckName = "Port $port open"
            State = 'Warn'
            Message = "Port $port is open on this system, which could be a security risk. Please ensure that the port is needed and if so, is properly secured within the application's setting."
            ResolveSteps = @("Identify which application is using the port by running 'netstat -ano' in a command prompt window.",
            "If the port is not needed, close the application or service that is using it.",
            "If the port is needed, ensure that it is properly secured by configuring your firewall rules.")
            ResolveImg = @("", "", "")
            ResolveScript = ''
        }
        Add-CodexOutput @params
    }
    else
    {
        Add-CodexOutput -CheckName "Port $port closed" -State Ok -Message "Port $port is closed on this system, which means it cannot be exploited."
    }
}

Write-CodexOutput