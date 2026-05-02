<%@ Page Title="" Language="C#" MasterPageFile="~/AdminCorporate/admincorporate.Master" AutoEventWireup="true" CodeBehind="DeleteCorpReservation.aspx.cs" Inherits="Frederick.AdminCorporate.DeleteCorpReservation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/DeleteCorpReservation.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
                        <div class="col-md-12 mb">
                            <h3>Delete Reservation</h3>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-3 mb">
                            <label>Reservation No:</label>
                            <input type="text" class="form-control" id="txt_ResNo" "="">
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
                                      <th class="numeric">Passenger</th>
                                      <th class="numeric">Service</th>
                                      <th class="numeric">Status</th>
                                      <th class="numeric">Source</th>
                                      <th class="numeric">Destination</th>
                                      <th class="numeric">Total Fare</th>
                                      <th class="numeric">Delete</th>
                                  </tr>
                                  </thead>
                                  <tbody id="Details"></tbody>
                              </table>
                                <div style="margin-left:10px;font-weight:bold" id="Calc"></div>
                          </section>
                      </div><!-- /content-panel -->
                  </div><!-- /col-lg-12 -->
              </div><!-- /row -->	
					
                  
                  
              </div>
                </div>
            </div>

            
        </section>
    </section>
</asp:Content>


