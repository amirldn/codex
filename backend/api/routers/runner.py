import logging

from fastapi import APIRouter, HTTPException

from backend.runner import pwsh
from backend.runner.pwshresult import pwshResult

router = APIRouter(
    prefix="/runner",
)


@router.get("/flagfileexists/")
async def run_flagfileexists():
    result = pwsh.run_and_return("Test-FlagFileExists.ps1", '/Users/amaula/GitHub/codex/backend/tests/flag.txt')
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/testoutput/")
async def run_test_output():
    result = pwsh.run_and_return("Test-Output.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result
