<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="FrederickReservation.aspx.cs" Inherits="Frederick.Admin.FrederickReservation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"> 
    <link href="bootstrap/clockpicker/bootstrap-clockpicker.css" rel="stylesheet" />
    <script src="bootstrap/clockpicker/bootstrap-clockpicker.js"></script>
    <link href="bootstrap/clockpicker/bootstrap-clockpicker.min.css" rel="stylesheet" />
    <script src="bootstrap/clockpicker/bootstrap-clockpicker.min.js"></script>
    <link href="bootstrap/clockpicker/jquery-clockpicker.css" rel="stylesheet" />
    <script src="bootstrap/clockpicker/jquery-clockpicker.js"></script>
    <link href="bootstrap/clockpicker/jquery-clockpicker.min.css" rel="stylesheet" />
    <script src="bootstrap/clockpicker/jquery-clockpicker.min.js"></script>
    <link href="timepicker/bootstrap-timepicker.min.css" rel="stylesheet" />
     <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAuX_jrF2mEltKATOVUuouVHdU2688XBfU"></script> 
    <script src="assets/js/jquery-1.8.3.min.js"></script> 
    <script src="Scripts/Reservation.js"></script>
   <script src="Scripts/AutoCompleteRoute.js"></script> 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Frederick Reservation</h3>
                            <button  type="button" class="btn btn-primary  btn-xs pull-right"  tooltip="Add New Customer" data-toggle="modal" data-target="#addcustomer"><i class=" fa fa-edit">Add New Customer</i></button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-3 mb">
                            <label>Service :</label>
                            <select class="form-control" id="Select_Service">
                                 <option value="From Airport">From Airport</option>
                                 <option value="To Airport">To Airport</option>
                            </select>
                        </div>
                        <div class="col-md-1 mb">
                            <label>Adult:</label>
                            <input type="number" id="Adults" class="form-control" min="1" onchange="changePassengers()"/>
                        </div>
                        <div class="col-md-1 mb">
                            <label>Child:</label>
                            <input type="number" id="Childs" class="form-control" min="0"  onchange="changePassengers()"/>
                        </div>
                        <div class="col-md-1 mb">
                            <label>Passengers</label>
                            <input type="number" id="Passengers" class="form-control" min="0"  />
                        </div>
                        
                        
                         <div class="col-md-3 mb">
                            <label for="email">Airport Name :</label>
                           <select id="SelAirport" class="form-control" onchange="checkforVehicles()"></select>
                        </div>
                         <div class="col-md-3 mb">
                            <label>Location:</label>
                          <select class="form-control" id="Select_Location" onchange="checkforVehicles()">
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="Select_Vehicle">Vehicle Type :</label>
                            <select class="form-control" id="Select_Vehicle" onchange="VehicleChange()">
                            </select>
                        </div>
                         
                        
                        <div class="col-md-3 mb">
                            <label for="email">Email:</label>

                            <input id="txt_Email" class="form-control" list="Select_Email" autocomplete="off"/>
                                    <datalist id="Select_Email"></datalist>      
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Contact Number:</label>
                           <input id="txt_ContactNumber" class="form-control"  list="Select_ContactNumber"/>
                                    <datalist id="Select_ContactNumber"></datalist>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">First Name :</label>
                            <input id="txt_FirstName" class="form-control" placeholder="First Name"/>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Last Name :</label>
                            <input id="txt_LastName" class="form-control" placeholder="Last Name" />
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Reservation Date :</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" data-toggle="datepicker" id="txt_Date" data-select="datepicker" autocomplete="off" placeholder="Reservation Date" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        
                        <div class="col-md-3 mb">
                            <label id="lblTime">Time (24 hrs):</label>
                            <div class="input-group clockpicker" data-placement="bottom" data-align="top" data-autoclose="true">
                                <input type="text" class="form-control" id="Time" value="10:00" onblur="LateNightChange()">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                            </div>
                        </div>
                      
                       <%-- <div class="col-md-3 mb">
                            <label>Adults :</label>
                            <input type="number" id="Adults" class="form-control" min="1" />
                        </div>
                        <div class="col-md-3 mb">
                            <label>Childs :</label>
                            <input type="number" id="Childs" class="form-control" min="0" />
                        </div>--%>
                        <div class="col-md-3 mb">
                            <label for="email">Airlines / Flight :</label>
                           <input id="Select_Airlines" class="form-control" list="Select_Airline" name="Select_Airline">
                                    <datalist id="Select_Airline">
                                        <option value="Abacus International">Abacus International</option>
                                        <option value="ABX Air">ABX Air</option>
                                        <option value="AccesRail and Partner Railways">AccesRail and Partner Railways</option>
                                        <option value="ACT Airlines">ACT Airlines</option>
                                        <option value="Adria Airways">Adria Airways</option>
                                        <option value="Aegean Airlines">Aegean Airlines</option>
                                        <option value="Aer Arann">Aer Arann</option>
                                        <option value="Aer Lingus">Aer Lingus</option>
                                        <option value="Aero-Charter Airlines">Aero-Charter Airlines</option>
                                        <option value="Aerocon">Aerocon</option>
                                        <option value="Aerodynamics">Aerodynamics</option>
                                        <option value="Aeroflot Russian Airlines">Aeroflot Russian Airlines</option>
                                        <option value="AeroGal">AeroGal</option>
                                        <option value="AerolÃ&shy;neas Argentinas">AerolÃ&shy;neas Argentinas</option>
                                        <option value="AerolÃ&shy;neas MAS">AerolÃ&shy;neas MAS</option>
                                        <option value="Aerolinea Principal Chile">Aerolinea Principal Chile</option>
                                        <option value="Aerolineas Sosa">Aerolineas Sosa</option>
                                        <option value="AeromÃ©xico Connect">AeromÃ©xico Connect</option>
                                        <option value="Aeromar Airlines">Aeromar Airlines</option>
                                        <option value="Aeromexico">Aeromexico</option>
                                        <option value="Aeropelican Air Services">Aeropelican Air Services</option>
                                        <option value="Aerosvit Airlines">Aerosvit Airlines</option>
                                        <option value="Aerotel">Aerotel</option>
                                        <option value="Afghan Jet International Airlines">Afghan Jet International Airlines</option>
                                        <option value="Africa West">Africa West</option>
                                        <option value="African Express Airways">African Express Airways</option>
                                        <option value="Afriqiyah Airways">Afriqiyah Airways</option>
                                        <option value="Aigle Azur">Aigle Azur</option>
                                        <option value="Air AlgÃ©rie">Air AlgÃ©rie</option>
                                        <option value="Air Alliance">Air Alliance</option>
                                        <option value="Air Alps">Air Alps</option>
                                        <option value="Air Alsie">Air Alsie</option>
                                        <option value="Air Arabia">Air Arabia</option>
                                        <option value="Air Arabia Egypt">Air Arabia Egypt</option>
                                        <option value="Air Arabia Maroc">Air Arabia Maroc</option>
                                        <option value="Air Armenia">Air Armenia</option>
                                        <option value="Air Asia Zest">Air Asia Zest</option>
                                        <option value="Air Astana">Air Astana</option>
                                        <option value="Air Austral">Air Austral</option>
                                        <option value="Air Bagan">Air Bagan</option>
                                        <option value="Air Bashkortostan">Air Bashkortostan</option>
                                        <option value="Air Bishkek">Air Bishkek</option>
                                        <option value="Air Botswana">Air Botswana</option>
                                        <option value="Air Burkina">Air Burkina</option>
                                        <option value="Air Busan">Air Busan</option>
                                        <option value="Air Cairo">Air Cairo</option>
                                        <option value="Air Caledonie">Air Caledonie</option>
                                        <option value="Air Canada">Air Canada</option>
                                        <option value="Air Canada Rouge">Air Canada Rouge</option>
                                        <option value="Air Caraibes">Air Caraibes</option>
                                        <option value="Air China">Air China</option>
                                        <option value="Air Choice One">Air Choice One</option>
                                        <option value="Air Class LÃ&shy;neas AÃ©reas">Air Class LÃ&shy;neas AÃ©reas</option>
                                        <option value="Air Corsica">Air Corsica</option>
                                        <option value="Air Cote D'Ivoire">Air Cote D'Ivoire</option>
                                        <option value="Air Creebec">Air Creebec</option>
                                        <option value="Air Do">Air Do</option>
                                        <option value="Air Dolomiti">Air Dolomiti</option>
                                        <option value="Air Europa">Air Europa</option>
                                        <option value="Air Excursions">Air Excursions</option>
                                        <option value="Air France">Air France</option>
                                        <option value="Air Hong Kong - AHK">Air Hong Kong - AHK</option>
                                        <option value="Air Iceland">Air Iceland</option>
                                        <option value="Air Incheon">Air Incheon</option>
                                        <option value="Air India Charters Limited">Air India Charters Limited</option>
                                        <option value="Air India Limited">Air India Limited</option>
                                        <option value="Air Indus">Air Indus</option>
                                        <option value="Air Inuit">Air Inuit</option>
                                        <option value="Air Italy">Air Italy</option>
                                        <option value="Air Japan">Air Japan</option>
                                        <option value="Air KBZ">Air KBZ</option>
                                        <option value="Air Koryo">Air Koryo</option>
                                        <option value="Air Labrador">Air Labrador</option>
                                        <option value="Air Lituanica">Air Lituanica</option>
                                        <option value="Air Macau">Air Macau</option>
                                        <option value="Air Madagascar">Air Madagascar</option>
                                        <option value="Air Malawi">Air Malawi</option>
                                        <option value="Air Malta">Air Malta</option>
                                        <option value="Air Manas">Air Manas</option>
                                        <option value="Air Mauritius">Air Mauritius</option>
                                        <option value="Air Mediterranee">Air Mediterranee</option>
                                        <option value="Air Mobility Command (AMC)">Air Mobility Command (AMC)</option>
                                        <option value="Air Moldova">Air Moldova</option>
                                        <option value="Air Namibia">Air Namibia</option>
                                        <option value="Air New Zealand">Air New Zealand</option>
                                        <option value="Air Niamey">Air Niamey</option>
                                        <option value="Air Niugini">Air Niugini</option>
                                        <option value="Air North">Air North</option>
                                        <option value="Air Nostrum">Air Nostrum</option>
                                        <option value="Air One">Air One</option>
                                        <option value="Air Onix">Air Onix</option>
                                        <option value="Air Rarotonga">Air Rarotonga</option>
                                        <option value="Air Saint  Pierre">Air Saint  Pierre</option>
                                        <option value="Air Seychelles">Air Seychelles</option>
                                        <option value="Air Sinai">Air Sinai</option>
                                        <option value="Air Sunshine">Air Sunshine</option>
                                        <option value="Air Tahiti">Air Tahiti</option>
                                        <option value="Air Tahiti Nui">Air Tahiti Nui</option>
                                        <option value="Air Tanzania">Air Tanzania</option>
                                        <option value="Air Timor">Air Timor</option>
                                        <option value="Air Tindi">Air Tindi</option>
                                        <option value="Air Transat">Air Transat</option>
                                        <option value="Air Turks and Caicos (2003) Ltd">Air Turks and Caicos (2003) Ltd</option>
                                        <option value="Air Uganda">Air Uganda</option>
                                        <option value="Air Urga">Air Urga</option>
                                        <option value="Air Vanuatu">Air Vanuatu</option>
                                        <option value="Air Via">Air Via</option>
                                        <option value="Air Wisconsim">Air Wisconsim</option>
                                        <option value="Air Zimbabwe">Air Zimbabwe</option>
                                        <option value="AirAsia">AirAsia</option>
                                        <option value="AirAsia Japan">AirAsia Japan</option>
                                        <option value="AirAsia Philippines">AirAsia Philippines</option>
                                        <option value="AirAsia X">AirAsia X</option>
                                        <option value="AirBaltic">AirBaltic</option>
                                        <option value="airberlin">airberlin</option>
                                        <option value="AirBlue">AirBlue</option>
                                        <option value="Aircalin">Aircalin</option>
                                        <option value="Aircompany Kyrgyzstan">Aircompany Kyrgyzstan</option>
                                        <option value="Aires">Aires</option>
                                        <option value="AirExplore">AirExplore</option>
                                        <option value="Airlines of Papua New Guinea">Airlines of Papua New Guinea</option>
                                        <option value="Airnorth Regional">Airnorth Regional</option>
                                        <option value="Airshop">Airshop</option>
                                        <option value="AirTran Airways">AirTran Airways</option>
                                        <option value="AIS Airlines">AIS Airlines</option>
                                        <option value="AK Bars Aero">AK Bars Aero</option>
                                        <option value="Aklak Air">Aklak Air</option>
                                        <option value="Alaska Airlines">Alaska Airlines</option>
                                        <option value="Alaska Seaplane Service">Alaska Seaplane Service</option>
                                        <option value="Alianza Glancelot">Alianza Glancelot</option>
                                        <option value="Alidaunia">Alidaunia</option>
                                        <option value="Alitalia">Alitalia</option>
                                        <option value="Alitalia CityLiner">Alitalia CityLiner</option>
                                        <option value="All Nippon Airways">All Nippon Airways</option>
                                        <option value="Allegiant Air">Allegiant Air</option>
                                        <option value="Almasria Universal Airlines">Almasria Universal Airlines</option>
                                        <option value="Alpine Air">Alpine Air</option>
                                        <option value="Alpine Aviation">Alpine Aviation</option>
                                        <option value="Alrosa Mirny Air Enterprise">Alrosa Mirny Air Enterprise</option>
                                        <option value="ALS Ltd.">ALS Ltd.</option>
                                        <option value="Alsa Grupo">Alsa Grupo</option>
                                        <option value="Amadeus IT Group">Amadeus IT Group</option>
                                        <option value="Amaszonas">Amaszonas</option>
                                        <option value="AMC airlines">AMC airlines</option>
                                        <option value="American Airlines">American Airlines</option>
                                        <option value="American Eagle">American Eagle</option>
                                        <option value="Ameriflight">Ameriflight</option>
                                        <option value="Amerijet International">Amerijet International</option>
                                        <option value="Amtrak">Amtrak</option>
                                        <option value="ANA Wings">ANA Wings</option>
                                        <option value="Angara Airlines">Angara Airlines</option>
                                        <option value="Anguilla Air Services">Anguilla Air Services</option>
                                        <option value="Antrak Air Ghana">Antrak Air Ghana</option>
                                        <option value="Ariana Afghan Airlines">Ariana Afghan Airlines</option>
                                        <option value="Arik Air">Arik Air</option>
                                        <option value="ARINC">ARINC</option>
                                        <option value="ARINC">ARINC</option>
                                        <option value="Arkefly">Arkefly</option>
                                        <option value="Arkia - Israeli Airlines">Arkia - Israeli Airlines</option>
                                        <option value="Armavia">Armavia</option>
                                        <option value="Asia Atlantic Airlines">Asia Atlantic Airlines</option>
                                        <option value="Asian Express Airline">Asian Express Airline</option>
                                        <option value="Asian Wings Airways">Asian Wings Airways</option>
                                        <option value="Asiana Airlines">Asiana Airlines</option>
                                        <option value="ASKY Airlines">ASKY Airlines</option>
                                        <option value="Astra Airlines">Astra Airlines</option>
                                        <option value="Atlantic Airlines">Atlantic Airlines</option>
                                        <option value="Atlantic Airways">Atlantic Airways</option>
                                        <option value="Atlantis European Airways">Atlantis European Airways</option>
                                        <option value="Atlas Air">Atlas Air</option>
                                        <option value="Atlasjet Airlines">Atlasjet Airlines</option>
                                        <option value="Atran">Atran</option>
                                        <option value="Augsburg Airways">Augsburg Airways</option>
                                        <option value="Aurigny Air Services">Aurigny Air Services</option>
                                        <option value="Austral Lineas Aereas">Austral Lineas Aereas</option>
                                        <option value="Austrian">Austrian</option>
                                        <option value="Avia Traffic Company">Avia Traffic Company</option>
                                        <option value="Avianca">Avianca</option>
                                        <option value="Aviateca">Aviateca</option>
                                        <option value="Aviation Technologies Inc.">Aviation Technologies Inc.</option>
                                        <option value="Aviatrans K">Aviatrans K</option>
                                        <option value="Avies">Avies</option>
                                        <option value="Avion  Express">Avion  Express</option>
                                        <option value="Avior Airlines">Avior Airlines</option>
                                        <option value="Axess International Network">Axess International Network</option>
                                        <option value="Azerbaijan Airlines">Azerbaijan Airlines</option>
                                        <option value="Aztec Airways">Aztec Airways</option>
                                        <option value="Azul Linhas Aereas Brasileiras">Azul Linhas Aereas Brasileiras</option>
                                        <option value="B &amp; H Airlines">B &amp; H Airlines</option>
                                        <option value="BA Cityflyer">BA Cityflyer</option>
                                        <option value="Bahamasair">Bahamasair</option>
                                        <option value="Bangkok Airways">Bangkok Airways</option>
                                        <option value="Baseops International">Baseops International</option>
                                        <option value="Batik Air">Batik Air</option>
                                        <option value="BB Airways">BB Airways</option>
                                        <option value="Bearskin Airlines">Bearskin Airlines</option>
                                        <option value="Beijing Capital Airlines">Beijing Capital Airlines</option>
                                        <option value="Bek Air">Bek Air</option>
                                        <option value="Belair Airlines">Belair Airlines</option>
                                        <option value="Belavia">Belavia</option>
                                        <option value="Belle Air">Belle Air</option>
                                        <option value="Bemidji Aviation Services">Bemidji Aviation Services</option>
                                        <option value="Berjaya Air">Berjaya Air</option>
                                        <option value="BH Air">BH Air</option>
                                        <option value="Biman Bangladesh Airlines">Biman Bangladesh Airlines</option>
                                        <option value="Binter Canarias">Binter Canarias</option>
                                        <option value="Bird Information Systems">Bird Information Systems</option>
                                        <option value="Blue Bird Airways">Blue Bird Airways</option>
                                        <option value="Blue Panorama Airlines">Blue Panorama Airlines</option>
                                        <option value="Blue1">Blue1</option>
                                        <option value="bmi - British Midland">bmi - British Midland</option>
                                        <option value="bmi Regional">bmi Regional</option>
                                        <option value="Boliviana de Aviacion">Boliviana de Aviacion</option>
                                        <option value="BQB Lineas Aereas">BQB Lineas Aereas</option>
                                        <option value="Braathens Regional">Braathens Regional</option>
                                        <option value="Brindabella Airlines">Brindabella Airlines</option>
                                        <option value="British Airways">British Airways</option>
                                        <option value="Brussels Airlines">Brussels Airlines</option>
                                        <option value="Bukovyna Airlines">Bukovyna Airlines</option>
                                        <option value="Bulgaria Air">Bulgaria Air</option>
                                        <option value="Buraq Air Transport">Buraq Air Transport</option>
                                        <option value="Business Air">Business Air</option>
                                        <option value="BVI Airways">BVI Airways</option>
                                        <option value="C.A.I. Second">C.A.I. Second</option>
                                        <option value="Caicos Express">Caicos Express</option>
                                        <option value="Cairo Aviation">Cairo Aviation</option>
                                        <option value="Calima Aviacion">Calima Aviacion</option>
                                        <option value="Camair-Co">Camair-Co</option>
                                        <option value="Cambodia Airlines">Cambodia Airlines</option>
                                        <option value="Cambodia Angkor Air">Cambodia Angkor Air</option>
                                        <option value="Canadian North">Canadian North</option>
                                        <option value="Cape Air">Cape Air</option>
                                        <option value="Caribbean Airlines">Caribbean Airlines</option>
                                        <option value="Carpatair">Carpatair</option>
                                        <option value="Cathay Pacific Airways">Cathay Pacific Airways</option>
                                        <option value="Cayman Airways">Cayman Airways</option>
                                        <option value="CEBU Pacific Air">CEBU Pacific Air</option>
                                        <option value="CEIBA Intercontinental">CEIBA Intercontinental</option>
                                        <option value="Central Connect Airlines">Central Connect Airlines</option>
                                        <option value="Central Mountain Air">Central Mountain Air</option>
                                        <option value="Chalair Aviation">Chalair Aviation</option>
                                        <option value="Chautauqua Airlines">Chautauqua Airlines</option>
                                        <option value="Chengdu Airlines">Chengdu Airlines</option>
                                        <option value="China Airlines">China Airlines</option>
                                        <option value="China Eastern Airlines">China Eastern Airlines</option>
                                        <option value="China Express Airlines">China Express Airlines</option>
                                        <option value="China Southern Airlines">China Southern Airlines</option>
                                        <option value="China United Airlines">China United Airlines</option>
                                        <option value="China West Air">China West Air</option>
                                        <option value="Chinggis Airways">Chinggis Airways</option>
                                        <option value="Chongqing Airlines">Chongqing Airlines</option>
                                        <option value="Cimber">Cimber</option>
                                        <option value="Cinnamon Air">Cinnamon Air</option>
                                        <option value="Citilink">Citilink</option>
                                        <option value="City Airline">City Airline</option>
                                        <option value="City Airways">City Airways</option>
                                        <option value="Cityjet">Cityjet</option>
                                        <option value="Cityjet">Cityjet</option>
                                        <option value="Click Airways">Click Airways</option>
                                        <option value="Comair">Comair</option>
                                        <option value="Commercial Aviation Services">Commercial Aviation Services</option>
                                        <option value="Commutair">Commutair</option>
                                        <option value="Compagnie Africaine d'Aviation">Compagnie Africaine d'Aviation</option>
                                        <option value="Compass Airlines">Compass Airlines</option>
                                        <option value="Condor">Condor</option>
                                        <option value="Condor Berlin">Condor Berlin</option>
                                        <option value="Continental Micronesia">Continental Micronesia</option>
                                        <option value="Copa Airlines">Copa Airlines</option>
                                        <option value="Copa Airlines Colombia">Copa Airlines Colombia</option>
                                        <option value="Corendon Airlines">Corendon Airlines</option>
                                        <option value="Corendon Duch Airlines">Corendon Duch Airlines</option>
                                        <option value="CorsAir - Corsair International">CorsAir - Corsair International</option>
                                        <option value="Croatia Airlines">Croatia Airlines</option>
                                        <option value="Cronos Airlines">Cronos Airlines</option>
                                        <option value="Cubana">Cubana</option>
                                        <option value="Cyprus Airways">Cyprus Airways</option>
                                        <option value="Czech Airlines">Czech Airlines</option>
                                        <option value="Daallo Airlines">Daallo Airlines</option>
                                        <option value="Dana Airlines">Dana Airlines</option>
                                        <option value="Danish Air Transport">Danish Air Transport</option>
                                        <option value="Darwin Airline">Darwin Airline</option>
                                        <option value="D-Connection">D-Connection</option>
                                        <option value="Delta Airlines">Delta Airlines</option>
                                        <option value="Denim Air">Denim Air</option>
                                        <option value="Deutsche Bahn">Deutsche Bahn</option>
                                        <option value="Direktflyg">Direktflyg</option>
                                        <option value="Dniproavia">Dniproavia</option>
                                        <option value="Donavia">Donavia</option>
                                        <option value="DOT LT">DOT LT</option>
                                        <option value="Douniah Airlines">Douniah Airlines</option>
                                        <option value="Dragonair">Dragonair</option>
                                        <option value="Driessen Services">Driessen Services</option>
                                        <option value="Druk Air">Druk Air</option>
                                        <option value="Dutch Antilles Express">Dutch Antilles Express</option>
                                        <option value="Eagle Air">Eagle Air</option>
                                        <option value="eagleXPRESS Air">eagleXPRESS Air</option>
                                        <option value="East African Safari Air Express">East African Safari Air Express</option>
                                        <option value="East Air">East Air</option>
                                        <option value="East Horizon Airlines">East Horizon Airlines</option>
                                        <option value="Eastar Jet">Eastar Jet</option>
                                        <option value="Eastern Airways">Eastern Airways</option>
                                        <option value="easyJet">easyJet</option>
                                        <option value="easyJet Switzerland">easyJet Switzerland</option>
                                        <option value="Edelweiss Air">Edelweiss Air</option>
                                        <option value="Egyptair">Egyptair</option>
                                        <option value="El Al Israel Airlines">El Al Israel Airlines</option>
                                        <option value="Electronic Data Systems Corporation">Electronic Data Systems Corporation</option>
                                        <option value="Emirates">Emirates</option>
                                        <option value="Empire Airlines">Empire Airlines</option>
                                        <option value="Endeavor Air">Endeavor Air</option>
                                        <option value="Equaflight Service">Equaflight Service</option>
                                        <option value="Equatorial Congo Airlines - ECAIR">Equatorial Congo Airlines - ECAIR</option>
                                        <option value="Era Aviation">Era Aviation</option>
                                        <option value="Eritrean Airlines">Eritrean Airlines</option>
                                        <option value="E-Savtravel">E-Savtravel</option>
                                        <option value="Estonian Air">Estonian Air</option>
                                        <option value="Ethiopian airlines">Ethiopian airlines</option>
                                        <option value="Etihad Airways">Etihad Airways</option>
                                        <option value="Euro-Asia Air">Euro-Asia Air</option>
                                        <option value="Euro-Asia Air International">Euro-Asia Air International</option>
                                        <option value="EuroAtlantic Airways">EuroAtlantic Airways</option>
                                        <option value="EuroLot">EuroLot</option>
                                        <option value="Europe Airpost">Europe Airpost</option>
                                        <option value="Eurostar">Eurostar</option>
                                        <option value="Eurowings">Eurowings</option>
                                        <option value="EVA air">EVA air</option>
                                        <option value="Everts Air">Everts Air</option>
                                        <option value="ExecAir">ExecAir</option>
                                        <option value="Execaire">Execaire</option>
                                        <option value="Executive Airlines">Executive Airlines</option>
                                        <option value="ExpressJet">ExpressJet</option>
                                        <option value="Eznis Airways">Eznis Airways</option>
                                        <option value="Far Eastern Air Transport">Far Eastern Air Transport</option>
                                        <option value="Farelogix">Farelogix</option>
                                        <option value="Farnair Switzerland">Farnair Switzerland</option>
                                        <option value="Fastjet">Fastjet</option>
                                        <option value="FedEx">FedEx</option>
                                        <option value="Felix Airways">Felix Airways</option>
                                        <option value="Fiji Airways">Fiji Airways</option>
                                        <option value="Finnair">Finnair</option>
                                        <option value="First Air">First Air</option>
                                        <option value="FITS Aviation">FITS Aviation</option>
                                        <option value="Five Fourty Aviation">Five Fourty Aviation</option>
                                        <option value="Flair Airlines">Flair Airlines</option>
                                        <option value="Flamenco Airways">Flamenco Airways</option>
                                        <option value="FlexFlight">FlexFlight</option>
                                        <option value="Florida West International Airways">Florida West International Airways</option>
                                        <option value="Fly Jamaica Airways">Fly Jamaica Airways</option>
                                        <option value="Fly540 Angola">Fly540 Angola</option>
                                        <option value="Flybe">Flybe</option>
                                        <option value="FlyFirefly">FlyFirefly</option>
                                        <option value="FlyGeorgia">FlyGeorgia</option>
                                        <option value="Freebird Airlines">Freebird Airlines</option>
                                        <option value="Freedom Air">Freedom Air</option>
                                        <option value="Frontier Airlines">Frontier Airlines</option>
                                        <option value="Fuji Dream Airlines">Fuji Dream Airlines</option>
                                        <option value="Galileo">Galileo</option>
                                        <option value="Garuda">Garuda</option>
                                        <option value="Gazpromavia">Gazpromavia</option>
                                        <option value="Georgian Airways">Georgian Airways</option>
                                        <option value="Germania">Germania</option>
                                        <option value="Germania Express">Germania Express</option>
                                        <option value="Germanwings">Germanwings</option>
                                        <option value="Ghadames Air Transport">Ghadames Air Transport</option>
                                        <option value="Globus">Globus</option>
                                        <option value="GoAir">GoAir</option>
                                        <option value="Gol Linhas AÃ©reas Inteligentes">Gol Linhas AÃ©reas Inteligentes</option>
                                        <option value="Golden Myanmar Airlines">Golden Myanmar Airlines</option>
                                        <option value="Grand China Air">Grand China Air</option>
                                        <option value="Groznyy-Avia">Groznyy-Avia</option>
                                        <option value="Gulf Air">Gulf Air</option>
                                        <option value="Hageland Aviation Services">Hageland Aviation Services</option>
                                        <option value="Hahn Air">Hahn Air</option>
                                        <option value="Hahn Air Systems">Hahn Air Systems</option>
                                        <option value="Hainan Airlines">Hainan Airlines</option>
                                        <option value="Haiti Aviation">Haiti Aviation</option>
                                        <option value="Hamburg Airways">Hamburg Airways</option>
                                        <option value="Hawaiian Airlines">Hawaiian Airlines</option>
                                        <option value="Hawkair Aviation Services">Hawkair Aviation Services</option>
                                        <option value="Hebei Airlines">Hebei Airlines</option>
                                        <option value="Heli Air Monaco">Heli Air Monaco</option>
                                        <option value="Heli Securite">Heli Securite</option>
                                        <option value="Helijet International">Helijet International</option>
                                        <option value="Henan Airlines">Henan Airlines</option>
                                        <option value="Hermes Airlines">Hermes Airlines</option>
                                        <option value="Hesa Airlines">Hesa Airlines</option>
                                        <option value="Hewlett-Packard (Schweiz)">Hewlett-Packard (Schweiz)</option>
                                        <option value="Hex'Air">Hex'Air</option>
                                        <option value="Holidays Czech Airlines">Holidays Czech Airlines</option>
                                        <option value="Hong Kong Airlines">Hong Kong Airlines</option>
                                        <option value="Hong Kong Express">Hong Kong Express</option>
                                        <option value="HOP!">HOP!</option>
                                        <option value="HOP! - Airlinair">HOP! - Airlinair</option>
                                        <option value="HOP!-RÃ©gional">HOP!-RÃ©gional</option>
                                        <option value="Horizon Air">Horizon Air</option>
                                        <option value="Hotels/Motels">Hotels/Motels</option>
                                        <option value="Hunnu Air">Hunnu Air</option>
                                        <option value="Hydro - Quebec">Hydro - Quebec</option>
                                        <option value="IBC Airways">IBC Airways</option>
                                        <option value="Iberia">Iberia</option>
                                        <option value="Iberia Express">Iberia Express</option>
                                        <option value="IBEX Airlines">IBEX Airlines</option>
                                        <option value="IBS Software Services Americas">IBS Software Services Americas</option>
                                        <option value="Icelandair">Icelandair</option>
                                        <option value="Indigo">Indigo</option>
                                        <option value="Indonesia AirAsia">Indonesia AirAsia</option>
                                        <option value="INFINI">INFINI</option>
                                        <option value="Insel Air Aruba">Insel Air Aruba</option>
                                        <option value="Insel Air International">Insel Air International</option>
                                        <option value="Instone Air">Instone Air</option>
                                        <option value="Interair South Africa">Interair South Africa</option>
                                        <option value="Interjet">Interjet</option>
                                        <option value="InterSky">InterSky</option>
                                        <option value="InvestAvia">InvestAvia</option>
                                        <option value="IrAero">IrAero</option>
                                        <option value="Iran Air">Iran Air</option>
                                        <option value="Iran Aseman Airlines">Iran Aseman Airlines</option>
                                        <option value="Irtysh-Air">Irtysh-Air</option>
                                        <option value="Island Air">Island Air</option>
                                        <option value="Island Aviation Services">Island Aviation Services</option>
                                        <option value="Islena Airlines">Islena Airlines</option>
                                        <option value="Israir Airlines">Israir Airlines</option>
                                        <option value="ITA Software">ITA Software</option>
                                        <option value="Izhavia">Izhavia</option>
                                        <option value="Izmir Airlines">Izmir Airlines</option>
                                        <option value="JAL Express">JAL Express</option>
                                        <option value="Japan Airlines">Japan Airlines</option>
                                        <option value="Japan Transocean Air">Japan Transocean Air</option>
                                        <option value="Jat  Airways">Jat  Airways</option>
                                        <option value="Jazeera Airways">Jazeera Airways</option>
                                        <option value="Jazz Air">Jazz Air</option>
                                        <option value="JET AIRWAY(IND)">JET AIRWAY(IND)</option>
                                        <option value="Jet Airways">Jet Airways</option>
                                        <option value="Jet Airways (India)">Jet Airways (India)</option>
                                        <option value="Jet Asia">Jet Asia</option>
                                        <option value="Jet Aviation Business Jets">Jet Aviation Business Jets</option>
                                        <option value="Jet Link Express">Jet Link Express</option>
                                        <option value="Jet Lite">Jet Lite</option>
                                        <option value="Jet2.com">Jet2.com</option>
                                        <option value="Jetairfly">Jetairfly</option>
                                        <option value="Jetblue Airways">Jetblue Airways</option>
                                        <option value="JetGo Australia">JetGo Australia</option>
                                        <option value="Jet-Ops">Jet-Ops</option>
                                        <option value="Jetstar Airways">Jetstar Airways</option>
                                        <option value="Jetstar Asia Airways">Jetstar Asia Airways</option>
                                        <option value="Jetstar Japan">Jetstar Japan</option>
                                        <option value="Jetstar Pacific">Jetstar Pacific</option>
                                        <option value="Jin Air">Jin Air</option>
                                        <option value="Job Air">Job Air</option>
                                        <option value="Jordan Aviation">Jordan Aviation</option>
                                        <option value="JoyAir">JoyAir</option>
                                        <option value="Jubba Airways (Kenya)">Jubba Airways (Kenya)</option>
                                        <option value="Juneyao Airlines">Juneyao Airlines</option>
                                        <option value="KalStar">KalStar</option>
                                        <option value="Kam-Air">Kam-Air</option>
                                        <option value="Kan Air">Kan Air</option>
                                        <option value="Karinou Airlines">Karinou Airlines</option>
                                        <option value="Kenmore Air">Kenmore Air</option>
                                        <option value="Kenn Borek Air">Kenn Borek Air</option>
                                        <option value="Kenya Airways">Kenya Airways</option>
                                        <option value="Key Lime Air">Key Lime Air</option>
                                        <option value="Kish Air">Kish Air</option>
                                        <option value="KLM Cityhopper">KLM Cityhopper</option>
                                        <option value="KLM Royal Dutch Airlines">KLM Royal Dutch Airlines</option>
                                        <option value="K-Mile Air">K-Mile Air</option>
                                        <option value="Kolavia">Kolavia</option>
                                        <option value="Korea Express Air">Korea Express Air</option>
                                        <option value="Korean Air">Korean Air</option>
                                        <option value="Korongo Airlines">Korongo Airlines</option>
                                        <option value="Kunming Airlines">Kunming Airlines</option>
                                        <option value="Kuwait Airways">Kuwait Airways</option>
                                        <option value="Kyrgyz Trans Avia">Kyrgyz Trans Avia</option>
                                        <option value="LACSA">LACSA</option>
                                        <option value="LAM - Linhas AÃ©reas de MoÃ§ambique">LAM - Linhas AÃ©reas de MoÃ§ambique</option>
                                        <option value="LAN airlines">LAN airlines</option>
                                        <option value="LAN Argentina">LAN Argentina</option>
                                        <option value="LAN Ecuador">LAN Ecuador</option>
                                        <option value="LAN Express">LAN Express</option>
                                        <option value="LAN PerÃº">LAN PerÃº</option>
                                        <option value="Lao Airlines">Lao Airlines</option>
                                        <option value="Lao Central Airlines">Lao Central Airlines</option>
                                        <option value="Laparkan Airlines">Laparkan Airlines</option>
                                        <option value="Laser Airlines">Laser Airlines</option>
                                        <option value="LC Busre">LC Busre</option>
                                        <option value="LEPL Projects">LEPL Projects</option>
                                        <option value="LGW-Luftfahrtgesellschaft Walter">LGW-Luftfahrtgesellschaft Walter</option>
                                        <option value="LIAT">LIAT</option>
                                        <option value="Libyan Airlines">Libyan Airlines</option>
                                        <option value="Lignes Aeriennes Congolaises">Lignes Aeriennes Congolaises</option>
                                        <option value="Linea Aerea Carguera de Colombia">Linea Aerea Carguera de Colombia</option>
                                        <option value="Linea Aerea Cuencana">Linea Aerea Cuencana</option>
                                        <option value="Lion  Airlines">Lion  Airlines</option>
                                        <option value="Livingston Air">Livingston Air</option>
                                        <option value="Loganair">Loganair</option>
                                        <option value="LOT Polish Airlines">LOT Polish Airlines</option>
                                        <option value="LTA Linea Turistica Aereotuy">LTA Linea Turistica Aereotuy</option>
                                        <option value="Lucky Air">Lucky Air</option>
                                        <option value="Lufthansa">Lufthansa</option>
                                        <option value="Lufthansa CityLine">Lufthansa CityLine</option>
                                        <option value="Lufthansa Systems">Lufthansa Systems</option>
                                        <option value="Luftline Georgia">Luftline Georgia</option>
                                        <option value="Luxair">Luxair</option>
                                        <option value="Macair Jet">Macair Jet</option>
                                        <option value="Mahan Air">Mahan Air</option>
                                        <option value="MAI - Myanmar Airways International">MAI - Myanmar Airways International</option>
                                        <option value="Malaysia  Airlines">Malaysia  Airlines</option>
                                        <option value="Malindo Air">Malindo Air</option>
                                        <option value="Malmo Aviation">Malmo Aviation</option>
                                        <option value="Mandarin Airlines">Mandarin Airlines</option>
                                        <option value="Marsland Aviation">Marsland Aviation</option>
                                        <option value="Martinair">Martinair</option>
                                        <option value="MASwings">MASwings</option>
                                        <option value="Mauritanian Airlines International">Mauritanian Airlines International</option>
                                        <option value="Maya Island Air">Maya Island Air</option>
                                        <option value="MEA - Middle East Airlines">MEA - Middle East Airlines</option>
                                        <option value="Med Avia">Med Avia</option>
                                        <option value="Mega Maldives Air">Mega Maldives Air</option>
                                        <option value="Meridiana fly">Meridiana fly</option>
                                        <option value="Mesa Airlines">Mesa Airlines</option>
                                        <option value="Mexicana - Mexicana de AviaciÃ³n">Mexicana - Mexicana de AviaciÃ³n</option>
                                        <option value="MHS Aviation">MHS Aviation</option>
                                        <option value="Miami Air International">Miami Air International</option>
                                        <option value="MIAT - Mongolian Airlines">MIAT - Mongolian Airlines</option>
                                        <option value="Mokulele Airlines">Mokulele Airlines</option>
                                        <option value="Moldavian Airlines">Moldavian Airlines</option>
                                        <option value="Monarch Airlines">Monarch Airlines</option>
                                        <option value="Montenegro Airlines">Montenegro Airlines</option>
                                        <option value="Moskovia Airlines">Moskovia Airlines</option>
                                        <option value="Motor-Sich">Motor-Sich</option>
                                        <option value="Nasair">Nasair</option>
                                        <option value="National Jet Systems">National Jet Systems</option>
                                        <option value="Nature Air">Nature Air</option>
                                        <option value="Navitaire">Navitaire</option>
                                        <option value="Navitaire Open Skies">Navitaire Open Skies</option>
                                        <option value="Naysa Aerotaxis">Naysa Aerotaxis</option>
                                        <option value="Neos">Neos</option>
                                        <option value="Nepal Airlines">Nepal Airlines</option>
                                        <option value="Nesma Airlines">Nesma Airlines</option>
                                        <option value="New England Airlines">New England Airlines</option>
                                        <option value="NextJet">NextJet</option>
                                        <option value="NIKI">NIKI</option>
                                        <option value="Nile Air">Nile Air</option>
                                        <option value="Nok Air">Nok Air</option>
                                        <option value="Nordavia">Nordavia</option>
                                        <option value="Nordic Global Airlines">Nordic Global Airlines</option>
                                        <option value="NordStar">NordStar</option>
                                        <option value="Nordwind Airlines">Nordwind Airlines</option>
                                        <option value="North American Airlines">North American Airlines</option>
                                        <option value="North Flying">North Flying</option>
                                        <option value="Northwestern Air Lease">Northwestern Air Lease</option>
                                        <option value="North-Wright Airways">North-Wright Airways</option>
                                        <option value="Norwegian">Norwegian</option>
                                        <option value="Norwegian Long Haul">Norwegian Long Haul</option>
                                        <option value="Nouvelair">Nouvelair</option>
                                        <option value="Nova Airways">Nova Airways</option>
                                        <option value="Novo air">Novo air</option>
                                        <option value="Oceanair">Oceanair</option>
                                        <option value="Okay Airways">Okay Airways</option>
                                        <option value="Olympic Air">Olympic Air</option>
                                        <option value="Oman Air">Oman Air</option>
                                        <option value="Onur Air">Onur Air</option>
                                        <option value="Openskies">Openskies</option>
                                        <option value="Orbest Portugal">Orbest Portugal</option>
                                        <option value="Orenair">Orenair</option>
                                        <option value="Orient Thai Airlines">Orient Thai Airlines</option>
                                        <option value="Oriental Air Bridge">Oriental Air Bridge</option>
                                        <option value="Our Airline">Our Airline</option>
                                        <option value="Pacific Airways">Pacific Airways</option>
                                        <option value="Pacific Coastal Airlines">Pacific Coastal Airlines</option>
                                        <option value="Pacific Wings">Pacific Wings</option>
                                        <option value="Pakistan International Airlines">Pakistan International Airlines</option>
                                        <option value="PAL Express">PAL Express</option>
                                        <option value="Papillon Airways">Papillon Airways</option>
                                        <option value="Parsa S.A.">Parsa S.A.</option>
                                        <option value="Peach Aviation">Peach Aviation</option>
                                        <option value="Pegasus Airlines">Pegasus Airlines</option>
                                        <option value="Penair">Penair</option>
                                        <option value="Perimeter Aviation">Perimeter Aviation</option>
                                        <option value="Petra Airlines">Petra Airlines</option>
                                        <option value="PGA - Portugalia Airlines">PGA - Portugalia Airlines</option>
                                        <option value="Philippine Airlines">Philippine Airlines</option>
                                        <option value="Phoenix Air">Phoenix Air</option>
                                        <option value="Pison Airways">Pison Airways</option>
                                        <option value="Polar Airlines">Polar Airlines</option>
                                        <option value="Polet Airlines">Polet Airlines</option>
                                        <option value="Porter Airlines">Porter Airlines</option>
                                        <option value="Precision Air">Precision Air</option>
                                        <option value="Premier Trans Aire">Premier Trans Aire</option>
                                        <option value="Premium Jet">Premium Jet</option>
                                        <option value="PrimAir">PrimAir</option>
                                        <option value="Primera Air Scandinavia">Primera Air Scandinavia</option>
                                        <option value="Privatair">Privatair</option>
                                        <option value="Private Wings">Private Wings</option>
                                        <option value="Proflight Air Services">Proflight Air Services</option>
                                        <option value="Propilot">Propilot</option>
                                        <option value="Provincial Airlines">Provincial Airlines</option>
                                        <option value="Pullmantur Air">Pullmantur Air</option>
                                        <option value="Qantas">Qantas</option>
                                        <option value="Qatar Airways">Qatar Airways</option>
                                        <option value="Qatar Amiri Flight">Qatar Amiri Flight</option>
                                        <option value="Qeshm Airlines">Qeshm Airlines</option>
                                        <option value="R Airlines">R Airlines</option>
                                        <option value="Radixx Solutions International">Radixx Solutions International</option>
                                        <option value="RAK Airways">RAK Airways</option>
                                        <option value="Red Wings">Red Wings</option>
                                        <option value="Redemption">Redemption</option>
                                        <option value="Regent Airways">Regent Airways</option>
                                        <option value="Republic Airlines">Republic Airlines</option>
                                        <option value="Republic Express Airlines">Republic Express Airlines</option>
                                        <option value="REX - regional express">REX - regional express</option>
                                        <option value="Roblex Aviation">Roblex Aviation</option>
                                        <option value="Rossiya">Rossiya</option>
                                        <option value="Rotana Jet">Rotana Jet</option>
                                        <option value="Royal Air Force">Royal Air Force</option>
                                        <option value="Royal Air Maroc">Royal Air Maroc</option>
                                        <option value="Royal Brunei Airlines">Royal Brunei Airlines</option>
                                        <option value="Royal Jordanian">Royal Jordanian</option>
                                        <option value="RUS aviation">RUS aviation</option>
                                        <option value="RusLine">RusLine</option>
                                        <option value="RUTACA">RUTACA</option>
                                        <option value="RwandAir Express">RwandAir Express</option>
                                        <option value="Ryan Air">Ryan Air</option>
                                        <option value="Ryanair">Ryanair</option>
                                        <option value="S7 Airlines">S7 Airlines</option>
                                        <option value="Sabre">Sabre</option>
                                        <option value="Sabre Pacific">Sabre Pacific</option>
                                        <option value="Safair">Safair</option>
                                        <option value="Safarilink Aviation">Safarilink Aviation</option>
                                        <option value="Safi Airways">Safi Airways</option>
                                        <option value="SANSA - Servicios AÃ©reos Nacionales">SANSA - Servicios AÃ©reos Nacionales</option>
                                        <option value="Santa Barbara Airlines">Santa Barbara Airlines</option>
                                        <option value="Saratov Airlines">Saratov Airlines</option>
                                        <option value="SAS">SAS</option>
                                        <option value="SAT airlines">SAT airlines</option>
                                        <option value="SATA Air Acores">SATA Air Acores</option>
                                        <option value="SATA Internacional">SATA Internacional</option>
                                        <option value="Satena">Satena</option>
                                        <option value="Saudia">Saudia</option>
                                        <option value="Scat Air">Scat Air</option>
                                        <option value="Scenic Airlines">Scenic Airlines</option>
                                        <option value="Scoot">Scoot</option>
                                        <option value="Seaborne  Airlines">Seaborne  Airlines</option>
                                        <option value="SEAir International">SEAir International</option>
                                        <option value="Senegal Airlines">Senegal Airlines</option>
                                        <option value="SF Airlines">SF Airlines</option>
                                        <option value="Shaheen Air International">Shaheen Air International</option>
                                        <option value="Shandong Airlines">Shandong Airlines</option>
                                        <option value="Shanghai Airlines">Shanghai Airlines</option>
                                        <option value="Shenzhen Airlines">Shenzhen Airlines</option>
                                        <option value="Shun Tak-China Travel Ship">Shun Tak-China Travel Ship</option>
                                        <option value="Siam Ga - Siam General Aviation">Siam Ga - Siam General Aviation</option>
                                        <option value="Sichuan Airlines">Sichuan Airlines</option>
                                        <option value="Sierra West Airlines">Sierra West Airlines</option>
                                        <option value="Silk Way Airlines">Silk Way Airlines</option>
                                        <option value="Silk Way West Airlines">Silk Way West Airlines</option>
                                        <option value="SilkAir">SilkAir</option>
                                        <option value="Silver Airways">Silver Airways</option>
                                        <option value="Singapore Airlines">Singapore Airlines</option>
                                        <option value="Sirena-Travel">Sirena-Travel</option>
                                        <option value="SITA">SITA</option>
                                        <option value="Ska SA Aircraft Leasing">Ska SA Aircraft Leasing</option>
                                        <option value="Sky Airline">Sky Airline</option>
                                        <option value="Sky Bahamas">Sky Bahamas</option>
                                        <option value="Sky Wings">Sky Wings</option>
                                        <option value="Sky wings Asia Airlines">Sky wings Asia Airlines</option>
                                        <option value="SkyJet Aviation">SkyJet Aviation</option>
                                        <option value="Skymark Airlines">Skymark Airlines</option>
                                        <option value="SkyTaxi">SkyTaxi</option>
                                        <option value="Skytrans Regional">Skytrans Regional</option>
                                        <option value="SkyWest  Airlines">SkyWest  Airlines</option>
                                        <option value="Skywise">Skywise</option>
                                        <option value="SkyWork Airlines">SkyWork Airlines</option>
                                        <option value="Small Planet Airlines Polska">Small Planet Airlines Polska</option>
                                        <option value="Smart Aviation">Smart Aviation</option>
                                        <option value="Smartlynx Airlines">Smartlynx Airlines</option>
                                        <option value="Smokey Bay Air">Smokey Bay Air</option>
                                        <option value="SNCF">SNCF</option>
                                        <option value="SOL lÃ&shy;nea aÃ©reas">SOL lÃ&shy;nea aÃ©reas</option>
                                        <option value="Solaseed Air">Solaseed Air</option>
                                        <option value="Solomon Airlines">Solomon Airlines</option>
                                        <option value="Somon Air">Somon Air</option>
                                        <option value="South African Airlink">South African Airlink</option>
                                        <option value="South African Airways">South African Airways</option>
                                        <option value="South African Express">South African Express</option>
                                        <option value="Southern Air">Southern Air</option>
                                        <option value="Southern Air Charter">Southern Air Charter</option>
                                        <option value="Southwest Airlines">Southwest Airlines</option>
                                        <option value="Special Ground Handling Service">Special Ground Handling Service</option>
                                        <option value="SpiceJet">SpiceJet</option>
                                        <option value="Spirit Airlines">Spirit Airlines</option>
                                        <option value="Spring Airlines">Spring Airlines</option>
                                        <option value="Sqiva">Sqiva</option>
                                        <option value="SriLankan Airlines">SriLankan Airlines</option>
                                        <option value="Sriwijaya Air">Sriwijaya Air</option>
                                        <option value="Star PerÃº">Star PerÃº</option>
                                        <option value="Starbow Airlines">Starbow Airlines</option>
                                        <option value="StarFlyer">StarFlyer</option>
                                        <option value="Starlight Airlines">Starlight Airlines</option>
                                        <option value="Sudan Airways">Sudan Airways</option>
                                        <option value="Sun Air of Scandinavia">Sun Air of Scandinavia</option>
                                        <option value="Sun Country Airlines">Sun Country Airlines</option>
                                        <option value="Sun d'Or International Airlines">Sun d'Or International Airlines</option>
                                        <option value="Sun Express">Sun Express</option>
                                        <option value="SunExpress Deutschland">SunExpress Deutschland</option>
                                        <option value="Sunrise Airways">Sunrise Airways</option>
                                        <option value="Sunwing Airlines">Sunwing Airlines</option>
                                        <option value="Surinam Airways">Surinam Airways</option>
                                        <option value="Sutra">Sutra</option>
                                        <option value="SWISS">SWISS</option>
                                        <option value="Sylt Air">Sylt Air</option>
                                        <option value="Syphax Airlines">Syphax Airlines</option>
                                        <option value="Syrianair">Syrianair</option>
                                        <option value="TAAG Angola Airlines">TAAG Angola Airlines</option>
                                        <option value="Taban Air">Taban Air</option>
                                        <option value="Taca International Airlines">Taca International Airlines</option>
                                        <option value="TACA PerÃº">TACA PerÃº</option>
                                        <option value="TACV - Cabo Verde airlines">TACV - Cabo Verde airlines</option>
                                        <option value="Tailwind Airlines">Tailwind Airlines</option>
                                        <option value="Tajik Air">Tajik Air</option>
                                        <option value="TAM Linhas Aereas">TAM Linhas Aereas</option>
                                        <option value="TAM Mercosur">TAM Mercosur</option>
                                        <option value="TAME Ecuador">TAME Ecuador</option>
                                        <option value="Tanana Air Service">Tanana Air Service</option>
                                        <option value="Tandem Aero">Tandem Aero</option>
                                        <option value="TAP Portugal">TAP Portugal</option>
                                        <option value="Taquan Air">Taquan Air</option>
                                        <option value="Tarco Air">Tarco Air</option>
                                        <option value="TAROM">TAROM</option>
                                        <option value="Tassili Airlines">Tassili Airlines</option>
                                        <option value="Tatarstan Air">Tatarstan Air</option>
                                        <option value="Techtimes Sudamericana">Techtimes Sudamericana</option>
                                        <option value="Thai Airways International">Thai Airways International</option>
                                        <option value="Thai Regional Airlines">Thai Regional Airlines</option>
                                        <option value="ThaiAir Asia">ThaiAir Asia</option>
                                        <option value="Thalys International">Thalys International</option>
                                        <option value="Thomas Cook Airlines Belgium">Thomas Cook Airlines Belgium</option>
                                        <option value="Thomas Cook Airlines Scandinavia">Thomas Cook Airlines Scandinavia</option>
                                        <option value="Thomas Cook Airlines UK">Thomas Cook Airlines UK</option>
                                        <option value="Thomson Airways">Thomson Airways</option>
                                        <option value="TianJin Airlines">TianJin Airlines</option>
                                        <option value="Tiara Air">Tiara Air</option>
                                        <option value="Tigerair">Tigerair</option>
                                        <option value="Tigerair Australia">Tigerair Australia</option>
                                        <option value="Tigerair Mandala">Tigerair Mandala</option>
                                        <option value="Tigerair Philippines">Tigerair Philippines</option>
                                        <option value="Tik Systems">Tik Systems</option>
                                        <option value="Titan Airways">Titan Airways</option>
                                        <option value="TMA - Trans Mediterranean Airways">TMA - Trans Mediterranean Airways</option>
                                        <option value="TNT Airways">TNT Airways</option>
                                        <option value="Topas">Topas</option>
                                        <option value="Toumai Air Tchad">Toumai Air Tchad</option>
                                        <option value="Trade Air">Trade Air</option>
                                        <option value="Tradewind Aviation">Tradewind Aviation</option>
                                        <option value="Trans Air Congo - TAC">Trans Air Congo - TAC</option>
                                        <option value="Trans States Airlines">Trans States Airlines</option>
                                        <option value="Transaero Airlines">Transaero Airlines</option>
                                        <option value="TransAsia Airways">TransAsia Airways</option>
                                        <option value="Transavia">Transavia</option>
                                        <option value="Transavia France">Transavia France</option>
                                        <option value="Transmile Air Services">Transmile Air Services</option>
                                        <option value="Travel Service">Travel Service</option>
                                        <option value="Travel Service Hungary">Travel Service Hungary</option>
                                        <option value="Travel Service Poland">Travel Service Poland</option>
                                        <option value="Travel Service Slovenia">Travel Service Slovenia</option>
                                        <option value="Travel Technology Interactive">Travel Technology Interactive</option>
                                        <option value="Travelport Global Distribution System B.V.">Travelport Global Distribution System B.V.</option>
                                        <option value="Travelsky Technology">Travelsky Technology</option>
                                        <option value="Trigana Air Service">Trigana Air Service</option>
                                        <option value="Tri-MG Intra Asia Airlines">Tri-MG Intra Asia Airlines</option>
                                        <option value="TRIP linhas aÃ©reas">TRIP linhas aÃ©reas</option>
                                        <option value="Tristar Air">Tristar Air</option>
                                        <option value="Tropic Air">Tropic Air</option>
                                        <option value="TUIFly">TUIFly</option>
                                        <option value="TUIfly Nordic">TUIfly Nordic</option>
                                        <option value="Tunisair">Tunisair</option>
                                        <option value="Tunisair Express">Tunisair Express</option>
                                        <option value="Turkish Airlines">Turkish Airlines</option>
                                        <option value="Turkmenistan Airlines">Turkmenistan Airlines</option>
                                        <option value="T'Way Air">T'Way Air</option>
                                        <option value="Twin Air Calypso">Twin Air Calypso</option>
                                        <option value="Twin Jet">Twin Jet</option>
                                        <option value="Tyrolean Airways - Austrian Arrows">Tyrolean Airways - Austrian Arrows</option>
                                        <option value="Ukraine International Airlines">Ukraine International Airlines</option>
                                        <option value="Ukrainian Mediterranean Airlines">Ukrainian Mediterranean Airlines</option>
                                        <option value="Ultimate Jetcharters">Ultimate Jetcharters</option>
                                        <option value="UNI Air">UNI Air</option>
                                        <option value="United Airlines">United Airlines</option>
                                        <option value="United Airways">United Airways</option>
                                        <option value="Uni-Top Airlines">Uni-Top Airlines</option>
                                        <option value="Universal Airways">Universal Airways</option>
                                        <option value="Ural Airlines">Ural Airlines</option>
                                        <option value="US Airways">US Airways</option>
                                        <option value="UTair">UTair</option>
                                        <option value="UTair-Express">UTair-Express</option>
                                        <option value="UTair-Ukraine">UTair-Ukraine</option>
                                        <option value="Uzbekistan Airways">Uzbekistan Airways</option>
                                        <option value="ValuAir">ValuAir</option>
                                        <option value="Van Air Europe">Van Air Europe</option>
                                        <option value="Vensecar Internacional">Vensecar Internacional</option>
                                        <option value="Videcom International">Videcom International</option>
                                        <option value="Vietjet Air">Vietjet Air</option>
                                        <option value="Vietnam Airlines">Vietnam Airlines</option>
                                        <option value="VIM Airlines">VIM Airlines</option>
                                        <option value="Vincent Aviation">Vincent Aviation</option>
                                        <option value="VIP Wings">VIP Wings</option>
                                        <option value="Virgin America">Virgin America</option>
                                        <option value="Virgin Atlantic">Virgin Atlantic</option>
                                        <option value="Virgin Australia International">Virgin Australia International</option>
                                        <option value="Vision Air">Vision Air</option>
                                        <option value="Vistara">Vistara</option>
                                        <option value="Vladivostok Air">Vladivostok Air</option>
                                        <option value="Volaris">Volaris</option>
                                        <option value="Volga-Dnepr Airlines">Volga-Dnepr Airlines</option>
                                        <option value="Volotea">Volotea</option>
                                        <option value="Vueling">Vueling</option>
                                        <option value="Wasaya Airways">Wasaya Airways</option>
                                        <option value="Wat Phnom Airlines">Wat Phnom Airlines</option>
                                        <option value="Welcome Air">Welcome Air</option>
                                        <option value="WESTbahn Management">WESTbahn Management</option>
                                        <option value="Westjet">Westjet</option>
                                        <option value="White Airways">White Airways</option>
                                        <option value="Whitejets">Whitejets</option>
                                        <option value="Wideroe's">Wideroe's</option>
                                        <option value="Winair">Winair</option>
                                        <option value="Wind Rose Aviation">Wind Rose Aviation</option>
                                        <option value="Wings Air">Wings Air</option>
                                        <option value="Wings of Alaska">Wings of Alaska</option>
                                        <option value="Wizz Air">Wizz Air</option>
                                        <option value="Wizz Air Ukraine">Wizz Air Ukraine</option>
                                        <option value="World Airways">World Airways</option>
                                        <option value="World Ticket">World Ticket</option>
                                        <option value="Xiamen Airlines">Xiamen Airlines</option>
                                        <option value="XL Airways France">XL Airways France</option>
                                        <option value="Xtra Airways">Xtra Airways</option>
                                        <option value="Yakutia">Yakutia</option>
                                        <option value="Yamal Airlines">Yamal Airlines</option>
                                        <option value="YanAir">YanAir</option>
                                        <option value="Yangtze River Express">Yangtze River Express</option>
                                        <option value="Yemenia">Yemenia</option>
                                        <option value="Yeti Airlines">Yeti Airlines</option>
                                        <option value="ZagrosJet">ZagrosJet</option>
                                    </datalist>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Flight Number :</label>
                            <input id="FlightNo" class="form-control" placeholder="Flight Number">
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">CC Last 4 :</label>
                            <input id="CCLast4" class="form-control" placeholder="CC Last 4">
                        </div>
                       
                        
                        <div class="col-md-3 mb">
                            <label for="email">Assigned To :</label>
                            <select class="form-control" id="Select_Driver" onchange="DriverChange()">
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="FredrickAddress">Address :</label>
                             <input id="FredrickAddress" class="form-control" placeholder="Fredrick Address"> 
                        </div>
                    </div>
                    <div class="row">
                        
                    </div>
                    <div class="row mt">
                        <div class="col-md-12 mb">
                            <h5 id="ExtrasNote" style="font-weight:bold;color:#E30D16"></h5>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-2 mb">
                            <div class="radio">
                                <label>
                                    <input type="radio" name="optionsRadios" id="ChkPaid" value="option1" checked="" />
                                    Paid
                                </label>
                            </div>
                        </div>
                        <div class="col-md-2 mb">
                            <div class="radio">
                                <label>
                                    <input type="radio" name="optionsRadios" id="ChkCollect" value="option1" checked="">
                                    Collect
                                </label>
                            </div>
                        </div>
                        <div class="col-md-2 mb">
                           <div class="checkbox">
						  <label>
						    <input type="checkbox" value="">
						    CC Payment
						  </label>
						</div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Fare :</label>
                            <input id="txt_Fare" class="form-control" onblur="SubTotalCalc()" placeholder="Fare" value="0.00">
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Toll :</label>
                            <input id="txt_Toll" class="form-control" onblur="TollChange()" value="0" placeholder="Toll">
                        </div>
                        <div class="col-md-2 mb">
                            <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkChildCarSeat" onchange="ChildCarSeatChange()" value="">
						    Child Car Seat
						  </label>
						</div>
                        </div>
                        <div class="col-md-2 mb">
                           <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkMeetAndGreet" onchange="MeetAndGreetChange()" value="">
						    Meet & Greet
						  </label>
						</div>
                        </div>
                        <div class="col-md-2 mb">
                           <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkSpecialAssistant" onchange="SpecialAssistantChange()" value="">
						    Special Assistant
						  </label>
						</div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Gratuity :</label>
                            <select class="form-control" id="SelGratuity" onchange="CalcGratuity()">
                              <%--  <option value="0">--Select Gratuity --</option>--%>
                               <option value="0">0%</option>
                                        <option value="10">10%</option>
                                        <option value="15">15%</option>
                                        <option value="20">20%</option>
                                        <option value="25">25%</option>
                                        <option value="30">30%</option>
                                        <option value="35">35%</option>
                                        <option value="40">40%</option>
                                        <option value="50">50%</option>
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Offer Code :</label>
                            <select class="form-control" id="SelOffer" onchange="OfferChange()">
                               <%-- <option value="0">--Select Offer Code --</option>
                                <option value="2">Welcome</option>--%>
                            </select>
                        </div>



                         <div class="col-md-2 mb">
                            <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkCurb" onchange="CurbChange()" value="">
						    Curb side pick up
						  </label>
						</div>
                        </div>
                        <div class="col-md-2 mb">
                           <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkSanitization" onchange="SanitizationChange()" value="">
						    Sanitization Charges
						  </label>
						</div>
                        </div>
                        <div class="col-md-2 mb">
                           <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkPet" onchange="PetChange()" value="">
						    Pet in cage
						  </label>
						</div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Parking :</label>
                            <input id="txt_Parking" onblur="ParkingChange()" class="form-control" value="0" placeholder="Parking">
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">CC Type :</label>
                            <select class="form-control" id="CardType">
                                <option value="">--Select CC Type --</option>
                                <option value="Amex">Amex</option>
                                <option value="Discover">Discover</option>
                                <option value="Master">Master</option>
                                <option value="Visa">Visa</option>
                            </select>
                        </div>
                        
                   <div class="col-md-3 mb">
                             <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkSnow" onchange="CalcSnowCharges()" value="" />
						   Snow Charges
						  </label>
						</div>
                        </div>
                         <div class="col-md-3 mb">
                            
                        </div>

                             <div class="col-md-3 mb">
                            <label for="email">Late Night	 :</label>
                            <input id="LateNightCharge" class="form-control" value="0.00" readonly>
                        </div>
                         <div class="col-md-3 mb">
                            <label for="email">Payment Type	 :</label>
                            <select class="form-control" id="PaymentType">
                                <option value="">--Select Payment Type	 --</option>
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>

                            </select>
                        </div>

                          <%--Passengers--%>
                         <div class="col-md-6 mb">
                            <label >Child Car Seat: $ 20 </label><br />
                             <label >Meet & Greet: $ 30 </label><br /> 
                              <label >Sanitization : $ 5 </label><br />
                              <label >Pet in cage: $ 25 </label><br />
                              <label >Snow: 20% to 40% as per setting </label>
                        </div>
                          <div class="col-md-3 mb">
                               <label for="email">Extra Adults :</label>
                               <input id="ExtraAdult" class="form-control" value="0" readonly="">
                               <input id="ExtraAdultPrice" class="form-control" value="0.00" readonly="">
                          </div>
                         <div class="col-md-3 mb">
                               <label for="email">Extra Children :</label>
                               <input id="ExtraChild" class="form-control" value="0" readonly="">
                               <input id="ExtraChildPrice" class="form-control" value="0.00" readonly="">
                         </div>
                        <%--Bagguage--%> 
                         <div class="col-md-3 mb">
                            <label for="email">Extra Bags :</label>
                           <select class="form-control" id="SelExtraBag" onchange="CalcExtraBag()">
                                                        <option selected="selected" value="0">Extra Bag</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Extra Bag Charges :</label>
                           <input id="ExtraBagAmount" class="form-control" value="0.00" readonly="">
                        </div>
                        <%--Bagguage--%>
                         <div class="col-md-6 mb"></div>
                               
                         <div class="col-md-3 mb">
                                     <label for="email">Card Processing Fee :</label>
                                     <input id="CardProcessingFee" class="form-control" value="0.00" onchange="ChangeCCFees();" />
                                </div>
                        <div class="col-md-3 mb">
                            
                        </div>
                        <div class="col-md-3 mb">
                            
                        </div>
                        <div class="col-md-3 mb">
                            
                        </div>
                        <div class="col-md-3 mb">
                            
                        </div>
                        <div class="col-md-3 mb">
                            
                        </div>    
                          <div class="col-md-3 mb">
                            
                        </div>    
                       <%-- <div class="col-md-12"></div>--%>
                                
                        <div class="col-md-6 mb">
                            <label for="email">Total Fare:</label>
                            <input id="Total" class="form-control" placeholder="0.00">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb">
                            <label for="email">Remarks :</label>
                            <textarea id="Remark" class="form-control" placeholder="Remarks"></textarea>
                        </div>
                        <div class="col-md-1 mb">
                            <div class="checkbox">
						  <label>
						    <input type="checkbox" id="ChkEmail">
						    Email
						  </label>
						</div>
                        </div>
                        <div class="col-md-2 mb">
                            <button type="button" id="BtnAddResv" onclick="Validate()" class="btn btn-primary">ADD</button>
                            <button type="button" class="btn btn-primary" onclick="location.href = 'Dashboard.aspx';">CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <script src="timepicker/bootstrap-timepicker.min.js"></script>
    <script>
        // Clock pickers
        $('#single-input').clockpicker({
            placement: 'bottom'
            , align: 'left'
            , autoclose: true
            , 'default': 'now'
        });
        $('.clockpicker').clockpicker({
            donetext: 'Done'
        ,
        }).find('input').change(function () {
            console.log(this.value);
        });
        $('#check-minutes').click(function (e) {
            // Have to stop propagation here
            e.stopPropagation();
            input.clockpicker('show').clockpicker('toggleView', 'minutes');
        });
        if (/mobile/i.test(navigator.userAgent)) {
            $('input').prop('readOnly', true);
        }
        // Colorpicker
        $(".colorpicker").asColorPicker();
        $(".complex-colorpicker").asColorPicker({
            mode: 'complex'
        });
        $(".gradient-colorpicker").asColorPicker({
            mode: 'gradient'
        });
        // Date Picker
        jQuery('.mydatepicker, #datepicker').datepicker();
        jQuery('#datepicker-autoclose').datepicker({
            autoclose: true
            , todayHighlight: true
        });
        jQuery('#date-range').datepicker({
            toggleActive: true
        });
        jQuery('#datepicker-inline').datepicker({
            todayHighlight: true
        });
        // Daterange picker
        $('.input-daterange-datepicker').daterangepicker({
            buttonClasses: ['btn', 'btn-sm']
            , applyClass: 'btn-danger'
            , cancelClass: 'btn-inverse'
        });
        $('.input-daterange-timepicker').daterangepicker({
            timePicker: true
            , format: 'MM/DD/YYYY h:mm A'
            , timePickerIncrement: 30
            , timePicker12Hour: true
            , timePickerSeconds: false
            , buttonClasses: ['btn', 'btn-sm']
            , applyClass: 'btn-danger'
            , cancelClass: 'btn-inverse'
        });
        $('.input-limit-datepicker').daterangepicker({
            format: 'MM/DD/YYYY'
            , minDate: '06/01/2015'
            , maxDate: '06/30/2015'
            , buttonClasses: ['btn', 'btn-sm']
            , applyClass: 'btn-danger'
            , cancelClass: 'btn-inverse'
            , dateLimit: {
                days: 6
            }
        });
    </script>
</asp:Content>
