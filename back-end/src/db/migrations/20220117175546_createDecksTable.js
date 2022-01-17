exports.up = function (knex) {
  return knex.schema.createTable('decks', (table) => {
    table.increments('deck_id').primary(); //Sets deck_id as the primary key
    table.string('name');
    table.string('description');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('decks');
};
