<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Calender.aspx.cs" Inherits="Frederick.Admin.Calender" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      
    <!--external css-->
    <link href="assets/js/fullcalendar/bootstrap-fullcalendar.css" rel="stylesheet" />
        
    <!-- Custom styles for this template -->
    <link href="assets/css/style.css" rel="stylesheet"/>
    <link href="assets/css/style-responsive.css" rel="stylesheet"/>
    <style>
        .mt h3 {
	color: #ffffff;
	font-size: 16px;
	padding: 0 10px;
	line-height: 60px;
	height: 60px;
	margin: 0;
	background: #dc3545;
	text-align: center;
}
       
.mt .desc {
	border-bottom: 1px solid #eaeaea;
	display: inline-block;
	padding: 10px 0;
	width: 100%;
    cursor:pointer;
}


.mt .thumb {
	width: 30px;
	margin: 0 10px 0 20px;
	display: block;
	float: left;
}


.mt > .desc p {
	font-size: 12px;
    font-weight:bold;
}


.mt a {
	color: #dc3545;
    font-weight:bold;
    font-size:small;
}

    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <!--main content start-->
      <section id="main-content">
          <section class="wrapper">
              <!-- page start-->
              <div class="row mt">
                  <div class="col-lg-8 mt">
                      <section class="panel">
                          <div class="panel-body">
                              <div id="calendar1" class="has-toolbar"></div>
                          </div>
                      </section>
                  </div>
                   <div class="col-lg-4 mt">
                    <!--COMPLETED ACTIONS DONUTS CHART-->
						<h3>UPCOMING RESERVATIONS</h3>
                      <div id="bookings">
                         
                      </div>             
                  </div>
              </div>
              <!-- page end-->
		</section>
      </section><!-- /MAIN CONTENT -->

    
    <!-- js placed at the end of the document so the pages load faster -->
    <script src="assets/js/jquery-ui-1.9.2.custom.min.js"></script>
	<script src="assets/js/fullcalendar/fullcalendar.min.js"></script> 
    <script src="Scripts/calender1.js"></script>
    
</asp:Content>

