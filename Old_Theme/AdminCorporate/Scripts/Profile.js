var Sid = 0;
$(document).ready(function () {
    var MyList = localStorage.getItem("LoginStorage")
    if (MyList == null)
        window.location.href = "../index.html";
    MyDetail = JSON.parse(MyList);
    if (MyDetail.UserType=='Admin') {
        Sid = MyDetail.Sid;
        LoadProfileDetails();
    }
   
});

var ProfileDetails;
function LoadProfileDetails() {
    var Data = { Sid: Sid };
    $.ajax({
        url: "Handler/MasterHandler.asmx/GetProfileDetails",
        type: "POST",
        data: JSON.stringify(Data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) { 

                ProfileDetails = obj.ProfileDetails;
                if (ProfileDetails != null) {
                    $('#txt_Email').val(ProfileDetails.Email);
                    $('#txt_Password').val(ProfileDetails.Password);
                    $('#txt_FirstName').val(ProfileDetails.FirstName);
                    $('#txt_LastName').val(ProfileDetails.LastName);
                    $('#txt_Address').val(ProfileDetails.Address);
                    $('#txt_ContactNumber').val(ProfileDetails.MobileNo);
                    $("input[name=optionsGender][value=" + ProfileDetails.Gender + "]").attr('checked', true);
                }
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}
 
function UpdateProfile() {
   /* var  Email = $("#txt_Email").val();*/
    var  Password = $("#txt_Password").val();
    var  FirstName = $("#txt_FirstName").val();
    var LastName = $("#txt_LastName").val();
    var Address = $("#txt_Address").val();
    var ContactNumber = $("#txt_ContactNumber").val();
    var Gender = document.querySelector('input[name="optionsGender"]:checked').value;

    var Data = {
        Sid: Sid,
        Password: Password,
        FirstName: FirstName,
        LastName: LastName,
        Address: Address,
        ContactNumber: ContactNumber,
        Gender: Gender
    }
    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/UpdateProfile",
        data: JSON.stringify(Data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Profile Updated Successfully.") 
                LoadProfileDetails()
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

 
function PasswordToggle() {
    let Passwordinput = document.getElementById("txt_Password");
    var Div=''
    if (Passwordinput.type === "password") {
        Passwordinput.type = "text";
        $("#togglePassword").empty()
        Div +='<i class="fa fa-eye-slash"></i>'
    }
    else {
        Passwordinput.type = "password";
        $("#togglePassword").empty()
        Div += '<i class="fa fa-eye"></i>'
    }
    $("#togglePassword").append(Div)
}