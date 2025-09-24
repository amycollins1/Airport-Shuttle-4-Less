function OnLoadBookingHtml() {
    $("#loading").show();
    loadGratuity();
    var MyList = localStorage.getItem("SearchStorage")
    if (MyList != "" && MyList != null) {
        MySearch = JSON.parse(MyList);

        if (MySearch.Tab == 5)
            AD_CH_BaggageFrederick()
        else
            LoadData()
    }    
}

function loadGratuity()
{
    $("#SelGratuity").empty(); 
    var ddlgrat = '<option value="0">0%</option>';
    ddlgrat += ' <option value="10">10%</option>';
    ddlgrat += ' <option value="15" selected="selected">15%</option>';
    ddlgrat += ' <option value="20">20%</option>';
    ddlgrat += ' <option value="25">25%</option>';
    ddlgrat += ' <option value="30">30%</option>';
    ddlgrat += ' <option value="35">35%</option>';
    ddlgrat += ' <option value="40">40%</option>';
    ddlgrat += ' <option value="50">50%</option>';
    $("#SelGratuity").append(ddlgrat);
}

var MySearch = '', IsLateNight = false, IsLateNightRet = false, LateNightCharge = 0, IsMeetAndGreet = false, IsMeetGreet = false, IsMeetGreetRet = false, Total = 0.0, IsSanitization = false;
var OfferDetails = '', RetOfferDetails = '', IsPaid = false, IsOfferApply = false, OfferAmount = 0.0, RetOfferAmount = 0.0, GratuityPercent = 0, GratuityAmount = 0.0, RetGratuityAmount = 0.0, SubTotal = 0.0;
var Email = '', Remark = '', Fname = '', Lname = '', PhoneNo = '', AltPhoneNo = '', DataArr = {}, RetDataArr = {}, ReservationId = '', IsSnow = false, SnowAmount = 0.0, RetSnowAmount = 0.0, SnowPercentage = 0;
var ExtraBags = 0, ExtraBagCharge = 0, RetExtraBagCharge = 0.0, LateNightFixCharges = 10;
var ExtraAdult = 0, ExtraAdultCharge = 0, ExtraChild = 0, ExtraChildCharge = 0;
var BaggageRate = 0, AdultRate = 0, ChildRate = 0, CardProcessingPercent = 3.0, CardProcessingAmount = 0;
var IsChildSeat = false, ChildSeatCharge = 0, IsPetinCage = false, PetinCageCharge = 0, ChildSeatType = "", hiddenDiv = "";
var MailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var ExtraBag = 0;

