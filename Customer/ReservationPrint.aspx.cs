using System;
using System.Web;

namespace Frederick.Customer
{
    public partial class ReservationPrint : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string Html = "   <html>  " +
            "<body >  " +
            "<center>  " +
            "<center style=\"font-family: sans-serif;font-size: xx-large;\"><b> Airport Shuttles 4 Less<b/></center>  " +
            "<hr/>  " +
            "<div style=\"width:100%;height:auto;font-family: sans-serif\">  " +
            "<div>  " +
            "<div class=\"WordSection1\">  " +
            "<label style=\"font-size: 18px; margin-left:100px\" ></label>  " +
            "<table border=\"1\" style=\"width: 80%;font-size:large;\">  " +
            "<tbody><tr>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Booking No: </p><p id=\"BookingNo\">" + Request.QueryString["BookingNo"] + "</p></td>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Reservation Date: </p><p id=\"ResDate\">" + Request.QueryString["ResDate"] + "</p></td>  " +
            "</tr>  " +
            "<tr>  " +
            "<td style=\"width: 50%;padding:8px;\"><p style=\"font-weight:bold\">Time :   <span style=\"font-family: monospace;\" >" + Request.QueryString["ResTime"] + "</span></p>" +
            "" +
            "" +
            "</td>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Guest Name:</p><p id=\"Name\">" + Request.QueryString["Name"] + "</p>  " +
            "" +
            "</td>  " +
            "</tr>  " +
            "<tr>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Source: </p><p id=\"Source\">" + Request.QueryString["Source"] + "</p></td>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Destination:</p><p id=\"Destination\">" + Request.QueryString["Destination"] + "</p></td>  " +
            "</tr>  " +
            "<tr>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Assigned To:</p><p id=\"AssignedTo\">" + Request.QueryString["AssignedTo"] + "</p></td>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Passenger:</p><p id=\"Passenger\">" + Request.QueryString["Passenger"] + "</p></td>  " +
            "</tr>  " +
            "<tr>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Phone No:</p><p id=\"PhoneNo\">" + Request.QueryString["PhoneNo"] + "</p></td>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Service:</p><p id=\"Service\">" + Request.QueryString["Service"] + "</p></td>  " +
            "</tr>  " +
            "<tr>  " +
            "<td colspan=\"2\" style=\"padding:8px\"><p style=\"font-weight:bold\">Total Fare:</p><p id=\"TotalFare\">" + Request.QueryString["TotalFare"] + "</p></td>  " +
            "</tr>  " +

            "" +
            "" +
            "</tbody></table><br>  " +
            "" +
            "</div>  " +
            "</div>  " +
            "</div>  " +
            "</center>  " +
            "</body>  " +
            "</html>  ";
            HttpContext context = System.Web.HttpContext.Current;
            var htmlContent = String.Format(Html);
            NReco.PdfGenerator.HtmlToPdfConverter pdfConverter = new NReco.PdfGenerator.HtmlToPdfConverter();
            pdfConverter.Size = NReco.PdfGenerator.PageSize.A4;
            pdfConverter.PdfToolPath = HttpContext.Current.Server.MapPath("~/DriverDocument/");//"D:\\inetpub\\vhosts\\bwishuttleservice.com";
            var pdfBytes = pdfConverter.GeneratePdf(htmlContent);
            context.Response.ContentType = "application/pdf";
            context.Response.BinaryWrite(pdfBytes);
        }
    }
}