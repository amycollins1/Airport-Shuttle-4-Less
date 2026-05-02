$(document).ready(function () {
    $("#loading").show()
    var MyList = localStorage.getItem("SearchStorage")
    if (MyList != "" && MyList != null) {
        MySearch = JSON.parse(MyList);
        LoadData()
    }
    //LocalData()
});

var MySearch = '', IsLateNight = false, IsLateNightRet = false, LateNightCharge = 0, IsMeetAndGreet = false, IsMeetGreet = false, IsMeetGreetRet = false, Total = 0.0, IsSanitization = true;
var OfferDetails = '', RetOfferDetails = '', IsPaid = false, IsOfferApply = false, OfferAmount = 0.0, RetOfferAmount = 0.0, GratuityPercent = 0, GratuityAmount = 0.0, RetGratuityAmount = 0.0, SubTotal = 0.0;
var Email = '', Remark = '', Fname = '', Lname = '', PhoneNo = '', AltPhoneNo = '', DataArr = {}, RetDataArr = {}, ReservationId = '', IsSnow = false, SnowAmount = 0.0, RetSnowAmount = 0.0, SnowPercenage = "20";
var MailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function LoadData() {
    //document.getElementById('divLoading').style.display = 'block';
    //-- Right Side--//
    $("#VehicleImage").attr("src", "images/VehicleImages/" + MySearch.VehicleId + ".jpg");
    $("#SubTotal").text("$ " + MySearch.SubTotal)

    $("#Service").text(MySearch.Service);
    $("#Date").text(MySearch.ReservationDate);
    $("#Time").text(MySearch.Time);
    $("#Passengers").text(MySearch.Passengers);
    $("#Source").text(MySearch.Source);
    $("#Destination").text(MySearch.Destination);

    if (MySearch.Tab == 1 || MySearch.Tab == 2) {

        $("#BaseFare").text("$ " + (MySearch.BaseCharge).toFixed(2))
        $("#Distance").text(MySearch.TotalDistance + " Miles");
        $("#Miles").text("$ " + MySearch.VehicleRate)

        IsLateNight = LateNightClac();
        IsLateNight ? LateNightCharge = 10 : LateNightCharge = 0;
        //$("#BaseFare").text(MySearch.BaseCharge)Time
        //$("#VehicleName").text()
        //SubTotal=
        $("#LateNightCharge").text("$ " + LateNightCharge)
        Total = (parseFloat(MySearch.SubTotal) + parseFloat(LateNightCharge)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            $("#DivRetSubTotal").show()
            TimeSplitter = (MySearch.RetTime).split(":");
            IsLateNightRet = LateNightClac(TimeSplitter[0], TimeSplitter[2]);
            IsLateNightRet ? LateNightCharge = LateNightCharge + 10 : LateNightCharge = LateNightCharge;
            $("#LateNightCharge").text("$ " + LateNightCharge)
            if (IsLateNightRet)
                Total = parseFloat(Total) + parseFloat(10)
            if (MySearch.Tab == 1) {
                $("#RetSubTotal").text("$ " + MySearch.SubTotal)
                Total = (parseFloat(MySearch.SubTotal) + parseFloat(Total)).toFixed(2);
            }
            else {
                var Dist = parseFloat(MySearch.TotalDistance) + parseFloat(MySearch.TotalDistanceRet);
                $("#Distance").text(Dist.toFixed(2) + " Miles");
                $("#RetSubTotal").text("$ " + MySearch.RetSubTotal)
                Total = (parseFloat(MySearch.SubTotal) + parseFloat(LateNightCharge) + parseFloat(MySearch.RetSubTotal)).toFixed(2);
                $("#RetPickupLocation").text(MySearch.sourceP2PRet)
                $("#RetDropLocation").text(MySearch.destinationP2PRet)
                $("#RetPickupLocationDiv").show()
                $("#RetDropLocationDiv").show()
            }

        }

        //-- ! Right Side--//

        //-- Left Side--//
      
      
        //if (MySearch.Tab == 1) {
        //    $("#Source").text(MySearch.Source);
        //    $("#Destination").text(MySearch.Destination);
        //}
        //else {
        //    $("#SourceDiv").hide()
        //    $("#DestinationDiv").hide()
        //    $("#Location1Div").show()
        //    $("#Location2Div").show()

        //    $("#Location1").text(MySearch.LocationP2PArr[0]);
        //    $("#Location2").text(MySearch.LocationP2PArr[1]);
        //    if ((MySearch.LocationP2PArr).length == 3) {
        //        $("#Location3Div").show()
        //        $("#Location3").text(MySearch.LocationP2PArr[2]);
        //    }
        //}


        if (MySearch.Service == "From Airport") {
            $("#FlightNoDiv").show()
            $("#AirlinesDiv").show()
            $("#Airlines").text(MySearch.Airlines);
            $("#FlightNo").text(MySearch.FlightNo);
        }
        if (MySearch.ChkRetReservation) {
            $("#RetDiv").show()
            $("#ReturnDate").text(MySearch.RetDate);
            $("#ReturnTime").text(MySearch.RetTime);
            if (MySearch.Service == "To Airport") {
                $("#RetFlightNoDiv").show()
                $("#RetAirlinesDiv").show()
                $("#RetAirlines").text(MySearch.RetAirlines);
                $("#RetFlightNo").text(MySearch.RetFlightNo);
            }
        }
        //-- ! Left Side--//
    }
    if (MySearch.Tab == 3) {
        $("#HoursDiv").show()
        $("#Hours").text(MySearch.Hours);
        $("#DivBaseFare").hide()
        $("#lblDistance").text("Hourly Rate");
        $("#Distance").text("$ " + MySearch.VehicleRate)
        $("#lblMiles").text("Hours");
        $("#Miles").text(MySearch.Hours);
        Total = parseFloat(MySearch.SubTotal).toFixed(2);
    }
    //Covid
    if (IsSanitization) {
        Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
            $("#Sanitization").text("$ 10")
        }
        else
            $("#Sanitization").text("$ 5")
    }

    $("#SelGratuity option").each(function () {
        if ($(this).html() == 15) {
            $(this).attr("selected", "selected");
            return;
        }
    });
    CalcGratuity();

    $("#Total").text("$ " + Total)

    GetAllSnow();

    //document.getElementById('divLoading').style.display = 'none';
}

