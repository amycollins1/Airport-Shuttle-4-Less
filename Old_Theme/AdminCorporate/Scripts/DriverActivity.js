$(document).ready(function () {
    GetAllDriver()
});

var TotalFare = 0, Fare = 0, Tip = 0, PercentageOfFare = 0, DriverEarning = 0, TT = 0, DriverAmountArr = [], DriverJobAmount = 0;
var DriverId = 0, DriverName = '', DriverPercentage = 0, BWIearning = 0
function Submit() {
    //Arr=["test","hi"]
    //setCookie("testcook", JSON.stringify(Arr), "1")
    var From = $('#txt_FDate').val();
    var To = $('#txt_TDate').val();
    DriverId = $("#Select_Driver option:selected").val();

    if (DriverId == 0) {
        ValidationMessage("Please Select Driver Name");
        return false;
    }
    if (From == '' && To != '')
        To = '';
    else if (From != '' && To == '')
        From = '';
    else {
        var dtFrom = new Date(From);
        var dtTo = new Date(To);
        if (dtFrom > dtTo) {
            ValidationMessage("From Date cannot be greater than To Date");
            return false;
        }
    }
    var data = { From: From, To: To, DriverId: DriverId }

    $("#MyTable").empty();
    $("#Calc").empty();
    $.ajax({
        type: "POST",
        url: "Handler/ReportHandler.asmx/DriverActivity",
        data: JSON.stringify(data),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)

            if (obj.retCode == 1) {
                var Arr = obj.Arr
                var SortedByDriver = obj.SortedByDriver

                var Div = '', Name = '';
                TotalFare = 0, Fare = 0, Tip = 0, PercentageOfFare = 0, DriverAmountArr = []
                var Driver = $.grep(DriverList, function (p) { return p.Sid == DriverId })

                for (var i = 0; i < Arr.length; i++) {
                    TotalFare = (parseFloat(parseFloat(TotalFare) + parseFloat(Arr[i].TotalFare))).toFixed(2)
                    Fare = (parseFloat(parseFloat(Fare) + parseFloat(Arr[i].Fare))).toFixed(2)
                    var tp = (Arr[i].Gratuity).split('^')[0]
                    Tip = (parseFloat(parseFloat(Tip) + tp)).toFixed(2)
                    //if (Status == "Completed") {
                       
                    //    if (i == 0) {
                    //        DriverId = SortedByDriver[i].DriverId
                    //        DriverJobAmount = parseFloat(parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0]))
                    //        DriverName = SortedByDriver[i].DriverName
                    //        DriverPercentage = SortedByDriver[i].DriverPercent
                    //        var Percentage = parseFloat(((parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0])) * DriverPercentage) / 100)
                    //        PercentageOfFare = parseFloat(Percentage).toFixed(2);
                    //    }
                    //    else if (DriverId == SortedByDriver[i].DriverId) {
                    //        DriverJobAmount = parseFloat(parseFloat(DriverJobAmount) + parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0]))
                    //        var Percentage = parseFloat(((parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0])) * DriverPercentage) / 100)
                    //        PercentageOfFare = (parseFloat(parseFloat(PercentageOfFare) + Percentage)).toFixed(2);
                    //    }
                    //    else if (DriverId != SortedByDriver[i].DriverId) {
                    //        DriverAmountArr.push(DriverName + "^" + DriverJobAmount.toFixed(2) + "^" + PercentageOfFare);
                    //        DriverId = SortedByDriver[i].DriverId
                    //        DriverJobAmount = parseFloat(parseFloat(DriverJobAmount) + parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0]))
                    //        DriverName = SortedByDriver[i].DriverName
                    //        DriverPercentage = SortedByDriver[i].DriverPercent
                    //        var Percentage = parseFloat(((parseFloat(SortedByDriver[i].TotalFare) - parseFloat((SortedByDriver[i].Gratuity).split('^')[0])) * DriverPercentage) / 100)
                    //        PercentageOfFare = (Percentage).toFixed(2);
                    //    }
                    //    if (i + 1 == Arr.length)
                    //        DriverAmountArr.push(DriverName + "^" + DriverJobAmount.toFixed(2) + "^" + PercentageOfFare);
                    //    TotalBWIearning = parseFloat(TotalBWIearning) + parseFloat(PercentageOfFare);
                    //}

                    Name = Arr[i].FirstName + " " + Arr[i].LastName
                    Div += '<tr>'
                    Div += '<td data-title="S.N">' + parseInt(i + 1) + '</td>'
                    Div += '<td data-title="Booking No">' + Arr[i].ReservationId + '</td>'
                    Div += '<td data-title="Assigned To">' + Arr[i].DriverName + '</td>'
                    Div += '<td data-title="Guest Name">' + Name + '</td>'
                    Div += '<td data-title="Reservation Date">' + Arr[i].ReservationDate + '</td>'
                    Div += '<td data-title="Service">' + Arr[i].Service + '</td>'
                    Div += '<td data-title="Source">' + Arr[i].Source + '</td>'
                    Div += '<td data-title="Destination">' + Arr[i].Destination + '</td>'
                   // Div += '<td data-title="Percentage">' + Arr[i].DriverPercent + '</td>'
                    Div += '<td data-title="Fare">' + Arr[i].Fare + '</td>'
                    Div += '<td data-title="Total Fare">' + Arr[i].TotalFare + '</td>'
                    Div += '</td>'
                    Div += '</tr>'
                }
                $("#MyTable").append(Div);

                TT = (parseFloat(TotalFare) - parseFloat(Tip)).toFixed(2)
                BWIearning = (parseFloat((parseFloat(TT) * Driver[0].Percentage) / 100)).toFixed(2);
                DriverEarning = (parseFloat(TotalFare) - parseFloat(BWIearning)).toFixed(2);
                Div = ''
                Div += '<label style="font-weight:bold">Total Fare : ' + TotalFare + '</label><br />';
                Div += '<label style="font-weight:bold">Tip : ' + Tip + '</label><br />';
                Div += '<label style="font-weight:bold">Total - Tip : ' + TT + '</label><br />';
                Div += '<label style="font-weight:bold">BWI Earning : ' + BWIearning + '</label><br />';
                Div += '<label style="font-weight:bold">Driver Earning : ' + DriverEarning + '</label><br />';
                $("#Calc").append(Div);
                document.getElementById("ContentPlaceHolder1_DriverCalc").value = TotalFare + "*" + Tip + "*" + TT + "*" + BWIearning + "*" + DriverEarning
            }
        },
    });
}

function ExportToExcel() {
    window.location.href = "Handler/ReportDownloader.ashx?datatable=" + 'Driver&TotalFare=' + TotalFare + '&Tip=' + Tip + '&TT=' + TT + '&BWIearning=' + BWIearning + '&DriverEarning=' + DriverEarning + ''
}