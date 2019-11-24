//import coindata
const coinData = require('../../../data/coindata');
//define func createCoinEntry
const createCoinEntry = (knex, data) => {
  //it requires knex and the data to be created
  const { coinId, date, name, price, marketCap } = data;
  //from the provided data destructure the properties above
  return knex('coindata').insert({
    coinId,
    date,
    name,
    price,
    marketCap,
  });
  //insert the provided data into the db
};

const createJoiner = (knex, coinNames) => {
  //define func createJoiner that requires knex and coinNames to be passed to it
    let coinPromises = [];
    //create empty array named coinPromises to hold array of promises to resolve
    coinNames.forEach(name => {
      //for each coin name
      coinPromises.push(knex('joiner').insert({ name }));
      //push knex insertion to the array of coin promises
    });
    return Promise.all(coinPromises);
    //resolve all of the insertions 
};
const createUsers = (knex) => {
  //define func createUsers that requires knex
  let userPromises = [];
  //define empty array to hold promises to be resolved
  const userNames = [
    //define array of mock usernames
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
    //for each username
    const coinId = Math.floor(Math.random() * 3) + 1;
    //generate a random coinId with range 1-3
    const qty = Math.floor(Math.random() * 1000) + 1;
    //generate random qty between 1-1000
    let coinname;
    //define variable coinname
    switch(coinId) {
      case 1:
        //if coinId is equal to one coinname is Bitcoin
        coinname = 'Bitcoin';
        break;
      case 2:
        //coinId is equal to 2 coinname is Litecoin
        coinname = 'Litecoin';
        break;
      case 3:
        //coinId is equal to 3 coinname is Ethereum
        coinname = 'Ethereum';
        break;
    }
    //Push the result of the insertion to the userPromises array
    userPromises.push(knex('users').insert({ coinId, username, coinname, coinId, qty }));
  });
  //resolve all userPromises
  return Promise.all(userPromises);
};

const createCoinData = (knex) => {
  //define func createCoinData that requires knex
  let coinPromises = [];
  //define empty array called coinPromises to hold array of promises
  coinData.forEach(coin => {
    //for each piece of coin data 
    coinPromises.push(createCoinEntry(knex, coin));
    //push the result of createCoinEntry to coinPromises
  });
  //return array of resolved promises
  return Promise.all(coinPromises);
}

exports.seed = function(knex) {
  //when the seed is executed
  return knex('coindata').del()
  //delete all data from coindata
  .then(() => knex('users').del())
  //delete all data from users
  .then(() => knex('joiner').del())
  //delete all data from the joiner table
  .then(() => {
    //once that is completed run the function createCoinData passing it knex
    createCoinData(knex);
  })
  .then(() => {
    //once the response is received
    coinNames = ['Bitcoin', 'Litecoin', 'Ethereum'];
    //define array of coin names to be added to joiner
    return createJoiner(knex, coinNames);
    //return the result of createJoiner that is passed knex and coinNames array
  })
  .then(() => {
    //once the response is received return result of createUsers passing it knex
    return createUsers(knex);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
  //if the seed fails to execute log the error that occurred
};