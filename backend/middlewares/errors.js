// IMPORT VARIABLES
const { DEFAULT_ERROR_CODE } = require('../utils/constants');

// ERRORS MIDDLEWARE
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || DEFAULT_ERROR_CODE;
  const errorMessage = statusCode === DEFAULT_ERROR_CODE ? `Произошла неизвестная ошибка ${err.name}: ${err.message}` : err.message;
  res.status(statusCode).send({
    message: errorMessage,
  });
  return next();
};
