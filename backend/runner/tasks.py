import time
import logging
from celery import Celery

from . import pwsh
from ..checks import check

celery = Celery('tasks',
                broker='redis://localhost:6379',
                backend='redis://localhost:6379')


@celery.task(name="create_task")
def create_task(check_name: str):
    # TODO: need to find where this logging is going, currently only to console
    logging.info("Running celery task with check_name: %s", check_name)
    check_file_name = check.get_filename(check_name)
    logging.debug("Parsed %s to %s", check_name, check_file_name)

    # Debug
    if check_name == 'testoutputslow':
        time.sleep(10)
    result = pwsh.run_and_return(check_file_name)
    return result
