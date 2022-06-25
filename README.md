# MovieMatch

Watch something everyone can agree on!

## Requirements

- Postgres v13
- Node v16.13
- Ruby v3.1.2

- ngrok
- Yarn

## Create the database

Make sure [Postgres](https://postgresapp.com/) is installed.

Work from the `backend` folder
```shell
cd backend
```

Create the db
```shell
bin/rails db:create
```

Run migrations
```shell
bin/rails db:migrate
```

## Running the app
### Rails server

```shell
cd backend
bundle install
bin/rails s
```
> Server will be running on port 3000

### Mobile Client

```shell
cd mobile
yarn install
yarn start
```

ngrok is required to make API calls from a mobile device
> Install ngrok from [here](https://ngrok.com/download)

```shell
ngrok http 3000
```

ngrok will now forward to port 3000, where the backend is running

The mobile app uses an environment variable to find the ngrok URL. Add the url to a `mobile/.env` file
```
NGROK_HOST=<ngrok URL>
```

Clear the cache before re-running the app when updating the ngrok URL
```shell
yarn start-clean
```
