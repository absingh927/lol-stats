import * as React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './Search/Search';

class App extends React.PureComponent {
  render() {
    return (
      <Container fluid={true}>
        <Router>
          <Switch>
            <Route exact path='/' component={Search}/>
            <Route exact render={() => <h1>Opps, Page not found!</h1>} />
          </Switch>
        </Router>
        <footer><small>An ap built with React and ExpressJS.</small></footer>
      </Container>
    );
  }
}

export default App;
