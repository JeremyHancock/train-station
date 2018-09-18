
var trainArray = [
    {
        number: 717,
        destination: "Venezia",
        arrival: '',
        wait: + " minutes",
    },
    {
        number: 1563,
        destination: "Firenze",
        arrival: '',
        wait: + "minutes"
    },
    {
        number: 831,
        destination: "Cinque Terre",
        arrival: '',
        wait: + "minutes",
    }
];
$(document).ready(function () {

    $(".btn").click(function () {
        event.preventDefault();
        var trainNumber = $("#formInput1").val().trim();
        var destination = $("#formInput2").val().trim();
        var arrival = $("#formInput3").val().trim();
        var wait = $("#formInput4").val().trim();
        console.log(trainNumber);
        var newTrain = {number: trainNumber, destination: destination, arrival: arrival, wait: wait};
        trainArray.push(newTrain);
        console.log(trainArray);
    });

    
});        
