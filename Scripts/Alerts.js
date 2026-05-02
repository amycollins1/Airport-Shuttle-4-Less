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

function CheckProfileImage(Gender,FileName) {
    var Fn = '';
    if (FileName != null && FileName != "") {
        Fn = "Profile Pictures/" + FileName + ".png";
    }
    else if (Gender == "Male")
        Fn = "manprofile.png";
    else if (Gender == "Female")
        Fn = "womenprofile.png";
    return "../Images/" + Fn;
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

function BingingCaste(Religion) {
    var tr = '';
    var Splitter = Religion.split('^')
    if (Splitter.length == 2) {
        //tr = '<option value="Doesn\'t Matter"  label="Select">Doesn\'t Matter</option>'
        Religion = Splitter[0]
    }
        
    if (Religion == 'Hindu') {

        tr += '<optgroup id="frm-caste-optgroup-Frequently Used" label="Frequently Used"></optgroup>' +
        '        <option value="96 Kuli Maratha">96 Kuli Maratha</option>' +
        '        <option value="Agarwal">Agarwal</option>' +
        '        <option value="Arora">Arora</option>' +
        '        <option value="Baniya">Baniya</option>' +
        '        <option value="Brahmin - All">Brahmin - All</option>' +
        '        <option value="Brahmin - Bhumihar">Brahmin - Bhumihar</option>' +
        '        <option value="Brahmin - Gour">Brahmin - Gour</option>' +
        '        <option value="Brahmin - Kanyakubja">Brahmin - Kanyakubja</option>' +
        '        <option value="Brahmin - Other">Brahmin - Other</option>' +
        '        <option value="Brahmin - Saryuparin">Brahmin - Saryuparin</option>' +
        '        <option value="Gupta">Gupta</option>' +
        '        <option value="Jatav">Jatav</option>' +
        '        <option value="Kashyap">Kashyap</option>' +
        '        <option value="Kayastha">Kayastha</option>' +
        '        <option value="Khatri">Khatri</option>' +
        '        <option value="Kshatriya - All">Kshatriya - All</option>' +
        '        <option value="Kshatriya">Kshatriya</option>' +
        '        <option value="Maratha - All">Maratha - All</option>' +
        '        <option value="Maratha">Maratha</option>' +
        '        <option value="Other">Other</option>' +
        '        <option value="Rajput - All">Rajput - All</option>' +
        '        <option value="Rajput">Rajput</option>' +
        '        <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>' +
        '        <option value="Yadav">Yadav</option>' +
        '        <optgroup id="frm-caste-optgroup-More" label="More"></optgroup>' +
        '        <option value="24 Manai Telugu Chettiar">24 Manai Telugu Chettiar</option>' +
        '        <option value="96K Kokanastha">96K Kokanastha</option>' +
        '        <option value="Adi Andhra">Adi Andhra</option>' +
        '        <option value="Adi Dharmi">Adi Dharmi</option>' +
        '        <option value="Adi Dravida">Adi Dravida</option>' +
        '        <option value="Adi Karnataka">Adi Karnataka</option>' +
        '        <option value="Agamudayar">Agamudayar</option>' +
        '        <option value="Agnikula Kshatriya">Agnikula Kshatriya</option>' +
        '        <option value="Agri">Agri</option>' +
        '        <option value="Ahir">Ahir</option>' +
        '        <option value="Ahom">Ahom</option>' +
        '        <option value="Ambalavasi">Ambalavasi</option>' +
        '        <option value="Arcot">Arcot</option>' +
        '        <option value="Arekatica">Arekatica</option>' +
        '        <option value="Arunthathiyar">Arunthathiyar</option>' +
        '        <option value="Arya Vysya">Arya Vysya</option>' +
        '        <option value="Aryasamaj">Aryasamaj</option>' +
        '        <option value="Ayyaraka">Ayyaraka</option>' +
        '        <option value="Badaga">Badaga</option>' +
        '        <option value="Baghel/Pal/Gaderiya">Baghel/Pal/Gaderiya</option>' +
        '        <option value="Bahi">Bahi</option>' +
        '        <option value="Baidya">Baidya</option>' +
        '        <option value="Baishnab">Baishnab</option>' +
        '        <option value="Baishya">Baishya</option>' +
        '        <option value="Bajantri">Bajantri</option>' +
        '        <option value="Balija">Balija</option>' +
        '        <option value="Naidu - All">Naidu - All</option>' +
        '        <option value="Balija - Naidu">Balija - Naidu</option>' +
        '        <option value="Banayat Oriya">Banayat Oriya</option>' +
        '        <option value="Banik">Banik</option>' +
        '        <option value="Barai">Barai</option>' +
        '        <option value="Bari">Bari</option>' +
        '        <option value="Barnwal">Barnwal</option>' +
        '        <option value="Barujibi">Barujibi</option>' +
        '        <option value="Bengali">Bengali</option>' +
        '        <option value="Besta">Besta</option>' +
        '        <option value="Bhandari">Bhandari</option>' +
        '        <option value="Bhatia">Bhatia</option>' +
        '        <option value="Bhatraju">Bhatraju</option>' +
        '        <option value="Bhavsar">Bhavsar</option>' +
        '        <option value="Bhovi">Bhovi</option>' +
        '        <option value="Billava">Billava</option>' +
        '        <option value="Boya/Nayak/Naik">Boya/Nayak/Naik</option>' +
        '        <option value="Boyer">Boyer</option>' +
        '        <option value="Brahmbatt">Brahmbatt</option>' +
        '        <option value="Brahmin">Brahmin</option>' +
        '        <option value="Brahmin - Anavil">Brahmin - Anavil</option>' +
        '        <option value="Brahmin - Audichya">Brahmin - Audichya</option>' +
        '        <option value="Brahmin - Barendra">Brahmin - Barendra</option>' +
        '        <option value="Brahmin - Bengali">Brahmin - Bengali</option>' +
        '        <option value="Brahmin - Bhatt">Brahmin - Bhatt</option>' +
        '        <option value="Brahmin - Brahmbhatt">Brahmin - Brahmbhatt</option>' +
        '        <option value="Brahmin - Dadhich/Dadheech">Brahmin - Dadhich/Dadheech</option>' +
        '        <option value="Brahmin - Daivadnya">Brahmin - Daivadnya</option>' +
        '        <option value="Brahmin - Danua">Brahmin - Danua</option>' +
        '        <option value="Brahmin - Deshastha">Brahmin - Deshastha</option>' +
        '        <option value="Brahmin - Dhiman">Brahmin - Dhiman</option>' +
        '        <option value="Brahmin - Dravida">Brahmin - Dravida</option>' +
        '        <option value="Brahmin - Embrandiri">Brahmin - Embrandiri</option>' +
        '        <option value="Brahmin - Garhwali">Brahmin - Garhwali</option>' +
        '        <option value="Brahmin - Goswami">Brahmin - Goswami</option>' +
        '        <option value="Brahmin - Gowd Saraswat">Brahmin - Gowd Saraswat</option>' +
        '        <option value="Brahmin - Gujar Gour">Brahmin - Gujar Gour</option>' +
        '        <option value="Brahmin - Gurukkal">Brahmin - Gurukkal</option>' +
        '        <option value="Brahmin - Halua">Brahmin - Halua</option>' +
        '        <option value="Brahmin - Havyaka">Brahmin - Havyaka</option>' +
        '        <option value="Brahmin - Himachali">Brahmin - Himachali</option>' +
        '        <option value="Brahmin - Hoysala">Brahmin - Hoysala</option>' +
        '        <option value="Brahmin - Iyengar">Brahmin - Iyengar</option>' +
        '        <option value="Brahmin - Iyer">Brahmin - Iyer</option>' +
        '        <option value="Brahmin - Jangid">Brahmin - Jangid</option>' +
        '        <option value="Brahmin - Jhadua">Brahmin - Jhadua</option>' +
        '        <option value="Brahmin - Jhijhotiya">Brahmin - Jhijhotiya</option>' +
        '        <option value="Brahmin - Kannada Madhva">Brahmin - Kannada Madhva</option>' +
        '        <option value="Brahmin - Karhade">Brahmin - Karhade</option>' +
        '        <option value="Brahmin - Kashmiri Pandit">Brahmin - Kashmiri Pandit</option>' +
        '        <option value="Brahmin - Kokanastha">Brahmin - Kokanastha</option>' +
        '        <option value="Brahmin - Kota">Brahmin - Kota</option>' +
        '        <option value="Brahmin - Kulin">Brahmin - Kulin</option>' +
        '        <option value="Brahmin - Kumaoni">Brahmin - Kumaoni</option>' +
        '        <option value="Brahmin - Madhwa">Brahmin - Madhwa</option>' +
        '        <option value="Brahmin - Maharashtrian">Brahmin - Maharashtrian</option>' +
        '        <option value="Brahmin - Maithili">Brahmin - Maithili</option>' +
        '        <option value="Brahmin - Modh">Brahmin - Modh</option>' +
        '        <option value="Brahmin - Mohyal">Brahmin - Mohyal</option>' +
        '        <option value="Brahmin - Nagar">Brahmin - Nagar</option>' +
        '        <option value="Brahmin - Namboodiri">Brahmin - Namboodiri</option>' +
        '        <option value="Brahmin - Niyogi">Brahmin - Niyogi</option>' +
        '        <option value="Brahmin - Niyogi Nandavariki">Brahmin - Niyogi Nandavariki</option>' +
        '        <option value="Brahmin - Paliwal">Brahmin - Paliwal</option>' +
        '        <option value="Brahmin - Panda">Brahmin - Panda</option>' +
        '        <option value="Brahmin - Pareek">Brahmin - Pareek</option>' +
        '        <option value="Brahmin - Punjabi">Brahmin - Punjabi</option>' +
        '        <option value="Brahmin - Pushkarna">Brahmin - Pushkarna</option>' +
        '        <option value="Brahmin - Rarhi">Brahmin - Rarhi</option>' +
        '        <option value="Brahmin - Rudraj">Brahmin - Rudraj</option>' +
        '        <option value="Brahmin - Sakaldwipi">Brahmin - Sakaldwipi</option>' +
        '        <option value="Brahmin - Sanadya">Brahmin - Sanadya</option>' +
        '        <option value="Brahmin - Sanketi">Brahmin - Sanketi</option>' +
        '        <option value="Brahmin - Saraswat">Brahmin - Saraswat</option>' +
        '        <option value="Brahmin - Sarua">Brahmin - Sarua</option>' +
        '        <option value="Brahmin - Shivhalli">Brahmin - Shivhalli</option>' +
        '        <option value="Brahmin - Shrimali">Brahmin - Shrimali</option>' +
        '        <option value="Brahmin - Smartha">Brahmin - Smartha</option>' +
        '        <option value="Brahmin - Sri Vaishnava">Brahmin - Sri Vaishnava</option>' +
        '        <option value="Brahmin - Stanika">Brahmin - Stanika</option>' +
        '        <option value="Brahmin - Tyagi">Brahmin - Tyagi</option>' +
        '        <option value="Brahmin - Vaidiki">Brahmin - Vaidiki</option>' +
        '        <option value="Brahmin - Vaikhanasa">Brahmin - Vaikhanasa</option>' +
        '        <option value="Brahmin - Velanadu">Brahmin - Velanadu</option>' +
        '        <option value="Brahmin - Viswabrahmin">Brahmin - Viswabrahmin</option>' +
        '        <option value="Brahmin - Vyas">Brahmin - Vyas</option>' +
        '        <option value="Brahmo">Brahmo</option>' +
        '        <option value="Buddar">Buddar</option>' +
        '        <option value="Bunt (Shetty)">Bunt (Shetty)</option>' +
        '        <option value="CKP">CKP</option>' +
        '        <option value="Chalawadi Holeya">Chalawadi Holeya</option>' +
        '        <option value="Chambhar">Chambhar</option>' +
        '        <option value="Chandravanshi Kahar">Chandravanshi Kahar</option>' +
        '        <option value="Chasa">Chasa</option>' +
        '        <option value="Chattada Sri Vaishnava">Chattada Sri Vaishnava</option>' +
        '        <option value="Chaudary">Chaudary</option>' +
        '        <option value="Chaurasia">Chaurasia</option>' +
        '        <option value="Nair - All">Nair - All</option>' +
        '        <option value="Chekkala - Nair">Chekkala - Nair</option>' +
        '        <option value="Chennadasar">Chennadasar</option>' +
        '        <option value="Cheramar">Cheramar</option>' +
        '        <option value="Chettiar">Chettiar</option>' +
        '        <option value="Chhetri">Chhetri</option>' +
        '        <option value="Chippolu/Mera">Chippolu/Mera</option>' +
        '        <option value="Coorgi">Coorgi</option>' +
        '        <option value="Devadiga">Devadiga</option>' +
        '        <option value="Devanga">Devanga</option>' +
        '        <option value="Devar/Thevar/Mukkulathor">Devar/Thevar/Mukkulathor</option>' +
        '        <option value="Devendra Kula Vellalar">Devendra Kula Vellalar</option>' +
        '        <option value="Dhangar">Dhangar</option>' +
        '        <option value="Dheevara">Dheevara</option>' +
        '        <option value="Dhiman">Dhiman</option>' +
        '        <option value="Dhoba">Dhoba</option>' +
        '        <option value="Dhobi">Dhobi</option>' +
        '        <option value="Digambar">Digambar</option>' +
        '        <option value="Dommala">Dommala</option>' +
        '        <option value="Dusadh">Dusadh</option>' +
        '        <option value="Ediga">Ediga</option>' +
        '        <option value="Ezhava">Ezhava</option>' +
        '        <option value="Ezhuthachan">Ezhuthachan</option>' +
        '        <option value="Gabit">Gabit</option>' +
        '        <option value="Ganakar">Ganakar</option>' +
        '        <option value="Gandla">Gandla</option>' +
        '        <option value="Ganiga">Ganiga</option>' +
        '        <option value="Garhwali">Garhwali</option>' +
        '        <option value="Gatti">Gatti</option>' +
        '        <option value="Gavali">Gavali</option>' +
        '        <option value="Gavara">Gavara</option>' +
        '        <option value="Ghumar">Ghumar</option>' +
        '        <option value="Goala">Goala</option>' +
        '        <option value="Goan">Goan</option>' +
        '        <option value="Goswami">Goswami</option>' +
        '        <option value="Goud">Goud</option>' +
        '        <option value="Gounder">Gounder</option>' +
        '        <option value="Gowda">Gowda</option>' +
        '        <option value="Gramani">Gramani</option>' +
        '        <option value="Gudia">Gudia</option>' +
        '        <option value="Gujarati">Gujarati</option>' +
        '        <option value="Gujjar">Gujjar</option>' +
        '        <option value="Guptan">Guptan</option>' +
        '        <option value="Gurjar">Gurjar</option>' +
        '        <option value="Halwai">Halwai</option>' +
        '        <option value="Hegde">Hegde</option>' +
        '        <option value="Helava">Helava</option>' +
        '        <option value="Hugar (Jeer)">Hugar (Jeer)</option>' +
        '        <option value="Intercaste">Intercaste</option>' +
        '        <option value="Jaalari">Jaalari</option>' +
        '        <option value="Jaiswal">Jaiswal</option>' +
        '        <option value="Jandra">Jandra</option>' +
        '        <option value="Jangam">Jangam</option>' +
        '        <option value="Jat">Jat</option>' +
        '        <option value="Jetty Malla">Jetty Malla</option>' +
        '        <option value="Kachara">Kachara</option>' +
        '        <option value="Kaibarta">Kaibarta</option>' +
        '        <option value="Kakkalan">Kakkalan</option>' +
        '        <option value="Kalar">Kalar</option>' +
        '        <option value="Kalinga">Kalinga</option>' +
        '        <option value="Kalinga Vysya">Kalinga Vysya</option>' +
        '        <option value="Kalita">Kalita</option>' +
        '        <option value="Kalwar">Kalwar</option>' +
        '        <option value="Kamboj">Kamboj</option>' +
        '        <option value="Kamma">Kamma</option>' +
        '        <option value="Kamma Naidu">Kamma Naidu</option>' +
        '        <option value="Kammala">Kammala</option>' +
        '        <option value="Kaniyan">Kaniyan</option>' +
        '        <option value="Kannada Mogaveera">Kannada Mogaveera</option>' +
        '        <option value="Kansari">Kansari</option>' +
        '        <option value="Kanu">Kanu</option>' +
        '        <option value="Kapu">Kapu</option>' +
        '        <option value="Kapu Naidu">Kapu Naidu</option>' +
        '        <option value="Karana">Karana</option>' +
        '        <option value="Karmakar">Karmakar</option>' +
        '        <option value="Kartha">Kartha</option>' +
        '        <option value="Karuneegar">Karuneegar</option>' +
        '        <option value="Kasar">Kasar</option>' +
        '        <option value="Kavuthiyya/Ezhavathy">Kavuthiyya/Ezhavathy</option>' +
        '        <option value="Khandayat">Khandayat</option>' +
        '        <option value="Khandelwal">Khandelwal</option>' +
        '        <option value="Kharwar">Kharwar</option>' +
        '        <option value="Khatik">Khatik</option>' +
        '        <option value="Kirar">Kirar</option>' +
        '        <option value="Koli">Koli</option>' +
        '        <option value="Koli Patel">Koli Patel</option>' +
        '        <option value="Kongu Vellala Gounder">Kongu Vellala Gounder</option>' +
        '        <option value="Konkani">Konkani</option>' +
        '        <option value="Korama">Korama</option>' +
        '        <option value="Kori">Kori</option>' +
        '        <option value="Koshti">Koshti</option>' +
        '        <option value="Krishnavaka">Krishnavaka</option>' +
        '        <option value="Kshatriya - Bhavasar">Kshatriya - Bhavasar</option>' +
        '        <option value="Kshatriya/Raju/Varma">Kshatriya/Raju/Varma</option>' +
        '        <option value="Kudumbi">Kudumbi</option>' +
        '        <option value="Kulal">Kulal</option>' +
        '        <option value="Kulalar">Kulalar</option>' +
        '        <option value="Kulita">Kulita</option>' +
        '        <option value="Kumawat">Kumawat</option>' +
        '        <option value="Kumbara">Kumbara</option>' +
        '        <option value="Kumbhakar/Kumbhar">Kumbhakar/Kumbhar</option>' +
        '        <option value="Kumhar">Kumhar</option>' +
        '        <option value="Kummari">Kummari</option>' +
        '        <option value="Kunbi">Kunbi</option>' +
        '        <option value="Kurava">Kurava</option>' +
        '        <option value="Kuravan">Kuravan</option>' +
        '        <option value="Kurmi">Kurmi</option>' +
        '        <option value="Kurmi Kshatriya">Kurmi Kshatriya</option>' +
        '        <option value="Kuruba">Kuruba</option>' +
        '        <option value="Kuruhina Shetty">Kuruhina Shetty</option>' +
        '        <option value="Kurumbar">Kurumbar</option>' +
        '        <option value="Kurup">Kurup</option>' +
        '        <option value="Kushwaha">Kushwaha</option>' +
        '        <option value="Kutchi">Kutchi</option>' +
        '        <option value="Lambadi/Banjara">Lambadi/Banjara</option>' +
        '        <option value="Lambani">Lambani</option>' +
        '        <option value="Leva Patil">Leva Patil</option>' +
        '        <option value="Lingayath">Lingayath</option>' +
        '        <option value="Lohana">Lohana</option>' +
        '        <option value="Lohar">Lohar</option>' +
        '        <option value="Loniya/Lonia/Lunia">Loniya/Lonia/Lunia</option>' +
        '        <option value="Lubana">Lubana</option>' +
        '        <option value="Madhesiya">Madhesiya</option>' +
        '        <option value="Madiga">Madiga</option>' +
        '        <option value="Mahajan">Mahajan</option>' +
        '        <option value="Mahar">Mahar</option>' +
        '        <option value="Maharashtrian">Maharashtrian</option>' +
        '        <option value="Mahendra">Mahendra</option>' +
        '        <option value="Maheshwari">Maheshwari</option>' +
        '        <option value="Mahindra">Mahindra</option>' +
        '        <option value="Mahishya">Mahishya</option>' +
        '        <option value="Majabi">Majabi</option>' +
        '        <option value="Mala">Mala</option>' +
        '        <option value="Malayalee Variar">Malayalee Variar</option>' +
        '        <option value="Mali">Mali</option>' +
        '        <option value="Mallah">Mallah</option>' +
        '        <option value="Mangalorean">Mangalorean</option>' +
        '        <option value="Maniyani">Maniyani</option>' +
        '        <option value="Mannadiar">Mannadiar</option>' +
        '        <option value="Mannan">Mannan</option>' +
        '        <option value="Mapila">Mapila</option>' +
        '        <option value="Marar">Marar</option>' +
        '        <option value="Maratha - Gomantak">Maratha - Gomantak</option>' +
        '        <option value="Maruthuvar">Maruthuvar</option>' +
        '        <option value="Marvar">Marvar</option>' +
        '        <option value="Marwari">Marwari</option>' +
        '        <option value="Matang">Matang</option>' +
        '        <option value="Maurya">Maurya</option>' +
        '        <option value="Meda">Meda</option>' +
        '        <option value="Medara">Medara</option>' +
        '        <option value="Meena">Meena</option>' +
        '        <option value="Meenavar">Meenavar</option>' +
        '        <option value="Meghwal">Meghwal</option>' +
        '        <option value="Mehra">Mehra</option>' +
        '        <option value="Menon">Menon</option>' +
        '        <option value="Meru Darji">Meru Darji</option>' +
        '        <option value="Modak">Modak</option>' +
        '        <option value="Mogaveera">Mogaveera</option>' +
        '        <option value="Monchi">Monchi</option>' +
        '        <option value="Mudaliar - All">Mudaliar - All</option>' +
        '        <option value="Mudaliar">Mudaliar</option>' +
        '        <option value="Mudaliar - Arcot">Mudaliar - Arcot</option>' +
        '        <option value="Mudaliar - Saiva">Mudaliar - Saiva</option>' +
        '        <option value="Mudaliar - Senguntha">Mudaliar - Senguntha</option>' +
        '        <option value="Mudiraj">Mudiraj</option>' +
        '        <option value="Munnuru Kapu">Munnuru Kapu</option>' +
        '        <option value="Muthuraja">Muthuraja</option>' +
        '        <option value="Naagavamsam">Naagavamsam</option>' +
        '        <option value="Nadar">Nadar</option>' +
        '        <option value="Nagaralu">Nagaralu</option>' +
        '        <option value="Nai">Nai</option>' +
        '        <option value="Naicken">Naicken</option>' +
        '        <option value="Naicker">Naicker</option>' +
        '        <option value="Naidu">Naidu</option>' +
        '        <option value="Naik">Naik</option>' +
        '        <option value="Nair">Nair</option>' +
        '        <option value="Nair - Vaniya">Nair - Vaniya</option>' +
        '        <option value="Nair - Velethadathu">Nair - Velethadathu</option>' +
        '        <option value="Nair - Vilakkithala">Nair - Vilakkithala</option>' +
        '        <option value="Namasudra">Namasudra</option>' +
        '        <option value="Nambiar">Nambiar</option>' +
        '        <option value="Nambisan">Nambisan</option>' +
        '        <option value="Namdev">Namdev</option>' +
        '        <option value="Namosudra">Namosudra</option>' +
        '        <option value="Napit">Napit</option>' +
        '        <option value="Nayak">Nayak</option>' +
        '        <option value="Nayaka">Nayaka</option>' +
        '        <option value="Neeli">Neeli</option>' +
        '        <option value="Nepali">Nepali</option>' +
        '        <option value="Nhavi">Nhavi</option>' +
        '        <option value="OBC - Barber/Naayee">OBC - Barber/Naayee</option>' +
        '        <option value="Oswal">Oswal</option>' +
        '        <option value="Otari">Otari</option>' +
        '        <option value="Padmasali">Padmasali</option>' +
        '        <option value="Panchal">Panchal</option>' +
        '        <option value="Pandaram">Pandaram</option>' +
        '        <option value="Panicker">Panicker</option>' +
        '        <option value="Paravan">Paravan</option>' +
        '        <option value="Parit">Parit</option>' +
        '        <option value="Parkava Kulam">Parkava Kulam</option>' +
        '        <option value="Partraj">Partraj</option>' +
        '        <option value="Pasi">Pasi</option>' +
        '        <option value="Paswan">Paswan</option>' +
        '        <option value="Patel - All">Patel - All</option>' +
        '        <option value="Patel">Patel</option>' +
        '        <option value="Patel - Desai">Patel - Desai</option>' +
        '        <option value="Patel - Dodia">Patel - Dodia</option>' +
        '        <option value="Patel - Kadva">Patel - Kadva</option>' +
        '        <option value="Patel - Leva">Patel - Leva</option>' +
        '        <option value="Patnaick">Patnaick</option>' +
        '        <option value="Patra">Patra</option>' +
        '        <option value="Patwa">Patwa</option>' +
        '        <option value="Perika">Perika</option>' +
        '        <option value="Pillai">Pillai</option>' +
        '        <option value="Pisharody">Pisharody</option>' +
        '        <option value="Poduval">Poduval</option>' +
        '        <option value="Poosala">Poosala</option>' +
        '        <option value="Porwal">Porwal</option>' +
        '        <option value="Prajapati">Prajapati</option>' +
        '        <option value="Pulaya">Pulaya</option>' +
        '        <option value="Punjabi">Punjabi</option>' +
        '        <option value="Raigar">Raigar</option>' +
        '        <option value="Rajaka">Rajaka</option>' +
        '        <option value="Rajaka/Chakali/Dhobi">Rajaka/Chakali/Dhobi</option>' +
        '        <option value="Rajbhar">Rajbhar</option>' +
        '        <option value="Rajput - Garhwali">Rajput - Garhwali</option>' +
        '        <option value="Rajput - Kumaoni">Rajput - Kumaoni</option>' +
        '        <option value="Rajput - Lodhi">Rajput - Lodhi</option>' +
        '        <option value="Ramdasia">Ramdasia</option>' +
        '        <option value="Ramgharia">Ramgharia</option>' +
        '        <option value="Rauniyar">Rauniyar</option>' +
        '        <option value="Ravidasia">Ravidasia</option>' +
        '        <option value="Rawat">Rawat</option>' +
        '        <option value="Reddiar">Reddiar</option>' +
        '        <option value="Reddy">Reddy</option>' +
        '        <option value="Relli">Relli</option>' +
        '        <option value="SSK">SSK</option>' +
        '        <option value="Sadgop">Sadgop</option>' +
        '        <option value="Sagara - Uppara">Sagara - Uppara</option>' +
        '        <option value="Saha">Saha</option>' +
        '        <option value="Sahu">Sahu</option>' +
        '        <option value="Saini">Saini</option>' +
        '        <option value="Saiva Vellala">Saiva Vellala</option>' +
        '        <option value="Saliya">Saliya</option>' +
        '        <option value="Sambava">Sambava</option>' +
        '        <option value="Satnami">Satnami</option>' +
        '        <option value="Savji">Savji</option>' +
        '        <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>' +
        '        <option value="Senai Thalaivar">Senai Thalaivar</option>' +
        '        <option value="Sepahia">Sepahia</option>' +
        '        <option value="Setti Balija">Setti Balija</option>' +
        '        <option value="Shah">Shah</option>' +
        '        <option value="Shilpkar">Shilpkar</option>' +
        '        <option value="Shimpi">Shimpi</option>' +
        '        <option value="Sindhi - All">Sindhi - All</option>' +
        '        <option value="Sindhi">Sindhi</option>' +
        '        <option value="Sindhi - Bhanusali">Sindhi - Bhanusali</option>' +
        '        <option value="Sindhi - Bhatia">Sindhi - Bhatia</option>' +
        '        <option value="Sindhi - Chhapru">Sindhi - Chhapru</option>' +
        '        <option value="Sindhi - Dadu">Sindhi - Dadu</option>' +
        '        <option value="Sindhi - Hyderabadi">Sindhi - Hyderabadi</option>' +
        '        <option value="Sindhi - Larai">Sindhi - Larai</option>' +
        '        <option value="Sindhi - Lohana">Sindhi - Lohana</option>' +
        '        <option value="Sindhi - Rohiri">Sindhi - Rohiri</option>' +
        '        <option value="Sindhi - Sehwani">Sindhi - Sehwani</option>' +
        '        <option value="Sindhi - Thatai">Sindhi - Thatai</option>' +
        '        <option value="Sindhi-Amil">Sindhi-Amil</option>' +
        '        <option value="Sindhi-Baibhand">Sindhi-Baibhand</option>' +
        '        <option value="Sindhi-Larkana">Sindhi-Larkana</option>' +
        '        <option value="Sindhi-Sahiti">Sindhi-Sahiti</option>' +
        '        <option value="Sindhi-Sakkhar">Sindhi-Sakkhar</option>' +
        '        <option value="Sindhi-Shikarpuri">Sindhi-Shikarpuri</option>' +
        '        <option value="Somvanshi">Somvanshi</option>' +
        '        <option value="Sonar">Sonar</option>' +
        '        <option value="Soni">Soni</option>' +
        '        <option value="Sourashtra">Sourashtra</option>' +
        '        <option value="Sowrashtra">Sowrashtra</option>' +
        '        <option value="Sozhiya Vellalar">Sozhiya Vellalar</option>' +
        '        <option value="Sri Vaishnava">Sri Vaishnava</option>' +
        '        <option value="Srisayana">Srisayana</option>' +
        '        <option value="Subarna Banik">Subarna Banik</option>' +
        '        <option value="Sugali (Naika)">Sugali (Naika)</option>' +
        '        <option value="Sundhi">Sundhi</option>' +
        '        <option value="Surya Balija">Surya Balija</option>' +
        '        <option value="Sutar">Sutar</option>' +
        '        <option value="Suthar">Suthar</option>' +
        '        <option value="Swakula Sali">Swakula Sali</option>' +
        '        <option value="Swarnakar">Swarnakar</option>' +
        '        <option value="Tamboli">Tamboli</option>' +
        '        <option value="Tamil Yadava">Tamil Yadava</option>' +
        '        <option value="Tanti">Tanti</option>' +
        '        <option value="Tantuway">Tantuway</option>' +
        '        <option value="Telaga">Telaga</option>' +
        '        <option value="Teli">Teli</option>' +
        '        <option value="Telugu">Telugu</option>' +
        '        <option value="Thachar">Thachar</option>' +
        '        <option value="Thakkar">Thakkar</option>' +
        '        <option value="Thakur">Thakur</option>' +
        '        <option value="Thandan">Thandan</option>' +
        '        <option value="Thigala">Thigala</option>' +
        '        <option value="Thiyya">Thiyya</option>' +
        '        <option value="Thuluva Vellala">Thuluva Vellala</option>' +
        '        <option value="Tili">Tili</option>' +
        '        <option value="Togata">Togata</option>' +
        '        <option value="Turupu Kapu">Turupu Kapu</option>' +
        '        <option value="Udayar">Udayar</option>' +
        '        <option value="Urali Gounder">Urali Gounder</option>' +
        '        <option value="Urs">Urs</option>' +
        '        <option value="Vada Balija">Vada Balija</option>' +
        '        <option value="Vadagalai">Vadagalai</option>' +
        '        <option value="Vaddera">Vaddera</option>' +
        '        <option value="Vaduka">Vaduka</option>' +
        '        <option value="Vaish - All">Vaish - All</option>' +
        '        <option value="Vaish">Vaish</option>' +
        '        <option value="Vaishnav - All">Vaishnav - All</option>' +
        '        <option value="Vaishnav">Vaishnav</option>' +
        '        <option value="Vaishnav - Bhatia">Vaishnav - Bhatia</option>' +
        '        <option value="Vaishnav - Vania">Vaishnav - Vania</option>' +
        '        <option value="Vaishya">Vaishya</option>' +
        '        <option value="Vallala">Vallala</option>' +
        '        <option value="Valluvan">Valluvan</option>' +
        '        <option value="Valmiki">Valmiki</option>' +
        '        <option value="Vanika Vyshya">Vanika Vyshya</option>' +
        '        <option value="Vaniya Chettiar">Vaniya Chettiar</option>' +
        '        <option value="Vanjara">Vanjara</option>' +
        '        <option value="Vankar">Vankar</option>' +
        '        <option value="Vannan">Vannan</option>' +
        '        <option value="Vannar">Vannar</option>' +
        '        <option value="Vanniyakullak Kshatriya">Vanniyakullak Kshatriya</option>' +
        '        <option value="Vanniyar">Vanniyar</option>' +
        '        <option value="Variar">Variar</option>' +
        '        <option value="Varshney">Varshney</option>' +
        '        <option value="Veera Saivam">Veera Saivam</option>' +
        '        <option value="Veerashaiva">Veerashaiva</option>' +
        '        <option value="Velaan">Velaan</option>' +
        '        <option value="Velama">Velama</option>' +
        '        <option value="Velar">Velar</option>' +
        '        <option value="Vellalar">Vellalar</option>' +
        '        <option value="Veluthedathu - Nair">Veluthedathu - Nair</option>' +
        '        <option value="Vettuva Gounder">Vettuva Gounder</option>' +
        '        <option value="Vishwakarma">Vishwakarma</option>' +
        '        <option value="Viswabrahmin">Viswabrahmin</option>' +
        '        <option value="Vokaliga">Vokaliga</option>' +
        '        <option value="Vokkaliga">Vokkaliga</option>' +
        '        <option value="Vysya">Vysya</option>' +
        '        <option value="Waada Balija">Waada Balija</option>' +
        '        <option value="Yellapu">Yellapu</option>';
    }
    else if (Religion == 'Muslim') {

        tr = '<optgroup id="frm-caste-optgroup-Frequently Used" label="Frequently Used"></optgroup>' +
        '        <option value="Ansari">Ansari</option>' +
        '        <option value="Arain">Arain</option>' +
        '        <option value="Dawoodi Bohra">Dawoodi Bohra</option>' +
        '        <option value="Lebbai">Lebbai</option>' +
        '        <option value="Memon">Memon</option>' +
        '        <option value="Mughal">Mughal</option>' +
        '        <option value="Pathan">Pathan</option>' +
        '        <option value="Qureshi">Qureshi</option>' +
        '        <option value="Rajput">Rajput</option>' +
        '        <option value="Rowther">Rowther</option>' +
        '        <option value="Shafi">Shafi</option>' +
        '        <option value="Sheikh">Sheikh</option>' +
        '        <option value="Shia - All">Shia - All</option>' +
        '        <option value="Shia">Shia</option>' +
        '        <option value="Siddiqui">Siddiqui</option>' +
        '        <option value="Sunni - All">Sunni - All</option>' +
        '        <option value="Sunni">Sunni</option>' +
        '        <option value="Sunni Ehle-Hadith">Sunni Ehle-Hadith</option>' +
        '        <option value="Sunni Hanafi">Sunni Hanafi</option>' +
        '        <option value="Sunni Shafi">Sunni Shafi</option>' +
        '        <option value="Syed">Syed</option>' +
        '        <optgroup id="frm-caste-optgroup-More" label="More"></optgroup>' +
        '        <option value="Awan">Awan</option>' +
        '        <option value="Bengali">Bengali</option>' +
        '        <option value="Dekkani">Dekkani</option>' +
        '        <option value="Dudekula">Dudekula</option>' +
        '        <option value="Jat">Jat</option>' +
        '        <option value="Khoja">Khoja</option>' +
        '        <option value="Mapila">Mapila</option>' +
        '        <option value="Maraicar">Maraicar</option>' +
        '        <option value="Shia Bohra">Shia Bohra</option>' +
        '        <option value="Shia Imami Ismaili">Shia Imami Ismaili</option>' +
        '        <option value="Shia Ithna ashariyyah">Shia Ithna ashariyyah</option>' +
        '        <option value="Shia Zaidi">Shia Zaidi</option>' +
        '        <option value="Sunni Hunbali">Sunni Hunbali</option>' +
        '        <option value="Sunni Maliki">Sunni Maliki</option>';
    }
    else if (Religion == 'Christian') {

        tr = '<optgroup id="frm-caste-optgroup-Frequently Used" label="Frequently Used"></optgroup>' +
        '        <option value="Anglo Indian">Anglo Indian</option>' +
        '        <option value="Born Again">Born Again</option>' +
        '        <option value="Catholic">Catholic</option>' +
        '        <option value="Church of North India (CNI)">Church of North India (CNI)</option>' +
        '        <option value="Church of South India (CSI)">Church of South India (CSI)</option>' +
        '        <option value="Convert">Convert</option>' +
        '        <option value="Evangelical">Evangelical</option>' +
        '        <option value="Indian Orthodox">Indian Orthodox</option>' +
        '        <option value="Jacobite">Jacobite</option>' +
        '        <option value="Latin Catholic">Latin Catholic</option>' +
        '        <option value="Marthoma">Marthoma</option>' +
        '        <option value="Methodist">Methodist</option>' +
        '        <option value="Nadar">Nadar</option>' +
        '        <option value="Orthodox">Orthodox</option>' +
        '        <option value="Pentecost">Pentecost</option>' +
        '        <option value="Protestant">Protestant</option>' +
        '        <option value="Roman Catholic">Roman Catholic</option>' +
        '        <option value="Scheduled Caste (SC)">Scheduled Caste (SC)</option>' +
        '        <option value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>' +
        '        <optgroup id="frm-caste-optgroup-More" label="More"></optgroup>' +
        '        <option value="Basel Mission">Basel Mission</option>' +
        '        <option value="Bretheren">Bretheren</option>' +
        '        <option value="CMS">CMS</option>' +
        '        <option value="Cannonite">Cannonite</option>' +
        '        <option value="Catholic Knanya">Catholic Knanya</option>' +
        '        <option value="Catholic Malankara">Catholic Malankara</option>' +
        '        <option value="Chaldean Syrian">Chaldean Syrian</option>' +
        '        <option value="Cheramar">Cheramar</option>' +
        '        <option value="Christian Nadar">Christian Nadar</option>' +
        '        <option value="IPC">IPC</option>' +
        '        <option value="Intercaste">Intercaste</option>' +
        '        <option value="Jacobite Knanya">Jacobite Knanya</option>' +
        '        <option value="Knanaya">Knanaya</option>' +
        '        <option value="Knanaya Catholic">Knanaya Catholic</option>' +
        '        <option value="Knanaya Jacobite">Knanaya Jacobite</option>' +
        '        <option value="Knanaya Pentecostal">Knanaya Pentecostal</option>' +
        '        <option value="Knanya">Knanya</option>' +
        '        <option value="Malankara">Malankara</option>' +
        '        <option value="Malankara Catholic">Malankara Catholic</option>' +
        '        <option value="Manglorean">Manglorean</option>' +
        '        <option value="Mormon">Mormon</option>' +
        '        <option value="Presbyterian">Presbyterian</option>' +
        '        <option value="RCSC">RCSC</option>' +
        '        <option value="Salvation Army">Salvation Army</option>' +
        '        <option value="Seventh day Adventist">Seventh day Adventist</option>' +
        '        <option value="Syrian">Syrian</option>' +
        '        <option value="Syrian Catholic">Syrian Catholic</option>' +
        '        <option value="Syrian Orthodox">Syrian Orthodox</option>' +
        '        <option value="Syro Malabar">Syro Malabar</option>';
    }
    else if (Religion == 'Sikh') {

        tr = '<option value="Ahluwalia">Ahluwalia</option>' +
        '        <option value="Arora">Arora</option>' +
        '        <option value="Clean Shaven">Clean Shaven</option>' +
        '        <option value="Gursikh">Gursikh</option>' +
        '        <option value="Jat">Jat</option>' +
        '        <option value="Kamboj">Kamboj</option>' +
        '        <option value="Kesadhari">Kesadhari</option>' +
        '        <option value="Khatri">Khatri</option>' +
        '        <option value="Kshatriya">Kshatriya</option>' +
        '        <option value="Labana">Labana</option>' +
        '        <option value="Mazhbi/Majabi">Mazhbi/Majabi</option>' +
        '        <option value="Rajput">Rajput</option>' +
        '        <option value="Ramdasia">Ramdasia</option>' +
        '        <option value="Ramgharia">Ramgharia</option>' +
        '        <option value="Ravidasia">Ravidasia</option>' +
        '        <option value="Saini">Saini</option>';
    }
    else if (Religion == 'Parsi') {

        tr = '<option value="Parsi">Parsi</option>';
    }
    else if (Religion == 'Jain') {

        tr = '<option value="Digambar">Digambar</option>' +
        '        <option value="Porwal">Porwal</option>' +
        '        <option value="Shwetamber">Shwetamber</option>' +
        '        <option value="Vania">Vania</option>';
    }
    else if (Religion == 'Buddhist') {

        tr = '<option value="Buddhist">Buddhist</option>';
    }
    else if (Religion == 'Jewish') {

        tr = '<option value="Jewish">Jewish</option>';
    }
    else if (Religion == 'No Religion') {

        tr = '<option value="No Religion">No Religion</option>';
    }
    else if (Religion == 'Spiritual') {

        tr = '<option value="Spiritual">Spiritual</option>';
    }
    else if (Religion == 'Other') {

        tr = '<option value="Other">Other</option>';
    }

    $("#Caste").append(tr)
}

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