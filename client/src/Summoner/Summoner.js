import * as React from 'react';
import SearchNav from '../Search/SearchNav';
import { findUser } from './SummonerService';
import MatchResultsComponent from './MatchResultsComponent';

export default class Summoner extends React.Component {
  state = {
    summoner: null,
    matchDetails: null,
    isLoading: true
  }

  componentDidMount() {
    this.getSummonerData(this.props.match.params.summonerName);
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillReceiveProps(newProps) {
    this.setState({ 
      summoner: null, 
      matchDetails: null, 
      isLoading: true 
    });

    this.getSummonerData(newProps.match.params.summonerName);
  }

  async getSummonerData(username) {
    try {
      const data = await findUser(username);
      this.setState({
        summoner: data.summoner,
        matchDetails: data.matchDetails,
        isLoading: false
      });

    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <SearchNav {...this.props} />
          <div className='text-center m-5'>Loading.....</div>
        </>
      );
    } else if (!this.state.summoner) {
      return (
        <>
          <SearchNav {...this.props} />
          <h1>Summoner not found.</h1>
          <p>We currently only support North American summoners.</p>
        </>
      );
    }

    return (
      <>
        <SearchNav {...this.props} />
        <div className='summoner-info mt-5'>
          <h1>{this.state.summoner.name}</h1>
        </div>
        {this.state.matchDetails.length > 0 && (
          <div className='summoner-history'>
              {this.state.matchDetails.map(match => 
                <MatchResultsComponent
                  key={match.gameId}
                  summoner={this.state.summoner}
                  {...match}
                />
              )}
          </div>
        )}
        {this.state.matchDetails.length === 0 && (
          <div className='no-results'>
            <h4>No recent matches.</h4>
          </div>
        )}
      </>
    );
  }
}