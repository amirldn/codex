# Delete any existing files in the backend directory
Remove-Item -Path '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/backend' -Recurse -Force -ErrorAction SilentlyContinue

# Delete any existing files in the frontemd directory but avoiding node_modules
$filenames = Get-ChildItem '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend' | Select-Object name | Where-Object { $_.name -ne "node_modules" -and $_.name -ne "package-lock.json" -and $_.name -ne "out" }
foreach ($filename in $filenames)
{
    Write-Output $filename.name
    Remove-Item -Path ('/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/' + $filename.name) -Recurse -Force -ErrorAction Continue
}

# Copy the codex-windows frontend directory from the current directory to C:/
$filenames = Get-ChildItem '/Users/amaula/GitHub/codex/frontend' | Select-Object name | Where-Object { $_.name -ne "node_modules" -and $_.name -ne "package-lock.json" -and $_.name -ne "out" }
foreach ($filename in $filenames)
{
    Write-Output $filename.name
    Copy-Item -Path ('/Users/amaula/GitHub/codex/frontend/' + $filename.name) -Destination ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend") -Recurse -Force -ErrorAction Continue
}

# Copy the codex-windows directory from the current directory to C:/
$filenames = Get-ChildItem '/Users/amaula/GitHub/codex/backend' | Select-Object name
foreach ($filename in $filenames)
{
    Write-Output $filename.name
    Copy-Item -Path ('/Users/amaula/GitHub/codex/backend/' + $filename.name) -Destination ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/backend") -Recurse -Force -ErrorAction Continue
}


$filenames = Get-ChildItem '/Users/amaula/GitHub/codex/redist' | Select-Object name
foreach ($filename in $filenames)
{
    Write-Output $filename.name
    Copy-Item -Path ('/Users/amaula/GitHub/codex/redist/' + $filename.name) -Destination ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/redist") -Recurse -ErrorAction Continue
}
