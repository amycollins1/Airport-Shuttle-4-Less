   
$(document).ready(function () {
    //var dt = GetDate();
    //var tm = GetTime();   
   
    //GetFredrickAirLines();
});



function GetAirports() {
    $.ajax({
        url: "/Admin/Handler/FrederickHandler.asmx/GetAllActivatedAirport",
        type: "POST",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {                
                var AirportList = obj.Arr;
                if (AirportList.length > 0) {
                    ddlRequest = '';
                    $("#FredrickAirPort").empty();
                    var ddlRequest = '<option value="-" selected="selected">Select</option>';
                    for (i = 0; i < AirportList.length; i++) { 
                        ddlRequest += '<option value="' + AirportList[i].Sid + '">' + AirportList[i].Name + '</option>';
                    }
                    $("#FredrickAirPort").append(ddlRequest);
                }
            } 
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

function GetFredricks() {

    $.ajax({
        url: "/Admin/Handler/FrederickHandler.asmx/GetAllActivatedFrederick",
        type: "POST",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var FredrickList = obj.Arr;
            if (FredrickList.length > 0) {
                ddlRequest = '';
                $("#FredrickLocation").empty();
                var ddlRequest = '<option value="-" selected="selected">Select</option>';
                for (i = 0; i < FredrickList.length; i++) {
                    ddlRequest += '<option value="' + FredrickList[i].Sid + '">' + FredrickList[i].Name + '</option>';
                }
                $("#FredrickLocation").append(ddlRequest);
            }
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

//function GetFredrickAirLines() {

//    $.ajax({
//        url: "../Admin/ReservationRateHandler.asmx/GetAirLines",
//        type: "POST",
//        data: {},
//        contentType: "application/json",
//        datatype: "json",
//        success: function (response) {
//            var obj = JSON.parse(response.d);


//            if (obj.Retcode == 1) {
//                var Driver = obj.Arr;
//                //debugger;
//                var OptionMac_Name = null;

//                if (obj.Retcode == 1) {
//                    var Driver = obj.Arr;
//                    for (var i = 0; i < Driver.length; i++) {

//                        OptionMac_Name += '<option value="' + Driver[i].Callsign + '" >' + Driver[i].Callsign + '</option>'
//                    }

//                    $("#Select_FredrickAirlines").append(OptionMac_Name);
//                    $("#Select_FredrickAirlinesFrom").append(OptionMac_Name);
//                }
//            }
//        },
//        error: function () {
//            $('#SpnMessege').text("Somthing went wrong. Please try again.")
//            $("#ModelMessege").modal("show")
//        }
//    });
//}

function SubmitFredrick() {
    bValid = ValidationFredrick();
    if (bValid) {

        window.location.href = "Search.html";
    }
}

function ValidationFredrick() {
    //debugger  
    Tab = 5;
    AirportSelect = $("#FredrickAirPort").val();
    FredrickSelect = $("#FredrickLocation").val();

    Date = $('#txt_FredrickDate').val();
    //var Adult = $('#PickUp_FredrickPassengers1').val();
    //var Child = $('#PickUp_FredrickPassengers2').val();

    var Adult = 0,Child = 0;
    var Passengers = parseInt(Adult) + parseInt(Child)
    var Pickuptime = $("#Pickup_FredrickHour").val() + ":" + $("#Pickup_FredrickMinutes").val() + ":" + $("#Pickup_FredrickAM_PM").val();

    var Return_Date = $("#Return_FredrickDate").val();
    if (FredrickService == "From Airport")
        Return_Date = $("#Return_FredrickDateFrom").val();
    var Ret_FlightNumber = $("#FredrickFlightNumber").val();
    var Ret_Airlines = $("#Select_FredrickAirline").val();
    var Ret_FlightTime = $("#Flight_FredrickHour").val() + ":" + $("#Flight_FredrickMinutes").val() + ":" + $("#Flight_FredrickAM_PM").val(); 
    var From_FlightNumber = $("#FredrickFlightNumberFrom").val();
    var From_ArrTime = $("#Flight_FredrickHourFrom").val() + ":" + $("#Flight_FredrickMinutesFrom").val() + ":" + $("#Flight_FredrickAM_PMFrom").val();
    
    var From_Airlines = $("#Select_FredrickAirlineFrom").val();   
    var From_ReturnDate = $("#Return_FredrickDateFrom").val();
    var From_RetTime = $("#ReturnFlight_FredrickHour").val() + ":" + $("#ReturnFlight_FredrickMinutes").val() + ":" + $("#ReturnFlight_FredrickAM_PM").val();
    if (FredrickService == "From Airport")
    {
        Ret_FlightTime = From_RetTime; 
    }
       

    var ChkRet;

    if ($("#ChkFredrickRetReservation").is(':not(:checked)')) {
        ChkRet = false;
    } else {
        ChkRet = true;
    }

    if (AirportSelect == '-') {
        alert("Please Select Airport");
        return false;
    }

    if (FredrickSelect == '-') {
        alert("Please Select Location");
        return false;
    }

    if (Date == '') {
        alert("Please select Date");
        $('#txt_FredrickDate').focus();
        return false;
    }
    //if (Passengers == 0 || Passengers > 6) {
    //    alert("Please select Passenger from 1 to 6");
    //    $('#PickUp_FredrickPassengers').focus();
    //    return false;
    //}
    //if (Adult == 0 && Child == 0) {
    //    alert("Please select Adult & Child");
    //    $('#PickUp_FredrickPassengers1').focus();
    //    return false;
    //}
    //if (Adult == "" || Adult == 0) {
    //    alert("Please atleast 1 Adult");
    //    if (Child == "")
    //        Child = 0;
    //    $('#PickUp_FredrickPassengers1').focus();
    //    return false;
    //}
    var FredrickService = $('#FredrickService').val();
    if (FredrickService == 'To Airport') {
        From = $('#FredrickLocation').val();
        To = $('#FredrickAirPort').val();
        Fromaddress = $("#FredrickLocation option:selected").text();
        Toaddress = $("#FredrickAirPort option:selected").text();
    }
    else
    {
        From = $('#FredrickAirPort').val();
        To = $('#FredrickLocation').val();
        Fromaddress = $("#FredrickAirPort option:selected").text();
        Toaddress = $("#FredrickLocation option:selected").text();
    }

    //window.location.href = "../Results.aspx?Tab=5&Service=" + FredrickService + "&Passengers=" + Passenger + "&From=" + Fromaddress + "&To=" + Toaddress + "&FromID=" + From + "&ToID=" + To + "&Date=" + Date + "&Pickuptime=" + Pickuptime + "&ChkRet=" + ChkRet + "&Return_Date=" + Return_Date + "&Ret_FlightNumber=" + Ret_FlightNumber + "&Ret_Airlines=" + Ret_Airlines + "&Ret_FlightTime=" + Ret_FlightTime + "&From_FlightNumber=" + From_FlightNumber + "&From_ArrTime=" + From_ArrTime + "&From_Airlines=" + From_Airlines + "&From_ReturnDate=" + From_ReturnDate + "&From_RetTime=" + From_RetTime;
 
    MySearch = {
        Tab: Tab,
        Service: FredrickService,
        //Airport: Airport,
        //Location: Location,
        ReservationDate: Date,
        Adult: Adult,
        Child:Child,
        Passengers: Passengers,
        Time: Pickuptime,
        Source: Fromaddress,
        Destination: Toaddress,
        FlightNo: From_FlightNumber,
        Airlines: From_Airlines,
        Hours: Hours,
        IsHalt: IsHalt,
        HaltingHours: HaltingHours,
        HourlySettingID: 0,
        HaltingDiscount: 0,

        ChkRetReservation: ChkRet,
        RetDate: Return_Date,
        RetTime: Ret_FlightTime,
        RetFlightNo: RetFlightNo,
        RetAirlines: RetAirlines,
        sourceP2PRet: sourceP2PRet,
        destinationP2PRet: destinationP2PRet,
        SourceLatRet: SourceLatRet,
        SourceLongtRet: SourceLongtRet,
        DestinationLatRet: DestinationLatRet,
        DestinationLongtRet: DestinationLongtRet,
        TotalDistanceRet: TotalDistanceRet,
        TimeTakenRet: TimeTakenRet,

        TotalDistance: TotalDistance,
        TimeTaken: TimeTaken,
        SourceLat: SourceLat,
        SourceLongt: SourceLongt,
        DestinationLat: DestinationLat,
        DestinationLongt: DestinationLongt,
        VehicleRate: 0,
        VehicleId: 0,
        BaseCharge: 0,
        SubTotal: 0,
        RetSubTotal: 0,
        Stops: Stops,

        FredrickSourceID: From,
        FredrickDestinationID: To,
    };
    if (Service != 'Point To Point' || ChkRetReservation == false) {
        MySearch.sourceP2PRet = '';
        MySearch.destinationP2PRet = '';
    }
    localStorage.setItem("SearchStorage", JSON.stringify(MySearch));
    return true;

    
}
 