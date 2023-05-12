require('dotenv').config();

// IMPORT PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const validationErrors = require('celebrate').errors;

// IMPORT ROUTES
const rootRouter = require('./routes/index');

// IMPORT MIDDLEWARES
const limiter = require('./middlewares/limiter');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

// CONFIG VARIABLES
const { PORT, DATABASE } = process.env;
const { DEFAULT_PORT, DEFAULT_DATABASE } = require('./utils/config');

// APP VARIABLES
const app = express();

// DATABASE CONNECT
mongoose.connect(DATABASE || DEFAULT_DATABASE);

// PARSERS METHODS
app.use(express.json());
app.use(cookieParser());

// DEFENSE MIDDLEWARES
app.use(helmet());
app.use(limiter);
app.use(cors);

// REQUEST LOGGER
app.use(requestLogger);

// ROUTES METHOD
app.use('/', rootRouter);

// ERROR LOGGER
app.use(errorLogger);

// ERRORS HANDLER MIDDLEWARES
app.use(validationErrors());
app.use(errors);

// SERVER LISTENER
app.listen(PORT || DEFAULT_PORT);
