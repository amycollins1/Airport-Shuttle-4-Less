<%@ Page Title="" Language="C#" MasterPageFile="~/AdminCorporate/admincorporate.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="Frederick.AdminCorporate.Dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Dashboard.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row">
                <div class="col-lg-12 main-chart">

                    <div class="row mt">
                        <!-- SERVER STATUS PANELS -->
                        <div class="col-md-3 mb" onclick="GetData('ServiceToday')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p> 
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Reservations for Service Today</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="ServiceToday">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /col-md-3-->


                        <div class="col-md-3 mb" onclick="GetData('ServiceTomorrow')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Reservations for Service Tommorow</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="ServiceTomorrow">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /col-md-3 -->

                        <div class="col-md-3 mb" onclick="GetData('ResMadeTodayList')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Reservations Made Today</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="ResMadeTodayList">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /col-md-3 -->
                        <div class="col-md-3 mb" onclick="GetData('UnassignedTomorrow')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Unassigned For Tommorow</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="UnassignedTomorrow">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /col-md-3 -->

                    </div>
                    <!-- /row -->


                    <div class="row">
                        <div class="col-md-3 mb" onclick="GetData('ResMadeTodayList')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Today's Reservation Amount</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="TodayReservationAmount">$ 0.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb" onclick="GetData('OnlineReservation')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Online Reservation</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="OnlineReservation">4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb" onclick="GetData('UpcomingReservation')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Upcoming Reservation</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="UpcomingReservation">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb" onclick="GetData('PendingReservation')" style="cursor: pointer;">
                            <!-- WHITE PANEL - TOP USER -->
                            <div class="white-panel">
                                <div class="white-header">
                                    <h5></h5>
                                </div>
                                <p>
                                    <img src="assets/img/ui-danro.jpg" class="img-circle" width="40"></p>
                                <p><b>Pending Reservation</b></p>
                                <div class="row">
                                    <div class="col-md-12">
                                        <p id="PendingReservation">7</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- /row -->

                    <div class="row mt">
                        <div class="col-lg-12">
                            <div class="content-panel">
                                <h4 align="center" id="tblHeading"></h4>
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
                                                <th class="numeric">Driver</th>
                                                <th class="numeric">Total Amount</th>
                                                <th class="numeric">Detail</th>
                                            </tr>

                                        </thead>
                                        <tbody id="MyDataTable">
                                             <tr>
                                              <td align="center">1</td>
                                              <td align="center">BWIRESBlue Dolf-00001</td>
                                              <td align="center">06-30-2021</td>
                                              <td align="center">10:00:PM</td>
                                              <td align="center">1</td>
                                              <td align="center">From</td>
                                              <td align="center">New</td>
                                              <td align="center">Washington D.C., DC, USA</td>
                                              <td align="center">17101 science drive Bowie, md 20715</td>
                                              <td align="center"></td>
                                              <td align="center">0</td>
                                              <td align="center">
                                                <a style="cursor: pointer" onclick="addvehicle" href="#">
                                                  <span class="glyphicon glyphicon-list" title="View Detail"></span>
                                                </a>
                                              </td>
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
                <!-- /col-lg-9 END SECTION MIDDLE -->

            </div>
            <! --/row -->
        </section>
    </section>

    <%--<div class="modal fade in" id="addvehicle" aria-hidden="false" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title" id="" align="center">Add Vehicle Type</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="txttype" placeholder="Enter Type">
                    </div>
                </div>
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="submit" class="btn btn-primary" onclick="AddVehicleType()">Add</button>
                </div>
            </div>
                        </div>
                <div class="clearfix"></div>
            </div>
                </div>
            </div>
        </div>
    </div>--%>

</asp:Content>