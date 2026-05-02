var directionsDisplay, directionsDisplayRet;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
var source = '', destination = '', TotalDistance = 0, TimeTaken = 0, Service = '', Airport = '', SourceLat = 0, SourceLongt = 0;
var PickupLocationHourly = '', DropLocationHourly = '', Location = '', latitude = 0, longitude = 0, DestinationLat = 0, DestinationLongt = 0;
var sourceP2PRet = '', destinationP2PRet = '', TotalDistanceRet = 0, TimeTakenRet = 0, SourceLatRet = 0, SourceLongtRet = 0, DestinationLatRet = 0, DestinationLongtRet = 0;

google.maps.event.addDomListener(window, 'load', function () {

    //*********Airport**********************//

    new google.maps.places.SearchBox(document.getElementById('Location'));
    var PlaceLocation = new google.maps.places.Autocomplete(document.getElementById('Location'));

    google.maps.event.addListener(PlaceLocation, 'place_changed', function () {
        var place = PlaceLocation.getPlace();
        var address = place.formatted_address;
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();
        Airport = $("#SelAirport option:selected").text();
        if (Airport == '') {
            alert('Please Select Airport')
            return false;
        }
        else
            GetAirportRoute();
    });

    //*********Point To Point**********************//
    sourceP2P = new google.maps.places.Autocomplete(document.getElementById('PickupLocationP2P'));
    destinationP2P = new google.maps.places.Autocomplete(document.getElementById('DropLocationP2P'));

    sourceP2PRet = new google.maps.places.Autocomplete(document.getElementById('PickupLocationP2PRet'));
    destinationP2PRet = new google.maps.places.Autocomplete(document.getElementById('DropLocationP2PRet'));

    google.maps.event.addListener(sourceP2P, 'place_changed', function () {

        var place = sourceP2P.getPlace();
        var address = place.formatted_address;
        SourceLat = place.geometry.location.lat();
        SourceLongt = place.geometry.location.lng();
    });

    google.maps.event.addListener(destinationP2P, 'place_changed', function () {
        //debugger;
        var place2 = destinationP2P.getPlace();
        var address = place2.formatted_address;
        DestinationLat = place2.geometry.location.lat();
        DestinationLongt = place2.geometry.location.lng();

        source = $("#PickupLocationP2P").val();
        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetP2PRoute();
    });

    google.maps.event.addListener(sourceP2PRet, 'place_changed', function () {

        var place = sourceP2PRet.getPlace();
        var address = place.formatted_address;
        SourceLatRet = place.geometry.location.lat();
        SourceLongtRet = place.geometry.location.lng();
    });

    google.maps.event.addListener(destinationP2PRet, 'place_changed', function () {
        //debugger;
        var place2 = destinationP2P.getPlace();
        var address = place2.formatted_address;
        DestinationLatRet = place2.geometry.location.lat();
        DestinationLongtRet = place2.geometry.location.lng();

        source = $("#PickupLocationP2PRet").val();
        destination = $("#DropLocationP2PRet").val();

        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetP2PRetRoute();
    });

    //********* Hourly **********************//
    new google.maps.places.SearchBox(document.getElementById('PickupLocationHourly'));
    new google.maps.places.SearchBox(document.getElementById('DropLocationHourly'));

    source = new google.maps.places.Autocomplete(document.getElementById('PickupLocationHourly'));
    destination = new google.maps.places.Autocomplete(document.getElementById('DropLocationHourly'));

    google.maps.event.addListener(source, 'place_changed', function () {
        var place = source.getPlace();
        var address = place.formatted_address;
        SourceLat = place.geometry.location.lat();
        SourceLongt = place.geometry.location.lng();
    });

    google.maps.event.addListener(destination, 'place_changed', function () {
        var place = destination.getPlace();
        var address = place.formatted_address;
        DestinationLat = place.geometry.location.lat();
        DestinationLongt = place.geometry.location.lng();
        source = $("#PickupLocationHourly").val();
        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetHourlyRoute();
    });


    //new google.maps.places.SearchBox(document.getElementById('txtDestinationP2P'));

    new google.maps.places.SearchBox(document.getElementById('ShuttlePickUp_Location'));

    var places2 = new google.maps.places.Autocomplete(document.getElementById('txtSource'));
    google.maps.event.addListener(places2, 'place_changed', function () {
        //debugger;
        var place = places2.getPlace();
        var address = place.formatted_address;
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();

        dLat = latitude;
        dLong = longitude;
        Third = true;
        Second = false;
        First = false;

        GetRoute();
    });

    var places6 = new google.maps.places.Autocomplete(document.getElementById('ShuttlePickUp_Location'));

    google.maps.event.addListener(places6, 'place_changed', function () {
        //debugger;
        var place = places6.getPlace();
        var address = place.formatted_address;
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
        dLat = latitude;
        dLong = longitude;
        Second = false;
        First = true;
        Third = false;

        GetRoute3();
    });

});

