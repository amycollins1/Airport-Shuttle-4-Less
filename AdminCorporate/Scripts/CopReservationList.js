$(document).ready(function () {
    //GetAllReservation()
    SearchReservation("Load")
    GetAllCompany()
});

var ResesrvationList = '';

function Redirect(Id) {
    window.location.href = "AddCorpReservation.aspx?Sid=" + Id;
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
                Div += '<option value="" >Select Company Name</option>'
                for (var i = 0; i < CompanyList.length; i++) {

                    Div += '<option value="' + CompanyList[i].CompanyName + '" >' + CompanyList[i].CompanyName + '</option>'
                }
                $("#Select_CompanyName").append(Div);
            }
        },
    });
}

function SearchReservation(str) {
    var Data = '';
    if (str == 'Load')
        Data = { CompanyName: "", Status: "New" };
    else
        Data = { CompanyName: $("#Select_CompanyName option:selected").val(), Status: $("#Select_Status option:selected").val() };
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/SearchReservation",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            ResesrvationList = result.ResesrvationList;
            var Div = '';
            if (result.retCode == 1) {
                BindingReservation(ResesrvationList)
            }
        },
    });
}

function BindingReservation(List) {
    var ul = '';
    $("#Details").empty();
    if (List.length != 0) {
        for (var i = 0; i < List.length; i++) {
            ul += '<tr>';
            ul += '<td align="center" >' + (i + 1) + '</td>';
            //ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationID + '</a></td>';
            ul += '<td align="center">' + List[i].ReservationNo + '</td>';
            ul += '<td align="center">' + List[i].ReservationDate + '</td>';
            ul += '<td align="center">' + List[i].Time + '</td>';
            ul += '<td align="center">' + List[i].Passenger + '</td>';
            ul += '<td align="center">' + List[i].Service + '</td>';
            ul += '<td align="center">' + List[i].Status + '</td>';
            ul += '<td align="center">' + List[i].PickupAddress + '</td>';
            ul += '<td align="center">' + List[i].DropAddress + '</td>';
            if (List[i].TotalAmount != null)
                ul += '<td align="center">' + List[i].TotalAmount + '</td>';
            else
                ul += '<td align="center"></td>';
            ul += '<td align="center" class="numeric" data-title="Detail">'
            ul += '<button style="border-color:#dc3545" type="button" onclick="ViewDetail(' + List[i].Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-list" title="View Detail"></button>'
            ul += '</td>'
            //ul += '<td align="center"><a style="cursor: pointer" onclick="ViewDetail(' + List[i].Sid + ')" href="#"><span class="glyphicon glyphicon-list" title="View Detail"></span></a></td>';
            if (List[i].Status != 'Completed') {
                ul += '<td align="center" class="numeric" data-title="Detail">'
                ul += '<button style="border-color:#dc3545" type="button" onclick="Redirect(' + List[i].Sid + ')" class="btn btn-primary btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                ul += '</td>'
            }
                //ul += '<td align="center"><a style="cursor: pointer" onclick="Redirect(' + List[i].Sid + ')" href="#"><span class="glyphicon glyphicon-edit" title="Edit"></span></a></td>';
            else
                ul += '<td align="center"></td>';
            ul += '</tr>';
        }
    }
    else {
        ul += '<tr>';
        ul += '<td align="center" colspan="12">No Reservation Found</td>';
        ul += '</tr>';
    }
    $("#Details").append(ul);
}

function ViewDetail(Id) {
    $("#CreatedBy").empty();
    $("#Driver").empty();
    $("#Remark").empty();
    $("#tblDetail tbody").empty();
    var Detail = $.grep(ResesrvationList, function (p) { return p.Sid == Id })
    $("#gridSystemModalLabel").text('Reservation No: ' + Detail[0].ReservationNo);
    var DriverId = 0;
    if (Detail[0].Driver != null)
        DriverId = Detail[0].Driver
    if (Detail[0].Service == 'From' || Detail[0].Service == 'From Airport') {
        $("#Airline").show();
        $("#FlightNo").show();
    }
    else {
        $("#Airline").hide();
        $("#FlightNo").hide();
    }
    var Data = { ResNo: Detail[0].ReservationNo, DriverId: DriverId };
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/GetReservationDetail",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            if (result.retCode == 1) {
                var ul = '';
                var PassengerDetail = result.List
                var Driver = result.Driver;
                if (Detail[0].Driver != null && Detail[0].Driver != "0") {
                    $("#Driver").text('Driver: ' + Driver.sFirstName + ' ' + Driver.sLastName + ' (' + Driver.sMobile + ')');
                }
                $("#CreatedBy").text('Created By: ' + Detail[0].CreatedBy + ' on Date: ' + Detail[0].CreatedDate);
                for (var i = 0; i < PassengerDetail.length; i++) {
                    ul += '<tr>';
                    ul += '<td align="center" >' + (i + 1) + '</td>';
                    //ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationID + '</a></td>';
                    ul += '<td align="center">' + PassengerDetail[i].FirstName + ' ' + PassengerDetail[i].LastName + '</td>';
                    ul += '<td align="center">' + PassengerDetail[i].MobileNo + '</td>';
                    if (Detail[0].Service == 'From' || Detail[0].Service == 'From Airport') {
                        $("#Airline").show();
                        $("#FlightNo").show();
                        ul += '<td align="center">' + PassengerDetail[i].Airline + '</td>';
                        ul += '<td align="center">' + PassengerDetail[i].FlightNo + '</td>';
                    }

                    ul += '<td align="center">' + PassengerDetail[i].Time + '</td>';

                }
                if (Detail[0].Remark != '')
                    $("#Remark").text('Remark: ' + Detail[0].Remark);
                $("#tblDetail tbody").append(ul);
                $("#ModelDetail").modal("show");
            }
        },
    });
}