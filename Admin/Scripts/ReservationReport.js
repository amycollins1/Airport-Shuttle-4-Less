$(document).ready(function () {

    //var str = getCookie("testcook")
    //document.getElementById("ContentPlaceHolder1_DriverCalc").value = "Hi";
    //var Arr = [{ name: 's', age: '15' }]
    //Arr.push({ name: 'ss', age: '150' })
    var path = window.location.pathname;
    PageName = path.split("/").pop();

    if (PageName == "OnlineReservations.aspx")
        RequestedType = 'Customer';
    else if (PageName == "ReservationReport.aspx")
        RequestedType = 'Admin';

    LoadAllCount()
});
var TotalFare = 0, Fare = 0, Tip = 0, PercentageOfFare = 0, DriversPayOut = 0, Status = '', DriverAmountArr = [], DriverJobAmount = 0;
var DriverId = 0, DriverName = '', DriverPercentage = 0, TotalBWIearning = 0
var RequestedType = ""

function LoadAllCount() {
    $.ajax({
        type: "POST",
        url: "Handler/DashboardHandler.asmx/DashboardCount",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var MyList = sessionStorage.getItem("DriverListStorage")
                if (MyList == "" || MyList == null)
                    GetAllDriver()
                else {
                    DriverList = JSON.parse(MyList);
                    BindDriver()
                }
                //ServiceToday = obj.ServiceToday
                //ServiceTomorrow = obj.ServiceTomorrow
                //ResMadeTodayList = obj.ResMadeTodayList
                //UnassignedTomorrow = obj.UnassignedTomorrow
                //OnlineReservation = obj.OnlineReservation
                //UpcomingReservation = obj.UpcomingReservation
                //PendingReservation = obj.PendingReservation
                //$("#ServiceToday").text(ServiceToday.length);
                //$("#ServiceTomorrow").text(ServiceTomorrow.length);
                //$("#ResMadeTodayList").text(ResMadeTodayList.length);
                //$("#UnassignedTomorrow").text(UnassignedTomorrow.length);

                //$("#OnlineReservation").text(OnlineReservation.length);
                //$("#UpcomingReservation").text(UpcomingReservation.length);
                //$("#PendingReservation").text(PendingReservation.length);

                //var Amount = 0.0;
                //for (var i = 0; i < ResMadeTodayList.length; i++) {
                //    Amount = Amount + ResMadeTodayList[i].TotalFare
                //}
                //$("#TodayReservationAmount").text("$ " + Amount.toFixed(2));
                //GetData("ServiceToday")
            }
        },
    });
}

