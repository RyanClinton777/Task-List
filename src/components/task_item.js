import React from 'react';
//Import bootstrap elements
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

//This component is used to display individual tasks.
//It displays them on a Card, which itself displays the name as an accordian toggle.
//If it is clicked anywhere, it will expend the accordian, revealing the other details.
//Takes a JSON object called "task" containing the task data
export class TaskItem extends React.Component {
  render() {
    //Define style info for centering things here
    var centerStyle = {display: 'flex', justifyContent: 'center'}

    //Colour = 
    return (
      <div>
        <Card>
          {/* This Accordian element allows us to hide things in a collapsable space, which is revealed when we click anywhere on the item. */}
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div display="inline-block">
              <Card.Text style={centerStyle}><b>{this.props.task.Name}</b></Card.Text>
            </div>
          </Accordion.Toggle>
          {/* These are the elements hidden in the accordian */}
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Card.Text>
                <b>Description:</b> {this.props.task.Description}
              </Card.Text>
              <Card.Text>
                <b>Status:</b> {this.props.task.Status}
              </Card.Text>
              <Card.Text>
                <b>Priority:</b> {this.props.task.Priority}
              </Card.Text>
              <Card.Text>
                <b>Category:</b> {this.props.task.Category.Name}
              </Card.Text>
              <Card.Text>
                <b>Date Added:</b> {this.props.task.Date_Added}
              </Card.Text>
              <Card.Text>
                <b>Deadline:</b> {this.props.task.Date_End}
              </Card.Text>

              <Button variant="primary" href="#"> Mark as Complete </Button>
              <Card.Link href="#">Edit or Delete</Card.Link>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    );
  }
}