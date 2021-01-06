import React from 'react';
import axios from 'axios'; //promise based http client
//Import bootstrap elements
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

//This component is used for creating new tasks
export class Task_Create extends React.Component {

  //Define state variables and call constructor of super class
  constructor() {
    //Call constructor of parent class
    super();

    //Bind our event handler functions to this object
    //Just a weird thing you have to do to prevent errors
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    //this.isSubmitted = false;

    //state is inherited from the Component class, so we don't need to define it
    //Default values on some, date_added is added on submit.
    this.state = {
      Name: "",
      Description: "",
      Priority: "Priority",
      Category: "Errand",
      Status: "Incomplete",
      Date_Added: "",
    };
  }

  //This method is used to update states dynamically whenever a form element is changed.
  //adapted from https://medium.com/@katestamas/dynamically-update-states-in-react-7558287e5fb9
  onChange(event) {
    //Get the "name" attribute of the element that triggered this event
    //We manually set the name attribute on each form, making sure they match the state variable names
    const key = event.target.name;
    //Value from the input
    const value = event.target.value;

    //We use square brackets to insert a computed property in JS
    //Basically this allows us to use a variable to dynamically specify a property, since we don't know which one we are using here.
    //E.g. when the Description field is changed, this will be {Description: value} etc.
    //console.log({ [key]: value });

    //Note setState is asynchronous, must use callback if we need to use state right after it has been changed, or the code will execute before the change has occurred.
    this.setState({ [key]: value });
  }

  //called when the submit button is pressed
  onSubmit(event) {
    //Prevents certain issues, like this method being called multiple times.
    event.preventDefault();

    //Set date added on successful submit
    this.setState({ Date_Added: new Date() }, () => {
      //Do this inside a callback method to ensure that the state-change has occurred.
      const newTask = {
        Name: this.state.Name,
        Description: this.state.Description,
        Priority: this.state.Priority,
        Category: this.state.Category,
        Status: this.state.Status,
        Date_Added: this.state.Date_Added
      }

      //Use axios to send a post request to the URL of our API
      axios.post("http://localhost:4000/api/tasks", newTask)
        .then((res) => {
          alert("Task Added!");
        })
        .catch((err) => {
          alert(err);
        });
    });
  }

  render() {
    return (
      // Surround with a card for easy padding
      <Container>
        <Card>
          <Card.Header>Add new task</Card.Header>
          <Card.Body>
            <Form onSubmit={this.onSubmit}>
              {/* Name */}
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={this.onChange} name="Name" placeholder="Do a thing" />
              <br />
              {/* Description */}
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={this.onChange} name="Description" placeholder="Go to a certain place and do this thing" />
              <br />
              {/* Row with Category and Priority */}
              <Form.Row>
                <Col>
                  <Form.Label>Category</Form.Label>
                  {/* select is the react BS Form class for drop-down menus */}
                  <Form.Control onChange={this.onChange} name="Category" as="select" defaultValue="Errand">
                    <option>Errand</option>
                    <option>Personal</option>
                    <option>Professional</option>
                    <option>Health</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>Priority</Form.Label>
                  <Form.Control onChange={this.onChange} name="Priority" as="select" defaultValue="Errand">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Control>
                </Col>
              </Form.Row>
              <br />
              {/* Submit button */}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}