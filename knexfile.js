module.exports = {
  development: {
    //on the dev server
    client: 'pg',
    //client is postgres
    connection: 'postgres://localhost/coindata',
    //the backend is hosted at above address
    useNullAsDefault: true,
    //if a value is not supplied it will be specified as null
    migrations: {
      //migration files are located at below directory
      directory: './db/migrations'
    },
    seeds: {
      //seed files are located at the below directory
      directory: './db/seeds/dev'
    }
  },
  production: {
    //on production server
    client: 'pg',
    //client is postgres
    connection: process.env.DATABASE_URL + `?ssl=true`,
    //the connection is the database url + the string ?ssl=true
    useNullAsDefault: true,
    //if a value is not supplied for col it will be specified as null
    migrations: {
      //migration files located here
      directory: './db/migrations'
    },
    seeds: {
      //seed files located here
      directory: './db/seeds/dev'
    }
  }
};