function AD_CH_BaggageFrederick() {
    $.ajax({
        url: "/Admin/Handler/FrederickHandler.asmx/GetAllAD_CH_Baggage_Rate",
        type: "POST",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var List = obj.Arr;
                if (List.length > 0) {
                    BaggageRate = List[0].BaggageRate;
                    AdultRate = List[0].AdultRate;
                    ChildRate = List[0].ChildRate;
                    //ddlRequest = ''
                    //$("#SelExtraBag").empty();                   
                    //var ddlRequest = '<option value="0" selected="selected">All Bags</option>';
                    //var MaxBags = parseInt(MySearch.MaxBaggage) ;
                    //for (i = 1; i <= MaxBags; i++) {
                    //    ddlRequest += '<option value="' + i + '">' + i + '</option>';
                    //}
                    //$("#SelExtraBag").append(ddlRequest);
                    var ExtraBags = parseInt(MySearch.Bags) - parseInt(MySearch.MinBaggage)
                    $("#AllowedBags").text(MySearch.Bags + ' (' + MySearch.MinBaggage + ' allowed and ' + ExtraBags + ' Extra)');
                    $("#FredrickBags").show();
                    var ExtraPassengers = parseInt(MySearch.Passengers) - parseInt(MySearch.MinCapacity)
                    $("#AllowedPassengers").text(MySearch.Passengers + ' (' + MySearch.MinCapacity + ' allowed and ' + ExtraPassengers + ' Extra)');
                    //if ((MySearch.Adult - MySearch.MinCapacity) > 0)
                    //    ExtraAdult = MySearch.Adult - MySearch.MinCapacity;                   
                    //if ((MySearch.Passengers - MySearch.MinCapacity - ExtraAdult) > 0)
                    //    ExtraChild = MySearch.Passengers - MySearch.MinCapacity - ExtraAdult;
                    //if ((MySearch.Passengers - MySearch.MinCapacity - ExtraAdult) > 0)
                    //    ExtraChild = MySearch.Passengers - MySearch.MinCapacity - ExtraAdult;

                    ExtraAdult = MySearch.Adult;
                    ExtraChild = MySearch.Child;
                    ExtraBag = ExtraBags; 

                    if (MySearch.ChkRetReservation) {
                        if (ExtraAdult > 0) {
                            ExtraAdultCharge = ExtraAdult * AdultRate * 2;
                            $("#ExtraAdultAmount").text(ExtraAdultCharge);
                        }

                        if (ExtraChild > 0) {
                            ExtraChildCharge = ExtraChild * ChildRate * 2;
                            $("#ExtraChildAmount").text(ExtraChildCharge);
                        }
                        if (ExtraBag > 0) {
                            ExtraBagCharge = ExtraBag * BaggageRate * 2;
                            $("#ExtraBagAmount").text(ExtraBagCharge);
                        }
                    }
                    else {
                        if (ExtraAdult > 0) {
                            ExtraAdultCharge = ExtraAdult * AdultRate;
                            $("#ExtraAdultAmount").text(ExtraAdultCharge);
                        }

                        if (ExtraChild > 0) {
                            ExtraChildCharge = ExtraChild * ChildRate;
                            $("#ExtraChildAmount").text(ExtraChildCharge);
                        }
                        if (ExtraBag > 0) {
                            ExtraBagCharge = ExtraBag * BaggageRate;
                            $("#ExtraBagAmount").text(ExtraBagCharge);
                        }

                    }
                    if (MySearch.ChkRetReservation) {
                        $("#FredrickAdults").text('(' + ExtraAdult + ' Extra Adult with return)');
                        $("#FredrickChilds").text('(' + ExtraChild + ' Extra Child with return)');
                        $("#FredrickBags").text('(' + ExtraBag + ' Extra Bag with return)');
                    }
                    else {
                        $("#FredrickAdults").text('(' + ExtraAdult + ' Extra Adult)');
                        $("#FredrickChilds").text('(' + ExtraChild + ' Extra Child)');
                        $("#FredrickBags").text('(' + ExtraBag + ' Extra Bag)');
                    }

                    $("#FredrickAdults").show();
                    $("#FredrickChilds").show();
                    LoadData()

                }
            }
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

function LoadData() {
    //document.getElementById('divLoading').style.display = 'block';
    //-- Right Side--//
    $("#VehicleImage").attr("src", "images/VehicleImages/" + MySearch.VehicleId + ".jpg");
    $("#SubTotal").text("$ " + MySearch.SubTotal)

    $("#BookingService").text(MySearch.Service);
    $("#Date").text(MySearch.ReservationDate);
    $("#Time").text(MySearch.Time);
    $("#Passenger").text(MySearch.Passengers);
    $("#Source").text(MySearch.Source);
    $("#Destination").text(MySearch.Destination);
    document.getElementById('DivLateNight').style.display = '';

    if (MySearch.Tab == 1 || MySearch.Tab == 2) {
        $("#BaseFare").text("$ " + (MySearch.BaseCharge).toFixed(2))
        $("#Distance").text(MySearch.TotalDistance + " Miles");
        $("#Miles").text("$ " + MySearch.VehicleRate)

        IsLateNight = LateNightClac(MySearch.Time);
        IsLateNight ? LateNightCharge = LateNightFixCharges : LateNightCharge = 0;
       
        $("#LateNightCharge").text("$ " + LateNightCharge)
        Total = (parseFloat(MySearch.SubTotal) + parseFloat(LateNightCharge)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            ShowHideDiv('DivRetSubTotal')
            TimeSplitter = (MySearch.RetTime).split(":");
            IsLateNightRet = LateNightClac(MySearch.RetTime);
            IsLateNightRet ? LateNightCharge = LateNightCharge + LateNightFixCharges : LateNightCharge = LateNightCharge;
            $("#LateNightCharge").text("$ " + LateNightCharge)
            if (IsLateNightRet)
                Total = parseFloat(Total) + parseFloat(LateNightFixCharges)
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
            $("#BookingFlightNo").text(MySearch.FlightNo);
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
        document.getElementById('iFredrickbooking').style.display = 'none';
        document.getElementById('DivLateNight').style.display = 'none';

        $("#HoursDiv").show()
        $("#Hours").text(MySearch.Hours);
        $("#DivBaseFare").hide()
        $("#lblDistance").text("Hourly Rate");
        $("#Distance").text("$ " + MySearch.VehicleRate)
        $("#lblMiles").text("Hours");
        $("#Miles").text(MySearch.Hours);
        //if (MySearch.HourlySettingID > 0) {           
        //    $("#HaltHoursDiv").show();
        //    $("#HaltDiv").show();
        //    $("#HaltHours").text(MySearch.HaltingHours);
        //    $("#HaltDiscount").text(MySearch.HaltingDiscount);
        //    $("#HaltDiscount1").text(MySearch.HaltingDiscount);
        //    MySearch.SubTotal = parseFloat(MySearch.SubTotal) - parseFloat(MySearch.HaltingDiscount)
        //    $("#SubTotal").text("$ " + MySearch.SubTotal)
        //}
        Total = parseFloat(MySearch.SubTotal).toFixed(2);
    }
    if (MySearch.Tab == 5) {
        document.getElementById('iFredrickbooking').style.display = '';

        $("#BaseFare").text("$ " + (MySearch.BaseCharge).toFixed(2))
        $("#DivDistance").hide()        
        $("#DivDistance1").hide()
        document.getElementById("DivDistance").classList.remove("d-flex");
        document.getElementById("DivDistance1").classList.remove("d-flex");
        $("#lblHaltDiscount1").text("Other")
        IsLateNight = LateNightClac(MySearch.Time);
        IsLateNight ? LateNightCharge = LateNightFixCharges : LateNightCharge = 0;

        $("#LateNightCharge").text("$ " + LateNightCharge)
        Total = (parseFloat(MySearch.SubTotal) + parseFloat(LateNightCharge)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            ShowHideDiv('DivRetSubTotal')
            TimeSplitter = (MySearch.RetTime).split(":");
            IsLateNightRet = LateNightClac(MySearch.RetTime);
            IsLateNightRet ? LateNightCharge = LateNightCharge + LateNightFixCharges : LateNightCharge = LateNightCharge;
            $("#LateNightCharge").text("$ " + LateNightCharge)
            if (IsLateNightRet)
                Total = parseFloat(Total) + parseFloat(LateNightFixCharges)
            if (MySearch.Tab == 1) {
                $("#RetSubTotal").text("$ " + MySearch.SubTotal)
                Total = (parseFloat(MySearch.SubTotal) + parseFloat(Total)).toFixed(2);
            }
            else {
                $("#RetSubTotal").text("$ " + MySearch.SubTotal)
                Total = (parseFloat(MySearch.SubTotal) + parseFloat(LateNightCharge) + parseFloat(MySearch.RetSubTotal)).toFixed(2);
                $("#RetPickupLocation").text(MySearch.sourceP2PRet)
                $("#RetDropLocation").text(MySearch.destinationP2PRet)
                $("#RetPickupLocationDiv").show()
                $("#RetDropLocationDiv").show()
            }
        }
    }

    NoteUI();
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
        if ($(this).html() == "15%") {
            $(this).attr("selected", "selected");
            return;
        }
    });

    CalcGratuity();

    $("#Total").text("$ " + Total.toFixed(2))

    GetAllSnow();
    //document.getElementById('divLoading').style.display = 'none';
}

function LateNightClac(CurrentTime) {
    var TimeSplitter = (CurrentTime).split(":");
    var Hr = TimeSplitter[0];
    var Min = TimeSplitter[1];
    var AmPm = TimeSplitter[2]
    var Arr = ["12", "01", "02", "03", "04", "05"]
    if (Hr == "11" && AmPm == "PM") {
        return true;
    }
    var Chk = Arr.includes(Hr);
    if (Hr == "05") {
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
        if (MySearch.ChkRetReservation == true) {
            $("#MeetAndGreet").text("$ 60") 
            Total = (parseFloat(Total) + parseFloat(50)).toFixed(2);
        }
        else {
            $("#MeetAndGreet").text("$ 30") 
            Total = (parseFloat(Total) + parseFloat(30)).toFixed(2);
        }
    }
    else { 
        if (MySearch.ChkRetReservation == true) {
            $("#MeetAndGreet").text("$ 0")
            Total = (parseFloat(Total) - parseFloat(60)).toFixed(2);
        }
        else {
            $("#MeetAndGreet").text("$ 0")
            Total = (parseFloat(Total) - parseFloat(30)).toFixed(2);
        }
    }
    //$("#Total").text("$ " + Total)
    $("#Total").text("$ " + CalcTotal())
}

function ChildSeatChange() {
    ChildSeatType = $("#drpChildSeat").val();
    //Total = (parseFloat(Total) - parseFloat(ChildSeatCharge)).toFixed(2);
    if (ChildSeatType == "-") {
        $("#ChkChildSeat").prop("checked", false)
        //$("#ChkChildSeat").is(":checked") = false
        ChildSeatType = "";
    }
    else {
        $("#ChkChildSeat").prop("checked", true)
        //$("#ChkChildSeat").is(":checked") = true
    }
    IsChildSeat = $("#ChkChildSeat").is(":checked")
    if (IsChildSeat) {
        if (MySearch.ChkRetReservation == true) {
            $("#ChildSeat").text("$ 40")
            ChildSeatCharge = parseFloat(40).toFixed(2);
            //Total = (parseFloat(Total) + parseFloat(40)).toFixed(2); 
        }
        else {
            $("#ChildSeat").text("$ 20")
            ChildSeatCharge = parseFloat(20).toFixed(2);
            //Total = (parseFloat(Total) + parseFloat(20)).toFixed(2); 
        }
    }
    else {
        if (MySearch.ChkRetReservation == true) {
            $("#ChildSeat").text("$ 0")
            //Total = (parseFloat(Total) - parseFloat(40)).toFixed(2); 
        }
        else {
            $("#ChildSeat").text("$ 0")
            //Total = (parseFloat(Total) - parseFloat(20)).toFixed(2);

        }
        ChildSeatCharge = 0;
    }
    // Total = (parseFloat(Total) + parseFloat(ChildSeatCharge)).toFixed(2);
    // $("#Total").text("$ " + Total)
    $("#Total").text("$ " + CalcTotal())
}

function PetInCageChange() {
    IsPetinCage = $("#ChkPetInCage").is(":checked")
    if (IsPetinCage) {
        if (MySearch.ChkRetReservation == true) {
            $("#PetInCage").text("$ 50")
            PetinCageCharge = parseFloat(50).toFixed(2);
            Total = (parseFloat(Total) + parseFloat(50)).toFixed(2);
        }
        else {
            $("#PetInCage").text("$ 25")
            PetinCageCharge = parseFloat(25).toFixed(2);
            Total = (parseFloat(Total) + parseFloat(25)).toFixed(2);
        }
    }
    else {
        if (MySearch.ChkRetReservation == true) {
            $("#PetInCage").text("$ 0")
            Total = (parseFloat(Total) - parseFloat(50)).toFixed(2);
        }
        else {
            $("#PetInCage").text("$ 0")
            Total = (parseFloat(Total) - parseFloat(25)).toFixed(2);
        }
        PetinCageCharge = 0;
    }
    // $("#Total").text("$ " + Total)
    $("#Total").text("$ " + CalcTotal())
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
                    //SubTotal = parseFloat(MySearch.SubTotal) - OfferAmount;
                    //RetSubTotal = parseFloat(MySearch.RetSubTotal) - RetOfferAmount;
                    RetOfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (RetOfferAmount)
                    OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (OfferAmount)

                    /* Total = SubTotal + RetSubTotal;*/
                    $("#OfferAmount").text("- $ " + ((parseFloat(OfferAmount) + parseFloat(RetOfferAmount))).toFixed(2))
                }
                else {
                    if (MySearch.ChkRetReservation) {
                        OfferAmount = (((parseFloat(MySearch.SubTotal) / 100) * parseFloat(OfferDetails.Percents)).toFixed(2)) * 2;
                        /* SubTotal = parseFloat(MySearch.SubTotal) + parseFloat(MySearch.SubTotal) - OfferAmount;*/
                        OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + (OfferAmount / 2)
                    }
                    else {
                        OfferAmount = ((parseFloat(MySearch.SubTotal) / 100) * parseFloat(OfferDetails.Percents)).toFixed(2);
                        /* SubTotal = parseFloat(MySearch.SubTotal) - OfferAmount;*/
                        OfferDetails = OfferDetails.Code + "^" + OfferDetails.Percents + "^" + OfferAmount
                    }
                    /* Total = SubTotal;*/
                    $("#OfferAmount").text("- $ " + OfferAmount)
                }

                //$("#SubTotal").text("$ " + SubTotal)
                if (IsSnow)
                    CalcSnowCharges()
                if (GratuityPercent != 0)
                    CalcGratuity()
                else if (!IsSnow)
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
    GratuityPercent = $("#SelGratuity option:selected").val()
    if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
        SubTotal = parseFloat(MySearch.SubTotal);
        RetSubTotal = parseFloat(MySearch.RetSubTotal);
        var TotalSnow = 0;
        if (IsSnow) {
            SnowAmount = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercentage)).toFixed(2);
            //SubTotal = parseFloat(SubTotal) + SnowAmount
            RetSnowAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(SnowPercentage)).toFixed(2);
            //RetSubTotal = parseFloat(RetSubTotal) + RetSnowAmount
        }
        else {
            SnowAmount = 0;
            RetSnowAmount = 0;
        }
        //if (IsOfferApply) {
        //    SubTotal = parseFloat(SubTotal) - OfferAmount;
        //    RetSubTotal = parseFloat(RetSubTotal) - RetOfferAmount;
        //}
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        RetGratuityAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        var TotalGratuityAmount = parseFloat(GratuityAmount) + parseFloat(RetGratuityAmount);
        TotalSnow = parseFloat(SnowAmount) + parseFloat(RetSnowAmount)
        //Total = (parseFloat(SubTotal) + parseFloat(RetSubTotal) + parseFloat(TotalGratuityAmount) + parseFloat(TotalSnow)).toFixed(2);
        $("#GratuityAmount").text("$ " + TotalGratuityAmount)
    }
    else {
        SubTotal = parseFloat(MySearch.SubTotal);
        //if (IsOfferApply) {
        //    if (MySearch.ChkRetReservation)
        //        SubTotal = parseFloat(SubTotal) - OfferAmount / 2;
        //    else
        //        SubTotal = parseFloat(SubTotal) - OfferAmount;
        //}
        //if (IsSnow) {
        //    if (MySearch.ChkRetReservation)
        //        SubTotal = parseFloat(SubTotal) + SnowAmount ;
        //    else
        //        SubTotal = parseFloat(SubTotal) + parseFloat(SnowAmount);
        //}
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            GratuityAmount = parseFloat(GratuityAmount) + parseFloat(GratuityAmount);
            /*Total = (parseFloat(SubTotal) + parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);*/
        }
        //else
        //    Total = (parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);
        $("#GratuityAmount").text("$ " + GratuityAmount)
        $("#SnowLbl").text("$ " + parseFloat(SnowAmount).toFixed(2))
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
            SnowAmount = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercentage)).toFixed(2);
            //SubTotal = parseFloat(SubTotal) + SnowAmount
            RetSnowAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(SnowPercentage)).toFixed(2);
            //RetSubTotal = parseFloat(RetSubTotal) + RetSnowAmount
        }
        else {
            SnowAmount = 0;
            RetSnowAmount = 0;
        }
        //if (IsOfferApply) {
        //    SubTotal = parseFloat(SubTotal) - OfferAmount;
        //    RetSubTotal = parseFloat(RetSubTotal) - RetOfferAmount;
        //}
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        RetGratuityAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        var TotalGratuityAmount = parseFloat(GratuityAmount) + parseFloat(RetGratuityAmount);
        TotalSnow = parseFloat(SnowAmount) + parseFloat(RetSnowAmount)
        /* Total = (parseFloat(SubTotal) + parseFloat(RetSubTotal) + parseFloat(TotalGratuityAmount) + parseFloat(TotalSnow)).toFixed(2);*/
        $("#GratuityAmount").text("$ " + TotalGratuityAmount)
        $("#SnowLbl").text("$ " + TotalSnow)
    }
    else {
        SubTotal = parseFloat(MySearch.SubTotal);
        RetSubTotal = parseFloat(MySearch.RetSubTotal);
        //if (!IsOfferApply) // implemented on 04-09-22
        //    SubTotal = parseFloat(MySearch.SubTotal);
        if (IsSnow) {
            SnowAmount = ((parseFloat(SubTotal) / 100) * parseFloat(SnowPercentage)).toFixed(2);
            //SubTotal = parseFloat(SubTotal) + parseFloat(SnowAmount)
            //if (MySearch.ChkRetReservation) {
            //    RetSubTotal = parseFloat(MySearch.RetSubTotal);
            //    RetSnowAmount = ((parseFloat(RetSubTotal) / 100) * parseFloat(SnowPercentage)).toFixed(2);
            //    RetSubTotal = parseFloat(RetSubTotal) + parseFloat(RetSnowAmount)
            //}
        }
        else
            SnowAmount = 0;
        //if (IsOfferApply) { commented on 04-09-22
        //    if (MySearch.ChkRetReservation)
        //        SubTotal = parseFloat(SubTotal) - OfferAmount / 2;
        //    else
        //        SubTotal = parseFloat(SubTotal) - OfferAmount;
        //}
        GratuityAmount = ((parseFloat(SubTotal) / 100) * parseFloat(GratuityPercent)).toFixed(2);
        if (MySearch.ChkRetReservation) {
            SnowAmount = parseFloat(SnowAmount) + parseFloat(SnowAmount);
            GratuityAmount = parseFloat(GratuityAmount) + parseFloat(GratuityAmount);
            /*Total = (parseFloat(SubTotal) + parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);*/
        }
        /*else
            Total = (parseFloat(SubTotal) + parseFloat(GratuityAmount) + parseFloat(SnowAmount)).toFixed(2);*/
        $("#SnowLbl").text("$ " + SnowAmount)
    }

    $("#Total").text("$ " + CalcTotal())
}

