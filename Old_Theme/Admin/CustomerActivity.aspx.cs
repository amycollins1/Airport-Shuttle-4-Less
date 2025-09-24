using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
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
    public partial class CustomerActivity : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void ExportToPDF(object sender, EventArgs e)
        {
            StringBuilder sb = new StringBuilder();
            if (HttpContext.Current.Session["CustomerList"] != null)
            {
                DataTable List = (DataTable)HttpContext.Current.Session["CustomerList"];
                sb.AppendLine("<h2>Limo All Around Customer Report</h2> ");
                sb.AppendLine("<div style='margin-top:20px'>");
                sb.AppendLine("<table id=\"tblReport\" border-top-width='0' border='1' width='100%' bgcolor='#ffffff' ; bordercolor='#000000' cellspacing='0' cellpadding='2' style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");
                sb.AppendLine("<thead id=\"tblData\">");
                sb.AppendLine("<tr style='font-size:11.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white'>");
                sb.AppendLine("<th>S.No</th>");
                sb.AppendLine("<th>Reservation No</th>");
                sb.AppendLine("<th> Assigned To </th>");
                sb.AppendLine("<th>Guest Name </th>");
                sb.AppendLine("<th> Phone No </th>");
                sb.AppendLine("<th> Reservation Date </th>");
                sb.AppendLine("<th> Service </th>");
                sb.AppendLine("<th> Source </th>");
                sb.AppendLine("<th> Destination </th>");

                sb.AppendLine("<th> TotalFare </th>");
                //sb.AppendLine("<th> Tip Amount </th>");
                sb.AppendLine("</tr> </thead>");
                for (int i = 0; i < List.Rows.Count; i++)
                {
                    string Name = List.Rows[i]["FirstName"] + " " + List.Rows[i]["LastName"];
                    sb.AppendLine("<tr> <td><b>" + Convert.ToInt64(Convert.ToInt64(i) + 1) + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["ReservationID"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["AssignedTo"] + "</b></td>");
                    sb.AppendLine("<td><b>" + Name + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["ContactNumber"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["ReservationDate"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["Service"] + " </b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["Source"] + "</b></td>");
                    sb.AppendLine("<td><b>" + List.Rows[i]["Destination"] + "</b></td>");
                    sb.AppendLine("<td><b>" + Math.Round(Convert.ToDecimal(List.Rows[i]["TotalFare"]), 2) + "</b></td>");
                    //sb.AppendLine("<td><b>" + List.Rows[i]["ReservationID"] + "</b></td>");
                    sb.AppendLine("</tr>");
                }
                //sb.AppendLine("<tr>");
                sb.AppendLine("</table>");
                sb.AppendLine("</div><br><br>");
                //<table>        <tr>            <td><b>Total Fare:</b></td>            <td><b>84.20</b></td>        </tr>        <tr>            <td><b>Tip:</b></td>            <td><b>6.79</b></td>        </tr>        <tr>            <td><b>Total - Tip:</b></td>            <td><b>77.41</b></td>        </tr>        <tr>            <td><b>BWI earning:</b></td>            <td><b>15.48</b></td>        </tr>        <tr>            <td><b>Driver earning:</b></td>            <td><b>68.72</b></td>        </tr>    </table>");
                StringReader sr = new StringReader(sb.ToString());
                //StringReader sr = new StringReader(Request.Form[hfGridHtml.UniqueID]);
                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, Response.OutputStream);
                pdfDoc.Open();
                XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
                pdfDoc.Close();
                Response.ContentType = "application/pdf";
                string FileName = "Customer Activity " + DateTime.Now.ToString("MM-dd-yyyy") + ".pdf";
                Response.AddHeader("content-disposition", "attachment;filename=" + FileName + "");
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Write(pdfDoc);
                Response.End();
            }
        }
    }
}