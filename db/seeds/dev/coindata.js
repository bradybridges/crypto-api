const coinData = require('../../../data/coindata');

const createCoinEntry = (knex, data) => {
  const { coinId, date, name, price, marketCap } = data;
  return knex('coindata').insert({
    coinId,
    date,
    name,
    price,
    marketCap,
  });
};

// coinId | date | name | price | marketCap

exports.seed = function(knex) {
  return knex('coindata').del()
  .then(() => {
    let coinPromises = [];
    coinData.forEach(coin => {
      coinPromises.push(createCoinEntry(knex, coin));
    });
    return Promise.all(coinPromises);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};