import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sequelize from './database/'

const app = express();

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err.parent));

// /*———————————————————————————————————*\
//     $ Imports
// \*———————————————————————————————————*/
// import express from 'express';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
//
// Routes
import indexRouter from './src/routes/index';
import itemsRouter from './src/routes/items';
//
// // Database
// import db from "./database/index.js";
//
// // Test DB
// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err));
//
// const app = express();
//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//
/*———————————————————————————————————*\
    $ Routes
\*———————————————————————————————————*/
app.use('/', indexRouter);
app.use('/items', itemsRouter);

export default app;