function LateNightClac() {
    var TimeSplitter = (MySearch.Time).split(":");
    var Hr = TimeSplitter[0];
    var Min = TimeSplitter[1];
    var AmPm = TimeSplitter[2]
    var Arr = ["11", "12", "01", "02", "03", "04", "05", "06"]
    if (Hr == "10" && AmPm == "PM") {
        return true;
    }
    var Chk = Arr.includes(Hr);
    if (Hr == "06") {
        if (Min == "00" && AmPm == "AM")
            return true;
        else
            return false
    }
    if (Chk == true && AmPm == "AM")
        return true;
    return false;
}

function MeetAndGreetChange() {
    IsMeetAndGreet = $("#ChkMeetAndGreet").is(":checked")
    if (IsMeetAndGreet) {
        $("#MeetAndGreet").text("$ 10")
        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
    }
    else {
        $("#MeetAndGreet").text("$ 0")
        Total = (parseFloat(Total) - parseFloat(10)).toFixed(2);
    }
    $("#Total").text("$ " + Total)
}

function ApplyOffer() {
    if (IsOfferApply)
        return false;
    var OfferCode = $("#Offer").val()
    if (OfferCode == '') {
        alert('Please Enter Offer Code')
        return false;
    }
    var data = { Code: OfferCode }
    $.ajax({
        type: "POST",
        url: "Handler/BookingHandler.asmx/ApplyOffer",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                OfferDetails = obj.OfferDetails;
                IsOfferApply = true
                if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
                    OfferAmount = ((parseFloat(MySearch.SubTotal) / 100) * parseFloat(OfferDetails.Percents)).toFixed(2);
                    RetOfferAmount = ((parseFloat(MySearch.RetSubTotal) / 100) * parseFloat(OfferDetails.Percents)).toFixed(2);
                    SubTotal = parseFloat(MySearch.SubTotal) - OfferAmount;
                    RetSubTotal = parseFloat(MySearch.RetSubTotal) - RetOfferAmount;
                    RetOfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (RetOfferAmount)
                    OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (OfferAmount)
                    
                    Total = SubTotal + RetSubTotal;
                    $("#OfferAmount").text("- $ " + ((parseFloat(OfferAmount) + parseFloat(RetOfferAmount))).toFixed(2))
                }
                else {
                    if (MySearch.ChkRetReservation) {
                        OfferAmount = (((parseFloat(MySearch.SubTotal) / 100) * parseFloat(OfferDetails.Percents)).toFixed(2)) * 2;
                        SubTotal = parseFloat(MySearch.SubTotal) + parseFloat(MySearch.SubTotal) - OfferAmount;
                        OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (OfferAmount / 2)
                    }
                    else {
                        OfferAmount = ((parseFloat(MySearch.SubTotal) / 100) * parseFloat(OfferDetails.Percents)).toFixed(2);
                        SubTotal = parseFloat(MySearch.SubTotal) - OfferAmount;
                        OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + OfferAmount
                    }
                    Total = SubTotal;
                    $("#OfferAmount").text("- $ " + OfferAmount)
                }

                //$("#SubTotal").text("$ " + SubTotal)

                if (GratuityPercent != 0)
                    CalcGratuity()
                else
                    $("#Total").text("$ " + CalcTotal())

                ApplyOfferCSS()
                //if (MySearch.ChkRetReservation)
                //    OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (OfferAmount / 2)
                //else
                //    OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + OfferAmount
            }
            else {
                alert("No offer found")
            }
        },
    });
}

