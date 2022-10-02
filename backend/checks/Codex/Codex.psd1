# in here, create some helper functions
# first helper is that it should check if a module is installed (like PSWindowsUpdate) and install it if not)
 #>

Install-Module PSWindowsUpdate -Force
Install-Module PSWindowsUpdate -Scope CurrentUser -Force
  #>

# should set execution policy to unrestricted

Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
   #>



# have some kind of Write-CodexOutput function that will output the state and message
# it will also need to use ; if there are multiple checks
# have a validate set also for Ok, Warn and Crit
    #>