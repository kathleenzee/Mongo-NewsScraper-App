// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');
var methodOverride = require('method-override');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Set the port
var PORT = process.env.PORT || 3000;

// Use morgan and body parser with our app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup engine for Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Make public a static dir
app.use(express.static(__dirname + '/public'));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Database configuration with mongoose (Heroku)
mongoose.connect('mongodb://heroku_sthxcl68:i45cl0mvm0tm55atonh355s7mn@ds159050.mlab.com:59050/heroku_sthxcl68');
var db = mongoose.connection;

// // Database configuration with mongoose (Local)
// mongoose.connect("mongodb://localhost/HWmongoose");
// var db = mongoose.connection;

// Show any mongoose errors
db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log('App running on port ' + PORT);
});

// Require routes from controllers
require('./controllers/controllers.js')(app);