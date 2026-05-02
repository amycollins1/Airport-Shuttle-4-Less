using Frederick.BL;
using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Admin.Handler
{
    /// <summary>
    /// Summary description for ReservationHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ReservationHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        #region Booking
 
        [WebMethod(EnableSession = true)]
        public string CancelBooking(int BookingSid)
        {
            try
            { 
                tbl_Reservation Reservation = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);

                if (Reservation.Status == "Cancelled")
                {
                    return jsSerializer.Serialize(new { Retcode = 1 }); 
                }

                Reservation.Status = "Cancelled";
                DB.SubmitChanges();

                EmailManager.CustomerBody(Reservation.ReservationId);
               
                return jsSerializer.Serialize(new { Retcode = 1});
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CancelMultiBooking(int[] BookingSid)
        {
            try
            { 
                for (int i = 0; i < BookingSid.Length; i++)
                {
                    tbl_Reservation Reservation = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);
                 
                    if (Reservation.Status == "Cancelled")
                    {
                        return jsSerializer.Serialize(new { Retcode = 1 });
                    }

                    Reservation.Status = "Cancelled";
                    DB.SubmitChanges();

                    EmailManager.CustomerBody(Reservation.ReservationId);

                }

                return jsSerializer.Serialize(new { Retcode = 1 });
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
            }
        }

        [WebMethod(EnableSession = true)]
        public string DeleteBooking(int BookingSid)
        {
            try
            { 
                tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);
                Booking.Status = "Deleted";
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { Retcode = 1 });
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
            } 
        }

        [WebMethod(EnableSession = true)]
        public string DeleteMultipuleBooking(int[] BookingSid)
        {
            try
            {
                for (int i = 0; i < BookingSid.Length; i++)
                { 
                    tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);
                    Booking.Status = "Deleted";
                    DB.SubmitChanges();
                }
                return jsSerializer.Serialize(new { Retcode = 1 });
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
            } 
        }

        [WebMethod(EnableSession = true)]
        public string CompleteBooking(int BookingSid)
        {
            try
            { 
                tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid);
                string Paid = Booking.IsPaid.ToString();
                string Service = Booking.Service;

                DateTime Today = DateTime.Today;
                //string TodayDate = Today.ToString("MM-dd-yyyy");
                string TodayDate = Today.ToString("dd-MM-yyyy");
                //DateTime DateTime.Now = GetAppDate(TodayDate);
                DateTime ReservationDate = DateTime.ParseExact(Booking.ReservationDate, "MM-dd-yyyy", null);

                string Times = DateTime.Now.ToString("hh:mm");
                //Times = Times.ToString("HH:mm:ss");
                //string sTime = Times.ToShortTimeString();
                //string a = sTime.ToString("HH:mm:ss");
                string[] Splitter = Times.Split(':');
                Int64 Hours = Convert.ToInt64(Splitter[0]);
                Int64 Min = Convert.ToInt64(Splitter[1]);
                if (Booking.Status == "Completed")
                {
                    return jsSerializer.Serialize(new { Retcode = 2 });
                }
                else if (Booking.DriverId == 0 || Booking.DriverId == null)
                {
                    return jsSerializer.Serialize(new { Retcode = 3 });
                }
                else if (Paid == "False")
                {
                    return jsSerializer.Serialize(new { Retcode = 4 });
                }
                else if (ReservationDate >  DateTime.Now)
                {
                    return jsSerializer.Serialize(new { Retcode = 5 });
                }
                else if (ReservationDate == DateTime.Now)
                {
                    if (Service == "From Airport")
                    {
                        string BookingTime = Booking.Time;
                        string[] Splitter1 = BookingTime.Split(':');
                        Int64 bHours = Convert.ToInt64(Splitter1[0]);
                        Int64 bMin = Convert.ToInt64(Splitter1[1]);
                        if (bHours > Hours)
                        {
                            return jsSerializer.Serialize(new { Retcode = 5 });
                        }
                        else if (bHours == Hours)
                        {
                            if (bMin > Min)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                            }
                        }
                        else
                        {
                            Booking.Status = "Completed";
                            DB.SubmitChanges();
                            return jsSerializer.Serialize(new { Retcode = 1 });
                        }
                    }
                    else if (Service == "To Airport")
                    {
                        string BookingTime = Booking.Time;
                        string[] Splitter1 = BookingTime.Split(':');
                        Int64 bHours = Convert.ToInt64(Splitter1[0]);
                        Int64 bMin = Convert.ToInt64(Splitter1[1]);
                        if (bHours > Hours)
                        {
                            return jsSerializer.Serialize(new { Retcode = 5 });
                        }
                        else if (bHours == Hours)
                        {
                            if (bMin > Min)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                            }
                        }
                        else
                        {
                            Booking.Status = "Completed";
                            DB.SubmitChanges();
                            return jsSerializer.Serialize(new { Retcode = 1 });
                        }
                    }
                    else if (Service == "Point To Point Reservation" || Service == "Hourly Reservation")
                    {
                        string BookingTime = Booking.Time;
                        string[] Splitter1 = BookingTime.Split(':');
                        Int64 bHours = Convert.ToInt64(Splitter1[0]);
                        Int64 bMin = Convert.ToInt64(Splitter1[1]);
                        if (bHours > Hours)
                        {
                            return jsSerializer.Serialize(new { Retcode = 5 });
                        }
                        else if (bHours == Hours)
                        {
                            if (bMin > Min)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                            }
                        }
                        else
                        {
                            Booking.Status = "Completed";
                            DB.SubmitChanges();
                            return jsSerializer.Serialize(new { Retcode = 1 });
                        }
                    }
                }

                else
                {
                    Booking.Status = "Completed";
                    DB.SubmitChanges();
                    return jsSerializer.Serialize(new { Retcode = 1 });
                }
            }
            catch
            {
                return jsSerializer.Serialize(new { Retcode = -1 });
            }
            return jsSerializer.Serialize(new { Retcode = 0 });
        }

        [WebMethod(EnableSession = true)]
        public string mCompleteBooking(int[] BookingSid)
        {
            try
            {
                var ReservationIDS = "";
                for (int i = 0; i < BookingSid.Length; i++)
                {

                    tbl_Reservation Booking = DB.tbl_Reservations.Single(x => x.Sid == BookingSid[i]);
                    string Paid = Booking.IsPaid.ToString();
                    string Service = Booking.Service;

                    DateTime Today = DateTime.Today;
                    //string TodayDate = Today.ToString("MM-dd-yyyy");
                    string TodayDate = Today.ToString("dd-MM-yyyy");
                    //DateTime DateTime.Now = GetAppDate(TodayDate);
                    DateTime ReservationDate = DateTime.ParseExact(Booking.ReservationDate, "MM-dd-yyyy", null);

                    string Times = DateTime.Now.ToString("hh:mm");
                    //Times = Times.ToString("HH:mm:ss");
                    //string sTime = Times.ToShortTimeString();
                    //string a = sTime.ToString("HH:mm:ss");
                    string[] Splitter = Times.Split(':');
                    Int64 Hours = Convert.ToInt64(Splitter[0]);
                    Int64 Min = Convert.ToInt64(Splitter[1]);
                    if (Booking.Status == "Completed")
                    {
                        return jsSerializer.Serialize(new { Retcode = 2 });
                        //json = "{\"Session\":\"1\",\"Retcode\":\"2\"}";
                    }
                    else if (Booking.DriverId == 0 || Booking.DriverId == null)
                    {
                        return jsSerializer.Serialize(new { Retcode = 3 });
                    }
                    else if (Paid == "False")
                    {
                        return jsSerializer.Serialize(new { Retcode = 4 });
                    }
                    else if (ReservationDate > DateTime.Now)
                    {
                        return jsSerializer.Serialize(new { Retcode = 5 });
                    }
                    else if (ReservationDate == DateTime.Now)
                    {
                        if (Service == "From Airport")
                        {
                            string BookingTime = Booking.Time;
                            string[] Splitter1 = BookingTime.Split(':');
                            Int64 bHours = Convert.ToInt64(Splitter1[0]);
                            Int64 bMin = Convert.ToInt64(Splitter1[1]);
                            if (bHours > Hours)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                            }
                            else if (bHours == Hours)
                            {
                                if (bMin > Min)
                                {
                                    return jsSerializer.Serialize(new { Retcode = 5 });
                                }
                            }
                            else
                            {
                                Booking.Status = "Completed";
                                DB.SubmitChanges();
                                //return jsSerializer.Serialize(new { Retcode = 1 });
                            }
                        }
                        else if (Service == "To Airport")
                        {
                            string BookingTime = Booking.Time;
                            string[] Splitter1 = BookingTime.Split(':');
                            Int64 bHours = Convert.ToInt64(Splitter1[0]);
                            Int64 bMin = Convert.ToInt64(Splitter1[1]);
                            if (bHours > Hours)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                            }
                            else if (bHours == Hours)
                            {
                                if (bMin > Min)
                                {
                                    return jsSerializer.Serialize(new { Retcode = 5 });
                                }
                            }
                            else
                            {
                                Booking.Status = "Completed";
                                DB.SubmitChanges();
                                //return jsSerializer.Serialize(new { Retcode = 1 });
                            }
                        }
                        else if (Service == "Point To Point Reservation" || Service == "Hourly Reservation")
                        {
                            string BookingTime = Booking.Time;
                            string[] Splitter1 = BookingTime.Split(':');
                            Int64 bHours = Convert.ToInt64(Splitter1[0]);
                            Int64 bMin = Convert.ToInt64(Splitter1[1]);
                            if (bHours > Hours)
                            {
                                return jsSerializer.Serialize(new { Retcode = 5 });
                            }
                            else if (bHours == Hours)
                            {
                                if (bMin > Min)
                                {
                                    return jsSerializer.Serialize(new { Retcode = 5 });
                                }
                            }
                            else
                            {
                                Booking.Status = "Completed";
                                DB.SubmitChanges();
                                // return jsSerializer.Serialize(new { Retcode = 1 });
                            }
                        }
                    }

                    else
                    {
                        Booking.Status = "Completed";
                        DB.SubmitChanges();
                        //return jsSerializer.Serialize(new { Retcode = 1 });
                    }
                    if (i == 0)
                        ReservationIDS = Booking.ReservationId;
                    else
                        ReservationIDS += ", " + Booking.ReservationId ;
                }
                return jsSerializer.Serialize(new { Retcode = 1, ReservationIDS= ReservationIDS });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { Retcode = 0, Error = ex.Message });
            }
            //return jsSerializer.Serialize(new { Retcode = 0 });
        }

        #endregion
    }
}
