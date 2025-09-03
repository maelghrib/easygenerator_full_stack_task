# Easygenerator Backend

## Installation 
```shell
yarn install
```

## Setup the database
- **First make sure to install [Docker](https://docs.docker.com/install/)**
- **Then run docker compose to setup MongoDB database**
    ```shell
    docker-compose up --build -d
    ```

## Setup the environments variables
- First copy [.env.sample](.env.sample) and rename it to [.env](.env)
- Then make sure it include the MONGODB_URI like this
    ```dotenv
    MONGODB_URI=mongodb://localhost:27017/easygenerator_backend_db
    ```

## Compile and run the project
- **Run the development server**
    ```shell
    yarn run start
    ```
- **Run with the watch mode**
    ```shell
    yarn run start:dev
    ```
- **Run with the production mode**
    ```shell
    yarn run start:prod
    ```

## Run tests
- **Run unit tests**
    ```shell
    yarn run test
    ```
- **Run e2e tests**
    ```shell
    yarn run test:e2e
    ```
- **Run test coverage**
    ```shell
    yarn run test:cov
    ```
