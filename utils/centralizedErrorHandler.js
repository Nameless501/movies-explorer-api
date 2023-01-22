const {
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
} = require('./constants');

const centralizedErrorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(DEFAULT_ERROR_CODE).send({ message: DEFAULT_ERROR_MESSAGE });
  }
};

module.exports = { centralizedErrorHandler };
