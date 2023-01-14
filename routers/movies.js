const router = require('express').Router();
const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  movieIdValidation,
  movieDataValidation,
} = require('../utils/requestValidators');

router.get('/', getUserMovies);
router.post('/', movieDataValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
