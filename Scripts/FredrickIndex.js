var FredrickService;

$(function () {   
    $('#FredrickFlightNo').hide();
    $('#FredrickFromRet').hide();
    $('#SearchFredrickTo').show(); 
    $("#FredrickArrivalTimeFrom").hide(); 
})

function ChangeFredrickAirport() {
    if (FredrickService == "From Airport") {
        var AirPort = $("#FredrickAirport option:selected").text();
        $("#Return_Drop").val(AirPort)
    }
}




function ChangeFredrickLocationText() {

    FredrickService = $("#FredrickService option:selected").val();
    var Div = ''; 
    if (FredrickService == "To Airport") {
         
        Div = '';
        $("#lblFredrickDate").empty();
        Div += 'Pick Up Date'
        $("#lblFredrickDate").append(Div);

        $('#FredrickFromRet').hide();
        $("#FredrickRetReservation").show();
        $('#ChkFredrickRetReservation').attr('checked', false)
        $('#FredrickFlightNo').hide();
        $('#FredrickFlightFrom').hide();
        $("#FredrickArrivalTimeFrom").hide();
        $("#SearchFredrickFrom").hide();
        $('#SearchFredrickTo').show();
        $("#Pickup_Fredricktime").show();
    } else if (FredrickService == "From Airport") { 
        Div = '';
        $("#lblFredrickDate").empty();
        Div += 'Pick Up Date'
        $("#lblFredrickDate").append(Div);
          
        $('#FredrickFlightNo').hide();
        $('#ChkFredrickRetReservation').attr('checked', false)         
        $('#FredrickFlightFrom').show();
        $("#FredrickArrivalTimeFrom").show();
        $("#SearchFredrickFrom").show();
        $('#SearchFredrickTo').hide();
        $("#Pickup_Fredricktime").hide(); 
                
    }

}
 

function RetFredrickReservationChange() {

    FredrickService = $("#FredrickService option:selected").val();
    if ($("#ChkFredrickRetReservation").is(':not(:checked)') && FredrickService == "To Airport") {  
        $('#FredrickFlightNo').hide();
        $('#SearchFredrickToRet').hide();
        $('#SearchFredrickTo').show();
        $('.returnDiv').hide();
    } else if ($('#ChkFredrickRetReservation').is(':checked') && FredrickService == "To Airport") {  
        $('#FredrickFlightNo').show();
        $('#SearchFredrickToRet').show();
        $('#SearchFredrickTo').show();
        $('.returnDiv').show();
        //$('#FlightNo').show();
        //$('#ArrivalTime').show();
        //$('#ArrivingFrom').show();
        //$("#FlightDate").show();
    } else if ($("#ChkFredrickRetReservation").is(':not(:checked)') && FredrickService == "From Airport") {

        $('#FredrickFromRet').hide();
        $('#SearchFredrickFromRet').hide();
        $('#SearchFredrickTo').hide();
        $("#SearchFredrickFrom").show();
        $("#PickupTime").hide();
        $('.returnDiv').hide();

    } else if ($('#ChkFredrickRetReservation').is(':checked') && FredrickService == "From Airport") {

        $('#FredrickFromRet').show();
        $('#SearchFredrickFromRet').show();
        $('#SearchFredrickTo').hide();
        $("#SearchFredrickFrom").hide();
        $('.returnDiv').hide();
        //$("Return_Pickup").val($("#PickUp_Location").text);
    }
}


    