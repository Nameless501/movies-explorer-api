const { Error } = require('mongoose');
const rateLimit = require('express-rate-limit');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const handleError = (err, next) => {
  if (err instanceof Error.CastError) {
    next(new BadRequestError());
  } else if (err instanceof Error.ValidationError) {
    next(new BadRequestError());
  } else if (err.name === 'MongoServerError' && err.code === 11000) {
    next(new ConflictError());
  } else {
    next(err);
  }
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = { handleError, limiter };
