<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="VehicleManufacturer.aspx.cs" Inherits="Frederick.Admin.VehicleManufacturer" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Admin.js"></script>
    <script src="Scripts/VehicleManufacturer.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                            <div class="content-panel"><h3>Car Manufacturer</h3>
                                <button  type="button" class="btn btn-primary  btn-xs pull-right"  tooltip="Add Manufacturer" data-toggle="modal" data-target="#Makevehicle"><i class=" fa fa-edit">Add Manufacturer</i></button>
                                <br /><br />
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
                                                <th>Edit</th>
                                               <%-- <th>Edit</th>--%>
                                            </tr>
                                        </thead>
                                        <tbody id="CarManufacturer">
                                            
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                </div>
            </div>

        </section>
    </section>

    <div class="modal fade" id="Makevehicle">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Add Vehicle Type</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="txttype" placeholder="Enter Type"/>
                    </div>
                </div>
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="submit" class="btn btn-primary" onclick="AddVehicleMake()">Add</button>
                </div>
            </div>
                        </div>
                <div class="clearfix"></div>
            </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="updateMake">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Update Vehicle Type</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Enter Vehicle Type</label>
                        <input type="text" class="form-control" id="utxttype" placeholder="Enter Type"/>
                    </div>
                </div>
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="button" class="btn btn-primary" onclick="UpdateVehicleMake()">Update</button>
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


