var FredrickService;

$(function () { 
    $("#FredrickReturn").hide();
    $("#FredrickAirlines").hide();
    $('#FredrickFlightNo').hide();
    $('#FredrickFromRet').hide();
    $('#SearchFredrickTo').show();
    $('#FredrickFlightNoFrom').hide();
    $("#FredrickArrivalTimeFrom").hide(); 
})

function ChangeFredrickAirport() {
    if (FredrickService == "From Airport") {
        var AirPort = $("#FredrickAirport option:selected").text();
        $("#Return_Drop").val(AirPort)
    }
}




function ChangeFredrickLocationText() {
    //alert("jghb")
    debugger;
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
        $('#FredrickFlightNoFrom').hide();
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

        $("#FredrickReturn").hide();
        $("#FredrickAirlines").hide();
        $('#FredrickFlightNo').hide();
        $('#ChkFredrickRetReservation').attr('checked', false)            
        $('#FredrickFlightNoFrom').show();
        $('#FredrickFlightFrom').show();
        $("#FredrickArrivalTimeFrom").show();
        $("#SearchFredrickFrom").show();
        $('#SearchFredrickTo').hide();
        $("#Pickup_Fredricktime").hide();
        //$('#FredrickFromRet').hide();
        //$("#FredrickRetReservation").hide();
                
    }

}
 

function RetFredrickReservationChange() {

    FredrickService = $("#FredrickService option:selected").val();
    if ($("#ChkFredrickRetReservation").is(':not(:checked)') && FredrickService == "To Airport") {
        $("#FredrickReturn").hide();
        $("#FredrickAirlines").hide();
        $('#FredrickFlightNo').hide();
        $('#SearchFredrickToRet').hide();
        $('#SearchFredrickTo').show();
    } else if ($('#ChkFredrickRetReservation').is(':checked') && FredrickService == "To Airport") {
        $("#FredrickReturn").show();
        $("#FredrickAirlines").show();
        $('#FredrickFlightNo').show();
        $('#SearchFredrickToRet').show();
        $('#SearchFredrickTo').hide();
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

    } else if ($('#ChkFredrickRetReservation').is(':checked') && FredrickService == "From Airport") {

        $('#FredrickFromRet').show();
        $('#SearchFredrickFromRet').show();
        $('#SearchFredrickTo').hide();
        $("#SearchFredrickFrom").hide();
        //$("Return_Pickup").val($("#PickUp_Location").text);
    }
}


    