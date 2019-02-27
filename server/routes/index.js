const express = require('express');
const router = express.Router();
const riotAPI = require('../riotAPI');

// Given a Summoner name, return data containing summer and match info. Will worry about images later.


router.get('/summoners/:username', async (req, res) => {
  console.log('req user', req.params.username);
  if (!req.params.username) {
    return res.status(403).json({ error: 'Please provide a valid summoner name.' });
  }
  const username = req.params.username;

  const matchDetails = [];

  try {
    const summoner = await riotAPI.getSummonerByName(username);
    const matches = await riotAPI.getMatchesByAccountID(summoner.accountId, 10);

    await asyncForEach(matches, async(match) => {
      const matchData = await riotAPI.getMatchDetailsByID(match.gameId);
      console.log(matchData);
    });

    return res.json({
      summoner: summoner,
      matchDetails: matchDetails
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      error: err.message ? err.message : 'An issue occurred when fetching data. Please try again'
    });
  }
});

//helper
asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = router;