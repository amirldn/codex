import logging
import random
import time

from fastapi import APIRouter

router = APIRouter(
    prefix="/password",
)


@router.get("/generate/", summary="Generate a random password")
async def gen_password(length: int = 12, special: bool = True, numbers: bool = True, upper: bool = True):
    lower_chars = "abcdefghijklmnopqrstuvwxyz"
    upper_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    special_chars = '!@#$%^&*()'
    number_chars = '0123456789'
    types = [lower_chars, upper_chars, number_chars, special_chars]

    logging.info("Generating password of length: {}, special: {}, numbers:{}".format(length, special, numbers))
    password = ""

    # Generate a password of the specified length
    if not special:
        types.remove(special_chars)
    if not numbers:
        types.remove(number_chars)
    if not upper:
        types.remove(upper_chars)
    for i in range(length):
        # Randomly select a character type
        char_type = random.choice(types)
        # Randomly select a character from the selected type
        char = random.choice(char_type)
        # Add the character to the password
        password += char

    return {"data": {
        "password": password,
    }}
