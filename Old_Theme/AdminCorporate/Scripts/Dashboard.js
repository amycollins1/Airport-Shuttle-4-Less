$(document).ready(function () {

    //var MyList = localStorage.getItem("SearchStorage")
    //if (MyList != "" && MyList != null) {
    //    MySearch = JSON.parse(MyList);

    //    LoadVehicles()
    //    if (MySearch.Tab == 2)
    //        P2PMap()
    //    else
    //        MapDesigning()

    //}

    LoadAllCount()
    
});

var ServiceToday = '', ServiceTomorrow = '', ResMadeTodayList = '', UnassignedTomorrow = '', OnlineReservation = '',DataTable = ''
var UpcomingReservation = '', PendingReservation = '', ConfirmBookingId = 0;

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
                ServiceToday = obj.ServiceToday
                ServiceTomorrow = obj.ServiceTomorrow
                ResMadeTodayList = obj.ResMadeTodayList
                UnassignedTomorrow = obj.UnassignedTomorrow
                OnlineReservation = obj.OnlineReservation
                UpcomingReservation = obj.UpcomingReservation
                PendingReservation = obj.PendingReservation
                $("#ServiceToday").text(ServiceToday.length);
                $("#ServiceTomorrow").text(ServiceTomorrow.length);
                $("#ResMadeTodayList").text(ResMadeTodayList.length);
                $("#UnassignedTomorrow").text(UnassignedTomorrow.length);
                
                $("#OnlineReservation").text(OnlineReservation.length);
                $("#UpcomingReservation").text(UpcomingReservation.length);
                $("#PendingReservation").text(PendingReservation.length);

                var Amount = 0.0;
                for (var i = 0; i < ResMadeTodayList.length; i++) {
                    Amount = Amount + ResMadeTodayList[i].TotalFare
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
   /* $("#MyDataTable").empty()*/
    $(".displaySearch").dataTable().fnDestroy();
    var table2 = $('.displaySearch').DataTable({
        dom: 'C<"clear">lfrtip'
    });
    table2.clear()
   
    var Div = '';
    for (var i = 0; i < DataTable.length; i++) {
        var Name = DataTable[i].FirstName + " " + DataTable[i].LastName;
        var BtnPaid = "";
        if (DataTable[i].IsPaid)
            BtnPaid += '<button onclick="return false;" class="btn btn-success btn-xs fa fa-check" title="Paid"></button>'
        else
            BtnPaid += '<button onclick="return false;" class="btn btn-warning btn-xs fa fa-times" title="Unpaid">'
        //Div += '<tr>'
        //Div += '<td data-title="S.N">' + (i+1) + '</td>'
        //Div += '<td data-title="Booking No">' + DataTable[i].ReservationId + '</td>'
        //Div += '<td data-title="Name">' + Name + '</td>'
        //Div += '<td data-title="Service">' + DataTable[i].Service + '</td>'
        //Div += '<td data-title="Resevation Date">' + DataTable[i].ReservationDate + '</td>'
        //Div += '<td data-title="Resevation Time">' + DataTable[i].Time + '</td>'
        //Div += '<td data-title="Total Fare">' + DataTable[i].TotalFare + '</td>'
        //Div += '<td data-title="Status">' + DataTable[i].Status + '</td>'
        //if (DataTable[i].IsPaid)
        //    Div += '<td data-title="Paid"><button onclick="return false;" class="btn btn-success btn-xs fa fa-check" title="Paid"></button></td>'
        //else
        //    Div += '<td data-title="Paid"><button onclick="return false;" class="btn btn-warning btn-xs fa fa-times" title="Unpaid"></td>'
        //Div += '<td align="center" class="numeric" data-title="Update | Confirm">'
        //Div += '<button type="button" onclick="RedirectToUpdate(\'' + DataTable[i].Sid + '\',\'' + DataTable[i].Service + '\')" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Edit"></button> | '
        //Div += '<button type="button" onclick="ConfirmBookingPopup(' + DataTable[i].Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-ok" title="Confirm"></button>'//
        //Div += '</td>'
        //Div += '<td align="center" class="numeric" data-title="Cancel | Delete">'
        //Div += '<button onclick="return false;" class="btn btn-primary btn-xs glyphicon glyphicon-remove" title="Cancel"></button> | '
        //Div += '<button onclick="return false;" class="btn btn-primary btn-xs glyphicon glyphicon-trash" title="Delete"></button>'
        //Div += '</td>'
        //Div += '</tr>'
        table2.row.add(
            [
                (i + 1),
                DataTable[i].ReservationId,
                Name,
                DataTable[i].Service,
                DataTable[i].ReservationDate,
                DataTable[i].Time,
                DataTable[i].TotalFare,
                DataTable[i].Status,
                BtnPaid,
                '<button type="button" onclick="RedirectToUpdate(\'' + DataTable[i].Sid + '\',\'' + DataTable[i].Service + '\')" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Edit"></button> | <button type="button" onclick="ConfirmBookingPopup(' + DataTable[i].Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-ok" title="Confirm"></button>',
                /*'<button onclick="return false;" class="btn btn-primary btn-xs glyphicon glyphicon-remove" title="Cancel"></button> | <button onclick="return false;" class="btn btn-primary btn-xs glyphicon glyphicon-trash" title="Delete"></button>'*/
            ]
        ).draw();
    }
    if (DataTable.length == 0) {
        table2.clear()
    }
    /*$("#MyDataTable").append(Div)*/
    //if (DataTable.length > 0)
    //    CustumTable("displaySearch")
}

function RedirectToUpdate(id,Ser) {
    if (Ser == 'From Airport' || Ser == 'To Airport')
        location.href = 'AirportReservation.aspx?Sid=' + id;
    else if (Ser == 'Point To Point')
        location.href = 'PointToPoint.aspx?Sid=' + id;
    else if (Ser == 'Hourly')
        location.href = 'HourReservation.aspx?Sid=' + id;
    else if (Ser == 'Frederick-From Airport' || Ser == 'Frederick-To Airport')
        location.href = 'FrederickReservation.aspx?Sid=' + id;
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

function ConfirmSendInterest() {
    msg = "Are you sure want to send interest request to " + TheirProfile.FirstName + " " + TheirProfile.LastName + " ?";
    Confirm(msg, "SendInterest", null);
}