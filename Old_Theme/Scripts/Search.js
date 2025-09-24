$(document).ready(function () {

    var MyList = localStorage.getItem("SearchStorage")
    if (MyList != "" && MyList != null) {
    MySearch = JSON.parse(MyList);
    //MySearch.Tab = 1;
        if (MySearch.Tab != 5) {
            LoadVehicles()
            MapDesigning()
        }
        else
            LoadFredrickVehicles()
    }
     //localData();
});
var MySearch = '', VehInfo = '', Price = 0;

function Redirect(Id) {
   
    if (MySearch.Tab == 5) {
        var Vehicle = $.grep(VehInfo, function (p) { return p.RateID == Id })

        var Adult = $("#txtExtraAdult" + Id).val();
        var Child = $("#txtExtraChild" + Id).val();
        var Bag = $("#txtExtraBag" + Id).val();
        var Passengers = parseInt(Vehicle[0].MinCapacity) + parseInt(Adult) + parseInt(Child)
        var Bags = parseInt(Vehicle[0].MinBaggage) + parseInt(Bag)

        if (Passengers > Vehicle[0].MaxCapacity)
        {
            alert("This Vehicle have maximum capacity of " + Vehicle[0].MaxCapacity +" Passengers (Allowed + Extra)!")
            return false;
        }
        if (Bags > Vehicle[0].MaxBaggage) {
            alert("This Vehicle have maximum " + Vehicle[0].MaxBaggage + " Bags Allowed!")
            return false;
        }
        
        MySearch.BaseCharge = Vehicle[0].BaseRate
        MySearch.SubTotal = Vehicle[0].BaseRate;
        MySearch.VehicleRate = Vehicle[0].BaseRate;
        MySearch.VehicleId = Vehicle[0].VehicleID;
        MySearch.MinBaggage = Vehicle[0].MinBaggage;
        MySearch.MaxBaggage = Vehicle[0].MaxBaggage;
        MySearch.MinCapacity = Vehicle[0].MinCapacity;
        MySearch.MaxCapacity = Vehicle[0].MaxCapacity;
        MySearch.RateID = Vehicle[0].RateID;
        MySearch.Adult = parseInt(Adult);
        MySearch.Child = parseInt(Child);
        MySearch.Passengers = parseInt(Passengers);
        MySearch.Bags = parseInt(Bags);

        localStorage.setItem("SearchStorage", JSON.stringify(MySearch));
        window.location.href = "Booking.html";
    }
    else
    {
        MySearch.VehicleId = Id;
        GetHaltSettings(Id)

        setInterval(function () {
            var Vehicle = $.grep(VehInfo, function (p) { return p.Sid == Id }) 
            CalcPrice(MySearch.Tab, Vehicle[0])
            MySearch.SubTotal = Price;

            if (MySearch.Tab == 1 || MySearch.Tab == 2) {
                MySearch.BaseCharge = Vehicle[0].BaseCharge
                MySearch.VehicleRate = Vehicle[0].PerMile
                if (MySearch.Tab == 2 && MySearch.ChkRetReservation == true) {
                    MySearch.RetSubTotal = (parseFloat(Vehicle[0].BaseCharge) + parseFloat(MySearch.TotalDistanceRet) * parseFloat(Vehicle[0].PerMile)).toFixed(2);
                }
            }
            if (MySearch.Tab == 3) {
                MySearch.VehicleRate = Vehicle[0].PerHour
            }

            localStorage.setItem("SearchStorage", JSON.stringify(MySearch));
            window.location.href = "Booking.html";
        }, 2000);
    }
   

   
}

function GetHaltSettings(VehicleID) {
    //document.querySelector("#preloader").style.visibility = "visible";
    var data = { VehicleID: VehicleID, HaltingHours: MySearch.HaltingHours }
    $.ajax({
        type: "POST",
        url: "Handler/SearchHandler.asmx/LoadHaltSettings",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                HaltSetting = obj.HaltSetting;
                if (HaltSetting.length > 0) {
                    MySearch.HourlySettingID = HaltSetting[0].Sid;
                    MySearch.HaltingDiscount = HaltSetting[0].PerHourDiscount;
                }
                else {
                    MySearch.HourlySettingID = 0;
                    MySearch.HaltingDiscount = 0;
                }
            }
        },
    });
}

