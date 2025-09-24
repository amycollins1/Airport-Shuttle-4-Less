$(document).ready(function () {

    LoadAllComment()

});

function LoadAllComment() {
    $.ajax({
        url: "../Handler/DefaultHandler.asmx/LoadAllComment",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#comments").empty();
                CommentList = obj.Arr;
                for (var i = 0; i < CommentList.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.N">'  +parseInt(i + 1) +  '</td>'
                    Div += '<td data-title="Name">' + CommentList[i].Name + '</td>'
                    Div += '<td data-title="Comment">' + CommentList[i].Comment + '</td>'
                    Div += '<td data-title="Email">' + CommentList[i].Email + '</td>'
                    Div += '<td data-title="Phone">' + CommentList[i].PhoneNo + '</td>'
                    Div += '<td data-title="Date">' + CommentList[i].Date + '</td>'
                    if (CommentList[i].IsActive == null) {
                        CommentList[i].IsActive = true
                    }
                    if (CommentList[i].IsActive)
                        Div += '<td data-title="Status"><button type="button"  onclick="CommentStatus(\'' + CommentList[i].Sid + '\',\'' + CommentList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Status"><button type="button" onclick="CommentStatus(\'' + CommentList[i].Sid + '\',\'' + CommentList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '<td data-title="Delete"><button onclick="CommentDelete(\'' + CommentList[i].Sid + '\')" class="btn btn-danger btn-xs glyphicon glyphicon-trash" title="Delete"></button></td>'
                    Div += '</tr>'
                }
                $("#comments").append(Div);
                //if (Sid != 0) {
                //    $("#Select_Vehicle option").each(function () {
                //        if ($(this).val() == ReservationDetail.VehicleId) {
                //            $(this).attr("selected", "selected");
                //            return;
                //        }
                //    });
                //    VehicleChange()
                //}
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function CommentStatus(Id, Status) {
    //if (Status == true)
    //    Status = false;
    //else
    //    Status = true;

    var Data = { Status: Status, CommentId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/CommentStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                LoadAllComment();
            }
        },
    });
}

function CommentDelete(Id) {
    var rConfirm = confirm("Do You want to delete Comment?");
    if (rConfirm == true) {
        var Data = { CommentId: Id };
        $.ajax({
            type: "POST",
            url: "Handler/AdminHandler.asmx/CommentDelete",
            data: JSON.stringify(Data),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (response) {
                var obj = JSON.parse(response.d);
                if (obj.retCode == 1) {

                    Success("Status Updated Successfully.");
                    window.location.reload()
                }
            },
        });
    } else {
        return false
    }
    
}