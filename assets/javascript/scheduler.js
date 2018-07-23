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

var train = "";
var destination = "";
var firstTrain = "";
// console.log(firstTrain);
var frequency = "";

/*on-click event for the submit button */
$("#submitButton").on("click", function(event){	
	event.preventDefault();

	/*setting variables equal to the value of what is entered in the input fields */
	train = $("#formTrainName").val();
	destination = $("#formDestination").val();
	firstTrain = $("#formFirstTrainTime").val();
	console.log(firstTrain);
	frequency = $("#formFrequency").val();

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
});

function display(childSnapshot){
	console.log(childSnapshot.val());
	var row = $("<tr>");
	row.append("<td>" + childSnapshot.val().trainName + "</td>");
	row.append("<td>" + childSnapshot.val().destinationCity + "</td>");
	row.append("<td>" + childSnapshot.val().firstTrainTime + "</td>");
	row.append("<td>" + childSnapshot.val().frequencyOfTrain + "</td>");

	train = childSnapshot.val().trainName;
	console.log(train);
	destination = childSnapshot.val().destinationCity;
	console.log(destination);
	firstTrain = childSnapshot.val().firstTrainTime;
	console.log(firstTrain);
	frequency = childSnapshot.val().frequencyOfTrain;
	console.log(frequency)
	
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

	row.append("<td>" + next + "</td>");
	row.append("<td>" + minutesAway + "</td>");

	$("#scheduleTrainSchedule").append(row);	

}
//put this in submit button or call display function from within submit button
database.ref().orderByChild("firstTrainTime").on("child_added", display);
// /*when a new "child" is added to the database, the following will execute*/
// database.ref().orderByChild("firstTrainTime").on("child_added", function(childSnapshot){
// 	//order db children/nodes by firsttrain time and then display them in ui. currently is only sorting after child is added to db, no on-click	
// // database.ref().orderByChild("firstTrainTime").on("child_added", function(childSnapshot){
// 		console.log(childSnapshot.val());

// 	//console.log(childSnapshot.val());
// 	train = childSnapshot.val().trainName;
// 	console.log(train);
// 	destination = childSnapshot.val().destinationCity;
// 	firstTrain = childSnapshot.val().firstTrainTime;
// 	frequency = childSnapshot.val().frequencyOfTrain;
	
// 	//calculating the current time using momentjs
// 	var currentTime = moment().format("HH:mm");
// 	//console.log(currentTime);
// 	//rendering the current time on the page
// 	$("#time").html("Current Time: " + moment().format("HH:mm"));

// 	/*calculating minutes till next train and next train time */
//   	var timeDifference = Math.abs((moment(firstTrain, "HH:mm").diff(moment(currentTime, "HH:mm"), "minutes")));
//   	var remainder=timeDifference%frequency;  
//   	var minutesAway = frequency-remainder;
// 	var next = moment(currentTime, "HH:mm").add(minutesAway, "minutes").format("HH:mm");

// 	//displaying all the variables in the html table and prepending the results
// 	$("#scheduleTrainSchedule").prepend("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + minutesAway + "</td></tr>");
// });

// database.ref().orderByChild("firstTrainTime").on("child_added", function(childSnapshot){









//should order by arrival time. and then remove each one whose arrival time has passed
//see recent-user-with-all-users-solved exercise to order by date added to display by most recently added

