import React from 'react';
import { TaskItem } from './task_item';
import Accordion from "react-bootstrap/Accordion"; //Import Accordian element to surround the task_items

//This component itemizes the given collection of tasks. Where tasks should be displayed, this component will be loaded, 
//and here we load the given task data (inputTasks) into individual task_item components
//It also wraps the items in an accordian bootstrap element, so we can only display the names and click them to expand details.
export class Tasks extends React.Component {
  render() {
    //We use the map() function to loop through a collection of data, and we do the logic in an arrow/anonymous function
    //the task variable is the arg to this method, and it holds the current item in the collection while it loops through it
    //Basically a foreach loop
    return this.props.inputTasks.map((currentTask) => {
      //Surrounded in an Accordian, a card for each object
      return <div class="center">
        <Accordion>
          {/* Get a Task_Item component, pass in the current task object. */}
          <TaskItem task={currentTask} ReloadData={this.props.ReloadData}></TaskItem>
        </Accordion>
      </div>
    });
  }
}