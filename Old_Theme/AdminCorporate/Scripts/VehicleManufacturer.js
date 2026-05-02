
$(document).ready(function () {


    LoadCarMake()

});

function AddVehicleMake() {

    var Name = $("#txttype").val();


    if (Name == '') {
        alert("Please Enter Vehicle Manufacturer");
        return false;
    }
    var DataArr = {
        Name: Name,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/AddVehicleMake",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                $("#Makevehicle").hide();
                Success("Vehicle Manufacturer Added Successfully.")

            } else {
                Success("Something Went Wrong");
            }
        },
    });
}
function LoadCarMake() {
    $.ajax({
        url: "Handler/MasterHandler.asmx/LoadCarMake",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#CarManufacturer").empty();
                CarList = obj.List;
                for (var i = 0; i < CarList.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Name">' + CarList[i].Name + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + CarList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    //if (CarList[i].IsActive)
                    //    Div += '<td data-title="Status"><button type="button"  onclick="CarMakeStatus(\'' + CarList[i].Sid + '\',\'' + CarList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    //else
                    //    Div += '<td data-title="Status"><button type="button" onclick="CarMakeStatus(\'' + CarList[i].Sid + '\',\'' + CarList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '</tr>'
                }
                $("#CarManufacturer").append(Div);

            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function CarMakeStatus(Id, Status) {
    //if (Status == true)
    //    Status = false;
    //else
    //    Status = true;

    var Data = { Status: Status, MakeId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/CarMakeStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                LoadCarMake();
            }
        },
    });
}
var Sid = 0;
function OpenPopup(id) {
    Sid = id;
    $('#updateMake').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/GetMake",
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

function UpdateVehicleMake() {

    var TypeName = $("#utxttype").val();


    var DataArr = {
        Sid: Sid,
        Name: TypeName,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/UpdateVehicleMake",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Updated Successfully.")
                setTimeout(function () {
                    window.location.reload();
                }, 600)
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}