const mongoose = require('mongoose');

mongoose.set('debug', true);    //to log out every transaction in the database
mongoose.Promise = global.Promise;  //allows us to use promises with mongoose allowing us to use async javascript through code
mongoose.connect('mongodb://localhost/vote',
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
); //connecting to database

// module.exports.User = require('./user');
// module.exports.Poll = require('./poll');