using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using Frederick.BL;
using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Frederick.Admin
{
    public partial class DriverActivity : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ExportToPDF(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["ReservationList"] != null)
            {
                List<tbl_Reservation> Data = (List<tbl_Reservation>)HttpContext.Current.Session["ReservationList"];
                DataTable List = DefaultManager.ConvertToDatatable(Data);
                StringBuilder sb = new StringBuilder();
                sb.AppendLine("<h2>AirportShuttles 4Less Reservation Report</h2> ");
                sb.AppendLine("<div style='margin-top:20px'>");
                sb.AppendLine("<table id=\"tblReport\" border-top-width='0' border='1' width='100%' bgcolor='#ffffff' ; bordercolor='#000000' cellspacing='0' cellpadding='2' style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");
                sb.AppendLine("<thead id=\"tblData\">");
                sb.AppendLine("<tr style='font-size:11.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white'>");
                sb.AppendLine("<th>S.No</th>");
                sb.AppendLine("<th>Reservation ID</th>");
                sb.AppendLine("<th> Assigned To </th>");
                sb.AppendLine("<th>Name </th>");
                //sb.AppendLine("<th> Phone No </th>");
                sb.AppendLine("<th> Reservation Date </th>");
                sb.AppendLine("<th> Service </th>");
                sb.AppendLine("<th> Source </th>");
                sb.AppendLine("<th> Destination </th>");
                sb.AppendLine("<th> Fare </th>");
                sb.AppendLine("<th> Total Fare </th>");
                sb.AppendLine("<th> Tip </th>");
                sb.AppendLine("</tr> </thead>");
                for (int i = 0; i < List.Rows.Count; i++)
                {
                    Decimal Gratuity = Convert.ToDecimal((List.Rows[i]["Gratuity"].ToString()).Split('^')[0]);
                    string Name = List.Rows[i]["FirstName"] + " " + List.Rows[i]["LastName"];
                    sb.AppendLine("<tr> <td><b>" + Convert.ToInt64(Convert.ToInt64(i) + 1) + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["ReservationId"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["DriverName"] + "</b></td>");
                    sb.AppendLine("<td><b>" + Name + "</b></td>");
                    //sb.AppendLine("<td><b>" + List.Rows[i]["ContactNumber"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["ReservationDate"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["Service"] + " </b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["Source"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["Destination"] + "</b></td>");
                    //string de = List.Rows[i]["Fare"].ToString();
                    sb.AppendLine("<td><b>" + List.Rows[i]["Fare"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["TotalFare"] + "</b></td>");
                    sb.AppendLine("<td><b>" + Gratuity + "</b></td>");
                    //sb.AppendLine("<td><b>" + List.Rows[i]["ReservationID"] + "</b></td>");
                    sb.AppendLine("</tr>");

                }
                sb.Append("</table>");
                sb.Append("</div>");
                sb.Append("<br>");
                sb.Append("<br>");

                string[] Splitter = (DriverCalc.Value).Split('*');
                string TotalFare = Splitter[0];
                string Tip = Splitter[1];
                string TT = Splitter[2];
                string BWIearning = Splitter[3];
                string DriverEarning = Splitter[4];

                sb.Append("<table>");
                sb.Append("        <tr>");
                sb.Append("            <td><b>Total Fare:</b></td>");
                sb.Append("            <td><b>" + TotalFare + "</b></td>");
                sb.Append("        </tr>");
                sb.Append("        <tr>");
                sb.Append("            <td><b>Total Tip:</b></td>");
                sb.Append("            <td><b>" + Tip + "</b></td>");
                sb.Append("        </tr>");
                //sb.Append("        <tr>");
                //sb.Append("            <td><b>Total - Tip:</b></td>");
                //sb.Append("            <td><b>" + TT + "</b></td>");
                //sb.Append("        </tr>");
                //Sb.Append("        <tr>");
                //Sb.Append("            <td><b>Percentage:</b></td>");
                //Sb.Append("            <td><b>" + PercentageOfFare + "</b></td>");
                //Sb.Append("        </tr>");               
                sb.Append("        <tr>");
                sb.Append("            <td><b>Driver earning:</b></td>");
                sb.Append("            <td><b>" + DriverEarning + " (10% + Tip)</b></td>");
                sb.Append("        </tr>");
                sb.Append("        <tr>");
                sb.Append("            <td><b>BWI earning:</b></td>");
                sb.Append("            <td><b>" + BWIearning + "</b></td>");
                sb.Append("        </tr>");
                sb.Append("    </table>");

                StringReader sr = new StringReader(sb.ToString());
                //StringReader sr = new StringReader(Request.Form[hfGridHtml.UniqueID]);
                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
                pdfDoc.Open();
                XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
                pdfDoc.Close();
                Response.ContentType = "application/pdf";
                Response.AddHeader("content-disposition", "attachment;filename=Driver.pdf");
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Write(pdfDoc);
                Response.End();
            }
        }
    }
}