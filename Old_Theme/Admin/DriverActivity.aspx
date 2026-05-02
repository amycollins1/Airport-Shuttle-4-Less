<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="DriverActivity.aspx.cs" Inherits="Frederick.Admin.DriverActivity" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/DriverActivity.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Reports Reservation</h3>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-3 mb">
                            <label for="email">From:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="txt_FDate" data-select="datepicker" placeholder="From Date" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">To:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="txt_TDate" data-select="datepicker" placeholder="To Date" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="Hours">Driver Name :</label>
                            <select id="Select_Driver" class="form-control" style="padding-left: 25px;"></select>
                        </div>
                        <div class="col-md-1 mb" style="padding-top: 1.8%">
                            <input type="button" class="btn btn-primary" value="Search" onclick="Submit();">
                        </div>
                        <div class="col-md-2 mb" style="padding-top: 1.6%">
                            <img src="../images/ExportToExcel.png" title="Export To Excel" onclick="ExportToExcel()" alt="Export To Excel" style="height: 40px; width: 40px; cursor: pointer">
                             <asp:HiddenField ID = "DriverCalc" runat = "server" />
                         <asp:ImageButton ImageUrl="~/images/pdf.png" runat="server" Height="50px" Width="50px" OnClick="ExportToPDF"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="content-panel">
                                <h4 align="center" id="Heading"></h4>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Booking No</th>
                                                <th class="numeric">Assigned To</th>
                                                <th class="numeric">Guest Name</th>
                                                <th class="numeric">Reservation Date</th>
                                                <th class="numeric">Service</th>
                                                <th class="numeric">Source</th>
                                                <th class="numeric">Destination</th>
                                                <th class="numeric">Fare</th>
                                                <th class="numeric">Total Fare</th>
                                            </tr>
                                        </thead>
                                        <tbody id="MyTable"></tbody>
                                    </table>
                                       <div style="margin-left:10px;font-weight:bold" id="Calc"></div>
                                </section>
                            </div>
                            <!-- /content-panel -->
                        </div>
                        <!-- /col-lg-12 -->
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

