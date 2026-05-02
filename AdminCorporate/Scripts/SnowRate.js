$(document).ready(function () {
    GetAllSnow();
});

var List = "";
function GetAllSnow() {
    $.ajax({
        url: "Handler/AdminHandler.asmx/GetAllSnow",
        type: "POST",
        data: '{}',
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d);
            var Div = '';
            if (obj.retCode == 1) {
                $("#SelSnow").empty();
                $("#CurrentSnow").empty();
                List = obj.List;
                for (var i = 0; i < List.length; i++) {
                    if (List[i].IsActive) {
                        Div += '<option value="' + List[i].Sid + '" selected>' + List[i].Percentage + '</option>'
                        $("#CurrentSnow").append(List[i].Percentage);
                    }
                    else
                        Div += '<option value="' + List[i].Sid + '" >' + List[i].Percentage + '</option>'
                }
                $("#SelSnow").append(Div);
            }
        },
        error: function () {
            ValidationMessage("Somthing went wrong. Please try again.")
        }
    });
}

function UpdateSnowCharges() {

    var Sid = $("#SelSnow option:selected").val();
    $.ajax({
        type: "POST",
        url: "Handler/AdminHandler.asmx/UpdateSnowCharges",
        data: JSON.stringify({ Sid: Sid }),
        contentType: "application/json",
        datatype: "json",
        success: function (response) {
            var obj = JSON.parse(response.d)
            if (obj.retCode == 1) {
                Success("Snow Charges Updated Successfully.")
                GetAllSnow();
            }
        },
    })
}