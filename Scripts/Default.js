var RegEmail = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
var Type = '';

$(function () {
    $('#RegisterForm').on('submit', function (e) {
        e.preventDefault();
        Register();
    });
    LoadA4SLAirports();
})

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
                localStorage.setItem("LoginStorage", JSON.stringify(LoginDetails));

                if (LoginDetails.UserType == "Admin") {
                    window.location.href = "Admin/Dashboard.aspx";
                }
                else if (LoginDetails.UserType == "Customer") {
                    window.location.href = "Customer/DashBoard.aspx";
                }
                else if (LoginDetails.UserType == "Dispatcher") {
                    window.location.href = "Dispatcher/AirportReservation.aspx";
                }
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
    var FName = $('#RegFName').val().trim();
    var LName = $('#RegLName').val().trim();
    var PhoneNo = $('#RegPhoneNo').val().trim();
    var EmailAddress = $('#RegEmailAddress').val().trim();
    var Gender = $('#SelGender').val();
    var Password = $('#RegPassword').val();
    var ConfirmPassword = $('#ConfirmPassword').val();

    var $msg = $('#RegMsg');
    var $btn = $('#RegisterBtn');
    $msg.html('');
    $btn.prop('disabled', true).text('Registering...');

    // Validation
    if (FName === '') { $msg.html('<div class="alert alert-danger mb-2">Please enter First Name</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (LName === '') { $msg.html('<div class="alert alert-danger mb-2">Please enter Last Name</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (PhoneNo === '') { $msg.html('<div class="alert alert-danger mb-2">Please enter Phone No</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (EmailAddress === '') { $msg.html('<div class="alert alert-danger mb-2">Please enter Email Address</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (!validateEmail(EmailAddress)) { $msg.html('<div class="alert alert-danger mb-2">Please enter a valid Email Address</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (Password === '') { $msg.html('<div class="alert alert-danger mb-2">Please enter Password</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (ConfirmPassword === '') { $msg.html('<div class="alert alert-danger mb-2">Please enter Confirm Password</div>'); $btn.prop('disabled', false).text('Register'); return; }
    if (Password !== ConfirmPassword) { $msg.html('<div class="alert alert-danger mb-2">Password and confirm password do not match</div>'); $btn.prop('disabled', false).text('Register'); return; }

    var objArr = {
        FirstName: FName,
        LastName: LName,
        Email: EmailAddress,
        Password: Password,
        MobileNo: PhoneNo,
        UserType: 'Customer',
        Gender: Gender,
        IsActive: true,
        CreatedDate: TodayDate()
    };

    $.ajax({
        type: "POST",
        url: "../Handler/DefaultHandler.asmx/Register",
        data: JSON.stringify({ Login: objArr }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var msg = '';
            if (result.retCode == 1) {
                msg = '<div class="alert alert-success mb-2">Registered Successfully</div>';
                $('#RegisterForm')[0].reset();
                setTimeout(function () { $('#RegModal').modal('hide'); }, 1500);
            } else if (result.retCode == -1) {
                msg = '<div class="alert alert-danger mb-2">This Email Address is already registered</div>';
            } else {
                msg = '<div class="alert alert-danger mb-2">Registration failed. Please try again.</div>';
            }
            $msg.html(msg);
            $btn.prop('disabled', false).text('Register');
        },
        error: function () {
            $msg.html('<div class="alert alert-danger mb-2">A network error occurred. Please try again.</div>');
            $btn.prop('disabled', false).text('Register');
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
                window.location.href = "AdminCorporate/Dashboard.aspx";
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
        if (!validateEmail(Email)) {
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
    
    try {
        $.ajax({
            type: "POST",
            url: "/Handler/DefaultHandler.asmx/MailPassword",
            data: JSON.stringify({Email: Email}),
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
            error: function(xhr, status, error) {
                alert("Network error: " + error);
            }
        });
    } catch (e) {
        alert("An error occurred: " + e.message);
    }
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
        if (!validateEmail(Email)) {
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
        alert("Please Enter Email");
        return false;
    }
    if (Email != "") {
        if (!validateEmail(Email)) {
            alert("Please enter valid Email ID");
            return false;
        }
    }
    if (MobileNo == "") {
        alert("Please Enter Mobile No");
        return false;
    }
    if (Message == "") {
        alert("Please Enter Comment");
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

function QuoteMail() {
    // var first_name = $("#first_name").val();
    // var last_name = $("#last_name").val();
    // var pick_up_date = $("#pick_up_date").val();
    // var pick_up_time = $("#pick_up_time").val();
    // var pick_up_location = $("#pick_up_location").val();
    // var destination = $("#destination").val();
    // var service_type = $("#service_type").val();
    // var vehicle_type = $("#vehicle_type").val();
    // var hours = $("#hours").val();
    // var passengers = $("#passengers").val();
    // var phone = $("#phone").val();
    // var emailid = $("#emailid").val();
    // var message = $("#quote_message").val();

    var first_name = $("#first_name").val();
    var last_name = "";
    var pick_up_time = "";
    var service_type = "";
    var vehicle_type = "";
    var hours = "";
    var passengers = "";
    var pick_up_date = $("#pick_up_date").val();
    var pick_up_location = $("#pick_up_location").val();
    var destination = $("#destination").val();
    var phone = $("#phone").val();
    var emailid = $("#emailid").val();
    var message = $("#quote_message").val();

    // Get current page URL
    var current_page_url = window.location.href;

    // Loader and message area logic
    var $form = $(".quote-form");
    var $btn = $form.find("button[type='button']");
    var $container = $form.parent();
    var $loader = $container.find("#quote-loader-overlay");
    var $msgArea = $container.find("#quote-message-area");

    // If loader/message area not present (in case of dynamic forms), create them
    if ($loader.length === 0) {
        $loader = $('<div id="quote-loader-overlay" style="display:none;position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.7);z-index:10;align-items:center;justify-content:center;"><div class="spinner-border text-primary" role="status" style="width:3rem;height:3rem;"><span class="visually-hidden">Loading...</span></div></div>');
        $container.css('position','relative').append($loader);
    }
    if ($msgArea.length === 0) {
        $msgArea = $('<div id="quote-message-area" style="display:none;"></div>');
        $container.prepend($msgArea);
    }

    function showLoader() { $loader.show(); }
    function hideLoader() { $loader.hide(); }
    function showMsg(msg, type) {
        $msgArea.html('<div class="alert alert-' + (type === 'success' ? 'success' : 'danger') + '" role="alert">' + msg + '</div>').fadeIn();
        setTimeout(function(){ $msgArea.fadeOut(); }, 6000);
    }
    function resetForm() {
        $form[0].reset();
        $form.find("select").val("");
    }

    $btn.prop('disabled', true).text('Please wait...');
    showLoader();
    $msgArea.hide();

    // Validation
    function fail(msg) {
        hideLoader();
        showMsg(msg, 'error');
        $btn.prop('disabled', false).text('GET YOUR QUOTE');
        return false;
    }
    if (first_name == "") return fail("Please Enter First Name");
    // if (last_name == "") return fail("Please Enter Last Name");
    if (pick_up_date == "") return fail("Please Enter Pick_up Date");
    // if (pick_up_time == "") return fail("Please Enter Pick_up time");
    if (pick_up_location == "") return fail("Please Enter Pick_up Location");
    if (destination == "") return fail("Please Enter destination");
    // if (service_type == "") return fail("Please Enter Service Type");
    // if (vehicle_type == "") return fail("Please Enter Vehicle Type");
    // if (hours == "") return fail("Please Enter Hours");
    // if (passengers == "") return fail("Please Enter Passengers");
    if (emailid != "") { if (!validateEmail(emailid)) return fail("Please enter valid Email ID"); }
    if (phone == "") return fail("Please Enter Phone No");
    if ($("#website").val() !== "") {return fail("Invalid request.");}

//     var Data = {
//         first_name: first_name,
//         last_name: last_name,
//         pick_up_date: pick_up_date,
//         pick_up_time: pick_up_time,
//         pick_up_location: pick_up_location,
//         destination: destination,
//         service_type: service_type,
//         vehicle_type: vehicle_type,
//         hours: hours,
//         passengers: passengers,
//         phone: phone,
//         email: emailid,
//         message: message,
//         current_page_url: current_page_url,
//         CCEmails: CCEmails
//     };
//     $.ajax({
//         type: "POST",
//         url: "/Handler/DefaultHandler.asmx/QuoteMail",
//         data: JSON.stringify(Data),
//         contentType: "application/json",
//         datatype: "json",
//         success: function (response) {
//             hideLoader();
//             var obj = JSON.parse(response.d);
//             if (obj.retCode == 1) {
//                 showMsg("Quote enquiry sent successfully!", 'success');
//                 resetForm();
//             } else {
//                 showMsg(obj.Msg || 'Something went wrong while sending enquiry mail.', 'error');
//             }
//             $btn.prop('disabled', false).text('GET YOUR QUOTE');
//         },
//         error: function (request, status, error) {
//             hideLoader();
//             showMsg("A network error occurred. Please try again.", 'error');
//             $btn.prop('disabled', false).text('GET YOUR QUOTE');
//         }
//     });
// }

// var token = grecaptcha.getResponse();

// if (token.length === 0) {
//     hideLoader();
//     showMsg("Please complete the CAPTCHA.", "error");
//     $btn.prop("disabled", false).text("GET YOUR QUOTE");
//     return;
// }

var Data = {
    first_name: first_name,
    last_name: last_name,
    pick_up_date: pick_up_date,
    pick_up_time: pick_up_time,
    pick_up_location: pick_up_location,
    destination: destination,
    service_type: service_type,
    vehicle_type: vehicle_type,
    hours: hours,
    passengers: passengers,
    phone: phone,
    email: emailid,
    message: message,
    current_page_url: current_page_url,
    CCEmails: CCEmails,
    // gRecaptchaToken: token
    website: $("#website").val()
};

$.ajax({
    type: "POST",
    url: "/Handler/DefaultHandler.asmx/QuoteMail",
    data: JSON.stringify(Data),
    contentType: "application/json",
    datatype: "json",
    success: function (response) {
        hideLoader();

        var obj = JSON.parse(response.d);

        if (obj.retCode == 1) {
            showMsg("Quote enquiry sent successfully!", "success");
            resetForm();

            // Optional: reset the checkbox after success
            // grecaptcha.reset();
        } else {
            showMsg(obj.Msg || "Something went wrong while sending enquiry mail.", "error");

            // Optional: reset the checkbox after failure too
            // grecaptcha.reset();
        }

        $btn.prop("disabled", false).text("GET YOUR QUOTE");
    },
    error: function () {
        hideLoader();
        showMsg("A network error occurred. Please try again.", "error");

        // Optional: reset the checkbox after error
        // grecaptcha.reset();

        $btn.prop("disabled", false).text("GET YOUR QUOTE");
    }
});
}

function LoadA4SLAirports() {
    $("#SelAirport").empty();
    $.ajax({
        url: "/Admin/Handler/AdminHandler.asmx/GetA4SLAirports",
        type: "POST",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var AirportList = obj.Arr;
                if (AirportList.length > 0) {
                    ddlRequest = '';
                    var ddlRequest = '<option value="" selected="selected">Select</option>';
                    for (i = 0; i < AirportList.length; i++) {
                        //ddlRequest += '<option value="' + AirportList[i].Sid + '">' + AirportList[i].Name + '</option>';
                        ddlRequest += '<option value="' + AirportList[i].AirportID + ',' + AirportList[i].Latitute + ',' + AirportList[i].Longitude + ',' + AirportList[i].Name + '">' + AirportList[i].Name + '</option>';
                    }
                    $("#SelAirport").append(ddlRequest);
                }
            }
        },
        error: function () {
            $('#SpnMessege').text("Somthing went wrong. Please try again.")
            $("#ModelMessege").modal("show")
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
var CCEmails = "amy.collins244@gmail.com,khazhar007@gmail.com";
function OpenTermsPopup(open) {
    if (open == 'Terms') {
        $("#termsModal").modal('show')
        Type = open;
    }
}

// Standardized email validation function
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email) {
    return emailRegex.test(email);
}