var DataTable=''
function Submit() {
    //Arr=["test","hi"]
    //setCookie("testcook", JSON.stringify(Arr), "1")
    var From = $('#txt_FDate').val();
    var To = $('#txt_TDate').val();
    Status = $("#Select_Status option:selected").text(); 
   
    if (From == '' && To != '')
        To = '';
    else if (From != '' && To == '')
        From = '';
    else {
        var dtFrom = new Date(From);
        var dtTo = new Date(To);
        if (dtFrom > dtTo) {
            ValidationMessage("From Date cannot be greater than To Date");
            return false;
        }
    }
    var data = { From: From, To: To, Status: Status, RequestedType: RequestedType }
    
    //$("#MyTable").empty();
    $("#Details tbody").empty();
    $("#Calc").empty();
    $("#Details").DataTable().clear().draw();
    $("#Details").DataTable();
    $("#Details").dataTable().fnDestroy();
  
    $.ajax({
        type: "POST",
        url: "Handler/ReportHandler.asmx/SearchReservationByDate",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            
            if (obj.retCode == 1) {
                var Arr = obj.Arr;
                DataTable = obj.Arr;
                var SortedByDriver = obj.SortedByDriver

               
                TotalFare = 0, Fare = 0, Tip = 0, PercentageOfFare = 0, DriverAmountArr = []
                //if (DriverList == "") {
                //    var MyList = sessionStorage.getItem("DriverListStorage")
                //    if (MyList == "" || MyList == null)
                //        GetAllDriver()
                //    else 
                //        DriverList = JSON.parse(MyList);
                //}
                var Div = '', Name = '';
                for (var i = 0; i < Arr.length; i++) {                    
                    TotalFare = (parseFloat(parseFloat(TotalFare) + parseFloat(Arr[i].TotalFare))).toFixed(2)

                    if (Status == "Completed") {
                        //Fare = (parseFloat(Fare + Arr[i].Fare)).toFixed(2)
                        //var tp = (Arr[i].Gratuity).split('^')[0]
                        //Tip = (parseFloat(parseFloat(Tip) + tp)).toFixed(2)
                        //var Driver = $.grep(DriverList, function (p) { return p.Sid == Arr[i].DriverId })
                        if (i == 0) {
                            DriverId = SortedByDriver[i].DriverId
                            DriverJobAmount = parseFloat(parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0]))
                            DriverName = SortedByDriver[i].DriverName
                            DriverPercentage = SortedByDriver[i].DriverPercent
                            var Percentage = parseFloat(((parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0])) * DriverPercentage) / 100)
                            PercentageOfFare = parseFloat(Percentage).toFixed(2);
                        }
                        else if (DriverId == SortedByDriver[i].DriverId) {
                            DriverJobAmount = parseFloat(parseFloat(DriverJobAmount) + parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0]))
                            var Percentage = parseFloat(((parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0])) * DriverPercentage) / 100)
                            PercentageOfFare = (parseFloat(parseFloat(PercentageOfFare) + Percentage)).toFixed(2);
                        }
                        else if (DriverId != SortedByDriver[i].DriverId) {
                            DriverAmountArr.push(DriverName + "^" + DriverJobAmount.toFixed(2) + "^" + PercentageOfFare);
                            DriverId = SortedByDriver[i].DriverId
                            DriverJobAmount = parseFloat(parseFloat(DriverJobAmount) + parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0]))
                            DriverName = SortedByDriver[i].DriverName
                            DriverPercentage = SortedByDriver[i].DriverPercent
                            var Percentage = parseFloat(((parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0])) * DriverPercentage) / 100)
                            PercentageOfFare = (Percentage).toFixed(2);
                        }
                        if (i + 1 == Arr.length)
                            DriverAmountArr.push(DriverName + "^" + DriverJobAmount.toFixed(2) + "^" + PercentageOfFare);
                        TotalBWIearning = parseFloat(TotalBWIearning) + parseFloat(PercentageOfFare);
                    }
                    var BtnPaid = "";
                    if (Arr[i].IsPaid)
                        BtnPaid += '<button onclick="return false;" class="btn btn-success btn-xs fa fa-check" title="Paid"></button>'
                    else
                        BtnPaid += '<button onclick="return false;" class="btn btn-warning btn-xs fa fa-times" title="Unpaid">'
                  
                    if (Arr[i].DriverPercent == null) { Arr[i].DriverPercent =0}
                    Name = Arr[i].FirstName + " " + Arr[i].LastName
                    Div += '<tr>'
                    Div += '<td data-title="S.N">' + parseInt(i + 1) + '</td>'                   
                    if (PageName == "ReservationReport.aspx")
                    {
                        Div += '<td align="center" style="width: 5%"><input type="checkbox" class="mCheckBox" value="' + Arr[i].Sid + '"></td>'
                    }
                    Div += '<td data-title="Booking No" style="cursor: pointer;" onclick="BookingDetails(' + i + ')">' + Arr[i].ReservationId + '</td>'
                    if (Arr[i].DriverName > '')
                        Div += '<td data-title="Assigned To">' + Arr[i].DriverName + '</td>'
                    else if (Arr[i].DriverId>0)
                    {
                        var Driver = $.grep(DriverList, function (p) { return p.Sid == Arr[i].DriverId });
                        var DriverName = Driver[0].FirstName + " " + Driver[0].LastName
                        Div += '<td data-title="Assigned To">' + DriverName + '</td>'
                    }
                    else
                    {
                        Div += '<td data-title="Assigned To">Not Assigned</td>'
                    }
                    Div += '<td data-title="Guest Name">' + Name + '</td>'
                    Div += '<td data-title="Reservation Date">' + Arr[i].ReservationDate + '</td>'
                    Div += '<td data-title="Service">' + Arr[i].Service + '</td>'
                    Div += '<td data-title="Source">' + Arr[i].Source + '</td>'
                    Div += '<td data-title="Destination">' + Arr[i].Destination + '</td>'
                    Div += '<td data-title="Percentage">' + Arr[i].DriverPercent + '</td>'
                    Div += '<td data-title="Total Fare">' + Arr[i].TotalFare + '</td>'                   
                   
                    if (PageName == "ReservationReport.aspx")
                    {
                        Div += '<td>' + BtnPaid + '</td>'
                        Div += '<td>' + Arr[i].Status + '</td>'
                        if (Arr[i].Status == 'Confirmed') {
                            Div += '<td><button type="button" onclick="RedirectToUpdate(\'' + Arr[i].Sid + '\',\'' + Arr[i].Service + '\')" class="btn btn-xs btn-danger glyphicon glyphicon-edit" title="Edit"></button> | <button type="button" onclick="ConfirmBookingPopup(' + Arr[i].Sid + ')" class="btn btn-xs btn-danger glyphicon glyphicon-list" title="Confirm" Disabled="Disabled"></button> | <button type="button" onclick="CancelReservation(' + Arr[i].Sid + ')" class="btn btn-xs btn-danger glyphicon glyphicon-remove" title="Cancel"></button> | <button type="button" onclick="Delete(\'' + Arr[i].Sid + '\',\'' + Arr[i].ReservationId + '\')" class="btn btn-xs btn-danger glyphicon glyphicon-trash" title="Delete"></button> | <button type="button" onclick="CompleteBooking(' + Arr[i].Sid + ')" class="btn btn-xs btn-danger glyphicon glyphicon-ok" title="Complete"></button></td>'
                        }
                        else {
                            Div += '<td><button type="button" onclick="RedirectToUpdate(\'' + Arr[i].Sid + '\',\'' + Arr[i].Service + '\')" class="btn btn-xs btn-danger glyphicon glyphicon-edit" title="Edit"></button> | <button type="button" onclick="ConfirmBookingPopup(' + Arr[i].Sid + ')" class="btn btn-xs btn-danger glyphicon glyphicon-list" title="Confirm"></button> | <button type="button" onclick="CancelReservation(' + Arr[i].Sid + ')" class="btn btn-xs btn-danger glyphicon glyphicon-remove" title="Cancel"></button> | <button type="button" onclick="Delete(\'' + Arr[i].Sid + '\',\'' + Arr[i].ReservationId + '\')" class="btn btn-xs btn-danger glyphicon glyphicon-trash" title="Delete"></button> | <button type="button" onclick="CompleteBooking(' + Arr[i].Sid + ')" class="btn btn-xs btn-danger glyphicon glyphicon-ok" title="Complete"></button></td>'
                        }
                    }
                    else
                    {
                        Div += '<td><button type="button" onclick="RedirectToUpdate(\'' + Arr[i].Sid + '\',\'' + Arr[i].Service + '\')" class="btn btn-xs btn-danger glyphicon glyphicon-edit" title="Edit"></button> </td>'
                    }
                    
                    Div += '</td>'
                    Div += '</tr>'
                }               
               // $("#MyTable").append(Div);
                $("#Details tbody").append(Div); 
                $("#Details").dataTable({
                    "bSort": true,
                    paging: true,
                    autoWidth: false,
                });
               
                ManageBooking();
                DriversPayOut = (TotalFare - PercentageOfFare).toFixed(2);
                Div = ''
                if (Status == "Completed") {
                    TotalBWIearning = 0.00;
                    for (var i = 0; i < DriverAmountArr.length; i++) {
                        var Splitter = DriverAmountArr[i].split('^');
                        Div += '<label style="font-weight:bold">Driver Name : ' + Splitter[0] + '</label><br />';
                        Div += '<label style="font-weight:bold">Total : ' + parseFloat(Splitter[1]).toFixed(2) + '</label><br />';
                        Div += '<label style="font-weight:bold">BWI Earning : ' + parseFloat(Splitter[2]).toFixed(2) + '</label><br />';
                        TotalBWIearning += parseFloat(Splitter[2])
                        //if (i == 0)
                        //    TotalBWI = parseFloat(parseFloat(TotalBWI).toFixed(2) + parseFloat(Splitter[2]).toFixed(2)).toFixed(2)
                        //else
                        //    TotalBWI = parseFloat(TotalBWI) + parseFloat(Splitter[2])
                    }
                    Div += '<label style="font-weight:bold">Total BWI Earning : ' + TotalBWIearning.toFixed(2) + '</label><br />';
                }
                else
                    Div += '<label><b>Total Fare : ' + TotalFare + '</b></label><br />';
                $("#Calc").append(Div);
                document.getElementById("ContentPlaceHolder1_DriverCalc").value = TotalFare + "*" + DriverAmountArr + "*" + TotalBWIearning.toFixed(2) + "*" + Status
            }
        },
    });
}

