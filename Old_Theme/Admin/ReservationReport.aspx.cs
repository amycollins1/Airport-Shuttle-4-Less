using System;
using System.Collections.Generic;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using Frederick.DL;
using System.Data;
using Frederick.BL;

namespace Frederick.Admin
{
    public partial class ReservationReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ExportToPDF(object sender, EventArgs e)
        {
            string[] Driver = (DriverCalc.Value).Split('*');
            StringBuilder sb = new StringBuilder();
            if (HttpContext.Current.Session["ReservationList"] != null)
            {
                List<tbl_Reservation> Data = (List<tbl_Reservation>)HttpContext.Current.Session["ReservationList"];
                DataTable List = DefaultManager.ConvertToDatatable(Data);
                sb.AppendLine("<h2>BWI Shuttle Service Reservation Report</h2> ");
                sb.AppendLine("<div style='margin-top:20px'>");
                sb.AppendLine("<table id=\"tblReport\" border-top-width='0' border='1' width='100%' bgcolor='#ffffff' ; bordercolor='#000000' cellspacing='0' cellpadding='2' style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");
                sb.AppendLine("<thead id=\"tblData\">");
                sb.AppendLine("<tr style='font-size:11.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white'>");
                sb.AppendLine("<th>S.No</th>");
                sb.AppendLine("<th>Reservation ID</th>");
                sb.AppendLine("<th> Assigned To </th>");
                sb.AppendLine("<th>Guest Name </th>");
                //sb.AppendLine("<th> Phone No </th>");
                sb.AppendLine("<th> Reservation Date </th>");
                sb.AppendLine("<th> Service </th>");
                sb.AppendLine("<th> Source </th>");
                sb.AppendLine("<th> Destination </th>");
                //sb.AppendLine("<th> Fare </th>");
                sb.AppendLine("<th> TotalFare </th>");
                sb.AppendLine("<th> Tip Amount </th>");
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
                    //sb.AppendLine("<td><b>" + Math.Round(Convert.ToDecimal(List.Rows[i]["Fare"]), 2) + "</b></td>");
                    sb.AppendLine("<td><b>" + Math.Round(Convert.ToDecimal(List.Rows[i]["TotalFare"]) - Gratuity, 2) + "</b></td>");
                    sb.AppendLine("<td><b>" + Gratuity + "</b></td>");
                    //sb.AppendLine("<td><b>" + List.Rows[i]["ReservationID"] + "</b></td>");
                    sb.AppendLine("</tr>");
                }
                //sb.AppendLine("<tr>");
                sb.AppendLine("</table>");
                sb.AppendLine("</div>");
                sb.Append("<br>");
                sb.Append("<br>");

                if (Driver[3] == "Completed")
                {
                    string[] DriverList = Driver[1].Split(',');
                    sb.AppendLine("<table>");
                    decimal TotalBWI = Convert.ToDecimal(Driver[2]);
                    for (int i = 0; i < DriverList.Length; i++)
                    {
                        string[] Splitter = DriverList[i].Split('^');

                        sb.AppendLine("<tr>");
                        sb.AppendLine("<td><b>Driver Name:</b></td>");
                        sb.AppendLine("<td><b>" + Splitter[0] + "</b></td></tr>");
                        sb.AppendLine("<tr>");
                        sb.AppendLine("<td><b>Total:</b></td>");
                        sb.AppendLine("<td><b>" + Splitter[1] + "</b></td>");
                        sb.AppendLine("</tr>");
                        sb.AppendLine("<tr>");
                        sb.AppendLine("<td><b>BWI earning:</b></td>");
                        sb.AppendLine("<td><b>" + Splitter[2] + "</b></td>");
                        sb.AppendLine("</tr>");
                        //sb.Append("</br>");
                        //TotalBWI = TotalBWI + Convert.ToDecimal(Splitter[2]);
                        //sb.AppendLine("<tr>");
                        //sb.AppendLine("<td><b>BWI earning:</b></td>");
                        //sb.AppendLine("<td><b>15.48</b></td>");
                        //sb.AppendLine("</tr>");
                        //sb.AppendLine("<tr>            <td><b>Driver earning:</b></td>");
                        //sb.AppendLine("<td><b>68.72</b></td>        </tr>    ");
                    }
                    sb.AppendLine("<tr>");
                    sb.AppendLine("<td><b>Total BWI earning:</b></td>");
                    sb.AppendLine("<td><b>" + TotalBWI + "</b></td>");
                    sb.AppendLine("</tr>");
                    sb.AppendLine("</table>");
                }
                else
                {
                    sb.AppendLine("<table>");
                    sb.AppendLine("<tr>");
                    sb.AppendLine("<td><b>Total Fare:</b></td>");
                    sb.AppendLine("<td><b>" + Driver[0] + "</b></td>");
                    sb.AppendLine("</tr>");
                    sb.AppendLine("</table>");
                }
                StringReader sr = new StringReader(sb.ToString());
                //StringReader sr = new StringReader(Request.Form[hfGridHtml.UniqueID]);
                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
                pdfDoc.Open();
                XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
                pdfDoc.Close();
                Response.ContentType = "application/pdf";
                string FileName = "Reservation Report " + DateTime.Now.ToString("MM-dd-yyyy") + ".pdf";
                Response.AddHeader("content-disposition", "attachment;filename=" + FileName + "");
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Write(pdfDoc);
                Response.End();
            }
        }
    }
}