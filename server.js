//express setup
const express = require('express');
const app = express();
app.use(express.json());
//Tells app to expect incoming requests to be interpreted as JSON

const environment = process.env.NODE_ENV || 'development';
//set environment to development
const configuration = require('./knexfile')[environment];
//set up config file using knexfile and environment name
const database = require('knex')(configuration);
//sets up database to be accessed using config file created above

app.set('port', process.env.PORT || 3000);
//set port to provided port num or 3000
app.locals.title = 'Coin Api';
//set locally stored var title to Coin Api

app.get('/', (request, response) => {
  //Root GET endpoint that returns welcome to coin api and status code 200
  response.status(200).send('Welcome to Coin Api');
})

app.get('/api/v1/coindata', (request, response) => {
  //setup GET endpoint
  database('coindata').orderBy('date')
    //get all data from coindata order it by date
    .then( (data) => {
      //once response is received return the data with status 200
      response.status(200).json(data);
    })
    .catch((err) => {
      //If an error occured there is something wrong with the backend
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/date/:date', (request, response) => {
  //establish GET endpoint
  database('coindata').where('date', request.params.date).orderBy('coinId')
  //get all items from coindata where the data is equal to the provided data
  //order response by coinId
    .then((data) => {
      //once the response is received
        if(data.length) {
          //if the response is not empty
          //return the data found for that date and status code 200
          response.status(200).json(data);
        } else {
          //no results were found for date
          response.status(404).json({
            //return status 404 not found and an error 
            error: `Could not find coin data for date ${request.params.date}`
          });
        }
    })
    .catch((err) => {
      //if the query failed something wrong with backend return 500 status and error
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/name/:name', (request, response) => {
  //establish GET endpoint for specific coin names
  database('coindata').where('name', request.params.name).orderBy('date')
  //select data from coindata where the name is equal to the name provided
  //order the response by date
    .then((data) => {
      //once the response is received
      if(data.length) {
        //if the response is not empty
        //return the data found for that date and a status of 200
        response.status(200).json(data);
      } else {
        //the query did not find any data for coins with specified name
        //return 404 not found and a helpful error message
        response.status(404).json({
          error: `Could not find coin with name ${request.params.name}`
        });
      }
    })
    .catch((err) => {
      //if something went wrong there is an issue with the backend
      //return status code 500 and the error
      request.status(500).json({ err });
    });
});

app.get('/api/v1/users', (request, response) => {
  //establish GET endpoint to get all users
  database('users').orderBy('username')
  //select all from users and order them by username
    .then((data) => {
      //once the data is returned
      //return a the users and a status code of 200 - OK
      response.status(200).json(data);
    })
    .catch((err) => {
      //something went wrong, there is a problem with the backend
      response.status(500).json({ err });
    });
});

app.get('/api/v1/users/:username', (request, response) => {
  //establish GET endpoint to find user by username
  database('users').where('username', request.params.username).select()
  //find all users in users where username is equal to provided username
  //return these users
    .then((data) => {
      //once response is received
      if(data.length) {
        //and a user(s) was found
        //returnh the user(s) and a status of 200 - Ok
        response.status(200).json(data);
      } else {
        //no users with specified username was found
        //return 404 - not found and a helpful error msg
        response.status(404).json({
          error: `Unable to find user with username ${request.params.username}`
        })
      }
    })
    .catch((err) => {
      //something went wrong, there is a problem with the backend
      //return status of 500 and the error that occurred
      response.status(500).json({ err });
    })
});

app.get('/api/v1/users/coin/:coinname', (request, response) => {
  //establish GET endpoint to get users by the type of coin they have
  database('users').where('coinname', request.params.coinname).orderBy('username')
  //get all from users where the coinname is equal to the provided coinname
  //order the response by username
    .then((data) => {
      //once the response is received
      if(data.length) {
        //and users were found
        //return the users and a status code of 200 - OK
        response.status(200).json(data);
      } else {
        //no users were found return 404 - not found and a helpful error msg
        response.status(404).json({
          error: `Unable to find users that hold coins with name ${request.params.coinname}`
        })
      }
    })
    .catch((err) => {
      //Something went wrong, there is a problem on the backend
      response.status(500).json({ err });
    })
});

app.post('/api/v1/coindata', (request, response) => {
  //establish POST endpoint to add a new record
  const receivedData = request.body;
  //the received data is assigned to the data provided by user
  for (let requiredParameter of ['coinId', 'date', 'name', 'price', 'marketCap']) {
    //for every required parameter
    if (!receivedData[requiredParameter]) {
      //if the receivedData does not include the required property
      //return staus 422 unproccessable entity with helpful error msg telling user what param they are missing
      return response
        .status(422)
        .send({ error: `Expected format: { coinId: <Integer>, date: <String>, name: <String>, price: <Integer>, marketCap: <Integer> }. You're missing a "${requiredParameter}" property.`});
    }
  }
  database('coindata').insert(receivedData, 'id')
  //if all required parameters are present add the new record
    .then(coinData => {
      //once the response is received return status 201 - successful insertion and the new record added
      response.status(201).json({ ...coinData });
    })
    .catch(err => {
      //something went wrong there is a BE problem
      response.status(500).json({ err });
    });
});

app.post('/api/v1/users', (request, response) => {
  //POST endpoint to add a new user
  const receivedUser = request.body;
  //received user assigned to the provided information
  for(let requiredParam of ['coinId', 'coinname', 'username', 'qty']) {
    //for every specified required param 
    if(!receivedUser[requiredParam]) {
      //if the receivedUser does not include the property that is required
      //return status 422 - unprocessable entity and error telling them what they are missing and the format expected
      return response
        .status(422)
        .send({ error: `Expected format: { coinId: <integer>, coinname: <String>, username: <String>, qty: <integer> }. You're missing a "${requiredParam}" property.`});
    }
  }
  database('users').insert(receivedUser, 'username')
    //if all required params are present add the new user
    .then( newUser => {
      //once the response is received
      //return status 201- sucessful insertion and the new user added
      response.status(201).json({ ...newUser });
    })
    .catch((err) => {
      //an error occurred something is wrong with BE
      response.status(500).json({ err });
    })
});

app.delete('/api/v1/coindata', (request, response) => {
  //DELETE endpoint to delete data for a specific date
  const body = request.body;
  //body is assigned to the provided info in body of request
  database('coindata')
    //from coindata
    .where({ date: body.date })
    //where the data is equal to the provided date in body
    .select()
    //select that user
    .then((data) =>{
      //once the response is received
      if(!data.length) {
        //and no user was found
        //return 404 - Not found and a helpful error msg
        return response.status(404).send({ error: 'No data to delete' });
      }
      database('coindata')
        //data on that date was found
        //select grab data for that date
        .where({ date: body.date })
        //delete the data for that data
        .del()
        .then(() => {
          //once response is received
          //return staus 202 - accepted and a message indicating success
          response.status(202).json({ message: `Successfully deleted data on date: ${body.date}` });
        })
    })
    .catch((err) => {
      //something went wrong return 500 - internal server error and the error
      response.status(500).json({ err });
    });
});

app.delete('/api/v1/users', (request, response) => {
  //DELETE endpoint to delete a user
  const body = request.body;
  //body is assigned to the body of the request
  database('users')
  //from db users
    .where({ username: body.username })
    //where username is equal to username provided in body
    .select()
    //return users
    .then((user) => {
      //once the response is received
      if(!user.length) {
        //if no users are found
        //return status 404 - not found and a helpful error
        return response.status(404).send({ error: 'User does not exist' })
      }

      database('users')
        //user exists so grab user from users again
        .where({ username: body.username })
        //where the username is equal to provided username
        .del()
        //delete that user
        .then(() => {
          //once reponse is received return 202 - accepted and a message indicating success
          response.status(202).json({ message: `Successfully deleted user ${body.username}` });
        });
    })
    .catch((err) => {
      //something went wrong return 500 - internal server error and the error that occurred
      response.status(500).json({ err });
    })
});

app.listen(app.get('port'), () => {
  //tell app to listen for requests on the currently set port
  //if the app is successful at starting on port log info to indicate successful start of server
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
