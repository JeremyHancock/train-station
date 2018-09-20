$(document).ready(function () {
    // array that will hold the trains, it starts with three pre-loaded
    var trainArray = [
        {
            number: 717,
            destination: "Venezia",
            frequency: 136,
            firstArrival: '0800',
        },
        {
            number: 1563,
            destination: "Roma",
            frequency: 66,
            firstArrival: '1137',
        },
        {
            number: 831,
            destination: "Cinque Terre",
            frequency: 33,
            firstArrival: '1706',
        }
    ];

    var currentTime = moment().format("HH:mm")

// this function takes the objects in the trainArray and places them in a table.
function populateForm() {
    $("#trainRow").empty();
    for (i = 0; i < trainArray.length; i++) {
        var newTrain =
            `<tr>
            <td>${trainArray[i].number}</td>
            <td>${trainArray[i].destination}</td>
            <td>${trainArray[i].frequencey}</td>
            <td>${trainArray[i].firstArrival}</td>
        </tr>`
        $("#trainRow").append(newTrain)
    };
};

populateForm();
// this handles new trains entered into the form by the user. It puts the new train into the array and runs the populateForm function again.
$(".btn").click(function () {
    event.preventDefault();
    var trainNumber = $("#formInput1").val().trim();
    var destination = $("#formInput2").val().trim();
    var arrival = $("#formInput3").val().trim().split(':').join('');;
    var wait = $("#formInput4").val().trim();
    console.log(arrival);
    var newTrain = { number: trainNumber, destination: destination, arrival: arrival, wait: wait };
    trainArray.push(newTrain);
    populateForm();
});


});
