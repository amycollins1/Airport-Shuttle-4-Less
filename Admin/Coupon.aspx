<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Coupon.aspx.cs" Inherits="Frederick.Admin.Coupon" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/offer.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <h3>Add Coupons</h3>
                    <div class="row">
                        
                        <div class="col-md-3 mb">
                            <input id="offrname" class="form-control" list="Offer Name" autocomplete="off" placeholder="Offer Name">
                        </div>
                        <div class="col-md-3 mb">
                            <input id="offrcode" class="form-control" list="Offer Code" autocomplete="off" placeholder="Offer Code">
                        </div>
                        <div class="col-md-3 mb">
                            <input id="ofrpercent" type="text" class=" form-control" placeholder="Offer Percent">
                        </div>
                        <div class="col-md-3 mb">
                            <button type="button" class="btn btn-primary" onclick="InsertCoupon()">Add</button>
                            <%--<input type="submit" onclick="AddUpdateDriver()" class="btn btn-primary" value="Add" title="Add/Update Driver" id="btn_RegisterDriver">--%>
                        </div>
                    </div>
                    <div class="row mt">
                        <div class="col-lg-12">
                            <div class="content-panel"><h3>Coupon Details</h3>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Offer Name</th>
                                                <th class="numeric">Offer Code</th>
                                                <th class="numeric">Offer Percent</th>
                                                <th class="numeric">Edit</th>
                                                <th class="numeric">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbl_CouponDetails">
                                            <tr>
                                                <td data-title=""></td>
                                                <td data-title=""></td>
                                                <td class="numeric" data-title=""></td>
                                                <td class="numeric" data-title=""></td>
                                                <td class="numeric" data-title="">
                                                    <a style="cursor: pointer" onclick="UpdateDriver('50090','Shahid Anwar','Nagpur','','9028383838','shahidanwar888@gmail.com','Male','','','Driver-19676280091.PNG','Driver-19676280092.PNG','Driver-19676280093.PNG','10','1967628009')" href="#">
                                                        <span class="glyphicon glyphicon-edit" title="Edit" aria-hidden="true"></span></a> 
                                                </td>
                                                <td class="numeric" data-title="">
                                                    <a style="cursor: pointer" onclick="UpdateDriver('50090','Shahid Anwar','Nagpur','','9028383838','shahidanwar888@gmail.com','Male','','','Driver-19676280091.PNG','Driver-19676280092.PNG','Driver-19676280093.PNG','10','1967628009')" href="#">
                                                        <span class="glyphicon glyphicon-edit" title="Active" aria-hidden="true"></span></a> 
                                                   
                                                </td>
                                            </tr>
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
      <div class="modal fade" id="OpenPopupOffer">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Add Customer</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Offer Name</label>
                        <input type="text" class="form-control" id="Uoffrname" placeholder="Offer Name"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Offer Code</label>
                        <input type="text" class="form-control" id="Uoffrcode" placeholder="Offer Code"/>
                    </div>
                </div>
                        <div class="col-md-6">
                    <div class="form-group">
                        <label>Offer Percent</label>
                        <input type="text" class="form-control" id="Uofrpercent" placeholder="Offer Percent"/>
                    </div>
                </div>
                        
                        <div class="col-md-12">
                            <div class="form-group">
                <div class="btn-box">
                    <button type="button" class="btn btn-primary" onclick="UpdateOffer()">Update</button>
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

