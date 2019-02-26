import * as React from 'react';
import { NavBar, NavItem } from 'reactstrap';
import Searchform from './SearchForm';
import { withRouter } from 'react-router-dom';

class SearchNav extends React.PureComponent {
  render () {
    return (
      <NavBar expand='sm' className='sticky-top'>
        <NavItem>
          <Searchform {...this.props} />
        </NavItem>
      </NavBar>
    );
  }
}

export default withRouter(SearchNav);