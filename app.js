const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/*———————————————————————————————————*\
    $ Routes
\*———————————————————————————————————*/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/item');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/*———————————————————————————————————*\
    $ Routes
\*———————————————————————————————————*/
app.use('/', indexRouter);
app.use('/items', usersRouter);

module.exports = app;
