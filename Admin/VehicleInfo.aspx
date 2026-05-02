<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="VehicleInfo.aspx.cs" Inherits="Frederick.Admin.VehicleInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Scripts/VehicleInfo.js"></script>
    <script src="Scripts/Admin.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section id="main-content">
        <section class="wrapper">

            <div class="row form-panel">
                <div class="col-lg-12 main-chart">
                            <div class="content-panel"><h3>Car Info</h3>
                                <%--<button  type="button" class="btn btn-primary  btn-xs pull-right"  tooltip="Add Vehicle Info" data-toggle="modal" data-target="#vehicleinfo"><i class=" fa fa-edit">Add Vehicle Info</i></button>--%>
                                <button  type="button" class="btn btn-primary  btn-xs pull-right"  tooltip="Add Vehicle Info" onclick="OpenPopup(0)"><i class=" fa fa-edit">Add Vehicle Info</i></button>
                                <br /><br />
                                <section id="no-more-tables">
                                    <table class="table table-bordered table-striped table-condensed cf" id="VehicleInfoList">
                                        <thead class="cf">
                                            <tr>
                                                <th>S.N</th>
                                                <th>Vehicle Make</th>
                                                <th>Vehicle Type</th>
                                                <th>Model</th>
                                                <th>Reg_Year</th>
                                                <th>Max Capacity</th>
                                                <th>Allowed Capacity(Base Fare)</th>                                                
                                                <th>Max Baggage</th>
                                                <th>Allowed Baggage(Base Fare)</th>
                                                <th>Edit</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                </div>
            </div>

        </section>
    </section>

    <div class="modal fade" id="vehicleinfo">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Add Vehicle Info</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="hdn_ProfileMapPath" value="0" /> 
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Manufacturer</label>
                                <select id="VehicleinfoMake" class="form-control">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Type</label>
                                <select id="VehicleinfoType" class="form-control">

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Model </label>
                                <input type="text" class="form-control" id="txtmodel" placeholder="Model " />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Registration Year</label>
                                <input type="text" class="form-control" id="txtregyear" placeholder="Registration Year" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Maximum Capacity</label>
                                <input type="text" class="form-control" id="txtmaxcapacity" placeholder="Maximum Capacity" />
                            </div>
                        </div>
                         <div class="col-md-6">
                            <div class="form-group">
                                <label>Capacity Allowed (with Base Price)</label>
                                <input type="text" class="form-control" id="txtmincapacity" placeholder="Minimum Capacity" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Maximum Baggage</label>
                                <input type="text" class="form-control" id="txtmaxbaggage" placeholder="Maximum Baggage" />
                            </div>
                        </div>
                         <div class="col-md-6">
                            <div class="form-group">
                                <label>Baggage Allowed (with Base Price)</label>
                                <input type="text" class="form-control" id="txtminbaggage" placeholder="Minimum Baggage" />
                            </div>
                        </div>
                         
                        <div class="row">
                            <div class="col-md-8">
                                <div class="col-md-6">
                                    <label>Base Charge</label>
                                    <input type="text" class="form-control" id="txtBaseCharge" placeholder="Base Charge" />
                                </div>
                                <div class="col-md-6">
                                    <label>Per Mile</label>
                                    <input type="text" class="form-control" id="txtPerMile" placeholder="Per Mile" />
                                </div>
                                <div class="col-md-6">
                                    <label>Min Hours</label>
                                    <input type="text" class="form-control" id="txtMinHours" placeholder="Min Hours" />
                                </div>
                                <div class="col-md-6">
                                    <label>Per Hour</label>
                                    <input type="text" class="form-control" id="txtPerHour" placeholder="Per Hour" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label>Upload Image</label>
                                <div id="dvPreview"></div>
                                <input id="Profile" type="file" />
                                <br />
                                 <a id="hrefImgProfile" target="_blank"> <img id="ImgProfile"></a> 
                            </div>
                        </div> 
                        <div class="clearfix"></div>
                    </div>           
                        <div class="modal-footer">
                            <div class="form-group">
                                <div class="btn-box">
                                    <button type="button" id="btnAdd" class="btn btn-primary" onclick="AddVehicleInfo()">Add</button>
                                     <button type="button"  id="btnUpdate" class="btn btn-primary" onclick="UpdateVehicleInfo()" style="display:none;">Update</button>
                                </div>
                            </div>
                        </div>
                     
                </div>
            </div>
        </div>
    </div>

    
                    
    <%--<div class="modal fade" id="updatevehicleinfo">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="" align="center">Update Vehicle Info</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Manufacturer</label>
                                <select id="UVehicleinfoMake" class="form-control">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Vehicle Type</label>
                                <select id="UVehicleinfoType" class="form-control">

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Model </label>
                                <input type="text" class="form-control" id="utxtmodel" placeholder="Model " />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Registration Year</label>
                                <input type="text" class="form-control" id="utxtregyear" placeholder="Registration Year" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Maximum Capacity</label>
                                <input type="text" class="form-control" id="utxtmaxcapacity" placeholder="Maximum Capacity" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Capacity Allowed (with Base Price)</label>
                                <input type="text" class="form-control" id="utxtmincapacity" placeholder="Minimum Capacity" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Maximum Baggage</label>
                                <input type="text" class="form-control" id="utxtmaxbaggage" placeholder="Maximum Baggage" />
                            </div>
                        </div>
                         <div class="col-md-6">
                            <div class="form-group">
                                <label>Baggage Allowed (with Base Price)</label>
                                <input type="text" class="form-control" id="utxtminbaggage" placeholder="Minimum Baggage" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="btn-box">
                                    <button type="submit" class="btn btn-primary" onclick="UpdateVehicleInfo()">Update</button>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
</asp:Content>

