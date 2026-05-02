var markers
var From
var To
var Dis
var Ti
var Dt
var Person
var Tab
var Source
var AddLatLong
var Temp
var SourceLat
var SourceLong
var DestinationLat
var DestinationLong
var Hours = '';

var SourceLatitude
var SourceLongitude
var DestinationLatitude
var DestinationLongitude
var Stop1="";
var Stop2="";
var Stop3="";
var Stop4="";
var Stop5 = "";

var Pickuptime;

var ChkRet;
var Return_Date;
var Ret_FlightNumber;
var Ret_Airlines;
var Ret_FlightTime;

var From_FlightNumber;
var From_ArrTime;
var From_Airlines;
var From_ReturnDate;
var From_RetTime;

var PickTimeHourly;
var PickTime;
var Sid = 0;
var Adult = 0;
var Child = 0;
var ChildL5 = 0;
var dAdult = 0;
var dChild = 0;
var dChildL5 = 0;
//Written onto aspx page
//$(function () {
//    debugger;
//    Tab = GetQueryStringParams('Tab');
//    if (Tab == "1") {
//        var Ser = GetQueryStringParams('Service');
//        Ser = Ser.replace(/%20/g, " ");


//        From = GetQueryStringParams('From');
//        From = From.replace(/%20/g, " ");
//        To = GetQueryStringParams('To');
//        To = To.replace(/%20/g, " ");
//        Temp = GetQueryStringParams('LatLongFirstTab');
//        Person = GetQueryStringParams('Passenger');
//        AddLatLong = Temp.split(',');
//        SourceLat = AddLatLong[0];
//        SourceLong = AddLatLong[1];
//        DestinationLat = AddLatLong[2];
//        DestinationLong = AddLatLong[3];
//        Dis = AddLatLong[5];
//        Dis = Dis.replace(/%20/g, " ");
//        Ti = AddLatLong[4];
//        Ti = Ti.replace(/%20/g, " ");
//    }


//    if (Tab == "2") {
//        From = GetQueryStringParams('SourceP2P');
//        From = From.replace(/%20/g, " ");
//        To = GetQueryStringParams('DestinationP2P');
//        To = To.replace(/%20/g, " ");
//        Temp = GetQueryStringParams('LatLongP2P');
//        Person = GetQueryStringParams('PassengerP2P');
//        AddLatLong = Temp.split(',');
//        SourceLat = AddLatLong[0];
//        SourceLong = AddLatLong[1];
//        DestinationLat = AddLatLong[2];
//        DestinationLong = AddLatLong[3];
//        Dis = AddLatLong[5];
//        Dis = Dis.replace(/%20/g, " ");
//        Ti = AddLatLong[4];
//        Ti = Ti.replace(/%20/g, " ");
//    }
//    if (Tab == "3") {
//        From = GetQueryStringParams('Source');
//        From = From.replace(/%20/g, " ");
//        To = GetQueryStringParams('Destination');
//        To = To.replace(/%20/g, " ");
//        Temp = GetQueryStringParams('LatLong');
//        Person = GetQueryStringParams('Passenger');

//        AddLatLong = Temp.split(',');
//        SourceLat = AddLatLong[0];
//        SourceLong = AddLatLong[1];
//        DestinationLat = AddLatLong[2];
//        DestinationLong = AddLatLong[3];
//        Dis = AddLatLong[5];
//        Dis = Dis.replace(/%20/g, " ");
//        Ti = AddLatLong[4];
//        Ti = Ti.replace(/%20/g, " ");

//        Hours = GetQueryStringParams('Halt');
//    }

//    CarLoad();

//})

