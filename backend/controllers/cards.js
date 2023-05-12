// IMPORT ERRORS
const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError');

// IMPORT MODELS
const Card = require('../models/card');

// IMPORT VARIABLES
const { CREATE_CODE } = require('../utils/constants');

// GET ALL CARDS
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// CREATE CARD
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATE_CODE).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные для создания карточки.'));
      } else {
        next(err);
      }
    });
};

// DELETE CARD
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      Card.deleteOne({ _id: card._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            throw new ForbiddenError(`Карточка с id ${req.params.cardId} не принадлежит пользователю с id ${req.user._id}`);
          }
          res.send({ message: 'Пост удалён' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найдена карточка с ID: ${req.params.cardId}.`));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(`Передан некорректный ID карточки: ${req.params.cardId}.`));
      } else {
        next(err);
      }
    });
};

// CARD LIKES UPDATE COMMON METHOD
const cardLikesUpdate = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найдена карточка с ID: ${req.params.cardId}.`));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(`Передан некорректный ID карточки: ${req.params.cardId}.`));
      } else {
        next(err);
      }
    });
};

// LIKE CARD
module.exports.likeCard = (req, res, next) => {
  const updateData = { $addToSet: { likes: req.user._id } };
  cardLikesUpdate(req, res, updateData, next);
};

// DISLIKE CARD
module.exports.dislikeCard = (req, res, next) => {
  const updateData = { $pull: { likes: req.user._id } };
  cardLikesUpdate(req, res, updateData, next);
};
