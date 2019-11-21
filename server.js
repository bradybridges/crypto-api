const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Crypto Api';

app.get('/api/v1/coindata', (request, response) => {
  //return all coin data
});

app.get('/api/v1/coindata/:date', (request, response) => {
  //return all coin data for specific date
});

app.get('/api/v1/coindata/:name', (request, response) => {
  //return all coin data for specific coin
});

app.get('/api/v1/portfolio', (request, response) => {
  //return all portfolio data
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