function LoadVehicles() {
    //document.querySelector("#preloader").style.visibility = "visible";
    var data = { Tab: MySearch.Tab, Capacity: MySearch.Passengers }
    $.ajax({
        type: "POST",
        url: "Handler/SearchHandler.asmx/LoadVehicles",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                VehInfo = obj.VehInfo;
                LoadVehDesign(VehInfo)
            }
        },
    });
}


function LoadVehDesign(List) {
    var tr = '';
    Price = 0;
    $("#VehicleList").empty();
    
    for (var i = 0; i < List.length; i++) {
        
        CalcPrice(MySearch.Tab, List[i])
        tr += '<div class="service-feature style2">'
        tr += '<div class="row"><div class="col-md-4 ">'
        tr += '<img src="/images/VehicleImages/' + List[i].Sid + '.jpg" alt=' + List[i].Model + ' />'
        tr += '</div><div class="col-md-1"></div><div class="col-md-6">'
        tr += '<h4 class="service-feature_title">' + List[i].Model + '</h4>'
        tr += '<p class="service-feature_text"><i class="fas fa-user"></i> Maximum Capacity: ' + List[i].MaxCapacity + '</p>'
        tr += '<p class="service-feature_text"><i class="fas fa-suitcase"></i> Max Baggage: ' + List[i].MaxBaggage + '</p>'
        tr += '<p class="service-feature_text"><i class="fas fa-wifi"></i> On Board WiFi</p>'
        tr += '<p class="service-feature_text"><i class="fas fa-mobile"></i> Phone Chargers</p>'
        tr += '<p class="service-feature_text"><i class="fas fa-bottle-water"></i> Complimentary Water / Newspaper</p>'
        tr += '<p class="service-feature_text"><i class="fas fa-chair"></i> Heated Seats</p>'
        tr += '<p class="desig"><b><i class="fas fa-dollar"></i> Price: ' + Price + '</b></p> '
        tr += ' <div class="btn-box btn-reg-box">'
        tr += '<button type="button" class="th-btn style-skew" onclick="Redirect(\'' + List[i].Sid + '\')">Book Now</button>'
        tr += '</div></div></div></div><hr />' 
    }
    //document.querySelector("#preloader").style.display = "none";
    $("#VehicleList").append(tr)

}

