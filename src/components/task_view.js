import React from 'react';
import { Tasks } from './tasks'; //Import Tasks component

//This component is a page that displays a list of tasks (with the "tasks.js" component).
export class Task_View extends React.Component {

  //Special object used to store data for Components
  //Hard coding in some test data for now
  state = {
    taskData: [
      {
        "Priority": "Low",
        "Category": {"Name": "Errand"},
        "Name": "Buy milk",
        "Description": "Go to the store and pick up some milk",
        "Status": "Incomplete",
        "Date_Added": "",
        "Date_End": "",
      },
      {
        "Priority": "Medium",
        "Category": {"Name": "Health"},
        "Name": "Go to gym",
        "Description": "Go to the gym and pick something up, then put it down again and leave",
        "Status": "Incomplete",
        "Date_Added": "",
        "Date_End": "",
      }
    ]
  }

  render() {
    //Using react style to apply CSS
    return (
      <div text-align="center">
        <h1 style={{display: 'flex', justifyContent: 'center'}}>View Tasks</h1>
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