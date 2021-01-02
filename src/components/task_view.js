import React from 'react';
import { Tasks } from './tasks'; //Import our Tasks component
//axios allows us to perform HTTP requests asynchronously
  //Returns a promise, which we handle in .then() and .catch()
import axios from 'axios'; //Promise-based HTTP client

//This component is a page that displays a list of tasks (with the "tasks.js" component).
export class Task_View extends React.Component {

  //Special object used to store data for Components
  //Hard coding in some test data for now
  state = {
    //Array to hold our tasks
    taskData: []
  }

  //Lifecycle hook - Gets called every time the component is loaded
  componentDidMount() {
    //Try to get our task data
    axios.get("http://localhost:4000/api/tasks")
      .then((res) => {
        //put the data from the response into our array in state
        //(Server returns a JSON array called tasks)
        console.log(`SERVER DATA: ${res.data.tasks}`);
        this.setState({ taskData: res.data.tasks });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    //Using react style to apply CSS
    return (
      <div text-align="center">
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>View Tasks</h1>
        {/* This is JSX code, HTML with JS inside {}
        Here we are displaying the tasks component
        We create and pass in an object that will hold data, in this case I called it inputTasks
        We then use JSC to put the data from the state of this component, into that object. 
        Now the tasks component can access this data, through its props (this.props.inputTasks) */}
        <Tasks inputTasks={this.state.taskData}></Tasks>
      </div>
    );
  }
}