const express = require('express');
const app = express();
app.use(express.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Coin Api';

app.get('/api/v1/coindata', (request, response) => {
  database('coindata').orderBy('date')
    .then( (data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/date/:date', (request, response) => {
  database('coindata').where('date', request.params.date).orderBy('coinId')
    .then((data) => {
        if(data.length) {
          response.status(200).json(data);
        } else {
          response.status(404).json({
            error: `Could not find coin data for date ${request.params.date}`
          });
        }
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/name/:name', (request, response) => {
  database('coindata').where('name', request.params.name).orderBy('date')
    .then((data) => {
      if(data.length) {
        response.status(200).json(data);
      } else {
        response.status(404).json({
          error: `Could not find coin with name ${request.params.name}`
        });
      }
    })
    .catch((err) => {
      request.status(500).json({ err });
    });
});

app.get('/api/v1/users', (request, response) => {
  database('users').orderBy('username')
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/users/:username', (request, response) => {
  database('users').where('username', request.params.username).select()
    .then((data) => {
      if(data.length) {
        response.status(200).json(data);
      } else {
        response.status(404).json({
          error: `Unable to find user with username ${request.params.username}`
        })
      }
    })
    .catch((err) => {
      response.status(500).json({ err });
    })
});

app.get('/api/v1/users/coin/:coinname', (request, response) => {
  database('users').where('coinname', request.params.coinname).orderBy('username')
    .then((data) => {
      if(data.length) {
        response.status(200).json(data);
      } else {
        response.status(404).json({
          error: `Unable to find users that hold coins with name ${request.params.coinname}`
        })
      }
    })
    .catch((err) => {
      response.status(500).json({ err });
    })
});

app.post('/api/v1/coindata', (request, response) => {
  const receivedData = request.body;
  for (let requiredParameter of ['coinId', 'date', 'name', 'price', 'marketCap']) {
    if (!receivedData[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { coinId: <Integer>, date: <String>, name: <String>, price: <Integer>, marketCap: <Integer> }. You're missing a "${requiredParameter}" property.`});
    }
  }
  database('coindata').insert(receivedData, 'id')
    .then(coinData => {
      response.status(201).json({ ...coinData });
    })
    .catch(err => {
      response.status(500).json({ err });
    });
});

app.post('/api/v1/users', (request, response) => {
  const receivedUser = request.body;
  for(let requiredParam of ['coinId', 'coinname', 'username', 'qty']) {
    if(!receivedUser[requiredParam]) {
      return response
        .status(422)
        .send({ error: `Expected format: { coinId: <integer>, coinname: <String>, username: <String>, qty: <integer> }. You're missing a "${requiredParam}" property.`});
    }
  }
  database('users').insert(receivedUser, 'username')
    .then( newUser => {
      response.status(201).json({ ...newUser });
    })
    .catch((err) => {
      response.status(500).json({ err });
    })
});

app.delete('/api/v1/coindata', (request, response) => {
  const body = request.body;
  database('coindata')
    .where({ date: body.date })
    .select()
    .then((data) =>{
      if(!data.length) {
        return response.status(205).send({ error: 'No data to delete' });
      }
      database('coindata')
        .where({ date: body.date })
        .del()
        .then(() => {
          response.status(202).json({ message: `Successfully deleted data on date: ${body.date}` });
        })
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.delete('/api/v1/users', (request, response) => {
  const body = request.body;
  database('users')
    .where({ username: body.username })
    .select()
    .then((user) => {
      if(!user.length) {
        return response.status(205).send({ error: 'User does not exist' })
      }

      database('users')
        .where({ username: body.username })
        .del()
        .then(() => {
          response.status(202).json({ message: `Successfully deleted user ${body.username}` });
        });
    })
    .catch((err) => {
      response.status(500).json({ err });
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
