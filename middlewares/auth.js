require('dotenv').config();
const jwt = require('jsonwebtoken');
const DataAccessError = require('../errors/DataAccessError');
const { NEED_AUTH_MESSAGE } = require('../utils/constants');

const { JWT_KEY = 'some-secret-key' } = process.env;

module.exports = (req, res, next) => {
  console.log(req);

  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new DataAccessError(NEED_AUTH_MESSAGE));
    return;
  }

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new DataAccessError(NEED_AUTH_MESSAGE));
    return;
  }

  req.user = payload;
  next();
};
