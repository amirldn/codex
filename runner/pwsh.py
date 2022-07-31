import subprocess, sys
import logging
logging.basicConfig(filename='example.log',
                    encoding='utf-8',
                    level=logging.NOTSET,
                    format='%(asctime)s :: %(levelname)s | %(message)s',
                    datefmt='%m/%d/%Y %I:%M:%S %p')


# POWERSHELL EXE PATH
pwsh_path = "pwsh"


def run_pwsh_script(script_path,
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
                               script_path] + list(params)
        # TODO: figure out why this does not display to console
        logging.info("Running command: %s " % str(commandline_options))
        logging.warn("warning")
        logging.error("error")

        process_result = subprocess.run(commandline_options,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE,
                                        universal_newlines=True)  # CALL PROCESS

        print(process_result.returncode)  # PRINT RETURN CODE OF PROCESS  0 = SUCCESS, NON-ZERO = FAIL
        print(process_result.stdout)  # PRINT STANDARD OUTPUT FROM POWERSHELL
        print(process_result.stderr)  # PRINT STANDARD ERROR FROM POWERSHELL ( IF ANY OTHERWISE ITS NULL|NONE )
        print("hello")

        if process_result.returncode == 0:  # COMPARING RESULT
            Message = "Success !"
        else:
            Message = "Error Occurred !"

        return Message  # RETURN MESSAGE
    except Exception as e:
        logging.error(e)
        return "Internal error has occurred"
