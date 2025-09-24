<%@ Page Title="" Language="C#" MasterPageFile="~/AdminCorporate/admincorporate.Master" AutoEventWireup="true" CodeBehind="CorpAccList.aspx.cs" Inherits="Frederick.AdminCorporate.CorpAccList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/CorporateList.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row">
					<div class="col-md-12 mb">
                            <h3>Corporate Account List</h3>
                        </div>
					<div class="row mt">
              <div class="col-lg-12">
                      <div class="content-panel">
						  <h4 align="center"></h4>
                          <section id="no-more-tables">
                              <table class="table table-bordered table-striped table-condensed cf">
                                  <thead class="cf">
                                  <tr>
                                      <th>S.N</th>
                                      <th>Company Name</th>
                                      <th>User Name</th>
                                      <th>Password</th>
                                  </tr>
                                  </thead>
                                  <tbody id="MyDetails">
                                  </tbody>
                              </table>
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

