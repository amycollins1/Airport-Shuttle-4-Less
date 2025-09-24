using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Admin.Handler
{
    /// <summary>
    /// Summary description for ReportHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ReportHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string SearchReservationByDate(string From, string To, string Status, string RequestedType)
        {
            try
            {
                //HttpCookie cook = new HttpCookie("testcook");
                //string User_Name = cook["userName"];
                List<tbl_Reservation> Reservation = new List<tbl_Reservation>();
                List<tbl_Reservation> SortedByDriver = new List<tbl_Reservation>();
                if (Status == "All" && RequestedType== "Admin")
                {
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.CreatedBy == "Admin" && Obj.Status!="Deleted" select Obj).OrderBy(x => x.ReservationDate).ToList();
                }
                else if (Status == "All" && RequestedType == "Customer")
                {
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.CreatedBy == "Customer" && Obj.Status != "Deleted" select Obj).OrderBy(x => x.ReservationDate).ToList();
                }
                else if (Status == "Requested Online" || RequestedType == "Customer")
                {
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.CreatedBy == "Customer" && Obj.Status != "Deleted" select Obj).OrderBy(x => x.ReservationDate).ToList();
                }
                else if (Status != "All" && RequestedType == "Admin")
                {
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.Status == Status && Obj.CreatedBy == "Admin" && Obj.Status != "Deleted" select Obj).OrderBy(x => x.ReservationDate).ToList();
                }
                else if (Status != "All" && RequestedType == "Customer")
                {
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.Status == Status && Obj.CreatedBy == "Admin" && Obj.Status != "Deleted" select Obj).OrderBy(x => x.ReservationDate).ToList();
                }

                if (From != "")
                {
                    DateTime dFrom = GetAppDate(From);
                    DateTime dTo = GetAppDate(To);
                    Reservation = Reservation.Where(s => GetAppDate(s.ReservationDate) >= dFrom && GetAppDate(s.ReservationDate) <= dTo).ToList();
                }
                HttpContext.Current.Session["ReservationList"] = Reservation;

                if (Status == "Completed")
                {
                    SortedByDriver = Reservation.OrderBy(x => x.DriverId).ToList();
                }

                return jsSerializer.Serialize(new { retCode = 1, Arr = Reservation, SortedByDriver = SortedByDriver });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string DriverActivity(string From, string To, Int64 DriverId)
        {
            try
            {
                List<tbl_Reservation> Reservation = new List<tbl_Reservation>();
                List<tbl_Reservation> SortedByDriver = new List<tbl_Reservation>();

                Reservation = (from Obj in DB.tbl_Reservations where Obj.DriverId == DriverId select Obj).OrderBy(x => x.ReservationDate).ToList();
                if (From != "")
                {
                    DateTime dFrom = GetAppDate(From);
                    DateTime dTo = GetAppDate(To);
                    Reservation = Reservation.Where(s => GetAppDate(s.ReservationDate) >= dFrom && GetAppDate(s.ReservationDate) <= dTo).ToList();
                }
                HttpContext.Current.Session["ReservationList"] = Reservation;
                return jsSerializer.Serialize(new { retCode = 1, Arr = Reservation });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        #region Customer Activity

        [WebMethod(EnableSession = true)]
        public string GetAllReservation()
        {
            try
            {
                var ReservationList = (from Obj in DB.tbl_Reservations select Obj).OrderBy(x => x.ReservationDate).ToList();
                return jsSerializer.Serialize(new { retCode = 1, ReservationList = ReservationList });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CustomerActivity(string From, string To, Int64 CustomerId, string ResNo, string PhoneNo)
        {
            List<tbl_Reservation> Reservation = new List<tbl_Reservation>();

            if (CustomerId != 0)
            {
                //Reservation = (from Obj in DB.tbl_Reservations where  select Obj).ToList();
            }
            if (From != "" && To != "")
            {
                DateTime dFrom = GetAppDate(From);
                DateTime dTo = GetAppDate(To);
                //if(Reservation.Count==0)
                //    Reservation = (from Obj in DB.tbl_Reservations where  select Obj).ToList();
                //else
                //    Reservation = Reservation.Where(s => GetAppDate(s.ReservationDate) >= dFrom && GetAppDate(s.ReservationDate) <= dTo).ToList();
            }
            if (ResNo != "")
            {
                if (Reservation.Count == 0)
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.ReservationId == ResNo select Obj).ToList();
                else
                    Reservation = Reservation.Where(s => s.ReservationId == ResNo).ToList();
            }
            if (PhoneNo != "")
            {
                if (Reservation.Count == 0)
                    Reservation = (from Obj in DB.tbl_Reservations where Obj.PhoneNo == PhoneNo select Obj).ToList();
                else
                    Reservation = Reservation.Where(s => s.PhoneNo == PhoneNo).ToList();
            }
            HttpContext.Current.Session["CustomerList"] = Reservation;
            //if (Reservation.Count > 0)
            //{
            //    DataTable dtCustomerList = ConvertToDatatable(List);
            //}
            //DataTable dtCustomerList = ConvertToDatatable(List);
            //Decimal TotalFare = 0;
            //Decimal PercentageOfFare = 0;
            //Decimal DriversPayOut = 0;
            //Decimal Tip = 0;
            //Decimal Fare = 0;
            //foreach (var item in List)
            //{
            //    TotalFare = TotalFare + Convert.ToDecimal(item.TotalFare);
            //    Fare = Fare + Convert.ToDecimal(item.Fare);
            //    Tip = Tip + Convert.ToDecimal(item.GratuityAmount);
            //}
            //Decimal Percentage = Convert.ToDecimal(0);
            //Percentage = Percentage / 100;
            //PercentageOfFare = (Percentage * Fare);
            //DriversPayOut = TotalFare - PercentageOfFare;
            ////DriversPayOut = DriversPayOut + Tip;

            //decimal Totalf = Math.Round(TotalFare, 2);

            //Session["CustomerAmount"] = Math.Round(TotalFare, 2) + " " + Math.Round(PercentageOfFare, 2) + " " + Math.Round(DriversPayOut, 2) + " " + Math.Round(Tip, 2) + " " + Math.Round(Fare, 2);

            //HttpContext.Current.Session["CustomerList"] = dtCustomerList;
            //json = jsSerializer.Serialize(List);
            //json = json.TrimEnd(']');
            //json = json.TrimStart('[');
            //json = "{\"Session\":\"1\",\"retCode\":\"1\",\"Arr\":[" + json + "]}";

            return jsSerializer.Serialize(new { retCode = 1, Arr = Reservation });
        }

        [WebMethod(EnableSession = true)]
        public string CustomerActivityReport(string Data)
        {
            try
            {
                //HttpContext.Current.Session["CustomerList"] = Reservation;
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
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
                    if (DateTime.TryParseExact(Date, dateStringFormat, CultureInfo.CurrentCulture, DateTimeStyles.None,
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
