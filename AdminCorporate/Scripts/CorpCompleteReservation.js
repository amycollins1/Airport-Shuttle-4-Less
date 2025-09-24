$(document).ready(function () {
    GetAllConfReservation()
});

var List = '';
var m_Resevation = [];
var m_CheckBox;

function GetAllConfReservation() {
    //$("#Details").dataTable().fnClearTable();
    //$("#Details").dataTable().fnDestroy();
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/GetAllConfReservation",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            if (result.retCode == 1) {
                List = result.List
                var ul = '';
                $("#Details").empty();
                if (List.length != 0) {
                    for (var i = 0; i < List.length; i++) {
                        ul += '<tr>';
                        ul += '<td align="center" >' + (i + 1) + '</td>';
                        ul += '<td align="center" style="width: 5%"><input type="checkbox" class="CheckBox" value="' + List[i].Sid + '"></td>';
                        ul += '<td align="center">' + List[i].ReservationNo + '</td>';
                        ul += '<td align="center">' + List[i].ReservationDate + '</td>';
                        ul += '<td align="center">' + List[i].Passenger + '</td>';
                        ul += '<td align="center">' + List[i].Service + '</td>';
                        ul += '<td align="center">' + List[i].Status + '</td>';
                        ul += '<td align="center">' + List[i].PickupAddress + '</td>';
                        ul += '<td align="center">' + List[i].DropAddress + '</td>';
                        if (List[i].TotalAmount != null)
                            ul += '<td align="center">' + List[i].TotalAmount + '</td>';
                        else
                            ul += '<td align="center"></td>';
                    }
                } else {
                    ul += '<tr>';
                    ul += '<td align="center" colspan="10">No Reservation Found</td>';
                    ul += '</tr>';
                }
                $("#Details").append(ul);
                //$("#Details").dataTable({
                //    "bSort": false
                //});
                setTimeout(function () {
                    ManageReservation();
                },200)
            }
        },
        error: function () {
        }
    });
}

function CompleteReservation() {
    if (m_Resevation.length == 0)
    {
        alert("Please select reservation");
        return false;
    }
    var Conf = confirm("Are you sure want to complete these reservations?");
    if (Conf)
    {
        var Data = { ResIds: m_Resevation };
        $.ajax({
            type: "POST",
            url: "Handler/CorporativeHandler.asmx/CompleteReservation",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
                if (result.retCode == 1) {
                    alert("Reservation Completed Successfully")
                    setTimeout(function () {
                        GetAllConfReservation();
                    }, 250)
                }
            },
            error: function () {
            }
        });
    }
}

function ManageReservation() {
    $(".CheckBox").change(function () {
        m_CheckBox = document.getElementsByClassName('CheckBox');
        m_Resevation = [];
        for (var i = 0; i < m_CheckBox.length; i++) {
            if (m_CheckBox[i].checked) {
                m_Resevation.push(m_CheckBox[i].value);
            }
        }
    })
}