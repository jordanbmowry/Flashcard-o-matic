const knex = require('../db/connection');

// GET /decks
function list() {
  return knex('decks').select('*');
}

module.exports = {
  list,
};
