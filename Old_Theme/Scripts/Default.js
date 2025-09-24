var RegEmail = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
var Type = '';
function Login() {
    Email = $("#LoginEmail").val();
    Password = $("#LoginPassword").val();
    //document.getElementById('LoginLoader').style.display = '';
    if (Email == "") {
        alert("Please enter Email Address");
        return false;
    }
    if (Password == "") {
        alert("Please Enter Password")
        return false;
    }

    //UserType = $("#UserType").val();
    var data = {
        Email: Email,
        Password: Password,
        //UserType: UserType
    }
    $.ajax({
        url: "Handler/DefaultHandler.asmx/Login",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == "1") {
               
                var LoginDetails = obj.LoginDetails
                if (LoginDetails.UserType == "Admin") {
                    window.location.href = "Admin/Dashboard.aspx";
                    //document.getElementById('LoginLoader').style.display = 'none';
                }
                localStorage.setItem("LoginStorage", JSON.stringify(LoginDetails));
                //document.getElementById('LoginLoader').style.display = 'none';
                //else if (LoginDetails.UserType == "Customer") {
                //    window.location.href = "Customer/CustomerDashBoard.aspx";
                //}
                //else if (LoginDetails.UserType == "Driver") {
                //    window.location.href = "Driver/DriverDashBoard.aspx";
                //}
            } else if (obj.retCode == "-1") {
                alert("Invalid Username or Password. Please try again.");
            } else if (obj.retCode == "0") {
                alert("Somthing went wrong. Please try again.")
            }
        },
        error: function () {

            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
        }
    });
}

function Register() {
    var objArr = new Array();
    var FName = $('#RegFName').val();
    var Gender = $('#SelGender option:selected').val();
    if (FName == '') {
        alert("Please enter First Name");
        return false;
    }
    var LName = $('#RegLName').val();
    if (LName == '') {
        alert("Please enter Last Name");
        return false;
    }
    var PhoneNo = $('#RegPhoneNo').val();
    if (PhoneNo == '') {
        alert("Please enter Phone No");
        return false;
    }
    var EmailAddress = $('#RegEmailAddress').val();
    if (EmailAddress == '') {
        alert("Please enter Email Address");
        return false;
    }
    var Password = $('#RegPassword').val();
    if (Password == '') {
        alert("Please enter Password");
        return false;
    }
    var ConfirmPassword = $('#ConfirmPassword').val();
    if (ConfirmPassword == '') {
        alert("Please enter Confirm Password");
        return false;
    }
    if (Password != ConfirmPassword) {
        alert("Password and confirm password does not match");
        return false;
    }

    objArr = {
        FirstName: FName,
        LastName: LName,
        Email: EmailAddress,
        Password: Password,
        MobileNo: PhoneNo,
        UserType: 'Customer',
        Gender:Gender,
        IsActive: true,
        CreatedDate: TodayDate()
    }

    $.ajax({
        type: "POST",
        url: "../Handler/DefaultHandler.asmx/Register",
        data: JSON.stringify({ Login: objArr }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            if (result.retCode == 1) {
                $("#RegModal").modal('hide')
                Success('Registered Successfully');
                if (Type == "Booking") {
                    $('#Fname').val(FName);
                    $('#Lname').val(LName);
                    $('#PhoneNo').val(PhoneNo)
                    $('#Email').val(EmailAddress);
                }
                
                $('#RegFName').val('');
                $('#RegLName').val('');
                $('#RegPhoneNo').val('')
                $('#RegEmailAddress').val('');
                $('#RegPassword').val('');
                $('#ConfirmPassword').val('');
            }
            else if (result.retCode == -1) {
                alert("This Email Adderess is already registered")
            }
        },
        error: function () {
        }
    });
}

function CorporateLogin() {
    var Email = $('#CorpEmail').val();
    var Password = $('#CorpPassword').val();

    if (Email == '') {
        alert("Please enter Email Address");
        return false;
    }
    if (Password == '') {
        alert("Please enter Password");
        return false;
    }
    var data = { Email: Email, Password: Password }

    $.ajax({
        type: "POST",
        url: "Handler/DefaultHandler.asmx/CorporateLogin",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {

            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                localStorage.setItem("LoginStorage", JSON.stringify(obj.LoginDetails));
                window.location.href = "Corporate/Dashboard.aspx";
            }
            else
                alert("Email and Password does not match")
        },
        error: function () {

            alert("Something Went Wrong.")
        },
    });
}

