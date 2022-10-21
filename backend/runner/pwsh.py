import json
import logging
import subprocess

# POWERSHELL EXE PATH
pwsh_path = "pwsh"
# TODO: Set this to be some env variable using os
script_path_prefix = '/Users/amaula/GitHub/codex/backend/checks/'


def convert_to_dict(result):
    """
    Convert the result to a dictionary

    Arguments:
        result {str} -- Result from the PowerShell script

    Returns:
        dict -- Dictionary of the result
    """
    return json.loads(result)


def run_pwsh_script(
        script_filename,
        # script_path_folder=script_path_prefix,
        *params):
    """
    Run a powershell command and return the output

    Arguments:
        script_filename {str} -- Filename of the  PowerShell script
        # script_path_prefix {str} -- Path to the PowerShell script (default: {script_path_prefix})
        *params {[any]]} -- Parameters to pass to the script (if any)
    """
    try:
        commandline_options = [pwsh_path,
                               '-ExecutionPolicy',
                               'Unrestricted',
                               '-NonInteractive',
                               (script_path_prefix + script_filename)] + list(params)
        logging.info("Running command: %s " % str(' '.join(commandline_options)))

        # Runs the command and returns the output
        process_result = subprocess.run(commandline_options,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE,
                                        universal_newlines=True)

        logging.debug("pwsh return code: {}".format(
            process_result.returncode))  # PRINT RETURN CODE OF PROCESS  0 = SUCCESS, NON-ZERO = FAIL
        if process_result.stdout:
            logging.debug(
                "pwsh stdout: {}".format(process_result.stdout.strip()))  # PRINT STANDARD OUTPUT FROM POWERSHELL
        if process_result.stderr != "":
            logging.error("pwsh stderr: {}".format(
                process_result.stderr))  # PRINT STANDARD ERROR FROM POWERSHELL ( IF ANY OTHERWISE ITS NULL|NONE )

        if process_result.returncode == 0:
            # Return the output and the return code if successful
            logging.debug("pwsh ran successfully")
            stdout = process_result.stdout.strip()
            return stdout, process_result.returncode
        else:
            # If an internal error occurs, create a JSON to return
            logging.error("pwsh ran with non-zero exit code")
            error = {"fault": {
                "brief": "Pwsh Runner Non-Zero Error",
                "stderr": process_result.stderr.strip(),
                "stdout": process_result.stdout.strip(),
                "code": process_result.returncode}
            }
            return error, process_result.returncode

    except Exception:
        error = {"fault": {
            "brief": "Pwsh Runner Non-Zero Error",
            "stderr": process_result.stderr.strip(),
            "stdout": process_result.stdout.strip(),
            "code": process_result.returncode}
        }
        logging.error("pwsh exception occurred: {}".format(error))
        return error


def run_and_return(
        script_filename,
        *params):
    """
    Wrapper for running a powershell command and return the output as a dict

    Arguments:
        script_filename {str} -- Filename of the  PowerShell script
        # script_path_prefix {str} -- Path to the PowerShell script (default: {script_path_prefix})
        *params {[any]]} -- Parameters to pass to the script (if any)
    """
    try:
        output, code = run_pwsh_script(script_filename, *params)
        if code == 0:
            output_as_dict = convert_to_dict(output)
            return_value = {"data": output_as_dict}
            return return_value
        else:
            logging.debug("pwsh run_and_return did not get a  0")
            return_value = output
            return return_value
    except Exception as e:
        logging.error("pwsh run_and_return error occurred: {}".format(e))
        return e
