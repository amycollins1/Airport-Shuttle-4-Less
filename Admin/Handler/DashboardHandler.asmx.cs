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
                string strTomorrow = DateTime.Today.AddDays(1).ToString("MM-dd-yyyy");

                var result = new
                {
                    ServiceToday = DB.tbl_Reservations.Count(x => x.ReservationDate == strToday && x.DriverId != 0 && x.Status != "Deleted"),

                    ServiceTomorrow = DB.tbl_Reservations.Count(x => x.ReservationDate == strTomorrow && x.DriverId != 0 && x.Status != "Deleted"),

                    ResMadeTodayList = DB.tbl_Reservations.Count(x => x.CreatedDate.StartsWith(strToday) && x.Status != "Deleted"),

                    UnassignedTomorrow = DB.tbl_Reservations.Count(x => x.ReservationDate == strTomorrow && x.DriverId == 0 && x.Status != "Deleted"),

                    OnlineReservation = DB.tbl_Reservations.Count(x => x.CreatedBy == "Customer" && x.Status == "Requested"),

                    UpcomingReservation = DB.tbl_Reservations.Count(x => (x.ReservationDate == strToday || x.ReservationDate == strTomorrow) && x.Status != "Deleted"),

                    PendingReservation = DB.tbl_Reservations.Count(x => x.Status != "Deleted")
                };

                return new JavaScriptSerializer { MaxJsonLength = int.MaxValue }
                    .Serialize(new { retCode = 1, data = result });
            }
            catch (Exception ex)
            {
                return new JavaScriptSerializer().Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetReservations(string type, int page, int pageSize)
        {
            try
            {
                string strToday = DateTime.Today.ToString("MM-dd-yyyy");
                string strTomorrow = DateTime.Today.AddDays(1).ToString("MM-dd-yyyy");

                var query = DB.tbl_Reservations.Where(x => x.Status != "Deleted");

                switch (type)
                {
                    case "ServiceToday":
                        query = query.Where(x => x.ReservationDate == strToday && x.DriverId != 0);
                        break;

                    case "ServiceTomorrow":
                        query = query.Where(x => x.ReservationDate == strTomorrow && x.DriverId != 0);
                        break;

                    case "ResMadeTodayList":
                        query = query.Where(x => x.CreatedDate.StartsWith(strToday));
                        break;

                    case "UnassignedTomorrow":
                        query = query.Where(x => x.ReservationDate == strTomorrow && x.DriverId == 0);
                        break;

                    case "OnlineReservation":
                        query = query.Where(x => x.CreatedBy == "Customer" && x.Status == "Requested");
                        break;

                    case "UpcomingReservation":
                        query = query.Where(x => x.ReservationDate == strToday || x.ReservationDate == strTomorrow);
                        break;

                    case "PendingReservation":
                        query = query.Where(x => x.Status != "Deleted");
                        break;
                }

                int totalCount = query.Count();

                var data = query
                    .OrderByDescending(x => x.ReservationDate)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(x => new
                    {
                        x.ReservationId,
                        x.FirstName,
                        x.LastName,
                        x.Service,
                        x.ReservationDate,
                        x.Time,
                        x.TotalFare,
                        x.Status,
                        x.IsPaid,
                        x.Sid
                    })
                    .ToList();

                return new JavaScriptSerializer().Serialize(new
                {
                    retCode = 1,
                    data = data,
                    totalCount = totalCount
                });
            }
            catch (Exception ex)
            {
                return new JavaScriptSerializer().Serialize(new { retCode = 0, Error = ex.Message });
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
