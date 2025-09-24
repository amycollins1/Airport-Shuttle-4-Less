var Email = '', FirstName = '', LastName = '', PhoneNo = '', DataArr = {}, Status = "Requested", OfferDetails = '', DriverId = 0;
var Time = '', Service = '', ResDate = '', Source = '', Passengers = '', Airlines = '', FlightNo = '', CCLast4 = '', Destination = '', Remark = '';
var MySearch = '', IsLateNight = false, IsMeetAndGreet = false, IsSanitization = false;
var IsParking = false, IsToll = false, IsEmail = false, IsPaid = false, CardType = '', PaymentType = '';
var VehicleId = 0, Total = 0.0, SubTotal = 0.0, OfferAmount = 0.0, GratuityPercent = 0, GratuityAmount = 0, Toll = 0, Parking = 0;
var IsOfferApply = false, IsChildCarSeat = false, IsCurb = false, IsPet = false;
$(document).ready(function () {

    //var MyList = localStorage.getItem("SearchStorage")
    //if (MyList != "" && MyList != null) {
    //    MySearch = JSON.parse(MyList);

    //    LoadData()
    //}
    OnLoad()
    GetAllCustomer()
    GetAllVehicle()
    GetAllOffer()
});

function Validate() {
   
    FirstName = $('#txt_FirstName').val();
    LastName = $('#txt_LastName').val();
    PhoneNo = $('#txt_ContactNumber').val();
    Email = $('#txt_Email').val();
    ResDate = $('#txt_Date').val();
    Source = $('#SelAirport option:selected').text();
    Passengers = $('#Passengers').val();
    Airlines = $('#Select_Airlines').val();
    FlightNo = $("#FlightNo").val();
    CCLast4 = $('#CCLast4').val();
    Destination = $('#txt_Address').val();
   
    if (Email == "") {
        ValidationMessage("Please Enter Email Id");
        return false;
    }
    if (PhoneNo == "") {
        ValidationMessage("Please Enter Phone No");
        return false;
    }
    if (FirstName == "") {
        ValidationMessage("Please Enter First Name");
        return false;
    }
    if (LastName == "") {
        ValidationMessage("Please Enter Last Name");
        return false;
    }
    if (ResDate == "") {
        ValidationMessage("Please Enter Reservation Date");
        return false;
    }
    if (Source == "") {
        ValidationMessage("Please Select Airport Name");
        return false;
    }
    if (Passengers == "") {
        ValidationMessage("Please Enter Passengers");
        return false;
    }
    if (Airlines == "") {
        ValidationMessage("Please Select Airlines");
        return false;
    }
    if (FlightNo == "") {
        ValidationMessage("Please Enter Flight No");
        return false;
    }
    if (CCLast4 == "") {
        ValidationMessage("Please Enter CC Last 4 Digits");
        return false;
    }
    if (Destination == "") {
        ValidationMessage("Please Enter Address");
        return false;
    }
    if (VehicleId == 0) {
        ValidationMessage("Please Select Vehicle");
        return false;
    }

    Service = $('#Select_Service option:selected').val();
    Time = $('#Time').val();
    IsEmail = $('#ChkEmail').is(':checked')
    Remark = $('#Remark').val();
    IsPaid = $('#ChkPaid').is(':checked')
    CardType = $('#CardType').val();
    PaymentType = $('#PaymentType').val();
    AddReservation();
}

