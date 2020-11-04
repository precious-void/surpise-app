# surpise-app

## Production mode

```
docker-compose build
docker-compose up -d
```

## Dev mode

MongoDB is used as a database.
Specify connection string for it in `.env` file. Replace `<mongo_db_connection_string>`

- Go into `backend` and run `yarn watch` to start backend.
- After that in other terminal go into `frontend` and run `yarn start`.

## Tests

Have done only backend logic tests. To run:

```
cd backend
yarn test
```
