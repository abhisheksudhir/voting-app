require('dotenv').config(); //to create private variables
const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose'); // to connect to mongo db database
// const bodyParser = require('body-parser'); included in express.json

const db = require('./models');
const handle = require('./handlers');

//creating express server
const app = express();  //app is an instance of express
const port =  process.env.PORT || 5000;

app.use(cors());    //cors is express middleware
app.use(express.json());    //to parse json

app.get('/', (req, res) => res.json({hello: 'world'}));

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`Server listening on port ${port}`));