import logging

from fastapi import APIRouter, HTTPException

from backend.runner import pwsh
from backend.runner.pwshresult import pwshResult

router = APIRouter(
    prefix="/runner",
)


@router.get("/flagfileexists/")
async def run_flagfileexists():
    result = pwsh.run_and_return("Test-FlagFileExists.ps1", '/Users/amaula/GitHub/codex/tests/flag.txt')
    if result['fault']:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/printhello/")
async def run_printhello():
    result = pwshResult(pwsh.run_pwsh_script("PrintHello.ps1"))
    logging.info("result: {}".format(result.result_json))
    return {"data": result.result_array}


@router.get("/testoutput/")
async def run_test_output():
    result = pwsh.run_and_return("Test-Output.ps1")
    logging.info("result: {}".format(result))
    return result
