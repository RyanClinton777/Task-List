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

              <Button variant="primary" href="#"> Toggle Complete </Button>
              <Card.Link href="#">Edit or Delete</Card.Link>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    );
  }
}