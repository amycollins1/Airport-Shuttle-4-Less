$(document).ready(function () {
    GetAll();
});

var AdultRate = 0;
var ChildRate = 0;
var BaggageRate = 0;
var Details;
var Sid = 0;

function GetAll() {
    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAllAD_CH_Baggage_Rate",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var List = obj.Arr;
            //var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var Div = '';
            $("#Details").empty();
            if (obj.retCode == 1) {
                for (var i = 0; i < List.length; i++) {

                    Div += '<tr>'
                    Div += '<td data-title="S.No">' + (i + 1) + '</td>'
                    Div += '<td data-title="Name">' + List[i].AdultRate + '</td>'
                    Div += '<td data-title="Name">' + List[i].ChildRate + '</td>'
                    Div += '<td data-title="Name">' + List[i].BaggageRate + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="UpdateDilogBox(' + List[i].Sid + ')" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    Div += '</tr>'
                }
                $("#Details").append(Div);
            }
        }
    });
}

function UpdateDilogBox(sid) {
    Sid = sid;
    var data = { Sid: Sid }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/GetAD_CH_Baggage_Rate",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                var Arr = obj.Arr;

                $('#txt_AdultRate_Update').val(Arr[0].AdultRate);
                $('#txt_ChildRate_Update').val(Arr[0].ChildRate);
                $('#txt_BaggageRate_Update').val(Arr[0].BaggageRate);
                $('#Update').modal('show')
            }
            else if (obj.retCode == -1) {
                alert("Record is not found")
            }
            else if (obj.retCode == 0) {
                alert("Something Went Wrong.")
            }
        }
    });
}

function Update() {
    AdultRate = $('#txt_AdultRate_Update').val()
    ChildRate = $('#txt_ChildRate_Update').val()
    BaggageRate = $('#txt_BaggageRate_Update').val()

    if (AdultRate == '') {
        alert("Please Enter Adult Rate")
        return false;
    }
    if (ChildRate == '') {
        alert("Please Enter Child Rate")
        return false;
    }
    if (BaggageRate == '') {
        alert("Please Enter Baggage Rate")
        return false;
    }
    var data = { Sid: Sid, AdultRate: AdultRate, ChildRate: ChildRate, BaggageRate: BaggageRate }

    $.ajax({
        type: "POST",
        url: "Handler/FrederickHandler.asmx/UpdateAD_CH_Baggage_Rate",
        data: JSON.stringify({ Obj: data }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {
                $('#Update').modal('hide')
                GetAll();
                alert("Updated Successfully")
            }
            else if (obj.retCode == -1) {
                alert("Record is not updated")
            }
            else if (obj.retCode == 0) {
                alert("Something Went Wrong.")
            }
        }
    });
}

function AddNew() {
    $("#txt_Mname").val('')
    $("#AddNew").modal("show")
}