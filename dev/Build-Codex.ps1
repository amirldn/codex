# Run Copy-CodexAll.ps1 and Copy-CodexBack.ps1 then run this

Invoke-Command -Command { cd C:/codex-windows/backend; pipenv shell; cd C:/codex-windows/backend; pyi-makespec start.py --name 'codex-io-backend' --onefile --paths=router --paths=runner --add-data 'checks;backend/checks' --add-data 'log;backend/log' --add-data 'tests;backend/tests' --add-data 'runner;backend/runner' --add-data 'router;backend/router' --hidden-import backend.main --hidden-import celery --hidden-import celery.fixups --hidden-import celery.fixups.django --hidden-import celery.loaders.app --hidden-import celery.app.amqp --hidden-import celery.backends --hidden-import celery.backends.redis --hidden-import kombu.transport.redis- --hidden-import celery.app.events --hidden-import celery.apps.worker --hidden-import celery.app.log --hidden-import celery.concurrency.prefork --hidden-import celery.worker.autoscale --hidden-import celery.worker.consumer --hidden-import celery.app.control --hidden-import celery.events.state --hidden-import celery.worker.strategy --hidden-import celery.concurrency.solo --uac-admin; pyinstaller codex-io-backend.spec }

Invoke-Command -Command { cd C:\codex-windows\frontend\; npm run make }

Invoke-Command  -Command { cd C:/codex-windows/startup; Invoke-PS2EXE .\Start-Codex.ps1 ./codex.exe -title 'Codex | Cybersecurity Toolkit' -description 'Codex is a cybersecurity toolkit used to secure your Windows machine and teach you about cybersecurity practices.' -company 'Amir Maula' -copyright 'Amir Maula' -trademark 'Amir Maula' -version '1.0.0' -requireAdmin -noconsole }


Copy-Item -Recurse -Path C:\codex-windows\frontend\out\codex-io-win32-x64\* -Destination C:\codex-windows\prod\package
Copy-Item -Recurse -Path C:\codex-windows\backend\dist\* -Destination C:\codex-windows\prod\package