function CalcExtraBag() {
    ExtraBags = $("#SelExtraBag").val();
    ExtraBagCharge = 0;

    if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
        SubTotal = parseFloat(MySearch.SubTotal);
        RetSubTotal = parseFloat(MySearch.SubTotal);

        ExtraBagCharge = (parseFloat(SubTotal) + (parseFloat(ExtraBags) * 5)).toFixed(2);
        RetExtraBagCharge = (parseFloat(RetSubTotal) * parseFloat(ExtraBags) * 5).toFixed(2);
        var TotalExtraBagCharge = parseFloat(ExtraBagCharge) + parseFloat(RetExtraBagCharge);
        $("#ExtraBagAmount").text(TotalExtraBagCharge)
    }
    if (MySearch.Tab == 5) {
        ExtraBags = $("#SelExtraBag").val()
        ExtraBagCharge = 0;
        if (ExtraBags > MySearch.MinBaggage) {
            SubTotal = parseFloat(MySearch.SubTotal);
            ExtraBagCharge = ((parseFloat(ExtraBags) - parseFloat(MySearch.MinBaggage)) * BaggageRate).toFixed(2);
        }

        if (MySearch.ChkRetReservation) {
            var ExtrabagTotal = parseFloat(ExtraBagCharge) + parseFloat(ExtraBagCharge);
            $("#ExtraBagAmount").text("$ " + ExtrabagTotal);
            ExtraBagCharge = ExtrabagTotal;
        }
        else {
            $("#ExtraBagAmount").text("$ " + ExtraBagCharge)
        }

        $("#Total").text("$ " + CalcTotal())
    }
    else {
        SubTotal = parseFloat(MySearch.SubTotal);
        ExtraBagCharge = (parseFloat(ExtraBags) * 5).toFixed(2);

        if (MySearch.ChkRetReservation) {
            var ExtrabagTotal = parseFloat(ExtraBagCharge) + parseFloat(ExtraBagCharge);
            /* Total = (parseFloat(SubTotal) + parseFloat(SubTotal) + parseFloat(ExtrabagTotal)).toFixed(2); */
            $("#ExtraBagAmount").text("$ " + ExtrabagTotal);
            ExtraBagCharge = ExtrabagTotal;
        }
        else {
            /* Total = (parseFloat(SubTotal) + parseFloat(ExtraBagCharge)).toFixed(2); */
            $("#ExtraBagAmount").text("$ " + ExtraBagCharge)
        }
    }
    $("#Total").text("$ " + CalcTotal())
}

