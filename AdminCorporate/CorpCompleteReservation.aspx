<%@ Page Title="" Language="C#" MasterPageFile="~/AdminCorporate/admincorporate.Master" AutoEventWireup="true" CodeBehind="CorpCompleteReservation.aspx.cs" Inherits="Frederick.AdminCorporate.CorpCompleteReservation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/CorpCompleteReservation.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">
            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <h3>Complete Reservation</h3>
                        <div class="row mt">

                            <div class="col-lg-12">
                                <div class="content-panel">
                                    <h4 align="center"></h4>
                                    <section id="no-more-tables">
                                        <button style="font-size: 12px;" type="button" onclick="CompleteReservation()" class="btn btn-primary btn-xs glyphicon glyphicon-ok" title="Complete Selected Reservation"></button>
                                        <table class="table table-bordered table-striped table-condensed cf">
                                            <thead class="cf">
                                                <tr>
                                                    <th>S.N</th>
                                                    <th>Select</th>
                                                    <th>Reservation No</th>
                                                    <th>Reservation Date</th>
                                                    <th>Passenger</th>
                                                    <th>Service</th>
                                                    <th>Status</th>
                                                    <th>Source</th>
                                                    <th>Destination</th>
                                                    <th>Total Fare</th>
                                                </tr>
                                            </thead>
                                            <tbody id="Details"></tbody>
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
</asp:Content>

