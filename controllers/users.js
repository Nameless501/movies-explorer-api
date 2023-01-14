require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED_CODE, LOGOUT_MESSAGE } = require('../utils/constants');
const { handleError } = require('../utils/utils');

const { NODE_ENV = 'development', JWT_KEY = 'some-secret-key' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
      })
        .send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
    })
    .catch((err) => handleError(err, next));
};

const logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: LOGOUT_MESSAGE });
};

function findUserById(model, id, res, next) {
  return model.findById(id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(err, next));
}

const getCurrentUser = (req, res, next) => {
  findUserById(User, req.user._id, res, next);
};

const createUser = (req, res, next) => {
  const {
    name,
    password,
    email,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => handleError(err, next));
};

function updateUserData(model, id, res, next, params) {
  return model.findByIdAndUpdate(id, params, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(err, next));
}

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  updateUserData(User, req.user._id, res, next, { name, email });
};

module.exports = {
  login,
  logout,
  createUser,
  updateProfile,
  getCurrentUser,
};
