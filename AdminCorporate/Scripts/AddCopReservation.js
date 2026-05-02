$(document).ready(function () {
    if (location.href.indexOf('?') != -1) {
        Sid = GetQueryStringParams('Sid');
        GetReservation();
    }
    else {
        PassengerBind("Loading")
        //GetAllAirLines()
        GetAllDropdown()
    }

    setTimeout(function () {
        var dateToday = new Date();
        $("#txt_Date").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "mm-dd-yy",
            minDate: dateToday
        });
    }, 200)
});

var ReservationDetail = '', IsCorp = false, IsDriver = false, IsBWI = false, CompanyName = '';
var AirlineList = '', AirlineDiv = '', IsPageLoad = true, Service = '', PickupAddress = '', DropAddress = '', Remark = '', DriverId = 0, IsCredit = false, TotalAmount = 0, Sid = 0;
var Airline1 = '', Airline2 = '', Airline3 = '', Airline4 = '', Airline5 = '', DeleteArr = new Array();
var Dates = '', Passenger = '', FnameList = new Array(), LnameList = new Array(), MobileList = new Array(), FlightList = new Array(), AirlineList = new Array(), TimeList = new Array();
function Submit() {
    var bValid = Validation()
    if (bValid) {
        var sts = '';
        if (DriverId == 0)
            sts = "Requested";
        else
            sts = "Confirmed";
        var objArr = new Array();
        objArr = {
            Sid: Sid,
            Passenger: Passenger,
            ReservationDate: Dates,
            PickupAddress: PickupAddress,
            DropAddress: DropAddress,
            Remark: Remark,
            Service: Service,
            CompanyName: CompanyName,
            DriverId: DriverId,
            TotalAmount: TotalAmount,
            IsCreditCard: IsCredit,
            Status: sts
        }
        $.ajax({
            type: "POST",
            url: "Handler/CorporativeHandler.asmx/AddReservation",
            data: JSON.stringify({ Reservation: objArr, FnameList: FnameList, LnameList: LnameList, MobileList: MobileList, FlightList: FlightList, AirlineList: AirlineList, TimeList: TimeList, IsCorp: IsCorp, IsDriver: IsDriver, IsBWI: IsBWI }),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
                if (result.retCode == 1) {
                    if (Sid != 0)
                        alert('Reservation Updated Successfully');
                    else
                        alert('Reservation Added Successfully');
                    setTimeout(function () {
                        window.location.href = 'CorpReservationList.aspx';
                    }, 200)
                }
            },
            error: function () {
            }
        });
    }
}

function GetReservation() {
    var Data = { Sid: Sid };
    $.ajax({
        url: "Handler/CorporativeHandler.asmx/GetReservation",
        type: "POST",
        data: JSON.stringify(Data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            ReservationDetail = obj.ReservationDetail;
            if (obj.retCode == 1) {
                
                GetAllDropdown()

                $("#Select_Service option").filter(function () {
                    return $(this).text() == ReservationDetail[0].Service;
                }).prop("selected", true);
                $("#Select_Passenger option").filter(function () {
                    return $(this).text() == ReservationDetail[0].Passenger;
                }).prop("selected", true);

                $("#txt_Remark").val(ReservationDetail[0].Remark)
                $("#ResNo").show();
                $("#ResNo").text("Reservation No: " + ReservationDetail[0].ReservationNo);
                $("#txt_Date").val(ReservationDetail[0].ReservationDate);
                PassengerBind("Loading")

                ResBinding();
                BindingAirline();
            }
        },
        error: function () {
        }
    });
}

function ResBinding() {

    $("#txt_Pickup").val(ReservationDetail[0].PickupAddress);
    $("#txt_Drop").val(ReservationDetail[0].DropAddress);

    for (var i = 0; i < ReservationDetail[0].Passenger; i++) {

        $('#txt_fName' + (parseInt(i) + 1)).val(ReservationDetail[i].FirstName);
        $('#txt_lName' + (parseInt(i) + 1)).val(ReservationDetail[i].LastName);
        $('#txt_MobileNo' + (parseInt(i) + 1)).val(ReservationDetail[i].MobileNo);
        //$('#Select_Airline' + (parseInt(i) + 1)+ 'option').filter(function () {
        //    return $(this).text() == ReservationDetail[i].Airline;
        //}).prop("selected", true);

        if (ReservationDetail[i].Service == "From") {
            $('#txt_FlightNo' + (parseInt(i) + 1)).val(ReservationDetail[i].FlightNo);

        }
        $('#txt_Time' + (parseInt(i) + 1)).val(SetTime(ReservationDetail[i].Time));
        if (ReservationDetail[i].TotalAmount != null)
            $('#txt_TotalAmount').val(ReservationDetail[i].TotalAmount);

        if (ReservationDetail[i].IsCreditCard)
            $("#chkCredit").prop('checked', true);
    }
}

