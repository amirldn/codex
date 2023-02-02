from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from router import apirunner, cybertip, passwordgen

import logging
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'checks')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'router')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'runner')))

version = "0.1.0"

logging.info("Starting Codex API")
logging.info("Version: " + version)

app = FastAPI(
    title="Codex API",
    description="Codex API",
    version=version,
)

logging.info("Root Path: " + app.root_path)
logging.info("Docs Path: " + app.docs_url)

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
async def root(request: Request):
    logging.info("/ visited")
    return {"message": "Hello World",
            "data": "This is the Codex API",
            "version": version,
            "root_path": request.scope.get("root_path")}


app.include_router(apirunner.router)
app.include_router(cybertip.router)
app.include_router(passwordgen.router)
