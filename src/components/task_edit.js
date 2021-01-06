import React from 'react';
import axios from 'axios'; //promise based http client
//Import bootstrap elements
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';


//This component is used for editing a task
//Mostly copied frmo task_create
export class Task_Edit extends React.Component {

    //Define state variables and call constructor of super class
    constructor() {
        //Call constructor of parent class
        super();

        //Bind our event handler functions to this object
        //Just a weird thing you have to do to prevent errors
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        //Set blank state
        this.state = {
            _id: "",
            Name: "",
            Description: "",
            Priority: "",
            Category: "",
            Status: "",
            Date_Added: "",
        };

    }

    //Get data from database for task in url (id)
    //get from db instead of taking in object to make sure it is up to date
    componentDidMount() {
        //Use axios to send a get the details for this task, passing in the _id from the url
        axios.get("http://localhost:4000/api/task/" + this.props.match.params.id)
            .then((res) => {
                //Set state from data
                this.setState({
                    _id: res.data._id,
                    Name: res.data.name,
                    Description: res.data.description,
                    Priority: res.data.priority,
                    Category: res.data.category,
                    Status: res.data.status,
                    Date_Added: res.data.date_added
                });
            })
            .catch((err) => {
                alert(err);
            });
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

        const updatedTask = {
            name: this.state.Name,
            description: this.state.Description,
            priority: this.state.Priority,
            category: this.state.Category,
            status: this.state.Status,
            date_added: this.state.Date_Added,
            _id: this.state._id
        }

        //Use axios to send a post request to the URL of our API
        //Send the updatedTask in the body of the request in put
        axios.put("http://localhost:4000/api/task/" + this.state._id, updatedTask)
            .then((res) => {
                alert("Task updated");
            })
            .catch((err) => {
                alert(err);
            });
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Header>Edit Task</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit}>
                            {/* These inputs take their values from state, so the initial values will be in them by default. */}
                            {/* Name */}
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.onChange} name="Name" value={this.state.Name} placeholder="Do a thing" />
                            <br />
                            {/* Description */}
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" onChange={this.onChange} name="Description" value={this.state.Description} placeholder="Go to a certain place and do this thing" />
                            <br />
                            {/* Row with Category and Priority */}
                            <Form.Row>
                                <Col>
                                    <Form.Label>Category</Form.Label>
                                    {/* select is the react BS Form class for drop-down menus */}
                                    <Form.Control onChange={this.onChange} name="Category" value={this.state.Category} as="select" defaultValue="Errand">
                                        <option>Errand</option>
                                        <option>Personal</option>
                                        <option>Professional</option>
                                        <option>Health</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control onChange={this.onChange} name="Priority" value={this.state.Priority} as="select" defaultValue="Errand">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Label>Status</Form.Label>
                            {/* select is the react BS Form class for drop-down menus */}
                            {/* Used drop-down instead of checkbox because I initally planned more statuses but it would take too long at this point to go back and change from a string to a boolean everywhere */}
                            <Form.Control onChange={this.onChange} name="Status" value={this.state.Status} as="select" defaultValue="Incomplete">
                                <option>Incomplete</option>
                                <option>Complete</option>
                            </Form.Control>
                            <br />
                            {/* Can't be changed, but show date added */}
                            <Form.Control readOnly name="Date_Added" value={"Date Added -" + this.state.Date_Added} ></Form.Control>
                            <br />
                            {/* Submit button */}
                            <Button variant="primary" type="submit">
                                Update
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container >
        );
    }
}