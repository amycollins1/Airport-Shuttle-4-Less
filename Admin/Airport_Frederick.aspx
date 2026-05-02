<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Airport_Frederick.aspx.cs" Inherits="Frederick.Admin.Airport_Frederick1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Admin.js"></script>
    <script src="Scripts/Airport_Frederick.js"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                            <div class="content-panel"><h3>Frederick Airport</h3>
                            <button  type="button" class="btn btn-primary  btn-xs pull-right"  tooltip="Add Airport" data-toggle="modal" data-target="#AddNew"><i class=" fa fa-plus-square" style="font-size:14px"> <b>Add</b></i></button>
                                <br /><br />
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
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
                    <h4 class="modal-title" id="" align="center">Add Frederick Airport</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="txt_Mname" placeholder="Enter Name"/>
                    </div>
                </div>
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="submit" class="btn btn-primary" onclick="Add()">Add</button>
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
                    <h4 class="modal-title" id="" align="center">Update Frederick Airport</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Enter Name</label>
                        <input type="text" class="form-control" id="Name" placeholder="Enter Name"/>
                    </div>
                </div>
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="button" class="btn btn-primary" onclick="UpdateAirport()">Update</button>
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


