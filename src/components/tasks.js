import React from 'react';

//export keyword allows us to import the class elsewhere
export class Tasks extends React.Component {
  render() {
    console.log(this.props.inputTasks);
    return (
      <div>
        <h1>Tasks</h1>
      </div>
    );
  }
}