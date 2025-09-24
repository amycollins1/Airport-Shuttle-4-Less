$(document).ready(function () {
    GetAllDriver();
    GetAllReservation()

    $("#Sel_Customer").blur(function () {
        var IsMatch = false;
        Name = $("#Sel_Customer").val();
        for (var i = 0; i < CustomerList.length; i++) {
            if (Name == CustomerList[i].FullName) {
                IsMatch = true
                CustomerId = CustomerList[i].Sid;
                var Res = $.grep(ReservationList, function (p) { return p.Sid == CustomerId });
                FirstName = Res[0].FirstName
                LastName = Res[0].LastName
                break;
            }
        }
        if (!IsMatch) {
            $("#Sel_Customer").val('')
        }
    });
});

var unique = [];
var distinct = [], FirstName = '', LastName = '', ResNo = '', From = '', To = '';
var CustomerList = '', ReservationList = '', Name = '', CustomerId = 0, SearchedArr = 0, TotalFare = 0;

function GetAllReservation() {
    $("#Select_Customer").empty();
    $("#Select_ReservationId").empty();
    $("#Select_PhoneNo").empty();
    $.ajax({
        url: "Handler/ReportHandler.asmx/GetAllReservation",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                ReservationList = obj.ReservationList
                
                var array = ReservationList.map(ArrayDestructuring);
                CustomerList = $.grep(array, function (p) { return p.FullName != undefined })
                CustomerList = $.grep(CustomerList, function (p) { return p.Sid > 0 })
               
                for (var i = 0; i < CustomerList.length; i++)
                    Div += '<option data-id="' + CustomerList[i].Sid + '" >' + CustomerList[i].FullName + '</option>'
                $("#Select_Customer").append(Div);

                Div = '';
                var ReservationIdList = ReservationList.map(function (item) { return item.ReservationId; });
                for (var i = 0; i < ReservationIdList.length; i++)
                    Div += '<option data-id="' + ReservationIdList[i] + '" >' + ReservationIdList[i] + '</option>'
                $("#Select_ReservationId").append(Div);

                Div = '';
                var Arr = ReservationList.map(function (item) { return item.PhoneNo; });
                var PhoneNoList = RemoveDuplicate(Arr)
                for (var i = 0; i < PhoneNoList.length; i++)
                    Div += '<option data-id="' + PhoneNoList[i] + '" >' + PhoneNoList[i] + '</option>'
                $("#Select_PhoneNo").append(Div);
            }
        },
    });
}

