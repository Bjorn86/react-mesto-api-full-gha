// IMPORT PACKAGES
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// IMPORT CONTROLLERS
const { login } = require('../controllers/users');

// LOGIN ROUTE
router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// MODULE EXPORT
module.exports = router;
