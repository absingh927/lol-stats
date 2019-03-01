import * as React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './Search/Search';
import Summoner from './Summoner/Summoner';

class App extends React.PureComponent {
  render() {
    return (
      <Container fluid={true} className='text-center p-0'>
        <Router>
          <Switch>
            <Route exact path='/' component={Search}/>
            <Route path='/summoner/:summonerName' component={Summoner} />
            <Route exact render={() => <h1>Opps, Page not found!</h1>} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
