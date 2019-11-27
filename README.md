# crypto-api

## Table of contents
* [Objective](#Objective)
* [Tools Used](#Tools-Used)
* [Requirements](#Requirements)
* [Setup](#Setup)
* [Documentation](#Documentation)

## Live Docs Page
[Documentation](https://bradybridges.github.io/crypto-api-frontend/)

## Objective
The objective of this project was to familiarize myself with express and knex. The goal of this project is to deploy a working RESTful API to Heroku that includes GET, POST, and DELETE endpoints. Another goal of this project is to develope an API that is easy to use, well documented, and returns data in a format that is convenient for the user.
  
## Tools Used
  - JavaScript(BE/FE)
  - React(FE)
  - Express
  - Knex
  - Heroku 

## Requirements
This API is hosted on Heroku so there are no requirements, unless you would like to run the API locally. To learn more about accessing the API via heroku, go to the [documentation](#Documentation) section.

To run this API locally you will need to have brew installed. You must also npm installed on your local machine. This is used to install all of the dependencies of the application. 

To install brew run the command 

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

To install NPM run this command

```bash
brew install node
```

To confirm that NPM was installed run the command

```bash
npm -v
```
This should print the version number of NPM

## Setup

1. Clone down this repo.
1. Then install the library dependencies. Run:

```bash
npm install
```
1. Start PostGres. Run:
```bash
brew services start postgresql
```
1. Set up the database. Run:

```bash
psql
```

```bash
CREATE DATABASE coindata
```
Running this command you should see coindata listed as a database
```bash
\l
```
1. Now you must migrate the database to set up the tables. Run:
In your pqsl terminal run
```bash
  \c coindata
```

```bash
knex migrate:latest
```
Running this command you should see coindata, users, and joiner listed as tables of the coindata database.
```bash
\dt
```

1. Now seed the data. Run:

```bash
knex seed:run
```
Running these commands individually should return all the data in each table
```bash
SELECT * FROM coindata;
SELECT * FROM users;
SELECT * FROM joiner;
```

## Documentation

### GET All Coin Data
```
GET https://heroku-coin-api.herokuapp.com/api/v1/coindata
```
### Response
Status: 200 OK 
------------ 
```
  [
    {
      coinId: 2
      created_at: "2019-11-22T17:46:29.424Z"
      date: "2019-01-01"
      id: 323
      marketCap: 1893950928.33
      name: "Litecoin"
      price: 31.65
      updated_at: "2019-11-22T17:46:29.424Z"
    },
    {
      coinId: 3
      created_at: "2019-11-22T17:46:29.793Z"
      date: "2019-01-01"
      id: 674
      marketCap: 14491949908.86
      name: "Ethereum"
      price: 139.15
      updated_at: "2019-11-22T17:46:29.793Z"
    },
    {
      coinId: 1
      created_at: "2019-11-22T17:46:29.132Z"
      date: "2019-01-01"
      id: 78
      marketCap: 66480140226.8
      name: "Bitcoin"
      price: 3808.12
      updated_at: "2019-11-22T17:46:29.132Z"
    },
    .
    .
    .
  ]
```

### GET All Coin Data On A Specific Date
```
GET https://heroku-coin-api.herokuapp.com/api/v1/coindata/date/:date
```

### Parameters 
Name | Type | Description
---- | ---- | -----------
`date` | `String` | Must be in format 'year-month-day', ex `'2019-11-10`'

### Response
Status: 200 OK 
------------ 
```
  [
    {
      coinId: 1
      created_at: "2019-11-22T17:46:29.411Z"
      date: "2019-11-10"
      id: 311
      marketCap: 163135487790.44
      name: "Bitcoin"
      price: 9042.89
      updated_at: "2019-11-22T17:46:29.411Z"
    },
    {
      coinId: 2
      created_at: "2019-11-22T17:46:29.758Z"
      date: "2019-11-10"
      id: 630
      marketCap: 4053456591.32
      name: "Litecoin"
      price: 63.66
      updated_at: "2019-11-22T17:46:29.758Z"
    },
    {
      coinId: 3
      created_at: "2019-11-22T17:46:30.028Z"
      date: "2019-11-10"
      id: 954
      marketCap: 20512236271.73
      name: "Ethereum"
      price: 189.05
      updated_at: "2019-11-22T17:46:30.028Z"
    },
  ]
```

### GET All Coin Data By Coin Name
```
GET https://heroku-coin-api.herokuapp.com/api/v1/coindata/name/:name
```

### Parameters 
Name | Type | Description
---- | ---- | -----------
`name` | `String` | ex `'Bitcoin'`

### Response
Status: 200 OK 
------------ 
```
  [
    {
      coinId: 1
      created_at: "2019-11-22T17:46:29.411Z"
      date: "2019-11-10"
      id: 311
      marketCap: 163135487790.44
      name: "Bitcoin"
      price: 9042.89
      updated_at: "2019-11-22T17:46:29.411Z"
    },
    {
      coinId: 1
      created_at: "2019-11-22T17:46:29.010Z"
      date: "2019-01-02"
      id: 1
      marketCap: 68060061857.88
      name: "Bitcoin"
      price: 3898.2
      updated_at: "2019-11-22T17:46:29.010Z"
    },
    {
      coinId: 1
      created_at: "2019-11-22T17:46:29.132Z"
      date: "2019-01-03"
      id: 77
      marketCap: 66080363535.85
      name: "Bitcoin"
      price: 3784.39
      updated_at: "2019-11-22T17:46:29.132Z"
    },
    .
    .
    .
  ]
```

### POST Coin Record For A Specific Date
```
POST https://heroku-coin-api.herokuapp.com/api/v1/coindata
```

### Parameters 
Name | Type | Description
---- | ---- | -----------
`name` | `String` | ex `'Bitcoin'`
`date` | `String` | ex `2019-11-29`
`price` | `Integer` | ex `34560.33`
`marketCap` | `Integer` | ex `123456789.10`
`coinId` | `Integer` | ```1 is Bitcoin, 2 is Litecoin, 3 is Ethereum```
`qty` | `Integer` | ex `203`

### Response
Status: 201 CREATED
------------ 
```
{
    "0": 971
}
```
Returns Id of new record

### DELETE Coin Records For A Specific Date
```
DELETE https://heroku-coin-api.herokuapp.com/api/v1/coindata/:date
```

### Parameters 
Name | Description
---- | -----------
`date` | ex `2019-11-29`

### Example
```bash
  fetch('https://heroku-coin-api.herokuapp.com/api/v1/coindata/2019-11-10',{
    method: 'DELETE'
  })
  .then((resp) => resp.json())
  .then((data) => console.log(data));
```

### Response
Status: 202 Accepted
------------ 
```
{
    "message": "Successfully deleted data on date: 2019-11-10"
}
```

### GET All User Data
```
GET https://heroku-coin-api.herokuapp.com/api/v1/users
```
### Response
Status: 200 OK 
------------ 
```
  [
    {
      coinId: 3
      coinname: "Ethereum"
      created_at: "2019-11-22T17:46:30.046Z"
      id: 8
      qty: 17
      updated_at: "2019-11-22T17:46:30.046Z"
      username: "Alex"
    },
    {
      coinId: 3
      coinname: "Ethereum"
      created_at: "2019-11-22T17:46:30.060Z"
      id: 28
      qty: 435
      updated_at: "2019-11-22T17:46:30.060Z"
      username: "Andrew"
    },
    {
      coinId: 1
      coinname: "Bitcoin"
      created_at: "2019-11-22T17:46:30.062Z"
      id: 32
      qty: 709
      updated_at: "2019-11-22T17:46:30.062Z"
      username: "Arya"
    },
    .
    .
    .
  ]
```

### GET User By Name
```
GET https://heroku-coin-api.herokuapp.com/api/v1/users/:name
```

### Parameters 
Name | Type | Description
---- | ---- | -----------
`name` | `String` | ex `'Alex'`

### Response
Status: 200 OK 
------------ 
```
  [
    {
      coinId: 3
      coinname: "Ethereum"
      created_at: "2019-11-22T17:46:30.046Z"
      id: 8
      qty: 17
      updated_at: "2019-11-22T17:46:30.046Z"
      username: "Alex"
    },
  ]
```

### POST User By Name
```
POST https://heroku-coin-api.herokuapp.com/api/v1/users
```

### Parameters 
Name | Type | Description
---- | ---- | -----------
`username` | `String` | ex `'Alex'`
`coinname` | `String` | ex `'Bitcoin'`
`coinId` | `Integer` | ```1 is Bitcoin, 2 is Litecoin, 3 is Ethereum```
`qty` | `Integer` | ex `203`

### Response
Status: 201 CREATED 
------------ 
```
{
  "0": "Alex"
}
```

### DELETE A User By Username
```
DELETE https://heroku-coin-api.herokuapp.com/api/v1/users/:username
```

### Parameters 
Name | Description
---- | -----------
`username` | ex `Arya`

### Example
```bash
  fetch('https://heroku-coin-api.herokuapp.com/api/v1/users/Arya', {
    method: 'DELETE'
  })
  .then((resp) => resp.json())
  .then((data) => console.log(data));
```

### Response
Status: 202 Accepted
------------ 
```
{
    "message": "Successfully deleted user Arya"
}
```
