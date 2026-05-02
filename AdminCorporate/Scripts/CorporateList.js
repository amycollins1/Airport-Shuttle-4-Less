$(document).ready(function () {
    GetAllCorporateAccount()
});

function GetAllCorporateAccount() {
    $.ajax({
        type: "POST",
        url: "Handler/CorporativeHandler.asmx/GetAllCorporateAccount",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (response) {
            var result = (typeof response.d) == 'string' ? eval('(' + response.d + ')') : response.d;
            var ul = '';
            if (result.retCode == 1) {
                var List = result.CompanyList;
                for (var i = 0; i < List.length; i++) {
                    ul += '<tr>';
                    ul += '<td align="center" >' + (i + 1) + '</td>';
                    ul += '<td align="center">' + List[i].CompanyName + '</td>';
                    ul += '<td align="center">' + List[i].Email + '</td>';
                    ul += '<td align="center">' + List[i].Password + '</td>';
                    ul += '</tr>';
                }
                $("#MyDetails").append(ul);
            }
        },
    });
}