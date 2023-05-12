// IMPORT VARIABLES
const { CONFLICT_ERROR_CODE } = require('../utils/constants');

// AUTHORIZATION ERROR
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = ConflictError;
