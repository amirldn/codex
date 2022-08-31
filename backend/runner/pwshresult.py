import logging, json
from enum import Enum


class Status(str, Enum):
    OK = "OK"
    WARN = "WARN"
    CRIT = "CRIT"
    UNKNOWN = "UNKNOWN"


def to_result_dict(stdout):
    # Split each result returned by a PowerShell script into an array of strings and then enumerate them
    # If stdout contains more than one ; separated result, split them and add them to the result array
    check_result_array = []

    if stdout.count(";") == 1:
        checks = [stdout[:-1]]
        logging.debug("only one service was returned: {}".format(checks))
    else:
        checks = stdout.split(';')
        logging.debug("multiple services were returned: {}".format(checks))

    # For each status returned by a script, create a dictionary with the status and stdout and add it to the
    # result array
    check_id = 0
    for check in checks:
        output = check.split(',')
        logging.debug("output: {}".format(output))

        check_resultant_dict = {"id": check_id}
        if output[0] == "OK":
            check_resultant_dict["state"] = Status.OK
        elif output[0] == "WARN":
            check_resultant_dict["state"] = Status.WARN
        elif output[0] == "CRIT":
            check_resultant_dict["state"] = Status.CRIT
        else:
            check_resultant_dict["state"] = Status.UNKNOWN
        check_resultant_dict["message"] = output[1]

        logging.debug("check_resultant_dict: {}".format(check_resultant_dict))
        check_result_array.append(check_resultant_dict)
        check_id += 1

    logging.debug("check_result_array: {}".format(check_result_array))

    return check_result_array


class pwshResult:

    def __init__(self, stdout):
        self.stdout = stdout
        self.result_array = to_result_dict(stdout)
        self.result_json = json.dumps(self.result_array)
