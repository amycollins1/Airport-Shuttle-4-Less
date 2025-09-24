<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="CustomerActivity.aspx.cs" Inherits="Frederick.Admin.CustomerActivity" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/CustomerActivity.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Customer Reports</h3>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-4 mb">
                            <label for="email">From:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="txt_FDate" data-select="datepicker" placeholder="From Date" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4 mb">
                            <label for="email">To:</label>
                            <div class="input-group">
                                <input type="text" class="form-control" name="date" id="txt_TDate" data-select="datepicker" placeholder="To Date" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-primary" data-toggle="datepicker"><i class="fa fa-calendar"></i></button>
                                </span>
                            </div>
                        </div>
                            <div class="col-md-4 mb">
                            <label for="Hours">Customer Name :</label>
                          <input id="Sel_Customer" class="form-control"  list="Select_Customer"/>
                                    <datalist id="Select_Customer"></datalist>
                        </div>
                        <div class="col-md-4 mb">
                            <label for="Hours">Resevation No :</label>
                            <input id="Sel_ReservationId" class="form-control"  list="Select_ReservationId"/>
                                    <datalist id="Select_ReservationId"></datalist>
                        </div>
                        <div class="col-md-4 mb">
                            <label for="Hours">Phone No :</label>
                             <input id="Sel_PhoneNo" class="form-control"  list="Select_PhoneNo"/>
                                    <datalist id="Select_PhoneNo"></datalist>
                        </div>
                        <div class="col-md-1 mb" style="padding-top: 1.8%">
                            <input type="button" class="btn btn-primary" value="Search" id="btn_Search" onclick="Submit();">
                        </div>
                        <div class="col-md-2 mb" style="padding-top: 1.6%">
                            <img src="../images/ExportToExcel.png" title="Export To Excel" onclick="ExportToExcel()" alt="Export To Excel" style="height:40px;width:40px;cursor:pointer">
                            <%--<img src="../images/pdf.png" title="Print Preview" onclick="printDiv('Prnt')" alt="Print" style="height:40px;width:40px;cursor:pointer">--%>
                             <%--<asp:HiddenField ID = "DriverCalc" runat = "server" />
                         <asp:ImageButton ImageUrl="~/images/pdf.png" runat="server" Height="50px" Width="50px" OnClick="ExportToPDF"/>--%>
                        </div>
                    </div>
                    <div class="row mt">
              <div class="col-lg-12">
                      <div class="content-panel">
                          <section id="no-more-tables">
                              <table class="table table-bordered table-striped table-condensed cf">
                                  <thead class="cf">
                                  <tr>
                                      <th>S.N</th>
                                      <th>Reservation No	</th>
                                      <th class="numeric">Assigned To</th>
                                      <th class="numeric">Guest Name</th>
                                      <th class="numeric">Phone No</th>
                                      <th class="numeric">Reservation Date</th>
                                      <th class="numeric">Service</th>
                                      <th class="numeric">Source</th>
                                      <th class="numeric">Destination</th>
                                      <th class="numeric">Total Fare</th>
                                    <%--  <th class="numeric">Make Reservation</th>--%>
                                  </tr>
                                  </thead>
                                  <tbody id="Details">
                                  
                                  </tbody>
                              </table>
                          </section>
                      </div><!-- /content-panel -->
                  </div><!-- /col-lg-12 -->
              </div>
                </div>
            </div>

        </section>
    </section>
</asp:Content>

