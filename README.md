# Stock API - Jukesound

## Start

- Clone project
```bash
git clone https://github.com/jukesound/stock-api.jukesound.git
``` 

- Change environment variables 
```bash
cp .env-example .env # copy .env-example => .env

# Remplace all dummy value 
``` 

- Launch docker 
```bash
docker-compose up
``` 

- Migrate and seed database 
```bash
npm run docker:db:reset
``` 

Postman resquest : `[GET] localhost:3000/items`

# Heroku
Auto deploy when master update

```bash
heroku run bash     # bash in heroku server
heroku logs --tail  # view logs in live
heroku config       # view .env
heroku local web    # run heroku in local
```

Postman resquest : `[GET] https://stock-api-jukesound.herokuapp.com/items`


# Docker
```bash
docker-compose up
npm run docker:db:reset # migrate + seed inside docker container
```

