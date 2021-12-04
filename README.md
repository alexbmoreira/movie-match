# MovieMatch

Watch something everyone can agree on!

## Starting it up

### Requirements

- Django v3.1
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

### Linting backend

```shell
make lint
```

### Running tests

```shell
make test
```
