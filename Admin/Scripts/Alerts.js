function Cancel() {
    $("#ConformModal").modal("hide")
}
function Confirm(Message, Method, arg) {
    $("#Heading").html("Confirm")
    $("#btnClose").text("No");
    $("#btnYes").css("display", "")
    var id = [];
    if (arg != null) {
        for (var i = 0; i < arg.length; i++) {
            id.push('"' + arg[i] + '"')
        }
    }

    $("#Message").html(Message);
    if (arg == null)
        document.getElementById("btnYes").setAttribute("onclick", Method + "()")
    else
        document.getElementById("btnYes").setAttribute("onclick", Method + "(" + id + ")")
    $("#AlertModal").modal("show")
}
function Success(Message) {
    //$("#btnClose").text("Close");
    //$("#btnYes").css("display", "none")
    $("#Message").html(Message);
    $("#Heading").html("Success")
    $("#AlertModal").modal("show")
    return "";
}
function ValidationMessage(Message) {
    //$("#btnClose").text("Close");
    //$("#btnYes").css("display", "none")
    $("#Message").html(Message);
    //$("#btnDone").css("display", "none")
    $("#Heading").html("Alert")
    $("#AlertModal").modal("show")
    return "";
}

//function setCookie(cname, cvalue, exHrs) {
//    var d = new Date();
//    d.setTime(d.getTime() + (exHrs * 60 * 60 * 1000));
//    var expires = "expires=" + d.toUTCString();
//    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//}

//function getCookie(cname) {
//    var name = cname + "=";
//    var decodedCookie = decodeURIComponent(document.cookie);
//    var ca = decodedCookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}

//function clearCookies(name) {
//    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
//}

function GetQueryString(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1].replace("%20", " ");
        }
    }
}