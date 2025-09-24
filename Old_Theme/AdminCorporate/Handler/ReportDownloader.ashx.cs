using Frederick.BL;
using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Frederick.Admin.Handler
{
    /// <summary>
    /// Summary description for ReportDownloader
    /// </summary>
    public class ReportDownloader : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            JavaScriptSerializer JsonSerializer = new JavaScriptSerializer();

            context.Response.ContentType = "application/json";
            //var data = context.Request;
            //var sr = new StreamReader(data.InputStream);
            //var stream = sr.ReadToEnd();
            //var javaScriptSerializer = new JavaScriptSerializer();
            //var PostedData = javaScriptSerializer.Deserialize<List<tbl_Reservation>>(stream); 

            string Type = context.Request["datatable"];
            //string strJson = new StreamReader(context.Request.InputStream).ReadToEnd();
            //dynamic urObj = JsonSerializer.Deserialize<object>(strJson);
            //var arr = urObj["SearchedArr"];
            //string str = strJson.Replace("'", "\"");
            //var s = Deserialize<List<tbl_Reservation>>(str);

            //var ss = JsonSerializer.Deserialize<List<tbl_Reservation>>(strJson);
            ////var json = new JavaScriptSerializer().Serialize(strJson);
            //dynamic items = JsonSerializer.Deserialize<object>(strJson);
            //foreach (var item in items)
            //{

            //}
            //var test = item["SearchedArr"];
            //for (int i = 0; i < length; i++)
            //{

            //}
            //var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Lad>(jsonString);
            //string From = context.Request["From"];
            //string To = context.Request["To"];
            //string DriverName = context.Request["DriverName"];

            #region Reservation List

            if (Type == "Reservation")
            {
                string Status = context.Request["Status"];
                Decimal TotalFare = Convert.ToDecimal(context.Request["TotalFare"]);
                Decimal TotalBWIearning = Convert.ToDecimal(context.Request["TotalBWIearning"]);
                string DriverAmountArr = context.Request["DriverAmountArr"];
                DataTable dtResult = null;
                if (HttpContext.Current.Session["ReservationList"] != null)
                {
                    List<tbl_Reservation> Data = (List<tbl_Reservation>)HttpContext.Current.Session["ReservationList"];
                    dtResult = DefaultManager.ConvertToDatatable(Data);
                    //DataView myDataView = dtResult.DefaultView;
                    //myDataView.Sort = "Sid DESC";
                    //DataTable SorteddtResult = myDataView.ToTable();
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationId", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "TotalFare", "Gratuity");
                    ExporttoExcelReservation(dtSelectedColumns, TotalFare, TotalBWIearning, DriverAmountArr, Status);
                }
                else
                {
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationID", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "TotalFare", "Gratuity");
                    ExporttoExcelReservation(dtSelectedColumns, 0, 0, "", "");
                }
            }

            #endregion

            #region Driver Activity

            else if (Type == "Driver")
            {
                DataTable dtResult = null;
                if (HttpContext.Current.Session["ReservationList"] != null)
                {
                    Decimal TotalFare = Convert.ToDecimal(context.Request["TotalFare"]);
                    Decimal Tip = Convert.ToDecimal(context.Request["Tip"]);
                    Decimal TT = Convert.ToDecimal(context.Request["TT"]);
                    Decimal BWIearning = Convert.ToDecimal(context.Request["BWIearning"]);
                    Decimal DriverEarning = Convert.ToDecimal(context.Request["DriverEarning"]);
                    List<tbl_Reservation> Data = (List<tbl_Reservation>)HttpContext.Current.Session["ReservationList"];
                    dtResult = DefaultManager.ConvertToDatatable(Data);
                    //DataView myDataView = dtResult.DefaultView;
                    //myDataView.Sort = "Sid DESC";
                    //DataTable SorteddtResult = myDataView.ToTable();
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationId", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "Fare", "TotalFare", "Gratuity");
                    ExporttoExcelDriver(dtSelectedColumns, TotalFare, Tip, TT, BWIearning, DriverEarning);
                }
                else
                {
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationID", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "Fare", "TotalFare", "Gratuity");
                    ExporttoExcelReservation(dtSelectedColumns, 0, 0, "", "");
                }
            }

            #endregion

            #region Customer Activity

            else if (Type == "Customer")
            {
                string From = context.Request["From"];
                string To = context.Request["To"];
                string ResNo = context.Request["ResNo"];
                string FirstName = context.Request["FirstName"];
                string LastName = context.Request["LastName"];
                string PhoneNo = context.Request["PhoneNo"];
                //var SearchedArr = context.Request["SearchedArr"];
                DataTable dtResult = null;

                Decimal TotalFare = Convert.ToDecimal(context.Request["TotalFare"]);
                dtResult = DefaultManager.GetAllReservation(From, To, ResNo, FirstName, LastName, PhoneNo);
                DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationID", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "Fare", "TotalFare", "Gratuity");
                ExporttoExcelCustomer(dtSelectedColumns, TotalFare);
            }

            #endregion

            #region Customer Activity commented on 04-09-22

            //else if (Type == "Customer")
            //{
            //    var SearchedArr = context.Request["SearchedArr"];
            //    DataTable dtResult = null;
            //    if (HttpContext.Current.Session["ReservationList"] != null)
            //    {
            //        Decimal TotalFare = Convert.ToDecimal(context.Request["TotalFare"]);
            //        Decimal Tip = Convert.ToDecimal(context.Request["Tip"]);
            //        Decimal TT = Convert.ToDecimal(context.Request["TT"]);
            //        Decimal BWIearning = Convert.ToDecimal(context.Request["BWIearning"]);
            //        Decimal DriverEarning = Convert.ToDecimal(context.Request["DriverEarning"]);
            //        List<tbl_Reservation> Data = (List<tbl_Reservation>)HttpContext.Current.Session["ReservationList"];
            //        dtResult = DefaultManager.ConvertToDatatable(Data);
            //        //DataView myDataView = dtResult.DefaultView;
            //        //myDataView.Sort = "Sid DESC";
            //        //DataTable SorteddtResult = myDataView.ToTable();
            //        DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationId", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "Fare", "TotalFare", "Gratuity");
            //        ExporttoExcelDriver(dtSelectedColumns, TotalFare, Tip, TT, BWIearning, DriverEarning);
            //    }
            //    else
            //    {
            //        DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationID", "DriverName", "FirstName", "ReservationDate", "Service", "Source", "Destination", "Fare", "TotalFare", "Gratuity");
            //        ExporttoExcelReservation(dtSelectedColumns, 0, 0, "", "");
            //    }
            //}

            #endregion
        }

        public static void ExporttoExcelReservation(DataTable objdatatable, Decimal TotalFare, Decimal TotalBWIearning, string DriverArr, string Status)
        {
            //string DriverAmount = HttpContext.Current.Session["CustomerAmount"].ToString();
            //string[] Splitter = DriverAmount.Split(' ');
            //string TotalFare = Splitter[0];
            //string PercentageOfFare = Splitter[1];
            //string DriversPayOut = Splitter[2];
            //string Tip = Splitter[3];
            //string Fare = Splitter[4];
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["ReservationID"].ColumnName = "Reservation ID";
            objdatatable.Columns["DriverName"].ColumnName = "Assigned To";
            objdatatable.Columns["FirstName"].ColumnName = "Guest Name";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            //objdatatable.Columns["Fare"].ColumnName = "Fare";
            objdatatable.Columns["TotalFare"].ColumnName = "Total Fare";
            //objdatatable.Columns["terms"].ColumnName = "Remarks";
            objdatatable.Columns["Gratuity"].ColumnName = "Tip Amount";
            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=Reservation Report " + Today + ".xls");

            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:30.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">BWI Shuttle Service Reservation Report</td></TR>");
            HttpContext.Current.Response.Write(" <TR>");
            //am getting my grid's column headers
            int columnscount = objdatatable.Columns.Count;

            for (int j = 0; j < columnscount; j++)
            {      //write in new column
                HttpContext.Current.Response.Write("<Td style='font-size:11.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white'>");
                //Get column headers  and make it as bold in excel columns
                HttpContext.Current.Response.Write("<B>");
                HttpContext.Current.Response.Write(objdatatable.Columns[j].ToString());
                HttpContext.Current.Response.Write("</B>");
                HttpContext.Current.Response.Write("</Td>");
            }
            HttpContext.Current.Response.Write("</TR>");

            if (objdatatable.Rows.Count <= 0)
            {
                HttpContext.Current.Response.Write("<Td colspan=\"10\" align=\"left\">");
                HttpContext.Current.Response.Write("No Record Found");
                HttpContext.Current.Response.Write("</Td>");
            }
            else
            {
                foreach (DataRow row in objdatatable.Rows)
                {//write in new row
                    HttpContext.Current.Response.Write("<TR>");
                    for (int i = 0; i < objdatatable.Columns.Count; i++)
                    {
                        HttpContext.Current.Response.Write("<Td>");
                        //Checking for gratuity amount
                        if (i == 7)
                        {
                            decimal amount = Convert.ToDecimal(row[7].ToString()) - Convert.ToDecimal((row[8].ToString()).Split('^')[0]);
                            HttpContext.Current.Response.Write(amount);
                        }

                        else if (i == 8)
                            HttpContext.Current.Response.Write((row[i].ToString()).Split('^')[0]);
                        else
                            HttpContext.Current.Response.Write(row[i].ToString());
                        HttpContext.Current.Response.Write("</Td>");
                    }
                    HttpContext.Current.Response.Write("</TR>");
                }
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</TR>");
                HttpContext.Current.Response.Write("</Table>");

                HttpContext.Current.Response.Write("<table align=\"center\">");

                if (Status == "Completed")
                {
                    var Arr = DriverArr.Split(',');
                    for (int i = 0; i < Arr.Length; i++)
                    {
                        var Driver = Arr[i].Split('^');
                        HttpContext.Current.Response.Write("<TR>");
                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write("<b>");
                        HttpContext.Current.Response.Write("Driver Name: ");
                        HttpContext.Current.Response.Write(Driver[0]);
                        HttpContext.Current.Response.Write("</b>");
                        HttpContext.Current.Response.Write("</Td>");
                        HttpContext.Current.Response.Write("</TR>");
                        HttpContext.Current.Response.Write("<TR>");
                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write("<b>");
                        HttpContext.Current.Response.Write("Total: ");
                        HttpContext.Current.Response.Write(Driver[1]);
                        HttpContext.Current.Response.Write("</b>");
                        HttpContext.Current.Response.Write("</Td>");
                        HttpContext.Current.Response.Write("</TR>");
                        HttpContext.Current.Response.Write("<TR>");
                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write("<b>");
                        HttpContext.Current.Response.Write("BWI Earning: ");
                        HttpContext.Current.Response.Write(Driver[2]);
                        HttpContext.Current.Response.Write("</b>");
                        HttpContext.Current.Response.Write("</Td>");
                        HttpContext.Current.Response.Write("</TR>");
                    }
                    HttpContext.Current.Response.Write("<TR>");
                    HttpContext.Current.Response.Write("<Td>");
                    HttpContext.Current.Response.Write("<b>");
                    HttpContext.Current.Response.Write("Total BWI Earning: ");
                    HttpContext.Current.Response.Write(TotalBWIearning);
                }
                else
                {
                    HttpContext.Current.Response.Write("<TR>");
                    HttpContext.Current.Response.Write("<Td>");
                    HttpContext.Current.Response.Write("<b>");
                    HttpContext.Current.Response.Write("Total Fare: ");
                    HttpContext.Current.Response.Write(TotalFare);
                }

                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");
                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }

        public static void ExporttoExcelDriver(DataTable objdatatable, Decimal TotalFare, Decimal Tip, Decimal TT, Decimal BWIearning, Decimal DriverEarning)
        {
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["ReservationID"].ColumnName = "Reservation ID";
            objdatatable.Columns["DriverName"].ColumnName = "Assigned To";
            objdatatable.Columns["FirstName"].ColumnName = "Guest Name";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            objdatatable.Columns["Fare"].ColumnName = "Fare";
            objdatatable.Columns["TotalFare"].ColumnName = "Total Fare";
            //objdatatable.Columns["terms"].ColumnName = "Remarks";
            objdatatable.Columns["Gratuity"].ColumnName = "Tip Amount";
            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=Driver Report " + Today + ".xls");

            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:30.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">BWI Shuttle Service Driver Report</td></TR>");
            HttpContext.Current.Response.Write(" <TR>");
            //am getting my grid's column headers
            int columnscount = objdatatable.Columns.Count;

            for (int j = 0; j < columnscount; j++)
            {      //write in new column
                HttpContext.Current.Response.Write("<Td style='font-size:11.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white'>");
                //Get column headers  and make it as bold in excel columns
                HttpContext.Current.Response.Write("<B>");
                HttpContext.Current.Response.Write(objdatatable.Columns[j].ToString());
                HttpContext.Current.Response.Write("</B>");
                HttpContext.Current.Response.Write("</Td>");
            }
            HttpContext.Current.Response.Write("</TR>");

            if (objdatatable.Rows.Count <= 0)
            {
                HttpContext.Current.Response.Write("<Td colspan=\"10\" align=\"left\">");
                HttpContext.Current.Response.Write("No Record Found");
                HttpContext.Current.Response.Write("</Td>");
            }
            else
            {
                foreach (DataRow row in objdatatable.Rows)
                {//write in new row
                    HttpContext.Current.Response.Write("<TR>");
                    for (int i = 0; i < objdatatable.Columns.Count; i++)
                    {
                        HttpContext.Current.Response.Write("<Td>");
                        //Checking for gratuity amount
                        if (i == 9)
                            HttpContext.Current.Response.Write((row[i].ToString()).Split('^')[0]);
                        else
                            HttpContext.Current.Response.Write(row[i].ToString());
                        HttpContext.Current.Response.Write("</Td>");
                    }
                    HttpContext.Current.Response.Write("</TR>");
                }
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</TR>");
                HttpContext.Current.Response.Write("</Table>");

                HttpContext.Current.Response.Write("<table align=\"center\">");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total Fare: ");
                HttpContext.Current.Response.Write(TotalFare);
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Tip: ");
                HttpContext.Current.Response.Write(Tip);
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total - Tip: ");
                HttpContext.Current.Response.Write(TT);
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("BWI Earning: ");
                HttpContext.Current.Response.Write(BWIearning);
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Driver Earning: ");
                HttpContext.Current.Response.Write(DriverEarning);
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }

        public static void ExporttoExcelCustomer(DataTable objdatatable, Decimal TotalFare)
        {
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["ReservationID"].ColumnName = "Reservation ID";
            objdatatable.Columns["DriverName"].ColumnName = "Assigned To";
            objdatatable.Columns["FirstName"].ColumnName = "Guest Name";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            objdatatable.Columns["Fare"].ColumnName = "Fare";
            objdatatable.Columns["TotalFare"].ColumnName = "Total Fare";
            //objdatatable.Columns["terms"].ColumnName = "Remarks";
            objdatatable.Columns["Gratuity"].ColumnName = "Tip Amount";
            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=Customer Report " + Today + ".xls");

            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:30.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">Dulles Shuttle Service Driver Report</td></TR>");
            HttpContext.Current.Response.Write(" <TR>");
            //am getting my grid's column headers
            int columnscount = objdatatable.Columns.Count;

            for (int j = 0; j < columnscount; j++)
            {      //write in new column
                HttpContext.Current.Response.Write("<Td style='font-size:11.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white'>");
                //Get column headers  and make it as bold in excel columns
                HttpContext.Current.Response.Write("<B>");
                HttpContext.Current.Response.Write(objdatatable.Columns[j].ToString());
                HttpContext.Current.Response.Write("</B>");
                HttpContext.Current.Response.Write("</Td>");
            }
            HttpContext.Current.Response.Write("</TR>");

            if (objdatatable.Rows.Count <= 0)
            {
                HttpContext.Current.Response.Write("<Td colspan=\"10\" align=\"left\">");
                HttpContext.Current.Response.Write("No Record Found");
                HttpContext.Current.Response.Write("</Td>");
            }
            else
            {
                foreach (DataRow row in objdatatable.Rows)
                {//write in new row
                    HttpContext.Current.Response.Write("<TR>");
                    for (int i = 0; i < objdatatable.Columns.Count; i++)
                    {
                        HttpContext.Current.Response.Write("<Td>");
                        //Checking for gratuity amount
                        if (i == 9)
                            HttpContext.Current.Response.Write((row[i].ToString()).Split('^')[0]);
                        else
                            HttpContext.Current.Response.Write(row[i].ToString());
                        HttpContext.Current.Response.Write("</Td>");
                    }
                    HttpContext.Current.Response.Write("</TR>");
                }
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</TR>");
                HttpContext.Current.Response.Write("</Table>");

                HttpContext.Current.Response.Write("<table align=\"center\">");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total Fare: ");
                HttpContext.Current.Response.Write(TotalFare);
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }
        public T Deserialize<T>(string context)
        {
            string jsonData = context;

            //cast to specified objectType
            var obj = (T)new JavaScriptSerializer().Deserialize<T>(jsonData);
            return obj;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public class User
        {
            public int ID { get; set; }
            public string Name { get; set; }

        }
    }
}