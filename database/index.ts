import { config } from 'dotenv';

import { Sequelize } from 'sequelize';
config();

export default new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    // @ts-ignore-block
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    // @ts-ignore-block
    port: process.env.DATABASE_PORT,
    define: {
      timestamps: false,
      // @ts-ignore-block
      rejectOnEmpty: true,
    },
  }
);