function Submit() {
    TotalFare = 0;
    SearchedArr = [];
    From = $('#txt_FDate').val();
    To = $('#txt_TDate').val();
    ResNo = $('#Sel_ReservationId').val();
    PhoneNo = $('#Sel_PhoneNo').val();
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
        var DateArr = getDates(dtFrom, dtTo);
        for (var i = 0; i < DateArr.length; i++) {
            var dt = GetArrangeDate(DateArr[i])
            var Res = $.grep(ReservationList, function (p) { return p.ReservationDate == dt });
            SearchedArr = SearchedArr.concat(Res);
        }

    }
    var Customer = $("#Sel_Customer").val();
    var CustomerId = $('#Select_Customer option').filter(function () {
        return this.value == Customer;
    }).data('id'); 
    if (CustomerId != 0 && CustomerId!=undefined) {
        var Res = $.grep(ReservationList, function (p) { return p.Sid == CustomerId });
        if (SearchedArr == '')
            SearchedArr = $.grep(ReservationList, function (p) { return p.FirstName == Res[0].FirstName && p.LastName == Res[0].LastName });
        else
            SearchedArr = $.grep(SearchedArr, function (p) { return p.FirstName == Res[0].FirstName && p.LastName == Res[0].LastName });

    }
    if (ResNo != '') {
        if (SearchedArr == '')
            SearchedArr = $.grep(ReservationList, function (p) { return p.ReservationId == ResNo });
        else
            SearchedArr = $.grep(SearchedArr, function (p) { return p.ReservationId == ResNo });
    }
    if (PhoneNo != '') {
        if (SearchedArr == '')
            SearchedArr = $.grep(ReservationList, function (p) { return p.PhoneNo == PhoneNo });
        else
            SearchedArr = $.grep(SearchedArr, function (p) { return p.PhoneNo == PhoneNo });

    }
    var data = { From: From, To: To, CustomerId: CustomerId, ResNo: ResNo, PhoneNo: PhoneNo, FirstName: FirstName, LastName: LastName }

    $("#Details").empty();
    $("#Calc").empty();
    var ul = '';

    for (var i = 0; i < SearchedArr.length; i++) {
        var Driver = $.grep(DriverList, function (p) { return p.Sid == SearchedArr[i].DriverId })[0];
        ul += '<tr>';
        ul += '<td align="center" >' + (i + 1) + '</td>';
        ul += '<td align="center">' + SearchedArr[i].ReservationId + '</td>';
        if (SearchedArr[i].DriverId != 0) 
            ul += '<td align="center">' + Driver.FirstName + ' ' + Driver.LastName + '</td>';
        else
            ul += '<td align="center">' + SearchedArr[i].DriverName + '</td>';
       
        ul += '<td align="center">' + SearchedArr[i].FirstName + ' ' + SearchedArr[i].LastName + '</td>';
        ul += '<td align="center">' + SearchedArr[i].PhoneNo + '</td>';
        ul += '<td align="center">' + SearchedArr[i].ReservationDate + '</td>';
        ul += '<td align="center">' + SearchedArr[i].Service + '</td>';
        ul += '<td align="center">' + SearchedArr[i].Source + '</td>';
        ul += '<td align="center">' + SearchedArr[i].Destination + '</td>';
        //ul += '<td align="center">' + Arr[i].GratuityAmount + '</td>'; style="width:25%" 
        ul += '<td align="center">' + SearchedArr[i].TotalFare + '</td>';
       // ul += '<td align="center"><a style="cursor: pointer" onclick="ReservationPopUp(' + SearchedArr[i].Sid + ')" href="#"><i class="fa fa-plus-square" aria-hidden="true" data-toggle="tooltip" Title="Add"></i></a></td>'
        ul += '</tr>';
        TotalFare = parseFloat(parseFloat(TotalFare) + parseFloat(SearchedArr[i].TotalFare))
    }
    TotalFare = TotalFare.toFixed(2)    
    $("#Details").append(ul);
    Div = '';
    Div += '<label style="font-weight:bold">Total Fare : ' + TotalFare + '</label><br />';
    $("#Calc").append(Div);
    $.ajax({
        type: "POST",
        url: "Handler/ReportHandler.asmx/CustomerActivityReport",
        data: JSON.stringify({ SearchedArr: SearchedArr }), // Passing SearchedArr as an object property
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
        },
        error: function (error) {
            console.error("Error:", error);
        }
    });

    //$.ajax({
    //    type: "POST",
    //    url: "Handler/ReportHandler.asmx/CustomerActivity",
    //    data: JSON.stringify(data),
    //    contentType: "application/json",
    //    datatype: "json",
    //    success: function (response) {

    //        var obj = JSON.parse(response.d)
    //        if (obj.retCode == 1) {
    //            var Arr = obj.Arr

    //        }
    //        else {
    //            $('#SpnMessege').text("No Record Found")
    //            $('#ModelMessege').modal('show')
    //        }
    //    },
    //});
}

function ExportToExcel() {
    //var Datas = { SearchedArr: SearchedArr }//datatable: 'Customer', 
    //$.ajax({
    //    contentType: 'application/json; charset=utf-8',
    //    dataType: 'json',
    //    url: 'Handler/ReportDownloader.ashx',
    //    type: 'POST',
    //    data: JSON.stringify(Datas),
    //    success: function (res) {
    //        console.log(res);
    //        //alert("Success :" + data);
    //    },
    //    error: function (errorText) {
    //        alert("Wwoops something went wrong !");
    //    }
    //});
    window.location.href = "Handler/ReportDownloader.ashx?datatable=" + 'Customer&TotalFare=' + TotalFare + '&From=' + From + '&To=' + To + '&ResNo=' + ResNo + '&FirstName=' + FirstName + '&LastName=' + LastName + '&PhoneNo=' + PhoneNo + ''
}

function RemoveDuplicate(arr) {
    let outputArray = Array.from(new Set(arr))
    return outputArray
}

function ArrayDestructuring(item) {
    var fullname = [item.FirstName, item.LastName].join(" ");
    if (!unique[item.FirstName, item.LastName]) {
        distinct.push(item.FirstName, item.LastName);
        unique[item.FirstName, item.LastName] = 1;
        return { FullName: fullname, Sid: item.Sid };
    }
    else
        return { FullName: undefined, Sid: 0 }
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function GetArrangeDate(dt) {
    var dd = dt.getDate();
    if (dd <= 9)
        dd = "0" + dd;
    var mm = dt.getMonth() + 1; //January is 0!
    if (mm <= 9)
        mm = "0" + mm;
    var yyyy = dt.getFullYear();
    return mm + "-" + dd + "-" + yyyy;
}