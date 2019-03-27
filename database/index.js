import { Sequelize } from "sequelize";

export default new Sequelize('stock-api.jukesound.dev', 'postgres', 'root', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5434,
});
