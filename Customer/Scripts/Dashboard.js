$(document).ready(function () {

    var MyList = localStorage.getItem("LoginStorage")
    if (MyList != "" && MyList != null) {
        MySearch = JSON.parse(MyList);
        GetReservations(MySearch.Email)
    }  
});

var Arr = [];
function GetReservations(Email) {
    $("#Details tbody").empty();
    $("#Details").DataTable().clear().draw();
    $("#Details").DataTable();
    $("#Details").dataTable().fnDestroy();
    var data = {
        Email: Email
    }
    $.ajax({
        url: "Handler/DefaultHandler.asmx/GetReservations",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == "1") {
                Arr = obj.List;
                console.log(Arr)
                var Div = '';
                for (var i = 0; i < Arr.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.N">' + parseInt(i + 1) + '</td>'
                    Div += '<td data-title="Booking No">' + Arr[i].ReservationId + '</td>'
                    Div += '<td data-title="Assigned To">' + Arr[i].DriverName + '</td>'
                    Div += '<td data-title="Service">' + Arr[i].Service + '</td>'
                    Div += '<td data-title="Source">' + Arr[i].Source + '</td>'
                    Div += '<td data-title="Destination">' + Arr[i].Destination + '</td>'
                    Div += '<td data-title="ReservationDate">' + Arr[i].ReservationDate + '</td>'
                    Div += '<td data-title="Time">' + Arr[i].Time + '</td>'
                    Div += '<td data-title="TotalFare">' + Arr[i].TotalFare + '</td>'
                    Div += '<td align="center"><a style="cursor:pointer" onclick="PrintDetails(\'' + i + '\')" ><i class="glyphicon glyphicon-print"></i></a></td>';
                }

                $("#Details tbody").append(Div);
                $("#Details").dataTable({
                    "bSort": true,
                    paging: true,
                    autoWidth: false,
                });
            }
        },
    });
}

function PrintDetails(ObjNo) {
    console.log(Arr[ObjNo])
    $("#ModelDetails").empty();
    $("#BookingDetails").modal('show')
    var Name = Arr[ObjNo].FirstName + " " + Arr[ObjNo].LastName;
    var ResService = Arr[ObjNo].Service;
    var ResTime = "";
    if (ResService == "From Airport") {
        ResTime = Arr[ObjNo].FlightTime;
    }
    else if (ResService == "To Airport") {
        ResTime = Arr[ObjNo].Pickup_Time;
    }
    else {
        ResTime = Arr[ObjNo].P2PTime;
    }
    if (Arr[ObjNo].AssignedTo == null)
        Arr[ObjNo].AssignedTo = 'Not Assigned'
    var url = "ReservationPrint.aspx?BookingNo=" + Arr[ObjNo].ReservationId + "&ResDate=" + Arr[ObjNo].ReservationDate + "&Source=" + Arr[ObjNo].Source +
        "&Destination=" + Arr[ObjNo].Destination + "&AssignedTo=" + Arr[ObjNo].DriverName + "&Name=" + Name + "&Service=" + Arr[ObjNo].Service +
        "&TotalFare=" + "$" + Arr[ObjNo].TotalFare + "&Passenger=" + Arr[ObjNo].Passenger + "&PhoneNo=" + Arr[ObjNo].PhoneNo + "&ResTime=" + Arr[ObjNo].Time
    $("#ModelDetails").append('<iframe src="' + url + '" style="width:100%;height:500px" />')

    //window.location.href = "../InvoicePrint.aspx?BookingNo=" + Arr[ObjNo].ReservationID + "&ResDate=" + Arr[ObjNo].ReservationDate + "&Source=" + Arr[ObjNo].Source +
    //                       "&Destination=" + Arr[ObjNo].Destination + "&AssignedTo=" +Arr[ObjNo].AssignedTo + "&Name=" + Name + "&Service="+Arr[ObjNo].Service +
    //                       "&TotalFare=" + "$" + Arr[ObjNo].TotalFare + "&Passenger=" + Arr[ObjNo].Persons + "&PhoneNo=" + Arr[ObjNo].ContactNumber + "&ResTime=" + ResTime;
}

