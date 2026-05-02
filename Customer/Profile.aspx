<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="Profile.aspx.cs" Inherits="Frederick.Customer.Profile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Profile.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">
            <h3><i class="fa fa-angle-right"></i>Profile</h3>
            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <div class="row mt">
                        <div class="col-md-6 mb">
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label" for="email">First Name:</label>
                                    <div class="col-sm-9">
                                        <input id="txt_FirstName" class="form-control" placeholder="First Name" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label">Last Name:</label>
                                    <div class="col-sm-9">
                                        <input id="txt_LastName" class="form-control" placeholder="Last Name" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label">Gender:</label>
                                    <div class="col-sm-9">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" name="optionsGender" id="optionsRadios1" value="Male" checked>
                                                Male
                                            </label>
                                        </div>
                                        <div class="radio">
                                            <label>
                                                <input type="radio" name="optionsGender" id="optionsRadios2" value="Female">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label">Contact Number:</label>
                                    <div class="col-sm-9">
                                        <input id="txt_ContactNumber" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label">Address:</label>
                                    <div class="col-sm-9">
                                        <textarea id="txt_Address" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-md-6 mb">
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label" for="email">Email:</label>
                                    <div class="col-sm-9">
                                        <input id="txt_Email" class="form-control"  disabled="disabled"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label">Password:</label>
                                    <div class="col-sm-8">
                                        <input type="password" id="txt_Password" class="form-control" />                                        
                                    </div>
                                    <div class="col-md-1"> 
                                        <a  class="btn btn-danger  btn-sm" onclick="PasswordToggle();" id="togglePassword"><i class="fa fa-eye"></i></a>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="col-md-12 mb">
                                <div class="form-group">
                                    <label class="col-sm-3 col-sm-3 control-label" for="email">&nbsp;</label>
                                    <div class="col-sm-9">
                                        <button type="button" onclick="UpdateProfile()" class="btn btn-primary">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                </div>
            </div>
        </section>
    </section>
</asp:Content>
