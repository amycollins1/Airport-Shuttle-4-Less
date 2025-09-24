var m_Resevation = [];
var m_CheckBox;
function ManageBooking() {
    $(".mCheckBox").change(function () {
        m_CheckBox = document.getElementsByClassName('mCheckBox');
        m_Resevation = [];
        for(var i=0;i<m_CheckBox.length;i++)
        {
            if (m_CheckBox[i].checked)
            {
                m_Resevation.push(m_CheckBox[i].value);
            }
        }
    })
    $(".mCheckBox").change(function () {
        m_CheckBox = document.getElementsByClassName('mCheckBox');
        m_Resevation = [];
        for (var i = 0; i < m_CheckBox.length; i++) {
            if (m_CheckBox[i].checked) {
                m_Resevation.push(m_CheckBox[i].value);
            }
        }
    })
}
function mDelete() {
    if (mValidate())
    {
        var data = {
            BookingSid: m_Resevation,
        }
        $.ajax({
            type: "POST",
            url: "Handler/ReservationHandler.asmx/DeleteMultipuleBooking",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {

                var obj = JSON.parse(response.d)
                m_Resevation = [];
               
                if (obj.Retcode == 1) {
                    //$('#DriverDetails').empty();
                    //LoadReservations()
                   
                    $('#SpnMessege').text("Booking Deleted")
                    $('#ModelMessege').modal('show')
                    try{
                        Submit();
                    }
                    catch(ex){
                        GetAll()
                    }
                }
                else if (obj.Retcode == 4) {
                    $('#SpnMessege').text("Already Cancelled Booking.")
                    $('#ModelMessege').modal('show')
                }
                else if (obj.Retcode == -1) {
                    $('#SpnMessege').text("Something went wrong!.")
                    $('#ModelMessege').modal('show')
                }

                else {
                    $('#SpnMessege').text("Something Went Wrong!.")
                    $('#ModelMessege').modal('show')
                }
                Submit();
               
            },
            error: function () {

                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            },
        });
    }
   

}

function mCancel() {

    debugger
    if (mValidate()) {
        var data = { BookingSid: m_Resevation }
        $.ajax({
            type: "POST",
            url: "Handler/ReservationHandler.asmx/CancelMultiBooking",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {
                var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
                var obj = JSON.parse(response.d)
                m_Resevation = [];
                if (obj.Retcode == 1) {
                    //LoadReservations()    
                    Submit();
                    $('#SpnMessege').text("Booking Cancelled, an email has been sent to Customer and Driver.")
                    $('#ModelMessege').modal('show')
                   
                }
                else if (obj.Retcode == 4) {
                    $('#SpnMessege').text("Already Cancelled Booking.")
                    $('#ModelMessege').modal('show')
                   
                }
                else if (obj.Retcode == -1) {
                    $('#SpnMessege').text("Something went wrong!.")
                    $('#ModelMessege').modal('show') 
                }

                else {
                    $('#SpnMessege').text("Something Went Wrong!.")
                    $('#ModelMessege').modal('show') 
                }
            },
            error: function () {

                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            },
        });
    }

}

function mCompleteBooking() {
    debugger
    if (mValidate()) {
        var data = { BookingSid: m_Resevation }
        $.ajax({
            type: "POST",
            url: "Handler/ReservationHandler.asmx/mCompleteBooking",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {

                var obj = JSON.parse(response.d)
                m_Resevation = [];
                if (obj.Retcode == 1) {
                    Submit();
                    $('#SpnMessege').text("Booking Completed for " + obj.ReservationIDS)
                    $('#ModelMessege').modal('show')
                }
                else if (obj.Retcode == 2) {
                    $('#SpnMessege').text("Booking is Already Completed")
                    $('#ModelMessege').modal('show')
                }
                else if (obj.Retcode == 3) {
                    $('#SpnMessege').text("Please Assign Driver First")
                    $('#ModelMessege').modal('show')
                }
                else if (obj.Retcode == 4) {
                    $('#SpnMessege').text("Please Pay Amount First")
                    $('#ModelMessege').modal('show')
                }
                else if (obj.Retcode == 5) {
                    $('#SpnMessege').text("Booking Can Not Complete Before Service Provided")
                    $('#ModelMessege').modal('show')
                }
                else {
                    $('#SpnMessege').text("Something Went Wrong!.")
                    $('#ModelMessege').modal('show')
                }

            },
            error: function () {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            },
        });
    }
}
function mValidate() {
    if (m_Resevation.length == 0)
    {
        $('#SpnMessege').text("Please Select CheckBox")
        $('#ModelMessege').modal('show')
        //alert("Please Select CheckBox");
     return false;
    }
    else
        return true;
}

