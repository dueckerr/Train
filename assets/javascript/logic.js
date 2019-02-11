

// initalize firebase

var config = {
    apiKey: "AIzaSyALVuYa7jMH3rgyqmTHPTAhQ3JOBuMa-yQ",
    authDomain: "trains-81160.firebaseapp.com",
    databaseURL: "https://trains-81160.firebaseio.com",
    projectId: "trains-81160",
    storageBucket: "trains-81160.appspot.com",
    messagingSenderId: "688226611925"
};
firebase.initializeApp(config);

var database = firebase.database();

// global time variable

// var tFrequency = 3;
// var firsttime = "04:00"
// var firstTimeConverted = moment(firsttime, "HH:mm").subtract(1, "years")
// var today = new Date();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// console.log(time);
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//     // Time apart (remainder)
//     var tRemainder = diffTime % tFrequency;

//     // Minute Until Train
//     var tMinutesTillTrain = tFrequency - tRemainder;

//     // Next Train
//     var nextTrain = moment().add(tMinutesTillTrain, "minutes");

// add new train info
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // pulls user input/new train info
    var trainName = $("#train-name").val().trim();
    var trainDes = $("#destination").val().trim();
    var firstTrainTime = $("#train-time").val().trim();
    var trainFreq = $("#frequency").val().trim();
    
    
    // new train objecct

    var newTrain = {
        train: trainName,
        destination: trainDes,
        time: firstTrainTime,
        frequency: trainFreq,

    };

    // push's new info to database
    database.ref().push(newTrain);

    // clear inputs
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");

});


database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().train;
    var trainDes = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    console.log(firstTrainTime);
    var trainFreq = childSnapshot.val().frequency;
    console.log(trainFreq);
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var today = new Date();
    var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(currentTime);
    // var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var minAway = trainFreq - tRemainder;

    console.log(trainFreq);
    console.log(tRemainder);
    console.log(minAway);
    console.log(tRemainder);
    console.log(diffTime);
    console.log(currentTime);

    // Next Train
    var nextTrain = moment().add(minAway, "minutes");

    // new row for train
    var newtrainINFO = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDes),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain.format("HH:mm")),
        $("<td>").text(minAway)
    );

    $("#train-table > tbody").append(newtrainINFO);

});

 