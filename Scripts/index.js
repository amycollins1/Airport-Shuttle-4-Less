$(function () {
    //LoadAllComment()
    OnPageLoad()
    $('.secondaryButton').click(function () {
        if ($('.bookRide').is(':visible')) {
            // If currently on step 3, go back to step 2
            $('.bookRide').hide();
            $('.selectRide').show();
            $('.list-inline li').removeClass('active');
            $('.list-inline li[data-target=".selectRide"]').addClass('active');
            $('html, body').animate({ scrollTop: $('.selectRide').offset().top });
        } else if ($('.selectRide').is(':visible')) {
            // If currently on step 2, go back to step 1
            $('.selectRide').hide();
            $('.rideInfo').show();
            $('.list-inline li').removeClass('active');
            $('.list-inline li[data-target=".rideInfo"]').addClass('active');
            $('html, body').animate({ scrollTop: $('.rideInfo').offset().top });
        }
    });
})

var Services = "To Airport", ChkRetReservation = false, bValid = false, Tab = 1;
var Airlines = '', FlightNo = '', ReservationDate = '', Passengers = 0, Time = '', RetDate = '', RetTime = '', RetFlightNo = '', RetAirlines = '', Hours = 0;
var IsHalt = false, HaltingHours = 0;
var MySearch = Array(), TotalDistanceArrP2P = [], Stops = '';

function Submit() {
    bValid = Validation();
    if (bValid) {
        OnLoadSearchHtml()
        //window.location.href = "Search.html";
    }
}

function GetHaltType() {
    VehicleId = $("#Select_Vehicle option:selected").val()
    HourlyType = $("#HaltType option:selected").val()
    if (VehicleId == 0 && HourlyType == 2) {
        alert("Please Select Vehicle!")
        $("#HaltType").val(1)
        return false;
    }
    if (HourlyType == 2) {
        document.getElementById('txt_HaltHours').disabled = false
        HaltDeductionList = $.grep(HaltSettingList, function (p) { return p.VehInfoId == VehicleId })
        if (HaltDeductionList.length == 0) {
            $("#HaltType").val(1)
            document.getElementById('txt_HaltHours').disabled = true
            alert("Discount Not Available for this Vehicle!")
        }
    }
    else {
        document.getElementById('txt_HaltHours').disabled = true
        $('#txt_HaltDiscount').val(0)
        $('#txt_HaltHours').val(0)
        HaltChange();
    }
}

