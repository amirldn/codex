import logging

from fastapi import APIRouter

router = APIRouter(
    prefix="/cybertip",
)


@router.get("/tip/")
async def get_cybertip():
    logging.info("returning tip")
    return {"data": "This is an example tip"}
