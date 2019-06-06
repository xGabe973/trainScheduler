var firebaseConfig = {
    apiKey: "AIzaSyDI4l5BD9sckfkP59EEsILfAK1f2bM6Ah0",
    authDomain: "train-hw-f595f.firebaseapp.com",
    databaseURL: "https://train-hw-f595f.firebaseio.com",
    projectId: "train-hw-f595f",
    storageBucket: "train-hw-f595f.appspot.com",
    messagingSenderId: "43425355554",
    appId: "1:43425355554:web:bc699981729db423"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val().trim();
    

    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    };

    database.ref().push(newTrain);
    console.log(newTrain);

    alert("Train Successfully Added");

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;    

    var timeConverted = moment(firstTrain, "HH:mm");
    console.log(timeConverted);
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);
    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    console.log(timeDiff);
    var remainder = timeDiff % frequency;
    console.log(remainder);
    var minToTrain = frequency - remainder;
    console.log(minToTrain);
    var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    console.log(nextTrain);
    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minToTrain),
    );
    $("#train-table > tbody").append(newRow);
});
