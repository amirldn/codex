import subprocess, sys


def run_pwsh(script_path, params=""):
    """
    Run a powershell command and return the output
    """
    try:
        # p = subprocess.Popen('powershell.exe -ExecutionPolicy RemoteSigned -file "hello world.ps1"', stdout=sys.stdout)
        # p.communicate()
        process = subprocess.Popen(["pwsh",
                              f"{script_path}"],
                             stdout=subprocess.PIPE)
        while True:
            output = process.stdout.readline()
            if output == '' and process.poll() is not None:
                return "ERROR: pwsh finished with no output"
            if output:
                return output.strip()
    except subprocess.CalledProcessError as e:
        return (e.output)
