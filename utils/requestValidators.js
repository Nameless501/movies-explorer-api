const { celebrate, Joi } = require('celebrate');
const { LINK_REG_EXP } = require('./constants');

const userDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(16)
      .required(),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(16)
      .required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .hex()
      .length(24)
      .required(),
  }),
});

const movieDataValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required(),
    director: Joi.string()
      .required(),
    duration: Joi.number()
      .positive()
      .required(),
    year: Joi.string()
      .length(4)
      .required(),
    description: Joi.string()
      .required(),
    image: Joi.string()
      .required()
      .pattern(LINK_REG_EXP),
    trailerLink: Joi.string()
      .required()
      .pattern(LINK_REG_EXP),
    thumbnail: Joi.string()
      .required()
      .pattern(LINK_REG_EXP),
    movieId: Joi.string()
      .hex()
      .length(24)
      .required(),
    nameRU: Joi.string()
      .required(),
    nameEN: Joi.string()
      .required(),
  }),
});

module.exports = {
  userDataValidation,
  signinValidation,
  signupValidation,
  movieIdValidation,
  movieDataValidation,
};
