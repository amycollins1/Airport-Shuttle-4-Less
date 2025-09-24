<%@ Page Title="" Language="C#" MasterPageFile="~/AdminCorporate/admincorporate.Master" AutoEventWireup="true" CodeBehind="CorporateReport.aspx.cs" Inherits="Frederick.AdminCorporate.CorporateReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/CorporateReport.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Corporate Reports</h3>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-3 mb">
                            <label for="email">From:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="datepicker1" data-select="datepicker" placeholder="From Date" autocomplete="off" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label for="email">To:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="datepicker2" data-select="datepicker" placeholder="To Date" autocomplete="off" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-3 mb">
                            <label>Company Name:</label>
                            <select class="form-control" id="Select_CompanyName"></select>
                        </div>
                        <div class="col-md-1 mb" style="padding-top: 2.1%">
                            <input type="button" class="btn btn-primary" value="Search" id="btn_Search" onclick="SearchReservation();">
                        </div>
                        <div class="col-md-1 mb" style="padding-top: 2%">
                            <img src="../images/ExportToExcel.png" title="Export To Excel" onclick="ExportToExcel()" alt="Export To Excel" style="height: 40px; width: 40px; cursor: pointer">
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
                                                    <th class="numeric">Passenger</th>
                                                    <th class="numeric">Passenger Name</th>
                                                    <th class="numeric">Service</th>
                                                    <th class="numeric">Source</th>
                                                    <th class="numeric">Destination</th>
                                                    <th class="numeric">Driver</th>
                                                    <th class="numeric">Total Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody id="Details"></tbody>
                                        </table>
                                        <br />
                                        <label id="TotalAmount" style="float: right; margin-right: 48px;"></label>
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
</asp:Content>

