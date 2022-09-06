from fastapi import FastAPI
from backend.runner import pwsh
from backend.runner.pwshresult import pwshResult
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

# CORS - Cross Origin Resource Sharing
# Required for the frontend to access the backend
# https://fastapi.tiangolo.com/tutorial/cors/
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    result = pwshResult(pwsh.run_pwsh_script("PrintHello.ps1"))
    logging.info ("result: {}".format(result.result_json))
    return result.result_array
