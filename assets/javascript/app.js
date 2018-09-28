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

//   Inital Variables


  var database = firebase.database();

  $("#add-train").click(function(event){
      event.preventDefault();

      var trainName = $("#name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var firstTrainTime = $("#first-train-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();
      
    //   Time validation
    if(!moment(firstTrainTime, "HH:mm").isValid()){
        
    }
  })