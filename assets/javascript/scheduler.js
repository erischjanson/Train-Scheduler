
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

	console.log(firstTrain);
	console.log(firstTrain, moment().format(("HH:mm")));
  var timeDifference = Math.abs((moment(firstTrain, "HH:mm").diff(moment(currentTime, "HH:mm"), "minutes")));
  console.log(timeDifference);
  console.log(frequency);
  var remainder=timeDifference%frequency;
  console.log(remainder);
  var minutesAway = frequency-remainder;
  console.log(minutesAway);

  //the difference between the time of first train and current time will need to be used with frequency. 
  //minutes remaining divided by frequency. the remainder should be subtracted from the frequency to get the "arriving in". add this number to current time for next arrival.
  //e.g. if first train is 1300 and current time is 1713 and frequency is 50, minutes of diff=253;
  //50 into 253 five times with remainder of 3. 50-3=47. train arrives in 47 mins. 47+1713=1800, which is next train.

//var firstTrainConverted = moment().format(firstTrain, "hh:mm");

//console.log(firstTrainConverted);
//var currentTime = moment().format("hh:mm");
//console.log(currentTime);
//var diffTime = moment(firstTrainConverted).diff(currentTime, "minutes");
//var diffTime=moment(firstTrain).diff(moment(), "minutes");
//console.log(diffTime);


//console.log(moment(firstTrainConverted).diff(moment(currentTime), "minutes"));




//console.log(moment(currentTime).format("HH:mm"));
//var timeDifference = currentTime.diff(firstTrain, "minutes");
//console.log(timeDifference);
//var otherTime = moment("11:00", "HH:mm");
//console.log(moment(currentTime).format("HH:mm"));
//console.log(currentTime.diff(otherTime, "minutes"));


	//replace text of html element
	$("#scheduleTrainSchedule").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td></tr>");
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
		console.log(train);
		console.log(destination);


})

//see recent-user-with-all-users-solved exercise to order by date added to display by most recently added