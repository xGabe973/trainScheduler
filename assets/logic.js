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
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        time: time,
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
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = ;
    var minutesAway = moment(nextArrival - moment(), "minutes");    
    

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
    );
    $("#train-table > tbody").append(newRow);
});