function Validation() {
    FnameList = new Array();
    LnameList = new Array()
    MobileList = new Array()
    AirlineList = new Array()
    FlightList = new Array()
    TimeList = new Array()
    Dates = $("#txt_Date").val();

    if (Dates == "") {
        alert("Please enter date")
        return false;
    }
    var FnameId = '', LnameId = '', MobileId = '', AirlineId = '', FlightId = '', TimeId = ''
    for (var i = 0; i < Passenger; i++) {
        var Detail = $.grep(DeleteArr, function (p) { return p == i })
        if (Detail.length != 0)
            continue;
        FnameId = "#txt_fName" + (parseInt(i) + 1);
        if ($(FnameId).val() == '') {
            alert("Please enter passenger " + (parseInt(i) + 1) + " First Name")
            return false;
        }
        FnameList.push($(FnameId).val());

        LnameId = "#txt_lName" + (parseInt(i) + 1);
        if ($(LnameId).val() == '') {
            alert("Please enter passenger " + (parseInt(i) + 1) + " Last Name")
            return false;
        }
        LnameList.push($(LnameId).val());

        MobileId = "#txt_MobileNo" + (parseInt(i) + 1);
        if ($(MobileId).val() == '') {
            alert("Please enter passenger " + (parseInt(i) + 1) + " Mobile No")
            return false;
        }
        MobileList.push($(MobileId).val());

        if (Service == 'From') {
            //AirlineId = "Airline" + (parseInt(i) + 1);
            //if (AirlineId == '') {
            //    alert("Please select passenger " + (parseInt(i) + 1) + " Airline")
            //    return false;
            //}
            var Res = ValidateAirline(parseInt(i) + 1);
            if (!Res)
                return false;
            FlightId = "#txt_FlightNo" + (parseInt(i) + 1);
            if ($(FlightId).val() == '') {
                alert("Please enter passenger " + (parseInt(i) + 1) + " Flight No")
                return false;
            }
            FlightList.push($(FlightId).val());
        }

        TimeId = "#txt_Time" + (parseInt(i) + 1);
        if ($(TimeId).val() == '') {
            alert("Please enter passenger " + (parseInt(i) + 1) + " Time")
            return false;
        }
        TimeList.push($(TimeId).val());
    }
    PickupAddress = $("#txt_Pickup").val()
    DropAddress = $("#txt_Drop").val()
    //DropAddress='Bwi Station'
    Remark = $("#txt_Remark").val()
    DriverId = $("#Select_Driver option:selected").val()
    TotalAmount = $("#txt_TotalAmount").val()
    CompanyName = $("#Select_Company option:selected").val()
    Passenger = $("#Select_Passenger option:selected").val();
    if (CompanyName == '') {
        alert("Please select Comapny")
        return false;
    }
    if (PickupAddress == '') {
        alert("Please enter Pickup Address")
        return false;
    }
    if (DropAddress == '') {
        alert("Please enter Drop Address")
        return false;
    }
    if (TotalAmount == '') {
        alert("Please enter Total Amount")
        return false;
    }
    if ($("#chkCredit").is(":checked")) {
        IsCredit = true;
    }
    return true
}