function ConfirmBookingPopup(id) {
    var Booking = $.grep(DataTable, function (p) { return p.Sid == id })
    ConfirmBookingId = Booking[0].Sid
    $("#Title").text("Confirm Booking - " + Booking[0].ReservationId)
    if (Booking[0].DriverId != 0) {
        $("#Select_Driver option").each(function () {
            if ($(this).val() == Booking[0].DriverId) {
                $(this).attr("selected", "selected");
                return;
            }
        });
    }
    else {
        $("#Select_Driver option").each(function () {
            if ($(this).val() == "0") {
                $(this).attr("selected", "selected");
                return;
            }
        });
    }
    $("#ConfirmBooking").modal("show")
}

function ConfirmBooking() {
    var DriverId = $("#Select_Driver option:selected").val()
    var Driver = $.grep(DriverList, function (p) { return p.Sid == DriverId })
    var DriverName = Driver[0].FirstName + " " + Driver[0].LastName
    var Data = { Sid: ConfirmBookingId, DriverId: DriverId, DriverName: DriverName, Percent: Driver[0].Percentage };
    $.ajax({
        type: "POST",
        url: "Handler/DashboardHandler.asmx/ConfirmBooking",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                $("#ConfirmBooking").modal("hide")
                $("#Select_Driver option").each(function () {
                    if ($(this).val() == "0") {
                        $(this).attr("selected", "selected");
                        return;
                    }
                });
                Success("Booking is Confirmed Successfully.")
                Submit();
            }
        },
    });
}


