$(document).ready(function () {


    LoadAllOffer()

});

function InsertCoupon() {

    var offrname = $("#offrname").val();
    var offrcode = $("#offrcode").val();
    var ofrpercent = $("#ofrpercent").val();

    if (offrname == '') {
        alert("Please Enter Offer Name");
        return false;
    }
    if (offrcode == '') {
        alert("Please Enter Code");
        return false;
    }


    if (ofrpercent == '') {
        alert("Please Enter Percent");
        return false;
    }

    var DataArr = {
        Name: offrname,
        Code: offrcode,
        Percents: ofrpercent
    };

    $.ajax({
        type: "POST",
        url: "Handler/MasterHandler.asmx/InsertCoupon",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Offer Added Successfully.")
                setTimeout(function () {
                    window.location.reload();
                }, 600)
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}

function LoadAllOffer() {
    $.ajax({
        url: "Handler/AdminHandler.asmx/GetAllOffer",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#tbl_CouponDetails").empty();
                OfferList = obj.List;
                for (var i = 0; i < OfferList.length; i++) {
                    Div += '<tr>'
                    Div += '<td data-title="S.N">' + parseInt(i + 1) + '</td>'
                    Div += '<td data-title="Offer Name">' + OfferList[i].Name + '</td>'
                    Div += '<td data-title="Offer Code">' + OfferList[i].Code + '</td>'
                    Div += '<td data-title="Percent" style="word-break:break-all;">' + OfferList[i].Percents + '</td>'
                    Div += '<td data-title="Edit">'
                    Div += '<button type="button" onclick="OpenPopup(\'' + OfferList[i].Sid + '\');" class="btn btn-info btn-xs glyphicon glyphicon-edit" title="Edit"></button>'
                    Div += '</td>'
                    if (OfferList[i].IsActive)
                        Div += '<td data-title="Activated"><button onclick="OfferStatus(\'' + OfferList[i].Sid + '\',\'' + OfferList[i].IsActive + '\')" class="btn btn-success btn-xs fa fa-check" title="Activated"></button></td>'
                    else
                        Div += '<td data-title="Deactivated"><button onclick="OfferStatus(\'' + OfferList[i].Sid + '\',\'' + OfferList[i].IsActive + '\')" class="btn btn-danger btn-xs fa fa-times" title="Deactivated"></td>'

                    Div += '</tr>'
                }
                $("#tbl_CouponDetails").append(Div);
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

var Sid = 0;
function OpenPopup(id) {
    Sid = id;
    $('#OpenPopupOffer').modal('show');
    var Data = { Sid: Sid };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/GetOffer",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var list = obj.List;
            if (obj.retCode == 1) {

                $('#Uoffrname').val(list.Name);
                $('#Uoffrcode').val(list.Code);
                $('#Uofrpercent').val(list.Percents);

            }
        },
    });
}

function UpdateOffer() {

    var Name = $("#Uoffrname").val();
    var Code = $("#Uoffrcode").val();
    var Percent = $("#Uofrpercent").val();

    var DataArr = {
        Sid: Sid,
        Name: Name,
        Code: Code,
        Percents: Percent,
    };

    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/UpdateOffer",
        data: JSON.stringify({ Obj: DataArr }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {


                Success("Offer Updated Successfully.")

                //LoadAllOffer()
                //$("#OpenPopupOffer").hide();
                setTimeout(location.reload(), 800);
            } else {
                Success("Something Went Wrong");
            }
        },
    });
}


function OfferStatus(Id, Status) {
    //if (Status == true)
    //    Status = false;
    //else
    //    Status = true;

    var Data = { Status: Status, OfferId: Id };
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/OfferStatus",
        data: JSON.stringify(Data),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            if (obj.retCode == 1) {

                Success("Status Updated Successfully.");
                LoadAllOffer();
            }
        },
    });
}