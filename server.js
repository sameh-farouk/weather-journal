// Setup empty JS object to act as endpoint for all routes
projectData = {};
projectData.entries = [];
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
require('cors');
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
// routing
app.get('/latest', (req, res) => {
    res.send(JSON.stringify(projectData.entries[projectData.entries.length - 1]));
  });
app.post('/add', (req, res) => {
    projectData.entries.push(req.body);
    res.end();
});
// start server
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});