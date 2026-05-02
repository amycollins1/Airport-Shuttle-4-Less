var VehMake;
$(document).ready(function () {

    LoadVehicleInfo()
    LoadVehicleInfotype()
    LoadVehicleInfoMake()

    $("#Profile").change(function () {
        if (typeof (FileReader) != "undefined") {
            var dvPreview = $("#dvPreview");
            dvPreview.html("");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
            $($(this)[0].files).each(function () {
                var file = $(this);
                if (regex.test(file[0].name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var img = $("<img />");
                        img.attr("style", "max-height:150px;max-width: 150px");
                        img.attr("src", e.target.result);
                        dvPreview.append(img);
                    }
                    reader.readAsDataURL(file[0]);
                } else {
                    alert(file[0].name + " is not a valid image file.");
                    dvPreview.html("");
                    return false;
                }
            });
        } else {
            alert("This browser does not support HTML5 FileReader.");
        }
    });

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

var NewVehicleID = 0;
function AddVehicleInfo() {

    var VehMakeId = $("#VehicleinfoMake").val();
    var VehTypeId = $("#VehicleinfoType").val();
    var Model = $("#txtmodel").val();
    var RegYear = $("#txtregyear").val();
    var MaxCapacity = $("#txtmaxcapacity").val();
    var MinCapacity = parseInt($("#txtmincapacity").val());
    var MaxBaggage = $("#txtmaxbaggage").val();
    var MinBaggage = parseInt($("#txtminbaggage").val());
    var BaseCharge = $('#txtBaseCharge').val();
    var PerMile = $('#txtPerMile').val();
    var MinHours = $('#txtMinHours').val();
    var PerHour = $('#txtPerHour').val();


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
    if ($("#Profile").val() != "") {
        var ext1 = ($("#Profile").val()).split('.');
        Profile = ext1[ext1.length - 1];
        if (Profile != 'jpg')
        {
            alert("Please Upload jpg Image!");
            return false;
        }
    }
    else {
        Profile = "";
    }
    var DataArr = {
        VehMakeId: VehMakeId,
        VehTypeId: VehTypeId,
        Model: Model,
        RegistrationYear: RegYear,
        MaxCapacity: MaxCapacity,
        MaxBaggage: MaxBaggage,
        MinCapacity: MinCapacity,
        MinBaggage: MinBaggage,
        BaseCharge: BaseCharge,
        PerMile: PerMile,
        MinHours: MinHours,
        PerHour:PerHour,
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
                NewVehicleID = obj.NewVehicleID;
                
                if (Profile != "")
                {
                    if (Profile == 'jpg')
                    {
                        SendProfile($("#hdn_ProfileMapPath").val());
                        $("#vehicleinfo").hide();
                        Success("Vehicle Info Added Successfully.")
                        setTimeout(window.location.reload(), 2000);
                    }
                    else
                    {
                        Success("Vehicle Info Added Successfully. Image not Uploaded, Please upload jpg Image!")
                        setTimeout(window.location.reload(), 2000);
                    }                  
                }

               

            } else {
                Success("Something Went Wrong");
            }
        },
        error: function () {
            bValid = false;
            alert("Whoops something went wrong!");
        }
    });
}

