const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const DataAccessError = require('../errors/DataAccessError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .orFail(() => {
            throw new DataAccessError();
          })
          .then((user) => bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new DataAccessError();
              }
              return user;
            }));
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
