$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCf9xVO9KjVMi5jErtRLLG3GlkMCls4HCY",
        authDomain: "train-scheduler-7ad98.firebaseapp.com",
        databaseURL: "https://train-scheduler-7ad98.firebaseio.com",
        projectId: "train-scheduler-7ad98",
        storageBucket: "",
        messagingSenderId: "243578989108"

    };
    firebase.initializeApp(config);

    // Variables

    var trainName = "";
    var trainDestination = "";
    var firstTrainTime = "";
    var trainFrequency = "";

    // Time Conversion
    var firstTimeConverted = "";
    var diffTime = "";
    var timeRemainder;
    var minutesTilTrain;
    var nextTrain;
    
    var database = firebase.database();

    // Functions

    // Submit button 
    $("#add-train").click(function (event) {
        event.preventDefault();

        // Get User Input Information
        var trainName = $("#name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrainTime = $("#first-train-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

        // Remove User Input Information
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");

        // Time conversion
        // Convert to HH:MM; (pushed back 1 year to make sure it comes before current time)
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        //Difference between the times
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        timeRemainder = diffTime % trainFrequency;

        // Minutes Until Next Train
        minutesTilTrain = trainFrequency - timeRemainder;

        // Next Train
        nextTrain = moment().add(minutesTilTrain, "minutes");
        nextTrainFormat = moment(nextTrain).format("hh:mm");

        database.ref().push({
            name: trainName,
            destination: trainDestination,
            firstTrain: firstTrainTime,
            frequency: trainFrequency,

        });
    });

    // Create Firebase event for adding train to the database and a row in the html when user adds an entry
    database.ref().on("child_added", function (childSnapshot) {

        // Stores everything into a variable
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().firstTrain;
        var trainFrequency = childSnapshot.val().frequency;

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency + " minutes"),
            $("<td>").text(moment(nextTrain).calendar()),
            $("<td>").text(minutesTilTrain + " minutes")
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);

    });
});