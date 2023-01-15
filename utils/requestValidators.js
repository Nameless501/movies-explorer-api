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
      .min(2)
      .max(30)
      .required(),
    director: Joi.string()
      .min(2)
      .required(),
    duration: Joi.number()
      .positive()
      .required(),
    year: Joi.string()
      .length(4)
      .required(),
    description: Joi.string()
      .min(2)
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
    movieId: Joi.number()
      .positive()
      .required(),
    nameRU: Joi.string()
      .min(2)
      .required(),
    nameEN: Joi.string()
      .min(2)
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