function Validation() {
    if (Tab == 1) {
        Airport = $("#SelAirport option:selected").text();
        ReservationDate = $("#ReservationDate").val();
        Time = $("#SelHrs option:selected").text() + ':' + $("#SelMin option:selected").text() + ':' + $("#SelAMPM option:selected").text()
        Passengers = $("#Passengers").val();

        if (Airport == 'Select') {
            alert('Please Select Airport')
            return false;
        }
        if (TotalDistance == 0) {
            alert('Please Select Location')
            return false;
        }
        if (ReservationDate == 0) {
            alert('Please Select Date')
            return false;
        }
        if (Passengers == 0) {
            alert('Please Select Passengers')
            return false;
        }
        if (Services == "From Airport") {
            FlightNo = $("#FlightNo").val();
            Airlines = $("#Select_Airlines").val();
            if (FlightNo == '') {
                alert('Please Enter Flight Number')
                return false;
            }
            if (Airlines == '') {
                alert('Please Enter Airlines')
                return false;
            }
        }

        if (ChkRetReservation) {
            RetDate = $("#RetReservationDate").val();
            RetTime = $("#SelRetHrs option:selected").text() + ':' + $("#SelRetMin option:selected").text() + ':' + $("#SelRetAMPM option:selected").text()
            if (RetDate == '') {
                alert('Please Select Return Date')
                return false;
            }
            if (Services == "To Airport") {
                RetFlightNo = $("#RetFlightNo").val();
                RetAirlines = $("#Select_AirlinesRet").val();
                if (RetFlightNo == '') {
                    alert('Please Enter Return Flight Number')
                    return false;
                }
                if (RetAirlines == '') {
                    alert('Please Enter Return Airlines')
                    return false;
                }
            }
        }
    }
    else if (Tab == 2) {
        Services = "Point To Point"
        ReservationDate = $("#ReservationDateP2P").val();
        Passengers = $("#PassengersP2P").val();
        Time = $("#SelHrsP2P option:selected").text() + ':' + $("#SelMinP2P option:selected").text() + ':' + $("#SelAMPMP2P option:selected").text()

        if ($("#PickupLocationP2P").val() == '') {
            alert('Please enter Pickup location')
            return false;
        }
        if ($("#DropLocationP2P").val() == '') {
            alert('Please enter Drop location')
            return false;
        }
        if (ReservationDate == 0) {
            alert('Please Select Reservation Date')
            return false;
        }
        if (Passengers == 0) {
            alert('Please Select Passengers')
            return false;
        }
        /*   Start Total Distance Arr*/
        //if (P2PLocation1 != "") {
        //    TotalDistanceArrP2P.push(P2PLocation1)
        //}
        //if (P2PLocation2 != "") {
        //    TotalDistanceArrP2P.push(P2PLocation2)
        //}
        //if (P2PLocation3 != "") {
        //    TotalDistanceArrP2P.push(P2PLocation3)
        //}
        //if (P2PLocation4 != "") {
        //    TotalDistanceArrP2P.push(P2PLocation4)
        //}
        //source = (TotalDistanceArrP2P[0]).split('^')[0]
        //TotalDistance = 0;
        //var splitter = "";
        //for (var i = 0; i < TotalDistanceArrP2P.length; i++) {
        //    splitter = TotalDistanceArrP2P[i].split('^')
        //    TotalDistance = (parseFloat(TotalDistance) + parseFloat(splitter[2])).toFixed(2);
        //    if (i == 0)
        //        Stops = splitter[0] + "^" + splitter[1] + "^" + StopHours[i].value + ":" + StopMins[i].value + "^" + MISC[i].value;
        //    else
        //        Stops = Stops + "#" + splitter[0] + "^" + splitter[1] + "^" + StopHours[i].value + ":" + StopMins[i].value + "^" + MISC[i].value;
        //}
        /*   End Total Distance Arr*/
        if (ChkRetReservation) {
            RetDate = $("#ReservationDateP2PRet").val();
            RetTime = $("#SelHrsP2PRet option:selected").text() + ':' + $("#SelMinP2PRet option:selected").text() + ':' + $("#SelAMPMP2PRet option:selected").text()
            if ($("#RetPickupLocationP2P").val() == '') {
                alert('Please enter Return Pickup location')
                return false;
            }
            if ($("#RetDropLocationP2P").val() == '') {
                alert('Please enter Return Drop location')
                return false;
            }
            if (RetDate == 0) {
                alert('Please Select Return Reservation Date')
                return false;
            }
        }
    }
    else if (Tab == 3) {
        Services = "Hourly"
        ReservationDate = $("#ReservationDateHourly").val();
        Passengers = $("#PassengersHourly").val();
        Hours = $("#Hours option:selected").text();
        Time = $("#SelHrsHourly option:selected").text() + ':' + $("#SelMinHourly option:selected").text() + ':' + $("#SelAMPMHourly option:selected").text()
        HourlyType = $("#HaltType option:selected").val();
        if (HourlyType == 2)
            IsHalt = true;
        HaltingHours = $('#txt_HaltHours').val();

        if (ReservationDate == 0) {
            alert('Please Select Date')
            return false;
        }
        if (TotalDistance == 0) {
            alert('Please Select Drop Location')
            return false;
        }
        if (Passengers == 0) {
            alert('Please Select Passengers')
            return false;
        }
        if (Hours == 'Select') {
            alert('Please Select Hours')
            return false;
        }
    }
    else if (Tab == 4) {
        Time = $("#SelHrsShuttle option:selected").text() + ':' + $("#SelMinShuttle option:selected").text() + ':' + $("#SelAMPMShuttle option:selected").text()
    }
    if (!CheckTimeBefore24_New(Time)) {
        alert("The time you have selected is within 24 hours, you must call our Reservation Department to make this reservation or select a new pickup time.")
        return false
    }
    MySearch = {
        Tab: Tab,
        Service: Services,
        //Airport: Airport,
        //Location: Location,
        ReservationDate: ReservationDate,
        Passengers: Passengers,
        Time: Time,
        Source: source,
        Destination: destination,
        FlightNo: FlightNo,
        Airlines: Airlines,
        Hours: Hours,
        IsHalt: IsHalt,
        HaltingHours: HaltingHours,
        HourlySettingID: 0,
        HaltingDiscount: 0,

        ChkRetReservation: ChkRetReservation,
        RetDate: RetDate,
        RetTime: RetTime,
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
    };
    if (Services != 'Point To Point' || ChkRetReservation == false) {
        MySearch.sourceP2PRet = '';
        MySearch.destinationP2PRet = '';
    }
    localStorage.setItem("SearchStorage", JSON.stringify(MySearch));
    return true;
}

function ChangeService() {
    Services = $("#Service option:selected").val();
    if (Services == "To Airport") {
        $("#lblLocation").text("Pick Up Location")
        $("#lblDate").text("Pick Up Date")
        $("#lblTime").text("Pick Up Time")
        $("#DivFlightNo").hide()
        $("#DivAirlines").hide()
        if (ChkRetReservation) {
            $("#lblRetTime").text("Flight Arrival Time")
            $("#FlightNoRetDiv").show()
            $("#AirlinesRetDiv").show()
        }
        else {
            $("#ReturnDateDiv").hide()
            $("#ReturnTimeDiv").hide()
            $("#FlightNoRetDiv").hide()
            $("#AirlinesRetDiv").hide()
        }
    }
    else if (Services == "From Airport") {
        $("#lblLocation").text("Drop Location")
        $("#lblDate").text("Drop Date")
        $("#lblTime").text("Flight From Airport")
        $("#DivFlightNo").show()
        $("#DivAirlines").show()
        $("#FlightNoRetDiv").hide()
        $("#AirlinesRetDiv").hide()
        $("#lblRetTime").text("Return Time")
    }
}

