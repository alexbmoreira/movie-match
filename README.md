# MovieMatch

Watch something everyone can agree on!

## Starting it up

### Requirements

- Postgres v13
- Node v16.13

### Set up a virtual environment

Use venv to create and activate a virtual environment.

```shell
source ../.venv/bin/activate
```
> Or wherever your virtual environment is located

### Installing dependencies

Backend:
```shell
make install-b
```

Frontend:
```shell
make install-f
```
> **NOTE:** Frontend is not being maintained and likely doesn't work

### Create the database

Make sure [Postgres](https://postgresapp.com/) is installed.

```shell
createdb moviematch
```

Then we have to make and migrate.

```shell
make migrate
```

### Running the dev servers

Backend:
```shell
make run-b
```
> Server will be running on port 8000

Frontend:
```shell
make run-f
```
> Server will be running on port 8080

Mobile:
```shell
make run-m
```
> This starts an Expo app

### Starting ngrok for mobile development

> ngrok is required to make API calls from a mobile device

Make sure [ngrok](https://ngrok.com/download) is installed

```shell
ngrok http 8000
```

ngrok will now forward to port 8000, where the backend is running.

Add ngrok to `ALLOWED_HOSTS` through the `.env` file (Don't include `http://`).

```
NGROK_HOST='<ngrok URL>'
```

The app uses an environment variable to find the ngrok URL. Add the url to a `mobile/.env` file.

```
NGROK_HOST=<ngrok URL>
```

After making these changes, clear the cache the first time the app is run.

```shell
make run-m-clean
```

The app can be run normally after this.
> Note: If using the free version of ngrok, the URL will expire after 8 hours.
> If the session is reset, this process will have to be repeated with the new URL
 ngrok URL expires again.

### Linting backend

```shell
make lint
```

### Running tests

```shell
make test
```
