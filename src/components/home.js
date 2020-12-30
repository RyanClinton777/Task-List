import React from 'react';

//export keyword allows us to import the class elsewhere
export class Home extends React.Component {
  //Component class requires us to implement render method, we us it to return our view
  render() {
    return (
      <div>
        <h1>Task Manager</h1>
        <p>Welcome. This is a productivity web app that allows you to keep track of your tasks.</p>
      </div>
    );
  }
}