import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import sequelize from '@database/index';
import routes from '@routes/index';

dotenvConfig();

const app = express();

/**
 * DB Connection
 */
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err: any) => console.log(err.parent));

/**
 * express use
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(routes);

export default app;
