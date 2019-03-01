import * as React from 'react';
import { getParticipantID, getPlayer, getMatchResult } from './helpers';
import * as moment from 'moment';
import { Row } from 'reactstrap';

export default class MatchResultsComponent extends React.PureComponent {

  getMatchDuration = (seconds) => {
    const duration = moment.duration(seconds);
    let time = '';

    if (duration.hours()) {
      time += duration.hours() + 'h ';
    }
    if (duration.minutes()) {
      time += duration.minutes() + 'm ';
    }
    if (duration.seconds()) {
      time += duration.seconds() + 'h ';
    }
    return time;
  }

  render () {
    const playerId = getParticipantID(this.props.summoner.accountId, this.props.participantIdentities);
    const player = getPlayer(playerId, this.props.participants);
    const matchResult = getMatchResult(this.props.teams, player.participantId, this.props.participants);
    const stats = player.stats;

    return (
      <Row className='results-container'>
        <div>{this.props.champion.name}</div>
        <div>Level {stats.champLevel}</div>
        <div>{matchResult}</div>
        <div>{this.getMatchDuration(this.props.gameDuration)}</div>
        <div>{stats.kills}/{stats.deaths}/{Math.round((parseFloat(stats.kills + stats.assists) / parseFloat(stats.deaths)) * 100) / 100}:1 KDA</div>

        <span title={`minion ${stats.totalMinionsKilled} + monster ${stats.neutralMinionsKilled}`}>{stats.totalMinionsKilled + stats.neutralMinionsKilled} ({Math.round(parseFloat(stats.totalMinionsKilled + stats.neutralMinionsKilled) / (parseFloat(this.props.gameDuration) / 60) * 10) / 10}) CS
        </span>

        {this.props.items.map((item, index) => item && (
          <div key={index}>{item.name}</div>
        ))}
      </Row>
    );
  }
}