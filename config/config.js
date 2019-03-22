const config = {
  env: {
    dev: {
      username: "root",
      password: "root",
      database: "stock.jukesound.dev",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    ppr: {
      username: "root",
      password: "root",
      database: "stock.jukesound.ppr",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    prod: {
      username: "root",
      password: "root",
      database: "stock.jukesound.prod",
      host: "127.0.0.1",
      dialect: "mysql"
    }
  },
};

export default config
