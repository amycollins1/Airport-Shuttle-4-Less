var CustomerList = '', VehicleList = '', OfferList = '', DriverList = '', HaltSettingList = [];
var Sid = 0;


function GetAllDriverCustomer() {
    $.ajax({
        url: "../Admin/Handler/AdminHandler.asmx/GetAllDriverCustomer",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#Select_Email").empty();
                CustomerList = $.grep(obj.List, function (p) { return p.UserType == "Customer" && p.IsActive == true })
                //CustomerList = obj.List;
                for (var i = 0; i < CustomerList.length; i++) {
                    Div += '<option value="' + CustomerList[i].Email + '" >' + CustomerList[i].Email + '</option>'
                }
                $("#Select_Email").append(Div);

                // Customer Number
                Div = '';
                for (var i = 0; i < CustomerList.length; i++) {
                    Div += '<option value="' + CustomerList[i].MobileNo + '" >' + CustomerList[i].MobileNo + '</option>'
                }
                $("#Select_ContactNumber").append(Div);

                // Driver
                DriverList = $.grep(obj.List, function (p) { return p.UserType == "Driver" && p.IsActive == true})
                Div = '<option value="0">--Select Driver --</option>';
                for (var i = 0; i < DriverList.length; i++) {
                    Div += '<option value="' + DriverList[i].Sid + '" >' + DriverList[i].FirstName + ' ' + DriverList[i].LastName + '</option>'
                }
                $("#Select_Driver").append(Div);
                if (ReservationDetail.DriverId != 0) {
                    $("#Select_Driver option").each(function () {
                        if ($(this).val() == ReservationDetail.DriverId) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                    DriverId = ReservationDetail.DriverId
                    //DriverPercent = ReservationDetail.DriverPercent
                }
            }
            else if (obj.retCode == 0) {
                //ConfirmBooking();
                ValidationMessage("Unable to load Email Address")
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function GetAllVehicle() {
    $.ajax({
        url: "../Admin/Handler/AdminHandler.asmx/GetAllVehicle",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '<option value="0">--Select Vehicle --</option>';
            if (obj.retCode == 1) {
                $("#Select_Vehicle").empty();
                VehicleList = obj.List;
                for (var i = 0; i < VehicleList.length; i++) {
                    Div += '<option value="' + VehicleList[i].Sid + '" >' + VehicleList[i].Model + '</option>'
                }
                $("#Select_Vehicle").append(Div);
                if (Sid != 0) {
                    $("#Select_Vehicle option").each(function () {
                        if ($(this).val() == ReservationDetail.VehicleId) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                    //VehicleChange()
                }
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

var ListADCH = [];
function LoadFredrickVehicles(VehclId) {
    $("#VehicleList").empty();
   
    var tr = '';
    var Service = $("#Select_Service").val();
    var Tab = 5;
    var AirpotID = $("#SelAirport").val();
    var LocationID = $("#Select_Location").val();
    var Passengers = $("#Passengers").val();
    var data = { Service: Service, Tab: Tab, AirpotID: AirpotID, LocationID: LocationID, Passengers: Passengers }
    $.ajax({
        type: "POST",
        url: "../Admin/Handler/AdminHandler.asmx/LoadFredrickCars",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                VehicleList = obj.VehInfo;
                ListADCH = obj.ListADCH; 

                var Content = '';
                if (Tab == "5") {
                     $("#Select_Vehicle").empty();
                    var Div = '<option value="0">--Select Vehicle --</option>';
                    for (var i = 0; i < VehicleList.length; i++) {
                        for (var i = 0; i < VehicleList.length; i++) {
                            Div += '<option value="' + VehicleList[i].VehicleID + '" >' + VehicleList[i].VehicleModel + '</option>'
                        }
                        $("#Select_Vehicle").append(Div);
                    }
                    if (Sid != 0) {
                        $("#Select_Vehicle option").each(function () {
                            if ($(this).val() == VehclId) {
                                $(this).attr("selected", "selected");
                                return;
                            }
                        });
                        //VehicleChange()
                    }
                }
            }
            else if (obj.retCode == 2) {
                $('#SpnMessege').text("No Record Found")
                $('#ModelMessege').modal('show')
            }
            else if (obj.retCode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function GetAllDriver() {
    $.ajax({
        url: "../Admin/Handler/AdminHandler.asmx/GetAllDriver",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
          
            if (obj.retCode == 1) {
                $("#Select_Driver").empty();
                DriverList = obj.List;
                sessionStorage.setItem("DriverListStorage", JSON.stringify(DriverList));
                BindDriver()
                //if (Sid != 0) {
                //    $("#Select_Vehicle option").each(function () {
                //        if ($(this).val() == ReservationDetail.VehicleId) {
                //            $(this).attr("selected", "selected");
                //            return;
                //        }
                //    });
                //    VehicleChange()
                //}
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function BindDriver() {
    var Div = '<option value="0">--Select Driver --</option>';
    for (var i = 0; i < DriverList.length; i++) {
        Div += '<option value="' + DriverList[i].Sid + '" >' + DriverList[i].FirstName + ' ' + DriverList[i].LastName + '</option>'
    }
    $("#Select_Driver").append(Div);
}

function GetAllOffer() {
    $.ajax({
        url: "../Admin/Handler/AdminHandler.asmx/GetAllOffer",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '<option value="">--Select Offer --</option>';
            if (obj.retCode == 1) {
                $("#SelOffer").empty();
                OfferList = $.grep(obj.List, function (p) { return p.IsActive == true })
                //OfferList = obj.List;
                for (var i = 0; i < OfferList.length; i++) {
                    Div += '<option value="' + OfferList[i].Name + '" >' + OfferList[i].Name + '</option>'
                }
                $("#SelOffer").append(Div);
                if (Sid != 0 && ReservationDetail.OfferDetail != "") {
                    IsOfferApply = true;
                    var Splitter = (ReservationDetail.OfferDetail).split('^')
                    OfferDetail = ReservationDetail.OfferDetail
                    OfferAmount = Splitter[2]
                    $("#SelOffer option").each(function () {
                        if ($(this).val() == Splitter[1]+"%") {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                }
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function TodayDate() {
    var today = new Date();
    var dd = today.getDate();
    if (dd <= 9)
        dd = "0" + dd;
    var mm = today.getMonth() + 1; //January is 0!
    if (mm <= 9)
        mm = "0" + mm;
    var yyyy = today.getFullYear();
    //var dt = dd + "-" + mm + "-" + yyyy;
    var dt = mm + "-" + dd + "-" + yyyy;
    var hr = today.getHours()
    var Min = today.getMinutes()
    return dt + " " + hr + ":" + Min
}

function Time24To12(time24) {
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    // Determine AM or PM suffix
    let period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    // Format minutes to be two digits if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Return the formatted time
    return `${hours}:${minutes}:${period}`;
}

function convertTime12to24(MyTime) {
    var hours = parseInt(MyTime.substr(0, 2));
    var StrHrs = MyTime.split(':')[0]
    if (MyTime.indexOf('AM') != -1 && hours == 12) {
        MyTime = MyTime.replace('12', '0');
    }
    if (MyTime.indexOf('PM') != -1 && hours < 12) {
        MyTime = MyTime.replace(StrHrs, (hours + 12));
    }
    return (MyTime.replace(/(:AM|:PM)/, '')).trim();
}

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function AddCustomer() {

    var Name = $("#RegFName").val();
    var LName = $("#RegLName").val();
    var Gender = $("#SelGender").val();
    var Phone = $("#RegPhoneNo").val();
    var Address = $("#RegAddress").val();
    var Email = $("#RegEmailAddress").val();
    var Password = $("#RegPassword").val();

    if (Name == '') {
        alert("Please Enter First Name");
        return false;
    }
    if (LName == '') {
        alert("Please Enter Last Name");
        return false;
    }
    if (Phone == '') {
        alert("Please Enter Phone Number");
        return false;
    }
    if (Address == '') {
        alert("Please Enter Address");
        return false;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (Email == '') {
        alert("Please Enter Email");
        return false;
    }
    if (!emailReg.test(Email)) {
        alert("Please enter valid Email ID");
        return false;
    }

    if (Password == '') {
        alert("Please Enter Password");
        return false;
    }
    var DataArr = {
        FirstName: Name,
        LastName:LName,
        Gender: Gender,
        MobileNo: Phone,
        Email: Email,
        Password: Password,
        Address: Address,
        UserType: "Customer",
        IsActive: true,
        CreatedDate:TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "../Admin/Handler/AdminHandler.asmx/AddCustomer",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                $("#addcustomer").hide();
                Success("Added Successfully.")
                window.location.reload();
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function AddUser() {

    var Name = $("#RegFName").val();
    var LName = $("#RegLName").val();
    var Gender = $("#SelGender").val();
    var Phone = $("#RegPhoneNo").val();
    var Address = $("#RegAddress").val();
    var Email = $("#RegEmailAddress").val();
    var Password = $("#RegPassword").val();

    if (Name == '') {
        alert("Please Enter First Name");
        return false;
    }
    if (LName == '') {
        alert("Please Enter Last Name");
        return false;
    }
    if (Phone == '') {
        alert("Please Enter Phone Number");
        return false;
    }
    if (Address == '') {
        alert("Please Enter Address");
        return false;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (Email == '') {
        alert("Please Enter Email");
        return false;
    }
    if (!emailReg.test(Email)) {
        alert("Please enter valid Email ID");
        return false;
    }

    if (Password == '') {
        alert("Please Enter Password");
        return false;
    }
    var DataArr = {
        FirstName: Name,
        LastName: LName,
        Gender: Gender,
        MobileNo: Phone,
        Email: Email,
        Password: Password,
        Address: Address,
        UserType: $('#UserType').val(),
        IsActive: true,
        CreatedDate: TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "../Admin/Handler/AdminHandler.asmx/AddCustomer",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                $("#addcustomer").hide();
                Success("Added Successfully.")
                window.location.reload();
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function AddAdmin() {

    var Name = $("#RegFName").val();
    var LName = $("#RegLName").val();
    var Gender = $("#SelGender").val();
    var Phone = $("#RegPhoneNo").val();
    var Address = $("#RegAddress").val();
    var Email = $("#RegEmailAddress").val();
    var Password = $("#RegPassword").val();

    if (Name == '') {
        alert("Please Enter First Name");
        return false;
    }
    if (LName == '') {
        alert("Please Enter Last Name");
        return false;
    }


    if (Phone == '') {
        alert("Please Enter Phone Number");
        return false;
    }
    if (Address == '') {
        alert("Please Enter Address");
        return false;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (Email == '') {
        alert("Please Enter Email");
        return false;
    }
    if (!emailReg.test(Email)) {
        alert("Please enter valid Email ID");
        return false;
    }

    if (Password == '') {
        alert("Please Enter Password");
        return false;
    }
    var DataArr = {
        FirstName: Name,
        LastName: LName,
        Gender: Gender,
        MobileNo: Phone,
        Email: Email,
        Password: Password,
        Address: Address,
        UserType: "Admin",
        IsActive: true,
        CreatedDate: TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "../Admin/Handler/AdminHandler.asmx/AddAdmin",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) { 
                Success("Admin Added Successfully.")
                window.location.reload();
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function AddDispatcher() {

    var Name = $("#RegFName").val();
    var LName = $("#RegLName").val();
    var Gender = $("#SelGender").val();
    var Phone = $("#RegPhoneNo").val();
    var Address = $("#RegAddress").val();
    var Email = $("#RegEmailAddress").val();
    var Password = $("#RegPassword").val();

    if (Name == '') {
        alert("Please Enter First Name");
        return false;
    }
    if (LName == '') {
        alert("Please Enter Last Name");
        return false;
    }


    if (Phone == '') {
        alert("Please Enter Phone Number");
        return false;
    }
    if (Address == '') {
        alert("Please Enter Address");
        return false;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (Email == '') {
        alert("Please Enter Email");
        return false;
    }
    if (!emailReg.test(Email)) {
        alert("Please enter valid Email ID");
        return false;
    }

    if (Password == '') {
        alert("Please Enter Password");
        return false;
    }
    var DataArr = {
        FirstName: Name,
        LastName: LName,
        Gender: Gender,
        MobileNo: Phone,
        Email: Email,
        Password: Password,
        Address: Address,
        UserType: "Dispatcher",
        IsActive: true,
        CreatedDate: TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "../Admin/Handler/AdminHandler.asmx/AddDispatcher",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) { 
                Success("Dispatcher Added Successfully.")
                window.location.reload();
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function GetHaltSettings() {
    $.ajax({
        url: "../Admin/Handler/AdminHandler.asmx/GetHaltSettings",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                HaltSettingList = obj.List;
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function GetA4SLAirports(AirpName) {
    $("#SelAirport").empty();
    $.ajax({
        url: "/Admin/Handler/AdminHandler.asmx/GetA4SLAirports",
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
                    $("#SelAirport").empty();
                    var ddlRequest = '<option value="-" selected="selected">Select</option>';
                    for (i = 0; i < AirportList.length; i++) {
                        //ddlRequest += '<option value="' + AirportList[i].Sid + '">' + AirportList[i].Name + '</option>';
                        ddlRequest += '<option value="' + AirportList[i].AirportID + ',' + AirportList[i].Latitute + ',' + AirportList[i].Longitude + ',' + AirportList[i].Name + '">' + AirportList[i].Name + '</option>';
                    }
                    $("#SelAirport").append(ddlRequest);
                    if (AirpName != null)
                    {
                        $("#SelAirport option").each(function () {
                            if ($(this).text() == AirpName) {
                                $(this).attr("selected", "selected");
                                return;
                            }
                        });
                    }                   
                }
            }
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

function GetAirports(AirpName) {
    $.ajax({
        url: "../Admin/Handler/FrederickHandler.asmx/GetAllActivatedAirport",
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
                    $("#SelAirport").empty();
                    var ddlRequest = '<option value="-" selected="selected">Select</option>';
                    for (i = 0; i < AirportList.length; i++) {
                        ddlRequest += '<option value="' + AirportList[i].Sid + '">' + AirportList[i].Name + '</option>';
                    }
                    $("#SelAirport").append(ddlRequest);
                    if (AirpName != null)
                    {
                        $("#SelAirport option").each(function () {
                            if ($(this).text() == AirpName) {
                                $(this).attr("selected", "selected");
                                return;
                            }
                        });
                    }                   
                }
            }
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

function GetFredricks(FredName) {

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
                $("#Select_Location").empty();
                var ddlRequest = '<option value="-" selected="selected">Select</option>';
                for (i = 0; i < FredrickList.length; i++) {
                    ddlRequest += '<option value="' + FredrickList[i].Sid + '">' + FredrickList[i].Name + '</option>';
                }
                $("#Select_Location").append(ddlRequest);
                if (FredName != null)
                {
                    $("#Select_Location option").each(function () {
                        if ($(this).text() == FredName) {
                            $(this).attr("selected", "selected");
                            return;
                        }
                    });
                    setTimeout(LoadFredrickVehicles(ReservationDetail.VehicleId), 2000);
                }
            }
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

//function setCookie(cname, cvalue, exHrs) {
//    var d = new Date();
//    d.setTime(d.getTime() + (exHrs * 60 * 60 * 1000));
//    var expires = "expires=" + d.toUTCString();
//    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//}

//function getCookie(cname) {
//    var name = cname + "=";
//    var decodedCookie = decodeURIComponent(document.cookie);
//    var ca = decodedCookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}

//function clearCookies(name) {
//    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
//}
