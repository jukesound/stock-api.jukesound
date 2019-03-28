import { config } from "dotenv"; config();
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import sequelize from 'database'

// Routes
import indexRouter from 'routes/index';
import itemsRouter from 'routes/items';

const app = express();

/**
 * DB Connection
 */
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err.parent));

/**
 * express use
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Routes
 */
app.use('/', indexRouter);
app.use('/items', itemsRouter);

export default app;
