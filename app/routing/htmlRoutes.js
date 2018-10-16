'use strict';

// import packages
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// create a connection to the server
var app = express();

// export the get request that runs the callback function when the / route is visited
exports.home = app.get('/', function(req, res) {
	// send /app/public/home.html to the response
	res.sendFile(path.join(__dirname + "/../public", "home.html"));
});

// export the get request that runs when the /survey route is visited
exports.survey = app.get('/survey', function(req, res) {
	// send /app/public/survey.html to the response
	res.sendFile(path.join(__dirname + "/../public", "survey.html"));
});