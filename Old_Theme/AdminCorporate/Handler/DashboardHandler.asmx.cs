using Frederick.BL;
using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Data.Linq.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Admin.Handler
{
    /// <summary>
    /// Summary description for DashboardHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DashboardHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string DashboardCount()
        {
            try
            {
                string strToday = DateTime.Today.ToString("MM-dd-yyyy");
                string strTomorrow = (DateTime.Today.AddDays(1)).ToString("MM-dd-yyyy");
                DateTime Today = DateTime.ParseExact(strToday, "MM-dd-yyyy", CultureInfo.InvariantCulture);
                DateTime Tomorrow = DateTime.ParseExact(strTomorrow, "MM-dd-yyyy", CultureInfo.InvariantCulture);
                //var rDate = new DateTime(29,10,2020
                var rDate = new DateTime(Convert.ToInt32(strToday.Substring(6, 4)), Convert.ToInt32(strToday.Substring(0, 2)), Convert.ToInt32(strToday.Substring(3, 2)));
                var ServiceToday = (from obj in DB.tbl_Reservations where obj.ReservationDate == strToday && obj.DriverId != 0 && obj.Status != "Deleted" select obj).ToList();
                var ServiceTomorrow = (from obj in DB.tbl_Reservations where obj.ReservationDate == strTomorrow && obj.DriverId != 0 && obj.Status != "Deleted" select obj).ToList();
                List<tbl_Reservation> ResMadeTodayList = (from obj in DB.tbl_Reservations where SqlMethods.Like(obj.CreatedDate, strToday + "%") && obj.Status != "Deleted" select obj).ToList();
                var UnassignedTomorrow = (from obj in DB.tbl_Reservations where obj.ReservationDate == strTomorrow && obj.DriverId == 0 && obj.Status != "Deleted" select obj).ToList();
                var OnlineReservation = (from obj in DB.tbl_Reservations where obj.CreatedBy == "Customer" && obj.Status != "Deleted" select obj).OrderBy(x => x.ReservationDate).ToList();
                var UpcomingReservation = (from obj in DB.tbl_Reservations where (obj.ReservationDate == strToday || obj.ReservationDate == strTomorrow) && obj.Status != "Deleted" select obj).OrderBy(x => x.ReservationDate).ToList();
                var PendingReservation = (from obj in DB.tbl_Reservations
                                          let ResDate = new DateTime(Convert.ToInt32(strToday.Substring(6, 4)), Convert.ToInt32(strToday.Substring(0, 2)), Convert.ToInt32(strToday.Substring(3, 2)))
                                          where ResDate >= Today && obj.Status != "Deleted"
                                          select obj).OrderBy(x => x.ReservationDate).ToList();
                //tbl_Reservation Reservation = new tbl_Reservation();

                return jsSerializer.Serialize(new { retCode = 1, ServiceToday = ServiceToday, ServiceTomorrow = ServiceTomorrow, ResMadeTodayList = ResMadeTodayList, UnassignedTomorrow = UnassignedTomorrow, OnlineReservation = OnlineReservation, UpcomingReservation = UpcomingReservation, PendingReservation = PendingReservation });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string ChangeStatus(Int64 Sid, string Status)
        {
            try
            {
                var Data = (from obj in DB.tbl_Reservations where obj.Sid == Sid select obj).FirstOrDefault();
                Data.Status = Status;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string ConfirmBooking(Int64 Sid, Int64 DriverId, string DriverName, Int64 Percent)
        {
            try
            {
                var Data = (from obj in DB.tbl_Reservations where obj.Sid == Sid select obj).FirstOrDefault();
                Data.DriverId = DriverId;
                Data.Status = "Confirmed";
                Data.DriverName = DriverName;
                Data.DriverPercent = Percent;
                DB.SubmitChanges();
                EmailManager.CustomerBody(Data.ReservationId);
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
    }
}
