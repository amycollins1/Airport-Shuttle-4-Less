<%@ Page Title="" Language="C#" MasterPageFile="~/AdminCorporate/admincorporate.Master" AutoEventWireup="true" CodeBehind="CorpReservationList.aspx.cs" Inherits="Frederick.AdminCorporate.CorpReservationList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../script/jquery-2.1.3.min.js"></script>
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
    <script src="Scripts/CopReservationList.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Reservation List</h3>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-3 mb">
                            <label>Company Name:</label>
                            <select class="form-control" id="Select_CompanyName"></select>
                        </div>
                        <div class="col-md-3 mb">
                            <label>Status:</label>
                            <select class="form-control" id="Select_Status">
                                <option value="New">New</option>
                                <option value="Requested">Requested</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="All">All</option>
                            </select>
                        </div>
                        <div class="col-md-1 mb" style="padding-top: 2.1%">
                            <input type="button" class="btn btn-primary" value="Search" id="btn_Search" onclick="SearchReservation('');">
                        </div>

                    </div>
                    <div class="row">

                        <div class="row mt">
                            <div class="col-lg-12">
                                <div class="content-panel">
                                    <h4 align="center"></h4>
                                    <section id="no-more-tables">
                                        <table class="table table-bordered table-striped table-condensed cf">
                                            <thead class="cf">
                                                <tr>
                                                    <th>S.N</th>
                                                    <th>Reservation No</th>
                                                    <th class="numeric">Reservation Date</th>
                                                    <th class="numeric">Time</th>
                                                    <th class="numeric">Passenger</th>
                                                    <th class="numeric">Service</th>
                                                    <th class="numeric">Status</th>
                                                    <th class="numeric">Source</th>
                                                    <th class="numeric">Destination</th>
                                                    <th class="numeric">Total Fare</th>
                                                    <th class="numeric">Detail</th>
                                                    <th class="numeric">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody id="Details">
                                            </tbody>
                                        </table>
                                        <div style="margin-left: 10px; font-weight: bold" id="Calc"></div>
                                    </section>
                                </div>
                                <!-- /content-panel -->
                            </div>
                            <!-- /col-lg-12 -->
                        </div>
                        <!-- /row -->



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
