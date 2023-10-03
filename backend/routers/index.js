const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const {
  validateUserCreate,
  validateUserLogin,
} = require('../middlewares/celebrateErrors');

router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserCreate, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не найдена'));
});

module.exports = router;
