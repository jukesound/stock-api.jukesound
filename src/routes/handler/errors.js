import config from 'config';

export const asyncErrorHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(err => {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(config.httpCode.serverError);
      }

      const error = _buildError(err);

      res.status(error.status).json(error);
    });
};

function _buildError (err) {
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
    errorBuilded.details = err.details;
    errorBuilded._object = err._object;
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    errorBuilded.errors = err.errors;
    errorBuilded.fields = err.fields;
  }

  return errorBuilded;
}
