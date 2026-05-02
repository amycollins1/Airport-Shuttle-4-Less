var latitude = 0, longitude = 0;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
var source = '', destination = '', Airport = '', TotalDistance = 0, TimeTaken = 0;
var P2PSecondHalt = '', P2PThirdHalt = '', P2PFourthHalt = '', P2PFifthHalt = '';
var P2PLocation1 = '', P2PLocation2 = '', P2PLocation3 = '', P2PLocation4 = '';

google.maps.event.addDomListener(window, 'load', function () {

    new google.maps.places.SearchBox(document.getElementById('txt_Address'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });

    var places = new google.maps.places.Autocomplete(document.getElementById('txt_Address'));
    google.maps.event.addListener(places, 'place_changed', function () {

        var place = places.getPlace();
        var address = place.formatted_address;
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();
        Airport = $("#SelAirport option:selected").text();
        if (Airport == '' || Airport == 'Select' || Airport == null || Airport == undefined) {
            alert('Please select Airpot Name!')
            document.getElementById('txt_Address').value =''
        }
        else {
            GetAirportRoute();
        }
        
    });

    //********* Point 2 Point **********************//
    sourceP2P = new google.maps.places.Autocomplete(document.getElementById('PickupLocationP2P'));
    P2PSecondHalt = new google.maps.places.Autocomplete(document.getElementById('txt_SecondHalt'));
    P2PThirdHalt = new google.maps.places.Autocomplete(document.getElementById('txt_ThirdHalt'));
    P2PFourthHalt = new google.maps.places.Autocomplete(document.getElementById('txt_FourthHalt'));
    P2PFifthHalt = new google.maps.places.Autocomplete(document.getElementById('txt_FifthHalt'));

    var sourceP2P = new google.maps.places.Autocomplete(document.getElementById('PickupLocationP2P'));
    var destinationP2P = new google.maps.places.Autocomplete(document.getElementById('DropLocationP2P'));

    google.maps.event.addListener(sourceP2P, 'place_changed', function () {
        var place = sourceP2P.getPlace();
        var address = place.formatted_address;
        SourceLat = place.geometry.location.lat();
        SourceLongt = place.geometry.location.lng();

        var Location = $("#PickupLocationP2P").val();
        $("#txt_FirstHalt").val(Location);
        if ($("#txt_FirstHalt").val() != '') {
            $("#txt_SecondHalt").attr('readonly', false);
        }
        else {
            $("#txt_SecondHalt").attr('readonly', true);
            $("#txt_ThirdHalt").attr('readonly', true);
            $("#txt_FourthHalt").attr('readonly', true);
            $("#txt_FifthHalt").attr('readonly', true);

            $("#txt_SecondHalt").val('');
            $("#txt_ThirdHalt").val('');
            $("#txt_FourthHalt").val('');
            $("#txt_FifthHalt").val('');
        }
    });

    google.maps.event.addListener(P2PSecondHalt, 'place_changed', function () {
        
        var place2 = P2PSecondHalt.getPlace();
        var address = place2.formatted_address;
        DestinationLat = place2.geometry.location.lat();
        DestinationLongt = place2.geometry.location.lng();

        source = $("#txt_FirstHalt").val();
        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetP2PRoute();
    });

    google.maps.event.addListener(P2PThirdHalt, 'place_changed', function () {
       
        var place2 = P2PThirdHalt.getPlace();
        var address = place2.formatted_address;
        DestinationLat = place2.geometry.location.lat();
        DestinationLongt = place2.geometry.location.lng();

        source = $("#txt_SecondHalt").val();
        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetP2PRouteThird();
    });

    google.maps.event.addListener(P2PFourthHalt, 'place_changed', function () {
        var place2 = P2PFourthHalt.getPlace();
        var address = place2.formatted_address;
        DestinationLat = place2.geometry.location.lat();
        DestinationLongt = place2.geometry.location.lng();

        source = $("#txt_ThirdHalt").val();
        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetP2PRouteFourth();
    });

    google.maps.event.addListener(P2PFifthHalt, 'place_changed', function () {
        var place2 = P2PFifthHalt.getPlace();
        var address = place2.formatted_address;
        DestinationLat = place2.geometry.location.lat();
        DestinationLongt = place2.geometry.location.lng();

        source = $("#txt_ThirdHalt").val();
        if (source == '') {
            alert('Please Enter Pickup Location')
            return false;
        }
        else
            GetP2PRouteFifth();
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

});

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
    Service = $("#Select_Service option:selected").val();
    AirportLatLong = ($("#SelAirport option:selected").val()).split(',');
    Location = document.getElementById("txt_Address").value;
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

//*********Point 2 Point **********************//
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

    destination = $("#txt_SecondHalt").val();

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
            $("#txt_ThirdHalt").attr('readonly', false);
            $("#txt_FourthHalt").attr('readonly', true);
            $("#txt_FifthHalt").attr('readonly', true);

            $("#txt_ThirdHalt").val('');
            $("#txt_FourthHalt").val('');
            $("#txt_FifthHalt").val('');
            P2PLocation1 = source + "^" + destination + "^" + TotalDistance
        } else {
            alert("Unable to find the distance via road.");
            P2PLocation1 = "";
        }
    });
}

function GetP2PRouteThird() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//

    destination = $("#txt_ThirdHalt").val();

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
            $("#txt_FourthHalt").attr('readonly', false);
            $("#txt_FifthHalt").attr('readonly', true);

            $("#txt_FourthHalt").val('');
            $("#txt_FifthHalt").val('');
            P2PLocation2 = source + "^" + destination + "^" + TotalDistance
        } else {
            alert("Unable to find the distance via road.");
            P2PLocation2 = "";
        }
    });
}

function GetP2PRouteFourth() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//

    destination = $("#txt_FourthHalt").val();

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
            $("#txt_FifthHalt").attr('readonly', false);

            $("#txt_FifthHalt").val('');
            P2PLocation3 = source + "^" + destination + "^" + TotalDistance
        } else {
            alert("Unable to find the distance via road.");
            P2PLocation3 = "";
        }
    });
}

function GetP2PRouteFifth() {
    var mumbai = new google.maps.LatLng(18.9750, 72.8258);
    var mapOptions = {
        zoom: 7,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//

    destination = $("#txt_FifthHalt").val();

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
            P2PLocation4 = source + "^" + destination + "^" + TotalDistance
        } else {
            alert("Unable to find the distance via road.");
            P2PLocation4 = "";
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