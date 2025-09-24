$(document).ready(function () {
    $('#txt_Date').datepicker({
        autoclose: true
    }).on('change', function () {
        $('.datepicker').hide();
    });
    //var MyList = localStorage.getItem("SearchStorage")
    //if (MyList != "" && MyList != null) {
    //    MySearch = JSON.parse(MyList);

    //    LoadData()
    //}
    OnLoad()

    var path = window.location.pathname;
    PageName = path.split("/").pop();

    if (PageName == "AirportReservation.aspx")
        Service = 'Airport'
    else if (PageName == "PointToPoint.aspx")
        Service = 'Point To Point'
    else if (PageName == "HourReservation.aspx")
        Service = 'Hourly'
    else if (PageName == "FrederickReservation.aspx")
        Service = 'Frederick'

    if (location.href.indexOf('?') != -1) {
        Sid = GetQueryStringParams('Sid');
        LoadReservationData()
    }
    else {
        if (PageName == "FrederickReservation.aspx")
        { 
            $("#Select_Vehicle").attr('disabled', true);
            GetAirports();
            GetFredricks();
            GetAllDriverCustomer()
            changePassengers()
        }
        else
        {
            GetAllVehicle()
            GetAllOffer()
            GetAllDriverCustomer()
            GetHaltSettings()
        } 
    }

});

function checkforVehicles()
{
    var AirpotID = $("#SelAirport").val();
    var LocationID = $("#Select_Location").val();
    var Passengers = $("#Passengers").val();
    if (AirpotID != '-' && LocationID != '-' && Passengers>0)
    {        
        $("#Select_Vehicle").empty();
        LoadFredrickVehicles();
        $("#Select_Vehicle").attr('disabled', false);
    }

}

function changePassengers()
{
    var Adults = $("#Adults").val();
    var Childs = $("#Childs").val();
    if (Adults == "") { $("#Adults").val(0); Adults=0 }
    if (Childs == "") { $("#Childs").val(0); Childs=0 }
    var Passengers = parseInt(Adults) + parseInt(Childs);
    $("#Passengers").val(Passengers);
    var AirpotID = $("#SelAirport").val();
    var LocationID = $("#Select_Location").val();
    if (AirpotID != '-' && LocationID != '-' && Passengers>0)
    {
      
        VehicleChange()
    }
    else
    {
        $("#Select_Vehicle").empty(); 
        var Div = '<option value="-">Please select Airport, Fredrick Location, Passengers to Get Vehicle rates</option>';
        $("#Select_Vehicle").append(Div);
        $("#Select_Vehicle").attr('disabled', false);
    }
}
 
var Email = '', FirstName = '', LastName = '', PhoneNo = '', DataArr = {}, Status = "Requested", OfferDetails = '';
var Time = '', Service = '', ResDate = '', Source = '', Passengers = '', CCLast4 = '', Destination = '', Remark = '', Hours = 0;
var MySearch = '', IsLateNight = false, IsMeetAndGreet = false, IsSanitization = false;
var IsParking = false, IsToll = false, IsEmail = false, IsPaid = false, CardType = '', PaymentType = '', PageName = '';
var VehicleId = 0, Total = 0.0, SubTotal = 0.0, OfferAmount = 0.0, GratuityPercent = 0, GratuityAmount = 0, Toll = 0, Parking = 0;
var BaseCharge = 0, DriverId = 0, DriverPercent = 0, DriverName = "", Sid = 0, ReservationDetail = '', Airlines = '', FlightNo = '';
var IsOfferApply = false, IsChildCarSeat = false, IsCurb = false, IsPet = false, IsSnow = false, SnowPercentage = 0, SnowCharges = 0, Stops;
var IsHalt = false, HourlySettingID = 0, HaltingHours = 0, HaltingDiscount = 0, TotalDistanceArrP2P = [];
var ExtraBags = 0, ExtraBagCharge = 0, ExtraAdult = 0, ExtraAdultCharge = 0, ExtraChild = 0, ExtraChildCharge = 0;
var LateNightFixCharges = 15, Adult = 0, Child = 0, CardProcessingPercent = 3.0, CardProcessingAmount = 0;
var TotalAdults = 0, TotalChilds = 0;
var ChildSeatCharge = 0, PetInCageCharge = 0;
var FredrickAddress;

