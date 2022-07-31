from fastapi import FastAPI
from runner import pwsh
import logging

app = FastAPI()
logging.basicConfig(filename='example.log',
                    encoding='utf-8',
                    level=logging.NOTSET,
                    format='%(asctime)s :: %(levelname)s | %(message)s',
                    datefmt='%m/%d/%Y %I:%M:%S %p')
logging.getLogger(__name__)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/flagfileexists/")
async def run_flagfileexists():
    status = pwsh.run_pwsh_script("/Users/amaula/GitHub/codex/checks/FlagFileExists.ps1", '/Users/amaula/GitHub/codex/tests/flag.txt')
    return {"message": status}

@app.get("/printhello/")
async def run_flagfileexists():
    logging.info("printhello called")
    status = pwsh.run_pwsh_script("/Users/amaula/GitHub/codex/checks/PrintHello.ps1",)
    return {"message": status}



