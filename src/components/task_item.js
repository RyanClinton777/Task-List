import React from 'react';
//Import bootstrap elements
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion"; //Collapsable element that can contain and hide others
import { ButtonGroup, Container } from 'react-bootstrap';
import axios from 'axios'; //promise-based http client


//This component is used to display individual tasks.
//It displays them on a Card, which itself displays the name as an accordian toggle.
//If it is clicked anywhere, it will expend the accordian, revealing the other details.
//Takes a JSON object called "task" containing the task data
export class TaskItem extends React.Component {

  constructor() {
    super();

    this.deleteTask = this.deleteTask.bind(this); //Bind to prevent errors
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
  }

  //Delete button handler
  deleteTask(event) {
    event.preventDefault(); //Prevents certain problems.

    axios.delete("http://localhost:4000/api/task/" + this.props.task._id)
      .then(() => {
        //This is a handle to the reloadData() method in task_view, that has been chained down through tasks.
        this.props.ReloadData();
      })
      .catch((err) => {
        alert(err);
      });
  }

  //Used to quickly Set a task as complete or visa versa
  toggleTaskComplete(event) {
    event.preventDefault();

    //New status value depends on current one. Toggle from Complete to Incomplete etc.
    var newStatus = this.props.task.status == "Complete"? "Incomplete" : "Complete";

    axios.put("http://localhost:4000/api/task/status/" + this.props.task._id, {status: newStatus})
      .then(() => {
        //This is a handle to the reloadData() method in task_view, that has been chained down through tasks.
        this.props.ReloadData();
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    //Define style info for centering things here
    var centerStyle = { display: 'flex', justifyContent: 'center' }

    var borderColour;

    if (this.props.task.status == "Complete") {
      borderColour = "success";
    }
    else if (this.props.task.status == "Incomplete") {
      borderColour = "danger";
    }

    return (
      <Container>
        <Card border={borderColour}>
          {/* This Accordian element allows us to hide things in a collapsable space, which is revealed when we click anywhere on the item. */}
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div display="inline-block">
              <Card.Text style={centerStyle}><b>{this.props.task.name}</b></Card.Text>
            </div>
          </Accordion.Toggle>
          {/* These are the elements hidden in the accordian */}
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Card.Text>
                <b>Description:</b> {this.props.task.description}
              </Card.Text>
              <Card.Text>
                <b>Status:</b> {this.props.task.status}
              </Card.Text>
              <Card.Text>
                <b>Priority:</b> {this.props.task.priority}
              </Card.Text>
              <Card.Text>
                <b>Category:</b> {this.props.task.category}
              </Card.Text>
              <Card.Text>
                <b>Date Added:</b> {this.props.task.date_added}
              </Card.Text>

              {/* Mark as Complete, Edit, and Delete buttons */}
              <ButtonGroup block>
                <Button variant="secondary" onClick={this.toggleTaskComplete} >Toggle Complete</Button>
                <Button href={"/task/edit/" + this.props.task._id}>Edit</Button>
                <Button variant="danger" onClick={this.deleteTask}> Delete </Button>
              </ButtonGroup>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Container>
    );
  }
}