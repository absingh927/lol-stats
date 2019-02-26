import * as React from 'react';
import SearchForm from '../Search/SearchForm';

export default class Summoner extends React.PureComponent {
  state = {
    summoner: null,
    matches: null,
    isLoading: true
  }

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <SearchForm {...this.props} />
          <h2>Loading</h2>
        </>
      );
    } 
  }
}