function CorporateRegister() {
    var objArr = new Array();
    var FName = $('#FName').val();
    if (FName == '') {
        alert("Please enter First Name");
        return false;
    }
    var LName = $('#LName').val();
    if (LName == '') {
        alert("Please enter Last Name");
        return false;
    }
    var EmailAddress = $('#RegEmailAddress').val();
    if (EmailAddress == '') {
        alert("Please enter Email Address");
        return false;
    }
    var Password = $('#RegPassword').val();
    if (Password == '') {
        alert("Please enter Password");
        return false;
    }
    var ConfirmPassword = $('#ConfirmPassword').val();
    if (ConfirmPassword == '') {
        alert("Please enter Confirm Password");
        return false;
    }
    if (Password != ConfirmPassword) {
        alert("Password and confirm password does not match");
        return false;
    }
    var CompanyName = $('#CompanyName').val();
    if (CompanyName == '') {
        alert("Please enter Company Name");
        return false;
    }
    var CompanyPhone = $('#CompanyPhone').val();

    objArr = {
        Name: FName + " " + LName,
        Email: EmailAddress,
        Password: Password,
        CompanyName: CompanyName,
        CompanyPhoneNo: CompanyPhone
    }

    $.ajax({
        type: "POST",
        url: "Handler/DefaultHandler.asmx/CorporateRegister",
        data: JSON.stringify({ objArr: objArr }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            if (result.retCode == 1) {
                alert('Registered Successfully');
                $('#Name').val('');
                $('#RegEmailAddress').val('');
                $('#RegPassword').val('');
                $('#ConfirmPassword').val('');
            }
        },
        error: function () {
        }
    });
}

function Emailchechking(Email) {
    var Data = { Email: Email };

    if (Email != "") {
        if (!RegEmail.test(Email)) {
            $('#SpnMessege').text("Please enter valid Email ID");
            $('#ModelMessege').modal('show');
            return false;
        }
        else {
            $.ajax({
                url: "BookingHandler.asmx/Emailchechking",
                type: "POST",
                data: JSON.stringify(Data),
                contentType: "application/json",
                datatype: "json",
                success: function (response) {
                    var obj = JSON.parse(response.d);

                    if (obj.Retcode == 1) {
                        EmailBool = true;
                        ConfirmBooking();
                    }
                    else if (obj.Retcode == 0) {
                        EmailBool = false;
                        $('#SpnMessege').text("Entered Email Address is not registered")
                        $("#ModelMessege").modal("show")
                    }
                },
                error: function () {
                    $('#SpnMessege').text("Somthing went wrong. Please try again.")
                    $("#ModelMessege").modal("show")
                }
            });
        }
    }
    else {
        $('#SpnMessege').text(" Please enter Email Address")
        $("#ModelMessege").modal("show")
    }
}
 
function MailPassword() {
    var Email = $("#ForgotEmail").val();
    if (Email == "") {
        alert("Please enter Email Address");
        return false;
    }
    var data = { Email: Email }

    $.ajax({
        type: "POST",
        url: "/Handler/DefaultHandler.asmx/MailPassword",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {

            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
               
                $("#ForgotEmail").val('')
                $("#ForgotPasswordModal").modal('hide')
                Success("Password is send to entered email address");
            }
            else if (obj.retCode == -1) {
                alert("Email address is not available");
            }
            else if (obj.retCode == 0) {
                alert("Something went wrong");
            }
        },
    });
}

function SaveComment() {
    var Name = $("#CommentName").val();
    var Message = $("#Comment").val();
    var Email = $("#CommentEmail").val();
    var PhoneNo = $("#CommentPhoneNo").val();
    if (Name == "") {
        alert("Please Enter Name");
        return false;
    }
    if (Email == "" && PhoneNo == "") {
        ValidationMessage("Please Enter Email or Phone No");
        return false;
    }
    if (Email != "") {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(Email)) {
            ValidationMessage("Please enter valid Email ID");
            return false;
        }
    }
    if (Message == "") {
        ValidationMessage("Please Enter Comment");
        return false;
    }

    var Data = {
        Name: Name,
        Message: Message,
        Email: Email,
        PhoneNo: PhoneNo,
        Date: TodayDate(),
    };
    $.ajax({
        type: "POST",
        url: "/Handler/DefaultHandler.asmx/SaveComment",
        data: JSON.stringify(Data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Your Comment Send Successfully")
                $("#CommentName").val('');
                $("#Comment").val('');
                $("#CommentEmail").val('');
                $("#CommentPhoneNo").val('');
                //LoadAllComment();
            }
            else {
                ValidationMessage('Something going wrong while sending comment');
            }
        },
    });
}

