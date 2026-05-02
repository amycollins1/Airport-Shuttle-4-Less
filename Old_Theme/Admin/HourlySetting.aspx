<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="HourlySetting.aspx.cs" Inherits="Frederick.Admin.HourlySetting" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/HourlySetting.js"></script>
    <script>
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode;
            if (charCode != 46 && charCode > 31
                && (charCode < 48 || charCode > 57))
                return false;

            return true;
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section id="main-content">
        <section class="wrapper">
            <div class="row container">
                <div class="col-lg-12">
                    <h3>Hourly Setting</h3>
                    <div class="row">                                              
                        <div class="col-md-3 mb">
                              <label for="Select_Vehicle">Select Vehicle:</label>
                           <select class="form-control" id="Select_Vehicle" onchange="VehicleChange()">
                            </select>
                        </div>
                         <div class="col-md-3 mb">
                             <label for="MinHours">From Hours:</label>
                            <input id="MinHours" class="form-control" value="0" type="number" />
                        </div>
                        <div class="col-md-3 mb">
                            <label for="MaxHours">To Hours:</label>
                            <input id="MaxHours" class="form-control" value="0"   type="number" />
                        </div>
                        <div class="col-md-3 mb">
                            <label for="Amount">Halt Amount Deduction:</label>
                            <input id="Amount" type="number" class=" form-control" placeholder="Amount" onkeypress="return isNumberKey(event)" />
                           <%-- <select id="Select_Percentage" class="form-control">
                                                    <option value="0" selected="selected">Select Percentage</option>
                                                    <option value="10">10 </option>
                                                    <option value="15">15 </option>
                                                    <option value="20">20 </option>
                                                    <option value="25">25 </option>
                                                    <option value="30">30 </option>
                                                    <option value="40">40 </option>
                                                    <option value="50">50 </option>
                                                </select>--%>
                        </div>                      
                       
                        
                    </div>
                     <div class="row">
                            <div class="col-md-3 mb">
                            <button type="button" class="btn btn-primary" onclick="AddUpdateHours()">Add</button>
                        </div>
                        </div>
                    <div class="row mt">
                        <div class="col-lg-12">
                            <div class="content-panel"><h3>Hourly Details</h3>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf" >
                                        <thead class="cf">
                                            <tr>
                                                <th>Srno</th>
                                                <th>Vehicle</th>
                                                <th>From Hours</th>
                                                <th>To Hours</th>
                                                <th>Amount Deduction</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody id="HourlyDetails">
                                            
                                        </tbody>
                                    </table>
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
</asp:Content>

