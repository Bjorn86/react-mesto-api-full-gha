// IMPORT PACKAGES
const jwt = require('jsonwebtoken');

// IMPORT ERRORS
const AuthorizationError = require('../errors/authorizationError');

// CONFIG VARIABLES
const { NODE_ENV, SECRET_KEY } = process.env;

// AUTHORIZATION MIDDLEWARE
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
