# Easygenerator Backend

## Prerequisites
Make sure to install Docker and Docker Compose
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup the environment variables
1. Create a `.env` file in the project root.
2. Copy and paste the following (adjust values if needed):
    ```dotenv
    MONGODB_URI=mongodb://mongodb_container:27017/easygenerator_backend_db
    JWT_SECRET=super-secret-change-me
    JWT_EXPIRES_IN=3600s
    ````

## Run the project with Docker

Build and start the app + MongoDB:
```bash
docker-compose up --build -d
```

Stop containers:

```bash
docker-compose down
```
