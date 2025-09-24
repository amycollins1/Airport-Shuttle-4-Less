using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Data;
using System.ComponentModel;
using Frederick.DL;

namespace Frederick.BL
{
    public class DefaultManager
    {
        #region Time
        public static string GetTime(string Time)
        {
            try
            {
                string[] s = null;
                if (Time.Contains("AM") || Time.Contains("PM"))
                { }
                else
                {
                    s = Regex.Split(Time, ":");

                    if (Convert.ToInt16(s[0]) > 12)
                    {
                        Int64 val = Convert.ToInt16(s[0]) - 12;
                        Time = val.ToString() + ":" + s[1] + ":PM";
                    }
                    else if (Convert.ToInt16(s[0]) == 0)
                        Time = "12:" + s[1] + ":AM";
                    else if (Convert.ToInt16(s[0]) == 12)
                        Time = s[0] + ":" + s[1] + ":PM";
                    else
                        Time = s[0] + ":" + s[1] + ":AM";
                }
            }
            catch
            { }
            return Time;
        }
        #endregion

        public static DataTable GetAllReservation(string From, string To, string ResNo, string FirstName, string LastName, string PhoneNo)
        {
            DBHelperDataContext DB = new DBHelperDataContext();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DataTable dtResult = new DataTable();
            List<tbl_Reservation> ReservationList = new List<tbl_Reservation>();
            if (HttpContext.Current.Session["AllReservationList"] != null)
            {
                ReservationList = (List<tbl_Reservation>)HttpContext.Current.Session["AllReservationList"];
            }
            else
            {
                ReservationList = (from Obj in DB.tbl_Reservations select Obj).OrderBy(x => x.ReservationDate).ToList();
            }

            if (ResNo != "")
            {
                ReservationList = ReservationList.Where(s => s.ReservationId == ResNo).ToList();
            }
            if (FirstName != "" && LastName != "")
            {
                ReservationList = ReservationList.Where(s => s.FirstName == FirstName && s.LastName == LastName).ToList();
            }
            if (PhoneNo != "")
            {
                ReservationList = ReservationList.Where(s => s.PhoneNo == PhoneNo).ToList();
            }
            if (From != "" && To != "")
            {
                DateTime dFrom = GetAppDate(From);
                DateTime dTo = GetAppDate(To);
                ReservationList = ReservationList.Where(s => GetAppDate(s.ReservationDate) >= dFrom && GetAppDate(s.ReservationDate) <= dTo).ToList();
            }
            dtResult = DefaultManager.ConvertToDatatable(ReservationList);
            return dtResult;
        }
        public static DataTable ConvertToDatatable<T>(List<T> data)
        {
            PropertyDescriptorCollection props =
                TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            for (int i = 0; i < props.Count; i++)
            {
                PropertyDescriptor prop = props[i];
                if (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                    table.Columns.Add(prop.Name, prop.PropertyType.GetGenericArguments()[0]);
                else
                    table.Columns.Add(prop.Name, prop.PropertyType);
            }
            object[] values = new object[props.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = props[i].GetValue(item);
                }
                table.Rows.Add(values);
            }
            return table;
        }

        #region Report Classes
        public class ResReport
        {
            public string ReservationNo { get; set; }
            public string ReservationDate { get; set; }
            public string Passenger { get; set; }
            public string PassengerName { get; set; }
            public string Service { get; set; }
            public string Source { get; set; }
            public string Destination { get; set; }
            public string Driver { get; set; }
            public Int64 DriverId { get; set; }
            public decimal TotalAmount { get; set; }
            public string Remark { get; set; }
        }

        public class CorpReport
        {
            public string ReservationNo { get; set; }
            public string ReservationDate { get; set; }
            public string Passenger { get; set; }
            public string Service { get; set; }
            public string Source { get; set; }
            public string Destination { get; set; }
            public string Driver { get; set; }
            public Int64 DriverId { get; set; }
            public decimal TotalAmount { get; set; }
        }

        public class CompletedRes
        {
            public Int64 Sid { get; set; }
            public string ReservationNo { get; set; }
            public string ReservationDate { get; set; }
            public string Passenger { get; set; }
            public string PassengerName { get; set; }
            public string Service { get; set; }
            public string Source { get; set; }
            public string Destination { get; set; }
            public string Driver { get; set; }
            public string CreatedBy { get; set; }
            public string CreatedDate { get; set; }
            public Int64 DriverId { get; set; }
            public decimal TotalAmount { get; set; }
        }
        #endregion

        public static DateTime GetAppDate(string Date)
        {
            // string Date = Row["AppliedDate"].ToString();
            DateTime date = new DateTime();
            Date = (Date.Split(' ')[0]).Replace("/", "-");
            try
            {
                string[] formats = {"M/d/yyyy", "MM/dd/yyyy",
                                "d/M/yyyy", "dd/MM/yyyy",
                                "yyyy/M/d", "yyyy/MM/dd",
                                "M-d-yyyy", "MM-dd-yyyy",
                                "d-M-yyyy", "dd-MM-yyyy",
                                "yyyy-M-d", "yyyy-MM-dd",
                                "M.d.yyyy", "MM.dd.yyyy",
                                "d.M.yyyy", "dd.MM.yyyy",
                                "yyyy.M.d", "yyyy.MM.dd",
                                "M,d,yyyy", "MM,dd,yyyy",
                                "d,M,yyyy", "dd,MM,yyyy",
                                "yyyy,M,d", "yyyy,MM,dd",
                                "M d yyyy", "MM dd yyyy",
                                "d M yyyy", "dd MM yyyy",
                                "yyyy M d", "yyyy MM dd",
                                "m/dd/yyyy hh:mm:ss tt",
                               };
                //DateTime dateValue;
                foreach (string dateStringFormat in formats)
                {
                    if (DateTime.TryParseExact(Date, dateStringFormat, System.Globalization.CultureInfo.CurrentCulture, System.Globalization.DateTimeStyles.None,
                                               out date))
                    {
                        date.ToShortDateString();
                        break;
                    }
                }
            }
            catch (Exception ex)
            { }
            finally
            { }
            return date;
        }
    }
}