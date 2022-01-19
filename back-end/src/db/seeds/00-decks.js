const decksData = require('./decks.json');

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE decks RESTART IDENTITY CASCADE')
    .then(() => knex('decks').insert(decksData));
};
