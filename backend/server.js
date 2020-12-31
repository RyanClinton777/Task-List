//This is the backend API for our MERN application. It will use Express to handle HTTP requests.
const express = require('express') //Import express
const app = express() //Handle to access express functions
const port = 4000

app.get('/api/tasks', (req, res) => {
    //Some sample data while we test API
    const tasks = [
        {
            "Priority": "Low",
            "Category": "Errand",
            "Name": "Buy milk",
            "Description": "Go to the store and pick up some milk",
            "Status": "Incomplete",
            "Date_Added": "",
        },
        {
            "Priority": "Medium",
            "Category": "Health",
            "Name": "Go to gym",
            "Description": "Go to the gym and pick something up, then put it down again and leave",
            "Status": "Incomplete",
            "Date_Added": "",
        }
    ]

    //Send back this data in a JSON object called tasks
    res.json({tasks: tasks});
})

//Listen on port 4000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

