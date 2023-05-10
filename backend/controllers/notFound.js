// IMPORT ERRORS
const NotFoundError = require('../errors/notFoundError');

// NOT FOUNDED ROUTE
module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Указан несуществующий URL'));
};
