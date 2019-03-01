import * as React from 'react';
import { Col, Row } from 'reactstrap'
import  SearchForm from './SearchForm';

export default class Search extends React.PureComponent {
  render () {
    return (
      <Row className='mt-5'>
        <Col>
          <h1 className='display-3'>Welcome to Lol Stats</h1>
          <p>A mini app that allows your to search your favorite North American player's stats.</p>
          <SearchForm {...this.props}/>
        </Col>
      </Row>
    );
  }
}