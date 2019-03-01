import * as React from 'react';
import { getParticipantID, getPlayer, getMatchResult } from './helpers';
import * as moment from 'moment';
import { Row, Card, CardBody } from 'reactstrap';
import './matchResults.css';

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

  getChampionImg = (champion) => {
    return `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champion}`;
  }

  render () {
    const playerId = getParticipantID(this.props.summoner.accountId, this.props.participantIdentities);
    const player = getPlayer(playerId, this.props.participants);
    const matchResult = getMatchResult(this.props.teams, player.participantId, this.props.participants);
    const stats = player.stats;

    return (
      <Row className='results-container mb-3'>
        <Card className='w-100'>
          <CardBody className={`d-flex justify-content-around ${matchResult === 'Victory' ? 'success' : 'loss'}`}>
            <div className='results-stats-time'>
              <div>{moment(this.props.gameCreation).fromNow()}</div>
              <hr/>
              <div>{matchResult}</div>
              <div>{this.getMatchDuration(this.props.gameDuration)}</div>
            </div>
            <div className='results-stats-champion'>
              <img alt={this.props.champion.name} src={this.getChampionImg(this.props.champion.image.full)}/>
              <div>{this.props.champion.name}</div> 
              <div className='font-weight-bold'>{stats.kills}/{stats.deaths}/{Math.round((parseFloat(stats.kills + stats.assists) / parseFloat(stats.deaths)) * 100) / 100}:1 KDA</div>
            </div>
            <div className='results-stats-items d-flex'>
              <div className='cols mr-2'>
                {this.props.items.slice(0,4).map((item, index) => item && <div key={index}>{item.name}</div>)}
              </div>
              <div className='cols ml-2'>
                {this.props.items.slice(4).map((item, index) => item && <div key={index}>{item.name}</div>)}
              </div>
            </div>
          </CardBody>
        </Card>
      </Row>
    );
  }
}