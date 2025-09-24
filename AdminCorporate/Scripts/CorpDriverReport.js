$(document).ready(function () {
    GetAllDriver()
});

function DriverReport() {
    var From = $('#datepicker1').val();
    var To = $('#datepicker2').val();
    $("#TotalAmount").empty();
    $("#DriverAmount").empty();
    $("#BWIAmount").empty();
    if (From == "") {
        alert("Please Select From Date")
        return false
    }
    if (To == "") {
        alert("Please Select To Date")
        return false
    }
    var Data = { From: From, To: To, DriverId: $("#Select_Driver option:selected").val() };
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/DriverReport",
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
                var List = result.ResList
                var TotalAmount = result.TotalAmount
                var BWIAmount = result.PercentageOfAmount
                var DriverAmount = parseFloat(TotalAmount) - parseFloat(BWIAmount)
                if (List.length != 0) {
                    for (var i = 0; i < List.length; i++) {
                        ul += '<tr>';
                        ul += '<td align="center" >' + (i + 1) + '</td>';
                        //ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationID + '</a></td>';
                        ul += '<td align="center">' + List[i].ReservationNo + '</td>';
                        ul += '<td align="center">' + List[i].ReservationDate + '</td>';
                        ul += '<td align="center">' + List[i].Passenger + '</td>';
                        ul += '<td align="center">' + List[i].Service + '</td>';
                        ul += '<td align="center">' + List[i].Source + '</td>';
                        ul += '<td align="center">' + List[i].Destination + '</td>';
                        //ul += '<td align="center">' + List[i].Driver + '</td>';
                        ul += '<td align="center">' + List[i].TotalAmount + '</td>';
                        //ul += '<td align="center"><a style="cursor: pointer" onclick="ViewDetail(' + List[i].Sid + ')" href="#"><span class="glyphicon glyphicon-list" title="View Detail"></span></a></td>';
                    }
                } else {
                    ul += '<tr>';
                    ul += '<td align="center" colspan="10">No Reservation Found</td>';
                    ul += '</tr>';
                }
                $("#Details").append(ul);
                $("#TotalAmount").text('Total Amount: ' + TotalAmount);
                $("#BWIAmount").text('AS4L Amount: ' + BWIAmount);
                $("#DriverAmount").text('Driver Amount: ' + DriverAmount);
            }
        },
    });
}

function ExportToExcel() {
    window.location.href = "Handler/CorpExpToExcelHandler.ashx?datatable=" + 'dtDriver&Name=' + $('#Select_Driver option:selected').text()
}

function GetAllDriver() {
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/GetAllDriver",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var DriverList = result.DriverList;
            var Div = '';
            if (result.retCode == 1) {
                //Div += '<option value="" >Select Company Name</option>'
                for (var i = 0; i < DriverList.length; i++) {

                    Div += '<option value="' + DriverList[i].Sid + '" >' + DriverList[i].FirstName + ' ' + DriverList[i].LastName + '</option>'
                }
                $("#Select_Driver").append(Div);
            }
        },
    });
}