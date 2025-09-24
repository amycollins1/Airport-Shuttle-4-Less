$(document).ready(function () {
    GetAllRate();
    FrederickDropDown();
    AirportDropDown();
    GetAllVehicles();
});

var Rate = 0;
var VehicleRate = 0;
var FrederickId = 0;
var AirportId = 0;
var VehicleId = 0;
var Details;
var Sid = 0;
var data;

function Add() {
    Rate = $("#txt_Rate").val();
    VehicleRate = $("#txt_VehicleRate").val();
    FrederickId = $("#ddl_FredrickName option:selected").val();
    AirportId = $("#ddl_AirportName option:selected").val();
    VehicleId = $("#ddl_Vehicle option:selected").val();

    if (FrederickId == 0) {
        alert("Please Select Frederick Name")
        return false;
    }
    else if (AirportId == 0) {
        alert("Please Select Airport Name")
        return false;
    }
    else if (Rate == "") {
        alert("Please Enter Rate");
        return false;
    }
    else if (VehicleId == 0) {
        alert("Please Select Vehicle")
        return false;
    }
    else if (VehicleRate == "") {
        alert("Please Enter Vehicle Rate");
        return false;
    }
    else {
        data = {
            Rate: Rate,
            FredrickId: FrederickId,
            AirportId: AirportId,
            VehicleId: VehicleId,
            VehicleRate: VehicleRate,
            IsActive: true,
        }

        $.ajax({
            type: "POST",
            url: "Handler/FrederickHandler.asmx/AddRate",
            data: JSON.stringify({ Obj: data }),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var obj = JSON.parse(response.d);
                if (obj.retCode == 1) {
                    $('#AddNew').modal('hide')
                    GetAllRate();
                    alert("Rate Inserted Successfully.")
                    $("#txt_Rate").val('');
                    //$("#ddl_FredrickName option:selected").val();
                    //$("#ddl_AirportName option:selected").val();
                }
                else if (obj.retCode == -1) {
                    //$('#AddNew').modal('hide')
                    alert("Rate Already Exist");
                }
                else {
                    alert("Something Went Wrong")
                }
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
}

function GetAllRate() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllRate",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var List = obj.Arr;
            var Div = '';
            $("#Details").empty();
            if (obj.retCode == 1) {
                for (var i = 0; i < List.length; i++) {
                    Div += '<tr class="odd">'
                    Div += '<td class=" " style="width:8%">' + (i + 1) + '</td>'
                    Div += '<td class=" ">' + List[i].FredrickName + '</td>'
                    Div += '<td class=" ">' + List[i].AirportName + '</td>'
                    Div += '<td class=" ">' + List[i].Rate + '</td>'
                    Div += '<td class=" ">' + List[i].Model + '</td>'
                    //Div += '<td class=" ">' + List[i].VehicleRate + '</td>'
                    var status = List[i].IsActive;
                    if (status == true)
                        Div += '<td data-title="Status"><button type="button"  onclick="ActivateRate(' + List[i].Sid + ')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="ActivateRate(' + List[i].Sid + ')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="UpdateDilogBox(' + List[i].Sid + ')" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    Div += '</tr>'
                }
                $("#Details").append(Div);
            }
        }
    });
}

