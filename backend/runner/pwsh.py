import subprocess, logging

# POWERSHELL EXE PATH
pwsh_path = "pwsh"
# TODO: Set this to be some env variable using os
script_path_prefix = '/Users/amaula/GitHub/codex/backend/checks/'


def run_pwsh_script(
        script_filename,
        script_path_prefix=script_path_prefix,
                    *params):
    """
    Run a powershell command and return the output

    Arguments:
        script_path {str} -- Path to the PowerShell script
        *params {[any]]} -- Parameters to pass to the script (if any)
    """
    try:
        commandline_options = [pwsh_path,
                               '-ExecutionPolicy',
                               'Unrestricted',
                               '-NonInteractive',
                               (script_path_prefix + script_filename)] + list(params)
        logging.info("Running command: %s " % str(' '.join(commandline_options)))

        process_result = subprocess.run(commandline_options,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE,
                                        universal_newlines=True)  # CALL PROCESS

        logging.info("Return Code: {}".format(process_result.returncode))  # PRINT RETURN CODE OF PROCESS  0 = SUCCESS, NON-ZERO = FAIL
        if (process_result.stdout):
            logging.debug("stdout: {}".format(process_result.stdout.strip()))  # PRINT STANDARD OUTPUT FROM POWERSHELL
        if (process_result.stderr != ""):
            logging.error("stderr: {}".format(process_result.stderr))  # PRINT STANDARD ERROR FROM POWERSHELL ( IF ANY OTHERWISE ITS NULL|NONE )

        if process_result.returncode == 0:  # COMPARING RESULT
            Message = "Success !"
        else:
            Message = "Error Occurred !"

        return Message  # RETURN MESSAGE
    except Exception as e:
        logging.error(e)
        return "Internal error has occurred"