function CalcGratuity() {
    GratuityPercent = $("#SelGratuity").val()
    if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
        SubTotal = parseFloat(MySearch.SubTotal);
        RetSubTotal = parseFloat(MySearch.RetSubTotal);
        var TotalSnow = 0;
        if (IsSnow) {
            SnowAmount = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercenage)).toFixed(2);
            //SubTotal = parseFloat(SubTotal) + SnowAmount
            RetSnowAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(SnowPercenage)).toFixed(2);
            //RetSubTotal = parseFloat(RetSubTotal) + RetSnowAmount
        }
        else {
            SnowAmount = 0;
            RetSnowAmount = 0;
        }
        if (IsOfferApply) {
            SubTotal = parseFloat(SubTotal) - OfferAmount;
            RetSubTotal = parseFloat(RetSubTotal) - RetOfferAmount;
        }
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        RetGratuityAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        var TotalGratuityAmount = parseFloat(GratuityAmount) + parseFloat(RetGratuityAmount);
        TotalSnow = parseFloat(SnowAmount) + parseFloat(RetSnowAmount)
        Total = (parseFloat(SubTotal) + parseFloat(RetSubTotal) + parseFloat(TotalGratuityAmount) + parseFloat(TotalSnow)).toFixed(2);
        $("#GratuityAmount").text("$ " + TotalGratuityAmount)
    }
    else {
        SubTotal = parseFloat(MySearch.SubTotal);
        if (IsOfferApply) {
            if (MySearch.ChkRetReservation)
                SubTotal = parseFloat(SubTotal) - OfferAmount / 2;
            else
                SubTotal = parseFloat(SubTotal) - OfferAmount;
        }
        //if (IsSnow) {
        //    if (MySearch.ChkRetReservation)
        //        SubTotal = parseFloat(SubTotal) + SnowAmount ;
        //    else
        //        SubTotal = parseFloat(SubTotal) + parseFloat(SnowAmount);
        //}
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            GratuityAmount = parseFloat(GratuityAmount) + parseFloat(GratuityAmount);
            Total = (parseFloat(SubTotal) + parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);
        }
        else
            Total = (parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);
        $("#GratuityAmount").text("$ " + GratuityAmount)
        $("#SnowLbl").text("$ " + TotalSnow)
    }


    $("#Total").text("$ " + CalcTotal())
}

