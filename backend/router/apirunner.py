import asyncio
import json
import logging

from fastapi import APIRouter, HTTPException

from backend.runner import pwsh
from backend.runner.tasks import create_task, celeryi
from backend.checks import check
from backend.router.redisclient import redisi

router = APIRouter(
    prefix="/check",
)


# Individually Running Checks

@router.get("/flagfileexists/mac",
            summary="Runs the Test-FlagFileExists pwsh script with a specified path")
async def run_flagfileexists():
    result = pwsh.run_and_return("Test-FlagFileExists.ps1", '/Users/amaula/GitHub/codex/backend/tests/flag.txt')
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/flagfileexists/",
            summary="Runs the Test-FlagFileExists pwsh script")
async def run_flagfileexists():
    result = pwsh.run_and_return("Test-FlagFileExists.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/testoutput/",
            summary="Runs the Test-Output pwsh script")
async def run_test_output():
    result = pwsh.run_and_return("Test-Output.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/checkdisk/",
            summary="Runs the Check-Disk pwsh script")
async def run_test_output():
    result = pwsh.run_and_return("Check-Disk.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/testnewfile/",
            summary="Runs the Test-NewFile pwsh script")
async def run_test_output():
    result = pwsh.run_and_return("Test-NewFile.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/checkfirewall/",
            summary="Runs the Check-WindowsFirewall check")
async def run_check_firewall():
    result = pwsh.run_and_return("Check-WindowsFirewall.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/checkguest/",
            summary="Runs the Check-GuestAccount check")
