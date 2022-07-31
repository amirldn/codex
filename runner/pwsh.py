import subprocess, sys


# def run_pwsh(script_path, params=""):
#     """
#     Run a powershell command and return the output
#     """
#     try:
#         # p = subprocess.Popen('powershell.exe -ExecutionPolicy RemoteSigned -file "hello world.ps1"', stdout=sys.stdout)
#         # p.communicate()
#         process = subprocess.Popen(["pwsh",
#                               f"{script_path}"],
#                              stdout=subprocess.PIPE)
#         while True:
#             output = process.stdout.readline()
#             if output.strip() == "b''" and process.poll() is not None:
#                 return "ERROR: pwsh finished with no output"
#             if output:
#                 print("output was given", output.strip())
#                 return output.strip()
#     except subprocess.CalledProcessError as e:
#         return (e.output)

  # POWERSHELL EXE PATH
pwsh_path = "pwsh"

def run_pwsh_script(script_path, *params):  # SCRIPT PATH = POWERSHELL SCRIPT PATH,  PARAM = POWERSHELL SCRIPT PARAMETERS ( IF ANY )

    commandline_options = [pwsh_path, '-ExecutionPolicy', 'Unrestricted', script_path]  # ADD POWERSHELL EXE AND EXECUTION POLICY TO COMMAND VARIABLE
    print("Running command: ", commandline_options)
    for param in params:  # LOOP FOR EACH PARAMETER FROM ARRAY
        commandline_options.append("'" + param + "'")  # APPEND YOUR FOR POWERSHELL SCRIPT

    process_result = subprocess.run(commandline_options, stdout = subprocess.PIPE, stderr = subprocess.PIPE, universal_newlines = True)  # CALL PROCESS

    print(process_result.returncode)  # PRINT RETURN CODE OF PROCESS  0 = SUCCESS, NON-ZERO = FAIL
    print(process_result.stdout)      # PRINT STANDARD OUTPUT FROM POWERSHELL
    print(process_result.stderr)      # PRINT STANDARD ERROR FROM POWERSHELL ( IF ANY OTHERWISE ITS NULL|NONE )

    if process_result.returncode == 0:  # COMPARING RESULT
        Message = "Success !"
    else:
        Message = "Error Occurred !"

    return Message  # RETURN MESSAGE