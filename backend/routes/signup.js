// IMPORT PACKAGES
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// IMPORT CONTROLLERS
const { createUser } = require('../controllers/users');

// IMPORT VARIABLES
const { LINK_REGEXP } = require('../utils/constants');

// LOGIN ROUTE
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_REGEXP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// MODULE EXPORT
module.exports = router;
