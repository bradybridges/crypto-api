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

const createJoiner = (knex, coinNames) => {
    const coinPromises = [];
    coinNames.forEach(name => {
      coinPromises.push(knex('joiner').insert({ name }));
    });
    return Promise.all(coinPromises);
};

const createPortfolio = (knex, coinNames) => {
  const coinPromises = [];
  coinNames.forEach((name, i) => {
    const coinId = i + 1;
    coinPromises.push(knex('portfolio').insert({ coinId, name, qty: 0 }));
  });
  return Promise.all(coinPromises);
};

const createCoinData = (knex) => {
  let coinPromises = [];
  coinData.forEach(coin => {
    coinPromises.push(createCoinEntry(knex, coin));
  });
  return Promise.all(coinPromises);
}

exports.seed = function(knex) {
  return knex('coindata').del()
  .then(() => knex('portfolio').del())
  .then(() => knex('joiner').del())
  .then(() => {
    createCoinData(knex);
  })
  .then(() => {
    coinNames = ['Bitcoin', 'Litecoin', 'Ethereum'];
    return createJoiner(knex, coinNames);
  })
  .then(() => {
    coinNames = ['Bitcoin', 'Litecoin', 'Ethereum'];
    return createPortfolio(knex, coinNames);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};