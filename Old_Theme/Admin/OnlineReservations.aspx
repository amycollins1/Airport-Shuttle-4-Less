<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="OnlineReservations.aspx.cs" Inherits="Frederick.Admin.OnlineReservations" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/ReservationReport.js"></script>
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
                                <input type="text" class="form-control" name="date" id="txt_FDate" data-select="datepicker" placeholder="From Date" autocomplete="off" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">To:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="txt_TDate" data-select="datepicker" placeholder="To Date" autocomplete="off" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="Hours">Type :</label>
                            <select id="Select_Status" class="form-control" style="padding-left: 25px;">
                                <option value="All">All</option>
                                <option value="Completed">Completed</option>
                               <%-- <option value="Requested Online">Requested Online</option>--%>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Requested">Requested</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Deleted">Deleted</option>
                            </select>
                        </div>
                        <div class="col-md-1 mb" style="padding-top: 1.8%">
                            <input type="button" class="btn btn-primary" value="Search" id="btn_Search" onclick="Submit();">
                        </div>
                        <div class="col-md-2 mb" style="padding-top: 1.6%">
                            <img src="../images/ExportToExcel.png" title="Export To Excel" onclick="ExportToExcel()" alt="Export To Excel" style="height: 40px; width: 40px; cursor: pointer">
                            <img src="../images/Print.png" title="Print Preview" onclick="printDiv('no-more-tables')" alt="Print" style="height: 40px; width: 40px; cursor: pointer">
                            <asp:HiddenField ID="DriverCalc" runat="server" />
                            <asp:ImageButton ImageUrl="../images/PDF.png" runat="server" Height="50px" Width="50px" OnClick="ExportToPDF" />
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
                                                    <th>Booking No</th>
                                                    <th class="numeric">Assigned To</th>
                                                    <th class="numeric">Guest Name</th>
                                                    <th class="numeric">Reservation Date</th>
                                                    <th class="numeric">Service</th>
                                                    <th class="numeric">Source</th>
                                                    <th class="numeric">Destination</th>
                                                    <th class="numeric">Driver Percentage</th>
                                                    <th class="numeric">Total Fare</th>
                                                    <th class="numeric">Status</th>
                                                    <th class="numeric">Paid</th>
                                                    <th style="width:120px">Update |Confirm |Cancel |Delete |Completed</th>
                                                </tr>
                                            </thead>
                                            <tbody id="MyTable">
                                                <tr>
                                                    <%-- <td data-title="Code">1</td>
                                      <td data-title="Company">RES-SM7281897</td>
                                      <td class="numeric" data-title="Price">Sandra Mulryan</td>
                                      <td class="numeric" data-title="Change">From Airport</td>
                                      <td class="numeric" data-title="Change %">01-16-2021</td>
                                      <td class="numeric" data-title="Open">12:40:PM</td>
                                      <td class="numeric" data-title="High">82.83</td>
                                      <td class="numeric" data-title="Low">Requested</td>
                                      <td class="numeric" data-title="Volume">Paid</td>
                                      <td class="numeric" data-title="Volume">Paid</td>--%>
                                                </tr>
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

     <!-- Modal -->
    <div class="modal fade" id="ConfirmBooking" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="Title"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="col-sm-3 col-sm-3 control-label">Assign Driver </label>
                        <div class="col-sm-9">
                            <select id="Select_Driver" class="form-control">
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="ConfirmBooking()">Submit</button>
                </div>
            </div>
        </div>
    </div>

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