function LoadReservationData() {
    var Data = { Sid: Sid };
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/GetReservation",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                ReservationDetail = obj.ReservationDetail
                if (ReservationDetail.Service == 'Frederick-From Airport' || ReservationDetail.Service == 'Frederick-To Airport') {
                                      
                    if (ReservationDetail.Service == 'Frederick-From Airport')
                    {
                        GetAirports(ReservationDetail.Source);
                        GetFredricks(ReservationDetail.Destination); 
                    }
                    else
                    {
                        GetAirports(ReservationDetail.Destination);
                        GetFredricks(ReservationDetail.Source);                        
                    }
                    ExtraBags = ReservationDetail.ExtraBags;
                    ExtraBagCharge = ReservationDetail.ExtraBagCharge;
                    ExtraAdult = ReservationDetail.Adults;
                    ExtraAdultCharge = ReservationDetail.AdultCharge;
                    ExtraChild = ReservationDetail.Childs;
                    ExtraChildCharge = ReservationDetail.ChildCharge;
                    $('#FredrickAddress').val(ReservationDetail.Address)
                    FredrickAddress = ReservationDetail.Address;
                    $('#SelExtraBag').val(ExtraBags)
                    $('#ExtraBagAmount').val(ExtraBagCharge)
                    //$('#Adults').val(ExtraAdult)
                    //$('#Childs').val(ExtraChild)
                    $('#ExtraAdult').val(ExtraAdult)
                    $('#ExtraChild').val(ExtraChild)
                    $('#ExtraAdultPrice').val(ExtraAdultCharge)
                    $('#ExtraChildPrice').val(ExtraChildCharge)
                    var Adult = parseInt(ReservationDetail.Passenger) - parseInt(ExtraChild)
                    var Child = parseInt(ReservationDetail.Passenger) - parseInt(Adult)
                    $('#Adults').val(Adult)
                    $('#Childs').val(Child)
                    document.getElementById("Adults").disabled = true;
                    document.getElementById("Childs").disabled = true;
                    document.getElementById("Passengers").disabled = true;
                    document.getElementById("Select_Vehicle").disabled = true;
                }
                else
                {
                    GetAllVehicle()
                }
                
                GetAllOffer()
                GetAllDriverCustomer()
                GetHaltSettings()               
                Service = ReservationDetail.Service
                $("#txt_Email").val(ReservationDetail.Email);
                $("#txt_ContactNumber").val(ReservationDetail.PhoneNo);
                $("#txt_FirstName").val(ReservationDetail.FirstName);
                $("#txt_LastName").val(ReservationDetail.LastName);
                $('#txt_Date').val(ReservationDetail.ReservationDate);
                $('#Passengers').val(ReservationDetail.Passenger);
                if (ReservationDetail.CardLast4 != null)
                    $('#CCLast4').val(ReservationDetail.CardLast4);
                $('#Time').val(convertTime12to24(ReservationDetail.Time));
                if (ReservationDetail.IsLateNight) {
                    $("#LateNightCharge").val(LateNightFixCharges)
                    IsLateNight = true;
                }
                   
                if (ReservationDetail.IsMeetAndGreet) {
                    $('#ChkMeetAndGreet').attr('checked', true);
                    IsMeetAndGreet = true;
                }
                    
                if (ReservationDetail.IsSanitization) {
                    $("#ChkSanitization").prop('checked', true);
                    IsSanitization = true;
                }
                    
                if (ReservationDetail.IsPaid)
                    $('#ChkPaid').attr('checked', true);
                if (ReservationDetail.CardType != null)
                    $("#CardType option").each(function () {
                        if ($(this).html() == ReservationDetail.CardType) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
              
                if (ReservationDetail.Gratuity != "0^0" && ReservationDetail.Gratuity != "0.00^0") {
                    var Splitter = (ReservationDetail.Gratuity).split('^')
                    GratuityAmount = Splitter[0];
                    GratuityPercent = Splitter[1];
                    $("#SelGratuity option").each(function () {
                        if ($(this).val() == Splitter[1]) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                }
                $('#txt_Fare').val(ReservationDetail.Fare);
                $('#Total').val(ReservationDetail.TotalFare); 
                $('#Remark').val(ReservationDetail.Remark);
                if (ReservationDetail.PaymentType != null)
                    $('#PaymentType').val(ReservationDetail.PaymentType);
                if (ReservationDetail.CardType != null)
                    $('#CardType').val(ReservationDetail.CardType);


                VehicleId = ReservationDetail.VehicleId
                VehicleRate = ReservationDetail.VehicleRate
                TotalDistance = ReservationDetail.Distance
                SubTotal = ReservationDetail.Fare
                // Card Processing Fee
                if (ReservationDetail.CardProcessingFee != null || CardProcessingAmount != 0) {
                    var CardProcessingFee = (ReservationDetail.CardProcessingFee).split('^');
                    CardProcessingAmount = CardProcessingFee[0];
                    CardProcessingPercent = CardProcessingFee[1];
                    $('#CardProcessingFee').val(CardProcessingAmount)
                }
                
                Total = ReservationDetail.TotalFare
                if ((ReservationDetail.Service).includes('Airport')) {
                    $('#Select_Airlines').val(ReservationDetail.Airlines)
                    $('#FlightNo').val(ReservationDetail.FlightNumber)
                }

                if (ReservationDetail.Service == 'From Airport'){
                    $("#SelAirport option").each(function () {
                        if ($(this).html() == ReservationDetail.Source) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                    $('#txt_Address').val(ReservationDetail.Destination)
                }
                else if (ReservationDetail.Service == 'To Airport') {
                    $("#SelAirport option").each(function () {
                        if ($(this).html() == ReservationDetail.Destination) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                    $('#txt_Address').val(ReservationDetail.Source)

                    $('#Select_Service').val('To Airport').attr("selected", "selected");
                }
                else if (ReservationDetail.Service == 'Point To Point') {
                    $('#PickupLocationP2P').val(ReservationDetail.Source)
                    $('#DropLocationP2P').val(ReservationDetail.Destination)
                }
                else if (ReservationDetail.Service == 'Hourly') {
                    $('#SelHours option:selected').val(ReservationDetail.Hours)
                }

                if (ReservationDetail.IsChildSeat == true){
                    IsChildCarSeat = true;
                    $("#ChkChildCarSeat").prop("checked", true); 
                }
                if (ReservationDetail.IsPetInCage == true) {
                    IsPet = true;
                    $("#ChkPet").prop("checked", true);
                }
                if (ReservationDetail.IsSnow == true) {
                    IsSnow = true;
                    $("#ChkSnow").prop("checked", true);
                }
            }
        },
    });
}

//function loadfredrickDetails()
//{
//    if (ReservationDetail.Service == 'Frederick-From Airport') {        

//        alert($("#SelAirport").val())

//        //$('#SelAirport').change(function () {
//        //    var data = $(this).val();
//        //    alert(data);
//        //});

//        //$('#SelAirport').text(ReservationDetail.Source).trigger('change');
         
//        //$("#Select_Location option:selected").text(ReservationDetail.Destination);
//       // $('#txt_Address').val(ReservationDetail.Destination)
//    }
//    else if (ReservationDetail.Service == 'Frederick-To Airport') {
//        //$("#SelAirport option").each(function () {
//        //    if ($(this).html() == ReservationDetail.Destination) {
//        //        $(this).attr("selected", "selected");
//        //        return;
//        //    }
//        //});

//        //$("#Select_Location option").each(function () {
//        //    if ($(this).html() == ReservationDetail.Source) {
//        //        $(this).attr("selected", "selected");
//        //        return;
//        //    }
//        //});

//        //$('#Select_Service').val('To Airport').attr("selected", "selected");
//    }
//    //LoadFredrickVehicles()
//}

function Validate() {

    FirstName = $('#txt_FirstName').val();
    LastName = $('#txt_LastName').val();
    PhoneNo = $('#txt_ContactNumber').val();
    Email = $('#txt_Email').val();
    ResDate = $('#txt_Date').val();
   
    Passengers = $('#Passengers').val();
    CCLast4 = $('#CCLast4').val();
 

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
   
    if (PageName == 'AirportReservation.aspx')
    {
        Source = $('#SelAirport option:selected').text();
        Service = $('#Select_Service option:selected').val();
        Airlines = $('#Select_Airlines').val();
        FlightNo = $("#FlightNo").val();
        Destination = $('#txt_Address').val();
        if (Source == "Select") {
            ValidationMessage("Please Enter Pickup Address");
            return false;
        }
        if (Passengers == "") {
            ValidationMessage("Please Enter Passengers");
            return false;
        }
        if (Service == "From Airport") {
            if (Airlines == "") {
                ValidationMessage("Please Select Airlines");
                return false;
            }
            if (FlightNo == "") {
                ValidationMessage("Please Enter Flight No");
                return false;
            }
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
    }
    else if (PageName == 'PointToPoint.aspx') {
        Source = $('#PickupLocationP2P').val();
        Destination = $('#DropLocationP2P').val();

        /*   Start Total Distance Arr*/
        //var StopHours = document.getElementsByName("LocationH1");
        //var StopMins = document.getElementsByName("LocationH2");
        //var MISC = document.getElementsByName("LocationM");

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
        //Destination = (TotalDistanceArrP2P[TotalDistanceArrP2P.length - 1]).split('^')[1]
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
    }
    else if (PageName == 'HourReservation.aspx') {
        Source = $('#PickupLocationHourly').val();
        Destination = $('#DropLocationHourly').val();
        Hours = $('#SelHours option:selected').val();

        if (Passengers == "") {
            ValidationMessage("Please Enter Passengers");
            return false;
        }
        if (VehicleId == 0) {
            ValidationMessage("Please Select Vehicle");
            return false;
        }
        if (CCLast4 == "") {
            ValidationMessage("Please Enter CC Last 4 Digits");
            return false;
        }
        if (Source == "") {
            ValidationMessage("Please Enter Pickup Address");
            return false;
        }
        if (Destination == "") {
            ValidationMessage("Please Enter Drop Address");
            return false;
        }
    }
    else if (PageName == 'FrederickReservation.aspx') {
        Service = 'Frederick-' + $('#Select_Service option:selected').val();
        Source = $('#SelAirport option:selected').text();
        Airlines = $('#Select_Airlines').val();
        FlightNo = $("#FlightNo").val();
        Destination = $('#Select_Location option:selected').text();
        Adults = $('#Adults').val();
        Childs = $('#Childs').val() == "" ? 0 : $('#Childs').val();
        Passengers = $('#Passengers').val();
        ExtraAdult = $("#ExtraAdult").val()
        ExtraChild = $("#ExtraChild").val()
        FredrickAddress = $("#FredrickAddress").val()

        if (Source == "Select")
        {
            ValidationMessage("Please Select Airport");
            return false;
        }
        if (Adults == "")
        {
            ValidationMessage("Please Enter Adults");
            return false;
        }
        if (Destination == "Select") {
            ValidationMessage("Please Select Location");
            return false;
        }
        if (VehicleId == 0) {
            ValidationMessage("Please Select Vehicle");
            return false;
        }
        TotalAdults = Adults, TotalChilds = Childs;
    }
   
    Time = $('#Time').val();
    IsEmail = $('#ChkEmail').is(':checked')
    Remark = $('#Remark').val();
    IsPaid = $('#ChkPaid').is(':checked')
    CardType = $('#CardType').val();
    PaymentType = $('#PaymentType').val();
    DriverId = $('#Select_Driver option:selected').val();
    HourlyType = $("#HaltType option:selected").val();
    if (HourlyType == 2)
        IsHalt = true;
    HourlySettingID = HaltSettingID;
    HaltingHours = $('#txt_HaltHours').val();
    HaltingDiscount = $('#txt_HaltDiscount').val();
    if (IsChildCarSeat == true)
        ChildSeatCharge = 20
    if (IsPet == true)
        PetInCageCharge = 25; 

    AddReservation();
}

function AddReservation() {

    if (DriverId != 0)
        Status = "Confirmed";
    DataArr = {
        Sid: Sid,
        ReservationId: GenReservationId(FirstName, LastName),
        Source: Source,
        Destination: Destination,
        Address: FredrickAddress,
        Passenger: Passengers,
        ReservationDate: ResDate,
        Time: Time24To12(Time),
        Hours: Hours,
        Airlines: Airlines,
        FlightNumber: FlightNo,
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
        ExtraBags: ExtraBags,
        ExtraBagCharge: ExtraBagCharge,
        Toll: Toll,
        Parking: Parking,
        TotalFare: Total,
        OfferDetail: OfferDetails,
        IsPaid: IsPaid,

        CreatedDate: TodayDate(),
        CreatedBy: "Admin",
        Status: Status,
        DriverId: DriverId,
        DriverPercent: DriverPercent,
        DriverName: DriverName,
        //Covid 19
        IsSanitization: IsSanitization,
        IsSnow: IsSnow,
        Snow: SnowCharges + "^" + SnowPercentage,
        Stops: Stops,
        IsHalt: IsHalt,
        HourlySettingID: HourlySettingID,
        HaltingHours: HaltingHours,
        HaltingDiscount: HaltingDiscount,
        IsChildSeat: IsChildCarSeat,
        ChildSeatCharge:ChildSeatCharge,
        IsPetInCage: IsPet,
        PetInCageCharge: PetInCageCharge,
        Adults: TotalAdults,
        AdultCharge: ExtraAdultCharge,
        Childs: TotalChilds,
        ChildCharge: ExtraChildCharge,
        CardProcessingFee: CardProcessingAmount + "^" + CardProcessingPercent
    } 
    //if (Service == "To Airport" || Service == "From Airport") {
    //    DataArr.Airlines = Airlines;
    //    DataArr.FlightNumber = FlightNo;
    //} 
    if (Service == "To Airport" || Service == "Frederick-To Airport") {
        DataArr.Source = Destination;
        DataArr.Destination = Source;
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
                setTimeout(function () {
                    window.location.reload();
                },600)
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
    Total = (parseFloat(Total) + parseFloat(GratuityAmount) + parseFloat(SnowCharges)).toFixed(2);
    if (IsMeetAndGreet && Sid > 0)
        Total = parseFloat(Total) + parseFloat(30);
    if (IsLateNight)
        Total = parseFloat(Total) + parseFloat(LateNightFixCharges);
    if (IsToll)
        Total = parseFloat(Total) + parseFloat(Toll);
    if (IsParking)
        Total = parseFloat(Total) + parseFloat(Parking);
    if (IsOfferApply)
        Total = parseFloat(parseFloat(Total) - parseFloat(OfferAmount));
    if (IsChildCarSeat)
        Total = parseFloat(Total) + parseFloat(20);
    //if (IsCurb)
    //    Total = parseFloat(Total) + parseFloat(10);
    if (IsPet)
        Total = parseFloat(Total) + parseFloat(25);
    //Covid 19
    if (IsSanitization)
        Total = parseFloat((parseFloat(Total) + parseFloat(5)).toFixed(2));
    if (HaltingHours > 0)
        Total = parseFloat((parseFloat(Total) - parseFloat(HaltingDiscount)).toFixed(2));
    if (ExtraBags > 0)
        Total = parseFloat((parseFloat(Total) + parseFloat(ExtraBagCharge)).toFixed(2));   
    if (ExtraAdultCharge > 0)
        Total = parseFloat((parseFloat(Total) + parseFloat(ExtraAdultCharge)).toFixed(2));
    if (ExtraChildCharge > 0)
        Total = parseFloat((parseFloat(Total) + parseFloat(ExtraChildCharge)).toFixed(2));
    if (IsSnow==true && Sid>0)
        Total = parseFloat((parseFloat(Total) + parseFloat(20)).toFixed(2));
    //Card Processing Fee
    CalcCardProcessingFee()

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
        if (Service == 'Hourly') {
            var Vehicle = $.grep(VehicleList, function (p) { return p.Sid == VehicleId })
            if ($('#SelHours option:selected').val() != undefined) {
                SubTotal = (parseFloat($('#SelHours option:selected').val()) * parseFloat(Vehicle[0].PerHour)).toFixed(2);
                VehicleRate = Vehicle[0].PerHour;
                if (document.getElementById('txt_HaltHours') != null) {
                    document.getElementById('txt_HaltHours').disabled = true
                    $("#HaltType").val(1)
                    $('#txt_HaltDiscount').val(0)
                    $('#txt_HaltHours').val(0)
                }
            }            
        }
        else if (PageName == 'FrederickReservation.aspx') {
            $("#ExtraAdult").val(0)
            $("#ExtraAdultPrice").val(0)
            $("#ExtraChild").val(0)
            $("#ExtraChildPrice").val(0)
            var Vehicle = $.grep(VehicleList, function (p) { return p.VehicleID == VehicleId })
            SubTotal = parseFloat(Vehicle[0].BaseRate).toFixed(2);
            VehicleRate = parseFloat(Vehicle[0].BaseRate).toFixed(2);
            var ExtraAdult = 0
            var ExtraChild = 0
            var RemainingCapacity = 0
            $("#ExtrasNote").text("Vehicle Note: " + "Charge Extra for Passengers  more than " + Vehicle[0].MinCapacity + " & Bags more than " + Vehicle[0].MinBaggage)
            var Adults = parseInt($("#Adults").val());
            var Childs = parseInt($("#Childs").val());
            if (parseInt(Vehicle[0].MinCapacity) >= Adults)
            {
                RemainingCapacity = parseInt(Vehicle[0].MinCapacity) - Adults;
                ExtraChild = Childs - RemainingCapacity
            }
            else
            {
                ExtraAdult = Adults - parseInt(Vehicle[0].MinCapacity)
                ExtraChild = Childs  
            }
            
            ExtraAdultCharge = parseFloat(ListADCH[0].AdultRate) * parseInt(ExtraAdult)
            ExtraChildCharge = parseFloat(ListADCH[0].ChildRate) * parseInt(ExtraChild)
            $("#ExtraAdult").val(ExtraAdult)           
            $("#ExtraAdultPrice").val(ExtraAdultCharge)
            $("#ExtraChild").val(ExtraChild)
            $("#ExtraChildPrice").val(ExtraChildCharge)

          
            TotalDistance = 0;
        }
        else {
            var Vehicle = $.grep(VehicleList, function (p) { return p.Sid == VehicleId })
            SubTotal = (parseFloat(Vehicle[0].BaseCharge) + parseFloat(TotalDistance) * parseFloat(Vehicle[0].PerMile)).toFixed(2);
            BaseCharge = Vehicle[0].BaseCharge
            VehicleRate = Vehicle[0].PerMile
        }
        if (GratuityAmount != 0) {
            GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        }
    }

    $('#SelExtraBag').val(0)
    $('#ExtraBagAmount').val(0)
    $('#txt_Fare').val(SubTotal)

    $("#SelGratuity option").each(function () {
        if ($(this).html() == "15%") {
            $(this).attr("selected", "selected");
            return;
        }
    });

    CalcGratuity();
    CalcTotal(SubTotal)
}

var HaltDeductionList = [];
var HaltSettingID = 0;
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

function HaltChange() {
    VehicleId = $("#Select_Vehicle option:selected").val()
    HaltingHours = $('#txt_HaltHours').val()
    var HaltDiscount = 0;
    var MaxDiscount = 0;
    if (VehicleId != 0 && parseInt(HaltingHours) > 0) {
        if (Service == 'Hourly') {
            for (var h = 0; h < HaltDeductionList.length; h++) {
                if (HaltingHours >= HaltDeductionList[h].MinHours && HaltingHours <= HaltDeductionList[h].MaxHours) {
                    HaltDiscount = HaltDeductionList[h].PerHourDiscount;
                    HaltSettingID = HaltDeductionList[h].Sid;
                }
                else {
                    if (parseFloat(HaltDeductionList[h].PerHourDiscount) > MaxDiscount) {
                        MaxDiscount = parseFloat(HaltDeductionList[h].PerHourDiscount).toFixed(2);
                    }
                }
            }
            if (HaltDiscount == 0) { HaltDiscount = MaxDiscount; }
        }
    }
    $('#txt_HaltDiscount').val(HaltDiscount)
    HaltingDiscount =  parseFloat(HaltDiscount);
    CalcTotal(SubTotal)
}


function CalcExtraBag() {
    ResetCardProcessing()
    VehicleId = $("#Select_Vehicle option:selected").val() 
    if (VehicleId != 0) {
        ExtraBags = $("#SelExtraBag").val();
        if (PageName == 'FrederickReservation.aspx') {
            ExtraBagCharge = (parseFloat(ExtraBags) * ListADCH[0].BaggageRate).toFixed(2);
        }
        else
        {
            ExtraBagCharge = (parseFloat(ExtraBags) * 10).toFixed(2);
        }
      

        if (ExtraBagCharge > 0) {
            $("#ExtraBagAmount").val(ExtraBagCharge) 
            CalcTotal(SubTotal)
        }
        else {
            $("#ExtraBagAmount").val(0)
            ExtraBagCharge = 0;
            CalcTotal(SubTotal)
        }        
    }
    else {
        alert('Please select Vehicle and Passengers!')
        $("#SelExtraBag").val(0);
        $("#ExtraBagAmount").val(0)
        ExtraBagCharge = 0;
        CalcTotal(SubTotal)
        return false;
    }
    
}
 

function DriverChange() {
    DriverId = $("#Select_Driver option:selected").val()
    if (DriverId != 0) {
        var Driver = $.grep(DriverList, function (p) { return p.Sid == DriverId })
        DriverPercent = Driver[0].Percentage
        DriverName = Driver[0].FirstName + " " + Driver[0].LastName
    }
}

function HoursChange() {
    VehicleId = $("#Select_Vehicle option:selected").val()
    if (VehicleId != 0) {
        var Vehicle = $.grep(VehicleList, function (p) { return p.Sid == VehicleId })
        SubTotal = (parseFloat($('#SelHours option:selected').val()) * parseFloat(Vehicle[0].PerHour)).toFixed(2);
    }
    $('#txt_Fare').val(SubTotal)
    CalcTotal(SubTotal)
    if ($("#HaltType option:selected").val() == 2) {
        HaltChange();
    }
}

function LateNightChange() {
    Time = $("#Time").val()
    //Time = Time24To12(Time)
    var Splitter = Time.split(':')
    Hr = Splitter[0]
    var Arr = ["22", "23", "00", "01", "02", "03", "04", "05", "06"]
    //if (Hr == "11" && AmPm == "PM") {
    //    //LateNightCharge += 10;
    //    return true;
    //}
    var Chk = Arr.includes(Hr);
    if (Hr == "06") {
        if (Splitter[1] == "00") {
            $("#LateNightCharge").val(LateNightFixCharges)
            IsLateNight = true;
        }
        else {
            $("#LateNightCharge").val("0")
            IsLateNight = false;
        }
    }
    else {
        if (Chk) {
            $("#LateNightCharge").val(LateNightFixCharges)
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
    ResetCardProcessing()
    IsMeetAndGreet = $("#ChkMeetAndGreet").is(":checked")
    if (IsMeetAndGreet) {
        //$("#MeetAndGreet").val("10")
        Total = (parseFloat(Total) + parseFloat(30)).toFixed(2);
    }
    else {
        //$("#MeetAndGreet").val("0")
        Total = (parseFloat(Total) - parseFloat(30)).toFixed(2);
    }
    CalcCardProcessingFee()
    $("#Total").val(Total)
}

function ChildCarSeatChange() {
    ResetCardProcessing()
    IsChildCarSeat = $("#ChkChildCarSeat").is(":checked")
    if (IsChildCarSeat) {
        SetRemark("Child Car Seat")
        Total = (parseFloat(Total) + parseFloat(20)).toFixed(2); 
    }
    else {
        CheckRemark("Child Car Seat")
        Total = (parseFloat(Total) - parseFloat(20)).toFixed(2);
    }
    CalcCardProcessingFee()
    $("#Total").val(Total)
}

function SpecialAssistantChange() {
    IsSpecialAssistant = $("#ChkSpecialAssistant").is(":checked")
    IsSpecialAssistant ? SetRemark("Special Assistant") : CheckRemark("Special Assistant");
}

//function CurbChange() {
//    ResetCardProcessing()
//    IsCurb = $("#ChkCurb").is(":checked")
//    if (IsCurb) {
//        SetRemark("Curb side pick up")
//        Total = (parseFloat(Total) + parseFloat(10)).toFixed(2);
//    }
//    else {
//        CheckRemark("Curb side pick up")
//        Total = (parseFloat(Total) - parseFloat(10)).toFixed(2);
//    }
//    CalcCardProcessingFee()
//    $("#Total").val(Total)
//}

function PetChange() {
    ResetCardProcessing()
    IsPet = $("#ChkPet").is(":checked")
    if (IsPet) {
        SetRemark("Pet in cage")
        Total = (parseFloat(Total) + parseFloat(25)).toFixed(2);
    }
    else {
        CheckRemark("Pet in cage")
        Total = (parseFloat(Total) - parseFloat(25)).toFixed(2);
    }
    CalcCardProcessingFee()
    $("#Total").val(Total)
}

function SanitizationChange() {
    ResetCardProcessing()
    IsSanitization = $("#ChkSanitization").is(":checked")
    if (IsSanitization) {
        //$("#MeetAndGreet").val("10")
        Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
    }
    else {
        //$("#MeetAndGreet").val("0")
        Total = (parseFloat(Total) - parseFloat(5)).toFixed(2);
    }
    CalcCardProcessingFee()
    $("#Total").val(Total)
}

function TollChange() {
    ResetCardProcessing()
    if (IsToll) {
        Total = (parseFloat(Total) - parseFloat(Toll)).toFixed(2);
    }
    IsToll = true;
    Toll = $("#txt_Toll").val()
    if (Toll == '') {
        $("#txt_Toll").val('0')
        Toll = 0;
    }
    Total = (parseFloat(Total) + parseFloat(Toll)).toFixed(2);

    CalcCardProcessingFee()
    $("#Total").val(Total)
}

function ParkingChange() {
    ResetCardProcessing()
    if (IsParking) {
        Total = (parseFloat(Total) - parseFloat(Parking)).toFixed(2);
    }
    IsParking = true;
    Parking = $("#txt_Parking").val()
    if (Parking == '') {
        $("#txt_Parking").val('0')
        Parking = 0;
    }
    Total = (parseFloat(Total) + parseFloat(Parking)).toFixed(2);
    CalcCardProcessingFee()
    $("#Total").val(Total)
}

function OfferChange() {

    var OfferCode = $("#SelOffer option:selected").val()
    if (OfferCode == '') {
        IsOfferApply = false
        OfferAmount = 0;
        OfferDetails = ''
        GratuityAmount = (((parseFloat(SubTotal) - parseFloat(OfferAmount)) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        CalcTotal(SubTotal)
    }
    var OfferDetail = $.grep(OfferList, function (p) { return p.Name == OfferCode })
    if (OfferDetail.length != 0) {
        IsOfferApply = true
        OfferAmount = ((parseFloat(SubTotal) / 100) * parseFloat(OfferDetail[0].Percents)).toFixed(2);
        OfferDetails = OfferDetail[0].Code + "^" + OfferDetail[0].Percents + "^" + OfferAmount
        GratuityAmount = (((parseFloat(SubTotal) - parseFloat(OfferAmount)) / 100) * parseFloat(GratuityPercent)).toFixed(2);
    }
    CalcTotal(SubTotal)
}

function CalcGratuity() {
    GratuityPercent = $("#SelGratuity").val()
    SubTotal = $('#txt_Fare').val();
    //if (IsOfferApply) {
    //    SubTotal = parseFloat(SubTotal) - OfferAmount;
    //}
    GratuityAmount = (((parseFloat(SubTotal) - parseFloat(OfferAmount)) / 100) * parseFloat(GratuityPercent)).toFixed(2);
    //Total = (parseFloat(SubTotal) + parseFloat(GratuityAmount)).toFixed(2);

    //$("#GratuityAmount").text(GratuityAmount)
    //$("#Total").text("$ " + CalcTotal())
    CalcTotal(SubTotal)
}

function CalcSnowCharges() {
    ResetCardProcessing()
    IsSnow = $("#ChkSnow").is(":checked")
    SubTotal = $('#txt_Fare').val();
    if (IsSnow) {
        SnowPercent = 20
        SnowCharges = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercent)).toFixed(2);
    }
    else {
        SnowCharges = 0;
    }
    CalcTotal(SubTotal)
}

function GenReservationId(f, l) {
    var Fn = (f.substring(0, 1)).toLocaleUpperCase();
    var Ln = (l.substring(0, 1)).toLocaleUpperCase();
    var no = Math.floor((Math.random() * 9999999) + 1000000);
    return Fn + Ln + no;
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
    var textarea = document.getElementById('Remark').value;
    if (textarea.indexOf(text) == -1) {
        Remark = $('#Remark').val();
        if (Remark != '')
            Remark += "," + text;
        else
            Remark = text;
    }
    else {
        Remark = $('#Remark').val();
    }
    //Remark = $('#Remark').val();
    //if (Remark != '')
    //    Remark += "," + text;
    //else
    //    Remark = text;
    $('#Remark').val(Remark);
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
        if (CustomerDetail.length != 0) {
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

function CalcCardProcessingFee() {
    Total = parseFloat(Total);
    CardProcessingAmount = parseFloat((parseFloat(Total) / 100) * parseFloat(CardProcessingPercent)).toFixed(2);
    CardProcessingAmount = parseFloat(CardProcessingAmount);
    $("#CardProcessingFee").val(CardProcessingAmount)
    Total = Total + CardProcessingAmount;
    Total = Total.toFixed(2);
}

function ResetCardProcessing() {
    Total = Total - CardProcessingAmount;
}