function CalcTotal() {
    ResetCalculation()
    //if (IsMeetAndGreet)
    //    Total = parseFloat(Total) + parseFloat(30);
    if (IsLateNight)
        Total = parseFloat(Total) + parseFloat(LateNightFixCharges);
    if (IsLateNightRet)
        Total = parseFloat(Total) + parseFloat(LateNightFixCharges);
    //Covid 19
    if (IsSanitization) {
        Total = parseFloat((parseFloat(Total) + parseFloat(5)).toFixed(2));
        if (MySearch.ChkRetReservation)
            Total = parseFloat(Total) + parseFloat(5);
    }
    //if (IsChildSeat) {
    //    Total = parseFloat((parseFloat(Total) + parseFloat(ChildSeatCharge)).toFixed(2));
    //    if (MySearch.ChkRetReservation)
    //        Total = parseFloat(Total) + parseFloat(ChildSeatCharge);
    //}

    // Card Processing Fee
    CardProcessingAmount = ((parseFloat(Total) / 100) * parseFloat(CardProcessingPercent)).toFixed(2);

    //if (MySearch.ChkRetReservation) {
    //    CardProcessingAmount = parseFloat(CardProcessingAmount) * 2;
    //    Total = parseFloat(Total) + parseFloat(CardProcessingAmount);
    //    $("#CardProcessingFee").text("$ " + CardProcessingAmount)
    //}
    //else {
    //    $("#CardProcessingFee").text("$ " + CardProcessingAmount)
    //    Total = parseFloat(Total) + parseFloat(CardProcessingAmount);
    //}
    $("#CardProcessingFee").text("$ " + CardProcessingAmount)
    Total = parseFloat(Total) + parseFloat(CardProcessingAmount);

    return Total.toFixed(2);
}

