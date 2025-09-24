<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="DispatcherDetails.aspx.cs" Inherits="Frederick.Admin.DispatcherDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Admin.js"></script>
    <script src="Scripts/DispatcherDetails.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <h3>Add Dispatcher</h3>
                    <div class="row">
                        
                        <div class="col-md-3 mb">
                            <input id="RegFName" class="form-control" list="Name" autocomplete="off" placeholder="First Name">
                        </div>
                        <div class="col-md-3 mb">
                            <input id="RegLName" class="form-control" list="Last Name" autocomplete="off" placeholder="Last Name">
                        </div>
                        <div class="col-md-3 mb">
                            <select class="form-control" id="SelGender">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <input id="RegPhoneNo" type="text" class=" form-control" placeholder="Mobile No">
                        </div>
                        <div class="col-md-6 mb">
                            <input id="RegAddress" class="form-control" list="Address" autocomplete="off" placeholder="Address"/>
                        </div>
                        <div class="col-md-3 mb">
                            <input id="RegEmailAddress" type="text" class=" form-control" placeholder="Email"/>
                        </div>
                        <div class="col-md-2 mb">
                            <input id="RegPassword" type="password" class=" form-control" placeholder="Password"/>
                        </div>
                        <div class="col-md-1 mb">
                            <button type="button" class="btn btn-primary" onclick="AddDispatcher()">Add</button>
                            <%--<input type="submit" onclick="AddUpdateDriver()" class="btn btn-primary" value="Add" title="Add/Update Driver" id="btn_RegisterDriver">--%>
                        </div>
                    </div>
                    <div class="row mt">
                        <div class="col-lg-12">
                            <div class="content-panel"><h3>Dispatcher Details</h3>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N	</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th class="numeric">Mobile</th>
                                                <th class="numeric">Address</th>
                                                <th class="numeric">Edit</th>
                                                <th class="numeric">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="DispatcherDetails">
                                           
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
     <div class="modal fade" id="OpenPopupCDetails">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Update Dispatcher </h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control" id="UFname" placeholder="First Name"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" class="form-control" id="ULname" placeholder="Last Name"/>
                    </div>
                </div>
                        <div class="col-md-6">
                    <div class="form-group">
                        <label>Gender</label>
                        <select class="form-control" id="USelGender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                    </div>
                </div>
                        <div class="col-md-6">
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="text" class="form-control" id="URegPhoneNo" placeholder="Phone Number"/>
                    </div>
                </div>
                        <div class="col-md-12">
                        <div class="form-group">
                <label>Adderess</label>
                <input type="text" class="form-control" id="UAddress" placeholder="Adderess"/>
            </div>
                            </div>
                        <div class="col-md-6">
                    <div class="form-group">
                <label>Email Adderess</label>
                  <input type="text" class="form-control" id="URegEmailAddress" placeholder="Email Adderess"/>
            </div>
                </div>
                        <div class="col-md-6">
                   <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" id="URegPassword" placeholder="Password"/>
            </div>
                </div>
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="button" class="btn btn-primary" onclick="UpdateDispatcher()">Update</button>
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

