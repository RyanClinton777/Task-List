import { Component } from 'react'; //Import react Component class
import 'bootstrap/dist/css/bootstrap.min.css'; //react-bootstrap stylesheet
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; //Router for navigation
//Component imports
import { Home } from './components/home';
import { Task_View } from './components/task_view';
import { Task_Create } from './components/task_create';
import { Task_Edit } from './components/task_edit';

//The main page for our single page app. Just contains a navbar and routing info
class App extends Component {
  render() {
    return (
      //NAVIGATION BAR FROM REACT BOOTSTRAP
      <Router>
        <div className="App">
          {/* Navbar */}
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Task Manager</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Tasks">View Tasks</Nav.Link>
              <Nav.Link href="/Tasks/Add">Add Task</Nav.Link>
            </Nav>
          </Navbar>
          {/* Routing */}
          <Switch>
            {/* "exact" keyword stops urls with the same beginning from conflicting, i.e. without exact /Tasks would be triggered for /Tasks/Add etc. */}
            <Route path='/' component={Home} exact ></Route>
            <Route path='/Tasks' component={Task_View} exact></Route>
            <Route path='/Tasks/Add' component={Task_Create} ></Route>
            <Route path='/Task/Edit/:id' component={Task_Edit} ></Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
