require("dotenv").config();

module.exports = {
  "development": {
    "database": process.env.DATABASE,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "dialect": process.env.DATABASE_DIALECT,
    "host": process.env.DATABASE_HOST
  },
  "test": {
    "database": process.env.DATABASE,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "dialect": process.env.DATABASE_DIALECT,
    "host": process.env.DATABASE_HOST
  },
  "production": {
    "database": process.env.DATABASE,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "dialect": process.env.DATABASE_DIALECT,
    "host": process.env.DATABASE_HOST
  }
};
