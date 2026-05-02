using System;
using System.Data;
using System.Web;

namespace Frederick.AdminCorporate.Handler
{
    /// <summary>
    /// Summary description for CorpExpToExcelHandler
    /// </summary>
    public class CorpExpToExcelHandler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            string requestedTable = context.Request["datatable"];
            string Name = context.Request["Name"];
            Decimal TotalAmount = 0;

            #region Corporate Reservation
            if (requestedTable == "dtCorpReservation")
            {
                DataTable dtResult = null;
                if (HttpContext.Current.Session["CorporateReport"] != null)
                {
                    dtResult = (DataTable)HttpContext.Current.Session["CorporateReport"];
                    //TotalAmount = (decimal)HttpContext.Current.Session["CorporateTotalAmount"];
                    DataView myDataView = dtResult.DefaultView;
                    //myDataView.Sort = "Sid DESC";
                    DataTable SorteddtResult = myDataView.ToTable();
                    DataTable dtSelectedColumns = SorteddtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "Service", "Source", "Destination", "Driver", "TotalAmount", "Remark");
                    ExporttoExcelCropReservation(dtSelectedColumns);
                }
                else
                {
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "Service", "Source", "Destination", "Driver", "TotalAmount", "Remark");
                    ExporttoExcelCropReservation(dtSelectedColumns);
                }
            }
            #endregion

            #region Admin Corporate Report
            if (requestedTable == "dtAdminCorpReservation")
            {
                DataTable dtResult = null;
                if (HttpContext.Current.Session["AdminCorporateReport"] != null)
                {
                    dtResult = (DataTable)HttpContext.Current.Session["AdminCorporateReport"];
                    //TotalAmount = (decimal)HttpContext.Current.Session["CorporateTotalAmount"];
                    DataView myDataView = dtResult.DefaultView;
                    //myDataView.Sort = "Sid DESC";
                    DataTable SorteddtResult = myDataView.ToTable();
                    DataTable dtSelectedColumns = SorteddtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "PassengerName", "Service", "Source", "Destination", "Driver", "TotalAmount", "Remark");
                    ExporttoExcelAdminCropReservation(dtSelectedColumns, Name);
                }
                else
                {
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "PassengerName", "Service", "Source", "Destination", "Driver", "TotalAmount", "Remark");
                    ExporttoExcelAdminCropReservation(dtSelectedColumns, Name);
                }
            }
            #endregion

            #region Company Report
            if (requestedTable == "dtCompany")
            {
                DataTable dtResult = null;
                if (HttpContext.Current.Session["CompanyReport"] != null)
                {
                    dtResult = (DataTable)HttpContext.Current.Session["CompanyReport"];
                    //TotalAmount = (decimal)HttpContext.Current.Session["CompanyTotalAmount"];
                    DataView myDataView = dtResult.DefaultView;
                    //myDataView.Sort = "Sid DESC";
                    DataTable SorteddtResult = myDataView.ToTable();
                    DataTable dtSelectedColumns = SorteddtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "Service", "Source", "Destination", "Driver", "TotalAmount");
                    ExporttoExcelCompanyReservation(dtSelectedColumns, Name);
                }
                else
                {
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "Service", "Source", "Destination", "Driver", "TotalAmount");
                    ExporttoExcelCompanyReservation(dtSelectedColumns, Name);
                }
            }
            #endregion

            #region Driver Report
            if (requestedTable == "dtDriver")
            {
                DataTable dtResult = null;
                if (HttpContext.Current.Session["DriverReport"] != null)
                {
                    dtResult = (DataTable)HttpContext.Current.Session["DriverReport"];
                    //TotalAmount = (decimal)HttpContext.Current.Session["CompanyTotalAmount"];
                    DataView myDataView = dtResult.DefaultView;
                    //myDataView.Sort = "Sid DESC";
                    DataTable SorteddtResult = myDataView.ToTable();
                    DataTable dtSelectedColumns = SorteddtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "Service", "Source", "Destination", "TotalAmount");
                    ExporttoExcelDriverReservation(dtSelectedColumns, Name);
                }
                else
                {
                    DataTable dtSelectedColumns = dtResult.DefaultView.ToTable(false, "ReservationNo", "ReservationDate", "Passenger", "Service", "Source", "Destination", "TotalAmount");
                    ExporttoExcelDriverReservation(dtSelectedColumns, Name);
                }
            }
            #endregion
        }

        public static void ExporttoExcelCropReservation(DataTable objdatatable)
        {
            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            //DataTable objdatatable = (DataTable)HttpContext.Current.Session["CorporateReport"];
            decimal TotalAmount = (decimal)HttpContext.Current.Session["CorporateTotalAmount"];
            objdatatable.Columns["ReservationNo"].ColumnName = "Reservation No";
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["Passenger"].ColumnName = "Passenger";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            objdatatable.Columns["Driver"].ColumnName = "Driver";
            objdatatable.Columns["TotalAmount"].ColumnName = "Total Amount";
            objdatatable.Columns["Remark"].ColumnName = "Remark";
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=Reports " + Today + ".xls");

            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:40.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">AS4L Shuttle Service </td></TR>");
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
                HttpContext.Current.Response.Write("<Td colspan=\"9\" align=\"left\">");
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
                        HttpContext.Current.Response.Write(row[i].ToString().Replace("False", "Inactive").Replace("True", "Active"));
                        HttpContext.Current.Response.Write("</Td>");
                    }

                    HttpContext.Current.Response.Write("</TR>");
                }
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("<table align=\"center\">");
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(TotalAmount.ToString().Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");
                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }

        public static void ExporttoExcelAdminCropReservation(DataTable objdatatable, string Name)
        {
            //var distinctRows = (from DataRow dRow in objdatatable.Rows select dRow["ReservationNo"]).Distinct();
            //DataTable dt = objdatatable.DefaultView.ToTable(true);
            //DataTable NewTable = objdatatable.Clone();
            //String[] szColumns = new String[objdatatable.Columns.Count];
            //for (int index = 0; index < objdatatable.Rows.Count; index++)
            //{
            //    szColumns[index] = objdatatable.Columns[index].ColumnName;
            //}

            // Get the distinct records
            //dt = objdatatable.DefaultView.ToTable(true, szColumns);

            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            //DataTable objdatatable = (DataTable)HttpContext.Current.Session["CorporateReport"];
            decimal TotalAmount = (decimal)HttpContext.Current.Session["AdminCorporateTotalAmount"];
            objdatatable.Columns["ReservationNo"].ColumnName = "Reservation No";
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["Passenger"].ColumnName = "Passenger";
            objdatatable.Columns["PassengerName"].ColumnName = "Passenger Name";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            objdatatable.Columns["Driver"].ColumnName = "Driver";
            objdatatable.Columns["TotalAmount"].ColumnName = "Total Amount";
            objdatatable.Columns["Remark"].ColumnName = "Remark";
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" + Name + " " + Today + ".xls");


            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:40.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">" + Name + " </td></TR>");
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
                        HttpContext.Current.Response.Write(row[i].ToString().Replace("False", "Inactive").Replace("True", "Active"));
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
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("</Td>");

                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(TotalAmount.ToString().Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");
                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }

        public static void ExporttoExcelCompanyReservation(DataTable objdatatable, string CompanyName)
        {
            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            //DataTable objdatatable = (DataTable)HttpContext.Current.Session["CorporateReport"];
            string str = (string)HttpContext.Current.Session["CompanyTotalAmount"];
            string[] Splitter = str.Split('^');
            decimal DriverAmount = Convert.ToDecimal(Splitter[0]) - Convert.ToDecimal(Splitter[1]);
            objdatatable.Columns["ReservationNo"].ColumnName = "Reservation No";
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["Passenger"].ColumnName = "Passenger";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            objdatatable.Columns["Driver"].ColumnName = "Driver";
            objdatatable.Columns["TotalAmount"].ColumnName = "Total Amount";
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=Reports " + Today + ".xls");

            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:40.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">" + CompanyName + " </td></TR>");
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
                HttpContext.Current.Response.Write("<Td colspan=\"9\" align=\"left\">");
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
                        HttpContext.Current.Response.Write(row[i].ToString().Replace("False", "Inactive").Replace("True", "Active"));
                        HttpContext.Current.Response.Write("</Td>");
                    }

                    HttpContext.Current.Response.Write("</TR>");
                }
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("<table align=\"center\">");
                HttpContext.Current.Response.Write("<TR>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(Splitter[0].Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Driver Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(DriverAmount.ToString().Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("AS4L Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(Splitter[1].Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }

        public static void ExporttoExcelDriverReservation(DataTable objdatatable, string Name)
        {
            string Today = DateTime.Now.ToString("MM-dd-yyyy");
            //DataTable objdatatable = (DataTable)HttpContext.Current.Session["CorporateReport"];
            string str = (string)HttpContext.Current.Session["DriverTotalAmount"];
            string[] Splitter = str.Split('^');
            decimal DriverAmount = Convert.ToDecimal(Splitter[0]) - Convert.ToDecimal(Splitter[1]);
            objdatatable.Columns["ReservationNo"].ColumnName = "Reservation No";
            objdatatable.Columns["ReservationDate"].ColumnName = "Reservation Date";
            objdatatable.Columns["Passenger"].ColumnName = "Passenger";
            objdatatable.Columns["Service"].ColumnName = "Service";
            objdatatable.Columns["Source"].ColumnName = "Source";
            objdatatable.Columns["Destination"].ColumnName = "Destination";
            //objdatatable.Columns["Driver"].ColumnName = "Driver";
            objdatatable.Columns["TotalAmount"].ColumnName = "Total Amount";
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Write(@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.0 Transitional//EN"">");
            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename= " + Name + " Report " + Today + ".xls");

            HttpContext.Current.Response.Charset = "utf-8";
            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("windows-1250");
            //sets font
            HttpContext.Current.Response.Write("<font style='font-size:13.0pt; font-family:Helvetica Neue;'>");
            //HttpContext.Current.Response.Write("<BR><BR><BR>");
            //sets the table border, cell spacing, border color, font of the text, background, foreground, font height
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
              "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
              "style='font-size:10.0pt; font-family:Helvetica Neue; background:#f2f2f2; text-align:center'>");

            HttpContext.Current.Response.Write(" <TR style='font-size:40.0pt; font-family:Helvetica Neue; text-align:center; background:#006699;color:white; text-align:center'><td colspan=" + objdatatable.Columns.Count + ">" + Name + " </td></TR>");
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
                HttpContext.Current.Response.Write("<Td colspan=\"8\" align=\"left\">");
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
                        HttpContext.Current.Response.Write(row[i].ToString().Replace("False", "Inactive").Replace("True", "Active"));
                        HttpContext.Current.Response.Write("</Td>");
                    }

                    HttpContext.Current.Response.Write("</TR>");
                }
                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("<table align=\"center\">");
                HttpContext.Current.Response.Write("<TR>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Total Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(Splitter[0].Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("AS4L Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(Splitter[1].Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("<TR>");
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<b>");
                HttpContext.Current.Response.Write("Driver Amount: ".Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write(DriverAmount.ToString().Replace("False", "Inactive").Replace("True", "Active"));
                HttpContext.Current.Response.Write("</b>");
                HttpContext.Current.Response.Write("</Td>");
                HttpContext.Current.Response.Write("</TR>");

                HttpContext.Current.Response.Write("</Table>");
                HttpContext.Current.Response.Write("</font>");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}