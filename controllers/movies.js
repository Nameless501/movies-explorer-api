const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CREATED_CODE } = require('../utils/constants');
const { handleError } = require('../utils/utils');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err, next));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    },
  ).then((newMovie) => {
    Movie.findById(newMovie._id)
      .populate(['owner'])
      .then((movie) => res.status(CREATED_CODE).send(movie))
      .catch((e) => handleError(e, next));
  }).catch((err) => handleError(err, next));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.remove()
          .then(() => res.send(movie))
          .catch((err) => handleError(err, next));
      } else {
        throw new ForbiddenError();
      }
    })
    .catch((e) => handleError(e, next));
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
