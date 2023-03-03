

function Start-Pipenv {
    cd C:/codex-windows/backend
    pipenv shell
    cd C:/codex-windows
}


# Launch a new powershell session and run the following commands

pwsh -NoExit -Command "cd C:/codex-windows/backend;pipenv shell;cd C:/codex-windows;uvicorn backend.main:app --reload --log-config .\backend\log\uvicorn.ini --use-colors"

pwsh -NoExit -Command "cd C:/codex-windows/backend;pipenv shell;cd C:/codex-windows; celery --app=backend.runner.tasks worker --loglevel info -E --pool=solo --without-gossip --without-mingle --without-heartbeat"

pwsh -NoExit -Command "cd C:/codex-windows/backend;pipenv shell;cd C:/codex-windows; celery --app=backend.runner.tasks flower"

pwsh -NoExit -Command "cd C:\codex-windows\frontend\; npm start"


pwsh -NoExit -Command "cd C:/codex-windows/backend;pipenv shell;cd C:/codex-windows;pyi-makespec start.py --onefile --paths=router --paths=runner --add-data 'checks;backend/checks' --add-data 'log;backend/log' --add-data 'tests;backend/tests' --add-data 'runner;backend/runner' --add-data 'router;backend/router' --hidden-import backend.main --hidden-import celery --hidden-import celery.fixups --hidden-import celery.fixups.django --hidden-import celery.loaders.app --hidden-import celery.app.amqp --hidden-import celery.backends --hidden-import celery.backends.redis --hidden-import kombu.transport.redis- --hidden-import celery.app.events --hidden-import celery.apps.worker --hidden-import celery.app.log --hidden-import celery.concurrency.prefork --hidden-import celery.worker.autoscale --hidden-import celery.worker.consumer --hidden-import celery.app.control --hidden-import celery.events.state --hidden-import=celery.worker.strategy --hidden-import=celery.concurrency.solo; pyinstaller start.spec"