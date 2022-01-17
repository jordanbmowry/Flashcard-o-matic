exports.up = function (knex) {
  return knex.schema.createTable('cards', (table) => {
    table.increments('card_id').primary(); //Sets card_id as the primary key
    table.string('front');
    table.string('back');
    table.integer('deck_id').unsigned().notNullable();
    table.foreign('deck_id').references('deck_id').inTable('decks');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cards');
};
