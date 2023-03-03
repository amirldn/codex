import multiprocessing
import uvicorn
import threading
from backend.runner.tasks import celeryi

exitFlag = 0


class thread(threading.Thread):
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter

    def run(self):
        print("Starting " + self.name)
        if self.name == 'uvicornThread':
            start_uvicorn()
        elif self.name == 'celeryThread':
            start_celery()
        print("Exiting " + self.name)


def start_uvicorn():
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False, workers=2)


def start_celery():
    worker = celeryi.Worker(
        include=['backend.runner.tasks'],
        loglevel='INFO',
        pool='solo',
        without_gossip=True,
        without_mingle=True,
        without_heartbeat=True,
    )
    worker.start()


if __name__ == '__main__':
    multiprocessing.freeze_support()
    celeryThread = thread(2, "celeryThread", 2)
    celeryThread.start()

    start_uvicorn()

