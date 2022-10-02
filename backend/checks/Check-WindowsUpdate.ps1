# This check looks for the presence of 'here' in the file path specified.

param (
    # File path of flag.txt
    [Parameter(Mandatory)]
    [String]
    $FilePath
)

# use the codex helper module to install PSWindowsUpdate module correctly
$update = Get-WindowsUpdate
if ($update) {
    $update | foreach {
        Write-CodexOutput -State Warn -Message "$_ is avaliable for install"
    }
}
else {
    Write-CodexOutput -State Ok -Message "No updates are avaliable"
}