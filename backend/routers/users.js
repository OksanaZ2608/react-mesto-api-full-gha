const router = require('express').Router();
const {
  getAllUsers, getMeUser, getUserId, updateProfile, updateAvatar,
} = require('../controllers/users');
const {
  validateUserId,
  validateUserUpdate,
  validateUserAvatar,
} = require('../middlewares/celebrateErrors');

router.get('/', getAllUsers);
router.get('/me', getMeUser);
router.get('/:userId', validateUserId, getUserId);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);
module.exports = router;
