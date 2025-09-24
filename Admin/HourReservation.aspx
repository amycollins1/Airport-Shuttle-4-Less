<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="HourReservation.aspx.cs" Inherits="Frederick.Admin.HourReservation" %>

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
     <script src="Scripts/AutoCompleteRoute.js"></script>
    <script src="Scripts/Reservation.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Per Hour Reservation</h3>
                                <button  type="button" class="btn btn-primary  btn-xs pull-right"  tooltip="Add New Customer" data-toggle="modal" data-target="#addcustomer"><i class=" fa fa-edit">Add New Customer</i></button>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-3 mb">
                            <label for="email">Email:</label>

                            <input id="txt_Email" class="form-control" list="Select_Email" autocomplete="off" />
                            <datalist id="Select_Email"></datalist>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Contact Number:</label>
                            <input id="txt_ContactNumber" class="form-control" list="Select_ContactNumber" />
                            <datalist id="Select_ContactNumber"></datalist>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">First Name :</label>
                            <input id="txt_FirstName" class="form-control" placeholder="First Name" />
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Last Name :</label>
                            <input id="txt_LastName" class="form-control" placeholder="Last Name" />
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Reservation Date :</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="txt_Date" data-select="datepicker" placeholder="Reservation Date" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Passenger :</label>
                            <input type="number" id="Passengers" class="form-control" placeholder="Passenger">
                            <datalist id=""></datalist>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Vehicle Type :</label>
                            <select class="form-control" id="Select_Vehicle" onchange="VehicleChange()">
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">Assigned To :</label>
                            <select class="form-control" id="Select_Driver">
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="Hours">Hours :</label>
                            <select class="form-control" id="SelHours" onchange="HoursChange()">
                                <option selected="selected" value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>

                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">CC Last 4 :</label>
                            <input id="CCLast4" class="form-control" placeholder="CC Last 4">
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">PickUp Time (24 hrs):</label>
                            <div class="input-group clockpicker" data-placement="bottom" data-align="top" data-autoclose="true">
                                <input type="text" class="form-control" id="Time" value="10:00">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb">
                            <label for="email">Pickup Address :</label>
                            <input id="PickupLocationHourly" class="form-control" placeholder="Pickup Address">
                        </div>
                        <div class="col-md-6 mb">
                            <label for="email">Drop Address:</label>
                            <input id="DropLocationHourly" class="form-control" placeholder="Drop Address">
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="col-md-6">
                                <div class="col-md-4 mb">
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="optionsRadios" id="ChkPaid" value="option1" checked="">
                                            Paid
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 mb">
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">
                                            Collect
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 mb">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" value="">
                                            CC Payment
                                        </label>
                                    </div>
                                </div>


                                <div class="col-md-4 mb">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" id="ChkChildCarSeat" onchange="ChildCarSeatChange()" value="">
                                            Child Car Seat
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 mb">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" id="ChkMeetAndGreet" onchange="MeetAndGreetChange()" value="">
                                            Meet & Greet
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 mb">
                                    <div class="checkbox">
                                        <label>
                                           <input type="checkbox" id="ChkSpecialAssistant" onchange="SpecialAssistantChange()" value="">
                                            Special assistant
                                        </label>
                                    </div>
                                </div>


                              <%--  <div class="col-md-12 mb">
                                    <div class="checkbox">
                                        <label>
                                             <input type="checkbox" id="ChkCurb" onchange="CurbChange()" value="">
                                            Curb side pick up
                                        </label>
                                    </div>
                                </div>--%>
                                <div class="col-md-4 mb">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" id="ChkSanitization" onchange="SanitizationChange()" value="">
                                            Sanitization Charges
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 mb">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" id="ChkPet" onchange="PetChange()" value="">
                                            Pet in cage
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 mb">
                                     <div class="checkbox">
                                         <label>
                                             <input type="checkbox" id="ChkSnow" onchange="CalcSnowCharges()" value="" />
                                             Snow Charges
                                         </label>
                                     </div>
                                </div>
                                 <div class="col-md-6">
                                        <label >Child Car Seat: $ 20 </label><br />
                             <label >Meet & Greet: $ 30 </label><br /> 
                              <label >Sanitization : $ 5 </label><br />
                              <label >Pet in cage: $ 25 </label><br />
                              <label >Snow: 20% to 40% as per setting </label>
                                 </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-md-6 mb">
                                    <label for="email">Fare :</label>
                                    <input id="txt_Fare" class="form-control" onblur="SubTotalCalc()" placeholder="Fare" value="0.00">
                                </div>
                                <div class="col-md-6 mb">
                                    <label for="email">Toll :</label>
                                    <input id="txt_Toll" class="form-control" onblur="TollChange()" value="0" placeholder="Toll">
                                </div>
                                <div class="col-md-6 mb">
                                    <label for="email">Gratuity :</label>
                                    <select class="form-control" id="SelGratuity" onchange="CalcGratuity()">
                                        <option value="0">--Select Gratuity --</option>
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
                                <div class="col-md-6 mb">
                                    <label for="email">Offer Code :</label>
                                    <select class="form-control" id="SelOffer" onchange="OfferChange()">
                                    </select>
                                </div>
                                <div class="col-md-4 mb">
                                    <label for="HourlyType">Reservation Type:</label>
                                    <select class="form-control" id="HaltType" onchange="GetHaltType()">
                                        <option value="1">Continious</option>
                                        <option value="2">Halt</option>
                                    </select>                                   
                                </div>
                                <div class="col-md-4 mb">
                                     <label for="txt_HaltHours">Halt Hours:</label>
                                    <input id="txt_HaltHours" onchange="HaltChange()" class="form-control" value="0" placeholder="Halt Hours" disabled="disabled"/>
                                </div>
                                 <div class="col-md-4 mb">
                                     <label for="txt_HaltDiscount">Halt Discount:</label>
                                    <input id="txt_HaltDiscount"  class="form-control" value="0" placeholder="Halt Discount" disabled="disabled"/>
                                </div>


                                <div class="col-md-6 mb">
                                    <label for="email">Parking :</label>
                                    <input id="txt_Parking" onblur="ParkingChange()" class="form-control" value="0" placeholder="Parking">
                                </div>
                                <div class="col-md-6 mb">
                                    <label for="email">CC Type :</label>
                                    <select class="form-control" id="CardType">
                                        <option value="">--Select CC Type --</option>
                                        <option value="Amex">Amex</option>
                                        <option value="Discover">Discover</option>
                                        <option value="Master">Master</option>
                                        <option value="Visa">Visa</option>
                                    </select>
                                </div>
                                <%--  <div class="col-md-6 mb">
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
                        <div class="col-md-6 mb">
                            <label for="email">Extra Bag Charges :</label>
                           <input id="ExtraBagAmount" class="form-control" value="0.00" readonly="">
                        </div>--%>
                                <div class="col-md-12"></div>
                                 <div class="col-md-6 mb">
                                     <label for="email">Card Processing Fee :</label>
                                     <input id="CardProcessingFee" class="form-control" value="0.00" onchange="ChangeCCFees();" />
                                </div>
                                <div class="col-md-12 mb">
                                    <label for="email">Total Fare	 :</label>
                                     <input id="Total" class="form-control" placeholder="0.00">
                                </div>
                            </div>
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