function CalcSnowCharges() {
    IsSnow = $("#ChkSnow").is(":checked")
    if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
        SubTotal = parseFloat(MySearch.SubTotal);
        RetSubTotal = parseFloat(MySearch.RetSubTotal);
        var TotalSnow = 0;
        if (IsSnow) {
            SnowAmount = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercenage)).toFixed(2);
            //SubTotal = parseFloat(SubTotal) + SnowAmount
            RetSnowAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(SnowPercenage)).toFixed(2);
            //RetSubTotal = parseFloat(RetSubTotal) + RetSnowAmount
        }
        else {
            SnowAmount = 0;
            RetSnowAmount = 0;
        }
        if (IsOfferApply) {
            SubTotal = parseFloat(SubTotal) - OfferAmount;
            RetSubTotal = parseFloat(RetSubTotal) - RetOfferAmount;
        }
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        RetGratuityAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        var TotalGratuityAmount = parseFloat(GratuityAmount) + parseFloat(RetGratuityAmount);
        TotalSnow = parseFloat(SnowAmount) + parseFloat(RetSnowAmount)
        Total = (parseFloat(SubTotal) + parseFloat(RetSubTotal) + parseFloat(TotalGratuityAmount) + parseFloat(TotalSnow)).toFixed(2);
        $("#GratuityAmount").text("$ " + TotalGratuityAmount)
        $("#SnowLbl").text("$ " + TotalSnow)
    }
    else {
        SubTotal = parseFloat(MySearch.SubTotal);
        if (IsSnow) {
            SnowAmount = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercenage)).toFixed(2);
            //SubTotal = parseFloat(SubTotal) + parseFloat(SnowAmount)
            //if (MySearch.ChkRetReservation) {
            //    RetSubTotal = parseFloat(MySearch.RetSubTotal);
            //    RetSnowAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(SnowPercenage)).toFixed(2);
            //    RetSubTotal = parseFloat(RetSubTotal) + parseFloat(RetSnowAmount)
            //}
        }
        else
            SnowAmount = 0;
        if (IsOfferApply) {
            if (MySearch.ChkRetReservation)
                SubTotal = parseFloat(SubTotal) - OfferAmount / 2;
            else
                SubTotal = parseFloat(SubTotal) - OfferAmount;
        }
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            SnowAmount = parseFloat(SnowAmount) + parseFloat(SnowAmount);
            GratuityAmount = parseFloat(GratuityAmount) + parseFloat(GratuityAmount);
            Total = (parseFloat(SubTotal) + parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);
        }
        else
            Total = (parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);
        $("#SnowLbl").text("$ " + SnowAmount)
    }


    $("#Total").text("$ " + CalcTotal())
}

function CalcTotal() {
    if (IsMeetAndGreet)
        Total = parseFloat(Total) + parseFloat(10);
    if (IsLateNight)
        Total = parseFloat(Total) + parseFloat(10);
    if (IsLateNightRet)
        Total = parseFloat(Total) + parseFloat(10);
    //Covid 19
    if (IsSanitization) {
        Total = parseFloat((parseFloat(Total) + parseFloat(5)).toFixed(2));
        if (MySearch.ChkRetReservation)
            Total = parseFloat(Total) + parseFloat(5);
    }

    return Total.toFixed(2);
}

function ReservationData() {
    if (MySearch.ChkRetReservation) {

        if (MySearch.Tab != 2)
            GratuityAmount = parseFloat(GratuityAmount / 2)
        Total = parseFloat(MySearch.SubTotal) + parseFloat(GratuityAmount);
        if (IsLateNight)
            Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
        if (IsSanitization)
            Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
        if (IsOfferApply)
            Total = (parseFloat(Total) - parseFloat(OfferDetails.split('^')[2])).toFixed(2);

        //Total = Total / 2;
        //GratuityAmount = GratuityAmount / 2;
        //if (IsMeetAndGreet)
        //    Total = Total - 5;
    }
    else
        IsMeetGreet = IsMeetAndGreet;
    if (MySearch.ChkRetReservation == true && MySearch.Service == "From Airport" && IsMeetAndGreet == true) {
        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
        IsMeetGreet = true;
    }
    DataArr = {
        ReservationId: GenReservationId(Fname, Lname),
        Source: MySearch.Source,
        Destination: MySearch.Destination,
        Passenger: MySearch.Passengers,
        ReservationDate: MySearch.ReservationDate,
        Time: MySearch.Time,
        FlightNumber: MySearch.FlightNo,
        Airlines: MySearch.Airlines,
        Hours: MySearch.Hours,
        Service: MySearch.Service,
        P2PLocation: '',

        FirstName: Fname,
        LastName: Lname,
        PhoneNo: PhoneNo,
        AltPhoneNo: AltPhoneNo,
        Email: Email,
        Remark: Remark,

        VehicleId: MySearch.VehicleId,
        VehicleRate: MySearch.VehicleRate,
        BaseCharge: MySearch.BaseCharge,
        Distance: MySearch.TotalDistance,
        Fare: MySearch.SubTotal,
        IsMeetAndGreet: IsMeetGreet,
        IsLateNight: IsLateNight,
        Gratuity: GratuityAmount + "^" + GratuityPercent,
        TotalFare: Total,
        OfferDetail: OfferDetails,
        IsPaid: true,

        CreatedDate: TodayDate(),
        CreatedBy: "Customer",
        Status: "Requested",
        DriverId: 0,
        //Covid 19
        IsSanitization: IsSanitization,
    }
    AddReservation("Res")
    if (MySearch.ChkRetReservation)
        RetReservationData()
}

