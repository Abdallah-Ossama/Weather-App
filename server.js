// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//setup bodyParser
const bodyParser = require("body-parser");


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('website'));

// Setup Server

const sendData = (req,res) => {
  res.status(200).send(projectData).end();
};

app.get("/allDate",sendData);

app.post("/addDate", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
});
const port = 5000 || process.env.PORT;

const listening = () => {
console.log(`Listening on port: ${port}...`);
}
app.listen(port, listening);