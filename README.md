
# Codex  
A modular security scanner with a clean and simple UI. Built with React, FastAPI, Python, PowerShell &amp; Bash.  
  
  
## Development Instructions
**Requirements (for development):**  
- Python 3.10
- NodeJS   
- NPM (MacOS) / NVM (Windows)  
- Redis (MacOS) / Memurai (Windows)  
- Powershell 7 
  
**Installation:**
- Clone the repository
- In the `backend/api` folder, run `pip install pipenv` and then `pipenv install`  
- In the frontend folder, run `npm install`  
  
**Running (Windows):** 
1. `cd backend/api` and run `pipenv shell`  
2. `cd` back to the root folder and run `uvicorn backend.main:app --reload --log-config .\backend\log\uvicorn.ini --use-colors`  
3. In another terminal (as admin), repeat step 1 and then run `celery --app=backend.runner.tasks worker --loglevel info -E --pool=threads --without-gossip --without-mingle --without-heartbeat`  
4. In another terminal, `cd frontend` and run `npm start-browser`

**Building**
**Requirements (for building)**
- InstallSimple 3.1

 1. `cd` to cloned directory  (`~codex`) and run `pwsh ~codex/dev/Copy-CodexBack.ps1; pwsh /~codex/dev/Copy-CodexAll.ps1`
 2. Run `pwsh ~codex\dev\Build-Codex.ps1`
 3. This will launch the `codex-setup.iss` file. Follow the on-screen prompts to build the `codex-setup.exe` file.
 4. The setup file will be avaliable in `~codex\prod\setup\codex-setup.exe"` which can be installed on any Windows machine.