var ListADCH = [];
function LoadFredrickVehicles() {
    //$("#VehicleList").empty();
    var tr = '';
    var Service = MySearch.Service;
    var Tab = MySearch.Tab;
    var FromID = MySearch.FredrickSourceID;
    var ToID = MySearch.FredrickDestinationID;
    var Passengers = MySearch.Passengers;
    var data = { Service: Service, Tab: Tab, From: FromID, To: ToID, Passengers: Passengers }
    $.ajax({
        type: "POST",
        url: "Handler/SearchHandler.asmx/LoadFredrickCars",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                debugger
                var List = obj.VehInfo;
                VehInfo = obj.VehInfo;
                ListADCH = obj.ListADCH;

                var Content = '';
                if (Tab == "5") {
                    for (var i = 0; i < List.length; i++) { 
                        //tr += '<div class="service-feature style2">'
                        //tr += '<div class="row"><div class="col-md-4 ">' 
                        //tr += '<img src="/images/VehicleImages/' + List[i].VehicleID + '.jpg" alt=' + List[i].VehicleModel + ' />'
                        //tr += '</div><div class="col-md-2"></div><div class="col-md-6">'
                        //tr += '<h4 class="service-feature_title">' + List[i].VehicleModel + '</h4>'
                        //tr += '<p class="service-feature_text">Maximum Capacity: ' + List[i].MaxCapacity + '</p>'
                        //tr += '<p class="service-feature_text">Free Capacity: ' + List[i].MinCapacity + '</p>'
                        //tr += '<p class="service-feature_text">Max Baggage: ' + List[i].MaxBaggage + '</p>'
                        //tr += '<p class="service-feature_text">Free Baggage: ' + List[i].MinBaggage + '</p>'
                        //tr += '<p class="desig"><strong>Price: <span class="price">$' + List[i].BaseRate + '</span></strong></p> '
                        //tr += ' <div class="btn-box btn-reg-box">'
                        //tr += '<button type="button" class="th-btn style-skew" onclick="Redirect(\'' + List[i].RateID + '\')">Book Now</button>'
                        //tr += '</div></div></div></div><hr />'     
                        tr += '<div class="service-feature style2"><div class="row">'
                        tr += '<div class="col-md-4 "> <img src="/images/VehicleImages/' + List[i].VehicleID + '.jpg" /></div> '
                        tr += '<div class="col-md-8"><h4 class="service-feature_title">' + List[i].VehicleModel + '</h4>'
                        tr += '<p><strong>Base Price: <span class="price">$ ' + List[i].BaseRate + '</span></strong></p>  '
                        tr += '<p class="service-feature_text"><small>Total Passengers Allowed: ' + List[i].MaxCapacity + '</small></p> <p class="service-feature_text"><small>Total Bags Allowed: ' + List[i].MaxBaggage + '</small></p><hr />'
                        tr += '<p class="service-feature_text"><small>Passengers Allowed(Base Price): ' + List[i].MinCapacity + '</small></p> <p class="service-feature_text"><small>Bags Allowed(Base Price): ' + List[i].MinBaggage + '</small></p> <br />'
                        tr += '<div class="row cart_table">'
                        tr += '<div class="col-md-12"><small><strong>NOTE: Please add these if you have more than allowed Passengers/ Bags </strong></small></div>'

                        var ExtraCapacity = parseInt(List[i].MaxCapacity) - parseInt(List[i].MinCapacity)
                        tr += '<div class="col-md-6"> <small>Extra Adult (' + ListADCH[0].AdultRate + ' $/Pessenger)</small></div> <div class="col-md-6"><div class="cart_item">'
                        tr += '<div class="quantity">'
                        tr += '<button class="quantity-minus qty-btn" onclick="minusAdult(' + List[i].VehicleID + ');"><i class="far fa-minus"></i></button>'
                        tr += '<input type="number" class="qty-input" id="txtExtraAdult' + List[i].VehicleID + '" step="1" min="0" max=' + List[i].MaxCapacity + ' name="quantity" value="0" title="Qty">'
                        tr += '<button class="quantity-plus qty-btn" onclick="plusAdult(' + List[i].VehicleID + ',' + ExtraCapacity + ');"><i class="far fa-plus"></i></button>'
                        tr += '</div></div></div>'

                        tr += '<div class="col-md-6"> <small>Extra Child (' + ListADCH[0].ChildRate + ' $/Pessenger)</small></div><div class="col-md-6"><div class="cart_item">'
                        tr += '<div class="quantity">'
                        tr += '<button class="quantity-minus qty-btn" onclick="minusChild(' + List[i].VehicleID + ');"><i class="far fa-minus"></i></button>'
                        tr += '<input type="number" class="qty-input" id="txtExtraChild' + List[i].VehicleID + '" step="1" min="0" max=' + List[i].MaxCapacity + ' name="quantity" value="0" title="Qty">'
                        tr += '<button class="quantity-plus qty-btn" onclick="plusChild(' + List[i].VehicleID + ',' + ExtraCapacity + ');"><i class="far fa-plus"></i></button>'
                        tr += '</div></div></div>'
                        var ExtraBaggage = parseInt(List[i].MaxBaggage) - parseInt(List[i].MinBaggage)
                        tr += '<div class="col-md-6"> <small>Extra Bag (' + ListADCH[0].BaggageRate + ' $/Bag)</small></div><div class="col-md-6"><div class="cart_item">'
                        tr += '<div class="quantity">'
                        tr += '<button class="quantity-minus qty-btn" onclick="minusBag(' + List[i].VehicleID + ');"><i class="far fa-minus"></i></button>'
                        tr += '<input type="number" class="qty-input" id="txtExtraBag' + List[i].VehicleID + '" step="1" min="0" max=' + List[i].MaxBaggage + ' name="quantity" value="0" title="Qty">'
                        tr += '<button class="quantity-plus qty-btn" onclick="plusBag(' + List[i].VehicleID + ',' + ExtraBaggage + ');"><i class="far fa-plus"></i></button>'
                        tr += '</div></div></div>'

                        tr += '</div>'
                        tr += '<div class="btn-box btn-reg-box"><button type="button" class="th-btn style-skew" onclick="Redirect(\'' + List[i].RateID + '\')">Book Now</button></div>'
                        tr += '</div> </div> </div><hr />' 
                    }
                    //document.querySelector("#preloader").style.display = "none";
                    $("#VehicleList").append(tr)
                }
            }
            else if (obj.retCode == 2) {
                $('#SpnMessege').text("No Record Found")
                $('#ModelMessege').modal('show')
            }
            else if (obj.retCode == 0) {
                $('#SpnMessege').text("Something Went Wrong.")
                $('#ModelMessege').modal('show')
            }
        }
    });
}

