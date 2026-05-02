function SendEmail() {

    var Name = $("#input_name").val();
    var Email = $("#input_email").val();
    var Subject = $("#input_subject").val();
    var Phone = $("#input_phone").val();
    var Message = $("#textarea_message").val();

    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (Email == '') {
        alert("Please Enter Email");
        return false;
    }
    if (!emailReg.test(Email)) {
        alert("Please enter valid Email ID");
        return false;
    }

    if (Name == '') {
        alert("Please Enter Name");
        return false;
    }
    if (Message == '') {
        alert("Please Enter Message");
        return false;
    }
    var data = {
        Name: Name,
        Email: Email,
        Subject: Subject,
        Phone: Phone,
        Message: Message
    };

    $.ajax({
        type: "POST",
        url: "DefaultHandler.asmx/EmailSending",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                alert("Enquiry Sent");
                window.location.reload();
            } else {
                alert("Something Went Wrong");
            }
        },
    });
}