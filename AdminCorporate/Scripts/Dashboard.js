$(document).ready(function () {
    GetAllCount()
});

var ServiceToday = '', ServiceTomorrow = '', ResMadeTodayList = '', UnassignedTomorrow = '', OnlineReservation = '', UpcomingReservation = '', PendingReservation = ''
var ul = '', List = '';
function GetAllCount() {
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/LoadDashboard",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var ul = '';
            if (result.retCode == 1) {
                ServiceToday = result.ServiceToday;
                ServiceTomorrow = result.ServiceTomorrow;
                ResMadeTodayList = result.ResToday
                UnassignedTomorrow = result.UnAssigned
                OnlineReservation = result.OnlineResList
                UpcomingReservation = result.UpcomingList
                PendingReservation = result.PendingList

                $("#ServiceToday").text(ServiceToday.length);
                $("#ServiceTomorrow").text(ServiceTomorrow.length);
                $("#ResMadeTodayList").text(ResMadeTodayList.length);
                $("#UnassignedTomorrow").text(UnassignedTomorrow.length);

                $("#OnlineReservation").text(OnlineReservation.length);
                $("#UpcomingReservation").text(UpcomingReservation.length);
                $("#PendingReservation").text(PendingReservation.length);

                var Amount = 0.0;
                for (var i = 0; i < ResMadeTodayList.length; i++) {
                    Amount = Amount + ResMadeTodayList[i].TotalAmount
                }
                $("#TodayReservationAmount").text("$ " + Amount.toFixed(2));
                GetData("ServiceToday")
            }
        },
    });
}

function GetData(type) {
    var Heading = '';
    if (type == "ServiceToday") {
        DataTable = ServiceToday
        Heading = "Reservations for Service Today";
    }
    else if (type == "ServiceTomorrow") {
        DataTable = ServiceTomorrow
        Heading = "Reservations for Service Tomorrow";
    }
    else if (type == "ResMadeTodayList") {
        DataTable = ResMadeTodayList
        Heading = "Reservations Made Today";
    }
    else if (type == "UnassignedTomorrow") {
        DataTable = UnassignedTomorrow
        Heading = "Unassigned for Tomorrow";
    }
    else if (type == "OnlineReservation") {
        DataTable = OnlineReservation
        Heading = "Online Reservation";
    }
    else if (type == "UpcomingReservation") {
        DataTable = UpcomingReservation
        Heading = "Upcoming Reservation";
    }
    else if (type == "PendingReservation") {
        DataTable = PendingReservation
        Heading = "Pending Reservation";
    }
    $("#tblHeading").text(Heading)
    $("#MyDataTable").empty()
    var Div = '';
    for (var i = 0; i < DataTable.length; i++) {
        //var Name = DataTable[i].FirstName + " " + DataTable[i].LastName;
        Div += '<tr>'
        Div += '<td data-title="S.N">' + (i + 1) + '</td>'
        Div += '<td data-title="Reservation No">' + DataTable[i].ReservationNo + '</td>'
        Div += '<td data-title="Resevation Date">' + DataTable[i].ReservationDate + '</td>'
        Div += '<td data-title="Resevation Time">' + DataTable[i].Time + '</td>'
        Div += '<td data-title="Passenger">' + DataTable[i].Passenger + '</td>'
        Div += '<td data-title="Service">' + DataTable[i].Service + '</td>'
        //Div += '<td data-title="Name">' + Name + '</td>'
      
       
      
        //Div += '<td data-title="Total Fare">' + DataTable[i].TotalFare + '</td>'
        Div += '<td data-title="Status">' + DataTable[i].Status + '</td>'
        Div += '<td data-title="Source">' + DataTable[i].PickupAddress + '</td>'
        Div += '<td data-title="Destination">' + DataTable[i].DropAddress + '</td>'
        Div += '<td data-title="Driver">' + DataTable[i].Driver + '</td>'
        Div += '<td data-title="Total Amount">' + DataTable[i].TotalAmount + '</td>'
        //if (DataTable[i].IsPaid)
        //    Div += '<td data-title="Paid"><button onclick="return false;" class="btn btn-success btn-xs fa fa-check" title="Paid"></button></td>'
        //else
        //    Div += '<td data-title="Paid"><button onclick="return false;" class="btn btn-warning btn-xs fa fa-times" title="Unpaid"></td>'
        //Div += '<td align="center" class="numeric" data-title="Update | Confirm">'
        //Div += '<button type="button" onclick="RedirectToUpdate(\'' + DataTable[i].Sid + '\',\'' + DataTable[i].Service + '\')" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Edit"></button> | '
        //Div += '<button type="button" onclick="ConfirmBookingPopup(' + DataTable[i].Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-ok" title="Confirm"></button>'//
        //Div += '</td>'
        Div += '<td align="center" class="numeric" data-title="Detail">'
        Div += '<button style="border-color:#dc3545" type="button" onclick="ViewDetail(' + DataTable[i].Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-list" title="View Detail"></button>'
        Div += '</td>'
        Div += '</tr>'
    }
    if (DataTable.length == 0) {
        Div += '<tr>'
        Div += '<td colspan="12" align="center">No Record Found</td>'
        Div += '</tr>'
    }
    $("#MyDataTable").append(Div)
}

function ViewDetail(Id) {
    $("#Driver").empty();
    $("#Remark").empty();
    $("#tblDetail tbody").empty();
    var Detail = $.grep(DataTable, function (p) { return p.Sid == Id })
    $("#gridSystemModalLabel").text('Reservation No: ' + Detail[0].ReservationNo);
    var DriverId = 0;
    if (Detail[0].DriverId != null)
        DriverId = Detail[0].DriverId
    if (Detail[0].Service == 'From' || Detail[0].Service == 'From Airport') {
        $("#Airline").show();
        $("#FlightNo").show();
    }
    else {
        $("#Airline").hide();
        $("#FlightNo").hide();
    }
    var Data = { ResNo: Detail[0].ReservationNo, DriverId: DriverId };
    $.ajax({
        type: "POST",
        url: "../Corporate/Handler/CorporativeHandler.asmx/GetReservationDetail",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            if (result.retCode == 1) {
                var ul = '';
                var PassengerDetail = result.List
                if (DriverId != 0) {
                    var Driver = result.Driver;
                    $("#Driver").text('Driver: ' + Driver.sFirstName + ' ' + Driver.sLastName + ' (' + Driver.sMobile + ')');
                }
                for (var i = 0; i < PassengerDetail.length; i++) {
                    ul += '<tr>';
                    ul += '<td align="center" >' + (i + 1) + '</td>';
                    //ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationID + '</a></td>';
                    ul += '<td align="center">' + PassengerDetail[i].FirstName + ' ' + PassengerDetail[i].LastName + '</td>';
                    ul += '<td align="center">' + PassengerDetail[i].MobileNo + '</td>';
                    if (Detail[0].Service == 'From' || Detail[0].Service == 'From Airport') {
                        $("#Airline").show();
                        $("#FlightNo").show();
                        ul += '<td align="center">' + PassengerDetail[i].Airline + '</td>';
                        ul += '<td align="center">' + PassengerDetail[i].FlightNo + '</td>';
                    }

                    ul += '<td align="center">' + PassengerDetail[i].Time + '</td>';

                }
                if (Detail[0].Remark != '' && Detail[0].Remark != null)
                    $("#Remark").text('Remark: ' + Detail[0].Remark);
                $("#tblDetail tbody").append(ul);
                $("#ModelDetail").modal("show");
            }
        },
    });
}