<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="Frederick.Customer.Dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="Scripts/Dashboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Reservations</h3>
                        </div>

                    </div>
                    <div class="row">

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="content-panel">
                                    <h4 align="center"></h4>
                                    <section id="no-more-tables">
                                        <table class="display table-responsive table-bordered table-striped"  cellspacing="0" width="100%" id="Details">
                                            <thead class="cf">
                                                <tr>
                                                <th>S.N</th>
                                                <th>Booking No</th>
                                                <th>Assigned To</th>
                                                <th>Service </th>
                                                 <th>Source </th>
                                                 <th>Destination </th>
                                                <th class="numeric">Resevation Date</th>
                                                <th class="numeric">Resevation Time</th>
                                                <th class="numeric">Total Fare</th>
                                                <th>Print</th>
                                                </tr>
                                            </thead>
                                            <tbody id="MyTable">
                                                <tr>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
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

    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade bs-example-modal-lg" id="BookingDetails" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width:90%">
            <div class="modal-content" style="background-color: aliceblue;">
                <div class="modal-header">

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel2" style="text-align: center">Booking Details</h4>
                </div>
                <div class="modal-body Iframe" id="ModelDetails">
                    
                </div>
            </div>
        </div>
    </div>
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
    <script src="../Scripts/CustumDataTable.js"></script>
</asp:Content>
