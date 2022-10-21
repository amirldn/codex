import json

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import logging
from .routers import runner, cybertip

version = "0.1.0"
app = FastAPI(
    title="Codex API",
    description="Codex API",
    version=version,
)

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


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


app.include_router(runner.router)
app.include_router(cybertip.router)
