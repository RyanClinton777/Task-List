import React from 'react';
import { Tasks } from './tasks'; //Import Tasks component

//export keyword allows us to import the class elsewhere
export class Task_View extends React.Component {

  //Special object used to store data for Components
  //Hard coding in some test data for now
  state = {
    taskData: [
      {
        "Importance ": "Low",
        "Category": "Errand",
        "Description, ": "Pick up milk",
        "Status ": "Incomplete",
        "Date_Added": "",
        "Date_End": "",
      },
      {
        "Importance ": "Medium",
        "Category": "Health",
        "Description, ": "Go to gym",
        "Status ": "Incomplete",
        "Date_Added": "",
        "Date_End": "",
      }
    ]
  }

  render() {
    return (
      <div>
        <h1>View Tasks</h1>
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