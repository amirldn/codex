import json
import os

check_json_path = os.path.join(os.path.dirname(__file__), 'checks.json')
checks_dict = (json.loads(open(check_json_path).read()))['checks']


# Check if the check_name passed is valid
def exists(check_name: str):
    for check in checks_dict:
        if check['api_name'] == check_name:
            return True
    return False


# Function that takes api_name and returns the filename
def get_filename(check_name: str):
    for check in checks_dict:
        if check['api_name'] == check_name:
            return check['filename']
    return None


def get_check_list():
    return checks_dict

def get_cateogry_list():
    return list(set([check['category'] for check in checks_dict]))
