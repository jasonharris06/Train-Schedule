// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

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
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-time-input").val().trim(), "HH").format("X");
    var trainfrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var train = {
      name: trainName,
      Destination: trainDest,
      start: trainTime,
      rate: trainfrequency
    };
  
    // Uploads train data to the database
    database.ref().push(train);
  
    // Logs everything to console
    console.log(train.name);
    console.log(train.Destination);
    console.log(train.start);
    console.log(train.rate);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().start;
    var trainfrequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainfrequency);
  
    // Prettify the employee start
   // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment(empStart, "X"), "months");
    //console.log(empMonths);
  
    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainfrequency),
      $("<td>").text(trainTime),
      //$("<td>").text(empRate),
      
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
