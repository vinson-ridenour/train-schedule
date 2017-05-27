// Document ready

$(document).ready(function() { // all your jQuery code executed in here  

	// alert ("Your js is working!");

// Initialize firebase

	var config = {
	    apiKey: "AIzaSyAnh2fHURsGyTFwUTUqDxtRUwhmTfYxnGk",
	    authDomain: "train-schedule-74bd8.firebaseapp.com",
	    databaseURL: "https://train-schedule-74bd8.firebaseio.com",
	    projectId: "train-schedule-74bd8",
	    storageBucket: "train-schedule-74bd8.appspot.com",
	    messagingSenderId: "935587429217"
	};

	firebase.initializeApp(config);

	var database = firebase.database();


	// Button for adding a train to the database based on user input

	$('#add-train-button').on('click', function(event) { 
		event.preventDefault();

		// Captures user input

		var trainName = $('#train-name-input').val().trim();
		var destinationName = $('#destination-input').val().trim();
		var firstTrain = $('#first-train-input').val().trim();
		var frequency = $('#frequency-input').val().trim();

		// console.log(frequency);
		var newTrain = {
			"train": trainName,
			"destination": destinationName,
			"first": firstTrain,
			"frequency": frequency
		};

		database.ref().push(newTrain);

		// Logs everything to console

		console.log(newTrain.train);
		console.log(newTrain.destination);
		console.log(newTrain.first);
		console.log(newTrain.frequency);

		// Alert

		// alert('Train successfully added');

		// Clears all of the input boxes

		$('#train-name-input').val("");
		$('#destination-input').val("");
		$('#first-train-input').val("");
		$('#frequency-input').val("");

	}); // end on-click function

  	// Function that will retrieve the user input from the database on the added train

	database.ref().on('child_added', function(trainSnapshot, trainKey) {
		console.log(trainSnapshot.val());

		var trainName = trainSnapshot.val().train;
	  	var destinationName = trainSnapshot.val().destination;
	  	var firstTrain = trainSnapshot.val().first;
	  	var frequency = trainSnapshot.val().frequency;
	  	
	  	console.log(trainName);
	  	console.log(destinationName); 
	  	console.log(firstTrain); // user entered 15:00
	  	console.log(frequency); // user entered 45

	  	var minFrequency = frequency; // 45
	  	var initialTrain = firstTrain; // 15:00

	  	var now = moment();
	  	var timeDiff = now.diff(moment(initialTrain, 'hh:mm'), 'minutes');
	  	console.log(timeDiff);

	  	var minRemaining = timeDiff % frequency;
	  	console.log(minRemaining); // 
	  	var minTilNextTrain = frequency - minRemaining;
	  	console.log(minTilNextTrain); // 
	  	var nextArrivalTime = moment().add(minTilNextTrain, 'minutes');
	  	var nextArrivalTimeFormatted = moment(nextArrivalTime).format('hh:mm A'); //

	  	$('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + destinationName + '</td><td>' +
  		frequency + '</td><td>' + nextArrivalTimeFormatted + '</td><td>' + minTilNextTrain + '</td></tr>');

	}); // end child_added
}); // end of document ready
