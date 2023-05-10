// IMPORT VARIABLES
const { UNAUTHORIZED_ERROR_CODE } = require('../utils/constants');

// AUTHORIZATION ERROR
class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = AuthorizationError;
