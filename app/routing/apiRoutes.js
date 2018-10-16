'use strict';

// import packages
var express = require('express');
var bodyParser = require('body-parser');

// import 
var friendsData = require('../data/friends.js');

// create a connection to the server
var app = express();

// export the get request that runs the callback function when /api/friends is visited
exports.getFriends = app.get('/api/friends', function(req, res) {
	// display the friends json on the page
	res.json(friendsData.friends);
});

// export the get request that runs the callback function when /api/friends is visited
exports.postFriends = app.post('/api/friends', function(req, res) {
	// assign the body of the request to newUser
	var newUser = req.body;

	// start off with a lowest score being 0 and the best match being the first friend in the array
	var lowScore = 0;
	var bestMatch = 0;

	// loop through the first friend's scores to set an inital lowest score
	for (var j = 0; j < friendsData.friends[0].scores.length; j++) {
		lowScore += Math.abs(newUser.scores[j] - friendsData.friends[0].scores[j]);
	}

	// loop through the rest of the friends to check to see if any of them have a lower score (i.e., is a better match)
	for (var i = 1; i < friendsData.friends.length; i++) {
		var sum = 0;
		for (var j = 0; j < friendsData.friends[i].scores.length; j++) {
			sum += Math.abs(newUser.scores[j] - friendsData.friends[i].scores[j]);
		} // end of for j < friendsData.friends[i].scores.length

		// if the sum of the differences in scores is lower than the current low score, then assign the sum to lowScore
		if (lowScore > sum) {
			lowScore = sum;
			bestMatch = i;
		}
	} // end of for i < friendsData.friends.length

	// add the new user to the friends array
	friendsData.friends.push(newUser);

	// return the best match to the where the post request is made
	res.send(friendsData.friends[bestMatch]);
});