
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

database.ref().on("value", function(snapshot){
	//console.log(snapshot.val());
	train = snapshot.val().trainName;
	console.log(train);
	destination = snapshot.val().destinationCity;
	//replace text of html element
})


$("#submitButton").on("click", function(event){
	
	event.preventDefault();
	//will need to creat an array to hold all trains, etc
	//use a table in html for the schedule

	var train = $("#formTrainName").val();
	var destination = $("#formDestination").val();
	var firstTrain = $("#formFirstTrainTime").val();
	var frequency = $("#formFrequency").val();
	//console.log(train);
	//console.log(destination);
	//database.ref().set({
		//trainName: train,
		//destinationCity: destination

	//});

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