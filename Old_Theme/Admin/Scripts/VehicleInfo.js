var VehMake;
$(document).ready(function () {

    LoadVehicleInfo()
    LoadVehicleInfotype()
    LoadVehicleInfoMake()
});

var InfoList;
function LoadVehicleInfoMake() {
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
                $("#VehicleinfoMake").empty();
                $("#UVehicleinfoMake").empty();

                InfoList = obj.List;
                Div += '<option value="">--Select Vehicle --</option>'
                for (var i = 0; i < InfoList.length; i++) {
                    Div += '<option value="' + InfoList[i].Sid + '" >' + InfoList[i].Name + '</option>'
                }
                $("#VehicleinfoMake").append(Div);
                $("#UVehicleinfoMake").append(Div);

            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}
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

function AddVehicleInfo() {

    var VehMakeId = $("#VehicleinfoMake").val();
    var VehTypeId = $("#VehicleinfoType").val();
    var Model = $("#txtmodel").val();
    var RegYear = $("#txtregyear").val();
    var MaxCapacity = $("#txtmaxcapacity").val();
    var MaxBaggage = $("#txtmaxbaggage").val();

    if (VehTypeId == '') {
        alert("Please Select Vehicle Type!");
        return false;
    }
    if (VehMakeId == '') {
        alert("Please Select Vehicle Manufacturer!");
        return false;
    }    
    if (Model == '') {
        alert("Please Enter Model!");
        return false;
    }
    if (RegYear == '') {
        alert("Please Enter Reg Year!");
        return false;
    }
    if (MaxCapacity == '') {
        alert("Please Enter Max Capacity!");
        return false;
    }
    if (MaxBaggage == '') {
        alert("Please Enter Vehicle Model");
        return false;
    }
    var DataArr = {
        VehMakeId: VehMakeId,
        VehTypeId: VehTypeId,
        Model: Model,
        RegistrationYear: RegYear,
        MaxCapacity: MaxCapacity,
        MaxBaggage: MaxBaggage,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/AddVehicleInfo",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {

                $("#vehicleinfo").hide();
                Success("Vehicle Info Added Successfully.")

            } else {
                Success("Something Went Wrong");
            }
        },
    });
}


function LoadVehicleInfo() {
    $.ajax({
        url: "Handler/MasterHandler.asmx/LoadVehicleInfo",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#VehicleInfo tbody").empty();

                InfoList = obj.List;
                for (var i = 0; i < InfoList.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Vehicle Make">' + InfoList[i].VehMakeName + '</td>'
                    Div += '<td data-title="Vehicle Type">' + InfoList[i].VehTypeName + '</td>'
                    Div += '<td data-title="Model">' + InfoList[i].Model + '</td>'
                    Div += '<td data-title="Reg_Year">' + InfoList[i].RegistrationYear + '</td>'
                    Div += '<td data-title="Max Capacity">' + InfoList[i].MaxCapacity + '</td>'
                    Div += '<td data-title="Max Max Baggage">' + InfoList[i].MaxBaggage + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + InfoList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'

                    if (InfoList[i].IsActive)
                        Div += '<td data-title="Status"><button type="button"  onclick="CarInfoStatus(\'' + InfoList[i].Sid + '\',\'' + InfoList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="CarInfoStatus(\'' + InfoList[i].Sid + '\',\'' + InfoList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '</tr>'
                }
                $("#VehicleInfo tbody").append(Div);

            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function CarInfoStatus(Id, Status) { 
    var Data = { Status: Status, MakeId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/CarInfoStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                LoadVehicleInfo();
            }
        },
    });
}

var Sid = 0;
function OpenPopup(id) {
    Sid = id;
    $('#updatevehicleinfo').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/GetVehicleInfo",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var list = obj.List;
            if (obj.retCode == 1) {


                //var CurrentVehicleMake = InfoList.filter(function (o1) {
                //    return o1.Sid === list.VehMakeId;
                //})[0];

                $('#UVehicleinfoMake').val(list.VehMakeId);
                $('#UVehicleinfoType').val(list.VehTypeId);
                $('#utxtmodel').val(list.Model);
                $('#utxtregyear').val(list.RegistrationYear);
                $('#utxtmaxcapacity').val(list.MaxCapacity);
                $('#utxtmaxbaggage').val(list.MaxBaggage);

            }
        },
    });
}

function UpdateVehicleInfo() {
    var VehMakeId = $("#UVehicleinfoMake").val();
    var VehTypeId = $("#UVehicleinfoType").val();
    var Model = $("#utxtmodel").val();
    var RegistrationYear = $("#utxtregyear").val();
    var MaxCapacity = $("#utxtmaxcapacity").val();
    var MaxBaggage = $("#utxtmaxbaggage").val();


    var DataArr = {
        Sid: Sid,
        VehMakeId: VehMakeId,
        VehTypeId: VehTypeId,
        Model: Model,
        RegistrationYear: RegistrationYear,
        MaxCapacity: MaxCapacity,
        MaxBaggage: MaxBaggage,
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/UpdateVehicleInfo",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {


                Success("Vehicle Info Updated Successfully.")
                $("#updatevehicleinfo").hide();
                LoadVehicleInfo()
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}