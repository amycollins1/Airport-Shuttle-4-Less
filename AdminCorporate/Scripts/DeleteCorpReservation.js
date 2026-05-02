function SearchReservation() {
    var ResNo = $('#txt_ResNo').val();
    if (ResNo == "") {
        alert("Please enter Reservation No")
        return false
    }

    var Data = { ResNo: ResNo };
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/SearchResNo",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            //var ResesrvationList = result.ResesrvationList;
            var Div = '';
            if (result.retCode == 1) {
                $("#Details").empty();
                var ul = '';
                var List = result.Reservation

                ul += '<tr>';
                ul += '<td align="center" >1</td>';
                //ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationID + '</a></td>';
                ul += '<td align="center">' + List.ReservationNo + '</td>';
                ul += '<td align="center">' + List.ReservationDate + '</td>';
                ul += '<td align="center">' + List.Passenger + '</td>';
                ul += '<td align="center">' + List.Service + '</td>';
                ul += '<td align="center">' + List.Status + '</td>';
                ul += '<td align="center">' + List.PickupAddress + '</td>';
                ul += '<td align="center">' + List.DropAddress + '</td>';
                //ul += '<td align="center">' + List[i].Driver + '</td>';
                ul += '<td align="center">' + List.TotalAmount + '</td>';
                ul += '<td align="center" class="numeric" data-title="Detail">'
                ul += '<button style="border-color:#dc3545" type="button" onclick="DeleteReservation(' + List.Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-trash" title="Delete"></button>'
                ul += '</td>'
            }
            else {
                ul += '<tr>';
                ul += '<td align="center" colspan="10">No Reservation Found</td>';
                ul += '</tr>';
            }
            $("#Details").append(ul);
        },
    });
}

function DeleteReservation(Sid) {
    var Conf = confirm("Are you sure want to Delete this reservations?");
    if (Conf) {
        var Data = { Sid: Sid };
        $.ajax({
            type: "POST",
            url: "Handler/CorporativeHandler.asmx/DeleteReservation",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
                if (result.retCode == 1) {
                    alert("Reservation Deleted Successfully")
                    setTimeout(function () {
                        window.location.reload();
                    }, 250)
                }
            },
            error: function () {
            }
        });
    }
}