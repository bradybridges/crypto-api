export const coinDataFetch = 'export const getCoinData = async () => {\n'
  +'  const response = await fetch(\'https://heroku-coin-api.herokuapp.com/api/v1/coindata\');\n'
  +'  if(!response) {\n'
  +'    throw Error(\'Failed to fetch coin data\');\n'
  +'  } else {\n'
  +'    const coinData = await response.json();\n'
  +'    return coinData;\n'
  +'  }\n'
  +'}\n'
  +'getCoinData();';

export const dateCoinFetch = 'export const getCoinDataOnDate = async (date) => {\n'
  +'const response = await fetch(`https://heroku-coin-api.herokuapp.com/api/v1/coindata/date/${date}`);\n'
  +'  if(!response) {\n'
  +'    return Error(\'Could not fetch coin info\');\n'
  +'  } else {\n'
  +'    const dateData = await response.json();\n'
  +'    return dateData\n'
  +'  }\n'
  +'}\n'
  +'getCoinDataOnDate(\'2019-11-10\');';

export const nameCoinFetch = 'export const getCoinDataByName = async (name) => {\n'
  +'const response = await fetch(`https://heroku-coin-api.herokuapp.com/api/v1/coindata/name/${name}`);\n'
  +'  if(!response.ok) {\n'
  +'    return Error(\'Coin not found\');\n'
  +'  } else {\n'
  +'    const user = await response.json();\n'
  +'    return user;\n'
  +'  }\n'
  +'}\n'
  +'getCoinDataByName(\'Bitcoin\')';

export const usersFetch = 'export const getUsers = async () => {\n'
  +'const response = await fetch(\'https://heroku-coin-api.herokuapp.com/api/v1/users\');\n'
  +'  if(!response) {\n'
  +'    return Error(\'Unable to fetch users\');\n'
  +'  } else {\n'
  +'    const users = await response.json();\n'
  +'    return users;\n'
  +'  }\n'
  +'}\n'
  +'getUsers();';

export const userFetch = 'export const getUser = async (username) => {'
  +'const response = await fetch(`https://heroku-coin-api.herokuapp.com/api/v1/users/${username}`);\n'
  +'  if(!response) {\n'
  +'    return Error(\'User not found\');\n'
  +'  } else {\n'
  +'    const user = await response.json();\n'
  +'    return user;\n'
  +'  }\n'
  +'}\n'
  +'getUser(\'Arya\');';