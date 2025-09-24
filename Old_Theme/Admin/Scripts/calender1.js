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
                    var ArrReservation = obj.ArrReservation

                    var events = [];
                    var div = '';
                    $('#bookings').empty()
                    for (var i = 0; i < ArrReservation.length; i++) {
                        var ResDate = new Date(ArrReservation[i].ReservationDate.replace(/-/g, "/"));
                        events.push({
                            title: ArrReservation[i].FirstName + '(' + ArrReservation[i].ReservationId+')',
                            start: ResDate,
                            tip: ArrReservation[i].Source + ' to ' + ArrReservation[i].Destination
                        });
                        if (i < 5) {
                            div += '<div class="desc">';
                            div += '<div class="thumb"><span class="badge bg-theme"><i class="fa fa-car"></i></span></div>';
                            div += '<div class="details">';
                            div += '<p><muted>' + ResDate + '</muted><br/>';
                            div += '<a href="#"><i class="fa fa-arrow-right"></i></a> ' + ArrReservation[i].FirstName + '(' + ArrReservation[i].ReservationId+')</p>';
                            div += '</div>'
                            div += ' </div>'
                        }                        
                    }
                    $('#bookings').append(div)
                    callback(events);
                }
            });


        },        
        eventMouseover: function (calEvent, jsEvent) {
            var tooltip = '<div class="tooltipevent" style="width:150px;height:auto;color:#f2f2f2;background:#424a5d;position:absolute;z-index:10001;">' + calEvent.tip + '</div>';
            $("body").append(tooltip);
            $(this).mouseover(function (e) {
                $(this).css('z-index', 10000);
                $('.tooltipevent').fadeIn('500');
                $('.tooltipevent').fadeTo('10', 1.9);
            }).mousemove(function (e) {
                $('.tooltipevent').css('top', e.pageY + 10);
                $('.tooltipevent').css('left', e.pageX + 20);
            });
        },
        eventMouseout: function (calEvent, jsEvent) {
            $(this).css('z-index', 8);
            $('.tooltipevent').remove();
        },
        eventColor: '#dc3545'
    });
}();


function formattedDate(d = new Date) {
    return [d.getMonth() + 1, d.getDate(), d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
}