// Quantity Plus Minus ---------------------------
function plusAdult(id,ExtraCapacity)
{
    var $qty = $("#txtExtraAdult" + id);
    var extrachild = $("#txtExtraChild" + id).val();
    var blockAdult = parseInt(ExtraCapacity) - parseInt(extrachild)
    var currentVal = parseInt($qty.val(), 10);
    if (!isNaN(currentVal) && currentVal < blockAdult) {
        $qty.val(currentVal + 1);
    }
}

function minusAdult(id) {
    var $qty = $("#txtExtraAdult" + id);
    var currentVal = parseInt($qty.val(), 10);
    if (!isNaN(currentVal) && parseInt(currentVal)> 0) {
        $qty.val(currentVal - 1);
    }
}

function plusChild(id, ExtraCapacity) {
    var $qty = $("#txtExtraChild" + id);
    var extraAdult = $("#txtExtraAdult" + id).val();
    var blockChild = parseInt(ExtraCapacity) - parseInt(extraAdult)
    var currentVal = parseInt($qty.val(), 10);
    if (!isNaN(currentVal) && currentVal < blockChild) {
        $qty.val(currentVal + 1);
    }
}

function minusChild(id) {
    var $qty = $("#txtExtraChild" + id);
    var currentVal = parseInt($qty.val(), 10);
    if (!isNaN(currentVal) && parseInt(currentVal) > 0) {
        $qty.val(currentVal - 1);
    }
}

function plusBag(id, ExtraCapacity) {
    var $qty = $("#txtExtraBag" + id);
    var currentVal = parseInt($qty.val(), 10);
    if (!isNaN(currentVal) && currentVal < parseInt(ExtraCapacity)) {
        $qty.val(currentVal + 1);
    }
}

function minusBag(id) {
    var $qty = $("#txtExtraBag" + id);
    var currentVal = parseInt($qty.val(), 10);
    if (!isNaN(currentVal) && parseInt(currentVal) > 0) {
        $qty.val(currentVal - 1);
    }
}

//$(".quantity-plus").each(function () {
//    $(this).on("click", function (e) {
//        e.preventDefault();
//        var $qty = $(this).siblings(".qty-input");
//        var currentVal = parseInt($qty.val(), 10);
//        if (!isNaN(currentVal)) {
//            $qty.val(currentVal + 1);
//        }
//    });
//});

//$(".quantity-minus").each(function () {
//    $(this).on("click", function (e) {
//        e.preventDefault();
//        var $qty = $(this).siblings(".qty-input");
//        var currentVal = parseInt($qty.val(), 10);
//        if (!isNaN(currentVal) && currentVal > 1) {
//            $qty.val(currentVal - 1);
//        }
//    });
//});


function CalcPrice(tab,Veh) {
    if (tab == 1 || tab == 2) {
        Price = parseFloat(Veh.BaseCharge) + parseFloat(MySearch.TotalDistance) * parseFloat(Veh.PerMile);
        
    }
    if (tab == 3) {

        Price = parseFloat(MySearch.Hours) * parseFloat(Veh.PerHour);
    }
    Price = Price.toFixed(2);
    return Price;
}

function MapDesigning() {
    //let obj = LatLongP2PArr.reduce(function (acc, curr) {
    //    acc[curr] = '';
    //    return acc;
    //}, {});
    //var markers = {};
    //for (var i = 0; i < LatLongP2PArr.length; i++) {

    //}
   // var markers = [{
   //     "lat": "20.3899385",
   //     "lng": "78.1306846",
   // },
   //{
   //    "lat": "20.9319821",
   //    "lng": "77.7523039",
   //},
   //{
   //    "lat": "20.3899385",
   //    "lng": "78.1306846",
   //}
   // ];
    var markers = [{
        "lat": MySearch.DestinationLat,
        "lng": MySearch.DestinationLongt,
    },
    {
        "lat": MySearch.SourceLat,
        "lng": MySearch.SourceLongt,
    }
    ];
    window.onload = function () {

        var mapOptions = {
            center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });
            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);

        //***********ROUTING****************//

        //Intialize the Path Array
        var path = new google.maps.MVCArray();

        //Intialize the Direction Service
        var service = new google.maps.DirectionsService();

        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({
            map: map,
            strokeColor: '#4986E7'
        });
        var totalTolls = 0;
        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {

                            //var myroute = result.routes[0];
                            //for (var k = 0; k < myroute.legs.length; k++) {
                            //    //console.log(myroute.legs[i].steps);
                            //    for (var j = 0; j < myroute.legs[k].steps.length; j++) {
                            //        //console.log(myroute.legs[i].steps[j].instructions);
                            //        if (containsWord(myroute.legs[k].steps[j].instructions.toLowerCase(), 'toll road')) {
                            //            totalTolls += 1;
                            //        }
                            //    }
                            //}

                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }
    }
}

