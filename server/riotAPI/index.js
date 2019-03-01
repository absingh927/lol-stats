const axios = require('axios');
const champs = require('../en_US/championFull.json');
const items = require('../en_US/item.json');

// Main Riot API Calls
module.exports.getSummonerByName = (username) => {
  const endpoint = `/summoner/v4/summoners/by-name/${username}/?api_key=`;

  return axios.get(process.env.RIOT_API_URL + endpoint + process.env.RIOT_API_KEY)
  .then(response => response.data)
  .catch(error => error);
}

module.exports.getMatchesByAccountID = (accountID, endIndex) => {
  const endpoint = `/match/v4/matchlists/by-account/${accountID}/?api_key=`;
  const query = `&endIndex=${endIndex}`;

  return axios.get(process.env.RIOT_API_URL + endpoint + process.env.RIOT_API_KEY + query)
  .then(response => response.data.matches)
  .catch(error => error);
}

module.exports.getMatchDetailsByID = (matchID) => {
  const endpoint = `/match/v4/matches/${matchID}/?api_key=`;

  return axios.get(process.env.RIOT_API_URL + endpoint + process.env.RIOT_API_KEY)
  .then(response => response.data)
  .catch(error => error);
}

// Static Data Calls
module.exports.getChampions = () => {
  return returnById(champs.data);
}

module.exports.getItems = () => {
  return items.data;
}

function returnById(data) {
  let newobj = {};
  for (const key in data) {
    let current = data[key];
    newobj[current.key] = data[key];
  }
  return newobj;
}