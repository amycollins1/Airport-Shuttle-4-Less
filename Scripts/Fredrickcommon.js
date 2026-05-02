$(function () {
    //ChangeText();
    ChangeFredrickText();
})

function ChangeFredrickText() {
    var AirportDiv = '<div class="form-group"><label>Select AirPort</label> <select  class="form-select" id="FredrickAirPort" onchange="ChangeFredrickAirport()"></select> </div>'
    var LocationsDiv = '<div class="form-group"><label>Select Location</label> <select  class="form-select" id="FredrickLocation"></select></div>'
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

