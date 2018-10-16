'use strict';

// import npm packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// create the server
var app = express();

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static(__dirname + "/app/public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// import the get/post requests
var htmlRoutes = require('./app/routing/htmlRoutes.js');
var apiRoutes = require('./app/routing/apiRoutes.js');

// use the get requests
app.use('/', htmlRoutes.home);
app.use('/', htmlRoutes.survey);

// use the get/post requests
app.use('/', apiRoutes.getFriends);
app.use('/', apiRoutes.postFriends);

// start the server
// process.env.PORT allows the app to be pushed to heroku
app.listen(process.env.PORT || 5000, function() {
	console.log("Server is listening!");
});