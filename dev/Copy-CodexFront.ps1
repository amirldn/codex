Remove-Item -Path '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/src' -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/public' -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/build' -Recurse -Force -ErrorAction SilentlyContinue


New-Item -ItemType Directory -Path ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/src") -Force -ErrorAction Continue
New-Item -ItemType Directory -Path ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/public") -Force -ErrorAction Continue
New-Item -ItemType Directory -Path ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend/build") -Force -ErrorAction Continue


# Delete any existing files in the frontemd directory but avoiding node_modules
$filenames = Get-ChildItem '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/frontend' | Select-Object name | Where-Object { $_.name -ne "node_modules" -and $_.name -ne "out" }
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

