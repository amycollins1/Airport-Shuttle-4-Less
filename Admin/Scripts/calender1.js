var ArrReservation = [];

function formattedDate(d) {
    return [d.getMonth() + 1, d.getDate(), d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
};

    var Script = function () {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var Begin1 = new Date(y, m, 1);
        var End1 = new Date(y, m + 1, 0);
    
        $('#calendar1').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
            editable: true,
            viewRender: function (view) {

                $('#calendar1').fullCalendar('removeEvents');
                $('#calendar1').fullCalendar('addEventSource', month);
            },
            events: function (start, end, callback) {
                var data = { From: formattedDate(new Date(y, m, 1)), To: formattedDate(new Date(y, m + 1, 0)) }
                $.ajax({
                    type: "POST",
                    url: "Handler/CalenderHandler.asmx/SearchReservationByDate",
                    data: JSON.stringify(data),
                    //data: {
                    //    // our hypothetical feed requires UNIX timestamps
                    //    start: Math.round(start.getTime() / 1000),
                    //    end: Math.round(end.getTime() / 1000)
                    //},
                    contentType: "application/json",
                    datatype: "json",
                    success: function (response) {
                        var obj = JSON.parse(response.d);
                        ArrReservation = obj.ArrReservation

                        var events = [];
                        var div = '';
                        $('#bookings').empty()
                        var j = 0;

                        const orderedDates = ArrReservation.sort((a, b) => {
                            const dateCompareResult = new Date(a.ReservationDate) - new Date(b.ReservationDate);
                            return dateCompareResult;
                        });

                        for (var i = 0; i < orderedDates.length; i++) {
                            var ResDate = new Date(orderedDates[i].ReservationDate.replace(/-/g, "/"));
                            events.push({
                                title: orderedDates[i].FirstName + '(' + orderedDates[i].ReservationId + ')',
                                start: ResDate,
                                tip: orderedDates[i].Source + ' to ' + orderedDates[i].Destination,
                            });
                            var ResID = orderedDates[i].ReservationId;
                            if (date <= ResDate && j < 10) {
                                div += '<div class="desc">';
                                div += '<div class="thumb"><img class="img-circle" src="assets/img/ui-danro.jpg" width="35px" height="35px" align=""></div>';
                                div += '<div class="details" style=" cursor: pointer;" id="' + ResID + '" onclick="BookingPopup(this.id)">';
                                div += '<p><a>' + orderedDates[i].ReservationId + '</a><br/>';
                                div += '<muted>' + orderedDates[i].FirstName + ' ' + orderedDates[i].LastName + ' (' + getUSFormatDate(ResDate) + ')</muted>';
                                div += '</p>';
                                div += '</div></div>';
                                j++;
                            }                        
                        }
                        $('#bookings').append(div)
                        callback(events);
                    }
                });
            },        
            //eventMouseover: function (calEvent, jsEvent) {
            //    var tooltip = '<div class="tooltipevent" style="width:150px;height:auto;color:#f2f2f2;background:#424a5d;position:absolute;z-index:10001;">' + calEvent.tip + '</div>';
            //    $("body").append(tooltip);
            //    $(this).mouseover(function (e) {
            //        $(this).css('z-index', 10000);
            //        $('.tooltipevent').fadeIn('500');
            //        $('.tooltipevent').fadeTo('10', 1.9);
            //    }).mousemove(function (e) {
            //        $('.tooltipevent').css('top', e.pageY + 10);
            //        $('.tooltipevent').css('left', e.pageX + 20);
            //    });
            //},
            //eventMouseout: function (calEvent, jsEvent) {
            //    $(this).css('z-index', 8);
            //    $('.tooltipevent').remove();
            //},
            eventColor: '#dc3545',
            eventClick:  function(arg) {  
                var ResID = arg.title.split('(')[1].split(')')[0];
                BookingPopup(ResID);
            }, 
        });
    }();

    function BookingPopup(ResID)
    {
        var BookingData = $.grep(ArrReservation, function (p) { return p.ReservationId == ResID });
        $("#InVoice").val(BookingData[0].Sid)
        $("#BookingNo").text(BookingData[0].ReservationId);
        $("#ResDate").text(BookingData[0].ReservationDate);
        if (BookingData[0].Service == "To Airport" || BookingData[0].Service == "From Airport") {
            $("#Source").text(BookingData[0].Source);
            $("#Destination").text(BookingData[0].Destination);
        }

        else {
            $("#Source").text(BookingData[0].Source);
            $("#Destination").text(BookingData[0].Destination);

        }
        if (BookingData[0].Service == "Frederick-To Airport" || BookingData[0].Service == "Frederick-From Airport") {
            $("#Address").empty();
            $("#Address").append('<td colspan="2" style="padding:8px"><p style="font-weight:bold">Address:</p><p>' + BookingData[0].Address + '</p></td>');
            document.getElementById('Address').style.display = ''
        }
        else {
            $("#Address").empty();
            document.getElementById('Address').style.display = 'none'
        }
        if (BookingData[0].AssignedTo == null)
            BookingData[0].AssignedTo = "not assign"
        $("#AssignedTo").text(BookingData[0].AssignedTo);
        var Name = BookingData[0].FirstName + " " + BookingData[0].LastName;
        $("#Name").text(Name);
        $("#Service").text(BookingData[0].Service);
        $("#TotalFare").text("$ " + BookingData[0].TotalFare);
        $("#Passenger").text(BookingData[0].Passenger);
        if (BookingData[0].PhoneNo != null)
            $("#PhoneNo").text(BookingData[0].PhoneNo);
        else {
            BookingData[0].PhoneNumber = BookingData[0].PhoneNo
            $("#PhoneNo").text(BookingData[0].PhoneNo);
        }

        if (BookingData[0].Service == "From Airport") {
            if (BookingData[0].Ret_FlightTime != null)
                $("#ResTime").text(BookingData[0].Ret_FlightTime);
            else
                $("#ResTime").text(BookingData[0].Time);
        }
        else if (BookingData[0].Service == "To Airport") {
            if (BookingData[0].Ret_Time != null)
                $("#ResTime").text(BookingData[0].Ret_Time);
            else
                $("#ResTime").text(BookingData[0].Pickup_Time);
        }
        else if (BookingData[0].P2PTime != null)
            $("#ResTime").text(BookingData[0].P2PTime);
        else if (BookingData[0].Service == "From Airport Shuttle") {
            if (BookingData[0].Ret_FlightTime != null)
                $("#ResTime").text(BookingData[0].Ret_FlightTime);
            else
                $("#ResTime").text(BookingData[0].Time);
        }
        else if (BookingData[0].Service == "To Airport Shuttle") {
            if (BookingData[0].Ret_FlightTime != null)
                $("#ResTime").text(BookingData[0].Ret_Time);
            else
                $("#ResTime").text(BookingData[0].Pickup_Time);
        }
        else
            $("#ResTime").text(BookingData[0].Time);


        $("#BookingDetails").modal("show");
    }
 
    function PrintInvoice() {
        var ObjNo = $("#InVoice").val();
        var BookingData = $.grep(ArrReservation, function (p) { return p.Sid == ObjNo });
        var Name = BookingData[0].FirstName + " " + BookingData[0].LastName;
        var ResService = BookingData[0].Service;
        var ResTime = "";
        if (ResService == "From Airport") {
            ResTime = BookingData[0].Time;
        }
        else if (ResService == "To Airport") {
            ResTime = BookingData[0].Time;
        } 
        if (BookingData[0].AssignedTo == null)
            BookingData[0].AssignedTo = 'Not Assigned'
        var url = "../InvoicePrint.aspx?BookingNo=" + BookingData[0].ReservationId + "&ResDate=" + BookingData[0].ReservationDate + "&Source=" + BookingData[0].Source +
                               "&Destination=" + BookingData[0].Destination + "&AssignedTo=" + BookingData[0].AssignedTo + "&Name=" + Name + "&Service=" + BookingData[0].Service +
                               "&TotalFare=" + "$" + BookingData[0].TotalFare + "&Passenger=" + BookingData[0].Passenger + "&PhoneNo=" + BookingData[0].PhoneNo + "&ResTime=" + ResTime
        window.open(url, 'Print Invoice');

    }


    function getUSFormatDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    }