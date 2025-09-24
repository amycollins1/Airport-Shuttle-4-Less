<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="SnowRate.aspx.cs" Inherits="Frederick.Admin.SnowRate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/SnowRate.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                    <h3>Update Snow Charges</h3>
                    <h4 class="mt">Current Snow Charges is <b id="CurrentSnow"></b></h4>
                    <div class="row mt">
                       
                        <div class="col-md-3 mb">
                            <select class="form-control" id="SelSnow">
                            </select>
                        </div>
                        <div class="col-md-1 mb">
                            <button type="button" class="btn btn-primary" onclick="UpdateSnowCharges()">Submit</button>
                            <%--<input type="submit" onclick="AddUpdateDriver()" class="btn btn-primary" value="Add" title="Add/Update Driver" id="btn_RegisterDriver">--%>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </section>
</asp:Content>
