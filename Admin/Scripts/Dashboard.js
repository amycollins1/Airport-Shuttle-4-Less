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
        contentType: "application/json",
        success: function (response) {

            var obj = JSON.parse(response.d);

            if (obj.retCode == 1) {

                var data = obj.data;

                $("#ServiceToday").text(data.ServiceToday);
                $("#ServiceTomorrow").text(data.ServiceTomorrow);
                $("#ResMadeTodayList").text(data.ResMadeTodayList);
                $("#UnassignedTomorrow").text(data.UnassignedTomorrow);
                $("#OnlineReservation").text(data.OnlineReservation);
                $("#UpcomingReservation").text(data.UpcomingReservation);
                $("#PendingReservation").text(data.PendingReservation);
            }
        }
    });
}

var currentPage = 1;
var pageSize = 50;

function GetData(type) {

    $("#tblHeading").text(type);

    $.ajax({
        type: "POST",
        url: "Handler/DashboardHandler.asmx/GetReservations",
        data: JSON.stringify({ type: type, page: currentPage, pageSize: pageSize }),
        contentType: "application/json",
        success: function (response) {

            var obj = JSON.parse(response.d);

            if (obj.retCode == 1) {

                var DataTable = obj.data;

                $(".displaySearch").dataTable().fnDestroy();

                var table = $('.displaySearch').DataTable();

                table.clear();

                for (var i = 0; i < DataTable.length; i++) {

                    var row = DataTable[i];

                    var name = row.FirstName + " " + row.LastName;

                    var paidBtn = row.IsPaid
                        ? '<button class="btn btn-success btn-xs fa fa-check"></button>'
                        : '<button class="btn btn-warning btn-xs fa fa-times"></button>';

                    table.row.add([
                        (i + 1),
                        row.ReservationId,
                        name,
                        row.Service,
                        row.ReservationDate,
                        row.Time,
                        row.TotalFare,
                        row.Status,
                        paidBtn,
                        '<button onclick="RedirectToUpdate(\'' + row.Sid + '\')" class="btn btn-primary btn-xs">Edit</button>'
                    ]);
                }

                table.draw();
            }
        }
    });
}

function NextPage(type) {
    currentPage++;
    GetData(type);
}

function PrevPage(type) {
    if (currentPage > 1) {
        currentPage--;
        GetData(type);
    }
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