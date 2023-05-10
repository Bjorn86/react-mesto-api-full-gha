// IMPORT PACKAGES
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// IMPORT CONTROLLERS
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// IMPORT VARIABLES
const { LINK_REGEXP } = require('../utils/constants');

// GET ALL CARDS ROUTE
router.get('/', getAllCards);

// CREATE CARD ROUTE
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(LINK_REGEXP),
  }),
}), createCard);

// DELETE CARD ROUTE
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

// LIKE CARD ROUTE
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), likeCard);

// DISLIKE CARD ROUTE
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);

// MODULE EXPORT
module.exports = router;
