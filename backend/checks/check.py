import os, json

check_json_path = os.path.join(os.path.dirname(__file__), 'checks.json')
checks_dict = (json.loads(open(check_json_path).read()))['checks']


# Check if the check_name passed is valid
def exists(check_name: str):
    for check in checks_dict:
        if check['api_name'] == check_name:
            return True
    return False