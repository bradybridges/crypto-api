
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('coindata', (table) => {
      table.increments('id').primary();
      table.string('date');
      table.string('name').unique();
      table.integer('price').unsigned();
      table.integer('marketCap').unsigned();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('portfolio', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.foreign('name').references('name').inTable('coindata');
      table.integer('qty').unsigned();
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('portfolio'),
    knex.schema.dropTable('coindata'),
  ]);
};