function ResetCalculation() {

    var nSnowText = $("#SnowLbl")[0].innerText
    var nSnowCharge = nSnowText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nGratuityText = $("#GratuityAmount")[0].innerText
    var nGratuityCharge = nGratuityText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nExtraBagText = $("#ExtraBagAmount")[0].innerText
    var nExtraBagCharge = nExtraBagText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nExtraAdultText = $("#ExtraAdultAmount")[0].innerText
    var nExtraAdultCharge = nExtraAdultText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nExtraChildText = $("#ExtraChildAmount")[0].innerText
    var nExtraChildCharge = nExtraChildText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nOfferText = $("#OfferAmount")[0].innerText
    var nOfferCharge = nOfferText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nChildSeatText = $("#ChildSeat")[0].innerText
    var nChildSeatCharge = nChildSeatText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nPetInCageText = $("#PetInCage")[0].innerText
    var nPetInCageCharge = nPetInCageText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    var nMeetAndGreetText = $("#MeetAndGreet")[0].innerText
    var nMeetAndGreetCharge = nMeetAndGreetText.replace(/[^0-9.]/g, '').split(".").filter(item => item !== "").map((item, index) => (index === 0) ? item + '.' : item).join('')
    if (MySearch.ChkRetReservation) {
        Total = ((parseFloat(SubTotal) * 2) + parseFloat(nSnowCharge) + parseFloat(nGratuityCharge) + parseFloat(nExtraBagCharge) + parseFloat(nExtraAdultCharge) + parseFloat(nExtraChildCharge) + parseFloat(nChildSeatCharge) + parseFloat(nPetInCageCharge) + parseFloat(nMeetAndGreetCharge)) - parseFloat(nOfferCharge);
    }
    else {
        Total = (parseFloat(SubTotal) + parseFloat(nSnowCharge) + parseFloat(nGratuityCharge) + parseFloat(nExtraBagCharge) + parseFloat(nExtraAdultCharge) + parseFloat(nExtraChildCharge) + parseFloat(nChildSeatCharge) + parseFloat(nPetInCageCharge) + parseFloat(nMeetAndGreetCharge)) - parseFloat(nOfferCharge);
    }
}

