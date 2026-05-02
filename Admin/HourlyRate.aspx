<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="HourlyRate.aspx.cs" Inherits="Frederick.Admin.HourlyRate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Admin.js"></script>
    <script src="Scripts/HourlyRate.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                            <div class="content-panel"><h3>Hourly Rate Set Up</h3>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
                                                <th>Minimum Hours</th>
                                                <th>Hourly Rate</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody id="HourlyRate">
                                            
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                </div>
            </div>

        </section>
    </section>
    

    <div class="modal fade" id="updatehourlyrate">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Update Hourly Rate</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Type</label>
                                <select id="UVehicleinfoType" class="form-control" disabled>

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Minimum Hours </label>
                                <input type="text" class="form-control" id="utxtminimunhours" placeholder="Minimum Hours" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Hourly Rate</label>
                                <input type="text" class="form-control" id="utxthourlyrate" placeholder="Hourly Rate" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="btn-box">
                                    <button type="submit" class="btn btn-primary" onclick="UpdateLoadHourlyRate()">Update</button>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

