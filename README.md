# Justo Interview Task

## Available Scripts

In the project directory, you can run:

### `npm run start`

To start the app in dev mode.\
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

## Swagger API Documentations added.

Open [http://localhost:3030/api-docs]

## ENV for this task

# DB Credentials
DB_HOST = localhost
DB_PORT = 3306
DB_NAME = justo_interview
DB_USERNAME = root
DB_PASSWORD = Sandy@123
DB_DIALECT = mysql

# # # # PORT ADDRESS TO ROUTE SERVER
NODE_ENV= development
PORT = 3030


# JSON WEB TOKEN SECRET
JWT_SECRET_KEY = supersecretkey

TOKEN_EXPIRY=1h
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=5
ACCOUNT_LOCK_ATTEMPTS=3
ONE_TIME_LINK_EXPIRY=10  # in minutes

- For Migrations and Seeders we use Sequelize for SQL friendly migration

\*\*To Create a new migration

```bash
npm run migrate:create
```

\*\*To Run All Migrations

```bash
npm run  migrate
```

\*\*To Run All Seeders:

```bash
mpm run seed
```
