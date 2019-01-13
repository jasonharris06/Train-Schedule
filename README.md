# Train-Schedule

## Overview 
It’s train schedule application that incorporates Firebase to host arrival and departure data. The app retrieves and manipulates this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.
### Coding Skills utilized in assignment
-	**Google Firebase** was used to save the users information so it can be displayed every time the website is accessed.
-	**Moment.js** library was used to convert and calculate times.  
	```javascript   
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainfrequency;
    var tMinutesTillTrain = trainfrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes"); 
    nextTrain = moment(nextTrain).format("HH:mm");
```

Run the [Train-Schedule Website](https://jasonharris06.github.io/Train-Schedule/)
