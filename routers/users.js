const router = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const {
  userDataValidation,
} = require('../utils/requestValidators');

router.get('/me', getCurrentUser);
router.patch('/me', userDataValidation, updateProfile);

module.exports = router;
