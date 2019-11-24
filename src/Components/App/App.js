import React, { Component } from 'react';
import { 
  getCoinData,
  getUsers, 
  getCoinDataOnDate,
  getCoinDataByName,
  getUser,
} from '../../apiCalls';
import EndpointDiv from '../EndpointDiv/EndpointDiv';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coinData: [],
      userData: [],
    }
  }

  // componentDidMount = () => {
  //   this.setCoinData();
  //   this.setUserData();
  // }

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

  renderCoinData = () => {
    const data = getCoinData()
      .then((resp) => resp.map((coin) => <h1>{coin.name}</h1>));
    return data;
  }
  
  render() {
    return (
      <main>
        <h1>Coin Api Documentation</h1>
        <section id="endpoints">
          <h2>Endpoints</h2>
          <EndpointDiv 
            title='GET All Coin Data' 
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata'
            handleClick={this.printCoinData}
            fetch='hello'
          />
          <EndpointDiv
            title='Get All User Data'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users'
            handleClick={this.printUserData}
            fetch='Example fetch'
          />
          <EndpointDiv
            title='Get All Coin Data On Date'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata/date/:date'
            handleClick={this.printDateData}
            parameters={['date']}

            fetch='Example fetch'
          />
          <EndpointDiv
            title='Get All Coin Data By Name'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/coindata/name/:name'
            handleClick={this.printCoinNameData}
            fetch='Example fetch'
            parameters={['name']}
          />
          <EndpointDiv
            title='Get A User By Username'
            endpoint='https://heroku-coin-api.herokuapp.com/api/v1/users/:name'
            handleClick={this.printUser}
            fetch='Example fetch'
            parameters={['username']}
          />

        </section>
      </main>
    );
  }
}

export default App;

