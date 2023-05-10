// IMPORT PACKAGES
const router = require('express').Router();

// IMPORT CONTROLLERS
const { notFound } = require('../controllers/notFound');

// NOT FOUNDED ROUTE
router.all('/*', notFound);

// MODULE EXPORT
module.exports = router;
