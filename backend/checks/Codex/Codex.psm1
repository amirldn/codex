New-Variable -Name codexOutput -Value @() -Scope Script -Force
$ErrorActionPreference = 'Stop'

function Add-CodexOutput
{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [ValidateSet('Ok', 'Warn', 'Crit', 'Unknown')]
        [string]$State,

        [Parameter(Mandatory)]
        [string]$Message,

        [Parameter(Mandatory)]
        [string]$CheckName,

        [string[]]$ResolveSteps,

        [string[]]$ResolveImg
    )

    $checkResult = [PSCustomObject]@{
        "CheckName" = $CheckName
        "State" = $State
        "Message" = $Message
        "ResolveSteps" = $ResolveSteps
        "ResolveImg" = $ResolveImg
        "ResolveScript" = $ResolveScript
    }
    $script:codexOutput += $checkResult
}

function Get-CodexOutput
{
    [CmdletBinding()]
    $codexOutput
}

function Write-CodexOutput
{
    [CmdletBinding()]
    param ()
    $i = 0
    $codexOutput | ForEach-Object {
        $_ | Add-Member -MemberType NoteProperty -Name ID -Value $i -Force
        $i += 1
    }


    $codexOutput | ConvertTo-Json -AsArray
}

function Clear-CodexOutput
{
    [CmdletBinding()]
    $script:codexOutput = @()
}

# Tests if Powershell is running as Administrator
# Requires Windows
function Test-CodexAdministrator
{

    if (Test-CodexOS -AllowedOS Windows)
    {
        $user = [Security.Principal.WindowsIdentity]::GetCurrent();
        (New-Object Security.Principal.WindowsPrincipal $user).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
    }
    else
    {
        Write-Error "Test-CodexAdministrator is only supported on Windows"
    }
}

# Determines what OS is running
function Get-CodexOS
{
    if ($isWindows)
    {
        "Windows"
    }
    elseif ($isLinux)
    {
        "Linux"
    }
    elseif ($isMacOS)
    {
        "MacOS"
    }
    else
    {
        "Unknown"
    }
}

# Helper command to check if a cmdlet can be ran on this OS
function Test-CodexOS
{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [ValidateSet('Windows', 'Linux', 'MacOS')]
        [string]$AllowedOS
    )

    if ($AllowedOS -eq (Get-CodexOS))
    {
        return $true
    }
    else
    {
        return $false
    }
}

$ModuleCompatibility = @{
    "PSWindowsUpdate" = "Windows"
}


function Get-CodexCompatibleCheck
{
    [CmdletBinding()]
    param ()
    $json = Get-Content -Path '/Users/amaula/GitHub/codex/backend/checks/checks.json' | ConvertFrom-Json
    $checks = $json.checks

    $os = Get-CodexOS
    $compatible = @()
    $checks | foreach {
        if ($_.os = = $os)
        {
            $compatible += $_
        }
    }
    $compatible | ConvertTo-Json -AsArray
}

function New-CodexCompatibleCheckList
{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Path = '/Users/amaula/GitHub/codex/backend/local/compatiblechecks.json'
    )

    $checks = Get-CodexCompatibleCheck
    $checks | Out-File -FilePath $Path
}

# Installs third party modules
function Use-CodexModule
{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$ModuleName
    )

    $isAdmin = Test-CodexAdministrator
    if ((Get-CodexOS) -ne 'MacOS')
    {
        Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
    }

    # Check if the module can be used on this OS
    if ($ModuleCompatibility[$ModuleName] -notcontains (Get-CodexOS))
    {
        Write-Error "Module $ModuleName is not compatible with this OS ($( Get-CodexOS ))"
    }

    #    TODO: check if module is installed already

    # Check if module requires Administrator
    if ($ModuleName -eq 'PSWindowsUpdate')
    {

        if ($isAdmin)
        {
            Install-Module PSWindowsUpdate -Force
        }
        else
        {
            Start-Process powershell -Verb runas -ArgumentList "Install-Module PSWindowsUpdate -Force"
        }
    }
    else
    {
        Install-Module $ModuleName -Scope CurrentUser -Force
    }

}


# Intialisation code
function Start-CodexModule
{
    [CmdletBinding()]
    param ()
    $os = Get-CodexOS
    New-CodexCompatibleCheckList
    $modulesToUse = foreach ($module in $ModuleCompatibility.Keys)
    {
        if ($ModuleCompatibility[$module] -eq $os)
        {
            $module.Value
        }
    }
    $modulesToUse | ForEach-Object {
        Use-CodexModule -ModuleName $_
    }
}