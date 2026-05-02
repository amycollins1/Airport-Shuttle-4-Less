var Script = function () {

   

    /* initialize the calendar
     -----------------------------------------------------------------*/

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var Begin1 = new Date(y, m, 1);
    var End1 = new Date(y, m + 1, 0);

    var events_array = [
        {
            title: 'Booking 1',
            start: '2022-07-02',
            tip: 'Test Booking 1 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 1',
            start: '2022-07-02',
            tip: 'Test Booking 1 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 1',
            start: '2022-07-02',
            tip: 'Test Booking 1 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 1',
            start: '2022-07-02',
            tip: 'Test Booking 1 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 1',
            start: '2022-07-02',
            tip: 'Test Booking 1 from airport 1 to BWI airport'
        },

        {
            title: 'Booking 2',
            start: '2022-08-02',
            tip: 'Test Booking 2 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 3',
            start: new Date(y, m, 1),
            tip: 'Test Booking 3 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 4',
            start: new Date(y, m, 3),
            tip: 'Test Booking 4 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 5',
            start: new Date(y, m, 1),
            tip: 'Test Booking 5 from airport 1 to BWI airport'
        },
        {
            title: 'Booking 6',
            start: new Date(y, m, 1),
            tip: 'Test Booking 6 from airport 1 to BWI airport'
        }
    ];
 

    $('#calendar1').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        /*selectable: true,*/
        /*events: events_array,*/
        events: function (Begin1, End1, callback) {
            var cmonth = m;
            callback(events_array);
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