function RetReservationChange() {
    ChkRetReservation = $('#ChkRetReservation').is(':checked');
    Services = $("#Service option:selected").val();
    //if (ChkRetReservation) {

    //    $("#ReturnDateDiv").show()
    //    $("#ReturnTimeDiv").show()
    //    $("#btnBookRet").show()
    //    $("#btnBook").hide()
    //    if (Services == "To Airport") {

    //        $("#lblRetTime").text("Flight Arrival Time")
    //        $("#FlightNoRetDiv").show()
    //        $("#AirlinesRetDiv").show()
    //    }
    //    else if (Services == "From Airport") {

    //        $("#lblRetTime").text("Return Time")
    //        $("#FlightNoRetDiv").hide()
    //        $("#AirlinesRetDiv").hide()
    //    }
    //}
    //else {
    //    $("#btnBook").show()
    //    $("#btnBookRet").hide()
    //    $("#ReturnDateDiv").hide()
    //    $("#ReturnTimeDiv").hide()
    //    $("#FlightNoRetDiv").hide()
    //    $("#AirlinesRetDiv").hide()
    //}
}

function RetP2PReservationChange() {
    ChkRetReservation = $('#ChkRetReservationP2P').is(':checked');
    if (ChkRetReservation) {

        $("#RetPickupP2PDiv").show()
        $("#RetDropP2PDiv").show()
        $("#RetDateP2PDiv").show()
        $("#RetTimeP2PDiv").show()
        $("#btnBookP2P").hide()
        $("#btnBookRetP2P").show()
    }
    else {
        $("#RetPickupP2PDiv").hide()
        $("#RetDropP2PDiv").hide()
        $("#RetDateP2PDiv").hide()
        $("#RetTimeP2PDiv").hide()
        $("#btnBookP2P").show()
        $("#btnBookRetP2P").hide()
    }
}

function LoadAllComment() {
    $("#Comments").empty();
    $.ajax({
        type: "POST",
        url: "/Handler/DefaultHandler.asmx/LoadAllComment",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            $("#Comments").empty();
            $("#CommentSlider").empty();

            if (obj.retCode == 1) {
                var Arr = obj.Arr;
                var Div = '';
                //Div += '<div class="swiper-wrapper">'
                for (var i = 0; i < Arr.length; i++) {
                    Div += '<div class="swiper-slide">'
                    Div += '<div class="row">'
                    Div += '<div class="col-md-10 offset-md-1">'
                    Div += '<div class="content-box">'
                    Div += '<div class="content-txt-box">'
                    Div += '<p><i class="fas fa-quote-left"></i>' + Arr[i].Comment + '<i class="fas fa-quote-right"></i></p>'
                    Div += '</div>'
                    Div += '<div class="authn-box">'
                    Div += '<h5>' + Arr[i].Name + '</h5>'
                    Div += '</div>'
                    Div += '</div>'
                    Div += '</div>'
                    Div += '<div class="clearfix"></div>'
                    Div += '</div>'
                    Div += '</div>'
                }
                //Div += '</div>'
                //Div += '<div class="swiper-pagination swiper-pagination-tst"></div>'
                //Div += '<div class="swiper-button-next swiper-button-next-tst"></div>'
                //Div += '<div class="swiper-button-prev swiper-button-prev-tst"></div>'
                $("#Comments").append(Div);
            }
        },
    });
}

function OnPageLoad() {
    var dateToday = new Date();
    $('.date-pick').datetimepicker({
        format: 'mm-dd-yyyy'
    });
    $('#ReservationDate').datetimepicker({

        yearOffset: 0,
        lang: 'ch',
        timepicker: false,
        format: 'm-d-Y',
        formatDate: 'm-d-Y',
        minDate: dateToday
    });
}

function SetTab(tabName) {
    if (tabName == "Airport") {
        Tab = 1;
    }
    else if (tabName == "P2P") {
        Tab = 2;
    }
    else if (tabName == "Hourly") {
        Tab = 3;
    }
    else if (tabName == "Frederick") {
        Tab = 5;
    }
}

function CheckTimeBefore24_New(tm) {
    var Splitter = tm.split(':')
    var Times = Splitter[0] + ":" + Splitter[1] + " " + Splitter[2]
    var CurrentDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);

    // tell moment how to parse the input string
    var momentObj = moment(ReservationDate + ' ' + Times, 'dddd, MMMM Do YYYY h:mm:ss a');

    // conversion
    var StrDate = new Date(momentObj._i.replace(/-/g, "/"));
    var CurrentDate = new Date(CurrentDate);

    if (StrDate > CurrentDate)
        return true;
    else
        return false;
}

//This function has not been in use since 3-Sept-2024.
function isMoreThan24HoursAhead(tm) {
    // Parse the provided date string into a Date object
    var resDate = ReservationDate + ' ' + tm;
    var providedDate = new Date(resDate);

    // Get the current date and time
    var currentDate = new Date();

    // Add 24 hours to the current date and time
    var currentDatePlus24Hours = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

    // Compare the provided date with the current date plus 24 hours
    if (providedDate > currentDatePlus24Hours)
        return true;
    else
        return false;
}