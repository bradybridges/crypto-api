export const getCoinData = async () => {
  const response = await fetch('https://heroku-coin-api.herokuapp.com/api/v1/coindata');
  if(!response) {
    throw Error('Failed to fetch coin data');
  } else {
    const coinData = await response.json();
    return coinData;
  }
}
  
export const getCoinDataOnDate = async (date) => {
  const response = await fetch(`https://heroku-coin-api.herokuapp.com/api/v1/coindata/date/${date}`);
  if(!response) {
    return Error('Could not fetch coin info');
  } else {
    const dateData = await response.json();
    return dateData
  }
}

export const getCoinDataByName = async (name) => {
  const response = await fetch(`https://heroku-coin-api.herokuapp.com/api/v1/coindata/name/${name}`);
  if(!response.ok) {
    return Error('Coin not found');
  } else {
    const user = await response.json();
    return user;
  }
}

export const getUsers = async () => {
  const response = await fetch('https://heroku-coin-api.herokuapp.com/api/v1/users');
  if(!response) {
    return Error('Unable to fetch users');
  } else {
    const users = await response.json();
    return users;
  }
}

export const getUser = async (username) => {
  const response = await fetch(`https://heroku-coin-api.herokuapp.com/api/v1/users/${username}`);
  if(!response) {
    return Error('User not found');
  } else {
    const user = await response.json();
    return user;
  }
}

export const deleteUser = async (username) => {
  const response = await fetch('https://heroku-coin-api.herokuapp.com/api/v1/users', {
    method: 'DELETE',
    headers: { 'content-type': 'application/json'},
    body: JSON.stringify({
      username
    })
  });
  if(!response.ok) {
    return Error('Failed to delete user');
  }
  const resp = await response.json();
  return resp;
}

export const deleteRecord = async (date) => {
  const response = await fetch('https://heroku-coin-api.herokuapp.com/api/v1/coin', {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ date })
  })
  if(!response.ok) {
    return Error('Failed to delete record');
  }
  const resp = await response.json();
  return resp;
}