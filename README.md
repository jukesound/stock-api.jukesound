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

- .env 
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

Postman resquest : `[GET] localhost:3000/items
