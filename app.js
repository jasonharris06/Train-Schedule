// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBIbNYqFG3UPJlAfpv-qPk99GFqBIcID78",
    authDomain: "train-1841f.firebaseapp.com",
    databaseURL: "https://train-1841f.firebaseio.com",
    projectId: "train-1841f",
    storageBucket: "train-1841f.appspot.com",
    messagingSenderId: "61805053299"
}
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
  

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
    var trainfrequency = $("#frequency-input").val().trim();
    
    //Calculate when the next train will come
    var currentTime = moment();
    
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var tRemainder = diffTime % trainfrequency;
    console.log(tRemainder);
    var tMinutesTillTrain = trainfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain);
    nextTrain = moment(nextTrain).format("HH:mm");
    console.log(nextTrain)

    // Creates local "temporary" object for train data
    var train = {
      name: trainName,
      Destination: trainDest,
      start: nextTrain,
      rate: trainfrequency,
      nextTrain: tMinutesTillTrain
    };
  
    // Uploads train data to the database
    database.ref().push(train);
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
  
  });
  
  $("#train-sched-reset").on("click", function(event){
    event.preventDefault();  
    $("tbody").empty();
   
  });
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().start;
    var trainfrequency = childSnapshot.val().rate;
    var nextTrain = childSnapshot.val().nextTrain;
  
    // Employee Info
    // console.log(trainName);
    // console.log(trainDest);
    // console.log(trainTime);
    // console.log(trainfrequency);
    // console.log(nextTrain);
  
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainfrequency),
      $("<td>").text(trainTime),
      $("<td>").text(nextTrain)
      //$("<td>").text(empRate),
      
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