function UpdateDilogBox(sid) {
    Sid = sid;
    data = { Sid: Sid }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetRate",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var Arr = obj.Arr;

                $("#ddl_FredrickName_Update option").each(function () {
                    if ($(this).html() == Arr[0].FredrickName) {
                        $(this).attr("selected", "selected");
                        return;
                    }
                });
                $("#ddl_AirportName_Update option").each(function () {
                    if ($(this).html() == Arr[0].AirportName) {
                        $(this).attr("selected", "selected");
                        return;
                    }
                });
                $("#ddl_Vehicle_Update option").each(function () {
                    if ($(this).val() == Arr[0].VehicleId) {
                        $(this).attr("selected", "selected");
                        return;
                    }
                });
                $('#txt_Rate_Update').val(Arr[0].Rate);
                $('#txt_VehicleRate_Update').val(Arr[0].VehicleRate);
                $('#Update').modal('show')
            }
            else if (obj.retCode == -1) {
                $('#SpnMessege').text("Record is not updated Successfully")
                $('#ModelMessege').modal('show')
            }
            else if (obj.retCode == 0) {
                $('#SpnMessege').text("Something Went Wron.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function UpdateRate() {
    Rate = $("#txt_Rate_Update").val();
    FrederickId = $("#ddl_FredrickName_Update option:selected").val();
    AirportId = $("#ddl_AirportName_Update option:selected").val();
    VehicleRate = $("#txt_VehicleRate_Update").val();
    VehicleId = $("#ddl_Vehicle_Update option:selected").val();

    if (FrederickId == 0) {
        alert("Please Select Frederick Name")
        return false;
    }
    else if (AirportId == 0) {
        alert("Please Select Airport Name")
        return false;
    }
    else if (Rate == "") {
        alert("Please Enter Rate");
        return false;
    }
    else if (VehicleId == 0) {
        alert("Please Select Vehicle")
        return false;
    }
    else if (VehicleRate == "") {
        alert("Please Enter Vehicle Rate");
        return false;
    }
    else {
        data = {
            Sid: Sid,
            Rate: Rate,
            FredrickId: FrederickId,
            AirportId: AirportId,
            VehicleId: VehicleId,
            VehicleRate: VehicleRate,
            IsActive: true,
        }
    }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/UpdateRate",
        data: JSON.stringify({ Obj: data }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                $('#Update').modal('hide')
                GetAllRate();
                $('#SpnMessege').text("Rate updated Successfully")
                $('#ModelMessege').modal('show')
                $("#txt_Rate_Update").val('');
            }
            else if (obj.retCode == -1) {
                $('#SpnMessege').text("Record is not updated")
                $('#ModelMessege').modal('show')
            }
            else if (obj.retCode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function ActivateRate(sid) {

    data = {
        Sid: sid,
    }
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/ActivateRate",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                GetAllRate();
                $('#SpnMessege').text("Rate Status Updated.")
                $('#ModelMessege').modal('show')
            }
            else if (obj.retCode == -1) {
                $('#SpnMessege').text("Record not Deactivated")
                $('#ModelMessege').modal('show')
            }
            else if (obj.retCode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function FrederickDropDown() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllActivatedFrederick",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Frederick = obj.Arr;

            $("#ddl_FredrickName").empty();
            $("#ddl_FredrickName_Update").empty();

            var Div = "";
            Div += '<option value="0">--Select Frederick Name--</option>'

            if (obj.retCode == 1) {
                for (var i = 0; i < Frederick.length; i++) {

                    Div += '<option value="' + Frederick[i].Sid + '" >' + Frederick[i].Name + '</option>'
                }
                $("#ddl_FredrickName").append(Div);
                $("#ddl_FredrickName_Update").append(Div);
            }
        }
    });
}

function AirportDropDown() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllActivatedAirport",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Airport = obj.Arr;

            $("#ddl_AirportName").empty();
            $("#ddl_AirportName_Update").empty();

            var Div = "";
            Div += '<option value="0">--Select Airport Name--</option>'

            if (obj.retCode == 1) {
                for (var i = 0; i < Airport.length; i++) {

                    Div += '<option value="' + Airport[i].Sid + '" >' + Airport[i].Name + '</option>'
                }
                $("#ddl_AirportName").append(Div);
                $("#ddl_AirportName_Update").append(Div);
            }
        }
    });
}

function GetAllVehicles() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllVehicles",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var List = obj.Arr;

            $("#ddl_Vehicle").empty();
            $("#ddl_Vehicle_Update").empty();

            var Div = "";
            Div += '<option value="0">--Select Vehicle Name--</option>'

            if (obj.retCode == 1) {
                for (var i = 0; i < List.length; i++) {

                    Div += '<option value="' + List[i].Sid + '" >' + List[i].Model + '</option>'
                }
                $("#ddl_Vehicle").append(Div);
                $("#ddl_Vehicle_Update").append(Div);
            }
        }
    });
}

function AddNew() {
    $("#txt_Mname").val('')
    $("#AddNew").modal("show")
}