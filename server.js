const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Crypto Api';

app.get('/api/v1/coindata', (request, response) => {
  database('coindata').orderBy('date')
    .then( (data) => {
      response.status(200).json(data);
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

app.get('/api/v1/coindata/:date', (request, response) => {
  database('coindata').where('date', request.params.date)
    .then((data) => {
        if(data.length) {
          response.status(200).json(data);
        } else {
          response.status(404).json({
            error: `Could not find coin data on date ${request.params.data}`
          });
        }
    })
    .catch((err) => {
      response.status(500).json({ err });
    });
});

// app.get('/api/v1/coindata/:name', (request, response) => {
//   database('coindata').where('name', request.params.name).select()
//     .then((data) => {
//       if(data.length) {
//         response.status(200).json(data);
//       } else {
//         response.status(404).json({
//           error: `Could not find coin with name ${request.params.name}`
//         });
//       }
//     })
//     .catch((err) => {
//       request.status(500).json({ err });
//     });
// });
//Update to figure out whether user is filtering by date or name. Refactor with above endpoint!

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

app.post('/api/v1/coindata', (request, response) => {
  //Add data for a day to specific coin db
});

// app.get('/api/v1/papers/:id', (request, response) => {
//   database('papers').where('id', request.params.id).select()
//     .then(papers => {
//       if (papers.length) {
//         response.status(200).json(papers);
//       } else {
//         response.status(404).json({ 
//           error: `Could not find paper with id ${request.params.id}`
//         });
//       }
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });

// app.post('/api/v1/papers', (request, response) => {
//   const receivedPaper = request.body;
//   console.log(receivedPaper)
//   for (let requiredParameter of ['title', 'author']) {
//     if (!receivedPaper[requiredParameter]) {
//       return response
//         .status(422)
//         .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
//     }
//   }
//   database('papers').insert(receivedPaper, 'id')
//     .then(paper => {
//       response.status(201).json({ ...receivedPaper, id: paper[0] })
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });

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