function PassengerBind(Type) {
    $("#PassengerDetail").empty()
    Passenger = $("#Select_Passenger option:selected").val();
    var Div = '';
    Service = $("#Select_Service option:selected").val();

    if (Service == 'From') {
        $("#txt_Pickup").val('');
        $("#txt_Drop").val('17101 science drive Bowie, md 20715')
    }
    else {
        $("#txt_Pickup").val('17101 science drive Bowie, md 20715');
        $("#txt_Drop").val('')
    }
    for (var i = 0; i < Passenger; i++) {
        //Div += '<br /><div class="col-md-12">'
        //Div += '<div align="center">'
        //Div += '<center><span id="Spn_Location"><b>Drop Location</b></span></center>'
        //Div += '</div>'
        //Div += '</div>'

        if (i != 0) {
            Div += '<div class="col-md-12" style="visibility: hidden;">'
            Div += '<b>Passenger</b>'
            Div += '</div>'
        }

        if (i == 0)
            Div += '<div class="col-md-12"  align="center">'
        else
            Div += '<div class="col-md-12" style="margin-top:-15px"  align="center">'
        Div += '<br /><b>Passenger ' + (parseInt(i) + 1) + '</b>'
        if (location.href.indexOf('?') != -1 && Passenger != 1)
            Div += '<td align="center"><a style="cursor: pointer;color:#006699;margin-left: 10px" onclick="DeletePassenger(' + i + ')" href="#"><span class="glyphicon glyphicon-trash" title="Delete"></span></a></td>';
        Div += '</div>'

        //Div += '<br /><br /><div align="center" class="col-md-12">Drop Location</div>'

        //Div += '<div class="row"><br />'
        //Div += '<div align="center">'
        //Div += '<center><span id="Spn_Location"><b>Drop Location</b></span></center>'
        //Div += '</div>'
        //Div += '</div>'
        Div += '<div class="col-md-4">'
        Div += '<br />First Name :'
        Div += '<input type="text" name="Text[]" id="txt_fName' + (parseInt(i) + 1) + '" placeholder="" class="form-control" autocomplete="off"/>'
        Div += '</div>'
        Div += '<div class="col-md-4">'
        Div += '<br />Last Name :'
        Div += '<input type="text" name="Text[]" id="txt_lName' + (parseInt(i) + 1) + '" placeholder="" class="form-control" autocomplete="off"/>'
        Div += '</div>'
        Div += '<div class="col-md-4">'
        Div += '<br />Mobile No :'
        Div += '<input type="text" name="Text[]" id="txt_MobileNo' + (parseInt(i) + 1) + '" placeholder="" class="form-control" autocomplete="off"/>'
        Div += '</div>'
        if (Service == 'From') {
            Div += '<div class="col-md-4">'
            Div += '<br />Airline :'
            Div += '<input name="Text[]" id="Select_Airline' + (parseInt(i) + 1) + '" list="Select_Airline" placeholder="Select Airline" class="form-control" onblur="Airline' + (parseInt(i) + 1) + 'Blur()" />'
            //Div += '<datalist id="Select_Airlines' + (parseInt(i) + 1) + '"></datalist>'
            //Div += '<input name="Text[]" id="Select_Airline' + (parseInt(i) + 1) + '" list="Select_Airlines" placeholder="Select Airline" class="form-control" />'
            //Div += '<datalist id="Select_Airlines"></datalist>'
            Div += '</div>'
            Div += '<div class="col-md-4">'
            Div += '<br />Flight No :'
            Div += '<input type="text" name="Text[]" id="txt_FlightNo' + (parseInt(i) + 1) + '" placeholder="" class="form-control" />'
            Div += '</div>'
            Div += '<div class="col-md-4">'
            Div += '<br />Time :'
            Div += '<input type="time" name="Text[]" id="txt_Time' + (parseInt(i) + 1) + '" placeholder="Enter Time: HH:MM" class="form-control" autocomplete="off"/>'
            Div += '</div>'
        }
        else {
            Div += '<div class="col-md-4">'
            Div += '<br />Time :'
            Div += '<input type="time" name="Text[]" id="txt_Time' + (parseInt(i) + 1) + '" placeholder="Enter Time: HH:MM" class="form-control" />'
            Div += '</div>'
            Div += '<div class="col-md-4" style="visibility: hidden;">'
            Div += '<br />First Name :'
            Div += '<input type="text" name="Text[]" placeholder="First Name" class="form-control" />'
            Div += '</div>'
            Div += '<div class="col-md-4" style="visibility: hidden;">'
            Div += '<br />Last Name :'
            Div += '<input type="text" name="Text[]" placeholder="Last Name" class="form-control" />'
            Div += '</div>'
        }
    }
    $("#PassengerDetail").append(Div)
    if (Type == "Change" && Service == "From") {
        BindingAirline()
    }
    if (location.href.indexOf('?') != -1 && Type == "Change") {
        ResBinding();
    }
}

