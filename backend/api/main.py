from fastapi import FastAPI
from backend.runner import pwsh
from backend.log import log

log_root = log.get_root_logger()


app = FastAPI()

@app.get("/")
async def root():
    log_root.info("/ visited")
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
    log_root.info("printhello called")
    status = pwsh.run_pwsh_script("/backend/checks/PrintHello.ps1", )
    return {"message": status}
