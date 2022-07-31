from fastapi import FastAPI
from runner import pwsh

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/runner/")
async def run_flagfileexists():
    status = pwsh.run_pwsh_script("/Users/amaula/GitHub/codex/checks/PrintHello.ps1")
    return {"message": status}


