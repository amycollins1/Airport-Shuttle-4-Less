$(document).ready(function () {
    GetAllAirport();
});

var Name;
var Details;
var Sid = 0;

function Add() {
    if ($("#txt_Mname").val() == "") {
        alert("Please enter Name")
        return false;
    }
    else {
        Name = $("#txt_Mname").val();
        var data = {
            Name: Name,
            IsActive: true
        }
        $.ajax({
            type: "POST",
            url: "Handler/FrederickHandler.asmx/AddAirport",
            data: JSON.stringify({ Obj: data }),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var obj = JSON.parse(response.d);
                if (obj.retCode == 1) {
                    $('#AddNew').modal('hide')
                    GetAllAirport();
                    alert("Airport Name Inserted Successfully.")
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

function GetAllAirport() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllAirport",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var List = obj.Arr;
            //var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var Div = '';
            $("#Details").empty();
            if (obj.retCode == 1) {
                for (var i = 0; i < List.length; i++) {

                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Name">' + List[i].Name + '</td>'
                    var status = List[i].IsActive;
                    if (status == true)
                        Div += '<td data-title="Status"><button type="button"  onclick="ActivateAirport(' + List[i].Sid + ')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="ActivateAirport(' + List[i].Sid + ')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="UpdateDilogBox(' + List[i].Sid + ')" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    Div += '</tr>'

                    //Div += '<tr class="odd">'
                    //Div += '<td class=" " style="width:2%">' + (i + 1) + '</td>'
                    //Div += '<td class=" ">' + List[i].Name + '</td>'
                    //var status = List[i].IsActive;
                    //if (status == true) {
                    //    Div += '<td align="center" style="width:20%"><span class="glyphicon glyphicon-eye-open" onclick="ActivateAirport(' + List[i].Sid + ')" style="cursor:pointer" title="Activate/Deactivate"></span></td>'
                    //}
                    //else {
                    //    Div += '<td align="center" style="width:20%"><span class="glyphicon glyphicon-eye-close" onclick="ActivateAirport(' + List[i].Sid + ')" style="cursor:pointer" title="Activate/Deactivate"></span></td>'
                    //}
                    ////Div += '<td align="center" class=" "><a style="cursor: pointer" onclick="UpdateDilogBox(' + List[i].sid + ')" href="#"><span class="glyphicon glyphicon-edit" title="Edit" aria-hidden="true"></span></a>&nbsp;&nbsp;| <a style="cursor: pointer" href="#"><span class="glyphicon glyphicon-trash" title="Delete" aria-hidden="true" style="cursor: pointer" onclick="Delete(' + List[i].sid + ')"></span></a></td>'
                    //Div += '<td align="center" class=" "><a style="cursor: pointer" onclick="UpdateDilogBox(' + List[i].Sid + ')" href="#"><span class="glyphicon glyphicon-edit" title="Edit" aria-hidden="true"></span></a>&nbsp;&nbsp;</td>'
                    //Div += '</tr>'
                }
                $("#Details").append(Div);
            }
        }
    });
}

function Delete(sid) {

    var data = { Sid: sid }

    $.ajax({
        type: "POST",
        url: "VehicleManufacturerHandler.asmx/Delete",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var Arr = obj.Arr;

                GetAllManufacturer();
                $('#SpnMessege').text("Record Deleted")
                $('#ModelMessege').modal('show')

            }

            else if (obj.retCode == -1) {
                $('#SpnMessege').text("Record is not Deleted")
                $('#ModelMessege').modal('show')
            }

            else if (obj.retCode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function UpdateDilogBox(sid) {
    Sid = sid;
    var data = { Sid: Sid }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAirport",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var Arr = obj.Arr;

                $('#Name').val(Arr[0].Name);
                $('#Update').modal('show')
            }
            else if (obj.retCode == -1) {
                alert("Record is not updated Successfully")
            }
            else if (obj.retCode == 0) {
                alert("Something Went Wrong.")
            }
        }
    });
}

function UpdateAirport() {
    var Name = $('#Name').val()
    if (Name == '') {

        alert("Please Airport Name")
        return false;
    }
    var data = { Sid: Sid, Name: Name }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/UpdateAirport",
        data: JSON.stringify({ Obj: data }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var Arr = obj.Arr;
                $('#Update').modal('hide')
                GetAllAirport();
                alert("Airport Name updated Successfully")
            }
            else if (obj.retCode == -1) {
                alert("Record is not updated")
            }
            else if (obj.retCode == 0) {
                alert("Something Went Wrong.")
            }
        }
    });
}

function ActivateAirport(sid) {

    var data = {
        Sid: sid,
    }
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/ActivateAirport",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                alert("Airport Status Updated.");
                GetAllAirport();
            }

            else if (obj.retCode == -1) {
                alert("Record not Deactivated")
            }

            else if (obj.retCode == 0) {
                alert("Something Went Wrong.")
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function AddNew() {
    $("#txt_Mname").val('')
    $("#AddNew").modal("show")
}