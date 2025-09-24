
$(document).ready(function () {


    LoadDistanceRate()
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

function LoadDistanceRate() {
    $.ajax({
        url: "Handler/MasterHandler.asmx/LoadDistanceRate",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#DstanceRate").empty();
                Distance = obj.List;
                for (var i = 0; i < Distance.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Name">' + Distance[i].VehTypeName + '</td>'
                    Div += '<td data-title="Base Charge">' + Distance[i].BaseCharge + '</td>'
                    Div += '<td data-title="Miles Per Distance">' + Distance[i].PerMile + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + Distance[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    //Div += '<td data-title="Delete">'
                    //Div += '<button onclick="DeleteDistanceRate(\'' + Distance[i].Sid + '\',\'' + Distance[i].IsActive + '\')" class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Delete"></button>'
                    //Div += '</td>'
                    Div += '</tr>'
                }
                $("#DstanceRate").append(Div);

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
    $('#updatedistancerate').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/GetLoadDistanceRate",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var list = obj.List;
            if (obj.retCode == 1) {

                $('#UVehicleinfoType').val(list.VehTypeId);
                $('#utxtbasecharge').val(list.BaseCharge);
                $('#utxtperMile').val(list.PerMile);

            }
        },
    });
}

function UpdateLoadDistanceRate() {

    var BaseCharge = $("#utxtbasecharge").val();
    var PerMile = $("#utxtperMile").val();

    var DataArr = {
        Sid: Sid,
        BaseCharge: BaseCharge,
        PerMile: PerMile,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/UpdateLoadDistanceRate",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Distance Rate Updated Successfully.")
                LoadDistanceRate()
                $("#updatedistancerate").hide();
                LoadDistanceRate()
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

//function DeleteDistanceRate(Sid) {

//    var Data = { Sid: Sid };
//    $.ajax({
//        type: "POST",
//        url: "Handler/MasterHandler.asmx/DeleteDistanceRate",
//        data: JSON.stringify(Data),
//        contentType: "application/json; charset=utf-8",
//        datatype: "json",
//        success: function (response) {
//            var obj = JSON.parse(response.d);
//            if (obj.retCode == 1) {

//                Success("Rate Deleted Successfully.");
//                LoadDistanceRate();
//            }
//        },
//    });
//}