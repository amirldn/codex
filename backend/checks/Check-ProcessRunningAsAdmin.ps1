# Import the Codex module
$pwd = $MyInvocation.MyCommand.Path
$modulePath = Join-Path ($pwd -replace '[^\\/]+$', '') "Codex" -AdditionalChildPath @("Codex.psm1")
Import-Module $modulePath -Force

# Credit to: https://gist.github.com/0xfeeddeadbeef/ce341bbca071099fd6952abab896aaac#file-test-processelevated-ps1
function Test-ProcessElevated
{
    [CmdletBinding()]
    [OutputType([bool])]
    param (
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [System.Diagnostics.Process] $Process
    )

    begin {
        $CSharpCode = @'
namespace SecurityUtils
{
    using System;
    using System.ComponentModel;
    using System.Diagnostics;
    using System.Runtime.InteropServices;
    using System.Security;
    using System.Security.Principal;
    using Microsoft.Win32.SafeHandles;

    public static class Win32
    {
        public const string Advapi32Dll = "advapi32.dll";
        public const string Kernel32Dll = "kernel32.dll";
        public const int ERROR_SUCCESS = 0;
        public const uint PROCESS_QUERY_INFORMATION = 0x0400;
        public const uint PROCESS_QUERY_LIMITED_INFORMATION = 0x1000;

        [DllImport(Advapi32Dll, CallingConvention = CallingConvention.Winapi, SetLastError = true)]
        [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
        [SuppressUnmanagedCodeSecurity]
        [return: MarshalAs(UnmanagedType.Bool)]
        internal static extern bool OpenProcessToken(
            SafeProcessHandle ProcessToken,
            TokenAccessLevels DesiredAccess,
            out SafeAccessTokenHandle TokenHandle);

        [DllImport(Advapi32Dll, CallingConvention = CallingConvention.Winapi, SetLastError = true)]
        [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
        [SuppressUnmanagedCodeSecurity]
        [return: MarshalAs(UnmanagedType.Bool)]
        internal static extern unsafe bool GetTokenInformation(
            SafeAccessTokenHandle TokenHandle,
            TOKEN_INFORMATION_CLASS TokenInformationClass,
            void* TokenInformation,
            uint TokenInformationLength,
            out uint ReturnLength);

        [DllImport(Kernel32Dll, CallingConvention = CallingConvention.Winapi, SetLastError = true)]
        [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
        [SuppressUnmanagedCodeSecurity]
        [return: MarshalAs(UnmanagedType.Bool)]
        internal static extern bool CloseHandle(IntPtr hObject);

        [DllImport(Kernel32Dll, CallingConvention = CallingConvention.Winapi, SetLastError = true)]
        [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
        [SuppressUnmanagedCodeSecurity]
        internal static extern SafeProcessHandle OpenProcess(
            uint dwDesiredAccess,
            [MarshalAs(UnmanagedType.Bool)] bool bInheritHandle,
            uint dwProcessId);

        /// <summary>
        /// Determines whether or not the specified application was launched by an administrator
        /// in UAC elevated mode.
        /// </summary>
        /// <returns><c>true</c> if the process possesses an elevated token.</returns>
        public static unsafe bool IsProcessElevated(int processId)
        {
            SafeAccessTokenHandle token;

            using (SafeProcessHandle ph = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, false, (uint)processId))
            {
                if (ph == null || ph.IsInvalid)
                {
                    throw new Win32Exception();
                }

                if (!OpenProcessToken(ph, TokenAccessLevels.Query, out token))
                {
                    throw new Win32Exception();
                }

                using (token)
                {
                    var elevation = new TOKEN_ELEVATION();
                    uint ignored = 0;

                    if (!GetTokenInformation(
                        token,
                        TOKEN_INFORMATION_CLASS.TokenElevation,
                        &elevation,
                        (uint)sizeof(TOKEN_ELEVATION),
                        out ignored))
                    {
                        throw new Win32Exception();
                    }

                    return elevation.TokenIsElevated != BOOL.FALSE;
                }
            }
        }

        public static unsafe bool IsProcessElevated(Process process)
        {
            return IsProcessElevated(process.Id);
        }

        /// <summary>
        /// Blittable version of Windows BOOL type. It is convenient in situations where
        /// manual marshalling is required, or to avoid overhead of regular bool marshalling.
        /// </summary>
        /// <remarks>
        /// Some Windows APIs return arbitrary integer values although the return type is defined
        /// as BOOL. It is best to never compare BOOL to TRUE. Always use bResult != BOOL.FALSE
        /// or bResult == BOOL.FALSE .
        /// </remarks>
        internal enum BOOL : int
        {
            FALSE = 0,
            TRUE = 1,
        }

        /// <seealso href="https://docs.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-token_elevation"/>
        internal struct TOKEN_ELEVATION
        {
            public BOOL TokenIsElevated;
        }

        /// <seealso href="https://docs.microsoft.com/en-us/windows/win32/api/winnt/ne-winnt-token_information_class"/>
        internal enum TOKEN_INFORMATION_CLASS : uint
        {
            TokenUser = 1,
            TokenGroups,
            TokenPrivileges,
            TokenOwner,
            TokenPrimaryGroup,
            TokenDefaultDacl,
            TokenSource,
            TokenType,
            TokenImpersonationLevel,
            TokenStatistics,
            TokenRestrictedSids,
            TokenSessionId,
            TokenGroupsAndPrivileges,
            TokenSessionReference,
            TokenSandBoxInert,
            TokenAuditPolicy,
            TokenOrigin,
            TokenElevationType,
            TokenLinkedToken,
            TokenElevation,
            TokenHasRestrictions,
            TokenAccessInformation,
            TokenVirtualizationAllowed,
            TokenVirtualizationEnabled,
            TokenIntegrityLevel,
            TokenUIAccess,
            TokenMandatoryPolicy,
            TokenLogonSid,
            TokenIsAppContainer,
            TokenCapabilities,
            TokenAppContainerSid,
            TokenAppContainerNumber,
            TokenUserClaimAttributes,
            TokenDeviceClaimAttributes,
            TokenRestrictedUserClaimAttributes,
            TokenRestrictedDeviceClaimAttributes,
            TokenDeviceGroups,
            TokenRestrictedDeviceGroups,
            TokenSecurityAttributes,
            TokenIsRestricted,
            MaxTokenInfoClass
        }
    }
}
'@

        if (-not ([System.Management.Automation.PSTypeName]'SecurityUtils.Win32').Type)
        {
            # In Windows PowerShell, Add-Type -CompilerParameters is different:
            if ($PSVersionTable.PSVersion.Major -lt 6) {
                $compParams = New-Object -TypeName 'System.CodeDom.Compiler.CompilerParameters'
                $compParams.CompilerOptions = '/unsafe+'
                $compParams.ReferencedAssemblies.Add('System.dll') > $null
                $compParams.ReferencedAssemblies.Add('System.Core.dll') > $null
                Add-Type -TypeDefinition $CSharpCode -Language CSharp -CompilerParameters $compParams
            } else {
                Add-Type -TypeDefinition $CSharpCode -Language CSharp -CompilerOptions '-unsafe+'
            }
        }

        # Debugger privilege is required:
        [System.Diagnostics.Process]::EnterDebugMode()
    }

    process {
        return [SecurityUtils.Win32]::IsProcessElevated($Process)
    }

    end {
        [System.Diagnostics.Process]::LeaveDebugMode()
    }
}


# Check that any proceses that should not be running as admin are not running as admin
$processes = Get-Process -Name "chrome", "firefox", "iexplore", "msedge", "opera", "safari", "vivaldi", "excel", "word", "powerpnt", "outlook", "onenote", "visio", "skype", "teams", "msteams", "slack", "zoom", "discord", "skypeforbusiness", "skypeforbusiness", "notepad" -ErrorAction SilentlyContinue | Select-Object -Unique
$processes | ForEach-Object {
    if ($_ | Test-ProcessElevated )
    {
        Add-CodexOutput -CheckName "$( $_.Name ) running with administrator permissions" -State Crit -Message "$( $_.Name ) is running as admin - this is a security risk as it allows malicious code to take control of your system. This application should generally be run with limited permissions." -ResolveSteps @("Close the application and launch $( $_.Name ) again but with limited permissions")
    }
    else
    {
        Add-CodexOutput -CheckName "$( $_.Name ) running with limited permissions" -State Ok -Message "$( $_.Name ) is not running with administrator permissions. This is ideal as it reduces the risk of malicious code being able to take control of your system."
    }
}

if (-not $processes)
{
    Add-CodexOutput -CheckName "No potential risks found" -State Ok -Message "No processes were found running that should not be running as admin."
}
Write-CodexOutput