<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="CommentList.aspx.cs" Inherits="Frederick.Admin.CommentList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/comments.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                            <div class="content-panel"><h3>Comments</h3>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Name</th>
                                                <th>Comment</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Date</th>
                                                <th>Activate | Deactivate</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody id="comments">
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
                </div>
            </div>

        </section>
    </section>
</asp:Content>

