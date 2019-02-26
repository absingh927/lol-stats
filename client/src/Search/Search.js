import * as React from 'react';
import { Jumbotron } from 'reactstrap'
import  SearchForm from './SearchForm';

export default class Search extends React.PureComponent {
  render () {
    return (
      <Jumbotron>
        <h1 className='display-1'>Welcome to Lol Stats</h1>
        <p>A min app that allows your to search your favorite North American player's stats.</p>
        <SearchForm {...this.props}/>
      </Jumbotron>
    );
  }
}