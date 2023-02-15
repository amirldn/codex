import json
import logging
import random
import os
from fastapi import APIRouter

cybertip = os.path.abspath('router/cybertip.json')
# If backend is not in the file path, then append before router
if 'backend' not in cybertip:
    cybertip = os.path.abspath('backend/router/cybertip.json')
print(cybertip)

with open(cybertip) as f:
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
