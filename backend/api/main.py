from fastapi import FastAPI
from backend.runner import pwsh
import logging

app = FastAPI()

@app.get("/")
async def root():
    logging.info("/ visited")
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/flagfileexists/")
async def run_flagfileexists():
    status = pwsh.run_pwsh_script("/backend/checks/FlagFileExists.ps1", '/Users/amaula/GitHub/codex/tests/flag.txt')
    return {"message": status}

@app.get("/printhello/")
async def run_flagfileexists():
    logging.info("printhello called")
    status = pwsh.run_pwsh_script("/backend/checks/PrintHello.ps1", )
    return {"message": status}
