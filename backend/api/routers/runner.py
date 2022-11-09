import logging

from fastapi import APIRouter, HTTPException

from backend.runner import pwsh

router = APIRouter(
    prefix="/runner",
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


@router.post("/runcheck/", summary="Runs a check specified in the request body", status_code=201)
async def run_check(body: str):
    check_name = body['check']
    return JSONResponse(check_name)
