import time
import logging
from celery import Celery

from backend.runner import pwsh
from backend.checks import check

celeryi = Celery('tasks',
                broker='redis://localhost:6379',
                backend='redis://localhost:6379')


@celeryi.task(name="create_task")
def create_task(api_name: str, type_of_script: str):
    logging.info("Running celery task with api_name: %s", api_name)
    check_file_name = check.get_filename(api_name, type_of_script)
    logging.debug("Parsed %s to %s", api_name, check_file_name)

    # Debug
    if api_name == 'testoutputslow':
        time.sleep(10)
    result = pwsh.run_and_return(check_file_name)
    return result
