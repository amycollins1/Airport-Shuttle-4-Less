$(document).ready(function () { 
    LoadAllDriver();
    LoadImages();
});
 
 
function LoadAllDriver() {
    $('#PopupDriver').modal('hide');
    $.ajax({
        url: "Handler/AdminHandler.asmx/GetAllDriver",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#DriverDetails").empty();
                DriverList = obj.List;
                for (var i = 0; i < DriverList.length; i++) {
                    var Name = DriverList[i].FirstName + " " + DriverList[i].LastName
                    Div += '<tr>'
                    Div += '<td data-title="Name">' + Name + '</td>'
                    Div += '<td data-title="Address">' + DriverList[i].Address + '</td>'
                    Div += '<td data-title="Email" style="word-break:break-all;">' + DriverList[i].Email + '</td>'
                    Div += '<td data-title="Percentage">' + DriverList[i].Percentage + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + DriverList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    //Div += '<button onclick="return false;" class="btn btn-info btn-xs glyphicon glyphicon-trash" title="License"></button>'
                    //Div += '| '
                    if (DriverList[i].IsActive)
                        Div += '<td data-title="Status"><button type="button"  onclick="DriverStatus(\'' + DriverList[i].Sid + '\',\'' + DriverList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="DriverStatus(\'' + DriverList[i].Sid + '\',\'' + DriverList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '</tr>' 
                }
                $("#DriverDetails").append(Div);
                
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

//$(function () {
//    $("#Profile").change(function () {
//        if (typeof (FileReader) != "undefined") {
//            var dvPreview = $("#dvPreview");
//            dvPreview.html("");
//            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
//            $($(this)[0].files).each(function () {
//                var file = $(this);
//                if (regex.test(file[0].name.toLowerCase())) {
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var img = $("<img />");
//                        img.attr("style", "max-height:150px;max-width: 150px");
//                        img.attr("src", e.target.result);
//                        dvPreview.append(img);
//                    }
//                    reader.readAsDataURL(file[0]);
//                } else {
//                    alert(file[0].name + " is not a valid image file.");
//                    dvPreview.html("");
//                    return false;
//                }
//            });
//        } else {
//            alert("This browser does not support HTML5 FileReader.");
//        }
//    });
//    $("#LicenceUpload1").change(function () {
//        if (typeof (FileReader) != "undefined") {
//            var dvPreview = $("#dvPreview2");
//            dvPreview.html("");
//            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
//            $($(this)[0].files).each(function () {
//                var file = $(this);
//                if (regex.test(file[0].name.toLowerCase())) {
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var img = $("<img />");
//                        img.attr("style", "max-height:150px;max-width: 150px");
//                        img.attr("src", e.target.result);
//                        dvPreview.append(img);
//                    }
//                    reader.readAsDataURL(file[0]);
//                } else {
//                    alert(file[0].name + " is not a valid image file.");
//                    dvPreview.html("");
//                    return false;
//                }
//            });
//        } else {
//            alert("This browser does not support HTML5 FileReader.");
//        }
//    });
//    $("#LicenceUpload2").change(function () {
//        if (typeof (FileReader) != "undefined") {
//            var dvPreview = $("#dvPreview3");
//            dvPreview.html("");
//            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
//            $($(this)[0].files).each(function () {
//                var file = $(this);
//                if (regex.test(file[0].name.toLowerCase())) {
//                    var reader = new FileReader();
//                    reader.onload = function (e) {
//                        var img = $("<img />");
//                        img.attr("style", "max-height:150px;max-width: 150px");
//                        img.attr("src", e.target.result);
//                        dvPreview.append(img);
//                    }
//                    reader.readAsDataURL(file[0]);
//                } else {
//                    alert(file[0].name + " is not a valid image file.");
//                    dvPreview.html("");
//                    return false;
//                }
//            });
//        } else {
//            alert("This browser does not support HTML5 FileReader.");
//        }
//    });
//});

function LoadImages() {
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
    $("#LicenceUpload1").change(function () {
        if (typeof (FileReader) != "undefined") {
            var dvPreview = $("#dvPreview2");
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
    $("#LicenceUpload2").change(function () {
        if (typeof (FileReader) != "undefined") {
            var dvPreview = $("#dvPreview3");
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
}

var NewDriverID = 0;
function AddUpdateDriver() {

    var Bvalid = Validation();
    if (Bvalid == true) {
        Sid = $("#hdn_id").val();
        Fname = $("#Fname").val();
        Lname = $("#Lname").val();

        var Gender = document.getElementById('SelGender').value;       
        Mobile = $("#Mobile").val();
        Address = $("#Address").val();
        Country = ""
        City = ""
        Pincode = ""
        Email = $("#Email").val();
        Percentage = parseInt($("#Select_Percentage").val());
        //alert(Profile);

        if ($("#btn_RegisterDriver").val() == "Add") {
            if ($("#Profile").val() != "") {
                var ext1 = ($("#Profile").val()).split('.');
                Profile = ext1[ext1.length - 1]
            }
            else {
                Profile = "";
            }
            if ($("#LicenceUpload1").val() != "") {
                var ext2 = ($("#LicenceUpload1").val()).split('.');
                Lic1 = ext2[ext2.length - 1]
            }
            else {
                Lic1 = ""
            }
            if ($("#LicenceUpload2").val() != "") {
                var ext3 = ($("#LicenceUpload2").val()).split('.');
                Lic2 = ext3[ext3.length - 1]
            }
            else {
                Lic2 = "";
            }

            var Data = {
                FirstName: Fname,
                LastName: Lname,
                Gender: Gender,
                MobileNo: Mobile,
                Email: Email,
                Password: $("#Password").val(),
                Address: Address,
                Percentage: Percentage,
                UserType: "Driver",
                IsActive: true
            }
            $.ajax({
                type: "POST",
                url: "Handler/MasterHandler.asmx/AddUpdateDriver",
                data: JSON.stringify({ Obj: Data }),
                contentType: "application/json",
                datatype: "json",
                success: function (response) {
                    var obj = JSON.parse(response.d);
                    //var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
                    if (obj.retCode == 1) {
                        NewDriverID = obj.NewDriverID;
                        //var ext1 = ($("#Profile").val()).split('.');
                        //Profile = "1." + ext1[ext1.length - 1]
                        //var ext2 = ($("#LicenceUpload1").val()).split('.');
                        //Lic1 = "2." + ext2[ext2.length - 1]
                        //var ext3 = ($("#LicenceUpload2").val()).split('.');
                        //Lic2 = "3." + ext3[ext3.length - 1]
                        //Success("Driver Successfully Added!")
                        if (Profile != "" || Lic1 != "" || Lic2 != "") {
                            //var IsUploaded = false;
                            //showLoader();
                            //setTimeout(IsUploaded = UploadDocuments(), 10000);
                            var Bool = false;
                            var DriverMessage = "";
                            //setTimeout(IsUploaded = UpdateDocuments(), 10000);
                            for (var i = 0; i < 3; i++) {
                                if (i == 0) {
                                    setTimeout(Bool = SendProfile($("#hdn_ProfileMapPath").val()), 2000);
                                    if (Bool == true)
                                        DriverMessage += "Profile Image Uploaded, "
                                    else
                                        DriverMessage += "Profile Image Not Uploaded, "
                                }
                                if (i == 1) {
                                    setTimeout(Bool = SendLicense($("#hdn_LicenseMapPath").val()), 2000);
                                    if (Bool == true)
                                        DriverMessage += "License Uploaded, "
                                    else
                                        DriverMessage += "License Not Uploaded, "
                                }
                                if (i == 2) {
                                    setTimeout(Bool = SendDocs($("#hdn_DocumentsMapPath").val()), 2000);
                                    if (Bool == true)
                                        DriverMessage += "Documents Uploaded."
                                    else
                                        DriverMessage += "Other Documents Not Uploaded."
                                }
                            }
                            Success("Driver Added Successfully. " + DriverMessage)
                            setTimeout(LoadAllDriver(), 10000);
                            //$('#PopupDriver').modal('hide');
                        }                       
                        else
                        {
                            Success("Driver Added Successfully. " + DriverMessage)
                            setTimeout(LoadAllDriver(), 1000);
                        }
                    } 
                    else {
                        alert("Something Went Wrong");
                        window.location.reload();
                    }
                }
            });

           
        }
        else if ($("#btn_RegisterDriver").val() == "Update") { 
            if ($("#Profile").val() != "") {
                var ext1 = ($("#Profile").val()).split('.');
                Profile =   ext1[ext1.length - 1]
            }
            else {
                Profile = "";
            }
            if ($("#LicenceUpload1").val() != "") {
                var ext2 = ($("#LicenceUpload1").val()).split('.');
                Lic1 =   ext2[ext2.length - 1]
            }
            else {
                Lic1 = ""
            }
            if ($("#LicenceUpload2").val() != "") {
                var ext3 = ($("#LicenceUpload2").val()).split('.');
                Lic2 =   ext3[ext3.length - 1]
            }
            else {
                Lic2 = "";
            }

            
            var Data = {
                Sid: Sid,
                FirstName: Fname,
                LastName: Lname,
                Gender: Gender,
                MobileNo: Mobile,
                Email: Email,
                Password: $("#Password").val(),
                Address: Address,
                Percentage: Percentage,
                UserType: "Driver",
                IsActive: true 
            }
            $.ajax({ 
                type: "POST",
                url: "Handler/MasterHandler.asmx/AddUpdateDriver",
                data: JSON.stringify({ Obj: Data }),
                contentType: "application/json",
                datatype: "json",
                success: function (response) {
                    var obj = JSON.parse(response.d);

                    if (obj.retCode == 1) {
                        Success("Driver Successfully Added")
                        LoadAllDriver();
                        $('#PopupDriver').modal('hide');
                    }
                    else if (obj.retCode == 2) {
                        //Success("Driver Successfully Updated! Uploading Documents..")
                        if (Profile != "" || Lic1 != "" || Lic2 != "") {
                            var Bool = false; 
                            var DriverMessage = "";
                            //setTimeout(IsUploaded = UpdateDocuments(), 10000);
                            for (var i = 0; i < 3; i++) {
                                if (i == 0) {
                                    setTimeout(Bool = SendProfile($("#hdn_ProfileMapPath").val()), 2000);
                                    if (Bool == true)
                                        DriverMessage += "Profile Image Uploaded, "
                                    else
                                        DriverMessage += "Profile Image Not Uploaded, "
                                }
                                if (i == 1) {
                                    setTimeout(Bool = SendLicense($("#hdn_LicenseMapPath").val()), 2000);
                                    if (Bool == true)
                                        DriverMessage += "License Uploaded, "
                                    else
                                        DriverMessage += "License Not Uploaded, "
                                }
                                if (i == 2) {
                                    setTimeout(Bool = SendDocs($("#hdn_DocumentsMapPath").val()), 2000);
                                    if (Bool == true)
                                        DriverMessage += "Documents Uploaded."
                                    else
                                        DriverMessage += "Other Documents Not Uploaded."
                                }
                            }
                            Success("Driver Updated Successfully. " + DriverMessage)
                            setTimeout(LoadAllDriver(), 10000);
                        }
                        setTimeout(LoadAllDriver(), 12000);
                        $('#PopupDriver').modal('hide');
                    }
                    else {
                        alert("Something Went Wrong");
                        window.location.reload();
                    }
                }
            });
        }
    }
  
}

function Validation() {
    if ($("#Fname").val() == "") {
        alert("Please enter First Name");
        $("#Fname").focus();
        return false;
    }
    if ($("#Lname").val() == "") {
        alert("Please enter Last Name");
        $("#Lname").focus();
        return false;
    }
    if ($("#Mobile").val() == "") {
        alert("Please enter Mobile No");
        $("#Mobile").focus();
        return false;
    }
    if ($("#Address").val() == "") {
        alert("Please enter Address");
        $("#Address").focus();
        return false;
    }
    if ($("#Select_Percentage").val() == 0) {
        alert("Please select Percentage");
        $("#Select_Percentage").focus();
        return false;
    }
    //else if ($("#Country").val() == "") {
    //    alert("Please enter Country");
    //    $("#Country").focus();
    //    return false;
    //}
    //else if ($("#City").val() == "") {
    //    alert("Please enter City");
    //    $("#Select_City").focus();
    //    return false;
    //}
    if ($("#Email").val() == "") {
        alert("Please enter Email");
        $("#Email").focus();
        return false;
    }
    if ($("#Email").val() != "") {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test($("#Email").val())) {
            $("#Email").focus();
            alert("Please enter valid Email ID");
            return false;
        }
    }
    if ($("#Password").val() == "") {
        alert("Please enter Password");
        $("#Password").focus();
        return false;
    }
    //...........
    if ($("#btn_RegisterDriver").val() == "Add") {
        //if ($("#Profile").val() == "") {
        //    alert("Please upload Profile.");
        //    return false;
        //}
        //else if ($("#LicenceUpload1").val() == "") {
        //    alert("Please upload Licence 1");
        //    return false;
        //}
        //else if ($("#LicenceUpload2").val() == "") {
        //    alert("Please upload Licence 2");
        //    return false;
        //}
    }
    else {
        if ($("#Profile").val() == "") {
            Profile = "";
        }
        if ($("#LicenceUpload1").val() == "") {
            Lic1 = "";
        }
        if ($("#LicenceUpload2").val() == "") {
            Lic2 = "";
        }
    }
    return true;
}

function UploadDocuments() {
    //alert("Please Edit and Upload document for New Driver Added!");
    //var Bool = true;
    //Bool = SendProfile(" ");
    //if (Bool == true) {
    //    Bool = SendLicense(" ");
    //    if (Bool == true) {
    //        Bool = SendDocs(" ");
    //        if (Bool == true) {
    //        }
    //        else {
    //            alert("error while uploading License 2 image");
    //        }
    //    }
    //    else {
    //        alert("error while uploading License 1 image");
    //    }
    //}
    //else {
    //    alert("error while uploading Profile image");
    //}
    var Bool = UpdateDocuments();
    if (Bool == true) {

        LoadAllDriver();
        $('#PopupDriver').modal('hide');
    }
    else {

    }
    hideLoader();
    return Bool;
}

function UpdateDocuments() {
    var Bool = true;

    if ($("#Profile").val() != "") {
        Bool = SendProfile($("#hdn_ProfileMapPath").val());
        
        //if (Bool != true) {
        //    return false;
        //}
    }
    if ($("#LicenceUpload1").val() != "") {
        setTimeout(Bool = SendLicense($("#hdn_LicenseMapPath").val()), 2000);
        ;
        //if (Bool != true) {
        //    return false;
        //}
    }
    if ($("#LicenceUpload2").val() != "") {
        setTimeout(Bool = SendDocs($("#hdn_DocumentsMapPath").val()), 5000); 
        //if (Bool != true) {
        //    return false;
        //}
    }
    return Bool;
}

function SendProfile(path) {
    var id = 0;
   // var sUrl = 'ImageUploader.ashx?Type=DriverProfile&id=' + id;
    if ($("#btn_RegisterDriver").val() == "Update") {
        Profile = path; 
        sUrl = 'ImageUploader.ashx?Type=DriverProfile&id=' + $("#hdn_id").val();
        //id = "";
    }
    else
    {
        Profile = path;
        sUrl = 'ImageUploader.ashx?Type=DriverProfile&id=' + NewDriverID;
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
                var my_path = "../DriverDocument/" + status;
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

function SendLicense(path) {

    var id = 0;
    //var sUrl = 'ImageUploader.ashx?Type=DriverLicense&id=' + id;
    if ($("#btn_RegisterDriver").val() == "Update") {
        Lic1 = path;
        path = path.split('.');
        Random = path[0];
        sUrl = 'ImageUploader.ashx?Type=DriverLicense&id=' + $("#hdn_id").val();
        //id = "";
    }
    else {
        Lic1 = path;
        path = path.split('.');
        Random = path[0];
        sUrl = 'ImageUploader.ashx?Type=DriverLicense&id=' + NewDriverID;
        //id = "";
    }
    var bValid = true;
    var obj = $("#LicenceUpload1");
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
                var my_path = "../DriverDocument/" + status;
                Lic1 = my_path;
                //$("#ImgLicenceUpload1").attr("src", my_path);
                //document.getElementById("ImgLicenceUpload1").setAttribute("style", "width:200px;height:200px");
                //document.getElementById("hrefImgLicenceUpload1").setAttribute("href", my_path);
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

function SendDocs(path) {

    var id = 0;
    var sUrl = 'ImageUploader.ashx?Type=DriverDocs&id=' + id;
    if ($("#btn_RegisterDriver").val() == "Update") {
        Lic2 = path;
        path = path.split('.');
        Random = path[0];
        sUrl = 'ImageUploader.ashx?Type=DriverDocs&id=' + $("#hdn_id").val();
        id = "";
    }
    else {
        Lic2 = path;
        path = path.split('.');
        Random = path[0];
        sUrl = 'ImageUploader.ashx?Type=DriverDocs&id=' + NewDriverID;
        //id = "";
    }
    var bValid = true;
    var obj = $("#LicenceUpload2");
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
                var my_path = "../DriverDocument/" + status;
                Lic2 = my_path;
                //$("#ImgLicenceUpload2").attr("src", my_path);
                //document.getElementById("ImgLicenceUpload2").setAttribute("style", "width:200px;height:200px");
                //document.getElementById("hrefImgLicenceUpload2").setAttribute("href", my_path);
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


function DriverStatus(Id, Status) {
    //if (Status == true)
    //    Status = false;
    //else
    //    Status = true;

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
var Sid = 0;
function OpenPopup(id) {
    ClearValues();
    Sid = id;
    $("#hdn_id").val(Sid);
    $('#PopupDriver').modal('show');
    var Data = { Sid: Sid };
    if (Sid > 0)
    {
        //document.getElementById('divDocs').style.display = ''
        $("#btn_RegisterDriver").val('Update');
        $("#btn_RegisterDriver").text('Update');
        $('#lblDriverheader').text('Add Driver');
        $.ajax({
            type: "POST",
            url: "Handler/AdminHandler.asmx/GetDriver",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var obj = JSON.parse(response.d);
                var list = obj.List;
                if (obj.retCode == 1) {
                    $('#Fname').val(list.FirstName);
                    $('#Lname').val(list.LastName);
                    $('#SelGender').val(list.Gender);
                    $('#Mobile').val(list.MobileNo);
                    $('#Select_Percentage').val(list.Percentage);
                    $('#Address').val(list.Address);
                    $('#Email').val(list.Email);
                    $('#Password').val(list.Password);                  
                    $("#hdn_ProfileMapPath").val(list.Profile);
                    $("#hdn_LicenseMapPath").val(list.License);
                    $("#hdn_DocumentsMapPath").val(list.Docs);
                    if (list.Profile != null)
                        $('#dvPreview').append('<img style="max-height:150px;max-width: 150px" src="../DriverDocument/' + list.Profile + '"/>');
                    if (list.License != null)
                        $('#dvPreview2').append('<img style="max-height:150px;max-width: 150px" src="../DriverDocument/' + list.License + '"/>');
                    if (list.Docs != null)
                        $('#dvPreview3').append('<img style="max-height:150px;max-width: 150px" src="../DriverDocument/' + list.Docs + '"/>');

                }
            },
        });
    }
    else
    {
        //document.getElementById('divDocs').style.display='none'
        $("#btn_RegisterDriver").val('Add');
        $("#btn_RegisterDriver").text('Add');
        $('#lblDriverheader').text('Add Driver');
        ClearValues();
    }   
}


//function UpdateDriver() {

//    var Name = $("#UFname").val();
//    var LName = $("#ULname").val();
//    var Gender = $("#USelGender").val();
//    var Phone = $("#URegPhoneNo").val();
//    var Address = $("#UAddress").val();
//    var Percentage = $("#USelect_Percentage").val();
//    var Email = $("#URegEmailAddress").val();
//    var Password = $("#URegPassword").val();


//    var DataArr = {
//        Sid: Sid,
//        FirstName: Name,
//        LastName: LName,
//        Gender: Gender,
//        MobileNo: Phone,
//        Email: Email,
//        Password: Password,
//        Address: Address,
//        Percentage: Percentage,
//        UserType: "Driver",
//        IsActive: true,
//    };

//    $.ajax({
//        type: "POST",
//        url: "Handler/AdminHandler.asmx/UpdateDriver",
//        data: JSON.stringify({ Obj: DataArr }),
//        contentType: "application/json",
//        datatype: "json",
//        success: function (response) {
//            var obj = JSON.parse(response.d)
//            if (obj.retCode == 1) {
//                Success("Driver Updated Successfully.")
//                setTimeout(function () {
//                    window.location.reload();
//                }, 600)
//            } else {
//                Success("Something Went Wrong");
//            }
//        },
//    });
//}
 

function ClearValues() {
    $("#Fname").val('');
    $("#Lname").val('');
    $("#Address").val('');
    $("#City").val('');
    $("#Mobile").val('');
    $("#Country").val('');
    $("#Email").val('');
    $("#Pin").val('');
    $("#Male").prop("checked", true);
    $("#hdn_id").val('0');
    $("#Profile").val(null);
    $("#LicenceUpload1").val(null);
    $("#LicenceUpload2").val(null);
    $("#dvPreview").empty();
    $("#dvPreview2").empty();
    $("#dvPreview3").empty();
    $("#Select_Percentage").val('0');
}
