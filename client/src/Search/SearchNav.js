import * as React from 'react';
import { Navbar, NavItem } from 'reactstrap';
import Searchform from './SearchForm';
import { withRouter } from 'react-router-dom';

class SearchNav extends React.PureComponent {
  render () {
    return (
      <Navbar expand='sm' className='sticky-top'>
        <NavItem>
          <Searchform {...this.props} />
        </NavItem>
      </Navbar>
    );
  }
}

export default withRouter(SearchNav);