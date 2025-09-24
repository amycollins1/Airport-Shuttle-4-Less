using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Frederick.BL
{
    public class EmailManager
    {
        public static string MailCredentials(string To, bool IsCC, string Body, string Subject)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtpClient = new SmtpClient();
            try
            {
                MailAddress fromAddress = new MailAddress("info@airportshuttles4less.com", "AirportShuttles4Less");
                message.From = fromAddress;
                message.To.Add(To);
                if (IsCC)
                    message.CC.Add("airportshuttle4less@gmail.com");

                message.Subject = Subject;
                message.IsBodyHtml = true;
                message.Body = Body;

                SmtpClient mailObj = new SmtpClient("relay-hosting.secureserver.net", 25);
                mailObj.Credentials = new NetworkCredential("info@airportshuttles4less.com", "$buggy987");
                mailObj.DeliveryMethod = SmtpDeliveryMethod.Network;
                mailObj.EnableSsl = false;
                message.Sender = new MailAddress("info@airportshuttles4less.com", "www.airportshuttle4less.com");
                mailObj.Send(message);
                message.Dispose();
                return "{\"retCode\":\"1\"}";
            }
            catch (Exception ex)
            {
                return "{\"retCode\":\"0\",\"Error\":\"" + ex.Message + "\"}";
            }
        }

        public static string MailHeader()
        {
            StringBuilder sb = new StringBuilder();
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
            sb.Append("        </tr>");
            sb.Append("        <tr>");
            sb.Append("          <td width='100%'><a href='http://www.airportshuttles4less.com'>http://www.airportshuttles4less.com</a></td>");
            sb.Append("        </tr>");
            sb.Append("        <tr>");
            sb.Append("          <td width='100%'><a href='mailto:info@airportshuttles4less.com'>info@airportshuttles4less.com</a></td>");
            sb.Append("        </tr>");
            sb.Append("        <tr>");
            sb.Append("          <td width='25%'>Call Us: 1-844-340-3333, 443-336-3333</td>");
            return sb.ToString();
        }

        public static string MailTermsAndCondition()
        {
            StringBuilder sb = new StringBuilder();

            #region Terms And Condition
            sb.Append("<tr>");
            sb.Append("<td colspan ='2'>");
            sb.Append("<font style='font-size: 14px;font-weight: 800;margin-left: 100px;'>Terms &amp; Conditions / Reservation Agreement: </font><br>");
            sb.Append("<b>1. Bookings.</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Online: [www.airportshuttles4less.com](http://www.airportshuttles4less.com)<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Phone: 1-443-336-3333<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- WhatsApp: 1-443-336-3333<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Email: Info@airportshuttles4less.com<br>");
            sb.Append("<b>2. Cancellations</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sedan & SUV: Cancellations must be made at least 24 hours in advance.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Minibus and Sprinters: Cancellations must be made at least 72 hours in advance.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Buses & Groups: Cancellations will be evaluated on a case-by-case basis.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 50% of the total booking amount will be deducted if cancellations occur within the specified cancellation window.<br>");
            sb.Append("<b>3. Changes</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- No charge for changes; however, the cancellation policy applies.<br>");
            sb.Append("<b>4. Payments</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Accepted payment methods: American Express, VISA, MasterCard, Discover, and PayPal (online payment option available upon request).<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Corporate accounts available on a case-by-case basis.<br>");
            sb.Append("<b>5. Additional Charges</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Gratuity: 15%<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Fuel Surcharge: 5%<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Meet & Greet: $35.00<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Airport Fee: $5.00<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Child Seat: $20.00<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Holiday Surcharge: $20.00<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- AM/PM Surcharge (10:00 PM to 5:00 AM): $35.00<br>");
            sb.Append("<b>6. Pick-up Time Allowance</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Non-Airport: 15 minutes<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Domestic Flights: 30 minutes<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- International Flights: 1 hour<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Additional time will be charged at an hourly rate of $30 per hour.<br>");
            sb.Append("<b>7. Deposits</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sedans, SUVs, and Sprinters: 100% authorization in advance is required.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Larger equipment or group bookings: Deposit requirements start at 50%; consult with management for specifics.<br>");
            sb.Append("<b>8. Resolution Process</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- All complaints must be emailed to Info@airportshuttles4less.com. A manager will respond within 24 hours on weekdays and on the following Monday if received during the weekend.<br>");
            sb.Append("<b>9. Vehicle Cleaning Fees</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- A minimum fee of $250.00 will be charged for any extraordinary interior cleaning required.");
            sb.Append("<b>10. Guest Policy</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- No smoking is permitted in the vehicle.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Illegal drugs are not allowed in the vehicle.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Vehicle capacity, as specified by the type and capacity of the vehicle, must not be exceeded. Customers will be liable for extra luggage charges.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- AS4L drivers have the right to terminate the contract and service without refund in case of misconduct.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- AS4L is not liable for any personal or material damages resulting from misconduct by guests.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- No smoking is permitted in the vehicle (repeated for emphasis).<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- AS4L is not responsible for mechanical issues, inclement weather, or other uncontrollable circumstances that prevent service as scheduled.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- If the requested vehicle cannot be provided, a vehicle of equal quality will be supplied.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- AS4L reserves the right to adjust rates without notice due to:<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a) Changes in fuel charges.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b) Destinations outside the immediate service area.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c) Inclement weather.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d) Road conditions.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e) Increases in the number of passengers and/or luggage.<br>");
            sb.Append("<b>11. Reservation Booking Notice</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Notice periods vary based on availability, peak times, and weekends. Generally, a 2-hour notice is required for sedans and 24 hours for larger vehicles.<br>");
            sb.Append("<b>12. Reservations and Customer Support Hours</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- We operate 24/7/365, including all holidays<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Payment Privacy: At AirportShuttles4Less (AS4L), we prioritize your privacy and security. AS4L does not store any credit card information. We utilize PayPal as our trusted payment gateway provider. For further details on how your information is handled, please refer to PayPal's privacy policy.<br>");
            sb.Append("<b>13. Natural Disaster</b><br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- We will not be held liable for safekeeping of any items left in the vehicle.<br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- We are not responsible for delays or termination due to severe weather or unsafe road conditions. <br>");
            sb.Append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- We will not be held liable in the event of a mechanical breakdown and will only be responsible for making up lost time at a mutually agreed upon date.<br>");
            sb.Append("	</td>                    ");
            sb.Append("	</tr>                    ");
            sb.Append("      </tbody></table>    ");
            sb.Append("  </td></tr>              ");
            #endregion
            return sb.ToString();
        }

        public static string MailSignature()
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("<tr><td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td></tr>");
            sb.Append("<tr><td colspan = '2'>Best Regards,</td></tr>");
            sb.Append("<tr><td colspan = '2'>Airport Shuttles 4 Less Worldwide, Sedan, SUVs, VANS & Buses</td></tr>");
            sb.Append("<tr><td colspan = '2'>A Subsidiary of RnH Transportation Worldwide Chauffeured Transportation Service</td></tr>");
            sb.Append("<tr><td colspan = '2'>info@airportshuttles4less.com</td></tr>");
            sb.Append("<tr><td colspan = '2'>http://www.airportshuttles4less.com</td></tr>");
            sb.Append("<tr><td colspan = '2'>Direct: 443-336-3333 Toll Free: 1-844-340-3333</td></tr>");
            sb.Append("<tr><td colspan = '2'>Like us on Facebook: https://www.facebook.com/Airportshuttles4less </td></tr>");
            sb.Append("<tr><td colspan = '2'>Leave a Review on Google! https://g.page/r/CVwlSWDkn9ohEBM/review </td></tr>");
            sb.Append("<tr><td colspan = '2'>Follow us on Twitter. https://x.com/AS4LUS </td></tr>");
            sb.Append("<tr><td colspan = '2'>Follow us on Instagram. https://www.instagram.com/airportshuttles4less </td></tr>");
            sb.Append("<tr><td colspan = '2'><img src='https://airportshuttles4less.com/assets/img/AS4L-Logo-b.svg' width='150' height='200'></td></tr>");
            sb.Append("</tbody></table>");
            sb.Append("</body></html>");
            return sb.ToString();
        }

        public static string CustomerBody(string ResId)
        {
            try
            {
                DBHelperDataContext DB = new DBHelperDataContext();

                tbl_Login Driver = new tbl_Login();
                tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.ReservationId == ResId);
                tbl_VehInfo Vehicle = DB.tbl_VehInfos.Single(x => x.Sid == Booking.VehicleId);

                #region Customer Mail
                StringBuilder sb = new StringBuilder();

                sb.Append(MailHeader());
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
                sb.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Booking.CreatedDate.Split(' ')[0] + "</td>");
                sb.Append("  	</tr>");
                sb.Append("  	<tr>");
                sb.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Thank you for choosing AirportShuttles4Less (AS4L) for your travel needs! Below, you will find your confirmation. If any of the information is incorrect, please contact our office immediately for corrections.<br>&nbsp;</td>");
                sb.Append("	</tr>");
                sb.Append("      </tbody></table>");
                sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                sb.Append("	<tbody><tr>");

                sb.Append("	  <td class='heading'>Pickup Date:</td>");
                sb.Append("	  <td width='75%'>" + Booking.ReservationDate + "</td>");
                sb.Append("	</tr>                                             ");

                if (Booking.DriverId != 0)
                {
                    Driver = (from Obj in DB.tbl_Logins where Obj.Sid == Booking.DriverId select Obj).FirstOrDefault();
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
                }

                sb.Append("	<tr>                                              ");
                sb.Append("	  <td class='heading'>Pickup Time:</td>          ");
                sb.Append("	  <td width='75%'>" + Booking.Time + "</td>");

                sb.Append("	</tr>                                             ");
                sb.Append("	<tr>                                              ");
                sb.Append("	  <td class='heading' valign='Top' style='border-bottom:thin solid green;'>Vehicle Type:</td>           ");
                sb.Append("	  <td width='75%' style='border-bottom:thin solid green;'>                                              ");
                sb.Append("	  " + Vehicle.Model + " <br>&nbsp;</td>                                                                                    ");
                sb.Append("	</tr>      ");

                sb.Append("	<tr>                                              ");
                sb.Append("	  <td class='heading'>Primary Contact:</td>       ");
                sb.Append("	  <td width='75%'>" + Booking.FirstName + " " + Booking.LastName + "</td>           ");
                sb.Append("	</tr>                                             ");
                sb.Append("	<tr>                                              ");
                sb.Append("	  <td class='heading'>Contact Number:</td>        ");
                if (Booking.PhoneNo != "")
                {
                    sb.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>               ");
                }
                else
                {
                    tbl_Login Login = DB.tbl_Logins.Single(x => x.Email == Booking.Email);
                    sb.Append("	  <td width='75%'>" + Login.MobileNo + "</td>               ");
                }
                sb.Append("	</tr>                                             ");
                sb.Append("	<tr>                                              ");
                sb.Append("	  <td class='heading'>No. of Passenger:</td>         ");
                sb.Append("	  <td width='75%'>" + Booking.Passenger + "</td>                          ");
                sb.Append("	</tr>                                             ");

                if (Booking.Service == "Hourly")
                {
                    sb.Append("	<tr>                                              ");
                    sb.Append("	  <td class='heading'>Hours:</td>         ");
                    sb.Append("	  <td width='75%'>" + Booking.Hours + "</td>                          ");
                    sb.Append("	</tr>");
                }

                sb.Append(BookingDetails(Booking));

                sb.Append("        <tr>                                                                                             ");
                sb.Append("          <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>                            ");
                sb.Append("        </tr>                                                                                            ");
                sb.Append("                                                                                                         ");

                if (Booking.CardType != null)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Payment Method:</td>                                                                 ");
                    sb.Append("	  <td>" + Booking.CardType + "**" + Booking.CardLast4 + "");
                    sb.Append("	</td></tr>                                                                                              ");
                }

                sb.Append(" 	<tr>");
                sb.Append("	  <td class='heading'>Quoted Rate:</td>");
                sb.Append("	  <td>$ " + decimal.Round(Convert.ToDecimal(Booking.Fare), 2) + "");
                sb.Append("	</td></tr>");
                sb.Append("");
                sb.Append("	<tr>");
                sb.Append("	  <td class='heading'>Gratuity:</td>");
                sb.Append("	  <td>$ " + (Booking.Gratuity).Split('^')[0] + "");
                sb.Append("	</td></tr>");
                if (Booking.IsHalt == true)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Halt Discount:</td>                                                                 ");
                    sb.Append("	  <td>$ " + (Booking.HaltingDiscount) + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                if (Booking.IsMeetAndGreet == true)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Meet Great:</td>                                                                 ");
                    sb.Append("	  <td>$ " + 30 + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                if (Booking.IsLateNight == true)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Late Night:</td>                                                                 ");
                    sb.Append("	  <td>$ " + 15 + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                //Covid
                if (Booking.IsSanitization == true)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Sanitization Charges:</td>                                                                 ");
                    sb.Append("	  <td>$ " + 5 + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                //Snow Charges
                if (Booking.IsSnow == true)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading'>Snow Charges:</td>                                                                 ");
                    sb.Append("	  <td>$ " + (Booking.Snow).Split('^')[0] + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                if (Booking.OfferDetail != "")
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading' valign='top'><font color='green'>Offer Applied:</font></td>");
                    sb.Append("	  <td>- $ " + (Booking.OfferDetail).Split('^')[2] + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                if (Booking.ExtraBags > 0)
                {
                    sb.Append(" 	<tr>                                                                                                ");
                    sb.Append("	  <td class='heading' valign='top'><font color='green'>Extra Bags Charge:</font></td>");
                    sb.Append("	  <td>- $ " + (Booking.ExtraBagCharge) + "                                                                                         ");
                    sb.Append("	</td></tr>     ");
                }
                if ((bool)Booking.IsPetInCage)
                {
                    sb.Append("<tr>");
                    sb.Append("<td class='heading'>Pet In Cage :</td>");
                    sb.Append("<td>$ " + Booking.PetInCageCharge + "");
                    sb.Append("</td></tr>");
                }
                if ((bool)Booking.IsChildSeat)
                {
                    sb.Append("<tr>");
                    sb.Append("<td class='heading'>Child Seat (" + Booking.ChildSeatType + ") :</td>");
                    sb.Append("<td>$ " + Booking.ChildSeatCharge + "");
                    sb.Append("</td></tr>");
                }
                if (Booking.CardProcessingFee != null)
                {
                    sb.Append("<tr>");
                    sb.Append("<td class='heading'>Card Processing Fee :</td>");
                    //sb.Append("<td class='heading'>Card Processing Fee "+ (Booking.CardProcessingFee).Split('^')[1] + " % :</td>");
                    sb.Append("<td>$ " + (Booking.CardProcessingFee).Split('^')[0] + "");
                    sb.Append("</td></tr>");
                }
                sb.Append("	<tr>                                                                                                    ");
                sb.Append("	  <td class='heading'>Reservation Total:</td>                                                           ");
                sb.Append("	  <td><b>$ " + decimal.Round(Convert.ToDecimal(Booking.TotalFare), 2) + "</b>                                                                                         ");
                sb.Append("	</td></tr>                                                                                              ");
                sb.Append("	<tr>                                                                                                    ");
                sb.Append("	  <td class='heading' valign='top'><font color='red'>Total Due:</font></td>");
                decimal TotalDue = 0;
                if (Convert.ToBoolean(Booking.IsPaid))
                {
                    TotalDue = decimal.Round(Convert.ToDecimal(TotalDue), 2);
                }
                else
                {
                    TotalDue = decimal.Round(Convert.ToDecimal(Booking.TotalFare), 2);
                }
                sb.Append("	  <td><font color='red'><b>$ " + TotalDue + "</b><br>&nbsp;</font>");
                sb.Append("	</td></tr>");

                if (Booking.Remark != "")
                {
                    sb.Append("	<tr>");
                    sb.Append("	  <td class='heading'>Remark:</td>");
                    sb.Append("	  <td>" + Booking.Remark + "</td>");
                    sb.Append("</tr>");
                }

                //sb.Append("	<tr>                                                                                                    ");
                //sb.Append("	  <td class='heading' valign='top'><font color='red'>Note:</font></td>");
                //sb.Append("<td><font color='red'><b>Late Night Charges and extra service charges may not show in 'Quoted Rate'. It will automatically add up in Reservation Total</b></font></td>");
                //sb.Append("	</tr>");
                //Covid
                //if (Convert.ToBoolean(Booking.IsSanitization))
                //{
                //    sb.Append("<tr>");
                //    sb.Append("<td style='border-top:thin solid green;' colspan='2'><font style='font-size: 14px;font-weight: 800;'>Sanitization: </font><font color=\"red\">Due to COVID-19, AirportShuttles4Less is suspending our share-ride service until further notice, and ONLY providing exclusive transportation services to illuminate the spread of the virus through potential exposure. You will also notice a slight increase in prices to cover the costs of enhanced cleaning services and added protective measures, as the health and safety of our clients and drivers is of utmost importance. We thoroughly sanitize our vehicles before and after each service to follow state guidelines.</font></td>");
                //    sb.Append("	</tr>");
                //}

                sb.Append("        <tr>                                                                                             ");
                sb.Append("          <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>                            ");
                sb.Append("        </tr>                                                                                            ");
                sb.Append("                                                                                                         ");
                //sb.Append("	  <td style='border-bottom:thin solid green;'><font color='red'>$ " + TotalDue + "<br>&nbsp;</font></td>");
                //sb.Append("	</tr>                                                                                              ");

                sb.Append(MailTermsAndCondition());
                sb.Append(MailSignature());

                #endregion
                string Mail = sb.ToString();

                string Subject = "";

                if (Booking.Status == "Completed")
                {
                    //message.Subject = "Receipt for bwi shuttle service Reservation made for " + Booking.ReservationDate;
                    Subject = "Receipt Booking-" + Booking.ReservationId;
                }
                else if (Booking.Status == "Cancelled")
                    Subject = "Booking Cancelled-" + Booking.ReservationId;
                else
                {
                    //message.Subject = "Confirm Booking-" + Booking.ReservationID;
                    Subject = "Confirmation for AirportShuttles4Less Reservation made for " + Booking.ReservationDate;
                }

                string Res = MailCredentials(Booking.Email, true, sb.ToString(), Subject);

                #region Driver Mail
                StringBuilder sbDriver = new StringBuilder();
                if (Booking.DriverId != 0)
                {
                    var VehicleInfo = (from Obj in DB.tbl_VehInfos where Obj.Sid == Booking.VehicleId select Obj).FirstOrDefault();

                    #region Driver Mail Template
                    sbDriver.Append(MailHeader());
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
                    sbDriver.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Booking.CreatedDate.Split(' ')[0] + "</td>");
                    sbDriver.Append("  	</tr>");
                    sbDriver.Append("  	<tr>");
                    sbDriver.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Hi, " + Driver.FirstName + " " + Driver.LastName + " you have Booking with following Details.If any of the information appears to be incorrect, please contact our office immediately to correct it. <br>&nbsp;</td>");
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("      </tbody></table>");
                    sbDriver.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                    sbDriver.Append("	<tbody><tr>");
                    sbDriver.Append("	  <td class='heading'>SUBJ:Rez:</td>");
                    sbDriver.Append("	  <td width='75%'>" + Booking.ReservationDate + "</td>          ");
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("  	<tr>");
                    sbDriver.Append("	  <td class='heading'>MSG: F/T:</td>");

                    if (Booking.Airlines == null)
                        sbDriver.Append("	  <td width='75%'>" + Booking.Time + "</td>");
                    else
                        sbDriver.Append("	  <td width='75%'>" + Booking.Time + ", " + Booking.Airlines + "</td>");

                    sbDriver.Append("	</tr>");

                    if (Booking.Service != "Point To Point" && Booking.Service != "Hourly")
                    {
                        if (Booking.Service == "To Airport" || Booking.Service == "To Airport Shuttle")
                        {
                            if (Booking.FlightNumber != "")
                            {
                                sbDriver.Append("	<tr>                                              ");
                                sbDriver.Append("	  <td class='heading'> Flight Number: </td>          ");
                                sbDriver.Append("	  <td width='75%'>" + Booking.FlightNumber + "</td>          ");
                                sbDriver.Append("	</tr>                                             ");
                            }
                        }
                        else
                        {
                            sbDriver.Append("	<tr>                                              ");
                            sbDriver.Append("	  <td class='heading'> Flight Number: </td>          ");
                            sbDriver.Append("	  <td width='75%'>" + Booking.FlightNumber + "</td>          ");
                            sbDriver.Append("	</tr>                                             ");
                        }
                    }
                    if (Booking.Service == "Hourly Reservation")
                    {
                        sbDriver.Append("	<tr>");
                        sbDriver.Append("	  <td class='heading'>Hours:</td>         ");
                        sbDriver.Append("	  <td width='75%'>" + Booking.Hours + "</td>");
                        sbDriver.Append("	</tr>");
                    }
                    sbDriver.Append("	<tr>");
                    //if (Booking.Service == "To Airport")
                    //{
                    if (Booking.Service == "Point To Point" || Booking.Service == "Hourly")
                    {
                        sbDriver.Append("	  <td class='heading'>Service: </td>          ");
                        sbDriver.Append("	  <td width='75%'>" + Booking.Service + "</td>          ");
                    }
                    else
                    {
                        sbDriver.Append("	  <td class='heading'>" + Booking.Service + ": </td>          ");
                        if (Booking.Service == "To Airport" || Booking.Service == "To Airport Shuttle")
                            sbDriver.Append("	  <td width='75%'>" + Booking.Destination + "</td>          ");
                        if (Booking.Service == "From Airport" || Booking.Service == "From Airport Shuttle")
                            sbDriver.Append("	  <td width='75%'>" + Booking.Source + "</td>          ");
                    }
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("	<tr>");
                    if (Booking.Service == "To Airport" || Booking.Service == "Hourly" || Booking.Service == "Point To Point" || Booking.Service == "To Airport Shuttle")
                    {
                        sbDriver.Append("	  <td class='heading'>P/U: </td>          ");
                        sbDriver.Append("	  <td width='75%'>" + Booking.Source + "</td>               ");
                    }
                    else if (Booking.Service == "From Airport" || Booking.Service == "From Airport Shuttle")
                    {
                        sbDriver.Append("	  <td class='heading'>Dest: </td>          ");
                        sbDriver.Append("	  <td width='75%'>" + Booking.Destination + "</td>               ");
                    }
                    if (Booking.Service == "Hourly" || Booking.Service == "Point To Point")
                    {
                        sbDriver.Append("	</tr>");
                        sbDriver.Append("	<tr>");
                        sbDriver.Append("	  <td class='heading'>Dest: </td>          ");
                        sbDriver.Append("	  <td width='75%'>" + Booking.Destination + "</td>               ");
                    }
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("	<tr>");
                    sbDriver.Append("	  <td class='heading'>Vehicle: </td>          ");
                    sbDriver.Append("	  <td width='75%'>" + VehicleInfo.Model + "</td>               ");
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("	<tr>");
                    sbDriver.Append("	  <td class='heading'>Name:</td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Booking.FirstName + " " + Booking.LastName + "</td>                      ");
                    sbDriver.Append("	</tr>                                             ");
                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'># :</td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Booking.PhoneNo + "</td>               ");
                    sbDriver.Append("	</tr>");

                    if (Booking.Remark != "")
                    {
                        sbDriver.Append("	<tr>");
                        sbDriver.Append("	  <td class='heading'>Booking Comments:</td>          ");
                        sbDriver.Append("	  <td width='75%'>" + Booking.Remark + "</td>                      ");
                        sbDriver.Append("	</tr>                                             ");
                    }

                    sbDriver.Append("        </tr>");
                    sbDriver.Append("                          ");

                    sbDriver.Append("      </tbody></table>    ");
                    sbDriver.Append("  </td></tr>              ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("</tbody></table>          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("</body></html>            ");
                    string Design = sbDriver.ToString();
                    #endregion
                    //}
                }

                Mail = sbDriver.ToString();
                #endregion

                if (Booking.Status == "Cancelled")
                    Subject = "Booking Cancelled - " + Booking.ReservationId;
                else
                    Subject = "You have Booking - " + Booking.ReservationId;

                Res = MailCredentials(Driver.Email, false, sbDriver.ToString(), Subject);
                return Res;
            }
            catch (Exception ex)
            {
                return "{\"retCode\":\"0\",\"Error\":\"" + ex.Message + "\"}";
            }
        }

        public static string BookingDetails(tbl_Reservation Booking)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<tr>");
            sb.Append("<td class='heading'>Service:</td>");
            sb.Append("<td width='75%'>" + Booking.Service + "</td>");
            sb.Append("</tr>");
            sb.Append("	<tr>                                                                                                    ");

            //if (Booking.Service == "From Airport" || Booking.Service == "To Airport" || Booking.Service == "From Airport Shuttle" || Booking.Service == "To Airport Shuttle" || Booking.Service == "Hourly")
            //{
            sb.Append("	  <td class='heading'>Trip Routing Details:</td>");
            sb.Append("<td><b>Pick-up Location: &nbsp;</b>" + Booking.Source + "</td>");
            sb.Append("	</tr>");
            sb.Append("	<tr>");
            sb.Append("	  <td class='heading'>&nbsp;</td>");
            sb.Append("	  <td><b>Drop-off Location: &nbsp;</b>" + Booking.Destination + "</td>");

            //}
            //else if (Booking.Service == "Point To Point")
            //{
            //    string[] Locations = (Booking.P2PLocation).Split('^');
            //    for (int i = 0; i < Locations.Length; i++)
            //    {
            //        Int64 No = i + 1;
            //        sb.Append("	  <td class='heading'>Location " + No + ":</td>");
            //        sb.Append("<td width='75%'>" + Locations[i] + "</td>");
            //        if (Locations.Length != i + 1)
            //            sb.Append("	</tr>");
            //    }
            //string Location = "", HaltTime = "", Mics = "";

            //sb.Append("	</tr>");
            //sb.Append("	<tr>");
            //sb.Append("	  <td class='heading'>&nbsp;</td>");
            //sb.Append("	  <td><table style=\"width:100%\"><thead><tr><th>Location</th><th>Halting Time</th><th>MISC</th></tr></thead><tbody>");
            //if (Booking.Stop1 != "^-:-^")
            //{
            //    Location = ""; HaltTime = ""; Mics = "";
            //    GetP2PLocation(Booking.Stop1, out Location, out HaltTime, out Mics);
            //    sb.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
            //}
            //if (Booking.Stop2 != "^-:-^")
            //{
            //    Location = ""; HaltTime = ""; Mics = "";
            //    GetP2PLocation(Booking.Stop2, out Location, out HaltTime, out Mics);
            //    sb.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
            //}
            //if (Booking.Stop3 != "^-:-^")
            //{
            //    Location = ""; HaltTime = ""; Mics = "";
            //    GetP2PLocation(Booking.Stop3, out Location, out HaltTime, out Mics);
            //    sb.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
            //}
            //if (Booking.Stop4 != "^-:-^")
            //{
            //    Location = ""; HaltTime = ""; Mics = "";
            //    GetP2PLocation(Booking.Stop4, out Location, out HaltTime, out Mics);
            //    sb.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
            //}
            //if (Booking.Stop5 != "^-:-^")
            //{
            //    Location = ""; HaltTime = ""; Mics = "";
            //    GetP2PLocation(Booking.Stop5, out Location, out HaltTime, out Mics);
            //    sb.Append("<tr><td style=\"text-align: center;\">" + Location + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + HaltTime + "</td>");
            //    sb.Append("<td style=\"text-align: center;\">" + Mics + "</td></tr>");
            //}
            //sb.Append("</tbody></table></td>");
            //}
            //else if (Booking.Service == "Hourly Reservation")
            //{
            //    sb.Append("<td><b>Pick-up Location: &nbsp;</b>" + Booking.Source + "</td>");
            //}
            sb.Append("</tr>");
            return sb.ToString();
        }

        public static string RegisterMail(string Email)
        {
            StringBuilder sb = new StringBuilder();

            #region Registration Mail Template
            sb.Append("<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
            sb.Append("<title>AirportShuttles4Less</title>  ");
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
            sb.Append("<br>");
            sb.Append("<P>Greetings</P>");
            sb.Append("<P>Thank you for registering on AirportShuttles4Less. We welcome you.</P>");
            sb.Append("<P>Now, you can create and check existing reservations with this user name and password.</P>");
            sb.Append("<P>Please keep this information safe. </P>");
            sb.Append("</body></html>            ");
            #endregion

            string Res = MailCredentials(Email, false, sb.ToString(), "Registration Mail");
            return Res;
        }

        public static string MailPassword(string Name, string Email, string Password)
        {
            StringBuilder sb = new StringBuilder();

            #region Send Password Template
            sb.Append(MailHeader());
            //sb.Append("          <td width='75%' align='right'><font size='3'>");
            //sb.Append("		Receipt");
            //sb.Append("	     </font></td>");
            sb.Append("        </tr>");
            sb.Append("      </tbody></table>");
            sb.Append("     </td>");
            sb.Append("  </tr><tr>");
            sb.Append("  </tr><tr>");
            sb.Append("    <td colspan='13' width='660'>");
            sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
            sb.Append("  	<tbody><tr>");
            sb.Append("  	</tr>");
            sb.Append("  	<tr>");
            sb.Append("    	  <td colspan='13'><br><b>Hi " + Name + ",</b><br>&nbsp;</td>");
            sb.Append("	</tr>");
            sb.Append("  	<tr>");
            sb.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>");
            sb.Append("	     <font size='3'>Your Password is " + Password + " </font><br>&nbsp;</td>");
            sb.Append("	</tr>");
            sb.Append("      </tbody></table>");
            sb.Append("</body></html>            ");
            #endregion

            string Res = MailCredentials(Email, false, sb.ToString(), "Forgot Password Mail");
            return Res;
        }

        public static string CommentMail(string Name, string Email, string Phone, string Message)
        {
            #region Email Template
            string EmailTemplate = "<html><body>" +
                                        "<div align=\"center\">" +
                                        "<table style=\"width:90%;border:silver 1px solid\" cellspacing=\"0\" cellpadding=\"0\">" +
                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:center;padding:6px 5px 0px 5px;height:40px;FONT-FAMILY: Verdana;color:White; FONT-SIZE: 14px;background-color:Black\"><span>Comment Mail</span></td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Name:</b> " + Name + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Email:</b> " + Email + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Phone:</b> " + Phone + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Message:</b> " + Message + "</td>" +
                                        "</tr>" +

                                        //"<tr>" +
                                        //"<td width=\"100%\" style=\"vertical-align:middle;text-align:left;padding:20px 15px 20px 15px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Thank You</b><br/>Adminstrator</td>" +
                                        //"</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"padding:8px 5px 8px 5px;text-align:center;FONT-SIZE: 11pt;color:#007CC2;FONT-FAMILY: Tahoma;background-color:Silver\"><a href='http://www.bluedolf.com/'>BlueDolf Technologies</a></td>" +
                                        "</tr>" +

                                        "</table>" +
                                        "</div>" +
                                        "</html></body>";
            #endregion

            string Res = MailCredentials("airportshuttle4less@gmail.com", false, EmailTemplate, "Comment Mail");
            return Res;
        }

        public static string EnquiryMail(string Name, string MobileNo, string Email, string Message)
        {
            #region Email Template
            string EmailTemplate = "<html><body>" +
                                        "<div align=\"center\">" +
                                        "<table style=\"width:90%;border:silver 1px solid\" cellspacing=\"0\" cellpadding=\"0\">" +
                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:center;padding:6px 5px 0px 5px;height:40px;FONT-FAMILY: Verdana;color:White; FONT-SIZE: 14px;background-color:Black\"><span>Enquiry Mail</span></td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Name:</b> " + Name + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>MobileNo:</b> " + MobileNo + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Email:</b> " + Email + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"vertical-align:top;text-align:left;padding:6px 5px 6px 5px;height:50px;FONT-FAMILY: Verdana;FONT-SIZE: 14px\"><b>Message:</b> " + Message + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                        "<td width=\"100%\" style=\"padding:8px 5px 8px 5px;text-align:center;FONT-SIZE: 11pt;color:#007CC2;FONT-FAMILY: Tahoma;background-color:Silver\"><a href='http://www.bluedolf.com/'>BlueDolf Technologies</a></td>" +
                                        "</tr>" +

                                        "</table>" +
                                        "</div>" +
                                        "</html></body>";
            #endregion

            string Res = MailCredentials("airportshuttle4less@gmail.com", false, EmailTemplate, "Enquiry Mail");
            return Res;
        }

        #region Corporate Email
        public static string CorpEmail(tbl_CorpReservation Res, List<tbl_CorpReservationDetail> ResDet, bool IsCorp, bool IsDriver, bool IsBWI)
        {
            StringBuilder sbDriver = new StringBuilder();
            DBHelperDataContext DB = new DBHelperDataContext();
            StringBuilder sb = new StringBuilder();
            tbl_Login Driver = new tbl_Login();
            try
            {
                sb.Append("<html xmlns=\"http: www.w3.org/1999/xhtml\">");
                sb.Append("<head>");
                sb.Append("    <meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
                sb.Append("    <title>www.bwishuttleservice.com- Customer Receipt</title>");
                sb.Append("    <style>");
                sb.Append("        .Norm {");
                sb.Append("            font-family: Verdana;");
                sb.Append("            font-size: 12px;");
                sb.Append("            font-color: red;");
                sb.Append("        }");
                sb.Append("        .table {");
                sb.Append("            width: 100%;");
                sb.Append("        }");
                sb.Append("        .heading {");
                sb.Append("            font-family: Verdana;");
                sb.Append("            font-size: 14px;");
                sb.Append("            font-weight: 800;");
                sb.Append("            width: 14%;");
                sb.Append("        }");
                sb.Append("        td {");
                sb.Append("            font-family: Verdana;");
                sb.Append("            font-size: 12px;");
                sb.Append("        }");
                sb.Append("    </style>");
                sb.Append("    <style>");
                sb.Append("        .askemmy {");
                sb.Append("            background: #fff url(chrome-extension: gllmlkidgbagkcikijiljllpdloelocn/logo_housefly_new.png) no-repeat right 5px bottom 5px;");
                sb.Append("            background-size: 45px;");
                sb.Append("        }");
                sb.Append("        .askemmy {");
                sb.Append("            z-index: 10000;");
                sb.Append("            position: fixed;");
                sb.Append("            display: block;");
                sb.Append("            width: 350px;");
                sb.Append("            height: 145px;");
                sb.Append("            background-color: white;");
                sb.Append("            border-radius: 2px;");
                sb.Append("            box-shadow: rgb(133, 133, 133) 0px 0px 25px 1px;");
                sb.Append("            margin: 0 auto;");
                sb.Append("            text-align: center;");
                sb.Append("            margin-left: 35%;");
                sb.Append("            margin-top: 10%;");
                sb.Append("        }");
                sb.Append("            .askemmy p#msg {");
                sb.Append("                font-size: 1.1em;");
                sb.Append("                font-weight: 600;");
                sb.Append("                margin-top: 31px;");
                sb.Append("                margin-bottom: 20px;");
                sb.Append("            }");
                sb.Append("            .askemmy .error-msg {");
                sb.Append("                color: #FF5600;");
                sb.Append("                padding-top: 10px;");
                sb.Append("            }");
                sb.Append("            .askemmy .success-msg {");
                sb.Append("                color: green;");
                sb.Append("                padding-top: 10px;");
                sb.Append("            }");
                sb.Append("            .askemmy input {");
                sb.Append("                padding: .5em .6em;");
                sb.Append("                display: inline-block;");
                sb.Append("                border: 1px solid #ccc;");
                sb.Append("                box-shadow: inset 0 1px 3px #ddd;");
                sb.Append("                border-radius: 4px;");
                sb.Append("                vertical-align: middle;");
                sb.Append("                -webkit-box-sizing: border-box;");
                sb.Append("                box-sizing: border-box;");
                sb.Append("                line-height: normal;");
                sb.Append("                -webkit-appearance: textfield;");
                sb.Append("                cursor: auto;");
                sb.Append("            }");
                sb.Append("                .askemmy input[type='submit'] {");
                sb.Append("                    font-family: inherit;");
                sb.Append("                    font-size: 100%;");
                sb.Append("                    padding: .5em 1em;");
                sb.Append("                    color: white;");
                sb.Append("                    font-weight: 600;");
                sb.Append("                    border: 1px solid #999;");
                sb.Append("                    border: 0 rgba(0,0,0,0);");
                sb.Append("                    background-color: rgba(31, 196, 255, .8);");
                sb.Append("                    text-decoration: none;");
                sb.Append("                    border-radius: 2px;");
                sb.Append("                    display: inline-block;");
                sb.Append("                    zoom: 1;");
                sb.Append("                    line-height: normal;");
                sb.Append("                    white-space: nowrap;");
                sb.Append("                    vertical-align: middle;");
                sb.Append("                    text-align: center;");
                sb.Append("                    cursor: pointer;");
                sb.Append("                    -webkit-user-drag: none;");
                sb.Append("                    -webkit-user-select: none;");
                sb.Append("                    user-select: none;");
                sb.Append("                    -webkit-box-sizing: border-box;");
                sb.Append("                    box-sizing: border-box;");
                sb.Append("                }");
                sb.Append("            .askemmy .closebox {");
                sb.Append("                display: inline-block;");
                sb.Append("                height: 16px;");
                sb.Append("                width: 16px;");
                sb.Append("                position: absolute;");
                sb.Append("                right: 4px;");
                sb.Append("                top: 4px;");
                sb.Append("                cursor: pointer;");
                sb.Append("                background: url(chrome-extension: gllmlkidgbagkcikijiljllpdloelocn/close_box.png);");
                sb.Append("            }");
                sb.Append("    </style>");
                sb.Append("</head>");
                sb.Append("<body marginwidth='0' marginheight='0' topmargin='0' leftmargin='0' rightmargin='0' bottommargin='0'>");
                sb.Append("      <table width='100%'>");
                sb.Append("        <tbody><tr>");
                //sb.Append("          <td colspan='2' width='100%' class='heading'><b>Bwi Shuttle Service</b></td>");
                sb.Append("        </tr>");
                //sb.Append("        <tr>");
                //sb.Append("          <td colspan='2' width='100%'><a href='http://www.bwishuttleservice.com/'>http://www.bwishuttleservice.com</a></td>");
                //sb.Append("        </tr>");
                sb.Append("        <tr>");
                sb.Append("          <td colspan='3' width='100%'><a href='http://www.bwishuttleservice.com'>http://www.bwishuttleservice.com</a></td>");
                sb.Append("        </tr>");
                sb.Append("        <tr>");
                sb.Append("          <td colspan='3' width='100%'><a href='mailto:bwiairportshuttleservice@gmail.com'>bwiairportshuttleservice@gmail.com</a></td>");
                sb.Append("        </tr>");
                sb.Append("        <tr>");
                sb.Append("          <td colspan='2' width='25%'>Call Us: 1-844-904-5151, 410-904-5151</td>");
                sb.Append("          <td width='75%' align='right'><font size='3'>");
                sb.Append("		Receipt");
                sb.Append("	     </font></td>");
                sb.Append("        </tr>");
                sb.Append("      </tbody></table>");
                sb.Append("     </td>");

                sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                sb.Append("  	<tbody>");
                sb.Append("  </tr><tr>");
                sb.Append("  </tr><tr>");
                sb.Append("    <td colspan='13' width='660'>");
                sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                sb.Append("  	<tbody><tr>");
                sb.Append("  	  <td width='70%' style='border-bottom:medium solid blue; font-size:16px'><b>Reservation # " + Res.ReservationNo + "</b></td>");
                //DateTime Sdate = DateTime.ParseExact(Res.DateTime.Split(' ')[0], "MM-dd-yyyy", CultureInfo.InvariantCulture);
                //string SerDate = Sdate.ToString("MM-dd-yyyy");
                sb.Append("  	  <td width='100%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Res.DateTime.Split(' ')[0] + "</td>");
                sb.Append("  	</tr>");
                sb.Append("  	<tr>");
                sb.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Thank you for traveling with BWI Shuttle Service!  Below please find your confirmation. If any of the information appears to be incorrect, please contact our office immediately to correct it.<br>&nbsp;</td>");
                sb.Append("	</tr>");
                sb.Append("      </tbody></table>");
                sb.Append("      </tbody></table>");

                sb.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                sb.Append("	<tbody><tr>");
                //sb.Append("<tr >");
                //sb.Append("                                <td class='heading' width='15%'>Service:</td>");
                //sb.Append("	  <td width='75%'>" + Res.Service + "</td>");
                //sb.Append("                            </tr>");
                if (Res.DriverId != 0 && Res.DriverId != null)
                {
                    Driver = (from Obj in DB.tbl_Logins where Obj.UserType == "Driver" && Obj.Sid == Res.DriverId select Obj).FirstOrDefault();
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading' width='15%'>Driver Name:</td>");
                    sb.Append("	  <td width='75%'>" + Driver.FirstName + " " + Driver.LastName + "</td>");
                    sb.Append("                            </tr>");
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading' width='15%'>Driver Mobile:</td>");
                    sb.Append("	  <td width='75%'>" + Driver.MobileNo + "</td>");
                    sb.Append("                            </tr>");
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading' width='15%'>Driver Email:</td>");
                    sb.Append("	  <td width='75%'>" + Driver.Email + "</td>");
                    sb.Append("                            </tr>");
                }

                sb.Append("                            <tr>");
                sb.Append("                                <td class='heading'  valign='Top' style='border-bottom:thin solid green;'>Pick-up Date:</td>");
                sb.Append("	  <td width='100%'  valign='Top' style='border-bottom:thin solid green;'>" + Res.ReservationDate + "</td>");
                //sb.Append("                                <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>");
                sb.Append("                            </tr>");
                sb.Append("                            <!--Passenger 1-->");
                for (int i = 0; i < ResDet.Count; i++)
                {
                    sb.Append("                            <tr>");
                    sb.Append("                                <td colspan='13' align='center'>Passenger " + Convert.ToInt64(Convert.ToInt64(i) + Convert.ToInt64(1)) + "</td>");
                    //sb.Append("                                <td width='100%'></td>");
                    sb.Append("                            </tr>");
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading'> Name :</td>");
                    sb.Append("                                <td width='100%'>" + ResDet[i].FirstName + " " + ResDet[i].LastName + "</td>");
                    sb.Append("                            </tr>");
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading'>Mobile No:</td>");
                    sb.Append("                                <td width='100%'>" + ResDet[i].MobileNo + "</td>");
                    sb.Append("                            </tr>");
                    if (Res.Service == "From")
                    {
                        sb.Append("                            <tr>");
                        sb.Append("                                <td class='heading'>Airline:</td>");
                        sb.Append("                                <td width='100%'>" + ResDet[i].Airline + "</td>");
                        sb.Append("                            </tr>");
                        sb.Append("                            <tr>");
                        sb.Append("                                <td class='heading'>Flight No :</td>");
                        sb.Append("                                <td width='100%'>" + ResDet[i].FlightNo + "</td>");
                        sb.Append("                            </tr>");
                    }
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading'>Time:</td>");
                    sb.Append("                                <td width='100%'>" + ResDet[i].Time + "</td>");
                    sb.Append("                            </tr>");
                    sb.Append("                            <tr>");
                    sb.Append("                                <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>");
                    sb.Append("                            </tr>");
                }


                sb.Append("                            <tr>");
                sb.Append("                                <td class='heading'>Pickup Address:</td>");
                sb.Append("                                <td width='100%'>" + Res.PickupAddress + "</td>");
                sb.Append("                            </tr>");
                sb.Append("                            <tr>");
                sb.Append("                                <td class='heading'>Drop Address: </td>");
                sb.Append("                                <td width='100%'>" + Res.DropAddress + "</td>");
                sb.Append("                            </tr>");
                sb.Append("                            <tr>");
                sb.Append("                                <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>");
                sb.Append("                            </tr>");
                if (Res.TotalAmount != null)
                {
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading' valign='top'><font>Total Amount:</font></td>");
                    sb.Append("                                <td width='100%' valign='top'>" + Res.TotalAmount + "</td>");
                    sb.Append("                            </tr>");
                }
                if (Res.Remark != "")
                {
                    sb.Append("                            <tr>");
                    sb.Append("                                <td class='heading' valign='top'><font>Remark:</font></td>");
                    sb.Append("                                <td width='100%' valign='top'>" + Res.Remark + "</td>");
                    sb.Append("                                <td>");
                    sb.Append("                                    <font color='red'><br>&nbsp;</font>");
                    sb.Append("                                </td>");
                    sb.Append("                            </tr>");
                }

                sb.Append("                            <tr>");
                sb.Append("                                <td class='heading' valign='top'><font color='red'>Note:</font></td>");
                sb.Append("                                <td>");
                sb.Append("                                    <font color='red'><b>Late Night Charges and extra service charges may not show in 'Quoted Rate'. It will automatically add up in Reservation Total</b></font>");
                sb.Append("                                </td>");
                sb.Append("                            </tr>");
                sb.Append("                            <tr>");
                sb.Append("                                <td style='border-bottom:thin solid green;' colspan='2'>&nbsp;</td>");
                sb.Append("                            </tr>");
                sb.Append("                         ");
                sb.Append("            </tr>");
                sb.Append("            <tr>");
                sb.Append("                <td class='heading' valign='top'>Terms &amp; Conditions / Reservation Agreement:</td>");
                sb.Append("                <td>");
                sb.Append("1. Guest agrees that there will be no smoking in the vehicle.<br>");
                sb.Append("2. Guest assures that illegal drugs are not brought into the vehicle.<br>");
                sb.Append("3. Guest agrees that the capacity of the vehicle provided shall not be exceeded. This is based on vehicle type and capacity. Customer will be liable to pay for extra luggage.<br>");
                sb.Append("4. In case of misconduct, BWI Shuttle drivers have the right to terminate contract and service without refund.<br>");
                sb.Append("5. BWI Shuttle Service is not liable for any personal or material damages arising from misconduct of his/her party.<br>");
                sb.Append("6. Guest is responsible for overtime charges beyond the original agreement and will be charged accordingly.<br>");
                sb.Append("7. Guest is held 100% responsible for payment charged to his/her credit card at the time reservation is made.<br>");
                sb.Append(" a. Customer is responsible to check the amount, tip amount before authorizing or signing the credit card.<br>");
                sb.Append("8. Guests are able to cancel reservations within 24 hours without any penalty. Cancellations which take place with less than 12 hours until service was requested will be charged half of the service contract fee.<br>");
                sb.Append("9. Guest acknowledges that BWI Shuttle Service requires a service fee for late night service (11:00 PM to 5:00 AM).<br>");
                sb.Append("10. Guest acknowledges that BWI Shuttle Service requires an additional service fee for incoming International flights.<br>");
                sb.Append("11. BWI Shuttle Service is not held responsible for mechanical problems, inclement weather, or other uncontrollable circumstances resulting in the driver’s inability to start a service as it is scheduled or complete a service.<br>");
                sb.Append("12. In the event that the requested vehicle cannot be provided by BWI Shuttle Service, a vehicle of equal quality will be provided.<br>");
                sb.Append("13. BWI Shuttle Service reserves the right to adjust rates without notice. Rate changes may be the result of:<br>");
                sb.Append(" a. Increase or decrease in fuel charges.<br>");
                sb.Append(" b. Destinations outside of immediate service area.<br>");
                sb.Append(" c. Inclement weather<br>");
                sb.Append(" d. Road conditions.<br>");
                sb.Append(" e. Number of passengers and/or number of baggage increase.<br>");
                sb.Append("                </td>");
                sb.Append("            </tr>");
                sb.Append("        </tbody>");
                sb.Append("    </table>");
                sb.Append("    </td></tr>");
                sb.Append("    </tbody></table>");
                sb.Append("</body>");
                sb.Append("</html>");

                #region Driver Mail
                if (IsDriver)
                {
                    #region Driver Mail for Airport reservation
                    sbDriver.Append("<html><head><meta http-equiv='Content-Type' content='text/html; charset=windows-1252'>");
                    sbDriver.Append("<title>www.bwishuttleservice.com - Customer Receipt</title>  ");
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
                    sbDriver.Append("        <tr>");
                    sbDriver.Append("          <td colspan='3' width='100%'><a href='http://www.bwishuttleservice.com'>http://www.bwishuttleservice.com</a></td>");
                    sbDriver.Append("        </tr>");
                    sbDriver.Append("        <tr>");
                    sbDriver.Append("          <td colspan='3' width='100%'><a href='mailto:bwiairportshuttleservice@gmail.com'>bwiairportshuttleservice@gmail.com</a></td>");
                    sbDriver.Append("        </tr>");
                    sbDriver.Append("        <tr>");
                    sbDriver.Append("          <td colspan='2' width='25%'>Tel:  410-904-5151</td>");
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
                    sbDriver.Append("  	  <td width='70%' style='border-bottom:medium solid blue; font-size:16px'><b>Reservation # " + Res.ReservationNo + "</b></td>");
                    //Sdate = GetAppDate(Booking.Date.Split(' ')[0]);
                    //SerDate = Sdate.ToString("MM-dd-yyyy");
                    //SerDate = Sdate.ToString().Split(' ')[0];
                    //Sdate = DateTime.ParseExact(Res.ReservationDate.Split(' ')[0], "MM-dd-yyyy", CultureInfo.InvariantCulture);
                    //SerDate = Sdate.ToString("MM-dd-yyyy");
                    sbDriver.Append("  	  <td width='30%' align='right' style='border-bottom:medium solid blue;'>Booking Date: " + Res.ReservationDate.Split(' ')[0] + "</td>");
                    sbDriver.Append("  	</tr>");
                    sbDriver.Append("  	<tr>");
                    sbDriver.Append("    	  <td colspan='13' style='border-bottom:thin solid green;'><br>Hi, " + Driver.FirstName + " " + Driver.LastName + " you have Booking with following Details.If any of the information appears to be incorrect, please contact our office immediately to correct it. <br>&nbsp;</td>");
                    sbDriver.Append("	</tr>");
                    sbDriver.Append("      </tbody></table>");
                    sbDriver.Append("      <table width='100%' cellspacing='0' cellpadding='0'>");
                    sbDriver.Append("	<tbody><tr>");
                    sbDriver.Append("	  <td class='heading'>SUBJ:Rez:</td>");
                    sbDriver.Append("	  <td width='75%'>" + Res.ReservationDate + "</td>          ");
                    sbDriver.Append("	</tr>");
                    //sbDriver.Append("  	<tr>");
                    //sbDriver.Append("	  <td class='heading'>MSG: F/T:</td>");

                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'>Source : </td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Res.PickupAddress + "</td>          ");
                    sbDriver.Append("	</tr>                                             ");

                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading'>Dest: </td>          ");
                    sbDriver.Append("	  <td width='75%'>" + Res.DropAddress + "</td>               ");
                    sbDriver.Append("	</tr>                                             ");

                    //sbDriver.Append("	<tr>                                              ");
                    //sbDriver.Append("	  <td class='heading'>Vehicle: </td>          ");
                    //sbDriver.Append("	  <td width='75%'>" + VehicleInfo.Model + "</td>               ");
                    //sbDriver.Append("	</tr>                                             ");

                    for (int i = 0; i < ResDet.Count; i++)
                    {
                        sbDriver.Append("  	<tr>");
                        sbDriver.Append("    	  <td colspan='13' valign='Top' style='border-top:thin solid green;' align='center'>Passenger " + Convert.ToInt64(Convert.ToInt64(i) + Convert.ToInt64(1)) + "</td>");
                        sbDriver.Append("	</tr>");
                        sbDriver.Append("	<tr>                                              ");
                        sbDriver.Append("	  <td class='heading'>Name:</td>          ");
                        sbDriver.Append("	  <td width='75%'>" + ResDet[i].FirstName + " " + ResDet[i].LastName + "</td>                      ");
                        sbDriver.Append("	</tr>                                             ");
                        sbDriver.Append("	<tr>                                              ");
                        sbDriver.Append("	  <td class='heading'># :</td>          ");
                        sbDriver.Append("	  <td width='75%'>" + ResDet[i].MobileNo + "</td>               ");
                        sbDriver.Append("	</tr>                                             ");
                        if (Res.Service == "From")
                        {
                            sbDriver.Append("	<tr>                                              ");
                            sbDriver.Append("	  <td class='heading'>Airline :</td>          ");
                            sbDriver.Append("	  <td width='75%'>" + ResDet[i].Airline + "</td>               ");
                            sbDriver.Append("	</tr>                                             ");
                            sbDriver.Append("	<tr>                                              ");
                            sbDriver.Append("	  <td class='heading'>Flight No :</td>          ");
                            sbDriver.Append("	  <td width='75%'>" + ResDet[i].FlightNo + "</td>               ");
                            sbDriver.Append("	</tr>                                             ");
                        }
                        sbDriver.Append("	<tr>                                              ");
                        sbDriver.Append("	  <td class='heading'>Time :</td>          ");
                        sbDriver.Append("	  <td width='75%'>" + ResDet[i].Time + "</td>               ");
                        sbDriver.Append("	</tr>                                             ");
                    }
                    sbDriver.Append("	<tr>                                              ");
                    sbDriver.Append("	  <td class='heading' style='border-top:thin solid green;'>Reservation Comments:</td>          ");
                    sbDriver.Append("	  <td width='75%' style='border-top:thin solid green;'>" + Res.Remark + "</td>                      ");
                    sbDriver.Append("	</tr>                                             ");

                    sbDriver.Append("        </tr>                                                                                            ");
                    sbDriver.Append("                          ");

                    sbDriver.Append("      </tbody></table>    ");
                    sbDriver.Append("  </td></tr>              ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("</tbody></table>          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("                          ");
                    sbDriver.Append("</body></html>            ");
                    string Design = sbDriver.ToString();
                    #endregion
                    //}
                }

                string DriverMail = sbDriver.ToString();
                #endregion

                string ClientMail = sb.ToString();
                #region Mailing Section
                try
                {
                    MailMessage message = new MailMessage();
                    SmtpClient smtpClient = new SmtpClient();
                    try
                    {
                        MailAddress fromAddress = new MailAddress("reservation@bwishuttleservice.com");
                        string EmailId = "";
                        if (Res.CompanyName == "IMTEF")
                            EmailId = "SHolland@imtef.org";
                        else if (Res.CompanyName == "JHopkins")
                            EmailId = "Tamala.Knox@jhmi.edu";
                        message.From = fromAddress;
                        if (IsCorp == true && IsBWI == true)
                        {
                            message.To.Add(EmailId);
                            message.CC.Add("bwiairportshuttleservice@gmail.com");
                        }
                        else if (IsCorp == true && IsBWI == false)
                        {
                            message.To.Add(EmailId);
                        }
                        else if (IsCorp == false && IsBWI == true)
                        {
                            //message.To.Add("bwiairportshuttleservice@gmail.com");
                            message.To.Add("shahidanwar888@gmail.com");
                        }

                        //if (Reservation.Status != "Completed")
                        //{
                        //    message.CC.Add("bwiairportshuttleservice@gmail.com");
                        //}
                        if (Res.Status == "Completed")
                        {
                            //message.Subject = "Receipt for bwi shuttle service Reservation made for " + Booking.ReservationDate;
                            message.Subject = "Receipt Booking-" + Res.ReservationNo;
                        }
                        else if (Res.Status == "Cancelled")
                            message.Subject = "Booking Cancelled-" + Res.ReservationNo;
                        else
                        {
                            //message.Subject = "Confirm Booking-" + Booking.ReservationID;
                            message.Subject = "Confirmation for bwi shuttle service Reservation made for " + Res.CompanyName + " " + Res.ReservationDate;
                        }
                        message.IsBodyHtml = true;
                        message.Body = ClientMail;

                        SmtpClient mailObj = new SmtpClient("relay-hosting.secureserver.net", 25);
                        mailObj.Credentials = new NetworkCredential("reservation@bwishuttleservice.com", "aBC$32#2SDI_&%12");
                        mailObj.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                        mailObj.EnableSsl = false;
                        message.Sender = new MailAddress("reservation@bwishuttleservice.com", "www.bwishuttleservice.com");
                        mailObj.Send(message);
                        message.Dispose();
                    }
                    catch (SmtpException ex)
                    {
                        string Msg = ex.Message;
                        return Msg;
                    }
                }
                catch (Exception ex)
                {
                    string Msg = ex.Message;
                    return Msg;
                }

                #region Driver Section
                if (IsDriver)
                {

                    MailMessage message = new MailMessage();
                    SmtpClient smtpClient = new SmtpClient();
                    try
                    {
                        MailAddress fromAddress = new MailAddress("reservation@bwishuttleservice.com");
                        message.From = fromAddress;
                        message.To.Add(Driver.Email);
                        //message.CC.Add(Driver.sEmail);
                        if (Res.Status == "Cancelled")
                            message.Subject = "Booking Cancelled-" + Res.ReservationNo;
                        else
                            message.Subject = "You have Booking -" + Res.ReservationNo;
                        message.IsBodyHtml = true;
                        message.Body = DriverMail;

                        SmtpClient mailObj = new SmtpClient("relay-hosting.secureserver.net", 25);
                        mailObj.Credentials = new NetworkCredential("reservation@bwishuttleservice.com", "aBC$32#2SDI_&%12");
                        mailObj.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                        mailObj.EnableSsl = false;
                        message.Sender = new MailAddress("reservation@bwishuttleservice.com", "www.bwishuttleservice.com");
                        mailObj.Send(message);
                        message.Dispose();
                    }
                    catch (Exception ex)
                    {
                        string Msg = ex.Message;
                        return Msg;
                    }
                }
                else
                    return "";
                #endregion

                #endregion
                return "";
            }
            catch (Exception ex)
            {
                string Msg = ex.Message;
                return Msg;
            }
        }
        #endregion
    }
}