function AddReservation() {
    if (Service == "To Airport")
    {
        var src = Source
        Source = Destination;
        Destination = src;
    }
    if (DriverId != 0)
        Status = "Confirmed";
    DataArr = {
        ReservationId: GenReservationId(FirstName, LastName),
        Source: Source,
        Destination: Destination,
        Passenger: Passengers,
        ReservationDate: ResDate,
        Time: Time24To12(Time),
        FlightNumber: FlightNo,
        Airlines: Airlines,
        Service: Service,
        CardLast4: CCLast4,
        CardType: CardType,
        PaymentType: PaymentType,

        FirstName: FirstName,
        LastName: LastName,
        PhoneNo: PhoneNo,
        Email: Email,
        Remark: Remark,

        VehicleId: VehicleId,
        VehicleRate: VehicleRate,
        BaseCharge: BaseCharge,
        Distance: TotalDistance,
        Fare: SubTotal,
        IsMeetAndGreet: IsMeetAndGreet,
        IsLateNight: IsLateNight,
        Gratuity: GratuityAmount + "^" + GratuityPercent,
        Toll: Toll,
        Parking: Parking,
        TotalFare: Total,
        OfferDetail: OfferDetails,
        IsPaid: IsPaid,


        CreatedDate: TodayDate(),
        CreatedBy: "Admin",
        Status: "Requested",
        DriverId: 0,
        //Covid 19
        IsSanitization: IsSanitization,
    }

    $.ajax({
        url: "/Handler/BookingHandler.asmx/AddReservation",
        type: "POST",
        data: JSON.stringify({ Reservation: DataArr, IsEmail: IsEmail }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);

            if (obj.retCode == 1) {
                Success("Reservation Done Successfully.")
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

function CalcTotal(tot) {
    //Total = $('#txt_Fare').val();
    Total = tot;
    Total = (parseFloat(Total) + parseFloat(GratuityAmount)).toFixed(2);
    if (IsMeetAndGreet)
        Total = parseFloat(Total) + parseFloat(10);
    if (IsLateNight)
        Total = parseFloat(Total) + parseFloat(10);
    if (IsToll)
        Total = parseFloat(Total) + parseFloat(Toll);
    if (IsParking)
        Total = parseFloat(Total) + parseFloat(Parking);
    if (IsOfferApply)
        Total = parseFloat(parseFloat(Total) - parseFloat(OfferAmount));
    if (IsChildCarSeat)
        Total = parseFloat(Total) + parseFloat(10);
    if (IsCurb)
        Total = parseFloat(Total) + parseFloat(10);
    if (IsPet)
        Total = parseFloat(Total) + parseFloat(10);
    //Covid 19
    if (IsSanitization)
        Total = parseFloat((parseFloat(Total) + parseFloat(5)).toFixed(2));
    Total = (parseFloat(Total)).toFixed(2);
   
    $("#Total").val(Total)
}

function SubTotalCalc() {
    SubTotal = $('#txt_Fare').val();
    CalcTotal(SubTotal)
}

function VehicleChange() {
    VehicleId = $("#Select_Vehicle option:selected").val()
    if (VehicleId != 0) {
        var Vehicle = $.grep(VehicleList, function (p) { return p.Sid == VehicleId })
        SubTotal = (parseFloat(Vehicle[0].BaseCharge) + parseFloat(TotalDistance) * parseFloat(Vehicle[0].PerMile)).toFixed(2);
        BaseCharge = Vehicle[0].BaseCharge
    }   VehicleRate = Vehicle[0].PerMile

    $('#txt_Fare').val(SubTotal)
    CalcTotal(SubTotal)
}

function LateNightChange() {
    Time = $("#Time").val()
    //Time = Time24To12(Time)
    var Splitter = Time.split(':')
    Hr = Splitter[0]
    var Arr = ["12", "01", "02", "03", "04", "05"]
    //if (Hr == "11" && AmPm == "PM") {
    //    //LateNightCharge += 10;
    //    return true;
    //}
    var Chk = Arr.includes(Hr);
    if (Hr == "05") {
        if (Splitter[1] == "00") {
            $("#LateNightCharge").val("10")
            IsLateNight = true;
        }
        else {
            $("#LateNightCharge").val("0")
            IsLateNight = false;
        }
    }
    else {
        if (Chk) {
            $("#LateNightCharge").val("10")
            IsLateNight = true;
        }
        else {
            $("#LateNightCharge").val("0")
            IsLateNight = false;
        }
    }
    CalcTotal(SubTotal)
}

function MeetAndGreetChange() {
    IsMeetAndGreet = $("#ChkMeetAndGreet").is(":checked")
    if (IsMeetAndGreet) {
        //$("#MeetAndGreet").val("10")
        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
    }
    else {
        //$("#MeetAndGreet").val("0")
        Total = (parseFloat(Total) - parseFloat(10)).toFixed(2);
    }
    $("#Total").val(Total)
}

function ChildCarSeatChange() {
    IsChildCarSeat = $("#ChkChildCarSeat").is(":checked")
    if (IsChildCarSeat) {
        SetRemark("Child Car Seat")
        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
    }
    else {
        CheckRemark("Child Car Seat")
        Total = (parseFloat(Total) - parseFloat(10)).toFixed(2);
    }
    $("#Total").val(Total)
}

function SpecialAssistantChange() {
    IsSpecialAssistant = $("#ChkSpecialAssistant").is(":checked")
    IsSpecialAssistant ? SetRemark("Special Assistant") : CheckRemark("Special Assistant");
}

function CurbChange() {
    IsCurb = $("#ChkCurb").is(":checked")
    if (IsCurb) {
        SetRemark("Curb side pick up")
        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
    }
    else {
        CheckRemark("Curb side pick up")
        Total = (parseFloat(Total) - parseFloat(10)).toFixed(2);
    }
    $("#Total").val(Total)
}

function PetChange() {
    IsPet = $("#ChkPet").is(":checked")
    if (IsPet) {
        SetRemark("Pet in cage")
        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
    }
    else {
        CheckRemark("Pet in cage")
        Total = (parseFloat(Total) - parseFloat(10)).toFixed(2);
    }
    $("#Total").val(Total)
}

function SanitizationChange() {
    IsSanitization = $("#ChkSanitization").is(":checked")
    if (IsSanitization) {
        //$("#MeetAndGreet").val("10")
        Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
    }
    else {
        //$("#MeetAndGreet").val("0")
        Total = (parseFloat(Total) - parseFloat(5)).toFixed(2);
    }
    $("#Total").val(Total)
}

function TollChange() {
    if (IsToll) {
        Total = (parseFloat(Total) - parseFloat(Toll)).toFixed(2);
    }
    IsToll = true;
    Toll = $("#txt_Toll").val()
    Total = (parseFloat(Total) + parseFloat(Toll)).toFixed(2);
    $("#Total").val(Total)
}

function ParkingChange() {
    if (IsParking) {
        Total = (parseFloat(Total) - parseFloat(Parking)).toFixed(2);
    }
    IsParking = true;
    Parking = $("#txt_Parking").val()
    Total = (parseFloat(Total) + parseFloat(Parking)).toFixed(2);
    $("#Total").val(Total)
}

function OfferChange() {
    
    var OfferCode = $("#SelOffer option:selected").val()
    if (OfferCode == '') {
        IsOfferApply = false
        OfferAmount = 0;
        OfferDetails = ''
        CalcTotal(SubTotal)
    }
    var OfferDetail = $.grep(OfferList, function (p) { return p.Name == OfferCode })
    if (OfferDetail.length != 0) {
        IsOfferApply = true
        OfferAmount = ((parseFloat(SubTotal) / 100) * parseFloat(OfferDetail[0].Percents)).toFixed(2);
        OfferDetails = OfferDetail[0].Code + "^" + OfferDetail[0].Percents + "^" + OfferAmount
    }
    CalcTotal(SubTotal)
}

function CalcGratuity() {
    GratuityPercent = $("#SelGratuity").val()
    SubTotal = $('#txt_Fare').val();;
    //if (IsOfferApply) {
    //    SubTotal = parseFloat(SubTotal) - OfferAmount;
    //}
    GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
    //Total = (parseFloat(SubTotal) + parseFloat(GratuityAmount)).toFixed(2);

    //$("#GratuityAmount").text(GratuityAmount)
    //$("#Total").text("$ " + CalcTotal())
    CalcTotal(SubTotal)
}

function OnLoad() {

    //var dateToday = new Date();
    //$("#txt_Date").datepicker({
    //    changeMonth: true,
    //    changeYear: true,
    //    dateFormat: "mm-dd-yy",
    //    minDate: dateToday
    //});
    $("#txt_Email").blur(function () {

        Email = $("#txt_Email").val();
        var CustomerDetail = $.grep(CustomerList, function (p) { return p.Email == Email })
        if (CustomerDetail.length != 0)
        {
            $("#txt_FirstName").val(CustomerDetail[0].FirstName);
            $("#txt_LastName").val(CustomerDetail[0].LastName);
            $("#txt_ContactNumber").val(CustomerDetail[0].MobileNo);
            //if (CustomerList[i].FirstName != null) {
                
            //}
            //if (CustomerList[i].LastName != null) {
               
            //}
            //if (CustomerList[i].Mobile != null) {
                
            //}
        }
    });
    $("#txt_ContactNumber").blur(function () {
        MobileNo = $("#txt_ContactNumber").val();
        var CustomerDetail = $.grep(CustomerList, function (p) { return p.MobileNo == MobileNo })
        if (CustomerDetail.length != 0) {
            $("#txt_FirstName").val(CustomerDetail[0].FirstName);
            $("#txt_LastName").val(CustomerDetail[0].LastName);
            //$("#txt_ContactNumber").val(CustomerDetail[0].MobileNo);
            $("#txt_Email").val(CustomerDetail[0].Email);
        }
    });
}

function CheckRemark(Text) {
    var FinalRemark = '';

    Remark = $('#Remark').val();
    var Splitter = Remark.split(',');
    for (var i = 0; i < Splitter.length; i++) {
        if (Text == Splitter[i] && i == 0) {
            Splitter[i] = '';
            for (var j = 0; j < Splitter.length; j++) {
                if (j == 0 || j == 1) {
                    FinalRemark = Splitter[j];
                }

                else {
                    if (Splitter[j] != '')
                        FinalRemark += "," + Splitter[j];
                }
            }
        }
        else if (Text == Splitter[i]) {
            Splitter[i] = '';
            for (var j = 0; j < Splitter.length; j++) {
                if (j == 0) {
                    FinalRemark = Splitter[j];
                }
                else {
                    if (Splitter[j] != '')
                        FinalRemark += "," + Splitter[j];
                }
            }
        }
    }
    $('#Remark').val(FinalRemark);
}

function SetRemark(text) {
    Remark = $('#Remark').val();
    if (Remark != '') 
        Remark += "," + text;
    else
        Remark = text;
    $('#Remark').val(Remark);
}

