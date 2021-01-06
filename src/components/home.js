import React from 'react';
import { Card, Container, Jumbotron } from 'react-bootstrap';

//export keyword allows us to import the class elsewhere
export class Home extends React.Component {
  //Component class requires us to implement render method, we us it to return our view
  render() {
    return (
      <Container>
        <Jumbotron>
          <h1 style={{ display: 'flex', justifyContent: 'center' }}>
            Task Manager
        </h1>

          <p style={{ display: 'flex', justifyContent: 'center' }}>
            Welcome. This is a productivity web app that allows you to keep track of your tasks.
          </p>
        </Jumbotron>
      </Container>
    );
  }
}