function containsWord(string, word) {
    return new RegExp('(?:[^.\w]|^|^\\W+)' + word + '(?:[^.\w]|\\W(?=\\W+|$)|$)').test(string);
}

function P2PMap() {
    if (MySearch.LatLongP2PArr[3] == "" && MySearch.LatLongP2PArr[4] == "") {
        var P1 = MySearch.LatLongP2PArr[0].split('^')
        var P2 = MySearch.LatLongP2PArr[1].split('^')
        var P3 = MySearch.LatLongP2PArr[2].split('^')
        var MapPoints = '[{"address":{"address":"' + MySearch.LocationP2PArr[0] + '","lat":"' + P1[0] + '","lng":"' + P1[1] + '"},"title":"' + MySearch.LocationP2PArr[0] + '"},{"address":{"' + MySearch.LocationP2PArr[1] + '":"test2","lat":"' + P2[0] + '","lng":"' + P2[1] + '"},"title":"' + MySearch.LocationP2PArr[1] + '"},{"address":{"address":"' + MySearch.LocationP2PArr[2] + '","lat":"' + P3[0] + '","lng":"' + P3[1] + '"},"title":"' + MySearch.LocationP2PArr[2] + '"}]';
    }
   

    var MY_MAPTYPE_ID = 'custom_style';
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        if (jQuery('#dvMap').length > 0) {

            var locations = jQuery.parseJSON(MapPoints);
            //var locations = MySearch.LatLongP2PArr;
            map = new google.maps.Map(document.getElementById('dvMap'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            });
            directionsDisplay.setMap(map);

            var infowindow = new google.maps.InfoWindow();
            var flightPlanCoordinates = [];
            var bounds = new google.maps.LatLngBounds();

            for (i = 0; i < locations.length; i++) {
                //var Splitter = locations[i].split('^')
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i].address.lat, locations[i].address.lng),
                    map: map
                });
                flightPlanCoordinates.push(marker.getPosition());
                bounds.extend(marker.position);

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent(locations[i]['title']);//locations[i]['title']
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            map.fitBounds(bounds);

            // directions service configuration
            var start = flightPlanCoordinates[0];
            var end = flightPlanCoordinates[flightPlanCoordinates.length - 1];
            var waypts = [];
            for (var i = 1; i < flightPlanCoordinates.length - 1; i++) {
                waypts.push({
                    location: flightPlanCoordinates[i],
                    stopover: true
                });
            }
            calcRoute(start, end, waypts);
        }
    }

    function calcRoute(start, end, waypts) {
        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                //var route = response.routes[0];
                //var summaryPanel = document.getElementById('dvPanel');
                //summaryPanel.innerHTML = '';
                // For each route, display summary information.
                //for (var i = 0; i < route.legs.length; i++) {
                //    var routeSegment = i + 1;
                //    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                //    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                //    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                //    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                //}
            }
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
}

function localData() {
    MySearch = {
        Airlines: "",
        BaseCharge: 0,
        ChkRetReservation: false,
        Destination: "Baltimore Washington International Airport (BWI)",
        DestinationLat: "39.1774",
        DestinationLatRet: 0,
        DestinationLongt: "-76.6684",
        DestinationLongtRet: 0,
        FlightNo: "",
        HaltingDiscount: 0,
        HaltingHours: 0,
        HourlySettingID: 0,
        Hours: 0,
        IsHalt: false,
        Passengers: "2",
        ReservationDate: "07-31-2024",
        RetAirlines: "",
        RetDate: "",
        RetFlightNo: "",
        RetSubTotal: 0,
        RetTime: "",
        Service: "To Airport",
        Source: "Washington D.C., DC, USA",
        SourceLat: 38.9071923,
        SourceLatRet: 0,
        SourceLongt: -77.0368707,
        SourceLongtRet: 0,
        Stops: "",
        SubTotal: 0,
        Tab: 1,
        Time: "08:00:AM",
        TimeTaken: "49 mins",
        TimeTakenRet: 0,
        TotalDistance: "35.67",
        TotalDistanceRet: 0,
        VehicleId: 0,
        VehicleRate: 0,
        destinationP2PRet: "",
        sourceP2PRet: ""
    };
}