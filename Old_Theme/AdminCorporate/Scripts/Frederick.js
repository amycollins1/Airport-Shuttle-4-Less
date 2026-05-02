$(document).ready(function () {
    GetAllFrederick();
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
            url: "Handler/FrederickHandler.asmx/AddFrederick",
            data: JSON.stringify({ Obj: data }),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var obj = JSON.parse(response.d);
                if (obj.retCode == 1) {
                    $('#AddNew').modal('hide')
                    GetAllFrederick();
                    alert("Frederick Name Inserted Successfully.")
                }
                else {
                    $('#SpnMessege').text("Something Went Wrong")
                    $('#ModelMessege').modal('show')
                }
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
}

function GetAllFrederick() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllFrederick",
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
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Name">' + List[i].Name + '</td>'
                    var status = List[i].IsActive;
                    if (status == true)
                        Div += '<td data-title="Status"><button type="button"  onclick="ActivateFrederick(' + List[i].Sid + ')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="ActivateFrederick(' + List[i].Sid + ')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'
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
    var data = { Sid: Sid }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetFrederick",
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
                alert("Something Went Wron.")
            }
        }
    });
}

function Update() {
    var Name = $('#Name').val()
    if (Name == '') {

        alert("Please Frederick Name")
        $("#Name").focus();
        return false;
    }
    var data = { Sid: Sid, Name: Name }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/UpdateFrederick",
        data: JSON.stringify({ Obj: data }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var Arr = obj.Arr;
                $('#Update').modal('hide')
                GetAllFrederick();
                alert("Frederick Name updated Successfully")
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

function ActivateFrederick(sid) {

    var data = {
        Sid: sid,
    }
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/ActivateFrederick",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                GetAllFrederick();
                alert("Frederick Status Updated.")
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
