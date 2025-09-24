<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Rate_Frederick.aspx.cs" Inherits="Frederick.Admin.Rate_Frederick" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Admin.js"></script>
    <script src="Scripts/Rate_Frederick.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="content-panel">
                        <h3>Rate</h3>
                        <button type="button" class="btn btn-primary  btn-xs pull-right" tooltip="Add Frederick" data-toggle="modal" data-target="#AddNew"><i class=" fa fa-plus-square" style="font-size: 14px"><b>Add</b></i></button>
                        <br />
                        <br />
                        <section id="no-more-tables">
                            <table class="table table-bordered table-striped table-condensed cf">
                                <thead class="cf">
                                    <tr>
                                        <th>S.N</th>
                                        <th>Frederick Name</th>
                                        <th>Airport Name</th>
                                        <th>Rate</th>
                                        <th>Vehicle</th>
                                        <%--<th>Vehicle Rate</th>--%>
                                        <th>Change Status</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody id="Details">
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <div class="modal fade" id="AddNew">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Add Frederick</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Fredrick Name :</label>
                                <select id="ddl_FredrickName" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Airport Name :</label>
                                <select id="ddl_AirportName" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Rate :</label>
                                <input id="txt_Rate" type="number" class="form-control" />
                                <input id="txt_VehicleRate" type="number" value="0" class="form-control" style="display:none;" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle :</label>
                                <select id="ddl_Vehicle" class="form-control"></select>
                            </div>
                        </div>
                        <%--<div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Rate :</label>
                                <input id="txt_VehicleRate" type="number" value="0" class="form-control" style="display:none;" />
                            </div>
                        </div>--%>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="btn-box">
                                    <button type="button" class="btn btn-primary" onclick="Add()">Add</button>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="Update">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Update Frederick</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Fredrick Name :</label>
                                <select id="ddl_FredrickName_Update" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Airport Name :</label>
                                <select id="ddl_AirportName_Update" class="form-control"></select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Rate :</label>
                                <input id="txt_Rate_Update" type="number" class="form-control" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle :</label>
                                <select id="ddl_Vehicle_Update" class="form-control"></select>
                                <input id="txt_VehicleRate_Update" value="0" type="number" class="form-control" style="display:none;"/>
                            </div>
                        </div>
                        <%--<div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Rate :</label>
                                <input id="txt_VehicleRate_Update" type="number" class="form-control" />
                            </div>
                        </div>--%>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="btn-box">
                                    <button type="button" class="btn btn-primary" onclick="UpdateRate()">Update</button>
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