function DeletePassenger(Counter) {
    DeleteArr.push(Counter)
    var Div = '';
    var PCounter = 0;
    var Pass = $("#Select_Passenger option:selected").val();
    if (Pass == 1) {
        alert("You can not delete all passenger")
        return false;
    }
    $("#Select_Passenger option").filter(function () {
        return $(this).text() == Pass - 1;
    }).prop("selected", true);
    $("#PassengerDetail").empty()
    for (var i = 0; i < Passenger; i++) {
        var Detail = $.grep(DeleteArr, function (p) { return p == i })
        if (Detail.length == 0) {
            if (i != 0) {
                Div += '<div class="col-md-12" style="visibility: hidden;">'
                Div += '<b>Passenger</b>'
                Div += '</div>'
            }

            PCounter = PCounter + 1;
            if (i == 0)
                Div += '<div class="col-md-12"  align="center">'
            else
                Div += '<div class="col-md-12" style="margin-top:-15px"  align="center">'
            Div += '<br /><b>Passenger ' + PCounter + '</b>'
            if (Pass - 1 != 1)
                Div += '<td align="center"><a style="cursor: pointer;color:#006699;margin-left: 10px" onclick="DeletePassenger(' + i + ')" href="#"><span class="glyphicon glyphicon-trash" title="Delete"></span></a></td>';
            Div += '</div>'

            //Div += '<br /><br /><div align="center" class="col-md-12">Drop Location</div>'

            //Div += '<div class="row"><br />'
            //Div += '<div align="center">'
            //Div += '<center><span id="Spn_Location"><b>Drop Location</b></span></center>'
            //Div += '</div>'
            //Div += '</div>'
            Div += '<div class="col-md-4">'
            Div += '<br />First Name :'
            Div += '<input type="text" name="Text[]" id="txt_fName' + (parseInt(i) + 1) + '" placeholder="" class="form-control" autocomplete="off"/>'
            Div += '</div>'
            Div += '<div class="col-md-4">'
            Div += '<br />Last Name :'
            Div += '<input type="text" name="Text[]" id="txt_lName' + (parseInt(i) + 1) + '" placeholder="" class="form-control" autocomplete="off"/>'
            Div += '</div>'
            Div += '<div class="col-md-4">'
            Div += '<br />Mobile No :'
            Div += '<input type="text" name="Text[]" id="txt_MobileNo' + (parseInt(i) + 1) + '" placeholder="" class="form-control" autocomplete="off"/>'
            Div += '</div>'
            if (Service == 'From') {
                Div += '<div class="col-md-4">'
                Div += '<br />Airline :'
                Div += '<input name="Text[]" id="Select_Airline' + (parseInt(i) + 1) + '" list="Select_Airlines' + (parseInt(i) + 1) + '" placeholder="Select Airline" class="form-control" onblur="Airline' + (parseInt(i) + 1) + 'Blur()" />'
                Div += '<datalist id="Select_Airlines' + (parseInt(i) + 1) + '"></datalist>'
                //Div += '<input name="Text[]" id="Select_Airline' + (parseInt(i) + 1) + '" list="Select_Airlines" placeholder="Select Airline" class="form-control" />'
                //Div += '<datalist id="Select_Airlines"></datalist>'
                Div += '</div>'
                Div += '<div class="col-md-4">'
                Div += '<br />Flight No :'
                Div += '<input type="text" name="Text[]" id="txt_FlightNo' + (parseInt(i) + 1) + '" placeholder="" class="form-control" />'
                Div += '</div>'
                Div += '<div class="col-md-4">'
                Div += '<br />Time :'
                Div += '<input type="time" name="Text[]" id="txt_Time' + (parseInt(i) + 1) + '" placeholder="Enter Time: HH:MM" class="form-control" autocomplete="off"/>'
                Div += '</div>'
            }
            else {
                Div += '<div class="col-md-4">'
                Div += '<br />Time :'
                Div += '<input type="time" name="Text[]" id="txt_Time' + (parseInt(i) + 1) + '" placeholder="Enter Time: HH:MM" class="form-control" />'
                Div += '</div>'
                Div += '<div class="col-md-4" style="visibility: hidden;">'
                Div += '<br />First Name :'
                Div += '<input type="text" name="Text[]" placeholder="First Name" class="form-control" />'
                Div += '</div>'
                Div += '<div class="col-md-4" style="visibility: hidden;">'
                Div += '<br />Last Name :'
                Div += '<input type="text" name="Text[]" placeholder="Last Name" class="form-control" />'
                Div += '</div>'
            }
        }
    }
    //Passenger = Passenger - 1;
    $("#PassengerDetail").append(Div)
    if (Service == "From") {
        BindingAirline()
    }
    if (location.href.indexOf('?') != -1) {
        $("#txt_Pickup").val(ReservationDetail[0].PickupAddress);
        $("#txt_Drop").val(ReservationDetail[0].DropAddress);

        for (var i = 0; i < ReservationDetail[0].Passenger; i++) {
            var Detail = $.grep(DeleteArr, function (p) { return p == i })
            if (Detail.length == 0) {
                $('#txt_fName' + (parseInt(i) + 1)).val(ReservationDetail[i].FirstName);
                $('#txt_lName' + (parseInt(i) + 1)).val(ReservationDetail[i].LastName);
                $('#txt_MobileNo' + (parseInt(i) + 1)).val(ReservationDetail[i].MobileNo);
                //$('#Select_Airline' + (parseInt(i) + 1)+ 'option').filter(function () {
                //    return $(this).text() == ReservationDetail[i].Airline;
                //}).prop("selected", true);

                if (ReservationDetail[i].Service == "From") {
                    $('#txt_FlightNo' + (parseInt(i) + 1)).val(ReservationDetail[i].FlightNo);

                }
                $('#txt_Time' + (parseInt(i) + 1)).val(SetTime(ReservationDetail[i].Time));
                if (ReservationDetail[i].TotalAmount != null)
                    $('#txt_TotalAmount').val(ReservationDetail[i].TotalAmount);

                if (ReservationDetail[i].IsCreditCard)
                    $("#chkCredit").prop('checked', true);
            }
        }
    }
}