function LoadAllComment() {
    $.ajax({
        type: "POST",
        url: "DefaultHandler.asmx/LoadAllComment",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            $("#Comments").empty();
            $("#CommentSlider").empty();

            if (obj.retCode == 1) {
                var Arr = obj.Arr;
                var Div = '';
                var Divs = '';
                for (var i = 0; i < Arr.length; i++) {
                    if (i == 0) {
                        Divs += '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>'
                        Div += '<div class="item carousel-item active">'
                    }
                    else {
                        Divs += '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>'
                        Div += '<div class="item carousel-item">'
                    }

                    Div += '<p class="testimonial"><i class="fa fa-quote-left d-inline-block mr-2" style="font-size:  24px; color: #dc3545"></i>' + Arr[i].Text + '</p>'
                    Div += '<p class="overview"><b>' + Arr[i].Name + '</b></p>'
                    Div += '</div>'
                }
                $("#Comments").append(Div);
                $("#CommentSlider").append(Divs);
            }
        },
    });
}

function TodayDate() {
    var today = new Date();
    var dd = today.getDate();
    if (dd <= 9)
        dd = "0" + dd;
    var mm = today.getMonth() + 1; //January is 0!
    if (mm <= 9)
        mm = "0" + mm;
    var yyyy = today.getFullYear();
    //var dt = dd + "-" + mm + "-" + yyyy;
    var dt = mm + "-" + dd + "-" + yyyy;
    var hr = today.getHours()
    var Min = today.getMinutes()
    return dt + " " + hr + ":" + Min
}

function OpenPopup(open) {
    if (open == 'Booking') {
        $("#RegModal").modal('show')
        Type = open;
    }
    if (open == 'Login') {
        $("#LoginModal").modal('show')
        Type = open;
    }
    if (open == 'Forget')
    {
        $("#LoginModal").modal('hide')
        $("#ForgotPasswordModal").modal('show')
        Type = open;
    }
        
}

function EnquiryMail() {
    var Name = $("#name").val();
    var MobileNo = $("#mobile").val();
    var Email = $("#email").val();
    var Message = $("#message").val();
    if (Name == "") {
        alert("Please Enter Name");
        return false;
    }
    if (Email == "") {
        ValidationMessage("Please Enter Email");
        return false;
    }
    if (Email != "") {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(Email)) {
            ValidationMessage("Please enter valid Email ID");
            return false;
        }
    }
    if (MobileNo == "") {
        ValidationMessage("Please Enter Mobile No");
        return false;
    }
    if (Message == "") {
        ValidationMessage("Please Enter Comment");
        return false;
    }

    var Data = {
        Name: Name,
        Message: Message,
        Email: Email,
        MobileNo: MobileNo,
    };
    $.ajax({
        type: "POST",
        url: "/Handler/DefaultHandler.asmx/EnquiryMail",
        data: JSON.stringify(Data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                alert("Enquiry mail Send Successfully")
                $("#name").val('');
                $("#mobile").val('');
                $("#email").val('');
                $("#message").val('');
            }
            else {
                ValidationMessage('Something going wrong while sending enquiry mail');
            }
        },
        error: function (request, status, error) {
            //alert(request.responseText);
        }
    });
}

function convertTime12to24(MyTime) {
    var hours = parseInt(MyTime.substr(0, 2));
    var StrHrs = MyTime.split(':')[0]
    if (MyTime.indexOf('AM') != -1 && hours == 12) {
        MyTime = MyTime.replace('12', '0');
    }
    if (MyTime.indexOf('PM') != -1 && hours < 12) {
        MyTime = MyTime.replace(StrHrs, (hours + 12));
    }
    return (MyTime.replace(/(AM|PM)/, '')).trim();
}

function OpenTermsPopup(open) {
    if (open == 'Terms') {
        $("#termsModal").modal('show')
        Type = open;
    }   
}