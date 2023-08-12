// STATUS CODES
const CREATE_CODE = 201;
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

// REGEXP
const LINK_REGEXP = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

// ALLOWED CORS DOMAINS
const ALLOWED_CORS = [
  'http://mesto.ld-webdev.ru',
  'https://mesto.ld-webdev.ru',
  'http://77.232.131.208',
  'https://77.232.131.208',
  'http://localhost:3000',
  'http://localhost:3001',
];

// ALLOWED METHODS
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  CREATE_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  LINK_REGEXP,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
