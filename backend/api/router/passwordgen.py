import logging
import random

from fastapi import APIRouter


router = APIRouter(
    prefix="/password",
)


@router.get("/generate/", summary="Generate a random password")
async def gen_password(length: int = 12, special: bool = True, numbers: bool = True):
    lower = "abcdefghijklmnopqrstuvwxyz"
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    special_chars = '!@#$%^&*()'
    numbers = '0123456789'
    types = [lower, upper, numbers, special_chars]

    logging.info("Generating password of length: {}, special: {}, numbers:{}".format(length, special, numbers))

    password = ""
    types_included = []
    all_types_included = False
    for i in range(length):
        if special and numbers:
            next = random.choice(types)
        elif special:
            next = random.choice(types[:3])
        elif numbers:
            next = random.choice(types[:2])
        else:
            next = random.choice(types[:1])
        if next not in types_included:
            types_included += next
        length_of_char_type_array = len(next)
        password += (next[random.randint(0, length_of_char_type_array-1)])
        print(password)

    return {"data": {
        "password": password,
    }}
