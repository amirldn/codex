import json
import os
import logging
from backend.router.redisclient import redisi
# from backend.runner.tasks import celeryi

check_json_path = os.path.join(os.path.dirname(__file__), 'checks.json')
checks_dict = (json.loads(open(check_json_path).read()))['checks']


# Check if the check_name passed is valid
def exists(check_name: str):
    for check in checks_dict:
        if check['api_name'] == check_name:
            return True
    return False

def fix_exists(fix_name: str):
    for check in checks_dict:
        if check['fix_name'] == fix_name:
            return True
    return False


# Function that takes api_name and returns the filename
def get_filename(api_name: str, type_of_script: str):
    for check in checks_dict:
        if type_of_script == 'check':
            if check['api_name'] == api_name:
                return check['filename']
        elif type_of_script == 'fix':
            if check['fix_name'] == api_name:
                return check['fix_filename']
    return None


def get_check_list():
    return checks_dict


def get_check_count():
    return len(checks_dict)

def get_category_list():
    return list(set([check['category'] for check in checks_dict]))

#
# def get_check_latest_results():
# # Get the latest results from Redis
#     results = []
#     for check in checks_dict:
#         check_name = check['api_name']
#         task_id = redisi.get(check_name)
#         if task_id:
#             task_result = celeryi.AsyncResult(task_id)
#             print(task_result)
#             if task_result:
#                 results.append(json.loads(task_result))
#     return results
#
# def get_check_total_errors():
#     results = get_check_latest_results()
#     total_errors = 0
#     for result in results:
#         print(result)
#         if 'fault' in result['task_result']:
#             total_errors += 1
#     return total_errors
