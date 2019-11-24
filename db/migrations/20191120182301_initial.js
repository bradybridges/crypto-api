
exports.up = function(knex) {
  //when this migration is executed
  return Promise.all([
    //return an array of promises
    knex.schema.createTable('coindata', (table) => {
      //create a table in the database named coindata
      table.increments('id').primary();
      //create auto incrementing primary key named id
      table.integer('coinId');
      //create col coinId <Integer>
      table.string('date');
      //create col date <String>
      table.string('name');
      //create col name <String>
      table.double('price').unsigned();
      //create col price <Double> that is restricted to being positive
      table.double('marketCap').unsigned();
      //create col marketCap <Double> that is restricted to being positive
      table.timestamps(true, true);
      //create cols for timestamps of time of creation and time of update
    }),
    knex.schema.createTable('users', (table) => {
      //create a new table named users
      table.increments('id').primary();
      //create auto inc primary key named id
      table.integer('coinId').unsigned();
      //create col coinId <Integer> that is restricted to being positive
      table.foreign('coinId').references('joiner.coinId');
      //col coinId is a foreign key related to the column coinId in the joiner table
      table.string('coinname');
      //create col coinname <String>
      table.string('username');
      //create col username <String>
      table.integer('qty').unsigned();
      //create col qty <Integer> that is restricted to being positive
      table.timestamps(true, true);
      //create cols to keep track of time of creation and time of last update
    }),
    knex.schema.createTable('joiner', (table) => {
      //create a new table called joiner
      table.string('name');
      //create col name <String>
      table.increments('coinId').primary();
      //create auto incrementing coinId that is the primary key
    }),
  ]);
};

exports.down = function(knex) {
  //when you would like to run a migrate:rollback do these steps
  return Promise.all([
    //return an array of promises
    knex.schema.dropTable('users'),
    //delete the table users
    knex.schema.dropTable('joiner'),
    //delete the table joiner
    knex.schema.dropTable('coindata'),
    //delete the table coindata
  ]);
};
