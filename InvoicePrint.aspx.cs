using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Frederick
{
    public partial class InvoicePrint : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //string ResId = Request.QueryString["ResId"];
            string Html = "";
            Html = "   <html>  " +
            "<body >  " +
            "<center>  " +
            "<center><b> Airportshuttles 4Less</b></center>  " +
            "<hr/>  " +
            "<div style=\"background-color: aliceblue;width:80%;height:auto\">  " +
            "<div>  " +
            "<div class=\"WordSection1\">  " +
            "<label style=\"font-size: 18px; margin-left:100px\" ></label>  " +
            "<table border=\"1\">  " +
            "<tbody><tr>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Booking No: </p><p id=\"BookingNo\">" + Request.QueryString["BookingNo"] + "</p></td>  " +
            "<td style=\"padding:8px\"><p style=\"font-weight:bold\">Reservation Date: </p><p id=\"ResDate\">" + Request.QueryString["ResDate"] + "</p></td>  " +
            "</tr>  " +
            "<tr>  " +
            "<td style=\"width: 50%;padding:8px;\"><p style=\"font-weight:bold\">Time *:   <span style=\"font-family: monospace;\" >23:00</span></p>  <label style=\"font-size:smaller;font-family:\"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif\">(Note :Here 24-hour time formatis to  represent time without a.m. or p.m. For example, 1:00 p.m. becomes 13:00 in 24-hour format.)</label>    " +
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
            "</tbody></table><br/>  " +
            "" +
            "</div>  " +
            "</div>  " +
            "</div>  " +
            "</center>  " +
            "</body>  " +
            "</html>  ";
            //HttpContext context = System.Web.HttpContext.Current;
            //var htmlContent = String.Format(Html);
            //NReco.PdfGenerator.HtmlToPdfConverter pdfConverter = new NReco.PdfGenerator.HtmlToPdfConverter();
            //pdfConverter.Size = NReco.PdfGenerator.PageSize.A4; 
            //pdfConverter.PdfToolPath = HttpContext.Current.Server.MapPath("~/DriverDocument/");//"D:\\inetpub\\vhosts\\bwishuttleservice.com"; 
            //var pdfBytes = pdfConverter.GeneratePdf(htmlContent);
            //context.Response.ContentType = "application/pdf";
            //context.Response.BinaryWrite(pdfBytes);

            StringBuilder sb = new StringBuilder();
            sb.Append(Html);
            StringReader sr = new StringReader(sb.ToString()); 
            Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
            PdfWriter writer = PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
            pdfDoc.Open();
            XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
            pdfDoc.Close();
            Response.ContentType = "application/pdf";
            string FileName = "Invoice_" + Request.QueryString["BookingNo"] + ".pdf";
            Response.AddHeader("content-disposition", "attachment;filename=" + FileName + "");
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Write(pdfDoc);
            Response.End();

        }
    }
}