function GetAllAirLines() {
    //$("#Select_Airlines1").empty();
    $.ajax({
        url: "../Corporate/Handler/CorporativeHandler.asmx/GetAirLines",
        type: "POST",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);

            AirlineList = obj.List;
            if (obj.retCode == 1) {
                for (var i = 0; i < AirlineList.length; i++) {

                    AirlineDiv += '<option value="' + AirlineList[i].Name + '" >' + AirlineList[i].Name + '</option>'
                }
                BindingAirline()
            }
        },
        error: function () {
        }
    });
}

function BindingAirline() {
    $("#Select_Airlines1").empty();
    Passenger = $("#Select_Passenger option:selected").val();

    for (var i = 0; i < Passenger; i++) {
        Id = "#Select_Airlines" + (parseInt(i) + 1);
        $(Id).append(AirlineDiv);
        if (location.href.indexOf('?') != -1 && ReservationDetail[i] != undefined) {

            $('#Select_Airline' + (parseInt(i) + 1)).val(ReservationDetail[i].Airline);
            if (i == 0)
                Airline1 = ReservationDetail[i].Airline;
            else if (i == 1)
                Airline2 = ReservationDetail[i].Airline;
            else if (i == 2)
                Airline3 = ReservationDetail[i].Airline;
            else if (i == 3)
                Airline4 = ReservationDetail[i].Airline;
            else if (i == 4)
                Airline5 = ReservationDetail[i].Airline;
        }
    }
}

