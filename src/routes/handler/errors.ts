import * as express from 'express';
import config from '@config/index';

// @ts-ignore
export const asyncErrorHandler = fn => (req: express.Request, res: express.Response) => {
  return Promise
    .resolve(fn(req, res))
    .catch(err => {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(config.httpCode.serverError);
      }

      const error = _buildError(err);

      console.error(err);
      res.status(error.status).json(error);
    });
};

function _buildError (err: any): any {
  let errorBuilded = {
    name: err.name || null,
    status: config.httpCode.serverError,
    isJoi: false,

  };

  if (
    err.name === 'SequelizeUniqueConstraintError' ||
    err.name === 'ValidationError'
  ) {
    errorBuilded.status = config.httpCode.badRequest;
  }

  if (err.name === 'SequelizeEmptyResultError') {
    errorBuilded.status = config.httpCode.notFound;
  }

  if (err.isJoi) {
    errorBuilded.isJoi = err.isJoi;
    // @ts-ignore
    errorBuilded.details = err.details;
    // @ts-ignore
    errorBuilded._object = err._object;
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    // @ts-ignore
    errorBuilded.errors = err.errors;
    // @ts-ignore
    errorBuilded.fields = err.fields;
  }

  return errorBuilded;
}
