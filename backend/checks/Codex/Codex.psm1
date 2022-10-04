# in here, create some helper functions
# first helper is that it should check if a module is installed (like PSWindowsUpdate) and install it if not)

# Install-Module PSWindowsUpdate -Force
# Install-Module PSWindowsUpdate -Scope CurrentUser -Force

# should set execution policy to unrestricted

# Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force



# have some kind of Write-CodexOutput function that will output the state and message
# it will also need to use ; if there are multiple checks
# have a validate set also for Ok, Warn and Crit

New-Variable -Name codexOutput -Value @() -Scope Script -Force

function Add-CodexOutput {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [ValidateSet('Ok', 'Warn', 'Crit')]
        [string]$State,

        [Parameter(Mandatory)]
        [string]$Message,

        [Parameter(Mandatory)]
        [string]$CheckName
    )

    $checkResult = [PSCustomObject]@{
        "CheckName" = 'CheckName'
        "State"     = $State
        "Message"   = $Message
    }
    $script:codexOutput += $checkResult
    Write-Output $codexOutput

}

function Get-CodexOutput {
    [CmdletBinding()]
    $codexOutput
}

function Write-CodexOutput {
    [CmdletBinding()]
    $codexOutput | ConvertTo-Json
}

function Test-Administrator {  
    $user = [Security.Principal.WindowsIdentity]::GetCurrent();
    (New-Object Security.Principal.WindowsPrincipal $user).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)  
}

function Use-CodexModule {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$ModuleName
    )

    $isAdmin = Test-Administrator
    Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
    
    # Check if module requires Administrator
    if ($ModuleName -eq 'PSWindowsUpdate') {
        if ($isAdmin) {
            Install-Module PSWindowsUpdate -Force
        }
        else {
            Start-Process powershell -Verb runas -ArgumentList "Install-Module PSWindowsUpdate -Force"
        }
    }
    else {
        Install-Module $ModuleName -Scope CurrentUser -Force 
    }
    
}