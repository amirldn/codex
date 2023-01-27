import logging
import random
import time

from fastapi import APIRouter

router = APIRouter(
    prefix="/password",
)


@router.get("/generate/", summary="Generate a random password")
async def gen_password(length: int = 12, special: bool = True, numbers: bool = True):
    lower = "abcdefghijklmnopqrstuvwxyz"
    upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    special_chars = '!@#$%^&*()'
    number_chars = '0123456789'
    types = [lower, upper, number_chars, special_chars]

    logging.info("Generating password of length: {}, special: {}, numbers:{}".format(length, special, numbers))

    password = ""
    for i in range(length):
        if special and numbers:
            next_char_type = random.randint(0, len(types) - 1)
            next = types[next_char_type]
        elif special:
            next_char_type = random.randint(0, len(types) - 2)
            next = types[next_char_type]
        elif numbers:
            next_char_type = random.randint(0, len(types) - 3)
            next = types[next_char_type]
        else:
            next_char_type = random.randint(0, len(types) - 4)
            next = types[next_char_type]

        length_of_char_type_array = len(next)
        char = next[random.randint(0, length_of_char_type_array - 1)]
        password += char

    return {"data": {
        "password": password,
    }}



