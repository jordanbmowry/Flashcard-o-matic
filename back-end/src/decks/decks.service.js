const knex = require('../db/connection');

// GET /decks
function list() {
  return knex('decks').select('*');
}

// DELETE /decks/:deckId
function destroy(deckId) {
  return knex('decks').where({ deck_id: deckId }).del();
}

// GET /decks/:deckId
function read(deckId) {
  return knex('decks').select('*').where({ deck_id: deckId }).first();
}

module.exports = {
  list,
  destroy,
  read,
};
