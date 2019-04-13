import config from 'config';

export const asyncErrorHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(err => {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(config.httpCode.serverError);
      }

      res.status(config.httpCode.serverError).json({
        message: err.message,
        stack: err.stack,
      });
    });
};
