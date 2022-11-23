import os
import time
import logging

from celery import Celery
from fastapi import HTTPException

from backend.api.router.runner import pwsh

celery = Celery('backend',
                broker='redis://localhost',
                backend='redis://localhost')


# TODO: for some reason, everything celery task is pending
# probably because i havent started the celery worker...


@celery.task(name="create_task")
def create_task(check_name: str):
    # time.sleep(5)
    print("DEBUG: Running task")
    logging.info(f"CREATE_TASKRunning task for {check_name}")
    result = pwsh.run_and_return(check_name)
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