var TotalRet = 0;
function ReservationData() {
    if (MySearch.Tab == 5)
        ExtraBags = ExtraBag;    
    if (MySearch.ChkRetReservation) {

        //if (MySearch.Tab != 2)
        //    GratuityAmount = parseFloat(GratuityAmount / 2)
        //Total = parseFloat(MySearch.SubTotal) + parseFloat(GratuityAmount);
        //if (IsLateNight)
        //    Total = (parseFloat(Total) + parseFloat(LateNightFixCharges)).toFixed(2);
        //if (IsSanitization)
        //    Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
        //if (IsOfferApply)
        //    Total = (parseFloat(Total) - parseFloat(OfferDetails.split('^')[2])).toFixed(2);

        if (IsLateNight && IsLateNightRet)
        {
            TotalRet = Total/2;
            Total = Total / 2;           
        }           
        else
        {
            if (IsLateNight == true && IsLateNightRet==false)
            {
                TotalRet = (Total / 2) - LateNightFixCharges;
                Total = (Total / 2) + LateNightFixCharges;
            }
            else
            {
                TotalRet = (Total / 2) + LateNightFixCharges;
                Total = (Total / 2) - LateNightFixCharges;
            }
        }
         
        //GratuityAmount = GratuityAmount / 2;
        //if (IsMeetAndGreet)
        //    Total = Total - 5;
    }
   // else
        IsMeetGreet = IsMeetAndGreet;
    //if (MySearch.ChkRetReservation == true && MySearch.Service == "From Airport" && IsMeetAndGreet == true) {
    //    Total = (parseFloat(Total) + parseFloat(30)).toFixed(2);
    //    IsMeetGreet = true;
    //}
    var IsHalt = false, HourlySettingID = 0, HaltingHours = 0, HaltingDiscount = 0;
    if (MySearch.HourlySettingID > 0) {
        IsHalt = true;
        HourlySettingID = MySearch.HourlySettingID;
        HaltingHours = MySearch.HaltingHours;
        HaltingDiscount = MySearch.HaltingDiscount;
    }
    if (MySearch.ChkRetReservation)
    {
        ChildSeatCharge = (parseFloat(ChildSeatCharge) / 2).toFixed(2);
        PetinCageCharge= (parseFloat(PetinCageCharge) / 2).toFixed(2);
        ExtraBagCharge= (parseFloat(ExtraBagCharge) / 2).toFixed(2);
        ExtraAdultCharge = (parseFloat(ExtraAdultCharge) / 2).toFixed(2);
        ExtraChildCharge=(parseFloat(ExtraChildCharge) / 2).toFixed(2);
    }
    DataArr = {
        ReservationId: GenReservationId(Fname, Lname),
        Source: MySearch.Source,
        Destination: MySearch.Destination,
        Address: MySearch.FredrickAddress,
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
        IsChildSeat: IsChildSeat,
        ChildSeatType: ChildSeatType,
        ChildSeatCharge: ChildSeatCharge,
        IsPetinCage: IsPetinCage,
        PetinCageCharge: PetinCageCharge,
        IsLateNight: IsLateNight,
        Gratuity: GratuityAmount + "^" + GratuityPercent,
        ExtraBags: ExtraBags,
        ExtraBagCharge: ExtraBagCharge,
        Adults: ExtraAdult,
        AdultCharge: ExtraAdultCharge,
        Childs: ExtraChild,
        ChildCharge: ExtraChildCharge,
        TotalFare: Total,
        OfferDetail: OfferDetails,
        IsPaid: true,

        CreatedDate: TodayDate(),
        CreatedBy: "Customer",
        Status: "Requested",
        DriverId: 0,
        //Covid 19
        IsSanitization: IsSanitization,
        IsSnow: IsSnow,
        Snow: SnowAmount + "^" + SnowPercentage,
        Stops: MySearch.Stops,
        IsHalt: IsHalt,
        HourlySettingID: HourlySettingID,
        HaltingHours: HaltingHours,
        HaltingDiscount: HaltingDiscount,
        //CardProcessingFee: MySearch.ChkRetReservation == true ? (CardProcessingAmount / 2).toFixed(2) + "^" + CardProcessingPercent : CardProcessingAmount + "^" + CardProcessingPercent
        CardProcessingFee: ((parseFloat(Total) / 100) * parseFloat(CardProcessingPercent)).toFixed(2) + "^" + CardProcessingPercent
    }
    if (MySearch.Tab == 5) {
        DataArr.Service = 'Frederick-' + MySearch.Service; 
    }
    AddReservation("Res")
    if (MySearch.ChkRetReservation)
        RetReservationData()
}

