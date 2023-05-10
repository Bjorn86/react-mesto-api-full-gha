// IMPORT ERRORS
const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const AuthorizationError = require('../errors/authorizationError');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');

// IMPORT VARIABLES
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

// ERRORS MIDDLEWARE
module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST_ERROR_CODE).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_ERROR_CODE).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST_ERROR_CODE).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  if (err instanceof AuthorizationError
    || err instanceof ForbiddenError
    || err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR_CODE).send({
      message: 'Указанный email уже зарегистрирован. Пожалуйста используйте другой email',
    });
  }
  res.status(DEFAULT_ERROR_CODE).send({
    message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
  });
  return next();
});
