$(document).ready(function () {


    GetAllAdmins()

});

function GetAllAdmins() {
    $.ajax({
        url: "Handler/AdminHandler.asmx/GetAllAdmins",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#AdminDetails").empty();
                AdminList = obj.List;
                for (var i = 0; i < AdminList.length; i++) {
                    var Name = AdminList[i].FirstName + " " + AdminList[i].LastName
                    Div += '<tr>'
                    Div += '<td data-title="S.N">' + parseInt(i + 1) + '</td>'
                    Div += '<td data-title="Name">' + Name + '</td>'
                    Div += '<td data-title="Email" style="word-break:break-all;">' + AdminList[i].Email + '</td>'
                    Div += '<td data-title="Address">' + AdminList[i].MobileNo + '</td>'
                    Div += '<td data-title="Percentage">' + AdminList[i].Address + '</td>'
                    Div += '<td data-title="Edit|Delete">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + AdminList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    if (AdminList[i].IsActive)
                        Div += '<td data-title="Status"><button type="button"  onclick="AdminStatus(\'' + AdminList[i].Sid + '\',\'' + AdminList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="AdminStatus(\'' + AdminList[i].Sid + '\',\'' + AdminList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></button></td>'

                    Div += '</td>'
                    Div += '</tr>'
                }
                $("#AdminDetails").append(Div); 
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
    $('#OpenPopupCDetails').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/GetAdmin",
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

function UpdateAdmin() {

    var FName = $("#UFname").val();
    var LName = $("#ULname").val();
    var MobileNo = $("#URegPhoneNo").val();
    var Address = $("#UAddress").val();
    var Email = $("#URegEmailAddress").val();
    var Password = $("#URegPassword").val();
    var Gender = $("#USelGender").val();


    var DataArr = {
        Sid: Sid,
        FirstName: FName,
        LastName: LName,
        MobileNo: MobileNo,
        Address: Address,
        Email: Email,
        Password: Password,
        Gender: Gender,
        UserType: "Admin",
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/UpdateAdmin",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {


                Success("Admin Updated Successfully.") 
                setTimeout(location.reload(), 800);
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function AdminStatus(Id, Status) { 
    var Data = { Status: Status, AdminId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/AdminStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                GetAllAdmins();
            }
        },
    });
}