import { Component } from 'react'; //Import react Component class
import 'bootstrap/dist/css/bootstrap.min.css'; //react-bootstrap stylesheet
import {Navbar, Nav }from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; //Router for navigation
//Component imports
import { Home } from './components/home';

class App extends Component {
  render() {
    return (
      //NAVIGATION BAR FROM REACT BOOTSTRAP
      <Router>
        <div className="App">
          {/* Navbar */}
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar>
          {/* Routing */}
          <Switch>
            <Route path='/' component={Home} exact ></Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