var SortArrPrice
function CarLoad() {
    var data = { Tab: Tab, Capacity: Person }
    $.ajax({
        type: "POST",
        url: "../BookingHandler.asmx/LoadCars",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.Retcode == 1) {
                debugger
                var arr = obj.ArrCar;
                SortArrPrice = arr;

                $('#MinimumPrice').text(arr[0].BaseCharge)
                $('#TotalCars').text(arr.length)

                var Content = '';
                if (Tab == "1" || Tab == "2") {

                    for (var i = 0; i < arr.length; i++) {

                        Content += '<div class="col-md-4 col-sm-6">'
                        Content += ' <!--Taxi Holder Start-->'
                        Content += '<article class="cp-taxi-holder">'
                        Content += '<figure class="cp-thumb">'
                        Content += '    <img src="' + arr[i].Img_Url + '" alt="">'
                        Content += '</figure>'
                        Content += '<div class="cp-text">'
                        Content += '<h3>' + arr[i].Model + '</h3>'
                        Content += '<ul class="cp-meta-listed">'
                        Content += '<li>Maximum Capacity: <span>' + arr[i].Max_Capcity + '</span></li>'
                        Content += '<li>Max Baggage: <span>' + arr[i].Max_Baggage + '</span></li>'
                        if (Tab == "1" || Tab == "2") {
                            var Price = parseFloat(arr[i].BaseCharge) + parseFloat(Dis) * parseFloat(arr[i].MilesPerDistance);
                            Price = Price.toFixed(2);
                            Content += '<li>Price: $ <strong>' + Price + '</strong></li>'
                        }
                        Content += '</ul>'
                        Content += '<a style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].CarType_Sid + ') class="cp-btn-style1">Book Now</a> '
                        Content += '</div>'
                        Content += '</article><!--Taxi Holder End-->'
                        Content += '</div>'
                    }
                    $('#Div_Cars').append(Content);
                }
                else {

                    for (var i = 0; i < arr.length; i++) {
                        // Ui //
                        Content += '<div class="col-md-4 col-sm-6">'
                        Content += ' <!--Taxi Holder Start-->'
                        Content += '<article class="cp-taxi-holder">'
                        Content += '<figure class="cp-thumb">'
                        Content += '    <img src="' + arr[i].Img_Url + '" alt="">'
                        Content += '</figure>'
                        Content += '<div class="cp-text">'
                        Content += '<h3>' + arr[i].Model + '</h3>'
                        Content += '<ul class="cp-meta-listed">'
                        Content += '<li>Minimum Hours: <span>' + arr[i].HourlyMinimum + '</span></li>'
                        Content += '<li>Maximum Hours : <span>' + arr[i].ServiceUpto + '</span></li>'

                        var Price = parseFloat(Hours) * parseFloat(arr[i].HourlyRate);
                        Price = Price.toFixed(2);
                        Content += '<li>Price: $ <strong>' + Price + '</strong></li>'

                        Content += '</ul>'
                        Content += '<a style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].CarType_Sid + ') class="cp-btn-style1">Book Now</a> '
                        Content += '</div>'
                        Content += '</article><!--Taxi Holder End-->'
                        Content += '</div>'
                        // end Ui //
                    }

                    $('#Div_Cars').append(Content);
                }
            }
            else if (obj.Retcode == 2) {
                $('#SpnMessege').text("No Record Found")
                $('#ModelMessege').modal('show')
            }
            else if (obj.Retcode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function SortByPrice() {
    debugger;
    var arr = SortArrPrice
    arr = arr.reverse();
    var Content = '';
    $('#Div_Cars').empty();
    if (Tab == "1" || Tab == "2") {

        for (var i = 0; i < arr.length; i++) {

            Content += '<div class="offset-2">';
            Content += '<div class="col-md-4 offset-0">';
            Content += '<div class="listitem2">';
            Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
            Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
            Content += '<div class="liover"></div>';
            Content += '</div>';
            Content += '</div>';
            Content += '<div class="col-md-8 offset-0">';
            Content += '<div class="itemlabel3">';
            Content += '<div class="labelright">';
            Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
            Content += '<br />';
            Content += '<br />';
            Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
            Content += '<span class="size11 grey">18 Reviews</span><br />';
            Content += '<br />';
            Content += '<span class="green size18"><b>$' + arr[i].BaseCharge + '</b></span><br />';
            Content += '<span class="size11 grey">avg/night</span><br />';
            Content += '<br />';
            Content += '<br />';
            Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
            Content += '</div>';
            Content += '<div class="labelleft2">';
            Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
            Content += '<br />';
            Content += '<br />';
            Content += '<p class="grey">';
            Content += '<span class="grey">Maximum Capacity ' + arr[i].Max_Capcity + '</span><br><br>';
            Content += '<span class="grey">Max Baggage ' + arr[i].Max_Baggage + '</span><br><br>';
            Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
            Content += '</p>';
            Content += '<br />';
            Content += '<ul class="hotelpreferences">';
            Content += '<li class="icohp-hairdryer"></li>';
            Content += '<li class="icohp-garden"></li>';
            Content += '<li class="icohp-grill"></li>';
            Content += '<li class="icohp-kitchen"></li>';
            Content += '<li class="icohp-bar"></li>';
            Content += '<li class="icohp-living"></li>';
            Content += '<li class="icohp-tv"></li>';
            Content += '</ul>';
            Content += '</div>';
            Content += '</div>';
            Content += '</div>';
            Content += '</div>';
            Content += '<div class="clearfix"></div>';
            Content += '<div class="offset-2">';
            Content += '<hr class="featurette-divider3">';
            Content += '</div>';
        }
        $('#Div_Cars').append(Content);
    }
    else {

        for (var i = 0; i < arr.length; i++) {
            Content += '<div class="offset-2">';
            Content += '<div class="col-md-4 offset-0">';
            Content += '<div class="listitem2">';
            Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
            Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
            Content += '<div class="liover"></div>';


            Content += '</div>';
            Content += '</div>';
            Content += '<div class="col-md-8 offset-0">';
            Content += '<div class="itemlabel3">';
            Content += '<div class="labelright">';
            Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
            Content += '<br />';
            Content += '<br />';
            Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
            Content += '<span class="size11 grey">18 Reviews</span><br />';
            Content += '<br />';
            Content += '<span class="green size18"><b>$' + arr[i].HourlyRate + '</b></span><br />';
            Content += '<span class="size11 grey">Per Hour</span><br />';
            Content += '<br />';
            Content += '<br />';
            Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
            Content += '</div>';
            Content += '<div class="labelleft2">';
            Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
            Content += '<br />';
            Content += '<br />';
            Content += '<p class="grey">';
            Content += '<span class="grey">Minimum Hours ' + arr[i].HourlyMinimum + '</span><br><br>';
            Content += '<span class="grey">Maximum Hours ' + arr[i].ServiceUpto + '</span><br><br>';
            Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
            Content += '</p>';
            Content += '<br />';
            Content += '<ul class="hotelpreferences">';
            Content += '<li class="icohp-hairdryer"></li>';
            Content += '<li class="icohp-garden"></li>';
            Content += '<li class="icohp-grill"></li>';
            Content += '<li class="icohp-kitchen"></li>';
            Content += '<li class="icohp-bar"></li>';
            Content += '<li class="icohp-living"></li>';
            Content += '<li class="icohp-tv"></li>';
            Content += '</ul>';
            Content += '</div>';
            Content += '</div>';
            Content += '</div>';
            Content += '</div>';
            Content += '<div class="clearfix"></div>';
            Content += '<div class="offset-2">';
            Content += '<hr class="featurette-divider3">';
            Content += '</div>';
        }

        $('#Div_Cars').append(Content);
    }
}

var Valid=false // whatever result it will sort by Assending first Time
function SortByModel() {
    debugger;
    if (Valid) {
        Valid = false
        Descending()
    }
    else {
        Valid = true
        Assending();
    }
}

function RedirectToBooking(sid) {
    if (Person != 0)
    {
        if (Tab == "1") {
            window.location.href = "Booking.aspx?Sid=" + sid + "&From=" + From + "&To=" + To + "&Distance=" + Dis + "&Time=" + Ti + "&Dt=" + Dt + "&Person=" + Person + "&IsP2P=" + "false" + "&Service=" + $('#hdn_service').val() + "&Pickuptime=" + Pickuptime + "&ChkRet=" + ChkRet + "&Return_Date=" + Return_Date + "&Ret_FlightNumber=" + Ret_FlightNumber + "&Ret_Airlines=" + Ret_Airlines + "&Ret_FlightTime=" + Ret_FlightTime + "&From_FlightNumber=" + From_FlightNumber + "&From_ArrTime=" + From_ArrTime + "&From_Airlines=" + From_Airlines + "&From_ReturnDate=" + From_ReturnDate + "&From_RetTime=" + From_RetTime + "&Tab=1";
        }
        if (Tab == "2") {
            window.location.href = "Booking.aspx?Sid=" + sid + "&From=" + From + "&To=" + To + "&Distance=" + Dis + "&Time=" + Ti + "&Dt=" + Dt + "&PickTime=" + PickTime + "&Person=" + Person + "&IsP2P=" + "true" + "&Stop1=" + Stop1 + "&Stop2=" + Stop2 + "&Stop3=" + Stop3 + "&Stop4=" + Stop4 + "&Stop5=" + Stop5 + "&Tab=2";
        }
        if (Tab == "3") {
            window.location.href = "Booking.aspx?Sid=" + sid + "&From=" + From + "&To=" + To + "&Distance=" + Dis + "&Time=" + Ti + "&Dt=" + Dt + "&Person=" + Person + "&IsP2P=" + "false" + "&Hours=" + Hours + "&PickTimeHourly=" + PickTimeHourly + "&Tab=3";
        }
    }
    else {
        alert("Please select passenger")
    }
}

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function Assending() {
    $.ajax({
        type: "POST",
        url: "../BookingHandler.asmx/Assending",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.Retcode == 1) {
                debugger
                var arr = obj.ArrCar;

                $('#Div_Cars').empty();
                var Content = '';
                if (Tab == "1" || Tab == "2") {

                    for (var i = 0; i < arr.length; i++) {

                        Content += '<div class="offset-2">';
                        Content += '<div class="col-md-4 offset-0">';
                        Content += '<div class="listitem2">';
                        Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
                        Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
                        Content += '<div class="liover"></div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="col-md-8 offset-0">';
                        Content += '<div class="itemlabel3">';
                        Content += '<div class="labelright">';
                        Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
                        Content += '<span class="size11 grey">18 Reviews</span><br />';
                        Content += '<br />';
                        Content += '<span class="green size18"><b>$' + arr[i].BaseCharge + '</b></span><br />';
                        Content += '<span class="size11 grey">avg/night</span><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
                        Content += '</div>';
                        Content += '<div class="labelleft2">';
                        Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<p class="grey">';
                        Content += '<span class="grey">Maximum Capacity ' + arr[i].Max_Capcity + '</span><br><br>';
                        Content += '<span class="grey">Max Baggage ' + arr[i].Max_Baggage + '</span><br><br>';
                        Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
                        Content += '</p>';
                        Content += '<br />';
                        Content += '<ul class="hotelpreferences">';
                        Content += '<li class="icohp-hairdryer"></li>';
                        Content += '<li class="icohp-garden"></li>';
                        Content += '<li class="icohp-grill"></li>';
                        Content += '<li class="icohp-kitchen"></li>';
                        Content += '<li class="icohp-bar"></li>';
                        Content += '<li class="icohp-living"></li>';
                        Content += '<li class="icohp-tv"></li>';
                        Content += '</ul>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="clearfix"></div>';
                        Content += '<div class="offset-2">';
                        Content += '<hr class="featurette-divider3">';
                        Content += '</div>';
                    }
                    $('#Div_Cars').append(Content);
                }
                else {

                    for (var i = 0; i < arr.length; i++) {
                        Content += '<div class="offset-2">';
                        Content += '<div class="col-md-4 offset-0">';
                        Content += '<div class="listitem2">';
                        Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
                        Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
                        Content += '<div class="liover"></div>';


                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="col-md-8 offset-0">';
                        Content += '<div class="itemlabel3">';
                        Content += '<div class="labelright">';
                        Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
                        Content += '<span class="size11 grey">18 Reviews</span><br />';
                        Content += '<br />';
                        Content += '<span class="green size18"><b>$' + arr[i].HourlyRate + '</b></span><br />';
                        Content += '<span class="size11 grey">Per Hour</span><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
                        Content += '</div>';
                        Content += '<div class="labelleft2">';
                        Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<p class="grey">';
                        Content += '<span class="grey">Minimum Hours ' + arr[i].HourlyMinimum + '</span><br><br>';
                        Content += '<span class="grey">Maximum Hours ' + arr[i].ServiceUpto + '</span><br><br>';
                        Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
                        Content += '</p>';
                        Content += '<br />';
                        Content += '<ul class="hotelpreferences">';
                        Content += '<li class="icohp-hairdryer"></li>';
                        Content += '<li class="icohp-garden"></li>';
                        Content += '<li class="icohp-grill"></li>';
                        Content += '<li class="icohp-kitchen"></li>';
                        Content += '<li class="icohp-bar"></li>';
                        Content += '<li class="icohp-living"></li>';
                        Content += '<li class="icohp-tv"></li>';
                        Content += '</ul>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="clearfix"></div>';
                        Content += '<div class="offset-2">';
                        Content += '<hr class="featurette-divider3">';
                        Content += '</div>';
                    }

                    $('#Div_Cars').append(Content);
                }
            }

            else if (obj.Retcode == 2) {
                $('#SpnMessege').text("No Record Found")
                $('#ModelMessege').modal('show')
            }

            else if (obj.Retcode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function Descending() {
    $.ajax({
        type: "POST",
        url: "../BookingHandler.asmx/Descending",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.Retcode == 1) {
                debugger
                var arr = obj.ArrCar;

                $('#Div_Cars').empty();
                var Content = '';
                if (Tab == "1" || Tab == "2") {

                    for (var i = 0; i < arr.length; i++) {

                        Content += '<div class="offset-2">';
                        Content += '<div class="col-md-4 offset-0">';
                        Content += '<div class="listitem2">';
                        Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
                        Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
                        Content += '<div class="liover"></div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="col-md-8 offset-0">';
                        Content += '<div class="itemlabel3">';
                        Content += '<div class="labelright">';
                        Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
                        Content += '<span class="size11 grey">18 Reviews</span><br />';
                        Content += '<br />';
                        Content += '<span class="green size18"><b>$' + arr[i].BaseCharge + '</b></span><br />';
                        Content += '<span class="size11 grey">avg/night</span><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
                        Content += '</div>';
                        Content += '<div class="labelleft2">';
                        Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<p class="grey">';
                        Content += '<span class="grey">Maximum Capacity ' + arr[i].Max_Capcity + '</span><br><br>';
                        Content += '<span class="grey">Max Baggage ' + arr[i].Max_Baggage + '</span><br><br>';
                        Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
                        Content += '</p>';
                        Content += '<br />';
                        Content += '<ul class="hotelpreferences">';
                        Content += '<li class="icohp-hairdryer"></li>';
                        Content += '<li class="icohp-garden"></li>';
                        Content += '<li class="icohp-grill"></li>';
                        Content += '<li class="icohp-kitchen"></li>';
                        Content += '<li class="icohp-bar"></li>';
                        Content += '<li class="icohp-living"></li>';
                        Content += '<li class="icohp-tv"></li>';
                        Content += '</ul>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="clearfix"></div>';
                        Content += '<div class="offset-2">';
                        Content += '<hr class="featurette-divider3">';
                        Content += '</div>';
                    }
                    $('#Div_Cars').append(Content);
                }
                else {

                    for (var i = 0; i < arr.length; i++) {
                        Content += '<div class="offset-2">';
                        Content += '<div class="col-md-4 offset-0">';
                        Content += '<div class="listitem2">';
                        Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
                        Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
                        Content += '<div class="liover"></div>';


                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="col-md-8 offset-0">';
                        Content += '<div class="itemlabel3">';
                        Content += '<div class="labelright">';
                        Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
                        Content += '<span class="size11 grey">18 Reviews</span><br />';
                        Content += '<br />';
                        Content += '<span class="green size18"><b>$' + arr[i].HourlyRate + '</b></span><br />';
                        Content += '<span class="size11 grey">Per Hour</span><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
                        Content += '</div>';
                        Content += '<div class="labelleft2">';
                        Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<p class="grey">';
                        Content += '<span class="grey">Minimum Hours ' + arr[i].HourlyMinimum + '</span><br><br>';
                        Content += '<span class="grey">Maximum Hours ' + arr[i].ServiceUpto + '</span><br><br>';
                        Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
                        Content += '</p>';
                        Content += '<br />';
                        Content += '<ul class="hotelpreferences">';
                        Content += '<li class="icohp-hairdryer"></li>';
                        Content += '<li class="icohp-garden"></li>';
                        Content += '<li class="icohp-grill"></li>';
                        Content += '<li class="icohp-kitchen"></li>';
                        Content += '<li class="icohp-bar"></li>';
                        Content += '<li class="icohp-living"></li>';
                        Content += '<li class="icohp-tv"></li>';
                        Content += '</ul>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="clearfix"></div>';
                        Content += '<div class="offset-2">';
                        Content += '<hr class="featurette-divider3">';
                        Content += '</div>';
                    }

                    $('#Div_Cars').append(Content);
                }
            }

            else if (obj.Retcode == 2) {
                $('#SpnMessege').text("No Record Found")
                $('#ModelMessege').modal('show')
            }

            else if (obj.Retcode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

function PriceFilter() {
    debugger;

    var Min = $('#Slider1').val();
    var Max = $('#Slider2').val();

    var data = { Min: Min, Max: Max }
    $.ajax({
        type: "POST",
        url: "../BookingHandler.asmx/PriceFilter",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.Retcode == 1) {
                debugger
                var arr = obj.ArrCar;
                $('#Div_Cars').empty();
                var Content = '';
                if (Tab == "1" || Tab == "2") {

                    for (var i = 0; i < arr.length; i++) {

                        Content += '<div class="offset-2">';
                        Content += '<div class="col-md-4 offset-0">';
                        Content += '<div class="listitem2">';
                        Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
                        Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
                        Content += '<div class="liover"></div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="col-md-8 offset-0">';
                        Content += '<div class="itemlabel3">';
                        Content += '<div class="labelright">';
                        Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
                        Content += '<span class="size11 grey">18 Reviews</span><br />';
                        Content += '<br />';
                        Content += '<span class="green size18"><b>$' + arr[i].BaseCharge + '</b></span><br />';
                        Content += '<span class="size11 grey">avg/night</span><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
                        Content += '</div>';
                        Content += '<div class="labelleft2">';
                        Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<p class="grey">';
                        Content += '<span class="grey">Maximum Capacity ' + arr[i].Max_Capcity + '</span><br><br>';
                        Content += '<span class="grey">Max Baggage ' + arr[i].Max_Baggage + '</span><br><br>';
                        Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
                        Content += '</p>';
                        Content += '<br />';
                        Content += '<ul class="hotelpreferences">';
                        Content += '<li class="icohp-hairdryer"></li>';
                        Content += '<li class="icohp-garden"></li>';
                        Content += '<li class="icohp-grill"></li>';
                        Content += '<li class="icohp-kitchen"></li>';
                        Content += '<li class="icohp-bar"></li>';
                        Content += '<li class="icohp-living"></li>';
                        Content += '<li class="icohp-tv"></li>';
                        Content += '</ul>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="clearfix"></div>';
                        Content += '<div class="offset-2">';
                        Content += '<hr class="featurette-divider3">';
                        Content += '</div>';
                    }
                    $('#Div_Cars').append(Content);
                }
                else {

                    for (var i = 0; i < arr.length; i++) {
                        Content += '<div class="offset-2">';
                        Content += '<div class="col-md-4 offset-0">';
                        Content += '<div class="listitem2">';
                        Content += '<a href="' + arr[i].Img_Url + '" data-footer="A custom footer text" data-title="A random title" data-gallery="multiimages" data-toggle="lightbox">';
                        Content += '<img src="' + arr[i].Img_Url + '" alt="" /></a>';
                        Content += '<div class="liover"></div>';


                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="col-md-8 offset-0">';
                        Content += '<div class="itemlabel3">';
                        Content += '<div class="labelright">';
                        Content += '<img src="images/filter-rating-5.png" width="60" alt="" /><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<img src="images/user-rating-5.png" width="60" alt="" /><br />';
                        Content += '<span class="size11 grey">18 Reviews</span><br />';
                        Content += '<br />';
                        Content += '<span class="green size18"><b>$' + arr[i].HourlyRate + '</b></span><br />';
                        Content += '<span class="size11 grey">Per Hour</span><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<button class="bookbtn mt1" type="submit" onclick=RedirectToBooking(' + arr[i].sid + ')>Book</button>';
                        Content += '</div>';
                        Content += '<div class="labelleft2">';
                        Content += '<b><span style="cursor:pointer" onclick=RedirectToBooking(' + arr[i].sid + ')>' + arr[i].Model + '</span></b><br />';
                        Content += '<br />';
                        Content += '<br />';
                        Content += '<p class="grey">';
                        Content += '<span class="grey">Minimum Hours ' + arr[i].HourlyMinimum + '</span><br><br>';
                        Content += '<span class="grey">Maximum Hours ' + arr[i].ServiceUpto + '</span><br><br>';
                        Content += '<span class="grey">' + arr[i].Remark + '</span><br>';
                        Content += '</p>';
                        Content += '<br />';
                        Content += '<ul class="hotelpreferences">';
                        Content += '<li class="icohp-hairdryer"></li>';
                        Content += '<li class="icohp-garden"></li>';
                        Content += '<li class="icohp-grill"></li>';
                        Content += '<li class="icohp-kitchen"></li>';
                        Content += '<li class="icohp-bar"></li>';
                        Content += '<li class="icohp-living"></li>';
                        Content += '<li class="icohp-tv"></li>';
                        Content += '</ul>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '</div>';
                        Content += '<div class="clearfix"></div>';
                        Content += '<div class="offset-2">';
                        Content += '<hr class="featurette-divider3">';
                        Content += '</div>';
                    }

                    $('#Div_Cars').append(Content);
                }
            }

            else if (obj.Retcode == 2) {
                $('#SpnMessege').text("No Record Found")
                $('#ModelMessege').modal('show')
            }

            else if (obj.Retcode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

var Adults = 0;
var Childs = 0;
var ChildLessthan5 = 0;
function CalcPassenger(Para) {
    debugger;
    
    Adults = $("#ShuttleNoOfAdults_Passengers").val();
    Childs = $("#ShuttleNoOfChildren_Passengers").val();
    ChildLessthan5 = $("#Shuttlelessthan5_Passengers").val();
    if (Adults == "") {
        Adults = 0;
    }
    if (Childs == "") {
        Childs = 0;
    }
    if (ChildLessthan5 == "") {
        ChildLessthan5 = 0;
    }
    //if (parseFloat(Childs) < parseFloat(ChildLessthan5)) {
    //    //$("#Shuttlelessthan5_Passengers").val(Child);
    //    ChildLessthan5 = Childs;
    //}
    var TotalPassenger = 0;
    if (Para == 1)
    {
        //TotalPassenger = parseFloat(Adults) + (parseFloat(Childs) - parseFloat(ChildLessthan5));
        TotalPassenger = parseFloat(Adults) + (parseFloat(Childs));
        if (Adults > 0 && Childs == 0) {            
            Adult = parseInt(parseInt(Adult) + parseInt(TotalPassenger));
        }
        if (Adults == 0 && Childs > 0) {
            Child = parseInt(parseInt(Child) + parseInt(TotalPassenger));
        }
        if (Adults > 0 && Childs > 0) {
            alert("Add One by One");
        }
        if (ChildLessthan5 > 0) {
            dChildL5 = parseInt(parseInt(dChildL5) + parseInt(ChildLessthan5));
        }
    }     
    else if (Para == 0) {
        if (Adult > 1)
        {
            if (Adults > 0 && Childs == 0 && Adult > 0) {
                TotalPassenger = parseFloat(Adults) + (parseFloat(Childs) - parseFloat(ChildLessthan5));
                Adult = parseInt(parseInt(Adult) - parseInt(TotalPassenger));
            }
            if (Adults == 0 && Childs > 0 && Child > 0) {
                TotalPassenger = parseFloat(Adults) + (parseFloat(Childs) - parseFloat(ChildLessthan5));
                Child = parseInt(parseInt(Child) - parseInt(TotalPassenger));
            }
            if (Adults > 0 && Childs > 0) {
                alert("Substract One by One");
            }
            if (ChildLessthan5 > 0) {
                dChildL5 = parseInt(parseInt(dChildL5) - parseInt(ChildLessthan5));
            }
        }
        else {
            alert("Adults can not be 0")
        }        
    }
    $('#Div_Cars').empty();
    var Content = CalRate();
    $('#Div_Cars').append(Content);
}

function CalRate()
{
    debugger;
    var Price = 0;
    var BaseRate = 0;
    if (Person != 0) {
        Price = parseFloat(SortArrPrice[0].BaseCharge) + parseFloat(Dis) * parseFloat(SortArrPrice[0].MilesPerDistance);
        Price = Price.toFixed(2);
        //BaseRate = parseFloat(20) + parseFloat(Price);
        BaseRate = parseFloat(Price);
    }
    var personPrice = 0;

    for (i = 0; i < Adult; i++) {
        if (i == 0)
            personPrice = parseFloat(Price);
        else if (i == 1)
            personPrice += parseFloat(15);
        else
            personPrice += parseFloat(7);
    }
    for (i = 0; i < Child; i++)
        personPrice += parseFloat(7);

    var AddPrice = parseFloat(personPrice) - parseFloat(BaseRate);

    var Content = '';

    Content += '<div class="col-sm-6 col-12">'
    Content += '<div class="card mt-4">'
    Content += '<img class="card-img-top" src="'+SortArrPrice[0].Img_Url+'"'
    Content += 'alt="Card image cap">'
    Content += '<div class="space10"></div>'
    Content += '<div class="card-body">'
    Content += '<h4 class="card-title text-danger">TWO STOP SHUTTLE</h4>'
    Content += '<p><strong>PRICE : $' + personPrice.toFixed(2) + '</strong></p>'
    Content += '<div class="space10"></div>'

    Content += '<div class="form-inline">'
    Content += '<input type="number" id="ShuttleNoOfAdults_Passengers" placeholder="Adults " min="0" class="form-control col-sm-5" style="min-height: 35px;">'
    Content += '<input type="number" id="ShuttleNoOfChildren_Passengers" placeholder="Childrens" min="0" class="form-control col-sm-5 ml-2" style="min-height: 35px;">'

    Content += '<input type="number" id="Shuttlelessthan5_Passengers" placeholder="Childrens < 5Yrs" min="0" class="form-control col-sm-6 mt-2" style="min-height: 35px;">'
    Content += '<img src="images/Plus.png" alt="Add" onclick="CalcPassenger(1)" style="cursor: pointer" title="Add Passenger" class="ml-4 mt-2">'
    Content += '<img src="images/Minus.png" alt="Add" style="cursor: pointer" onclick="CalcPassenger(0)" title="Add Passenger" class="ml-2 mt-2">'
    Content += '</div>'
    Content += '<p class="card-text mt-4">'
    //Content += '<i class="fa fa-arrow-circle-right text-danger mr-2"></i>Price : <strong>$32.36</strong><br>'
    Content += '<i class="fa fa-arrow-circle-right text-danger mr-2"></i>Rate for 1 passenger : <strong>$' + BaseRate.toFixed(2) + '</strong><br>'
    Content += '<i class="fa fa-arrow-circle-right text-danger mr-2"></i>Additional ' + parseFloat(Adult - 1) + ' Adult & ' + parseFloat(Child) + ' Child : <strong>$' + AddPrice.toFixed(2) + '</strong><br>'
    Content += '<i class="fa fa-arrow-circle-right text-danger mr-2"></i>Additional ' + parseFloat(dChildL5) + ' Child Below 5 Yrs : <strong>$ 0</strong><br>'
    Content += '<i class="fa fa-arrow-circle-right text-danger mr-2"></i>Total : <strong>$ ' + personPrice.toFixed(2) + '</strong><br>'
    Content += '</p>'
    Content += '<div class="space10"></div>'
    Content += '<a href="#" onclick="RedirectToBooking(4052)" class="btn btn-danger btn-lg">Book Now</a>'
    Content += '</div>'
    Content += '</div>'
    Content += '</div>'

    Content += '<div class="col-sm-6 col-12">'
    Content += '<div class="card mt-4">'
    Content += '<h4 class="card-header">Note</h4>'
    Content += '<div class="card-body">'
    Content += '<p class="card-text">1st passenger rate <br>2nd passenger is <strong>$15.00</strong>'
    Content += '<br>Each additional passenger is <strong>$7.00</strong> <br>Child under 5 years old is free over 5 Years is <strong>$7.00</strong> <br>Shuttle timings are 5:00am to 11:00pm <br>Customer is liable to pay all the tolls. <br>'
    Content += '</p>'
    Content += '</div>'
    Content += '</div>'
    Content += '</div>'

    //var Content = '';
    
    //Content += '<div class="container-fluid no-padding page-content">'

    //Content += '<div class="container">	'
    //Content += '<div class="col-md-6 blog-area">'
    //Content += '<article class="blog-post-list">'
    //Content += '<div class="blog-content" style="width:740px;">'
    //Content += '<div class="entry-cover" style="float:left;">'
    //Content += '<img src="' + SortArrPrice[0].Img_Url + ' " alt="" style="width:292px;height:146px">'
    //Content += '<div style="float:right;padding-right:30px">'
    //Content += '<h3 style="color:#24a7de">' + SortArrPrice[0].Model + '</h3>'
    //Content += '<ul class="cp-meta-listed">'

  
    //Content += '<li>Price: <strong>$ ' + personPrice.toFixed(2) + '</strong></li>'
    
                       
    

    ////Content += '<li>Price: $ <strong>' + arr[i].BaseCharge + '</strong></li>'
    //Content += '</ul>'                       

    //Content += '<button type="button" style="cursor:pointer;background-color:#de302f;color:white;font-weight:600" onclick=RedirectToBooking(4052) class="btn">Book Now</button> '
    //Content += '<br/>'
    //Content += '<br/>'

    //Content += '<ul class="cp-meta-listed">'
    //if (Person == 0)
    //    Content += '<li>Rate for 0 passenger  <strong>$  ' + BaseRate.toFixed(2) + '</strong></li>'
    //else
    //    Content += 'Rate for 1 passenger  <strong style="margin-left:35px">$ ' + BaseRate.toFixed(2) + '</strong>'
    //Content += '</ul>'
    //Content += '<ul>'
    //if (Person == 0)
    //    Content += 'Additional Rate for 0 passenger <strong>$  ' + AddPrice.toFixed(2) + '</strong>'
    //else
    //    Content += 'Additional ' + parseFloat(Adult - 1) + ' Adult & ' + parseFloat(Child) + ' Child &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>$ ' + AddPrice.toFixed(2) + '</strong><br>'
    //if (Person == 0)
    //    Content += 'Additional Rate for 0 passenger <strong>$  ' + AddPrice.toFixed(2) + '</strong>'
    //else
    //    Content += 'Additional ' + parseFloat(dChildL5) + ' Child Below 5 Yrs &nbsp;&nbsp;&nbsp;&nbsp;<strong>$ ' + 0 + '</strong>'

    //Content += '</ul>'
    //Content += '<ul><hr>'
    //Content += '<b>Total </b> <strong style="margin-left:183px">$ ' + personPrice.toFixed(2) + ' </strong>'
    //Content += '</ul>'

    //Content += '</div>'
    //Content += '<div><br>'
    //Content += '<table>'
    //Content += '<tr>'
    //Content += '<td>'
    //Content += '<input type="number" id="ShuttleNoOfAdults_Passengers" class="form-control" placeholder="Adults Passenger" min="0">'
    //Content += '</td>'
    //Content += '<td Colspan="2">'
    //Content += '<input type="number" id="ShuttleNoOfChildren_Passengers" class="form-control" placeholder="No Of Childrens" min="0">'//Adults Passenger
    //Content += '</td>'
    //Content += '</tr>'
    //Content += '<tr>'
    //Content += '<td>'
    //Content += '<input type="number" id="Shuttlelessthan5_Passengers" class="form-control" placeholder="Child Less Than 5 Yrs" min="0">'
    //Content += '</td>'
    //Content += '<td>'
    //Content += '<img src="../images/icon/Plus.png" alt="Add" style="margin-left: 21px;margin-top: 3px;cursor:pointer" onclick="CalcPassenger(1)" title="Add Passenger">'
    //Content += '</td>'
    //Content += '<td>'
    //Content += '<img src="../images/icon/Minus.png" alt="Sub" style="margin-top: 3px;cursor:pointer" onclick="CalcPassenger(0)" title="Sub Passenger">'
    ////Content += '<input type="button" style="cursor:pointer;background-color:#de302f;color:white;font-weight:600" class="form-control" value="-" Onclick="calPassenger()">'
    //Content += '</td>'
    //Content += '</tr>'
    //Content += '</table>'
    //Content += '</div>'
    //Content += '</div>'
    //Content += '</div>'
    //Content += '</article>'
    //Content += '</div>'
    //Content += '</div>'
    //Content += '</div>'
    return Content;
}