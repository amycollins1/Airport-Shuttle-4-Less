using Frederick.BL;
using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Admin.Handler
{
    /// <summary>
    /// Summary description for ReservationHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ReservationHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        #region Booking
 
        [WebMethod(EnableSession = true)]
        public string CancelBooking(int BookingSid)
        {
            try
            { 
                tbl_Login Driver = new tbl_Login();
                tbl_Reservation Reservation = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);
                string DriverName = Reservation.DriverName;
                var DriverSid = Reservation.DriverId;
                if (Reservation.Status == "Cancelled")
                {
                    return jsSerializer.Serialize(new { Retcode = 1 }); 
                }

                Reservation.Status = "Cancelled";
                DB.SubmitChanges();

                EmailManager.CustomerBody(Reservation.ReservationId);

                //if (DriverName != null)
                //{
                //    Driver = DB.tbl_Logins.Single(x => x.Sid == DriverSid);
                //}

                //tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);
                //tbl_VehInfo VehicleInfo = new tbl_VehInfo();
                //VehicleInfo = DB.tbl_VehInfos.Single(x => x.Sid == Convert.ToInt64(Booking.VehicleId));
                //StringBuilder sb = new StringBuilder();
                //StringBuilder sbDriver = new StringBuilder();

                #region Email commented on 28-09-2024 & using centralized system
                #region Customer Mail
                //sb.Append("<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
                //sb.Append("<title>www.bwishuttleservice.com- Customer Receipt</title>  ");
                //sb.Append("<style>                                            ");
                //sb.Append(".Norm {font-family: Verdana;                       ");
                //sb.Append("font-size: 12px;                                 ");
                //sb.Append("font-color: red;                               ");
                //sb.Append(" }                                               ");
                //sb.Append(".heading {font-family: Verdana;                   ");
                //sb.Append("  font-size: 14px;                            ");
                //sb.Append("  font-weight: 800;                           ");
                //sb.Append("	 }                                                  ");
                //sb.Append("   td {font-family: Verdana;                         ");
                //sb.Append("	  font-size: 12px;                                  ");
                //sb.Append("	 }                                                  ");
                //sb.Append("  </style>                                           ");
                //sb.Append("<style>				.askemmy {					background: #fff url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/logo_housefly_new.png) no-repeat right 5px bottom 5px;					background-size: 45px;				}				.askemmy {				    z-index: 10000;				    position: fixed;				    display: block;				    width: 350px;				    height: 145px;				    background-color: white;				    border-radius: 2px;				    box-shadow: rgb(133, 133, 133) 0px 0px 25px 1px;				    margin: 0 auto;				    text-align: center;				    margin-left: 35%;				    margin-top: 10%;				}				.askemmy p#msg {				    font-size: 1.1em;				    font-weight: 600;				    margin-top: 31px;				    margin-bottom: 20px;				}				.askemmy .error-msg {					color: #FF5600;					padding-top: 10px;				}				.askemmy .success-msg {					color: green;					padding-top: 10px;				}				.askemmy input {				    padding: .5em .6em;				    display: inline-block;				    border: 1px solid #ccc;				    box-shadow: inset 0 1px 3px #ddd;				    border-radius: 4px;				    vertical-align: middle;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				    line-height: normal;				    -webkit-appearance: textfield;				    cursor: auto;				 }				 .askemmy input[type='submit'] {				    font-family: inherit;				    font-size: 100%;				    padding: .5em 1em;				    color: white;				    font-weight: 600;				    border: 1px solid #999;				    border: 0 rgba(0,0,0,0);				    background-color: rgba(31, 196, 255, .8);				    text-decoration: none;				    border-radius: 2px;				    display: inline-block;				    zoom: 1;				    line-height: normal;				    white-space: nowrap;				    vertical-align: middle;				    text-align: center;				    cursor: pointer;				    -webkit-user-drag: none;				    -webkit-user-select: none;				    user-select: none;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				 }				.askemmy .closebox {				    display: inline-block;				    height: 16px;				    width: 16px;				    position: absolute;				    right: 4px;				    top: 4px;				    cursor: pointer;				    background: url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/close_box.png)				}				</style></head>");
                //sb.Append("<body marginwidth='0' marginheight='0' topmargin='0' leftmargin='0' rightmargin='0' bottommargin='0'>");
                //sb.Append("");
                //sb.Append("<br><table border='0' width='700' cellspacing='0' cellpadding='0' align='Center'>");
                //sb.Append("  <tbody><tr>");
                //sb.Append("    <td width='660' colspan='13' valign='top'>");
                //sb.Append("      <table width='100%'>");
                //sb.Append("        <tbody><tr>");
                ////sb.Append("          <td colspan='2' width='100%' class='heading'><b>AirportShuttles4Less (AS4L)</b></td>");
                //sb.Append("        </tr>");
                ////sb.Append("        <tr>");
                ////sb.Append("          <td colspan='2' width='100%'><a href='https://www.airportshuttles4less.com'>https://www.airportshuttles4less.com<</a></td>");
                ////sb.Append("        </tr>");
                //sb.Append("        <tr>");
                //sb.Append("          <td colspan='3' width='100%'><a href='https://www.airportshuttles4less.com<'>https://www.airportshuttles4less.com<</a></td>");
                //sb.Append("        </tr>");
                //sb.Append("        <tr>");
                //sb.Append("          <td colspan='3' width='100%'><a href='mailto:airportshuttle4less@gmail.com'>airportshuttle4less@gmail.com</a></td>");
                //sb.Append("        </tr>");
                //sb.Append("        <tr>");
                //sb.Append("          <td colspan='2' width='25%'>Call Us: 1-844-904-5151, 410-904-5151</td>");
                //sb.Append("          <td width='75%' align='right'><font size='3'>");
                //sb.Append("		Receipt");
                //sb.Append("	     </font></td>");
                //sb.Append("        </tr>");
                //sb.Append("      </tbody></table>");
                //sb.Append("     </td>");
                //sb.Append("  </tr><tr>");
                //sb.Append("  </tr><tr>");
                //sb.Append("    <td colspan='13' width='660'>");
                //sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                //sb.Append("  	<tbody><tr>");
                //sb.Append("  	  <td width='70%' style='border-bottom:medium solid blue; font-size:16px'><b>Reservation # " + Booking.ReservationId + "</b></td>");
                ////DateTime Sdate = GetAppDate(Booking.Date.Split(' ')[0]);
                ////string SerDate = Sdate.ToString("MM-dd-yyyy");
                //sb.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Booking.CreatedDate.Split(' ')[0] + "</td>");
                //sb.Append("  	</tr>");
                //sb.Append("  	<tr>");
                //sb.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Reservation has been cancelled! Below please find your Details. If any of the information appears to be incorrect, please contact our office immediately to correct it.<br>&nbsp;</td>");
                //sb.Append("	</tr>");
                //sb.Append("      </tbody></table>");
                //sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                //sb.Append("	<tbody><tr>");

                //sb.Append("	  <td class='heading'>Pick-up Date:</td>");
                //sb.Append("	  <td width='75%'>" + Booking.ReservationDate + "</td>");
                ////sb.Append("	  <td width='75%'>" + EmailManager.GetDate(Booking.ReservationDate) + "</td>");
                //sb.Append("	</tr>                                             ");

                //sb.Append("	<tr>                                              ");
                //sb.Append("	  <td class='heading'>Pickup Time:</td>          ");
                ////if (Booking.Service == "Point To Point Reservation" || Booking.Service == "Hourly Reservation")
                ////{
                ////    if (Booking.Time == null && Booking.Service == "Point To Point Reservation")
                ////    {
                ////        sb.Append("	  <td width='75%'>" + Booking.Time + "</td>");
                ////    }
                ////    else
                ////        sb.Append("	  <td width='75%'>" + Booking.Time + "</td>");
                ////}

                ////else if (Booking.Service == "To Airport" || Booking.Service == "To Airport Shuttle")
                ////    sb.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.Pickup_Time) + "</td>");
                ////else if (Booking.Service == "From Airport" || Booking.Service == "From Airport Shuttle")
                ////    sb.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.FlightTime) + "</td>");
                ////else
                ////{
                ////    if (Booking.Ret_FlightTime != null)
                ////        sb.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.Ret_FlightTime) + "</td>");
                ////    else
                ////        sb.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.FlightTime) + "</td>");
                ////}
                //sb.Append("	  <td width='75%'>" + Booking.Time + "</td>");

                //sb.Append("	</tr>                                             ");
                //sb.Append("	<tr>                                              ");
                //sb.Append("	  <td class='heading' valign='Top' style='border-bottom:thin solid green;'>Vehicle Type:</td>           ");
                //sb.Append("	  <td width='75%' style='border-bottom:thin solid green;'>                                              ");
                //sb.Append("	  " + VehicleInfo.Model + "<br>&nbsp;</td>                                                                                    ");
                //sb.Append("	</tr>      ");


                //sb.Append("	<tr>                                              ");
                //sb.Append("	  <td class='heading'>Primary Contact:</td>       ");
                //sb.Append("	  <td width='75%'>" + Booking.FirstName + " " + Booking.LastName + "</td>           ");
                //sb.Append("	</tr>                                             ");
                //sb.Append("	<tr>                                              ");
                //sb.Append("	  <td class='heading'>Contact Number:</td>        ");
                //if (Booking.PhoneNo == "" || Booking.PhoneNo == null)
                //{
                //    sb.Append("	  <td width='75%'>" + Booking.AltPhoneNo + "</td>               ");
                //}
                //else
                //{
                //    sb.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>               ");
                //}
                //sb.Append("	</tr>                                             ");
                //sb.Append("	<tr>                                              ");
                //sb.Append("	  <td class='heading'>No. of Passenger:</td>         ");
                //sb.Append("	  <td width='75%'>" + Booking.Passenger + "</td>                          ");
                //sb.Append("	</tr>                                             ");
                ////sb.Append("	<tr>                                              ");
                ////sb.Append("	  <td class='heading'>No. of Children:</td>       ");
                ////sb.Append("	  <td width='75%'>" + Booking.Child + "</td>                          ");
                ////sb.Append("	</tr>	                                          ");
                //if (Booking.Service == "Hourly Reservation")
                //{
                //    sb.Append("	<tr>                                              ");
                //    sb.Append("	  <td class='heading'>Hours:</td>         ");
                //    sb.Append("	  <td width='75%'>" + Booking.Hours + "</td>                          ");
                //    sb.Append("	</tr>");
                //}
                ////sb.Append("	<tr>                                              ");
                ////sb.Append("	  <td class='heading' valign='Top' style='border-bottom:thin solid green;'>Vehicle Type:</td>           ");
                ////sb.Append("	  <td width='75%' style='border-bottom:thin solid green;'>                                              ");
                ////sb.Append("	  " + Booking.VehicalType + "<br>&nbsp;</td>                                                                                    ");
                ////sb.Append("	</tr>                                                                                                   ");
                //sb.Append(EmailManager.BookingDetails(Booking));
                ////sb.Append("	<tr>                                                                                                    ");
                ////sb.Append("	  <td class='heading'>Trip Routing Information:</td>                                                    ");
                ////sb.Append("	                                                                                                        ");
                ////sb.Append("	  <td><b>Pick-up Location: &nbsp;</b>" + Booking.PickUpAddress + "</td>                         ");
                ////sb.Append("	                                                                                                        ");
                ////sb.Append("	</tr>                                                                                                   ");

                ////sb.Append("	<tr>                                                                                                    ");
                ////sb.Append("	  <td class='heading'>&nbsp;</td>                                                                       ");
                ////sb.Append("	  <td><b>Pick-up Instructions: &nbsp;</b>your reservation is canceled by xx/xx/2016<br>&nbsp;</td>      ");
                ////sb.Append("	</tr>	                                                                                                ");
                ////sb.Append("                                                                                                         ");
                ////sb.Append("	<tr>                                                                                                    ");
                ////sb.Append("	  <td class='heading'>&nbsp;</td>                                                                       ");
                ////sb.Append("	                                                                                                        ");
                ////sb.Append("	  <td><b>Drop-off Location: &nbsp;</b>" + Booking.DropAddress + "</td>                                                  ");
                ////sb.Append("	                                                                                                        ");
                ////sb.Append("	</tr>	                                                                                                ");
                //sb.Append("        <tr>                                                                                             ");
                //sb.Append("          <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>                            ");
                //sb.Append("        </tr>                                                                                            ");
                //sb.Append("                                                                                                         ");
                ////sb.Append("	<tr>                                                                                                    ");
                ////sb.Append("	  <td class='heading' valign='top'>Payment Method:</td>                                                 ");
                ////sb.Append("	  <td width='75%'>" + Booking.CCPayment + "<br>&nbsp;</td>                                                            ");
                ////sb.Append("	</tr>                                                                                                   ");
                //sb.Append("                                                                                                         ");
                //sb.Append("                                                                                                         ");
                //if (Booking.CardType != null)
                //{
                //    sb.Append(" 	<tr>                                                                                                ");
                //    sb.Append("	  <td class='heading'>Payment Method:</td>                                                                 ");
                //    sb.Append("	  <td>" + Booking.CardType + "**" + Booking.CardLast4 + "");
                //    sb.Append("	</td></tr>                                                                                              ");
                //}
                //sb.Append(" 	<tr>                                                                                                ");
                //sb.Append("	  <td class='heading'>Quoted Rate:</td>                                                                 ");
                //sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.Fare), 2) + "                                                                                         ");
                //sb.Append("	</td></tr>                                                                                              ");
                //sb.Append("                                                                                                         ");
                //sb.Append("	<tr>                                                                                                    ");
                //sb.Append("	  <td class='heading'>Gratuity:</td>                                                                    ");
                //sb.Append("	  <td>$ " + Booking.Gratuity + "                                                                                          ");
                //sb.Append("	</td></tr>                                                                                              ");
                //if (Booking.IsMeetAndGreet == true)
                //{
                //    sb.Append(" 	<tr>                                                                                                ");
                //    sb.Append("	  <td class='heading'>Meet Great:</td>                                                                 ");
                //    sb.Append("	  <td>$ " + 10 + "                                                                                         ");
                //    sb.Append("	</td></tr>     ");
                //}
                //sb.Append("                                                                                                         ");
                //sb.Append("	<tr>                                                                                                    ");
                //sb.Append("	  <td class='heading'>Reservation Total:</td>                                                           ");
                //sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.TotalFare), 2) + "                                                                                         ");
                //sb.Append("	</td></tr>                                                                                              ");
                //sb.Append("	<tr>                                                                                                    ");
                //sb.Append("	  <td class='heading' valign='top'><font color='red'>Total Due:</font></td>");
                //decimal TotalDue = 0;
                //if (Convert.ToBoolean(Booking.IsPaid))
                //{
                //    TotalDue = decimal.Round(Convert.ToDecimal(TotalDue), 2);
                //}
                //else
                //{
                //    TotalDue = decimal.Round(Convert.ToDecimal(Booking.TotalFare), 2);
                //}
                //sb.Append("	  <td><font color='red'>$ " + TotalDue + "<br>&nbsp;</font>");
                //sb.Append("	</td></tr>");
                //sb.Append("	<tr>                                                                                                    ");
                //sb.Append("	  <td class='heading' valign='top'><font color='red'>Note:</font></td>");
                //sb.Append("	  <td><font color='red'><b>Late Night Charges and extra service charges may not show in 'Quoted Rate'. It will automatically add up in Reservation Total</b></font>");
                //sb.Append("	</td></tr>");
                //sb.Append("        <tr>                                                                                             ");
                //sb.Append("          <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>                            ");
                //sb.Append("        </tr>                                                                                            ");
                //sb.Append("                                                                                                         ");
                ////sb.Append("	  <td style='border-bottom:thin solid green;'><font color='red'>$ " + TotalDue + "<br>&nbsp;</font></td>");
                ////sb.Append("	</tr>                                                                                              ");
                //sb.Append("	<tr>                                                                                               ");
                //sb.Append("	  <td class='heading' valign='top'>Terms &amp; Conditions / Reservation Agreement:</td>            ");
                //sb.Append("	  <td>Guest agrees that there will be no smoking in our vehicles.<br>                              ");
                //sb.Append("		Guest assures that no illegal drugs are brought into our vehicles.<br>                         ");
                //sb.Append("		Guest agrees that no alcoholic beverages shall be brought into our vehicles.                   ");
                //sb.Append("		Guest agrees that the passengers capacity of vehicle provided shall not be exceeded.<br>       ");
                //sb.Append("		In case of misconduct by your party, chauffeur has the right to terminate this agreement without refunds.<br>");
                //sb.Append("		Guest holds AirportShuttles4Less (AS4L) harmless and not liable for any personal or material damages arising from the conduct of his/her party.<br>");
                //sb.Append("		Guest is responsible for the full payment of any overtime charges, beyond the original agreement.<br>");
                //sb.Append("		Guest agrees to 100% payment charged to his/her credit card at the time reservation has been made.<br>");
                //sb.Append("		Luxury Sedan guests can cancel 3 hours before pickup time with $10.00 processing fee; if not you will be charged the full amount of reservation. Stretch limousine and Van Guests can cancel 48 hours before pickup time with a $20.00 processing fee; if you cancel after 48 hours, you will be billed for a minimum 3 hours of service charges.<br>");
                //sb.Append("		Guest acknowledges that he/she understands that AirportShuttles4Less (AS4L) imposes a service fee for late night service (11:00PM TO 5:00AM).<br>");
                //sb.Append("		Guest ackowledges that he/she understands that AirportShuttles4Less (AS4L) imposes an additional service fee for Incoming International flights.<br>		");
                //sb.Append("		AirportShuttles4Less (AS4L) cannot be held responsible for mechanical problems, inclement weather, or other uncontrollable circumstances resulting in the inability to start a job as it is schedule time or complete a job. In the event that the requested vehicle can not be provided; AirportShuttles4Less (AS4L) may provide a vehicle of equal quality.<br>");
                //sb.Append("		AirportShuttles4Less (AS4L) reserves the right to change rates without notice.  If a rate change is necessary due to a destination being outside of the immediate service area, technical error or increase in fuel charges; AirportShuttles4Less (AS4L) will make every effort to notify the Guest of the change.<br>");
                //sb.Append("	</td>                    ");
                //sb.Append("	</tr>                    ");
                //sb.Append("      </tbody></table>    ");
                //sb.Append("  </td></tr>              ");
                //sb.Append("                          ");
                //sb.Append("                          ");
                //sb.Append("                          ");
                //sb.Append("                          ");
                //sb.Append("                          ");
                //sb.Append("</tbody></table>          ");
                //sb.Append("                          ");
                //sb.Append("                          ");
                //sb.Append("</body></html>            ");
                //string Mail = sb.ToString();
                #endregion

                #region Driver Mail
                //if (DriverName != "Select Driver")
                //{
                #region Driver Mail for Airport reservation
                //sbDriver.Append("<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
                //sbDriver.Append("<title>www.bwishuttleservice.com - Customer Receipt</title>  ");
                //sbDriver.Append("<style>                                            ");
                //sbDriver.Append(".Norm {font-family: Verdana;                       ");
                //sbDriver.Append("font-size: 12px;                                 ");
                //sbDriver.Append("font-color: red;                               ");
                //sbDriver.Append(" }                                               ");
                //sbDriver.Append(".heading {font-family: Verdana;                   ");
                //sbDriver.Append("  font-size: 14px;                            ");
                //sbDriver.Append("  font-weight: 800;                           ");
                //sbDriver.Append("	 }                                                  ");
                //sbDriver.Append("   td {font-family: Verdana;                         ");
                //sbDriver.Append("	  font-size: 12px;                                  ");
                //sbDriver.Append("	 }                                                  ");
                //sbDriver.Append("  </style>                                           ");
                //sbDriver.Append("<style>				.askemmy {					background: #fff url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/logo_housefly_new.png) no-repeat right 5px bottom 5px;					background-size: 45px;				}				.askemmy {				    z-index: 10000;				    position: fixed;				    display: block;				    width: 350px;				    height: 145px;				    background-color: white;				    border-radius: 2px;				    box-shadow: rgb(133, 133, 133) 0px 0px 25px 1px;				    margin: 0 auto;				    text-align: center;				    margin-left: 35%;				    margin-top: 10%;				}				.askemmy p#msg {				    font-size: 1.1em;				    font-weight: 600;				    margin-top: 31px;				    margin-bottom: 20px;				}				.askemmy .error-msg {					color: #FF5600;					padding-top: 10px;				}				.askemmy .success-msg {					color: green;					padding-top: 10px;				}				.askemmy input {				    padding: .5em .6em;				    display: inline-block;				    border: 1px solid #ccc;				    box-shadow: inset 0 1px 3px #ddd;				    border-radius: 4px;				    vertical-align: middle;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				    line-height: normal;				    -webkit-appearance: textfield;				    cursor: auto;				 }				 .askemmy input[type='submit'] {				    font-family: inherit;				    font-size: 100%;				    padding: .5em 1em;				    color: white;				    font-weight: 600;				    border: 1px solid #999;				    border: 0 rgba(0,0,0,0);				    background-color: rgba(31, 196, 255, .8);				    text-decoration: none;				    border-radius: 2px;				    display: inline-block;				    zoom: 1;				    line-height: normal;				    white-space: nowrap;				    vertical-align: middle;				    text-align: center;				    cursor: pointer;				    -webkit-user-drag: none;				    -webkit-user-select: none;				    user-select: none;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				 }				.askemmy .closebox {				    display: inline-block;				    height: 16px;				    width: 16px;				    position: absolute;				    right: 4px;				    top: 4px;				    cursor: pointer;				    background: url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/close_box.png)				}				</style></head>");
                //sbDriver.Append("<body marginwidth='0' marginheight='0' topmargin='0' leftmargin='0' rightmargin='0' bottommargin='0'>");
                //sbDriver.Append("");
                //sbDriver.Append("<br><table border='0' width='700' cellspacing='0' cellpadding='0' align='Center'>");
                //sbDriver.Append("  <tbody><tr>");
                //sbDriver.Append("    <td width='660' colspan='13' valign='top'>");
                //sbDriver.Append("      <table width='100%'>");
                //sbDriver.Append("        <tbody><tr>");
                //sbDriver.Append("        <tr>");
                //sbDriver.Append("          <td colspan='3' width='100%'><a href='https://www.airportshuttles4less.com<'>https://www.airportshuttles4less.com<</a></td>");
                //sbDriver.Append("        </tr>");
                //sbDriver.Append("        <tr>");
                //sbDriver.Append("          <td colspan='3' width='100%'><a href='mailto:airportshuttle4less@gmail.com'>airportshuttle4less@gmail.com</a></td>");
                //sbDriver.Append("        </tr>");
                //sbDriver.Append("        <tr>");
                //sbDriver.Append("          <td colspan='2' width='25%'>Tel:  410-904-5151</td>");
                //sbDriver.Append("          <td width='75%' align='right'><font size='3'>");
                //sbDriver.Append("		Receipt");
                //sbDriver.Append("	     </font></td>");
                //sbDriver.Append("        </tr>");
                //sbDriver.Append("      </tbody></table>");
                //sbDriver.Append("     </td>");
                //sbDriver.Append("  </tr><tr>");
                //sbDriver.Append("  </tr><tr>");
                //sbDriver.Append("    <td colspan='13' width='660'>");
                //sbDriver.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                //sbDriver.Append("  	<tbody><tr>");
                //sbDriver.Append("  	  <td width='70%' style='border-bottom:medium solid blue; font-size:16px'><b>Reservation # " + Booking.ReservationId + "</b></td>");
                ////Sdate = GetAppDate(Booking.Date.Split(' ')[0]);
                ////SerDate = Sdate.ToString("MM-dd-yyyy");
                //sbDriver.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Booking.CreatedDate.Split(' ')[0] + "</td>");
                //sbDriver.Append("  	</tr>");
                //sbDriver.Append("  	<tr>");
                //sbDriver.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Hi, " + Driver.FirstName + " " + Driver.LastName + " your Booking has been cancelled with following Details.If any of the information appears to be incorrect, please contact our office immediately to correct it. <br>&nbsp;</td>");
                //sbDriver.Append("	</tr>");
                //sbDriver.Append("      </tbody></table>");
                //sbDriver.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                //sbDriver.Append("	<tbody><tr>");
                //sbDriver.Append("	  <td class='heading'>SUBJ:Rez:</td>");
                //sbDriver.Append("	  <td width='75%'>" + Booking.ReservationDate + "</td>          ");
                //sbDriver.Append("	</tr>");
                //sbDriver.Append("  	<tr>");
                //sbDriver.Append("	  <td class='heading'>MSG: F/T:</td>");
                //string Airlines = Booking.Airlines;
                //if (Booking.Airlines == null)
                //{
                //    Airlines = "";
                //}
                //else
                //{
                //    Airlines = ", " + Airlines;
                //}
                ////if (Booking.Service == "Point To Point Reservation" || Booking.Service == "Hourly Reservation")
                ////{
                ////    if (Booking.Time == null && Booking.Service == "Point To Point Reservation")
                ////    {
                ////        sbDriver.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.Pickup_Time) + "" + Airlines + "</td>");
                ////    }
                ////    else
                ////        sbDriver.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.Time) + "" + Airlines + "</td>");
                ////}

                ////else if (Booking.Service == "To Airport")
                ////    sbDriver.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.Pickup_Time) + "" + Airlines + "</td>");
                ////else
                ////{
                ////    if (Booking.Ret_FlightTime != null)
                ////        sbDriver.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.Ret_FlightTime) + "" + Airlines + "</td>");
                ////    else
                ////        sbDriver.Append("	  <td width='75%'>" + EmailManager.GetTime(Booking.FlightTime) + "" + Airlines + "</td>");
                ////}
                //sbDriver.Append("	  <td width='75%'>" + Booking.Time + "" + Airlines + "</td>");

                //sbDriver.Append("	</tr>                                             ");
                //if (Booking.Service != "Point To Point Reservation" && Booking.Service != "Hourly Reservation")
                //{
                //    sbDriver.Append("	<tr>                                              ");
                //    sbDriver.Append("	  <td class='heading'> Flight Number: </td>          ");
                //    sbDriver.Append("	  <td width='75%'>" + Booking.FlightNumber + "</td>          ");
                //    sbDriver.Append("	</tr>                                             ");
                //}
                //if (Booking.Service == "Hourly Reservation")
                //{
                //    sbDriver.Append("	<tr>                                              ");
                //    sbDriver.Append("	  <td class='heading'>Hours:</td>         ");
                //    sbDriver.Append("	  <td width='75%'>" + Booking.Hours + "</td>                          ");
                //    sbDriver.Append("	</tr>");
                //}
                //sbDriver.Append("	<tr>                                              ");
                ////if (Booking.Service == "To Airport")
                ////{
                //if (Booking.Service == "Point To Point Reservation" || Booking.Service == "Hourly Reservation")
                //{
                //    sbDriver.Append("	  <td class='heading'>Service: </td>          ");
                //    sbDriver.Append("	  <td width='75%'>" + Booking.Service + "</td>          ");
                //}
                //else
                //{
                //    sbDriver.Append("	  <td class='heading'>" + Booking.Service + ": </td>          ");
                //    sbDriver.Append("	  <td width='75%'>" + Booking.Destination + "</td>          ");
                //}
                ////}
                ////else if (Booking.Service == "From Airport")
                ////{
                ////  sbDriver.Append("	  <td class='heading'>" + Booking.Service + ": " + Booking.PickUpAddress + "</td>          ");
                ////}
                //sbDriver.Append("	</tr>                                             ");
                //sbDriver.Append("	<tr>                                              ");
                //if (Booking.Service == "To Airport" || Booking.Service == "Hourly Reservation")
                //{
                //    sbDriver.Append("	  <td class='heading'>P/U: </td>          ");
                //    sbDriver.Append("	  <td width='75%'>" + Booking.Source + "</td>               ");
                //}
                //else if (Booking.Service == "From Airport")
                //{
                //    sbDriver.Append("	  <td class='heading'>Dest: </td>          ");
                //    sbDriver.Append("	  <td width='75%'>" + Booking.Destination + "</td>               ");
                //}
                //else if (Booking.Service == "Point To Point Reservation")
                //{
                //    string Location = "", HaltTime = "", Mics = "";

                //    sbDriver.Append("	  <td class='heading'>Trip Routing:</td>");
                //    sbDriver.Append("");
                //    //sbDriver.Append("	  <td class='heading'>&nbsp;</td>");
                //    sbDriver.Append("	  <td><table style=\"width:100%\"><thead><tr><th>Location</th><th>Halting Time</th><th>MISC</th></tr></thead><tbody>");
                //    //if (Booking.Stop1 != "^-:-^")
                //    //{
                //    //    Location = ""; HaltTime = ""; Mics = "";
                //    //    GetP2PLocation(Booking.Stop1, out Location, out HaltTime, out Mics);
                //    //    sbDriver.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
                //    //}
                //    //if (Booking.Stop2 != "^-:-^")
                //    //{
                //    //    Location = ""; HaltTime = ""; Mics = "";
                //    //    GetP2PLocation(Booking.Stop2, out Location, out HaltTime, out Mics);
                //    //    sbDriver.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
                //    //}
                //    //if (Booking.Stop3 != "^-:-^")
                //    //{
                //    //    Location = ""; HaltTime = ""; Mics = "";
                //    //    GetP2PLocation(Booking.Stop3, out Location, out HaltTime, out Mics);
                //    //    sbDriver.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
                //    //}
                //    //if (Booking.Stop4 != "^-:-^")
                //    //{
                //    //    Location = ""; HaltTime = ""; Mics = "";
                //    //    GetP2PLocation(Booking.Stop4, out Location, out HaltTime, out Mics);
                //    //    sbDriver.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
                //    //}
                //    //if (Booking.Stop5 != "^-:-^")
                //    //{
                //    //    Location = ""; HaltTime = ""; Mics = "";
                //    //    GetP2PLocation(Booking.Stop5, out Location, out HaltTime, out Mics);
                //    //    sbDriver.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
                //    //    sbDriver.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
                //    //}
                //    sbDriver.Append("	</tr>                                             ");
                //    sbDriver.Append("</tbody></table></td>");
                //}
                //sbDriver.Append("	</tr>                                             ");
                //sbDriver.Append("	<tr>                                              ");
                //sbDriver.Append("	  <td class='heading'>Name:</td>          ");
                //sbDriver.Append("	  <td width='75%'>" + Booking.FirstName + " " + Booking.LastName + "</td>                      ");
                //sbDriver.Append("	</tr>                                             ");
                //sbDriver.Append("	<tr>                                              ");
                //sbDriver.Append("	  <td class='heading'># :</td>          ");
                //if (Booking.PhoneNo == "" || Booking.PhoneNo == null)
                //{
                //    sbDriver.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>               ");
                //}
                //else
                //{
                //    sbDriver.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>               ");
                //}
                //sbDriver.Append("	</tr>                                             ");

                //sbDriver.Append("	<tr>                                              ");
                //sbDriver.Append("	  <td class='heading'>Reservation Comments:</td>          ");
                //sbDriver.Append("	  <td width='75%'>" + Booking.Remark + "</td>                      ");
                //sbDriver.Append("	</tr>                                             ");

                //sbDriver.Append("        </tr>                                                                                            ");
                //sbDriver.Append("                          ");

                //sbDriver.Append("      </tbody></table>    ");
                //sbDriver.Append("  </td></tr>              ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("</tbody></table>          ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("                          ");
                //sbDriver.Append("</body></html>            ");
                #endregion
                //}
                //Mail = sbDriver.ToString();
                #endregion

                #region Mailing Section

                //try
                //{
                //    MailMessage message = new MailMessage();
                //    SmtpClient smtpClient = new SmtpClient();
                //    string msg = string.Empty;

                //    MailAddress fromAddress = new MailAddress("reservation@bwishuttleservice.com");
                //    message.From = fromAddress;
                //    message.To.Add(Booking.Email);
                //    //message.CC.Add(Driver.Email);
                //    message.Subject = "Booking Cancelled-" + Booking.ReservationId;
                //    message.IsBodyHtml = true;
                //    message.Body = sb.ToString();
                //    SmtpClient mailObj = new SmtpClient("relay-hosting.secureserver.net", 25);
                //    mailObj.Credentials = new NetworkCredential("reservation@bwishuttleservice.com", "aBC$32#2SDI_&%12");
                //    mailObj.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                //    mailObj.EnableSsl = false;
                //    message.Sender = new MailAddress("reservation@bwishuttleservice.com", "www.bwishuttleservice.com");
                //    mailObj.Send(message);
                //    message.Dispose();
                //}
                //catch (Exception ex)
                //{
                //    string Msg = ex.Message;
                //    return Msg;
                //}
                //if (Driver.Email != null)
                //{
                //    try
                //    {
                //        MailMessage message = new MailMessage();
                //        SmtpClient smtpClient = new SmtpClient();
                //        string msg = string.Empty;
                //        MailAddress fromAddress = new MailAddress("reservation@bwishuttleservice.com");
                //        message.From = fromAddress;
                //        message.To.Add(Driver.Email);
                //        //message.CC.Add(Driver.Email);
                //        message.Subject = "Booking Cancelled-" + Booking.ReservationId;
                //        message.IsBodyHtml = true;
                //        message.Body = sb.ToString();
                //        SmtpClient mailObj = new SmtpClient("relay-hosting.secureserver.net", 25);
                //        mailObj.Credentials = new NetworkCredential("reservation@bwishuttleservice.com", "aBC$32#2SDI_&%12");
                //        mailObj.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                //        mailObj.EnableSsl = false;
                //        message.Sender = new MailAddress("reservation@bwishuttleservice.com", "www.bwishuttleservice.com");
                //        mailObj.Send(message);
                //        message.Dispose();
                //    }
                //    catch (Exception ex)
                //    {
                //        string Msg = ex.Message;
                //        return Msg;
                //    }
                //}
                #endregion
                #endregion

                return jsSerializer.Serialize(new { Retcode = 1});
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
            }
             
        }

        [WebMethod(EnableSession = true)]
        public string CancelMultiBooking(int[] BookingSid)
        {
            try
            { 
                tbl_Login Driver = new tbl_Login();
                for (int i = 0; i < BookingSid.Length; i++)
                {
                    tbl_Reservation Reservation = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);
                    string DriverName = Reservation.DriverName;
                    var DriverSid = Reservation.DriverId;
                    if (Reservation.Status == "Cancelled")
                    {
                        return jsSerializer.Serialize(new { Retcode = 1 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"4\"}"; 
                    }

                    Reservation.Status = "Cancelled";
                    DB.SubmitChanges();

                    if (DriverName != null)
                    {
                        Driver = DB.tbl_Logins.Single(x => x.Sid == DriverSid);
                    }

                    tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);

                    StringBuilder sb = new StringBuilder();
                    StringBuilder sbDriver = new StringBuilder();

                    #region Customer Mail
                    sb.Append("<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
                    sb.Append("<title>limoallaround.com - Customer Receipt</title>  ");
                    sb.Append("<style>                                            ");
                    sb.Append(".Norm {font-family: Verdana;                       ");
                    sb.Append("font-size: 12px;                                 ");
                    sb.Append("font-color: red;                               ");
                    sb.Append(" }                                               ");
                    sb.Append(".heading {font-family: Verdana;                   ");
                    sb.Append("  font-size: 14px;                            ");
                    sb.Append("  font-weight: 800;                           ");
                    sb.Append("	 }                                                  ");
                    sb.Append("   td {font-family: Verdana;                         ");
                    sb.Append("	  font-size: 12px;                                  ");
                    sb.Append("	 }                                                  ");
                    sb.Append("  </style>                                           ");
                    sb.Append("<style>				.askemmy {					background: #fff url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/logo_housefly_new.png) no-repeat right 5px bottom 5px;					background-size: 45px;				}				.askemmy {				    z-index: 10000;				    position: fixed;				    display: block;				    width: 350px;				    height: 145px;				    background-color: white;				    border-radius: 2px;				    box-shadow: rgb(133, 133, 133) 0px 0px 25px 1px;				    margin: 0 auto;				    text-align: center;				    margin-left: 35%;				    margin-top: 10%;				}				.askemmy p#msg {				    font-size: 1.1em;				    font-weight: 600;				    margin-top: 31px;				    margin-bottom: 20px;				}				.askemmy .error-msg {					color: #FF5600;					padding-top: 10px;				}				.askemmy .success-msg {					color: green;					padding-top: 10px;				}				.askemmy input {				    padding: .5em .6em;				    display: inline-block;				    border: 1px solid #ccc;				    box-shadow: inset 0 1px 3px #ddd;				    border-radius: 4px;				    vertical-align: middle;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				    line-height: normal;				    -webkit-appearance: textfield;				    cursor: auto;				 }				 .askemmy input[type='submit'] {				    font-family: inherit;				    font-size: 100%;				    padding: .5em 1em;				    color: white;				    font-weight: 600;				    border: 1px solid #999;				    border: 0 rgba(0,0,0,0);				    background-color: rgba(31, 196, 255, .8);				    text-decoration: none;				    border-radius: 2px;				    display: inline-block;				    zoom: 1;				    line-height: normal;				    white-space: nowrap;				    vertical-align: middle;				    text-align: center;				    cursor: pointer;				    -webkit-user-drag: none;				    -webkit-user-select: none;				    user-select: none;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				 }				.askemmy .closebox {				    display: inline-block;				    height: 16px;				    width: 16px;				    position: absolute;				    right: 4px;				    top: 4px;				    cursor: pointer;				    background: url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/close_box.png)				}				</style></head>");
                    sb.Append("<body marginwidth='0' marginheight='0' topmargin='0' leftmargin='0' rightmargin='0' bottommargin='0'>");
                    sb.Append("");
                    sb.Append("<br><table border='0' width='700' cellspacing='0' cellpadding='0' align='Center'>");
                    sb.Append("  <tbody><tr>");
                    sb.Append("    <td width='660' colspan='13' valign='top'>");
                    sb.Append("      <table width='100%'>");
                    sb.Append("        <tbody><tr>");
                    sb.Append("          <td colspan='2' width='100%' class='heading'><b>Limo All Around Service</b></td>");
                    sb.Append("        </tr>");
                    sb.Append("        <tr>");
                    sb.Append("          <td colspan='2' width='100%'><a href='https://www.airportshuttles4less.com'>https://www.airportshuttles4less.com<</a></td>");
                    sb.Append("        </tr>");
                    sb.Append("        <tr>");
                    sb.Append("          <td colspan='2' width='100%'><a href='mailto:info@airportshuttles4less.com'>info@airportshuttles4less.com</a></td>");
                    sb.Append("        </tr>");
                    sb.Append("        <tr>");
                    sb.Append("          <td colspan='2' width='25%'>Tel: 410-235-2265</td>");
                    sb.Append("          <td width='75%' align='right'><font size='3'>");
                    sb.Append("		Receipt");
                    sb.Append("	     </font></td>");
                    sb.Append("        </tr>");
                    sb.Append("      </tbody></table>");
                    sb.Append("     </td>");
                    sb.Append("  </tr><tr>");
                    sb.Append("  </tr><tr>");
                    sb.Append("    <td colspan='13' width='660'>");
                    sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                    sb.Append("  	<tbody><tr>");
                    sb.Append("  	  <td width='70%' style='border-bottom:medium solid blue; font-size:16px'><b>Reservation # " + Booking.ReservationId + "</b></td>");
                    //DateTime Sdate = GetAppDate(Booking.Date.Split(' ')[0]);
                    //string SerDate = Sdate.ToString("MM-dd-yyyy");
                    sb.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Booking.CreatedDate.Split(' ')[0] + "</td>");
                    sb.Append("  	</tr>");
                    sb.Append("  	<tr>");
                    sb.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Reservation has been cancelled!  Below please find your Details. If any of the information appears to be incorrect, please contact our office immediately to correct it.<br>&nbsp;</td>");
                    sb.Append("	</tr>");
                    sb.Append("      </tbody></table>");
                    sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                    sb.Append("	<tbody><tr>");
                    sb.Append("	  <td class='heading'>Pick-up Date:</td>");
                    sb.Append("	  <td width='75%'>" + Booking.ReservationDate + "</td>                 ");
                    sb.Append("	</tr>                                             ");

                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Driver Name:</td>          ");
                    sb.Append("	  <td width='75%'>" + Driver.FirstName + " " + Driver.LastName + "</td>                      ");
                    sb.Append("	</tr>                                             ");

                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Driver Mobile:</td>          ");
                    sb.Append("	  <td width='75%'>" + Driver.MobileNo + "</td>                      ");
                    sb.Append("	</tr>                                             ");

                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Driver Email:</td>          ");
                    sb.Append("	  <td width='75%'>" + Driver.Email + "</td>                      ");
                    sb.Append("	</tr>                                             ");

                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Pick-up Time:</td>          ");
                    sb.Append("	  <td width='75%'>" + Booking.Time + "</td>                      ");
                    sb.Append("	</tr>                                             ");

                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Primary Contact:</td>       ");
                    sb.Append("	  <td width='75%'>" + Booking.FirstName + " " + Booking.LastName + "</td>           ");
                    sb.Append("	</tr>                                             ");
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Contact Number:</td>        ");
                    sb.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>               ");
                    sb.Append("	</tr>                                             ");
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>No. of Adults:</td>         ");
                    sb.Append("	  <td width='75%'>" + Booking.Adults + "</td>                          ");
                    sb.Append("	</tr>                                             ");
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>No. of Children:</td>       ");
                    sb.Append("	  <td width='75%'>" + Booking.Childs + "</td>                          ");
                    sb.Append("	</tr>	                                          ");
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading' valign='Top' style='border-bottom:thin solid green;'>Vehicle Type:</td>           ");
                    sb.Append("	  <td width='75%' style='border-bottom:thin solid green;'>                                              ");
                    sb.Append("	  " + Booking.VehicleId + "<br>&nbsp;</td>                                                                                    ");
                    sb.Append("	</tr>                                                                                                   ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>Trip Routing Information:</td>                                                    ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	  <td><b>Pick-up Location: &nbsp;</b>" + Booking.Source + "</td>                         ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	</tr>                                                                                                   ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>&nbsp;</td>                                                                       ");
                    sb.Append("	  <td><b>Pick-up Instructions: &nbsp;</b>your reservation is canceled by xx/xx/2016<br>&nbsp;</td>      ");
                    sb.Append("	</tr>	                                                                                                ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>&nbsp;</td>                                                                       ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	  <td><b>Drop-off Location: &nbsp;</b>" + Booking.Destination + "</td>                                                  ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	</tr>	                                                                                                ");
                    sb.Append("        <tr>                                                                                             ");
                    sb.Append("          <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>                            ");
                    sb.Append("        </tr>                                                                                            ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading' valign='top'>Payment Method:</td>                                                 ");
                    sb.Append("	  <td width='75%'>" + Booking.PaymentType + "<br>&nbsp;</td>                                                            ");
                    sb.Append("	</tr>                                                                                                   ");
                    sb.Append("                                                                                                         ");
                    sb.Append("                                                                                                         ");
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Quoted Rate:</td>                                                                 ");
                    sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.Fare), 2) + "                                                                                         ");
                    sb.Append("	</td></tr>                                                                                              ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>Gratuity:</td>                                                                    ");
                    sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.Gratuity), 2) + "                                                                                          ");
                    sb.Append("	</td></tr>                                                                                              ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>Reservation Total:</td>                                                           ");
                    sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.TotalFare), 2) + "                                                                                         ");
                    sb.Append("	</td></tr>                                                                                              ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td style='border-bottom:thin solid green;' class='heading' valign='top'><font color='red'>Total Due:</font></td>");
                    sb.Append("	  <td style='border-bottom:thin solid green;'><font color='red'>$ 0.00<br>&nbsp;</font></td>     ");
                    sb.Append("	</tr>                                                                                              ");
                    sb.Append("	<tr>                                                                                               ");
                    sb.Append("	  <td class='heading' valign='top'>Terms &amp; Conditions / Reservation Agreement:</td>            ");
                    sb.Append("	  <td>Guest agrees that there will be no smoking in our vehicles.<br>                              ");
                    sb.Append("		Guest assures that no illegal drugs are brought into our vehicles.<br>                         ");
                    sb.Append("		Guest agrees that no alcoholic beverages shall be brought into our vehicles.                   ");
                    sb.Append("		Guest agrees that the passengers capacity of vehicle provided shall not be exceeded.<br>       ");
                    sb.Append("		In case of misconduct by your party, chauffeur has the right to terminate this agreement without refunds.<br>");
                    sb.Append("		Guest holds Limo All Around Service harmless and not liable for any personal or material damages arising from the conduct of his/her party.<br>");
                    sb.Append("		Guest is responsible for the full payment of any overtime charges, beyond the original agreement.<br>");
                    sb.Append("		Guest agrees to 100% payment charged to his/her credit card at the time reservation has been made.<br>");
                    sb.Append("		Luxury Sedan guests can cancel 3 hours before pickup time with $10.00 processing fee; if not you will be charged the full amount of reservation. Stretch limousine and Van Guests can cancel 48 hours before pickup time with a $20.00 processing fee; if you cancel after 48 hours, you will be billed for a minimum 3 hours of service charges.<br>");
                    sb.Append("		Guest acknowledges that he/she understands that Limo All Around Service imposes a service fee for late night service (11:00PM TO 5:00AM).<br>");
                    sb.Append("		Guest ackowledges that he/she understands that Limo All Around Service imposes an additional service fee for Incoming International flights.<br>		");
                    sb.Append("		Limo All Around Service cannot be held responsible for mechanical problems, inclement weather, or other uncontrollable circumstances resulting in the inability to start a job as it is schedule time or complete a job. In the event that the requested vehicle can not be provided; Limo All Around Service may provide a vehicle of equal quality.<br>");
                    sb.Append("		Limo All Around Service reserves the right to change rates without notice.  If a rate change is necessary due to a destination being outside of the immediate service area, technical error or increase in fuel charges; Limo All Around Service will make every effort to notify the Guest of the change.<br>");
                    sb.Append("	</td>                    ");
                    sb.Append("	</tr>                    ");
                    sb.Append("      </tbody></table>    ");
                    sb.Append("  </td></tr>              ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("</tbody></table>          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("</body></html>            ");

                    #endregion

                    #region Driver Mail
                    sbDriver.Append("<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
                    sbDriver.Append("<title>limoallaround.com - Customer Receipt</title>  ");
                    sbDriver.Append("<style>                                            ");
                    sbDriver.Append(".Norm {font-family: Verdana;                       ");
                    sbDriver.Append("font-size: 12px;                                 ");
                    sbDriver.Append("font-color: red;                               ");
                    sbDriver.Append(" }                                               ");
                    sbDriver.Append(".heading {font-family: Verdana;                   ");
                    sbDriver.Append("  font-size: 14px;                            ");
                    sbDriver.Append("  font-weight: 800;                           ");
                    sbDriver.Append("	 }                                                  ");
                    sbDriver.Append("   td {font-family: Verdana;                         ");
                    sbDriver.Append("	  font-size: 12px;                                  ");
                    sbDriver.Append("	 }                                                  ");
                    sbDriver.Append("  </style>                                           ");
                    sbDriver.Append("<style>				.askemmy {					background: #fff url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/logo_housefly_new.png) no-repeat right 5px bottom 5px;					background-size: 45px;				}				.askemmy {				    z-index: 10000;				    position: fixed;				    display: block;				    width: 350px;				    height: 145px;				    background-color: white;				    border-radius: 2px;				    box-shadow: rgb(133, 133, 133) 0px 0px 25px 1px;				    margin: 0 auto;				    text-align: center;				    margin-left: 35%;				    margin-top: 10%;				}				.askemmy p#msg {				    font-size: 1.1em;				    font-weight: 600;				    margin-top: 31px;				    margin-bottom: 20px;				}				.askemmy .error-msg {					color: #FF5600;					padding-top: 10px;				}				.askemmy .success-msg {					color: green;					padding-top: 10px;				}				.askemmy input {				    padding: .5em .6em;				    display: inline-block;				    border: 1px solid #ccc;				    box-shadow: inset 0 1px 3px #ddd;				    border-radius: 4px;				    vertical-align: middle;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				    line-height: normal;				    -webkit-appearance: textfield;				    cursor: auto;				 }				 .askemmy input[type='submit'] {				    font-family: inherit;				    font-size: 100%;				    padding: .5em 1em;				    color: white;				    font-weight: 600;				    border: 1px solid #999;				    border: 0 rgba(0,0,0,0);				    background-color: rgba(31, 196, 255, .8);				    text-decoration: none;				    border-radius: 2px;				    display: inline-block;				    zoom: 1;				    line-height: normal;				    white-space: nowrap;				    vertical-align: middle;				    text-align: center;				    cursor: pointer;				    -webkit-user-drag: none;				    -webkit-user-select: none;				    user-select: none;				    -webkit-box-sizing: border-box;				    box-sizing: border-box;				 }				.askemmy .closebox {				    display: inline-block;				    height: 16px;				    width: 16px;				    position: absolute;				    right: 4px;				    top: 4px;				    cursor: pointer;				    background: url(chrome-extension://gllmlkidgbagkcikijiljllpdloelocn/close_box.png)				}				</style></head>");
                    sbDriver.Append("<body marginwidth='0' marginheight='0' topmargin='0' leftmargin='0' rightmargin='0' bottommargin='0'>");
                    sbDriver.Append("");
                    sbDriver.Append("<br><table border='0' width='700' cellspacing='0' cellpadding='0' align='Center'>");
                    sbDriver.Append("  <tbody><tr>");
                    sbDriver.Append("    <td width='660' colspan='13' valign='top'>");
                    sbDriver.Append("      <table width='100%'>");
                    sbDriver.Append("        <tbody><tr>");
                    sbDriver.Append("          <td colspan='2' width='100%' class='heading'><b>Limo All Around Service</b></td>");
                    sbDriver.Append("        </tr>");
                    sbDriver.Append("        <tr>");
                    sbDriver.Append("          <td colspan='2' width='100%'><a href='https://www.airportshuttles4less.com'>https://www.airportshuttles4less.com<</a></td>");
                    sbDriver.Append("        </tr>");
                    sbDriver.Append("        <tr>");
                    sbDriver.Append("          <td colspan='2' width='100%'><a href='mailto:info@airportshuttles4less.com'>info@airportshuttles4less.com</a></td>");
                    sbDriver.Append("        </tr>");
                    sbDriver.Append("        <tr>");
                    sbDriver.Append("          <td colspan='2' width='25%'>Tel: 410-235-2265</td>");
                    sbDriver.Append("          <td width='75%' align='right'><font size='3'>");
                    sbDriver.Append("		Receipt");
                    sbDriver.Append("	     </font></td>");
                    sbDriver.Append("        </tr>");
                    sbDriver.Append("      </tbody></table>");
                    sbDriver.Append("     </td>");
                    sbDriver.Append("  </tr><tr>");
                    sbDriver.Append("  </tr><tr>");
                    sbDriver.Append("    <td colspan='13' width='660'>");
                    sbDriver.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                    sbDriver.Append("  	<tbody><tr>");
                    sbDriver.Append("  	  <td width='70%' style='border-bottom:medium solid blue; font-size:16px'><b>Reservation # " + Booking.ReservationId + "</b></td>");
                    //Sdate = GetAppDate(Booking.Date.Split(' ')[0]);
                    //SerDate = Sdate.ToString("MM-dd-yyyy");
                    sbDriver.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Booking.CreatedDate.Split(' ')[0] + "</td>");
                    sbDriver.Append("  	</tr>");
                    sbDriver.Append("  	<tr>");
                    sbDriver.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Hi, " + Driver.FirstName + " " + Driver.LastName + " your booking with following detail has been cancelled.If any of the information appears to be incorrect, please contact our office immediately to correct it. <br>&nbsp;</td>");
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("      </tbody></table>");
                    sbDriver.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                    sbDriver.Append("	<tbody><tr>");
                    sbDriver.Append("	  <td class='heading'>Pick-up Date:</td>");
                    sbDriver.Append("	  <td width='75%'>" + Booking.ReservationDate + "</td>                 ");
                    sbDriver.Append("	</tr>                                             ");

                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'>Customer Name:</td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Booking.FirstName + " " + Booking.LastName + "</td>                      ");
                    sbDriver.Append("	</tr>                                             ");

                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'>Customer Mobile:</td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>                      ");
                    sbDriver.Append("	</tr>                                             ");

                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'>Customer Email:</td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Booking.Email + "</td>                      ");
                    sbDriver.Append("	</tr>                                             ");

                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'>Pick-up Time:</td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Booking.Time + "</td>                      ");
                    sbDriver.Append("	</tr>                                             ");

                    sb.Append("	  <td class='heading'>No. of Adults:</td>         ");
                    sb.Append("	  <td width='75%'>" + Booking.Adults + "</td>                          ");
                    sb.Append("	</tr>                                             ");
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>No. of Children:</td>       ");
                    sb.Append("	  <td width='75%'>" + Booking.Childs + "</td>                          ");
                    sb.Append("	</tr>	                                          ");
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading' valign='Top' style='border-bottom:thin solid green;'>Vehicle Type:</td>           ");
                    sb.Append("	  <td width='75%' style='border-bottom:thin solid green;'>                                              ");
                    sb.Append("	  " + Booking.VehicleId + "<br>&nbsp;</td>                                                                                    ");
                    sb.Append("	</tr>                                                                                                   ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>Trip Routing Information:</td>                                                    ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	  <td><b>Pick-up Location: &nbsp;</b>" + Booking.Source + "</td>                         ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	</tr>                                                                                                   ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>&nbsp;</td>                                                                       ");
                    sb.Append("	  <td><b>Pick-up Instructions: &nbsp;</b>your reservation is canceled by xx/xx/2016<br>&nbsp;</td>      ");
                    sb.Append("	</tr>	                                                                                                ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>&nbsp;</td>                                                                       ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	  <td><b>Drop-off Location: &nbsp;</b>" + Booking.Destination + "</td>                                                  ");
                    sb.Append("	                                                                                                        ");
                    sb.Append("	</tr>	                                                                                                ");
                    sb.Append("        <tr>                                                                                             ");
                    sb.Append("          <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>                            ");
                    sb.Append("        </tr>                                                                                            ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading' valign='top'>Payment Method:</td>                                                 ");
                    sb.Append("	  <td width='75%'>" + Booking.PaymentType + "<br>&nbsp;</td>                                                            ");
                    sb.Append("	</tr>                                                                                                   ");
                    sb.Append("                                                                                                         ");
                    sb.Append("                                                                                                         ");
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Quoted Rate:</td>                                                                 ");
                    sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.Fare), 2) + "                                                                                         ");
                    sb.Append("	</td></tr>                                                                                              ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>Gratuity:</td>                                                                    ");
                    sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.Gratuity), 2) + "                                                                                          ");
                    sb.Append("	</td></tr>                                                                                              ");
                    sb.Append("                                                                                                         ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td class='heading'>Reservation Total:</td>                                                           ");
                    sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.TotalFare), 2) + "                                                                                         ");
                    sb.Append("	</td></tr>                                                                                              ");
                    sb.Append("	<tr>                                                                                                    ");
                    sb.Append("	  <td style='border-bottom:thin solid green;' class='heading' valign='top'><font color='red'>Total Due:</font></td>");
                    sb.Append("	  <td style='border-bottom:thin solid green;'><font color='red'>$ 0.00<br>&nbsp;</font></td>     ");
                    sb.Append("	</tr>                                                                                              ");
                    sb.Append("	<tr>                                                                                               ");
                    sb.Append("	  <td class='heading' valign='top'>Terms &amp; Conditions / Reservation Agreement:</td>            ");
                    sb.Append("	  <td>Guest agrees that there will be no smoking in our vehicles.<br>                              ");
                    sb.Append("		Guest assures that no illegal drugs are brought into our vehicles.<br>                         ");
                    sb.Append("		Guest agrees that no alcoholic beverages shall be brought into our vehicles.                   ");
                    sb.Append("		Guest agrees that the passengers capacity of vehicle provided shall not be exceeded.<br>       ");
                    sb.Append("		In case of misconduct by your party, chauffeur has the right to terminate this agreement without refunds.<br>");
                    sb.Append("		Guest holds Limo All Around Service harmless and not liable for any personal or material damages arising from the conduct of his/her party.<br>");
                    sb.Append("		Guest is responsible for the full payment of any overtime charges, beyond the original agreement.<br>");
                    sb.Append("		Guest agrees to 100% payment charged to his/her credit card at the time reservation has been made.<br>");
                    sb.Append("		Luxury Sedan guests can cancel 3 hours before pickup time with $10.00 processing fee; if not you will be charged the full amount of reservation. Stretch limousine and Van Guests can cancel 48 hours before pickup time with a $20.00 processing fee; if you cancel after 48 hours, you will be billed for a minimum 3 hours of service charges.<br>");
                    sb.Append("		Guest acknowledges that he/she understands that Limo All Around Service imposes a service fee for late night service (11:00PM TO 5:00AM).<br>");
                    sb.Append("		Guest ackowledges that he/she understands that Limo All Around Service imposes an additional service fee for Incoming International flights.<br>		");
                    sb.Append("		Limo All Around Service cannot be held responsible for mechanical problems, inclement weather, or other uncontrollable circumstances resulting in the inability to start a job as it is schedule time or complete a job. In the event that the requested vehicle can not be provided; Limo All Around Service may provide a vehicle of equal quality.<br>");
                    sb.Append("		Limo All Around Service reserves the right to change rates without notice.  If a rate change is necessary due to a destination being outside of the immediate service area, technical error or increase in fuel charges; Limo All Around Service will make every effort to notify the Guest of the change.<br>");
                    sb.Append("	</td>                    ");
                    sb.Append("	</tr>                    ");
                    sb.Append("      </tbody></table>    ");
                    sb.Append("  </td></tr>              ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("</tbody></table>          ");
                    sb.Append("                          ");
                    sb.Append("                          ");
                    sb.Append("</body></html>            ");

                    #endregion

                    #region Mailing Section

                    try
                    {
                        MailMessage message = new MailMessage();
                        SmtpClient smtpClient = new SmtpClient();
                        string msg = string.Empty;
                        MailAddress fromAddress = new MailAddress("support@limoallaround.net", "Limo All Around Reservation");
                        message.From = fromAddress;
                        message.To.Add(Booking.Email);
                        message.Subject = "Booking Cancelled-" + Booking.ReservationId;
                        message.IsBodyHtml = true;
                        message.Body = sb.ToString();
                        smtpClient.Host = "relay-hosting.secureserver.net";   //-- Donot change.
                        smtpClient.Port = 25; //--- Donot change
                        smtpClient.EnableSsl = false;//--- Donot change
                        smtpClient.UseDefaultCredentials = true;
                        smtpClient.Credentials = new System.Net.NetworkCredential("support@limoallaround.net", "asdrc@123");
                        smtpClient.Send(message);

                    }
                    catch
                    {
                        return jsSerializer.Serialize(new { Retcode = 3 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"3\"}";
                        //return json;
                    }
                    var a = Driver.Email;
                    if (a != null)
                    {
                        int al = 10;
                    }
                    if (Driver.Email != null)
                    {
                        try
                        {
                            MailMessage message = new MailMessage();
                            SmtpClient smtpClient = new SmtpClient();
                            string msg = string.Empty;
                            MailAddress fromAddress = new MailAddress("support@limoallaround.net", "Limo All Around Reservation");
                            message.From = fromAddress;
                            message.To.Add(Driver.Email);
                            message.Subject = "Booking Cancelled-" + Booking.ReservationId;
                            message.IsBodyHtml = true;
                            message.Body = sbDriver.ToString();
                            smtpClient.Host = "relay-hosting.secureserver.net";   //-- Donot change.
                            smtpClient.Port = 25; //--- Donot change
                            smtpClient.EnableSsl = false;//--- Donot change
                            smtpClient.UseDefaultCredentials = true;
                            smtpClient.Credentials = new System.Net.NetworkCredential("support@limoallaround.net", "asdrc@123");
                            smtpClient.Send(message);
                        }
                        catch
                        {
                            return jsSerializer.Serialize(new { Retcode = 3 });
                            //json = "{\"Session\":\"1\",\"Retcode\":\"3\"}";
                            //return json;
                        }
                    }
                    #endregion

                }

                return jsSerializer.Serialize(new { Retcode = 1 });
                // json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
               // json = "{\"Session\":\"1\",\"Retcode\":\"-1\"}";
            }
             
        }

        [WebMethod(EnableSession = true)]
        public string DeleteBooking(int BookingSid)
        {
            try
            { 
                tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);
                Booking.Status = "Deleted";
                // DB.tbl_Reservations.DeleteOnSubmit(Booking);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { Retcode = 1 });
               // json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
                //json = "{\"Session\":\"1\",\"Retcode\":\"-1\"}";
            } 
        }

        [WebMethod(EnableSession = true)]
        public string DeleteMultipuleBooking(int[] BookingSid)
        {
            try
            {
                for (int i = 0; i < BookingSid.Length; i++)
                { 
                    tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);
                    Booking.Status = "Deleted";
                    // DB.tbl_Reservations.DeleteOnSubmit(Booking);
                    DB.SubmitChanges();
                }
                return jsSerializer.Serialize(new { Retcode = 1 });
               // json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
               // json = "{\"Session\":\"1\",\"Retcode\":\"-1\"}";
            } 
        }

        [WebMethod(EnableSession = true)]
        public string CompleteBooking(int BookingSid)
        {
            try
            { 
                tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);
                string Paid = Booking.IsPaid.ToString();
                string Service = Booking.Service;

                DateTime Today = DateTime.Today;
                //string TodayDate = Today.ToString("MM-dd-yyyy");
                string TodayDate = Today.ToString("dd-MM-yyyy");
                //DateTime DateTime.Now = GetAppDate(TodayDate);
                DateTime ReservationDate = DateTime.ParseExact(Booking.ReservationDate, "MM-dd-yyyy", null);

                string Times = DateTime.Now.ToString("hh:mm");
                //Times = Times.ToString("HH:mm:ss");
                //string sTime = Times.ToShortTimeString();
                //string a = sTime.ToString("HH:mm:ss");
                string[] Splitter = Times.Split(':');
                Int64 Hours = Convert.ToInt64(Splitter[0]);
                Int64 Min = Convert.ToInt64(Splitter[1]);
                if (Booking.Status == "Completed")
                {
                    return jsSerializer.Serialize(new { Retcode = 2 });
                   // json = "{\"Session\":\"1\",\"Retcode\":\"2\"}";
                }
                else if (Booking.DriverName == "" || Booking.DriverName == null)
                {
                    return jsSerializer.Serialize(new { Retcode = 3 });
                   // json = "{\"Session\":\"1\",\"Retcode\":\"3\"}";
                }
                else if (Paid == "False")
                {
                    return jsSerializer.Serialize(new { Retcode = 4 });
                   // json = "{\"Session\":\"1\",\"Retcode\":\"4\"}";
                }
                else if (ReservationDate >  DateTime.Now)
                {
                    return jsSerializer.Serialize(new { Retcode = 5 });
                    //json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                }
                else if (ReservationDate == DateTime.Now)
                {
                    if (Service == "From Airport")
                    {
                        string BookingTime = Booking.Time;
                        string[] Splitter1 = BookingTime.Split(':');
                        Int64 bHours = Convert.ToInt64(Splitter1[0]);
                        Int64 bMin = Convert.ToInt64(Splitter1[1]);
                        if (bHours > Hours)
                        {
                            return jsSerializer.Serialize(new { Retcode = 5 });
                           // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                        }
                        else if (bHours == Hours)
                        {
                            if (bMin > Min)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                               // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                            }
                        }
                        else
                        {
                            Booking.Status = "Completed";
                            DB.SubmitChanges();
                            return jsSerializer.Serialize(new { Retcode = 1 });
                            //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                        }
                    }
                    else if (Service == "To Airport")
                    {
                        string BookingTime = Booking.Time;
                        string[] Splitter1 = BookingTime.Split(':');
                        Int64 bHours = Convert.ToInt64(Splitter1[0]);
                        Int64 bMin = Convert.ToInt64(Splitter1[1]);
                        if (bHours > Hours)
                        {
                            return jsSerializer.Serialize(new { Retcode = 5 });
                            //json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                        }
                        else if (bHours == Hours)
                        {
                            if (bMin > Min)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                               // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                            }
                        }
                        else
                        {
                            Booking.Status = "Completed";
                            DB.SubmitChanges();
                            return jsSerializer.Serialize(new { Retcode = 1 });
                            //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                        }
                    }
                    else if (Service == "Point To Point Reservation" || Service == "Hourly Reservation")
                    {
                        string BookingTime = Booking.Time;
                        string[] Splitter1 = BookingTime.Split(':');
                        Int64 bHours = Convert.ToInt64(Splitter1[0]);
                        Int64 bMin = Convert.ToInt64(Splitter1[1]);
                        if (bHours > Hours)
                        {
                            return jsSerializer.Serialize(new { Retcode = 5 });
                          //  json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                        }
                        else if (bHours == Hours)
                        {
                            if (bMin > Min)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                               // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                            }
                        }
                        else
                        {
                            Booking.Status = "Completed";
                            DB.SubmitChanges();
                            return jsSerializer.Serialize(new { Retcode = 1 });
                            //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                        }
                    }
                }

                else
                {
                    Booking.Status = "Completed";
                    DB.SubmitChanges();
                    return jsSerializer.Serialize(new { Retcode = 1 });
                    //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                }
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
                //json = "{\"Session\":\"1\",\"Retcode\":\"-1\"}";
            }
            return jsSerializer.Serialize(new { Retcode = 0 });
        }

        [WebMethod(EnableSession = true)]
        public string mCompleteBooking(int[] BookingSid)
        {
            try
            { 
                for (int i = 0; i < BookingSid.Length; i++)
                {

                    tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);
                    string Paid = Booking.IsPaid.ToString();
                    string Service = Booking.Service;

                    DateTime Today = DateTime.Today;
                    //string TodayDate = Today.ToString("MM-dd-yyyy");
                    string TodayDate = Today.ToString("dd-MM-yyyy");
                    //DateTime DateTime.Now = GetAppDate(TodayDate);
                    DateTime ReservationDate = DateTime.ParseExact(Booking.ReservationDate, "MM-dd-yyyy", null);

                    string Times = DateTime.Now.ToString("hh:mm");
                    //Times = Times.ToString("HH:mm:ss");
                    //string sTime = Times.ToShortTimeString();
                    //string a = sTime.ToString("HH:mm:ss");
                    string[] Splitter = Times.Split(':');
                    Int64 Hours = Convert.ToInt64(Splitter[0]);
                    Int64 Min = Convert.ToInt64(Splitter[1]);
                    if (Booking.Status == "Completed")
                    {
                        return jsSerializer.Serialize(new { Retcode = 2 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"2\"}";
                    }
                    else if (Booking.DriverName == "" || Booking.DriverName == null)
                    {
                        return jsSerializer.Serialize(new { Retcode = 3 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"3\"}";
                    } 
                    else if (Paid == "False")
                    {
                        return jsSerializer.Serialize(new { Retcode = 4 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"4\"}";
                    }
                    else if (ReservationDate > DateTime.Now)
                    {
                        return jsSerializer.Serialize(new { Retcode = 5 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                    }
                    else if (ReservationDate == DateTime.Now)
                    {
                        if (Service == "From Airport")
                        {
                            string BookingTime = Booking.Time;
                            string[] Splitter1 = BookingTime.Split(':');
                            Int64 bHours = Convert.ToInt64(Splitter1[0]);
                            Int64 bMin = Convert.ToInt64(Splitter1[1]);
                            if (bHours > Hours)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                                //json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                            }
                            else if (bHours == Hours)
                            {
                                if (bMin > Min)
                                {
                                    return jsSerializer.Serialize(new { Retcode = 5 });
                                   // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                                }
                            }
                            else
                            {
                                Booking.Status = "Completed";
                                DB.SubmitChanges();
                                return jsSerializer.Serialize(new { Retcode = 1 });
                                //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                            }
                        }
                        else if (Service == "To Airport")
                        {
                            string BookingTime = Booking.Time;
                            string[] Splitter1 = BookingTime.Split(':');
                            Int64 bHours = Convert.ToInt64(Splitter1[0]);
                            Int64 bMin = Convert.ToInt64(Splitter1[1]);
                            if (bHours > Hours)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                               // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                            }
                            else if (bHours == Hours)
                            {
                                if (bMin > Min)
                                {
                                    return jsSerializer.Serialize(new { Retcode = 5 });
                                  //  json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                                }
                            }
                            else
                            {
                                Booking.Status = "Completed";
                                DB.SubmitChanges();
                                return jsSerializer.Serialize(new { Retcode = 1 });
                                //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                            }
                        }
                        else if (Service == "Point To Point Reservation" || Service == "Hourly Reservation")
                        {
                            string BookingTime = Booking.Time;
                            string[] Splitter1 = BookingTime.Split(':');
                            Int64 bHours = Convert.ToInt64(Splitter1[0]);
                            Int64 bMin = Convert.ToInt64(Splitter1[1]);
                            if (bHours > Hours)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                               // json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                            }
                            else if (bHours == Hours)
                            {
                                if (bMin > Min)
                                {
                                    return jsSerializer.Serialize(new { Retcode = 5 });
                                    //json = "{\"Session\":\"1\",\"Retcode\":\"5\"}";
                                }
                            }
                            else
                            {
                                Booking.Status = "Completed";
                                DB.SubmitChanges();
                                return jsSerializer.Serialize(new { Retcode = 1 });
                                //json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                            }
                        }
                    }

                    else
                    {
                        Booking.Status = "Completed";
                        DB.SubmitChanges();
                        return jsSerializer.Serialize(new { Retcode = 1 });
                       // json = "{\"Session\":\"1\",\"Retcode\":\"1\"}";
                    }
                }
            }
            catch (Exception ex)
            {
               // json = "{\"Session\":\"1\",\"Retcode\":\"-1\"}"; 
                return jsSerializer.Serialize(new { Retcode = 0, Error = ex.Message });
            }
            return jsSerializer.Serialize(new { Retcode = 0 });
        }

        #endregion
    }
}
