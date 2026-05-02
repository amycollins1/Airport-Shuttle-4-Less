
$(document).ready(function () {


    LoadCarDetails()

});

function AddVehicleType() {

    var Name = $("#txttype").val();
    

    if (Name == '') {
        alert("Please Enter Vehicle Type");
        return false;
    }
    var DataArr = {
        Name: Name,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/AddVehicleType",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                $("#addvehicle").hide();
                Success("Vehicle Type Added Successfully.")
                
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}
function LoadCarDetails() {
    $.ajax({
        url: "Handler/MasterHandler.asmx/LoadCarDetails",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#CarDetails").empty();
                CarList = obj.List;
                for (var i = 0; i < CarList.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i+1) + '</td>'
                    Div += '<td data-title="Name">' + CarList[i].Name + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + CarList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    //if (CarList[i].IsActive)
                    //    Div += '<td data-title="Status"><button type="button"  onclick="CarTypeStatus(\'' + CarList[i].Sid + '\',\'' + CarList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    //else
                    //    Div += '<td data-title="Status"><button type="button" onclick="CarTypeStatus(\'' + CarList[i].Sid + '\',\'' + CarList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '</tr>'
                }
                $("#CarDetails").append(Div);
               
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function CarTypeStatus(Id, Status) {
    //if (Status == true)
    //    Status = false;
    //else
    //    Status = true;

    var Data = { Status: Status, TypeId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/CarTypeStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                LoadCarDetails();
            }
        },
    });
}
var Sid = 0;
function OpenPopup(id) {
    Sid = id;
    $('#updatevehicle').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/GetVehicle",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var list = obj.List;
            if (obj.retCode == 1) {

                $('#utxttype').val(list.Name);

            }
        },
    });
}

function UpdateVehicleType() {
    
    var TypeName = $("#utxttype").val();


    var DataArr = {
        Sid: Sid,
        Name: TypeName,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/UpdateVehicleType",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Vehicle Updated Successfully.")
                setTimeout(function () {
                    window.location.reload();
                }, 600)
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}