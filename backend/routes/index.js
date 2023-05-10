// IMPORT PACKAGES
const rootRouter = require('express').Router();

// IMPORT ROUTES
const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');
const crashTest = require('./crashTest');

// IMPORT MIDDLEWARES
const auth = require('../middlewares/auth');

// ROUTES METHODS
rootRouter.use('/crash-test', crashTest);
rootRouter.use('/signin', signin);
rootRouter.use('/signup', signup);
rootRouter.use('/users', auth, users);
rootRouter.use('/cards', auth, cards);
rootRouter.use('*', notFound);

// EXPORT ROUTES
module.exports = rootRouter;