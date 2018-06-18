/*firebase settings and intialization */
var config = {
apiKey: "AIzaSyBFa95cQyPmC3muTiVEzQVfb_Qme6zupb4",
authDomain: "train-a0de9.firebaseapp.com",
databaseURL: "https://train-a0de9.firebaseio.com",
projectId: "train-a0de9",
storageBucket: "",
messagingSenderId: "688298807206"
};

firebase.initializeApp(config);

//setting the firebase db to variable for ease of reference
var database=firebase.database();
/*when a new "child" is added to the database, the following will execute*/
database.ref().on("child_added", function(childSnapshot){
	//console.log(childSnapshot.val());
	var train = childSnapshot.val().trainName;
	//console.log(train);
	var destination = childSnapshot.val().destinationCity;
	var firstTrain = childSnapshot.val().firstTrainTime;
	var frequency = childSnapshot.val().frequencyOfTrain;
	
	//calculating the current time using momentjs
	var currentTime = moment().format("HH:mm");
	//console.log(currentTime);
	//rendering the current time on the page
	$("#time").html("Current Time: " + moment().format("HH:mm"));

	/*calculating minutes till next train and next train time */
  	var timeDifference = Math.abs((moment(firstTrain, "HH:mm").diff(moment(currentTime, "HH:mm"), "minutes")));
  	var remainder=timeDifference%frequency;  
  	var minutesAway = frequency-remainder;
	var next = moment(currentTime, "HH:mm").add(minutesAway, "minutes").format("HH:mm");


	//displaying all the variables in the html table and prepending the results
	$("#scheduleTrainSchedule").prepend("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + minutesAway + "</td></tr>");
});

database.ref().orderByChild("firstTrainTime").on("child_added", function(snapshot) {
	console.log(snapshot.val().firstTrainTime);

	// Change the HTML to reflect
	$("#formTrainName").text(snapshot.val().trainName);
	$("#formDestination").text(snapshot.val().destinationCity);
	$("#formFirstTrainTime").text(snapshot.val().firstTrainTime);
	$("#formFrequency").text(snapshot.val().frequencyOfTrain);
  });

/*on-click event for the submit button */
$("#submitButton").on("click", function(event){	
	event.preventDefault();

	/*setting variables equal to the value of what is entered in the input fields */
	var train = $("#formTrainName").val();
	var destination = $("#formDestination").val();
	var firstTrain = $("#formFirstTrainTime").val();
	console.log(firstTrain);
	var frequency = $("#formFrequency").val();

	/*pushing the variable values to the firebase database and naming them as they will appear in the db */
	database.ref().push({
		trainName:train,
		destinationCity:destination,
		firstTrainTime:firstTrain,
		frequencyOfTrain:frequency
	});

/* empties out the input fields after "submit" is clicked*/	
$("#formTrainName").val("");
$("#formDestination").val("");
$("#formFirstTrainTime").val("");
$("#formFrequency").val("");
})




//should order by arrival time. and then remove each one whose arrival time has passed
//see recent-user-with-all-users-solved exercise to order by date added to display by most recently added

