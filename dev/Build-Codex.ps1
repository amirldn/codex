# Run Copy-CodexFront.ps1 and Copy-CodexBack.ps1 then run this

Invoke-Command -Command { pwsh -NoExit -Command "cd C:/codex-windows/backend;pipenv shell;cd C:/codex-windows/backend;pyi-makespec start.py --name 'codex-io-backend' --onefile --paths=router --paths=runner --add-data 'checks;backend/checks' --add-data 'log;backend/log' --add-data 'tests;backend/tests' --add-data 'runner;backend/runner' --add-data 'router;backend/router' --hidden-import backend.main --hidden-import celery --hidden-import celery.fixups --hidden-import celery.fixups.django --hidden-import celery.loaders.app --hidden-import celery.app.amqp --hidden-import celery.backends --hidden-import celery.backends.redis --hidden-import kombu.transport.redis- --hidden-import celery.app.events --hidden-import celery.apps.worker --hidden-import celery.app.log --hidden-import celery.concurrency.prefork --hidden-import celery.worker.autoscale --hidden-import celery.worker.consumer --hidden-import celery.app.control --hidden-import celery.events.state --hidden-import=celery.worker.strategy --hidden-import=celery.concurrency.solo --hidden-import=celery.concurrency.thread --uac-admin; pyinstaller codex-io-backend.spec" }

Invoke-Command -Command { cd C:\codex-windows\frontend\; npm install }
Invoke-Command -Command { cd C:\codex-windows\frontend\; npm run build }
Invoke-Command -Command { cd C:\codex-windows\frontend\; npm run make }

Invoke-Command  -Command { cd C:/codex-windows/startup; Invoke-PS2EXE .\Start-Codex.ps1 ./Codex.exe -title 'Codex | Cybersecurity Toolkit' -description 'Codex is a cybersecurity toolkit used to secure your Windows machine and teach you about cybersecurity practices.' -iconfile 'C:/codex-windows/frontend/public/favicon.ico' -company 'Amir Maula' -copyright 'Amir Maula' -trademark 'Amir Maula' -version '1.0.0' -requireAdmin -noconsole }


Copy-Item -Recurse -Path C:\codex-windows\frontend\out\codex-io-win32-x64\* -Destination C:\codex-windows\prod\package -Force
Copy-Item -Recurse -Path C:\codex-windows\backend\dist\* -Destination C:\codex-windows\prod\package -Force
Copy-Item -Recurse -Path C:\codex-windows\startup\codex.exe -Destination C:\codex-windows\prod\package -Force

New-Item -ItemType Directory -Path ("C:\codex-windows\prod\package\redist\") -Force -ErrorAction Continue
Copy-Item -Path "C:\codex-windows\redist\memurai-v3.1.4.msi" -Destination "C:\codex-windows\prod\package\redist\memurai-v3.1.4.msi" -Force

Invoke-Command -Command { C:\codex-windows\prod\setup\codex-setup.ispro}
