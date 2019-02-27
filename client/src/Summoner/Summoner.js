import * as React from 'react';
import SearchNav from '../Search/SearchNav';
import { findUser } from './SummonerService';

export default class Summoner extends React.Component {
  state = {
    summoner: null,
    matches: null,
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
      matches: null, 
      isLoading: true 
    });

    this.getSummonerData(newProps.match.params.summonerName);
  }

  async getSummonerData(username) {
    try {
      const data = await findUser(username);
      this.setState({
        summoner: data.summoner,
        matches: data.matches,
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
      console.log(this.props.match.params.summonerName);
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
        <div className='summoner-info'>
          <div>{this.state.summoner.name}</div>
          <div>{this.state.summoner.summonerLevel}</div>
        </div>
      </>
    );

  }
}