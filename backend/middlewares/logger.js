// IMPORT PACKAGES
const winston = require('winston');
const expressWinston = require('express-winston');

// REQUEST LOGGER
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
      maxsize: '10000000',
      maxFiles: '10',
    }),
  ],
  format: winston.format.json(),
});

// ERROR LOGGER
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      maxsize: '10000000',
      maxFiles: '10',
    }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
