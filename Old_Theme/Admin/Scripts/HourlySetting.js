$(document).ready(function () {    
    GetAllVehicle()
    setTimeout(function () {
        LoadHourlySetting()
    }, 500)    
});

function VehicleChange() {
    VehicleId = $("#Select_Vehicle option:selected").val()
    if (VehicleId != 0) {
        Vehicle = $.grep(VehicleList, function (p) { return p.Sid == VehicleId })
        BaseCharge = Vehicle[0].BaseCharge
        VehicleRate = Vehicle[0].PerMile
    } 
}

var HourlyList = [];
function LoadHourlySetting() {
    $("#Select_Vehicle").val(0);
    $("#MinHours").val(0);
    $("#MaxHours").val(0);
    $("#Amount").val(0);
    $.ajax({
        url: "Handler/HourlySettingHandler.asmx/GetHourlySetting",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#HourlyDetails").empty();
                HourlyList = obj.List;
                for (var i = 0; i < HourlyList.length; i++) {
                    var Vehicle = $.grep(VehicleList, function (p) { return p.Sid == HourlyList[i].VehInfoId })[0];
                    Div += '<tr>'
                    Div += '<td>' + (i + 1) + '</td>'
                    Div += '<td>' + Vehicle.Model + '</td>'
                    Div += '<td>' + HourlyList[i].MinHours + '</td>'
                    Div += '<td>' + HourlyList[i].MaxHours + '</td>'
                    Div += '<td>' + HourlyList[i].PerHourDiscount + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button"  class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"  onclick="return GetHaltData(' + HourlyList[i].Sid + ')"></button>'
                    Div += '</td>'
                    //Div += '<button onclick="return false;" class="btn btn-info btn-xs glyphicon glyphicon-trash" title="License"></button>'
                    //Div += '| '
                    //if (HourlyList[i].IsActive)
                    //    Div += '<td data-title="Status"><button type="button"  onclick="DriverStatus(\'' + DriverList[i].Sid + '\',\'' + DriverList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    //else
                    //    Div += '<td data-title="Status"><button type="button" onclick="DriverStatus(\'' + DriverList[i].Sid + '\',\'' + DriverList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    //Div += '</tr>'
                }
                $("#HourlyDetails").append(Div);
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

var HaltSettingID = 0;
function GetHaltData(HaltID) {
    var HaltData = $.grep(HourlyList, function (p) { return p.Sid == HaltID })[0];
    $("#Select_Vehicle").val(HaltData.VehInfoId)
    $("#MinHours").val(HaltData.MinHours);
    $("#MaxHours").val(HaltData.MaxHours);
    $("#Amount").val(HaltData.PerHourDiscount);
    HaltSettingID = HaltID;
}

function AddUpdateHours() {
    var VehicleId = $("#Select_Vehicle option:selected").val();
    var MinHours = $("#MinHours").val();
    var MaxHours = $("#MaxHours").val();
    var Amount = $("#Amount").val();

    if (VehicleId == 0) {
        alert("Please Select Vehicle");
        return false;
    }
    if (MinHours == '') {
        alert("Please Minimum Hours");
        return false;
    }
    if (MaxHours == '') {
        alert("Please Maximum Hours");
        return false;
    }
    if (Amount == '') {
        alert("Please Enter Amount");
        return false;
    }
    var VehicleHours = $.grep(HourlyList, function (p) { return p.VehInfoId == VehicleId });
    for (v = 0; v < VehicleHours.length; v++) {
        if (VehicleHours[v].Sid != HaltSettingID) {
            if (MinHours >= VehicleHours[v].MinHours && MinHours <= VehicleHours[v].MaxHours) {
                alert("This Vehicle's Min Hours already availble in Setting!");
                return false;
                break;
            }
            if (MaxHours >= VehicleHours[v].MinHours && MaxHours <= VehicleHours[v].MaxHours) {
                alert("This Vehicle's MaxHours Hours already availble in Setting!");
                return false;
                break;
            }
        }        
    }
   
    var DataArr = {
        Sid: HaltSettingID,
        VehInfoId: VehicleId,
        MinHours: MinHours,
        MaxHours: MaxHours,
        PerHourDiscount: Amount,
        IsActive: true,
        CreatedDate: TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "Handler/HourlySettingHandler.asmx/AddUpdateHourlySetting",
        data: JSON.stringify({ HaltSetting: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Setting Saved Successfully.")
                LoadHourlySetting()
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}


function HourlySettingStatus(Id, Status) {
    if (Status == true)
        Status = false;
    else
        Status = true;

    var Data = { Status: Status, DriverId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/DriverStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                LoadAllDriver();
            }
        },
    });
}