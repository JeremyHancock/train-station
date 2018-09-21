$(document).ready(function () {

    function update() {
        populateForm()
    }
    setInterval(update, 1000);
    // array that will hold the trains, it starts with three pre-loaded
    var config = {
        apiKey: "AIzaSyDUauf2fgLUbSb9j1R5IPf8-B3kUOsb3yU",
        authDomain: "train-station-5de63.firebaseapp.com",
        databaseURL: "https://train-station-5de63.firebaseio.com",
        projectId: "train-station-5de63",
        storageBucket: "train-station-5de63.appspot.com",
        messagingSenderId: "310623510002"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var trainArray = [
        {
            number: 717,
            destination: "Venezia",
            frequency: 136,
            firstArrivalTime: '08:00',
            wait: '',
            nextArrival: '',
        },
        {
            number: 1563,
            destination: "Roma",
            frequency: 66,
            firstArrivalTime: '11:37',
            wait: '',
            nextArrival: '',
        },
        {
            number: 831,
            destination: "Cinque Terre",
            frequency: 33,
            firstArrivalTime: '17:06',
            wait: '',
            nextArrival: '',
        }
    ];
    database.ref().on("child_added", function (snapshot) {

        var displayNumber = snapshot.val().number;
        var displayDestination = snapshot.val().destination;
        var displayfirstArrival = snapshot.val().firstArrivalTime;
        var displayFrequency = snapshot.val().frequency;
        var newTrain = {
            number: displayNumber,
            destination: displayDestination,
            frequency: displayFrequency,
            firstArrivalTime: displayfirstArrival,
            wait: '',
            nextArrival: '',
        }
        trainArray.push(newTrain);
        populateForm();
    });
    // this function takes the objects in the trainArray and places them in a table.
    function populateForm() {
        $("#trainRow").empty();
        for (i = 0; i < trainArray.length; i++) {
            var firstTimeConverted = moment(trainArray[i].firstArrivalTime, "HH:mm").subtract(1, "years");
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var tRemainder = diffTime % trainArray[i].frequency;
            var wait = trainArray[i].frequency - tRemainder;
            var nextArrival = moment().add(wait, "minutes");
            var nextArrivalConverted = moment(nextArrival).format("hh:mm")
            // creates a new row in the table for each train
            var newTrain =
                `<tr>
            <td>${trainArray[i].number}</td>
            <td>${trainArray[i].destination}</td>
            <td>${nextArrivalConverted}</td>
            <td>${wait}</td>
        </tr>`
            $("#trainRow").append(newTrain)

        };
    };

    populateForm();

    // this handles new trains entered into the form by the user. 
    $(".btn").click(function () {
        event.preventDefault();

        var trainNumber = $("#formInput1").val().trim();
        var destination = $("#formInput2").val().trim();
        var firstArrivalTime = $("#formInput3").val().trim();
        var frequency = $("#formInput4").val().trim();
        var newTrain = { number: trainNumber, destination: destination, frequency: frequency, firstArrivalTime: firstArrivalTime };
        // pushes each train to firebase
        database.ref().push({
            number: trainNumber,
            destination: destination,
            firstArrivalTime: firstArrivalTime,
            frequency: frequency
        })
    });

});
