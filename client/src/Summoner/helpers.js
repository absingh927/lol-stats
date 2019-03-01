export const getParticipantID = (accountId, participantIdentities) => {
  const participant = participantIdentities.find(identity => identity.player.accountId === accountId);

  if (participant) {
    return participant.participantId;
  }
  return null;
}

export const getPlayer = (playerId, participants) => {
  return participants.find(p => p.participantId === playerId);
}

export const getTeamIdForPlayer = (playerId, participants) => {
  const player = participants.find(p => p.participantId === playerId);

  if (player) { 
    return player.teamId 
  }

  return null;
}

export const getTeam = (teams, teamId) => {
  return teams.find(team => team.teamId === teamId) || null;
}

export const getMatchResult = (teams, playerId, participants) => {
  const playerTeamId = getTeamIdForPlayer(playerId, participants);
  const team = getTeam(teams,playerTeamId);

  if (team.win === 'Win') {
    return 'Victory';
  } else {
    return 'Defeat';
  }
}