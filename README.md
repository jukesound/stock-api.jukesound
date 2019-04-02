# Stock API - Jukesound

## Start

- Clone project
```bash
git clone https://github.com/jukesound/stock-api.jukesound.git
``` 

- Install dependencies 
```bash
npm i
``` 

- Create your database

- Change environment variables 
```bash
cp .env-example .env # copy .env-example => .env

# Remplace all dummy value 
``` 

- Migrate and seed database 
```bash
npm run db:reset
``` 

- Launch server 
```bash
npm run dev
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
Auto deploy when master update

```bash
docker image ls            # List images
docker container ls --all  # List containers
```

