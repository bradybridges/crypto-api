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
const createUsers = (knex) => {
  const userPromises = [];
  const userNames = [
    'Randy',
    'James',
    'Brady',
    'Harold',
    'Jeff',
    'Brandon',
    'Eddard',
    'Jessica',
    'Mikayla',
    'Sam',
    'Alex',
    'Jordan',
    'Jimmy',
    'Clyde',
    'Hodor',
    'Bran',
    'Jon',
    'Theon',
    'Jeremy',
    'Nick',
    'Blake',
    'Martha',
    'Kendra',
    'Grace',
    'Leah',
    'Sydney',
    'Matt',
    'Andrew',
    'Jake',
    'Brittney',
    'Sansa',
    'Arya',
    'Daniel',
    'Cammile',
    'Max',
    'Justin',
    'Lauren',
    'Brianna',
  ];

  userNames.forEach((username, i) => {
    const coinId = Math.floor(Math.random() * 3) + 1;
    const qty = Math.floor(Math.random() * 1000) + 1;
    let coinname;
    switch(coinId) {
      case 1:
        coinname = 'Bitcoin';
        break;
      case 2:
        coinname = 'Litecoin';
        break;
      case 3:
        coinname = 'Ethereum';
        break;
    }
    userPromises.push(knex('users').insert({ coinId, username, coinname, coinId, qty }))
  });
  return Promise.all(userPromises);
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
  .then(() => knex('users').del())
  .then(() => knex('joiner').del())
  .then(() => {
    createCoinData(knex);
  })
  .then(() => {
    coinNames = ['Bitcoin', 'Litecoin', 'Ethereum'];
    return createJoiner(knex, coinNames);
  })
  .then(() => {
    return createUsers(knex);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};