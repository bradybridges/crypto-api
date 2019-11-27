import React, { Component } from 'react';
import './App.css';
import { 
  getCoinData,
  getUsers, 
  getCoinDataOnDate,
  getCoinDataByName,
  getUser,
} from '../../apiCalls';
import { 
  coinDataFetch,
  dateCoinFetch, 
  nameCoinFetch, 
  usersFetch,
  userFetch,
  deleteUser,
  deleteRecord,
  insertRecord,
  insertUser,
} from '../../formattedFetchExamples';
import GetEndpointDiv from '../GetEndpointDiv/GetEndpointDiv';
import DeleteDiv from '../DeleteDiv/DeleteDiv';

class App extends Component {
  printCoinData = () => {
    getCoinData()
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  printUserData = () => {
    getUsers()
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  printDateData = () => {
    getCoinDataOnDate('2019-11-10')
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  printCoinNameData = () => {
    getCoinDataByName('Bitcoin')
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  printUser = () => {
    getUser('Arya')
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }

  simulateDeleteUser = (username) => {
    const message = { message: `Successfully deleted user with username ${username}`};
    console.log(message);
  }

  simulateDeleteRecord = (date) => {
    const message = { message: `Successfully deleted records on date: ${date}`};
    console.log(message);
  }

  simulateCoinInsertion = () => {
    console.log({ 0: 954 });
  }
  
  simulateUserInsertion = () => {
    console.log({ 0: "Bran" });
  }
  
  render() {
    return (
      <main>
        <h1>Coin Api Documentation</h1>
        <section id="endpoints">
          <h2>Endpoints</h2>
          <GetEndpointDiv 
            title='GET All Coin Data' 
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata'
            handleClick={this.printCoinData}
            fetch={coinDataFetch}
          />
          <GetEndpointDiv
            title='GET All User Data'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users'
            handleClick={this.printUserData}
            fetch={usersFetch}
          />
          <GetEndpointDiv
            title='GET All Coin Data On Date'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata/date/:date'
            handleClick={this.printDateData}
            fetch={dateCoinFetch}
          />
          <GetEndpointDiv
            title='GET All Coin Data By Name'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata/name/:name'
            handleClick={this.printCoinNameData}
            fetch={nameCoinFetch}
          />
          <GetEndpointDiv
            title='GET A User By Username'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users/:name'
            handleClick={this.printUser}
            fetch={userFetch}
          />
          <GetEndpointDiv 
            title='POST New Record' 
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata'
            handleClick={this.simulateCoinInsertion}
            fetch={insertRecord}
            parameters={[
              'name <String>',
              'coinId: <Integer>', 
              'date <String> yyyy/mm/dd', 
              'price <Double>', 
              'marketCap <Double>'
            ]}
          />
          <GetEndpointDiv 
            title='POST A New User' 
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users'
            handleClick={this.simulateUserInsertion}
            fetch={insertUser}
            parameters={[
              'username <String>',
              'coinname <String>',
              'coinId <Integer>',
              'qty <Integer>'
            ]}
          />
          <DeleteDiv
            title='DELETE A User'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users'
            handleClick={this.simulateDeleteUser}
            fetch={deleteUser}
            parameter='username'
          />
          <DeleteDiv
            id='last-div'
            title='DELETE A Record On A Date'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users'
            handleClick={this.simulateDeleteRecord}
            fetch={deleteRecord}
            parameter='date'
            type='date'
          />
        </section>
      </main>
    );
  }
}

export default App;

