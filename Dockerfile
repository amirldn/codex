## First stage: build the frontend
#FROM node:latest as frontend-builder
#
#WORKDIR /codex/frontend
#COPY frontend/package.json frontend/package-lock.json ./
#RUN npm install
#COPY frontend .
#RUN npm run build

# First stage: build the backend
FROM python:3.10 as backend-builder

COPY backend /codex/backend
WORKDIR /codex/backend/api
RUN pip install pipenv
RUN pipenv install --system

# Second stage: create the final image
FROM python:3.10

# Copy the backend code from the first stage
COPY --from=backend-builder /codex/backend /codex/backend

# Install Celery and Redis
RUN pip install celery redis

# Set the working directory
WORKDIR /codex/backend/api

# Run the API server, the Redis server, and the Celery worker when the container starts
CMD ["bash", "-c", "uvicorn main:app --reload --log-config ../log/uvicorn.ini --use-colors & redis-server & celery --app=backend.api.tasks worker --autoscale 8,24 --loglevel info"]



#docker run -p 8000:8000 -v /path/to/dump.rdb:/data/dump.rdb myapp