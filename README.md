# Digital Clinical API Server

[![CircleCI](https://circleci.com/gh/CognizantStudio/lp01-team-e-server/tree/master.svg?style=svg&circle-token=408b5f5047ba442343500a80f5d4aa5f9d67c3a1)](https://circleci.com/gh/CognizantStudio/lp01-team-e-server)

## Development

(Note: Examples below use the `yarn` package manager.
Substitute the appropriate `npm` commands if preferred.)

After cloning the repository...
```
yarn install

# PostgreSQL database setup
createdb digital-clinical-api-dev
createdb digital-clinical-api-test
yarn migrate
yarn seeds

yarn start
```
The server will be available at [localhost:3001](http://localhost:3001).

### Basic Authentication

Basic Authorization is implemented in this repository while this project
is in development.

Username `teame`, password: `eels`.

To authenticate...
- via the browser: enter `teame` & `eels` in the popup
- via curl: add `-u teame:eels` to requests
- via ajax: add the following header:
    `'Authorization': 'Basic ' + btoa('teame:eels')`

## Testing

Tests are written using [Mocha](https://mochajs.org/)
and BDD-style assertions from [Chai](http://chaijs.com/api/bdd/)

To run the tests:
```
yarn test
# OR
yarn test:watch     # to monitor for changes continuously
```
## Deploying to Heroku

```
$ git remote add heroku git@heroku.com:lp01-team-e-server.git
$ git push heroku master
$ heroku open
```
