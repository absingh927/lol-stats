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
    const matches = await riotAPI.getMatchesByAccountID(summoner.accountId, 2);

    await asyncForEach(matches, async(match) => {
      const matchData = await riotAPI.getMatchDetailsByID(match.gameId);

      // Summoner participantID
      const playerIndentifier = matchData.participantIdentities.find(pl => pl.player.accountId === summoner.accountId);
      const player = matchData.participants.find(pl => pl.participantId === playerIndentifier.participantId);

      // spells
      // const allSpells = riotAPI.getSpells();
      // const spell1 = allSpells[participant.spell1Id];
      // const spell2 = allSpells[participant.spell2Id];

      // runes/perks
      // champion name
      const allChamps = riotAPI.getChampions();
      const champion = allChamps[player.championId];

      // items bought
      const allItems = riotAPI.getItems();
      const items = [];
      items.push(allItems[player.stats.item0]);
      items.push(allItems[player.stats.item1]);
      items.push(allItems[player.stats.item2]);
      items.push(allItems[player.stats.item3]);
      items.push(allItems[player.stats.item4]);
      items.push(allItems[player.stats.item5]);
      items.push(allItems[player.stats.item6]);

      // all data to matchdetails.
      matchDetails.push({
        champion,
        items,
        ...matchData,
      });
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