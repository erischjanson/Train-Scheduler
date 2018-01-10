
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
	destination = snapshot.val().destinationCity;
	//replace text of html element
	//console.log(train);
	//console.log(destination);

})


$("#submitButton").on("click", function(event){
	
	event.preventDefault();
	//will need to creat an array to hold all trains, etc
	//use a table in html for the schedule

	var train = $("#trainName").val();
	var destination = $("#destination").val();
	//console.log(train);
	//console.log(destination);
	database.ref().set({
		trainName: train,
		destinationCity: destination

	});

})

//see recent-user-with-all-users-solved exercise to order by date added to display by most recently added