function RedirectToUpdate(id, Ser) {
    if (Ser == 'From Airport' || Ser == 'To Airport')
        location.href = 'AirportReservation.aspx?Sid=' + id;
    else if (Ser == 'Point To Point')
        location.href = 'PointToPoint.aspx?Sid=' + id;
    else if (Ser == 'Hourly')
        location.href = 'HourReservation.aspx?Sid=' + id;
    else if (Ser == 'Frederick-From Airport' || Ser == 'Frederick-To Airport')
        location.href = 'FrederickReservation.aspx?Sid=' + id;
}

function ExportToExcel() {
    window.location.href = "Handler/ReportDownloader.ashx?datatable=" + 'Reservation&TotalFare=' + TotalFare + '&DriverAmountArr=' + DriverAmountArr + '&TotalBWIearning=' + TotalBWIearning.toFixed(2) + '&Status=' + Status + ''
}

function printDiv(divId) {
    var printContents = document.getElementById(divId).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = "<html><head><title></title></head><body>" + printContents + "</body>";
    window.print();
    document.body.innerHTML = originalContents;
}


function CancelReservation(sid) {
    debugger
    var data = { BookingSid: sid }
    $.ajax({
        type: "POST",
        url: "Handler/ReservationHandler.asmx/CancelBooking",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var obj = JSON.parse(response.d)
            if (obj.Retcode == 1) {
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

function Delete(sid, ResId) {
    if (confirm("Do You want to delete this Booking " + ResId + " ?")) {
        var data = { BookingSid: sid }
        $.ajax({
            type: "POST",
            url: "Handler/ReservationHandler.asmx/DeleteBooking",
            data: JSON.stringify(data),
            contentType: "application/json",
            datatype: "json",
            success: function (response) {

                var obj = JSON.parse(response.d)
                if (obj.Retcode == 1) {
                    //$('#DriverDetails').empty();
                    //LoadReservations()
                    Submit();
                    $('#SpnMessege').text("Booking Deleted")
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

function CompleteBooking(Sid) {
    debugger
    var data = { BookingSid: Sid }
    $.ajax({
        type: "POST",
        url: "Handler/ReservationHandler.asmx/CompleteBooking",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {

            var obj = JSON.parse(response.d)
            if (obj.Retcode == 1) {
                Submit();
                $('#SpnMessege').text("Booking Completed")
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
