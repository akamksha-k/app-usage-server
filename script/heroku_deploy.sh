#!/bin/sh -e
APP_NAME=$1

HEROKU_REMOTE=$(git remote | grep heroku | wc -l)
if [ $HEROKU_REMOTE -eq 0 ]
then
  git remote add heroku git@heroku.com:$APP_NAME.git
fi
git fetch heroku

NEW_MIGRATIONS=$(git diff HEAD heroku/master --name-only -- migrations/ | wc -l)
echo "$NEW_MIGRATIONS db migrations."

# migrations require downtime so enter maintenance mode
if [ $NEW_MIGRATIONS -gt 0 ]
then
  heroku maintenance:on --app $APP_NAME
fi

git push heroku $CIRCLE_SHA1:refs/heads/master

if [ $NEW_MIGRATIONS -gt 0 ]
then
  heroku run npm run migrate --app $APP_NAME
fi

heroku run npm run seeds --app $APP_NAME

if [ $NEW_MIGRATIONS -gt 0 ]
then
  heroku restart --app $APP_NAME
  heroku maintenance:off --app $APP_NAME
fi