async def run_check_guest():
    result = pwsh.run_and_return("Check-GuestAccount.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


@router.get("/fix/checkguest",
            summary="Disables the guest account and fixes Check-GuestAccount check")
async def run_check_guest():
    result = pwsh.run_and_return("Fix-GuestAccount.ps1")
    if 'fault' in result:
        raise HTTPException(status_code=500, detail=result)
    return result


# Async Runs

@router.post(path="/run/",
             summary="Runs a check specified in the request body",
             status_code=201)
async def run_check(check_name: str):
    if check.exists(check_name):
        task = create_task.delay(check_name, "check")
        logging.info(f"New Task Created for {check_name} - ID: {task.id}")
        redisi.set(check_name, task.id)
        logging.info(f"Task ID {task.id} saved to Redis for check: {check_name}")
        return {"task_id": task.id}
    else:
        raise HTTPException(status_code=422, detail="Check name does not exist - {}".format(check_name))


@router.post(path="/run/all",
             summary="Runs all checks",
             status_code=201)
async def run_all_checks():
    task_ids = {}
    logging.info("Run all checks called")
    for check_object in check.get_all_checks():
        task = create_task.delay(check_object['api_name'], "check")
        logging.info(f"New Task Created for {check_object['friendly_name']} - ID: {task.id}")
        redisi.set(check_object['api_name'], task.id)
        task_ids[check_object['api_name']] = task.id
        logging.info(f"Task ID {task.id} saved to Redis for check: {check_object['api_name']}")
    return {"data": task_ids}


@router.post(path="/fix/",
             summary="Runs a fix script specified in the request body",
             status_code=201)
async def run_check(fix_name: str):
    if check.fix_exists(fix_name):
        task = create_task.delay(fix_name, "fix")
        logging.info(f"New Task Created for {fix_name} - ID: {task.id}")
        redisi.set(fix_name, task.id)
        logging.info(f"Task ID {task.id} saved to Redis for fix script: {fix_name}")
        return {"task_id": task.id}
    else:
        raise HTTPException(status_code=422, detail="Fix name does not exist - {}".format(fix_name))


@router.get("/id/latest/{check_name}",
            summary="Get the task_id of the latest check by check name",
            status_code=200)
async def get_latest_task_id(check_name: str):
    task_id = redisi.get(check_name)
    if task_id:
        return {"task_id": task_id}
    else:
        raise HTTPException(status_code=404, detail="No task found for {}".format(check_name))


def format_celery_status(task_id):
    task_result = celeryi.AsyncResult(task_id)
    if not task_result.status:
        # TODO: Fix this - don't know why task_result is empty
        raise HTTPException(status_code=500, detail='something went wrong ')

    if task_result.status == 'PENDING':
        result = {
            "task_id": task_id,
            "task_status": task_result.status,
            "task_result": {'data': []}
        }
        return result
    elif 'fault' in task_result.result:
        # logging.debug(task_result)
        raise HTTPException(status_code=200, detail=task_result.result)

    result = {
        "task_id": task_id,
        "task_status": task_result.status,
        "task_result": task_result.result,
        "date_done": task_result._cache['date_done']
    }
    return result


@router.get("/id/{task_id}",
            summary="Get the result of a check by task ID",
            status_code=200)
async def get_status(task_id):
    result = format_celery_status(task_id)
    return result


# Overview of Checks

@router.get("/list/",
            summary="Get a list of all checks with their last runtime & status",
            status_code=200)
async def get_check_list():
    return {"data": check.get_check_list()}


@router.get("/list/category",
            summary="Get a list of all the check categories",
            status_code=200)
async def get_check_categories():
    return {"data": check.get_category_list()}


@router.get("/list/length",
            summary="Get the number of checks",
            status_code=200)
async def get_check_length():
    return {"data": check.get_check_count()}


@router.get("/list/category",
            summary="Get a list of all the check categories",
            status_code=200)
async def get_check_categories():
    return {"data": check.get_category_list()}


@router.get("/list/latest/category",
            summary="Get a list of all the check categories and the number of issues within them",
            status_code=200)
async def get_check_categories_and_issues():
    # results = {}
    results = []
    results_index = []
    checks_dict = check.get_check_list()
    for checki in checks_dict:
        check_name = checki['api_name']
        friendly_name = checki['friendly_name']
        category = checki['category']
        if category not in results_index:
            results.append({'category': category,
                            'statuses': {'critical': 0, 'warning': 0, 'ok': 0, 'unknown': 0}})
            results_index.append(category)
        task_id = redisi.get(check_name)
        if task_id:
            task_result = celeryi.AsyncResult(task_id)
            try:
                result = {
                    "check_name": check_name,
                    "friendly_name": friendly_name,
                    "task_id": task_id,
                    "task_status": task_result.status,
                    "task_result": task_result.result,
                    "date_done": task_result._cache['date_done']
                }
                try:
                    if result['task_result']['data']:
                        for issue in result['task_result']['data']:
                            if issue['State'] == 'Warn':
                                results[results_index.index(category)]['statuses']['warning'] += 1
                            elif issue['State'] == 'Crit':
                                results[results_index.index(category)]['statuses']['critical'] += 1
                            elif issue['State'] == 'Unknown':
                                results[results_index.index(category)]['statuses']['unknown'] += 1
                            elif issue['State'] == 'Ok':
                                results[results_index.index(category)]['statuses']['ok'] += 1
                except Exception as e:
                    try:
                        if result['task_result']['fault']:
                            results[results_index.index(category)]['statuses']['unknown'] += 1
                    except Exception as e:
                        logging.error("Something other than fault or data was found in redis result for ", check_name)
                        pass
                    continue
            except Exception as e:
                print(e)
                continue

    return {"data": results}


@router.get("/list/latest/results",
            summary="Get the results of the latest run of all checks",
            status_code=200)
async def get_check_results():
    results = []
    checks_dict = check.get_check_list()
    for checki in checks_dict:
        check_name = checki['api_name']
        task_id = redisi.get(check_name)
        if task_id:
            task_result = celeryi.AsyncResult(task_id)
            try:
                result = {
                    "task_id": task_id,
                    "task_status": task_result.status,
                    "task_result": task_result.result,
                    "date_done": task_result._cache['date_done']
                }
                results.append(result)
            except Exception as e:
                continue
    return {"data": results}


# Make a function that iterates through each check and returns the most recent date_done value
@router.get("/list/latest/lastupdated",
            summary="Get the date of the last time any check was run",
            status_code=200)
async def get_last_updated():
    results = []
    checks_dict = check.get_check_list()
    for checki in checks_dict:
        check_name = checki['api_name']
        task_id = redisi.get(check_name)
        if task_id:
            task_result = celeryi.AsyncResult(task_id)
            try:
                result = {
                    "task_id": task_id,
                    "task_status": task_result.status,
                    "task_result": task_result.result,
                    "date_done": task_result._cache['date_done']
                }
                results.append(result)
            except Exception as e:
                continue
    results.sort(key=lambda x: x['date_done'], reverse=True)
    return {"data": results[0]['date_done']}


@router.get("/list/latest/issuetotal",
            summary="Get the total number of issues across all checks",
            status_code=200)
async def get_issue_total():
    results = []
    ok = 0
    warning = 0
    crit = 0
    checks_dict = check.get_check_list()
    for checki in checks_dict:
        check_name = checki['api_name']
        task_id = redisi.get(check_name)
        if task_id:
            task_result = celeryi.AsyncResult(task_id)
            try:
                result = task_result.result
                if 'fault' in result:
                    continue
                for item in result['data']:
                    if item['State'] == 'Crit':
                        crit += 1
                    elif item['State'] == 'Warn':
                        warning += 1
                    elif item['State'] == 'Ok':
                        ok += 1
                    results.append(item)
            except Exception as e:

                continue
    return {"data":
                {'OK': ok,
                 'Warn': warning,
                 'Crit': crit, }
            }