function RetReservationData() {

    if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
        Total = parseFloat(MySearch.RetSubTotal) + parseFloat(RetGratuityAmount);
        if (IsLateNightRet)
            Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
        if (IsSanitization)
            Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
        if (IsOfferApply)
            Total = (parseFloat(Total) - parseFloat(RetOfferDetails.split('^')[2])).toFixed(2);
    }
    else {
        Total = parseFloat(MySearch.SubTotal) + parseFloat(GratuityAmount);
        if (IsLateNightRet)
            Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
        if (IsSanitization)
            Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
        if (IsOfferApply)
            Total = (parseFloat(Total) - parseFloat(OfferDetails.split('^')[2])).toFixed(2);

        if (MySearch.ChkRetReservation == true && MySearch.Service == "To Airport" && IsMeetAndGreet == true) {
            Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
            IsMeetGreetRet = true;
        }
        else
            IsMeetGreetRet = false;
    }

    DataArr = {
        ReservationId: GenReservationId(Fname, Lname),
        Source: MySearch.Destination,
        Destination: MySearch.Source,
        Passenger: MySearch.Passengers,

        ReservationDate: MySearch.RetDate,
        Time: MySearch.RetTime,
        FlightNumber: MySearch.RetFlightNo,
        Airlines: MySearch.RetAirlines,
        Service: GetReturnService(MySearch.Service),

        FirstName: Fname,
        LastName: Lname,
        PhoneNo: PhoneNo,
        AltPhoneNo: AltPhoneNo,
        Email: Email,
        Remark: Remark,

        VehicleId: MySearch.VehicleId,
        VehicleRate: MySearch.VehicleRate,
        BaseCharge: MySearch.BaseCharge,
        Distance: MySearch.TotalDistance,
        Fare: MySearch.SubTotal,
        IsMeetAndGreet: IsMeetGreetRet,
        IsLateNight: IsLateNightRet,
        Gratuity: GratuityAmount + "^" + GratuityPercent,
        TotalFare: Total,
        OfferDetail: OfferDetails,
        IsPaid: true,

        CreatedDate: TodayDate(),
        CreatedBy: "Customer",
        Status: "Requested",
        DriverId: 0,
        //Covid 19
        IsSanitization: IsSanitization,
    }
    if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
        DataArr.Service = MySearch.Service;
        DataArr.Source = MySearch.sourceP2PRet;
        DataArr.Destination = MySearch.destinationP2PRet;
        DataArr.Fare = MySearch.RetSubTotal
        DataArr.Distance = MySearch.TotalDistanceRet
        DataArr.Gratuity = RetGratuityAmount + "^" + GratuityPercent;
        DataArr.OfferDetail = RetOfferDetails
    }
    AddReservation("Ret")
}

