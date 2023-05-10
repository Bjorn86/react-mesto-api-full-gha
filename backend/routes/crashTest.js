// IMPORT PACKAGES
const router = require('express').Router();

// CRASH TEST ROUTE
router.get('/', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// MODULE EXPORT
module.exports = router;
