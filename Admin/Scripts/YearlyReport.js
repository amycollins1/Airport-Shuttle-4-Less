$(document).ready(function () {    
    LoadAllCount()
});

function LoadAllCount() {
    $.ajax({
        type: "POST",
        url: "Handler/DashboardHandler.asmx/DashboardCount",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var MyList = sessionStorage.getItem("DriverListStorage")
                if (MyList == "" || MyList == null)
                    GetAllDriver()
                else {
                    DriverList = JSON.parse(MyList); 
                } 
            }
        },
    });
}

function Submit() {
    $("#Details tbody").empty();
    $("#Calc").empty();
    $("#Details").DataTable().clear().draw();
    $("#Details").DataTable();
    $("#Details").dataTable().fnDestroy();
    var From = $('#txt_FDate').val();
    var To = $('#txt_TDate').val();
    $("#Calc").empty();
    if (From == "") {
        alert("Please Select From Date")
        return false
    }
    if (To == "") {
        alert("Please Select To Date")
        return false
    }
    var data = { From: From, To: To }
    $.ajax({
        type: "POST",
        url: "Handler/ReportHandler.asmx/YearlyReport",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var ul = '';
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                //$("#Details").dataTable().fnClearTable();
                //$("#Details").dataTable().fnDestroy();
                Arr = obj.Arr
                TotalAmount = obj.TotalFare;
                for (var i = 0; i < Arr.length; i++) {
                    var Driver = $.grep(DriverList, function (p) { return p.Sid == Arr[i].DriverId });
                    ul += '<tr>';
                    ul += '<td align="center" >' + (i + 1) + '</td>';
                    ul += '<td align="center" style="cursor: pointer;" onclick="BookingDetails(' + i + ')"><a>' + Arr[i].ReservationId + '</a></td>';
                    ul += '<td align="center">' + Driver[0].FirstName + ' ' + Driver[0].LastName + '</td>';
                    ul += '<td align="center">' + Arr[i].FirstName + ' ' + Arr[i].LastName + '</td>';
                    ul += '<td align="center">' + Arr[i].ReservationDate + '</td>';
                    ul += '<td align="center">' + Arr[i].Service + '</td>';
                    ul += '<td align="center">' + Arr[i].Source + '</td>';
                    ul += '<td align="center">' + Arr[i].Destination + '</td>';
                    ul += '<td align="center">' + Arr[i].TotalFare + '</td>';
                    ul += '</tr>';
                }
                //$("#MyTable").append(ul);
               

               
            }
            else {
                ul += '<tr>';
                ul += '<td colspan="9" align="center">No Record Found </td>';
                ul += '</tr>';
                $("#MyTable").append(ul);
            }
            $("#Details tbody").append(ul);            
            $("#Details").dataTable({
                "bSort": true,
                paging: true,
                autoWidth: false,
            });
            div = '';
            div += '<br />';
            div += '<label style="font-weight:bold">Total Fare : ' + TotalAmount.toFixed(2) + '</label><br />';
            $("#Calc").append(div);
        },
        error: function () {

            $('#SpnMessege').text("Something Went Wrong.")
            $('#ModelMessege').modal('show')
        },
    });
}

var Arr;
var TotalAmount = 0;

function BookingDetails(ObjNo) {
    var Name = Arr[ObjNo].FirstName + " " + Arr[ObjNo].LastName;
    var Driver = $.grep(DriverList, function (p) { return p.Sid == Arr[ObjNo].DriverId });
    $("#BookingDetails").modal("show");
    $("#BookingNo").text(Arr[ObjNo].ReservationId);
    $("#ResDate").text(Arr[ObjNo].ReservationDate);
    $("#Source").text(Arr[ObjNo].Source);
    $("#Destination").text(Arr[ObjNo].Destination);
    $("#AssignedTo").text(Driver[0].FirstName + ' ' + Driver[0].LastName);
    $("#Name").text(Name);
    $("#Service").text(Arr[ObjNo].Service);
    $("#TotalFare").text("$ " + Arr[ObjNo].TotalFare); 
    $("#Passenger").text(Arr[ObjNo].Passenger);
    $("#PhoneNo").text(Arr[ObjNo].PhoneNo);
    $("#ResTime").text(Arr[ObjNo].Time);
}

function ExportToExcel() {
    window.location.href = "Handler/ReportDownloader.ashx?datatable=" + 'YearlyReport&TotalFare=' + TotalAmount + ''
}