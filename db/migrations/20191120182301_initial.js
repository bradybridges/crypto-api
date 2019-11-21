
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('coindata', (table) => {
      table.increments('id').primary();
      table.integer('coinId');
      table.string('date');
      table.string('name');
      table.double('price').unsigned();
      table.double('marketCap').unsigned();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('portfolio', (table) => {
      table.increments('id').primary();
      table.integer('coinId');
      table.foreign('coinId').references('joiner.coinId');
      table.string('name');
      table.integer('qty').unsigned();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('joiner', (table) => {
      table.string('name');
      table.increments('coinId').primary();
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('portfolio'),
    knex.schema.dropTable('joiner'),
    knex.schema.dropTable('coindata'),
  ]);
};
