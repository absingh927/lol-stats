import * as React from 'react';
import { Navbar, NavItem, NavbarBrand, Nav } from 'reactstrap';
import Searchform from './SearchForm';
import { withRouter, Link } from 'react-router-dom';

class SearchNav extends React.PureComponent {
  render () {
    return (
      <Navbar color='light' className='sticky-top'>
        <NavbarBrand><Link to='/'>Lol Stats</Link></NavbarBrand>
        <Nav>
          <NavItem>
            <Searchform {...this.props} />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(SearchNav);