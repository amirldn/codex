import multiprocessing
import uvicorn
from backend.runner.tasks import celeryi


# TODO: add celery
# https://stackoverflow.com/questions/23389104/how-to-start-a-celery-worker-from-a-script-module-main
if __name__ == '__main__':
    multiprocessing.freeze_support()
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False, workers=2)
    worker = celeryi.Worker(
        include=['backend.runner.tasks']
    )
    worker.start()