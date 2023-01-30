import json
import logging
import random
from pathlib import Path

from fastapi import APIRouter

# Open the json file of cyber security tips
# get the absolute path of ../../cybertip/cybertip.json using pathlib
tip_file = Path(__file__).parent.parent.parent / "cybertip/cybertip.json"

with open(tip_file) as f:
    tips = (json.loads(f.read()))['tips']

router = APIRouter(
    prefix="/cybertip",
)


@router.get("/tip/", summary="Get a random cyber security tip")
async def get_cybertip():
    tip = random.choice(tips)
    logging.info("Returning tip ID: {}".format(tip['id']))
    return {"data": {
        "title": tip['title'],
        "description": tip['description']
    }}