function UpdateVehicleInfo() {
    var VehMakeId = $("#VehicleinfoMake").val();
    var VehTypeId = $("#VehicleinfoType").val();
    var Model = $("#txtmodel").val();
    var RegistrationYear = $("#txtregyear").val();
    var MaxCapacity = $("#txtmaxcapacity").val();
    var MaxBaggage = $("#txtmaxbaggage").val();
    var MinCapacity = $("#txtmincapacity").val();
    var MinBaggage = $("#txtminbaggage").val();
    var BaseCharge = $('#txtBaseCharge').val();
    var PerMile = $('#txtPerMile').val();
    var MinHours = $('#txtMinHours').val();
    var PerHour = $('#txtPerHour').val();

    if ($("#Profile").val() != "") {
        var ext1 = ($("#Profile").val()).split('.');
        Profile = ext1[ext1.length - 1]
        if (Profile != 'jpg') {
            alert("Please Upload jpg Image!");
            return false;
        }
    }
    else {
        Profile = "";
    }
    var DataArr = {
        Sid: Sid,
        VehMakeId: VehMakeId,
        VehTypeId: VehTypeId,
        Model: Model,
        RegistrationYear: RegistrationYear,
        MaxCapacity: MaxCapacity,
        MaxBaggage: MaxBaggage,
        MinCapacity: MinCapacity,
        MinBaggage: MinBaggage,
        BaseCharge: BaseCharge,
        PerMile: PerMile,
        MinHours: MinHours,
        PerHour: PerHour,
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
                
                if (Profile != "") {
                    SendProfile($("#hdn_ProfileMapPath").val())
                }

                $("#vehicleinfo").hide();
                Success("Vehicle Info Updated Successfully.")                
                setTimeout(window.location.reload(), 2000);
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
                $("#VehicleInfoList tbody").empty();

                InfoList = obj.List;
               
                for (var i = 0; i < InfoList.length; i++) {
                    if (InfoList[i].MinCapacity == null)
                        InfoList[i].MinCapacity = 0
                    if (InfoList[i].MinBaggage == null)
                        InfoList[i].MinBaggage = 0
                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Vehicle Make">' + InfoList[i].VehMakeName + '</td>'
                    Div += '<td data-title="Vehicle Type">' + InfoList[i].VehTypeName + '</td>'
                    Div += '<td data-title="Model">' + InfoList[i].Model + '</td>'
                    Div += '<td data-title="Reg_Year">' + InfoList[i].RegistrationYear + '</td>'
                    Div += '<td data-title="Max Capacity">' + InfoList[i].MaxCapacity + '</td>'
                    Div += '<td data-title="Min Capacity">' + InfoList[i].MinCapacity + '</td>'
                    Div += '<td data-title="Max Baggage">' + InfoList[i].MaxBaggage + '</td>'
                    Div += '<td data-title="Min Baggage">' + InfoList[i].MinBaggage + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + InfoList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'

                    if (InfoList[i].IsActive)
                        Div += '<td data-title="Status"><button type="button"  onclick="CarInfoStatus(\'' + InfoList[i].Sid + '\',\'' + InfoList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="CarInfoStatus(\'' + InfoList[i].Sid + '\',\'' + InfoList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '</tr>'
                }
                $("#VehicleInfoList tbody").append(Div);
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
    //$('#updatevehicleinfo').modal('show');
    if (Sid > 0)
    {
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

                    $('#VehicleinfoMake').val(list.VehMakeId);
                    $('#VehicleinfoType').val(list.VehTypeId);
                    $('#txtmodel').val(list.Model);
                    $('#txtregyear').val(list.RegistrationYear);
                    $('#txtmaxcapacity').val(list.MaxCapacity);
                    $('#txtmaxbaggage').val(list.MaxBaggage);
                    $('#txtmincapacity').val(list.MinCapacity);
                    $('#txtminbaggage').val(list.MinBaggage);
                    $('#txtBaseCharge').val(list.BaseCharge);
                    $('#txtPerMile').val(list.PerMile);
                    $('#txtMinHours').val(list.MinHours);
                    $('#txtPerHour').val(list.PerHour);
                    $("#hdn_ProfileMapPath").val(list.Profile);
                    loadImage("../images/VehicleImages/" + list.Sid + ".jpg")

                    document.getElementById('btnAdd').style.display = 'none';
                    document.getElementById('btnUpdate').style.display = '';
                    $('#vehicleinfo').modal('show');
                }
            },
        });
    }
    else
    {
        $("#VehicleinfoMake").val($("#target option:first").val());
        $("#VehicleinfoType").val($("#target option:first").val());
        $('#').val('');
        $('#txtmodel').val('');
        $('#txtregyear').val('');
        $('#txtmaxcapacity').val('');
        $('#txtmaxbaggage').val('');
        $('#txtmincapacity').val('');
        $('#txtminbaggage').val('');
        $('#txtBaseCharge').val('');
        $('#txtPerMile').val('');
        $('#txtMinHours').val('');
        $('#txtPerHour').val('');
        loadImage("../images/VehicleImages/defaultvehicle.jpg")
        document.getElementById('btnAdd').style.display = '';
        document.getElementById('btnUpdate').style.display = 'none';
        $('#vehicleinfo').modal('show');
    }
   
}

function loadImage(imageSrc) {
    $('#dvPreview').empty();
    var image = new Image();
    image.onload = function () {
        // image exists and is loaded
        $('#dvPreview').append('<img style="max-height:150px;max-width: 150px" src="' + imageSrc + '"/>');
    }
    image.onerror = function () {
        // image did not load         
        $('#dvPreview').append('<img style="max-height:150px;max-width: 150px" src="../images/VehicleImages/defaultvehicle.jpg"/>');
    }
    image.src = imageSrc;
}




function SendProfile(path) { 
    if (Sid>0) {
        Profile = path;
        sUrl = 'ImageUploader.ashx?Type=VehicleImage&id=' + Sid;
        //id = "";
    }
    else {
        Profile = path;
        sUrl = 'ImageUploader.ashx?Type=VehicleImage&id=' + NewVehicleID;
        //id = "";
    }
    var bValid = true;
    var obj = $("#Profile");
    var Files = obj[0].files
    var formData = new FormData();

    formData.append('file', Files[0]);
    formData.append('path', path);
    $.ajax({
        type: 'post',
        url: sUrl,
        data: formData,
        success: function (status) {
            if (status != 'error') {
                var my_path = "../images/VehicleImages/" + status;
                Profile = my_path;
                //$("#ImgProfile").attr("src", my_path);
                //document.getElementById("ImgProfile").setAttribute("style", "width:200px;height:200px");
                //document.getElementById("hrefImgProfile").setAttribute("href", my_path);
            }
        },
        processData: false,
        contentType: false,
        error: function () {
            bValid = false;
            alert("Whoops something went wrong!");
        }
    });
    return bValid;
}