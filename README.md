## Description

## SETUP and START api

```bash
$ cd ./api
$ ./start-api.sh
```

## Install dependencies

```bash
$ yarn install --ignore-engines
```

## Running the app

```bash
# development watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Hint

How create migration
$ yarn migration-dev:create ./src/migrations/[name_migration]

How execute migration
$ yarn migration-dev:run

#swagger endpoint
/api