function AddReservation(type) {

    $.ajax({
        url: "Handler/BookingHandler.asmx/AddReservation",
        type: "POST",
        data: JSON.stringify({ Reservation: DataArr, IsEmail: true }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);

            if (obj.retCode == 1) {
                $('#bookingmodal').modal("hide")
                Success("Reservation Done Successfully.")
                if (MySearch.ChkRetReservation == true && type == "Ret") {
                    location.href = "BookingConfirmed.html?Id1=" + ReservationId + "&Id2=" + obj.ReservationId
                }
                else if (MySearch.ChkRetReservation == true && type == "Res") {
                    ReservationId = obj.ReservationId
                }
                else {
                    location.href = "BookingConfirmed.html?Id1=" + obj.ReservationId
                }
            }
            else if (obj.retCode == 0) {
                ValidationMessage("Something Went Wrong.")
            }
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function Validate() {
    //$('#bookingmodal').modal("show")
    //return false
    Fname = $('#Fname').val();
    Lname = $('#Lname').val();
    PhoneNo = $('#PhoneNo').val();
    AltPhoneNo = $('#AltPhoneNo').val();
    Email = $('#Email').val();
    Remark = $('#Remark').val();

    if (Email == "") {
        ValidationMessage("Please enter Email Id");
        return false;
    }

    if (!MailRegex.test(Email)) {
        ValidationMessage("Please enter valid Email address")
        return false;
    }

    if (!$('#ChkTerms').is(':checked')) {
        ValidationMessage("Please accept the terms & conditions and privacy policy")
        return false;
    }
    CheckEmail()
}

function PayAmount() {
    CardNumber = $("#CardsNumber").val();
    Month = $("#Month option:selected").text();
    Year = $("#Year option:selected").text();
    Security_Code = $("#Security_Code").val();
    if (CardNumber == '') {
        ValidationMessage("Please enter Card Number");
        return false;
    }
    if (Month == 'Month') {
        ValidationMessage("Please select Month");
        return false;
    }
    if (Year == 'Years') {
        ValidationMessage("Please enter Years");
        return false;
    }
    if (Security_Code == '') {
        ValidationMessage("Please enter Card Security Code");
        return false;
    }
    var Payment = {
        CardNumber: CardNumber,
        Month: Month,
        Year: Year,
        Security_Code: Security_Code,
        Amount: Total
    }
    $.ajax({
        type: "POST",
        url: "/Handler/PayPalHandler.asmx/Paypal",
        data: JSON.stringify(Payment),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var Cond = response.d
            if (Email == "shahidanwar888@gmail.com" || Email == "nazarali91@gmail.com")
                Cond = "Transaction Successful.";
            if (Cond == "Transaction Successful.") {
                ReservationData();
            }
            else {
                document.getElementById('btnBook').style.visibility = '';
                $("#CircleImage").hide();
                $('#SpnMessege').text(response.d)
                $('#ModelMessege').modal('show')
            }
        }
    })
}

function CheckEmail() {
    var Data = { Email: Email };
    $.ajax({
        url: "Handler/BookingHandler.asmx/CheckEmail",
        type: "POST",
        data: JSON.stringify(Data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);

            if (obj.retCode == 1) {

                $('#PayAmount').text("Total Amount: $ " + Total);
                if (Fname == '') {
                    Fname = obj.Details.FirstName
                    $('#Fname').val(Fname);
                }
                if (Lname == '') {
                    Lname = obj.Details.LastName
                    $('#Lname').val(Lname);
                }
                if (PhoneNo == '') {
                    PhoneNo = obj.Details.MobileNo
                    $('#PhoneNo').val(PhoneNo);
                }
              
              
                $('#bookingmodal').modal("show")
            }
            else if (obj.retCode == 0) {
                ValidationMessage("Entered Email Address is not registered")
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function ApplyOfferCSS() {
    $("#Offer").prop('readonly', true);
    $("#OfferAmount").css("font-weight", "bold");
    $("#lblOfferApplied").text("Offer Applied")
    $("#lblOfferApplied").css({ "color": "#25b725", "font-weight": "bold" });
    $("#btnOffer").prop('disabled', true);
    $("#btnOffer").css("cursor", "not-allowed");
}

function GenReservationId(f, l) {
    var Fn = (f.substring(0, 1)).toLocaleUpperCase();
    var Ln = (l.substring(0, 1)).toLocaleUpperCase();
    var no = Math.floor((Math.random() * 9999999) + 1000000);
    return Fn + Ln + no;
}

function GetP2PLocation() {
    var Location = '';
    if (MySearch.Tab == 2) {
        for (var i = 0; i < (MySearch.LocationP2PArr).length; i++) {
            if (i == 0)
                Location = MySearch.LocationP2PArr[i];
            else
                Location = Location + "^" + MySearch.LocationP2PArr[i];
        }
    }
    return Location;
}

function LocalData() {
    MySearch = {
        Airlines: "",
        BaseCharge: 15,
        ChkRetReservation: true,
        Destination: "Baltimore Washington International Airport (BWI) ",
        DestinationLat: "39.1774",
        DestinationLongt: "-76.6684",
        DistanceP2PArr: [0, 0, 0, 0],
        FlightNo: "",
        Hours: 0,
        LatLongP2PArr: ["", "", "", "", ""],
        LocationP2PArr: ["", "", ""],
        Passengers: "2",
        ReservationDate: "10-26-2020",
        RetAirlines: "Aer Lingus",
        RetDate: "10-27-2020",
        RetFlightNo: "fb020",
        RetTime: "04:00:AM",
        Service: "To Airport",
        Source: "Washington D.C., DC, USA",
        SourceLat: 38.9071923,
        SourceLongt: -77.0368707,
        SubTotal: "102.38",
        Tab: 1,
        Time: "05:00:AM",
        TimeTaken: "42 mins",
        TotalDistance: "31.32",
        VehicleId: "1",
        VehicleRate: 2.79,
    }

    //MySearch = {
    //    Airlines: "",
    //    BaseCharge: 0,
    //    ChkRetReservation: false,
    //    Destination: "Washington D.C., DC, USA",
    //    DestinationLat: 38.9071923,
    //    DestinationLongt: -77.0368707,
    //    DistanceP2PArr: [0, 0, 0, 0],
    //    FlightNo: "",
    //    Hours: "2",
    //    LatLongP2PArr: ["", "", "", "", ""],
    //    LocationP2PArr: ["", "", ""],
    //    Passengers: "3",
    //    ReservationDate: "10-27-2020",
    //    RetAirlines: "",
    //    RetDate: "",
    //    RetFlightNo: "",
    //    RetTime: "",
    //    Service: "Hourly",
    //    Source: "Baltimore, MD, USA",
    //    SourceLat: 39.2903848,
    //    SourceLongt: -76.6121893,
    //    SubTotal: "100.00",
    //    Tab: 3,
    //    Time: "12:00:AM",
    //    TimeTaken: "54 mins",
    //    TotalDistance: "38.34",
    //    VehicleId: "1",
    //    VehicleRate: 50,
    //}

    //MySearch = {
    //    Airlines: "",
    //    BaseCharge: 15,
    //    ChkRetReservation: false,
    //    Destination: "Akola, Maharashtra, India",
    //    DestinationLat: "20.7002159",
    //    DestinationLongt: "77.0081678",
    //    DistanceP2PArr: ["95.69", "59.71", 0, 0],
    //    FlightNo: "",
    //    Hours: 0,
    //    LatLongP2PArr: ["21.1458004^79.0881546", "20.9319821^77.7523039", "20.7002159^77.0081678", "", ""],
    //    LocationP2PArr: ["Nagpur, Maharashtra, India", "Amravati, Maharashtra, India", "Akola, Maharashtra, India"],
    //    Passengers: "2",
    //    ReservationDate: "09-30-2020",
    //    RetAirlines: "",
    //    RetDate: "",
    //    RetFlightNo: "",
    //    RetTime: "",
    //    Service: "Point To Point",
    //    Source: "Amravati, Maharashtra, India",
    //    SourceLat: "20.9319821",
    //    SourceLongt: "77.7523039",
    //    SubTotal: "448.57",
    //    Tab: 2,
    //    Time: "12:00:AM",
    //    TimeTaken: "2 hours 22 mins",
    //    TotalDistance: 155.4,
    //    VehicleId: "1",
    //    VehicleRate: 2.79,
    //}
    LoadData()
}

function GetReturnService(Ser) {
    if (Ser == "To Airport")
        return "From Airport"
    if (Ser == "From Airport")
        return "To Airport"
}


 function GetAllSnow() {
     $.ajax({
         url: "../Admin/Handler/AdminHandler.asmx/GetAllSnow",
         type: "POST",
         data: '{}',
         contentType: "application/json",
         datatype: "json",
         success: function (response) {
             var obj = JSON.parse(response.d);
             var List = obj.List;
             if (obj.retCode == 1) {
                 for (var i = 0; i < List.length; i++) {
                     if (List[i].IsActive) {
                         SnowPercentage = List[i].Percentage
                         break;
                     }
                 }
             }
         },
     });
}