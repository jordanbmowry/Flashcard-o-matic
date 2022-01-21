const router = require('express').Router();
const controller = require('./decks.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

//GET /decks?_embed=cards
router.route('/').get(controller.list).all(methodNotAllowed);

router
  .route('/:deckId')
  .get(controller.read)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
