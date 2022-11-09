import logging

from celery.result import AsyncResult
from fastapi import APIRouter, HTTPException

from backend.runner import pwsh
from backend.api.scheduler.worker import create_task

router = APIRouter(
    prefix="/check",
)


@router.get("/flagfileexists/",
            summary="Runs the Test-FlagFileExists pwsh script")
async def run_flagfileexists():
    result = pwsh.run_and_return("Test-FlagFileExists.ps1", '/Users/amaula/GitHub/codex/backend/tests/flag.txt')
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/testoutput/",
            summary="Runs the Test-Output pwsh script")
async def run_test_output():
    result = pwsh.run_and_return("Test-Output.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/checkfirewall/",
            summary="Runs the Check-WindowsFirewall check")
async def run_check_firewall():
    result = pwsh.run_and_return("Check-WindowsFirewall.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/checkguest/",
            summary="Runs the Check-GuestAccount check")
async def run_check_guest():
    result = pwsh.run_and_return("Check-GuestAccount.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.post("/", summary="Runs a check specified in the request body", status_code=201)
async def run_check(body: str):
    check_name = body['check']
    # TODO: Validate check_name
    # TODO: Validate OS is able to run check (or maybe we only give the front end checks they can run?)
    task = create_task.delay(check_name)
    return {"task_id": task.id}


@app.get("/{task_id}")
def get_status(task_id):
    task_result = AsyncResult(task_id)
    result = {
        "task_id": task_id,
        "task_status": task_result.status,
        "task_result": task_result.result
    }
    return result
