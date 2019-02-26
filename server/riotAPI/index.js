const requestProm = require('request-promise');

// base api call, so you can easily extend to other API calls
function baseAPI(region, endpoint, options = {}) {
  return requestProm(process.env.RIOT_API_URL + endpoint, {
    headers: {
      'X-Riot-Token': process.env.RIOT_API_KEY
    },
    json: true,
    ...options
  });
}


module.exports.getSummonerByName = (username, options = {}) => {
  baseAPI(`/summoner/v4/summoners/by-name/${username}`, options);
}