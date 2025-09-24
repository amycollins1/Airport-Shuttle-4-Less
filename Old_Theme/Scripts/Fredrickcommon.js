$(function () {
    //ChangeText();
    ChangeFredrickText();
})

function ChangeFredrickText() {
    var AirportDiv = '<label>Select AirPort</label> <select id="FredrickAirPort" onchange="ChangeFredrickAirport()"></select>'
    var LocationsDiv = '<label>Select Location</label> <select id="FredrickLocation"></select>'
    var ServiceText = $('#FredrickService').val();
    if (ServiceText == 'To Airport') {
        $('#FredrickFrom').html(LocationsDiv);
        $('#FredrickTo').html(AirportDiv);
    }
    else {
        $('#FredrickFrom').html(AirportDiv);
        $('#FredrickTo').html(LocationsDiv);
        $('#FredrickRetReservation').hide();
    }
    ChangeFredrickLocationText()
    GetAirports();
    GetFredricks();
}

