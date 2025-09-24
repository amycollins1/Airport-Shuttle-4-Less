$(document).ready(function () {


    GetAllCustomer()

});

function GetAllCustomer() {
    $.ajax({
        url: "Handler/AdminHandler.asmx/GetAllCustomer",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#CustomerDetails").empty();
                CustomerList = obj.List;
                for (var i = 0; i < CustomerList.length; i++) {
                    var Name = CustomerList[i].FirstName + " " + CustomerList[i].LastName
                    Div += '<tr>'
                    Div += '<td data-title="S.N">' + parseInt(i + 1) + '</td>'
                    Div += '<td data-title="Name">' + Name + '</td>'
                    Div += '<td data-title="Email" style="word-break:break-all;">' + CustomerList[i].Email + '</td>'
                    Div += '<td data-title="Address">' + CustomerList[i].MobileNo + '</td>'
                    Div += '<td data-title="Percentage">' + CustomerList[i].Address + '</td>'
                    Div += '<td data-title="Edit|Delete">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + CustomerList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    if (CustomerList[i].IsActive)
                        Div += '<td data-title="Status"><button type="button"  onclick="CustomerStatus(\'' + CustomerList[i].Sid + '\',\'' + CustomerList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="CustomerStatus(\'' + CustomerList[i].Sid + '\',\'' + CustomerList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></button></td>'

                    Div += '</td>'
                    Div += '</tr>'
                }
                $("#CustomerDetails").append(Div);
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
var Sid = 0;
function OpenPopup(id) {
    Sid = id;
    $('#OpenPopupCDetails').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/GetCustomer",
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

function UpdateCustomer() {

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
        UserType: "Customer",
        IsActive: true,
    };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/UpdateCustomer",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {


                Success("Customer Updated Successfully.")
                //$("#OpenPopupCDetails").hide();
                //GetAllCustomer()
                setTimeout(location.reload(), 800);
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function CustomerStatus(Id, Status) {
    //if (Status == true)
    //    Status = false;
    //else
    //    Status = true;

    var Data = { Status: Status, CustomerId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/CustomerStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                GetAllCustomer();
            }
        },
    });
}