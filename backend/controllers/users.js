// IMPORT PACKAGES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORT ERRORS
const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError');
const ConflictError = require('../errors/conflictError');

// IMPORT MODELS
const User = require('../models/user');

// CONFIG VARIABLES
const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');

// IMPORT VARIABLES
const { CREATE_CODE } = require('../utils/constants');

// GET ALL USERS
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// FIND USER BY ID COMMON METHOD
const findUserById = (req, res, requiredData, next) => {
  User.findById(requiredData)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найден пользователь с ID: ${requiredData}.`));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(`Передан некорректный ID пользователя: ${requiredData}.`));
      } else {
        next(err);
      }
    });
};

// GET USER
module.exports.getUser = (req, res, next) => {
  findUserById(req, res, req.params.userId, next);
};

// GET USER INFO
module.exports.getUserInfo = (req, res, next) => {
  findUserById(req, res, req.user._id, next);
};

// CREATE USER
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(CREATE_CODE).send(data);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные для создания пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Указанный email уже зарегистрирован. Пожалуйста используйте другой email'));
      } else {
        next(err);
      }
    });
};

// USER UPDATE COMMON METHOD
const userUpdate = (req, res, updateData, next) => {
  User.findByIdAndUpdate(req.user._id, updateData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`В базе данных не найден пользователь с ID: ${req.user._id}.`));
      } else if (err instanceof CastError) {
        next(new IncorrectDataError(`Передан некорректный ID пользователя: ${req.user._id}.`));
      } else if (err instanceof ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные для редактирования профиля.'));
      } else {
        next(err);
      }
    });
};

// UPDATE USER INFO
module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  userUpdate(req, res, { name, about }, next);
};

// UPDATE USER AVATAR
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userUpdate(req, res, { avatar }, next);
};

// LOGIN
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Успешный вход' });
    })
    .catch(next);
};

// LOGOUT
module.exports.logout = (req, res) => {
  res.cookie('jwt', 'none', {
    maxAge: 5000,
    httpOnly: true,
    sameSite: true,
  });
  res.send({ message: 'Успешный выход' });
};
