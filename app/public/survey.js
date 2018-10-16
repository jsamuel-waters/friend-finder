$(document).ready(function() {
	// listen for a click on the submit button. When it's clicked, run the callback function
	$(document).on('click', '#submit', function() {
    	function validateForm() {
    		// initialize isValid as true
			var isValid = true;
			// for each .for-control, run the callback function
			$('.form-control').each(function() {
				// if the user did not answer this field, make isValid false
		    	if ($(this).val() === ""){
					isValid = false;
		    	}
			}); // end of .form-control

			// for each .chosen-select, run the callback function
			$('.chosen-select').each(function() {
				// if the user did not answer this question, make isValid false
				if( $(this).val() === "") {
					isValid = false
				}
			});
			// return isValid
			return isValid;
		}

		// if validateForm() returns true (i.e., user filled out all fields/questions)
		if (validateForm()) {
			// grab all of the questions and store them in this array
			var scoresArr = [
					parseInt($('#q1').val().trim()),
					parseInt($('#q2').val().trim()),
					parseInt($('#q3').val().trim()),
					parseInt($('#q4').val().trim()),
					parseInt($('#q5').val().trim()),
					parseInt($('#q6').val().trim()),
					parseInt($('#q7').val().trim()),
					parseInt($('#q8').val().trim()),
					parseInt($('#q9').val().trim()),
					parseInt($('#q10').val().trim())
				];
			// new user's information
			var newUser = {
				name: $('#name').val().trim(), // grab the user's name
				picture: $('#photo').val().trim(), // grab the user's picture
				scores: scoresArr
			};

			// make a post request with the url being the domain name concatenated with the post route and the newUser object
			// when the post request is done, run the callback function 
			$.post(window.location.origin + "/api/friends", newUser).done(function(bestMatch) {
				// display the best match's name and picture in the modal
				$('#matchName').text(bestMatch.name);
				$('#matchImg').attr("src", bestMatch.picture);

				// display the modal
				$('#resultsModal').modal('toggle');
			});
		}
		else {
			// if validateForm() returns false (i.e., there is a field/question that was not answered), display the error modal
			$("#errorModal").modal('toggle');
		}
	});
});