import logging
from enum import Enum
class Status(Enum):
  OK = "OK"
  WARN = "WARN"
  CRIT = "CRIT"
  UNKNOWN = "UNKNOWN"


class pwsh_result:
  def convert_stdout(self, stdout):
    # Split each result returned by a PowerShell script into an array of strings and then enumerate them
    result_array = []
    # If stdout contains more than one ; separated result, split them and add them to the result array

    if stdout.count(";") == 1:
      checks = [stdout[:-1]]
      logging.debug("only one service was returned: {}".format(checks))
    else:
      checks = stdout.split(';')
      logging.debug("multiple services were returned: {}".format(checks))

    # For each status returned by a script, add them to result_array with the form of [status, message]
    for check in checks:
      resultant = []
      output = check.split(',')
      logging.debug("output: {}".format(output))

      if output[0] == "OK":
        resultant.append(Status.OK)
      elif output[0] == "WARN":
        resultant.append(Status.WARN)
      elif output[0] == "CRIT":
        resultant.append(Status.CRIT)
      else:
        resultant.append(Status.UNKNOWN)

      resultant.append(output[1])
      result_array.append(resultant)

    return result_array



  def __init__(self, stdout):
    self.stdout = stdout
    self.result_array = self.convert_stdout(stdout)




