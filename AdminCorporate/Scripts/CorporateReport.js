$(document).ready(function () {
    GetAllCompany()
});
var ul = '';
function SearchReservation() {
    var From = $('#datepicker1').val();
    var To = $('#datepicker2').val();
    var CompanyName = $('#Select_CompanyName option:selected').val();
    $("#TotalAmount").empty();
    if (From == "") {
        alert("Please Select From Date")
        return false
    }
    if (To == "") {
        alert("Please Select To Date")
        return false
    }
    var Data = { From: From, To: To, CompanyName: CompanyName };
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/CorporateReport",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var ResesrvationList = result.ResesrvationList;
            var Div = '';
            if (result.retCode == 1) {
                $("#Details").empty();
                ul = '';
                var List = result.ResList
                var PassengerName = '';
                var Counter = 0;
                var TotalAmount = result.TotalAmount
                if (List.length != 0) {
                    for (var i = 0; i < List.length; i++) {
                        Counter = Counter + 1;
                        BindingRes(List[i], Counter)
                    }
                }
                else {
                    ul += '<tr>';
                    ul += '<td align="center" colspan="10">No Reservation Found</td>';
                    ul += '</tr>';
                }
                $("#Details").append(ul);
                $("#TotalAmount").text('Total Amount: ' + TotalAmount);
            }
        },
    });
}

function BindingRes(List, Counter) {

    ul += '<tr>';
    ul += '<td align="center" >' + Counter + '</td>';
    //ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationID + '</a></td>';
    ul += '<td align="center">' + List.ReservationNo + '</td>';
    ul += '<td align="center">' + List.ReservationDate + '</td>';
    ul += '<td align="center">' + List.Passenger + '</td>';
    ul += '<td align="center">' + List.PassengerName + '</td>';
    ul += '<td align="center">' + List.Service + '</td>';
    ul += '<td align="center">' + List.Source + '</td>';
    ul += '<td align="center">' + List.Destination + '</td>';
    ul += '<td align="center">' + List.Driver + '</td>';
    ul += '<td align="center">' + List.TotalAmount + '</td>';
    //ul += '<td align="center"><a style="cursor: pointer" onclick="ViewDetail(' + List[i].Sid + ')" href="#"><span class="glyphicon glyphicon-list" title="View Detail"></span></a></td>';
}

function GetAllCompany() {
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/GetAllCompany",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var CompanyList = result.CompanyList;
            var Div = '';
            if (result.retCode == 1) {
                //Div += '<option value="" >Select Company Name</option>'
                for (var i = 0; i < CompanyList.length; i++) {

                    Div += '<option value="' + CompanyList[i].CompanyName + '" >' + CompanyList[i].CompanyName + '</option>'
                }
                $("#Select_CompanyName").append(Div);
            }
        },
    });
}

function ExportToExcel() {
    window.location.href = "Handler/CorpExpToExcelHandler.ashx?datatable=" + 'dtAdminCorpReservation&Name=' + $('#Select_CompanyName option:selected').val()
}