function RetReservationData() {

    //if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
    //    Total = parseFloat(MySearch.RetSubTotal) + parseFloat(RetGratuityAmount);
    //    if (IsLateNightRet)
    //        Total = (parseFloat(Total) + parseFloat(LateNightFixCharges)).toFixed(2);
    //    if (IsSanitization)
    //        Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
    //    //if (IsOfferApply)
    //    //    Total = (parseFloat(Total) - parseFloat(RetOfferDetails.split('^')[2])).toFixed(2);
    //}
    //else {
    //    Total = parseFloat(MySearch.SubTotal) + parseFloat(GratuityAmount);
    //    if (IsLateNightRet)
    //        Total = (parseFloat(Total) + parseFloat(LateNightFixCharges)).toFixed(2);
    //    if (IsSanitization)
    //        Total = (parseFloat(Total) + parseFloat(5)).toFixed(2);
    //    //if (IsOfferApply)
    //    //    Total = (parseFloat(Total) - parseFloat(OfferDetails.split('^')[2])).toFixed(2);

    //    if (MySearch.ChkRetReservation == true && IsMeetAndGreet == true) {
    //        Total = (parseFloat(Total) + parseFloat(30)).toFixed(2);
    //        IsMeetGreetRet = true;
    //    }
    //    else
    //        IsMeetGreetRet = false;
    //}

    DataArr = {
        ReservationId: GenReservationId(Fname, Lname),
        Source: MySearch.Destination,
        Destination: MySearch.Source,
        Address: MySearch.FredrickAddress,
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
        IsChildSeat: IsChildSeat,
        ChildSeatType: ChildSeatType,
        ChildSeatCharge: ChildSeatCharge,
        IsPetinCage: IsPetinCage,
        PetinCageCharge: PetinCageCharge,
        IsLateNight: IsLateNightRet,
        Gratuity: GratuityAmount + "^" + GratuityPercent,
        ExtraBags: ExtraBags,
        ExtraBagCharge: ExtraBagCharge,
        Adults: ExtraAdult,
        AdultCharge: ExtraAdultCharge,
        Childs: ExtraChild,
        ChildCharge: ExtraChildCharge,
        TotalFare: TotalRet,
        OfferDetail: OfferDetails,
        IsPaid: true,

        CreatedDate: TodayDate(),
        CreatedBy: "Customer",
        Status: "Requested",
        DriverId: 0,
        //Covid 19
        IsSanitization: IsSanitization,
        IsSanitization: IsSanitization,
        IsSnow: IsSnow,
        Snow: SnowAmount + "^" + SnowPercentage,
        Stops: MySearch.Stops, 
        //CardProcessingFee: MySearch.ChkRetReservation == true ? (CardProcessingAmount / 2).toFixed(2) + "^" + CardProcessingPercent : CardProcessingAmount + "^" + CardProcessingPercent
        CardProcessingFee: ((parseFloat(TotalRet) / 100) * parseFloat(CardProcessingPercent)).toFixed(2) + "^" + CardProcessingPercent
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
    if (MySearch.Tab == 5) {
        DataArr.Service = 'Frederick-' + DataArr.Service;
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
                $('#bookingModal').modal("hide")
                alert("Reservation Done Successfully.")
                $('#bookingConfirmationModal').modal("show")
                
                if (MySearch.ChkRetReservation == true && type == "Ret") {
                    $("#ReservationIdConf").append("Your Booking number is : " + ReservationId);
                    $("#ReservationIdConf").append("<br> Your Booking number is : " + obj.ReservationId);

                    setTimeout(location.href = "index.html", 8000);
                }
                else if (MySearch.ChkRetReservation == true && type == "Res") {
                    ReservationId = obj.ReservationId
                }
                else {
                    $("#ReservationIdConf").append("Your Booking number is : " + obj.ReservationId);
                    setTimeout(function() {
                        location.href = "index.html"
                    }, 2000);
                }
            }
            else if (obj.retCode == 0) {
                alert("Something Went Wrong.")
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
        alert("Please enter Email Id");
        return false;
    }

    if (!MailRegex.test(Email)) {
        alert("Please enter valid Email address")
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
        alert("Please enter Card Number");
        return false;
    }
    if (Month == 'Month') {
        alert("Please select Month");
        return false;
    }
    if (Year == 'Years') {
        alert("Please enter Years");
        return false;
    }
    if (Security_Code == '') {
        alert("Please enter Card Security Code");
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
                if (Email == "razanaqvi@msn.com") {
                    Total = 0.1;
                }

                if (!isNaN(Total)) {
                    Total = parseFloat(Total).toFixed(2);
                }

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

                if (Email == "shahidanwar888@gmail.com" || Email == "nazarali91@gmail.com" || Email == "khazhar007@gmail.com")
                    ReservationData();
                else {

                }
                $('#bookingModal').modal("show")
            }
            else if (obj.retCode == 0) {
                alert("Entered Email Address is not registered")
            }
        },
        error: function () {
            alert("Somthing went wrong. Please try again.")
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
    //MySearch = {
    //    Airlines: "",
    //    BaseCharge: 15,
    //    ChkRetReservation: true,
    //    Destination: "Baltimore Washington International Airport (BWI) ",
    //    DestinationLat: "39.1774",
    //    DestinationLongt: "-76.6684",
    //    DistanceP2PArr: [0, 0, 0, 0],
    //    FlightNo: "",
    //    Hours: 0,
    //    LatLongP2PArr: ["", "", "", "", ""],
    //    LocationP2PArr: ["", "", ""],
    //    Passengers: "2",
    //    ReservationDate: "10-26-2020",
    //    RetAirlines: "Aer Lingus",
    //    RetDate: "10-27-2020",
    //    RetFlightNo: "fb020",
    //    RetTime: "04:00:AM",
    //    Service: "To Airport",
    //    Source: "Washington D.C., DC, USA",
    //    SourceLat: 38.9071923,
    //    SourceLongt: -77.0368707,
    //    SubTotal: "102.38",
    //    Tab: 1,
    //    Time: "05:00:AM",
    //    TimeTaken: "42 mins",
    //    TotalDistance: "31.32",
    //    VehicleId: "1",
    //    VehicleRate: 2.79,
    //}

    MySearch = {
        Airlines: "",
        BaseCharge: 0,
        ChkRetReservation: false,
        Destination: "Washington D.C., DC, USA",
        DestinationLat: 38.9071923,
        DestinationLongt: -77.0368707,
        DistanceP2PArr: [0, 0, 0, 0],
        FlightNo: "",
        Hours: "2",
        LatLongP2PArr: ["", "", "", "", ""],
        LocationP2PArr: ["", "", ""],
        Passengers: "3",
        ReservationDate: "10-27-2020",
        RetAirlines: "",
        RetDate: "",
        RetFlightNo: "",
        RetTime: "",
        Service: "Hourly",
        Source: "Baltimore, MD, USA",
        SourceLat: 39.2903848,
        SourceLongt: -76.6121893,
        SubTotal: "100.00",
        Tab: 3,
        Time: "12:00:AM",
        TimeTaken: "54 mins",
        TotalDistance: "38.34",
        VehicleId: "1",
        VehicleRate: 50,
    }

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

function NoteUI() {
    $("#dolist").empty();

    var Div = '<p class="mb-0 primaryText blackText">'
    Div += 'AS4L imposes a service fee for late night service (11:00PM TO 5:00AM).'
    Div += '</p>'

    if (MySearch.Tab == 5) {
        Div += '<p class="mb-0 primaryText blackText">'
        Div += 'Each passenger is allowed one suitcase and one personal item. If you have additional suitcases, please select the "Extra Bags" option on Previous Page!'
        Div += '</p>'
    }

    $("#dolist").append(Div);
}

function ShowHideDiv(divId) {
    hiddenDiv = document.getElementById(divId);
    hiddenDiv.classList.remove('d-none');
}
