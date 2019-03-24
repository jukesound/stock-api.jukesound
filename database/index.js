import { Sequelize } from "sequelize";

export default new Sequelize('dbtest', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5434,
});

// export default {
//   dev: {
//     username: "root",
//     password: "root",
//     database: "stock.jukesound.dev",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   },
//   ppr: {
//     username: "root",
//     password: "root",
//     database: "stock.jukesound.ppr",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   },
//   prod: {
//     username: "root",
//     password: "root",
//     database: "stock.jukesound.prod",
//     host: "127.0.0.1",
//     dialect: "mysql"
//   }
// }