function BookingDetails(ObjNo) {
    var Name = DataTable[ObjNo].FirstName + " " + DataTable[ObjNo].LastName;
    var ResService = DataTable[ObjNo].Service;
    $("#InVoice").val(ObjNo);
    $("#BookingDetails").modal("show");
    $("#BookingNo").text(DataTable[ObjNo].ReservationId);
    $("#ResDate").text(DataTable[ObjNo].ReservationDate);
    if (DataTable[ObjNo].Service == "To Airport" || DataTable[ObjNo].Service == "From Airport") {
        $("#Source").text(DataTable[ObjNo].Source);
        $("#Destination").text(DataTable[ObjNo].Destination);
    }

    else {
        $("#Source").text(DataTable[ObjNo].Source);
        $("#Destination").text(DataTable[ObjNo].Destination);

    }
    if (DataTable[ObjNo].Service == "Frederick-To Airport" || DataTable[ObjNo].Service == "Frederick-From Airport") {
        $("#Address").empty();
        $("#Address").append('<td colspan="2" style="padding:8px"><p style="font-weight:bold">Address:</p><p>'+ DataTable[ObjNo].Address+'</p></td>'); 
       document.getElementById('Address').style.display=''
    }
    else
    {
        $("#Address").empty();
        document.getElementById('Address').style.display = 'none'
    }
    if (DataTable[ObjNo].AssignedTo == null)
        DataTable[ObjNo].AssignedTo = "not assign"
    $("#AssignedTo").text(DataTable[ObjNo].AssignedTo);
    $("#Name").text(Name);
    $("#Service").text(DataTable[ObjNo].Service);
    $("#TotalFare").text("$ " + DataTable[ObjNo].TotalFare); 
    $("#Passenger").text(DataTable[ObjNo].Passenger);
    if (DataTable[ObjNo].PhoneNo != null)
        $("#PhoneNo").text(DataTable[ObjNo].PhoneNo);
    else
    {
        DataTable[ObjNo].PhoneNumber = DataTable[ObjNo].PhoneNo
        $("#PhoneNo").text(DataTable[ObjNo].PhoneNo);
    }
       
    if (DataTable[ObjNo].Service == "From Airport") {
        if (DataTable[ObjNo].Ret_FlightTime != null)
            $("#ResTime").text(DataTable[ObjNo].Ret_FlightTime);
        else 
            $("#ResTime").text(DataTable[ObjNo].Time);
    }
    else if (DataTable[ObjNo].Service == "To Airport") {
        if (DataTable[ObjNo].Ret_Time != null)
            $("#ResTime").text(DataTable[ObjNo].Ret_Time);
        else 
            $("#ResTime").text(DataTable[ObjNo].Time);
    }
    else if (DataTable[ObjNo].P2PTime != null)
        $("#ResTime").text(DataTable[ObjNo].P2PTime);
    else if (DataTable[ObjNo].Service == "From Airport Shuttle") {
        if (DataTable[ObjNo].Ret_FlightTime != null)
            $("#ResTime").text(DataTable[ObjNo].Ret_FlightTime);
        else 
            $("#ResTime").text(DataTable[ObjNo].Time);
    }
    else if (DataTable[ObjNo].Service == "To Airport Shuttle") {
        if (DataTable[ObjNo].Ret_FlightTime != null)
            $("#ResTime").text(DataTable[ObjNo].Ret_Time);
        else
            $("#ResTime").text(DataTable[ObjNo].Time);
    }
    else
        $("#ResTime").text(DataTable[ObjNo].Time);

    //if (ResService == "From Airport" || ResService == "From Airport Shuttle") {FlightTime
    //    $("#ResTime").text(DataTable[ObjNo].FlightTime);
    //}
    //else if (ResService == "To Airport") {
    //    $("#ResTime").text(DataTable[ObjNo].Pickup_Time);
    //}
    //else if (DataTable[ObjNo].P2PTime != null) {
    //    $("#ResTime").text(DataTable[ObjNo].P2PTime);
    //}
    //else {
    //    $("#ResTime").text(DataTable[ObjNo].Pickup_Time);
    //}
}

function PrintInvoice() {
    var ObjNo = $("#InVoice").val();
    var Name = DataTable[ObjNo].FirstName + " " + DataTable[ObjNo].LastName;
    var ResService = DataTable[ObjNo].Service;
    var ResTime = "";
    if (ResService == "From Airport") {
        ResTime = DataTable[ObjNo].Time;
    }
    else if (ResService == "To Airport") {
        ResTime = DataTable[ObjNo].Time;
    }
    //else {
    //    ResTimeDataTable[ObjNo].P2PTime;
    //}
    if (DataTable[ObjNo].AssignedTo == null)
        DataTable[ObjNo].AssignedTo = 'Not Assigned'
    var url = "../InvoicePrint.aspx?BookingNo=" + DataTable[ObjNo].ReservationId + "&ResDate=" + DataTable[ObjNo].ReservationDate + "&Source=" + DataTable[ObjNo].Source +
                           "&Destination=" + DataTable[ObjNo].Destination + "&AssignedTo=" + DataTable[ObjNo].AssignedTo + "&Name=" + Name + "&Service=" + DataTable[ObjNo].Service +
                           "&TotalFare=" + "$" + DataTable[ObjNo].TotalFare + "&Passenger=" + DataTable[ObjNo].Passenger + "&PhoneNo=" + DataTable[ObjNo].PhoneNo + "&ResTime=" + ResTime
    window.open(url, 'Print Invoice');

}