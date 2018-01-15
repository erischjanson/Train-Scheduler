
  var config = {
    apiKey: "AIzaSyBFa95cQyPmC3muTiVEzQVfb_Qme6zupb4",
    authDomain: "train-a0de9.firebaseapp.com",
    databaseURL: "https://train-a0de9.firebaseio.com",
    projectId: "train-a0de9",
    storageBucket: "",
    messagingSenderId: "688298807206"
  };

  firebase.initializeApp(config);

var database=firebase.database();

//database.ref().once("value", function(data) {




//});

database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());
	var train = childSnapshot.val().trainName;
	console.log(train);
	var destination = childSnapshot.val().destinationCity;
	var firstTrain = childSnapshot.val().firstTrainTime;
	var frequency = childSnapshot.val().frequencyOfTrain;

	//var timeDiff=moment().diff(moment().unix(firstTrain), "minutes");
	//console.log(moment().unix());
	//console.log(timeDiff);
	console.log(firstTrain);
	console.log(moment.unix)

var currentTime = moment().format("HH:mm");
console.log(currentTime);
$("#time").html("Current Time: " + moment().format("HH:mm"));

	console.log(firstTrain);
	console.log(firstTrain, moment().format(("HH:mm")));
  var timeDifference = Math.abs((moment(firstTrain, "HH:mm").diff(moment(currentTime, "HH:mm"), "minutes")));
  console.log(timeDifference);
  console.log(frequency);
  var remainder=timeDifference%frequency;
  console.log(remainder);
  var minutesAway = frequency-remainder;
  console.log(minutesAway);
  // moment(currentTime, "HH:mm")

console.log(moment(currentTime, "HH:mm").add(5, "minutes").format("HH:mm"));
var next = moment(currentTime, "HH:mm").add(minutesAway, "minutes").format("HH:mm");
console.log(next);



	//replace text of html element
	$("#scheduleTrainSchedule").prepend("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + minutesAway + "</td></tr>");
})


$("#submitButton").on("click", function(event){
	
	event.preventDefault();
	//will need to creat an array to hold all trains, etc
	//use a table in html for the schedule

	var train = $("#formTrainName").val();
	var destination = $("#formDestination").val();
	var firstTrain = $("#formFirstTrainTime").val();
	var frequency = $("#formFrequency").val();

	//add date timestamp
	//console.log(train);
	//console.log(destination);
	//database.ref().set({
		//trainName: train,
		//destinationCity: destination

	//});
	//should i be defining the below object ABOVE the push function?
	database.ref().push({
		trainName:train,
		destinationCity:destination,
		firstTrainTime:firstTrain,
		frequencyOfTrain:frequency


	});
$("#formTrainName").val("");
$("#formDestination").val("");
$("#formFirstTrainTime").val("");
$("#formFrequency").val("");




})


//should order by arrival time. and then remove each one whose arrival time has passed
//see recent-user-with-all-users-solved exercise to order by date added to display by most recently added