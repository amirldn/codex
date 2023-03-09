# Delete any existing files in the backend directory
Remove-Item -Path '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/backend' -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path '/Volumes/`[C`] Windows 11 (ARM)/codex-windows/startup' -Recurse -Force -ErrorAction SilentlyContinue

# Copy the codex-windows directory from the current directory to C:/
$filenames = Get-ChildItem '/Users/amaula/GitHub/codex/backend' | Select-Object name
foreach($filename in $filenames) {
    Write-Output $filename.name
    Copy-Item -Path ('/Users/amaula/GitHub/codex/backend/' + $filename.name) -Destination ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/backend") -Recurse -Force -ErrorAction Continue
}



$filenames = Get-ChildItem '/Users/amaula/GitHub/codex/startup' | Select-Object name
foreach($filename in $filenames) {
    Write-Output $filename.name
    Copy-Item -Path ('/Users/amaula/GitHub/codex/startup/' + $filename.name) -Destination ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/startup") -Recurse -Force -ErrorAction Continue
}


$filenames = Get-ChildItem '/Users/amaula/GitHub/codex/dev' | Select-Object name
foreach($filename in $filenames) {
    Write-Output $filename.name
    Copy-Item -Path ('/Users/amaula/GitHub/codex/dev/' + $filename.name) -Destination ("/Volumes/`[C`] Windows 11 (ARM)/codex-windows/dev") -Recurse -Force -ErrorAction Continue
}