function GetAllDropdown() {
    $("#Select_Driver").empty();
    $.ajax({
        url: "Handler/CorporativeHandler.asmx/GetAllDropdown",
        type: "POST",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '<option value="0">Select Driver</option>';
            var DriverList = obj.DriverList;
            var CompanyList = obj.CompanyList;
            if (obj.retCode == 1) {
                for (var i = 0; i < DriverList.length; i++) {

                    Div += '<option value="' + DriverList[i].Sid + '" >' + DriverList[i].FirstName + ' ' + DriverList[i].LastName + '</option>'
                }
                $("#Select_Driver").append(Div);
                if (location.href.indexOf('?') != -1) {
                    $("#Select_Driver option").filter(function () {
                        return $(this).val() == ReservationDetail[0].DriverId;
                    }).prop("selected", true);
                }
                Div = '<option value="" >Select Company</option>';
                for (var i = 0; i < CompanyList.length; i++) {

                    Div += '<option value="' + CompanyList[i].CompanyName + '" >' + CompanyList[i].CompanyName + '</option>'
                }
                $("#Select_Company").append(Div);
                if (location.href.indexOf('?') != -1) {
                    $("#Select_Company option").filter(function () {
                        return $(this).text() == ReservationDetail[0].CompanyName;
                    }).prop("selected", true);
                }
            }
        },
        error: function () {
        }
    });
}

function ValidateAirline(No) {
    if (No == "1" && Airline1 == "") {
        alert('Please select passenger 1 airline')
        return false;
    }
    else if (No == "2" && Airline2 == "") {
        alert('Please select passenger 2 airline')
        return false;
    }
    else if (No == "3" && Airline3 == "") {
        alert('Please select passenger 3 airline')
        return false;
    }
    else if (No == "4" && Airline4 == "") {
        alert('Please select passenger 4 airline')
        return false;
    }
    else if (No == "5" && Airline5 == "") {
        alert('Please select passenger 5 airline')
        return false;
    }
    if (No == "1")
        AirlineList.push(Airline1);
    else if (No == "2")
        AirlineList.push(Airline2);
    else if (No == "3")
        AirlineList.push(Airline3);
    else if (No == "4")
        AirlineList.push(Airline4);
    else if (No == "5")
        AirlineList.push(Airline5);
    return true;
}

function Airline1Blur() {
    Airline1 = $('#Select_Airline option').filter(function () {
        return this.value == $("#Select_Airline1").val();
    }).val();
    if (Airline1 == undefined) {
        Airline1 = '';
        alert('Please select passenger 1 airline')
        return false;
    }
}
function Airline2Blur() {
    Airline2 = $('#Select_Airlines2 option').filter(function () {
        return this.value == $("#Select_Airline2").val();
    }).val();
    if (Airline2 == undefined) {
        Airline2 = '';
        alert('Please select passenger 2 airline')
        return false;
    }
}
function Airline3Blur() {
    Airline3 = $('#Select_Airlines3 option').filter(function () {
        return this.value == $("#Select_Airline3").val();
    }).val();
    if (Airline3 == undefined) {
        Airline3 = '';
        alert('Please select passenger 3 airline')
        return false;
    }
}
function Airline4Blur() {
    Airline4 = $('#Select_Airlines4 option').filter(function () {
        return this.value == $("#Select_Airline4").val();
    }).val();
    if (Airline4 == undefined) {
        Airline4 = '';
        alert('Please select passenger 4 airline')
        return false;
    }
}
function Airline5Blur() {
    Airline5 = $('#Select_Airlines5 option').filter(function () {
        return this.value == $("#Select_Airline5").val();
    }).val();
    if (Airline5 == undefined) {
        Airline5 = '';
        alert('Please select passenger 5 airline')
        return false;
    }
}

function CheckCorpEmail() {
    if (IsCorp)
        IsCorp = false;
    else
        IsCorp = true;
}

function CheckDriverEmail() {
    if (IsDriver)
        IsDriver = false;
    else
        IsDriver = true;
}

function CheckBWIEmail() {
    if (IsBWI)
        IsBWI = false;
    else
        IsBWI = true;
}

function ChangeCompany() {
    var txt = CompanyName = $("#Select_Company option:selected").val()
    if (txt == 'JHopkins') {
        $("#txt_Drop").val('')
    }
    else
        $("#txt_Drop").val('17101 science drive Bowie, md 20715')
}

function SetTime(Time) {
    //debugger;
    try {
        var time = Time.split(":");
        if (time.length == 3) {
            var hours = Number(time[0]);
            var minutes = Number(time[1]);
            var AMPM = time[2];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            //alert(sHours + ":" + sMinutes);
            return (sHours + ":" + sMinutes);
        }
        else
            return Time;
    }
    catch (ex) { }
}
