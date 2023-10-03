const router = require('express').Router();
const {
  getCards, createCard, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCardPost,
  validateCardId,
} = require('../middlewares/celebrateErrors');

router.get('/', getCards);
router.post('/', validateCardPost, createCard);
router.delete('/:cardId', validateCardId, deleteCardId);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
