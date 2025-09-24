<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="Frederick.Admin.Dashboard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
  <%--  <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css" />
<script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js" defer></script>--%>
    <script src="Scripts/ManageBooking.js"></script>
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


                        <div class="col-md-3 mb" onclick="GetData('ServiceTomorrow')"  style="cursor: pointer;">
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

                        <div class="col-md-3 mb" onclick="GetData('ResMadeTodayList')"  style="cursor: pointer;">
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
                        <div class="col-md-3 mb" onclick="GetData('UnassignedTomorrow')"  style="cursor: pointer;">
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
                        <div class="col-md-3 mb" onclick="GetData('ResMadeTodayList')"  style="cursor: pointer;">
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
                                        <p id="TodayReservationAmount">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb" onclick="GetData('OnlineReservation')"  style="cursor: pointer;">
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
                                        <p id="OnlineReservation">0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb" onclick="GetData('UpcomingReservation')"  style="cursor: pointer;">
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
                        <div class="col-md-3 mb" onclick="GetData('PendingReservation')"  style="cursor: pointer;">
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
                                        <p id="PendingReservation">0</p>
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
                                    <table class="table table-bordered table-striped table-condensed dataex-colvis-basic displaySearch">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Booking No</th>
                                                <th class="numeric">Name</th>
                                                <th class="numeric">Service </th>
                                                <th class="numeric">Resevation Date</th>
                                                <th class="numeric">Resevation Time</th>
                                                <th class="numeric">Total Fare</th>
                                                <th class="numeric">Status</th>
                                                <th class="numeric">Paid</th>
                                                <th class="numeric">Update | Confirm</th>
                                                <%--<th class="numeric">Cancel | Delete</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody id="MyDataTable">
                                            <%--<tr>
                                      <td data-title="Code">1</td>
                                      <td data-title="Company">RES-SM7281897</td>
                                      <td class="numeric" data-title="Price">Sandra Mulryan</td>
                                      <td class="numeric" data-title="Change">From Airport</td>
                                      <td class="numeric" data-title="Change %">01-16-2021</td>
                                      <td class="numeric" data-title="Open">12:40:PM</td>
                                      <td class="numeric" data-title="High">82.83</td>
                                      <td class="numeric" data-title="Low">Requested</td>
                                      <td class="numeric" data-title="Volume">Paid</td>
                                      <td align="center" class="numeric" data-title="Low">
                                          <button class="btn btn-success type="button" onclick="return false;" btn-xs"><i class=" fa fa-check"></i></button>
                                          |
                                          <a style="cursor: pointer" onclick="ConfirmBooking(121555)" href="#"><span class="fa fa-check" title="Confirm"></span></a>
                                      </td>
                                      <td align="center" class="numeric" data-title="Low">
                                          <a style="cursor: pointer" onclick="Cancel(121555)" href="#"><span class="fa fa-times" title="Cancel"></span></a>
                                          |
                                          <a style="cursor: pointer" href="#"><span class="glyphicon glyphicon-trash" title="Delete" aria-hidden="true" style="cursor: pointer" onclick="Delete(121555)"></span></a>
                                      </td>
                                  </tr>--%>
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

    <!-- Button trigger modal -->


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
    <script src="../Scripts/CustumDataTable.js"></script>
</asp:Content>
