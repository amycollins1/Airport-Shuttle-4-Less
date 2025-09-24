$(document).ready(function () {


    LoadAllDriver()

});

function AddUpdateDriver() {

    var Name = $("#Fname").val();
    var LName = $("#Lname").val();
    var Gender = $("#SelGender").val();
    var Phone = $("#Mobile").val();
    var Address = $("#Address").val();
    var Percentage = $("#Select_Percentage").val();
    var Email = $("#Email").val();
    var Password = $("#Password").val();

    if (Name == '') {
        alert("Please Enter Name");
        return false;
    }
    if (LName == '') {
        alert("Please Enter Last Name");
        return false;
    }


    if (Phone == '') {
        alert("Please Enter Phone Number");
        return false;
    }
    if (Address == '') {
        alert("Please Enter Address");
        return false;
    }
    if (Percentage == '') {
        alert("Please select Percentage");
        return false;
    }
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (Email == '') {
        alert("Please Enter Email");
        return false;
    }
    if (!emailReg.test(Email)) {
        alert("Please enter valid Email ID");
        return false;
    }

    if (Password == '') {
        alert("Please Enter Password");
        return false;
    }
    var DataArr = {
        FirstName: Name,
        LastName: LName,
        Gender: Gender,
        MobileNo: Phone,
        Email: Email,
        Password: Password,
        Address: Address,
        Percentage: Percentage,
        UserType: "Driver",
        IsActive: true,
        CreatedDate: TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/AddUpdateDriver",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Driver Added Successfully.")
                setTimeout(function () {
                    window.location.reload();
                }, 600)
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function LoadAllDriver() {
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
    Sid = id;
    $('#OpenPopupDriver').modal('show');
    var Data = { Sid: Sid };

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

                $('#UFname').val(list.FirstName);
                $('#ULname').val(list.LastName);
                $('#URegPhoneNo').val(list.MobileNo);
                $('#UAddress').val(list.Address);
                $('#URegEmailAddress').val(list.Email);
                $('#URegPassword').val(list.Password);
                $('#USelGender').val(list.Gender);

            }
        },
    });
}


function UpdateDriver() {

    var Name = $("#UFname").val();
    var LName = $("#ULname").val();
    var Gender = $("#USelGender").val();
    var Phone = $("#URegPhoneNo").val();
    var Address = $("#UAddress").val();
    var Percentage = $("#USelect_Percentage").val();
    var Email = $("#URegEmailAddress").val();
    var Password = $("#URegPassword").val();


    var DataArr = {
        Sid: Sid,
        FirstName: Name,
        LastName: LName,
        Gender: Gender,
        MobileNo: Phone,
        Email: Email,
        Password: Password,
        Address: Address,
        Percentage: Percentage,
        UserType: "Driver",
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/UpdateDriver",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Driver Updated Successfully.")
                setTimeout(function () {
                    window.location.reload();
                }, 600)
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}