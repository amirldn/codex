import os
import time

from celery import Celery
from fastapi import HTTPException

from backend.api.router.runner import pwsh

celery = Celery('worker',
                broker='redis://localhost:6379',
                backend='redis://localhost:6379')


@celery.task(name="create_task")
def create_task(check_name: str):
    time.sleep(5)
    result = pwsh.run_and_return(check_name)
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result
