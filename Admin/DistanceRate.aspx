<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="DistanceRate.aspx.cs" Inherits="Frederick.Admin.DistanceRate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Admin.js"></script>
    <script src="Scripts/DistanceRate.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                            <div class="content-panel"><h3>Distance Rate Set Up</h3>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
                                                <th>Base Charge</th>
                                                <th>Miles Per Distance</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody id="DstanceRate">
                                            
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                </div>
            </div>

        </section>
    </section>
    

    <div class="modal fade" id="updatedistancerate">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Update Distance Rate</h4>
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
                                <label>Base Charge </label>
                                <input type="text" class="form-control" id="utxtbasecharge" placeholder="Base Charge " />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Miles Per Distance</label>
                                <input type="text" class="form-control" id="utxtperMile" placeholder="Miles Per Distance" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="btn-box">
                                    <button type="submit" class="btn btn-primary" onclick="UpdateLoadDistanceRate()">Update</button>
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


