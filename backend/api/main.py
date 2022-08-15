from fastapi import FastAPI
from backend.runner import pwsh
from backend.runner.pwsh_result import pwsh_result
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
    status = pwsh.run_pwsh_script("FlagFileExists.ps1", '/Users/amaula/GitHub/codex/tests/flag.txt')
    return {"pwsh_output": status}

@app.get("/printhello/")
async def run_flagfileexists():
    result = pwsh_result(pwsh.run_pwsh_script("PrintHello.ps1"))
    return {"pwsh_output": result.result_array}
