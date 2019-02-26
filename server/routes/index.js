const express = require('express');
const router = express.Router();
const riotAPI = require('../riotAPI');

// Given a Summoner name, return data containing summer and match info. Will worry about images later.


router.get('./summoner/:username', async (req, res) => {
  if (!req.params.username) {
    return res.status(403).json({ error: 'Please provide a summoner name.' });
  }

  const username = req.params.username;

  try {
    const summoner = await riotAPI.getSummonerByName(username);
    console.log(summoner)

    return res.json({
      summoner: summoner
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      error: err.message ? err.message : 'An issue occurred when fetching data. Please try again'
    });
  }
});

module.exports = router;