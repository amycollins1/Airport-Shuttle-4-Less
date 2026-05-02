
$(document).ready(function () {


    LoadHourlyRate()
    LoadVehicleInfotype()
});

function LoadVehicleInfotype() {
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
                $("#VehicleinfoType").empty();
                $("#UVehicleinfoType").empty();

                InfoList = obj.List;
                Div += '<option value="">--Select Vehicle --</option>'
                for (var i = 0; i < InfoList.length; i++) {
                    Div += '<option value="' + InfoList[i].Sid + '" >' + InfoList[i].Name + '</option>'
                }
                $("#VehicleinfoType").append(Div);
                $("#UVehicleinfoType").append(Div);
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function LoadHourlyRate() {
    $.ajax({
        url: "Handler/MasterHandler.asmx/LoadHourlyRate",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#HourlyRate").empty();
                Hourly = obj.List;
                for (var i = 0; i < Hourly.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Name">' + Hourly[i].VehTypeName + '</td>'
                    Div += '<td data-title="Minimum Hours">' + Hourly[i].MinHours + '</td>'
                    Div += '<td data-title="Hourly Rate">' + Hourly[i].PerHour + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + Hourly[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    Div += '</tr>'
                }
                $("#HourlyRate").append(Div);

            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

var Sid = 0;
function OpenPopup(id) {
    Sid = id;
    $('#updatehourlyrate').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/GetLoadHourlyRate",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var list = obj.List;
            if (obj.retCode == 1) {

                $('#UVehicleinfoType').val(list.VehTypeId);
                $('#utxtminimunhours').val(list.MinHours);
                $('#utxthourlyrate').val(list.PerHour);

            }
        },
    });
}

function UpdateLoadHourlyRate() {

    var MinHours = $("#utxtminimunhours").val();
    var PerHour = $("#utxthourlyrate").val();

    var DataArr = {
        Sid: Sid,
        MinHours: MinHours,
        PerHour: PerHour,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/UpdateLoadHourlyRate",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Hourly Rate Updated Successfully.")
                LoadHourlyRate()
                $("#updatehourlyrate").hide();

            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

