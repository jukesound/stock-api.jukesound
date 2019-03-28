import { config } from "dotenv"; config();
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import sequelize from 'database'

// Routes
import routes from 'routes';

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
// app.use('/', routes.home);
app.use('/items', routes.items);

export default app;