//*********Airport**********************//
function GetAirportRoute() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//
    Service = $("#Service option:selected").val();
    var AirportLatLong = ($("#SelAirport option:selected").val()).split(',');
    Location = document.getElementById("Location").value;
    if (Service == "From Airport") {
        source = Airport;
        destination = Location;
        SourceLat = AirportLatLong[1]
        SourceLongt = AirportLatLong[2]
        DestinationLat = latitude
        DestinationLongt = longitude
    }
    else {
        source = Location;
        destination = Airport;
        DestinationLat = AirportLatLong[1]
        DestinationLongt = AirportLatLong[2]
        SourceLat = latitude
        SourceLongt = longitude
    }

    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var services = new google.maps.DistanceMatrixService();
    services.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        TotalDistance = '';
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            TimeTaken = duration;
            TotalDistance = distance.split(' ')[0];
            var Dist = TotalDistance.replace(',', '');
            //Converting km to miles
            TotalDistance = (parseFloat(Dist) * 0.621371).toFixed(2)

        } else {
            alert("Unable to find the distance via road.");
        }
    });
}

//*********Point To Point**********************//
function GetP2PRoute() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//

    //var LatLongSrc = LatLongP2PArr[0].split('^')
    //var LatLongDest = LatLongP2PArr[1].split('^')
    //source = PickupLocationP2P;
    destination = $("#DropLocationP2P").val();
    //DestinationLat = LatLongDest[0]
    //DestinationLongt = LatLongDest[1]
    //SourceLat = LatLongSrc[0]
    //SourceLongt = LatLongSrc[1]

    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var services = new google.maps.DistanceMatrixService();
    services.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        TotalDistance = '';
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            TimeTaken = duration;
            TotalDistance = distance.split(' ')[0];
            var Dist = TotalDistance.replace(',', '');
            //Converting km to miles
            TotalDistance = (parseFloat(Dist) * 0.621371).toFixed(2)
        } else {
            alert("Unable to find the distance via road.");
        }
    });
}

function GetP2PRetRoute() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//

    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplayRet.setDirections(response);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var services = new google.maps.DistanceMatrixService();
    services.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            TimeTakenRet = duration;
            var Dist = (distance.split(' ')[0]).replace(',', '');
            //Converting km to miles
            TotalDistanceRet = (parseFloat(Dist) * 0.621371).toFixed(2)

            source = $("#PickupLocationP2P").val();
            destination = $("#DropLocationP2P").val();
            sourceP2PRet = $("#PickupLocationP2PRet").val();
            destinationP2PRet = $("#DropLocationP2PRet").val();

        } else {
            alert("Unable to find the distance via road.");
        }
    });
}
//*********Hourly**********************//
function GetHourlyRoute() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//
    source = document.getElementById("PickupLocationHourly").value;
    destination = document.getElementById("DropLocationHourly").value;
    //source = PickupLocationHourly;
    //destination = DropLocationHourly;

    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var services = new google.maps.DistanceMatrixService();
    services.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        TotalDistance = '';
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            TimeTaken = duration;
            TotalDistance = distance.split(' ')[0];
            var Dist = TotalDistance.replace(',', '');
            //Converting km to miles
            TotalDistance = (parseFloat(Dist) * 0.621371).toFixed(2)

        } else {
            alert("Unable to find the distance via road.");
        }
    });
}
