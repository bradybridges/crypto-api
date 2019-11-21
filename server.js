const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Crypto Api';

app.get('/api/v1/coindata', (request, response) => {
  database('coindata').select()
    .then( (data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/:date', (request, response) => {
  database('coindata').where('date', request.params.date).select()
    .then((data) => {
        if(data.length) {
          response.status(200).json(data);
        } else {
          response.status(404).json({
            error: `Could not find coin data on data ${request.params.data}`
          });
        }
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/:name', (request, response) => {
  //return all coin data for specific coin
});

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/portfolio/:name', (request, response) => {
  //return portfolio data for specific coin
});

app.post('/api/v1/coindata/:name', (request, response) => {
  //Add data for a day to specific coin db
});

app.post('/api/v1/portfolio/:name', (request, response) => {
  //Add a new item to portfolio
});

app.post('/api/v1/portfolio', (request, response) => {
  //Update entire portfolio
});

app.delete('/api/v1/portfolio/:name', (request, response) => {
  //delete a particular item from portfolio
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
