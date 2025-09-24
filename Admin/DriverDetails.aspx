<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="DriverDetails.aspx.cs" Inherits="Frederick.Admin.DriverDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/Driver.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section id="main-content">
        <section class="wrapper">
            
            <div class="row form-panel">
                <div class="col-lg-12 main-chart"> 
                   <%-- <div class="row">
                        
                        <div class="col-md-3 mb">
                            <input id="Fname" class="form-control" list="Name" autocomplete="off" placeholder="First Name">
                        </div>
                        <div class="col-md-3 mb">
                            <input id="Lname" class="form-control" list="Last Name" autocomplete="off" placeholder="Last Name">
                        </div>
                        <div class="col-md-3 mb">
                            <select class="form-control" id="SelGender">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div class="col-md-3 mb">
                            <input id="Mobile" type="text" class=" form-control" placeholder="Mobile No">
                        </div>
                        <div class="col-md-3 mb">
                            <input id="Address" class="form-control" list="Address" autocomplete="off" placeholder="Address"/>
                        </div>
                        <div class="col-md-3 mb">
                            <select id="Select_Percentage" class="form-control">
                                                    <option value="0" selected="selected">Select Percentage</option>
                                                    <option value="10">10 </option>
                                                    <option value="15">15 </option>
                                                    <option value="20">20 </option>
                                                    <option value="25">25 </option>
                                                    <option value="30">30 </option>
                                                    <option value="40">40 </option>
                                                    <option value="50">50 </option>
                                                </select>
                        </div>
                        <div class="col-md-3 mb">
                            <input id="Email" type="text" class=" form-control" placeholder="Email"/>
                        </div>
                        <div class="col-md-2 mb">
                            <input id="Password" type="password" class=" form-control" placeholder="Password"/>
                        </div>
                        <div class="col-md-1 mb">
                            <button type="button" class="btn btn-primary" onclick="AddUpdateDriver()">Add</button> 
                        </div>
                    </div>--%>
                    <div class="row mt">
                        <div class="col-lg-12">
                            <div class="content-panel"><h3>Driver Details</h3>
                                <button type="button" class="btn btn-primary  btn-xs pull-right" data-toggle="modal" onclick="OpenPopup(0)"><i class=" fa fa-plus-square" style="font-size: 14px"><b>Add</b></i></button>
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf">
                                        <thead class="cf">
                                            <tr>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th class="numeric">Email</th>
                                                <th class="numeric">Percentage</th>
                                                <th class="numeric">Edit</th>
                                                <th class="numeric">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="DriverDetails">
                                            
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
    <div class="modal fade" id="PopupDriver">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="lblDriverheader" align="center">Add Driver</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="hdn_id" value="0" />
                            <input type="hidden" id="hdn_ProfileMapPath" value="0" />
                            <input type="hidden" id="hdn_LicenseMapPath" value="0" />
                            <input type="hidden" id="hdn_DocumentsMapPath" value="0" />
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" class="form-control" id="Fname" placeholder="First Name" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" class="form-control" id="Lname" placeholder="Last Name" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Gender</label>
                                <select class="form-control" id="SelGender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Mobile Number</label>
                                <input type="text" class="form-control" id="Mobile" placeholder="Mobile Number" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Percentage</label>
                                <select id="Select_Percentage" class="form-control">
                                    <option value="0" selected="selected">Select Percentage</option>
                                    <option value="10">10 </option>
                                    <option value="15">15 </option>
                                    <option value="20">20 </option>
                                    <option value="25">25 </option>
                                    <option value="30">30 </option>
                                    <option value="40">40 </option>
                                    <option value="50">50 </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" class="form-control" id="Address" placeholder="Address" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="text" class="form-control" id="Email" placeholder="Email Address" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" id="Password" placeholder="Password" />
                            </div>
                        </div>
                        
                       
                    </div>
                     <div class="row" id="divDocs">
                         <div class="col-md-4">
                             <label>Upload Profile</label>
                             <div id="dvPreview"></div>
                             <input id="Profile" type="file"/> 
                         </div>
                         <div class="col-md-4">
                             <label>Upload License</label>
                             <div id="dvPreview2"></div> 
                             <input id="LicenceUpload1" type="file"/>                              
                         </div>
                         <div class="col-md-4">
                             <label>Upload Document</label>
                             <div id="dvPreview3"></div>
                             <input id="LicenceUpload2" type="file"/> 
                         </div>
                          <div class="col-md-4">
                                <a id="hrefImgProfile" target="_blank"> <img id="ImgProfile"></a> 
                          </div>
                         <div class="col-md-4">
                              <a id="hrefImgLicenceUpload1" target="_blank"><img id="ImgLicenceUpload1"></a>
                          </div>
                         <div class="col-md-4">
                             <a id="hrefImgLicenceUpload2" target="_blank"> <img id="ImgLicenceUpload2"></a>
                          </div>
                     </div> 
                     <div class="clearfix"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="AddUpdateDriver()" id="btn_RegisterDriver">Update</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
