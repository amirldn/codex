import json
import logging
import random

from fastapi import APIRouter

# Open the json file of cyber security tips
tip_file = '/Users/amaula/GitHub/codex/backend/cybertip/cybertip.json'
tips = (json.loads(open(tip_file).read()))['tips']

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
