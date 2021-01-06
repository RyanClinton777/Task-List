//This is the backend API for our MERN application. It will use Express to handle HTTP requests.
const express = require('express') //Import express
const app = express() //Handle to access express functions
const port = 4000
const cors = require('cors'); //Cross-Origin Resource Sharing - To allow requests from the client, which is effectively another domain
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); //For connecting to our MONGODB db

//---body parser code
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

//---cors prevention code - permission to make cross platform requests
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//DB Connection
//DB
//mongodb+srv://user_TL:<password>@cluster-tl.0ejok.mongodb.net/<dbname>?retryWrites=true&w=majority
//user_TL
//Pass_TL159
//Note: Was getting Error: querySrv EREFUSED when trying to use modern connection string, this is 2.2.12 or later string.
const connectString = 'mongodb://user_TL:Pass_TL159@cluster-tl-shard-00-00.0ejok.mongodb.net:27017,cluster-tl-shard-00-01.0ejok.mongodb.net:27017,cluster-tl-shard-00-02.0ejok.mongodb.net:27017/tasks?ssl=true&replicaSet=atlas-13tctz-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectString, { useNewUrlParser: true })
    .then((res) => {
        console.log("Connection Sucessful.");
    })
    .catch((err) => {
        console.log("ERROR CONNECTING TO DB:\n" + err.message)
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//Schema
//Mongo DB doesn't have strict schemas, but we can use mongoose to enforce one.
const taskSchema = mongoose.Schema({
    name: String,
    description: String,
    priority: String,
    category: String,
    status: String,
    date_added: { type: Date, default: Date.now }
});

//Database Model
//first arg is collection name on db, second is our schema.
var taskModel = mongoose.model("tasks", taskSchema);

//View all incompleted tasks
app.get('/api/tasks', (req, res) => {
    //Use find method to get all documents from this model/collection
    taskModel.find()
        .then((data) => {
            //send response with data as JSON
            console.log("DATA: " + data);
            res.json(data);
        })
        .catch((error) => {
            res.send("ERROR GETTING TASKS:\n" + err.message)
        });
});


//View all completed tasks
app.get('/api/tasks/Completed', (req, res) => {
    //Use find method to get all documents from this model/collection
    taskModel.find({ status: "Complete" })
        .then((data) => {
            //send response with data as JSON
            console.log("Completed tasks: " + data);
            res.json(data);
        })
        .catch((error) => {
            res.send("ERROR GETTING TASKS:\n" + err.message);
        });
});

//View a specific task (by id)
app.get('/api/task/:id', (req, res) => {
    console.log("ATTEMPT FIND BY ID: " + req.params.id);

    //Use find method to get all documents from this model/collection
    taskModel.findById(req.params.id)
        .then((data) => {
            //send response with data as JSON
            res.json(data);
        })
        .catch((error) => {
            res.send("ERROR GETTING TASKS:\n" + err.message)
        });
});

//Update (replace) specific task (given of _id)
app.put('/api/task/:id', (req, res) => {
    //{new:true} returns the doc after it has been updated
    taskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {new:true})
        .then((data) => {
            console.log("---Replace DATA: " + data);
            console.log("---DATA: " + JSON.stringify(data));
            res.send(data);
        })
        .catch((error) => {
            console.log("---ERROR UPDATING: " + error);
        });
});

//add task
app.post("/api/tasks", (req, res) => {
    //Use create method to create a new document in our DB through the model
    taskModel.create({
        name: req.body.Name,
        description: req.body.Description,
        priority: req.body.Priority,
        category: req.body.Category,
        status: req.body.Status,
        date_added: req.body.Date_Added
    })
        .then((res) => {
            console.log("Added task: [" + req.body.Name + "]");
        })
        .catch((err) => {
            res.send("ERROR ADDING TASK:\n" + err.message)
        });
});

//Listen on port 4000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

