import logging, sys
from datetime import datetime

def init():
    """Configure the RootLogger by saving to a file & setting up the StreamHandler"""
    # current_date = datetime.today().strftime('%Y-%m-%d')
    # filename = 'codex-api-{}.log'.format(current_date)
    # # TODO: Create folder /logs/backend if it does not exist
    #
    # # Log File Config
    # logging.basicConfig(filename='logs/backend/{}'.format(filename),
    #                     encoding='utf-8',
    #                     level=logging.INFO,
    #                     format='%(levelname)s :: %(asctime)s | %(message)s',
    #                     datefmt='%m/%d/%Y %I:%M:%S %p')

    # Log StreamHandler Config
    log_root = logging.getLogger()
    log_root.setLevel(logging.INFO)
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter('%(levelname)s:     %(message)s')
    handler.setFormatter(formatter)
    log_root.addHandler(handler)
    return log_root

    # loggers = [logging.getLogger(name) for name in logging.root.manager.loggerDict]
    # print (log_main)