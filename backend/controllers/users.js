// IMPORT PACKAGES
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORT VARIABLES
const { CREATE_CODE } = require('../utils/constants');

// IMPORT MODELS
const User = require('../models/user');

// CONFIG VARIABLES
const { NODE_ENV, SECRET_KEY } = process.env;

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
    .catch(next);
};

// GET USER
module.exports.getUser = (req, res, next) => {
  const requiredData = req.params.userId;
  findUserById(req, res, requiredData, next);
};

// GET USER INFO
module.exports.getUserInfo = (req, res, next) => {
  const requiredData = req.user._id;
  findUserById(req, res, requiredData, next);
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
    .catch(next);
};

// USER UPDATE COMMON METHOD
const userUpdate = (req, res, updateData, next) => {
  User.findByIdAndUpdate(req.user._id, updateData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

// UPDATE USER INFO
module.exports.updateUserInfo = (req, res, next) => {
  const updateData = req.body;
  userUpdate(req, res, updateData, next);
};

// UPDATE USER AVATAR
module.exports.updateUserAvatar = (req, res, next) => {
  const updateData = req.body;
  userUpdate(req, res, updateData, next);
};

// LOGIN
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key',
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
