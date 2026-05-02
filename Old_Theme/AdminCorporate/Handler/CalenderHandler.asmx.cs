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
    /// Summary description for CalenderHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CalenderHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string SearchReservationByDate(string From, string To)
        {
            try
            {
                //HttpCookie cook = new HttpCookie("testcook");
                //string User_Name = cook["userName"];
                List<tbl_Reservation> Reservations = new List<tbl_Reservation>();
                List<tbl_Reservation> SortedReservation = new List<tbl_Reservation>();
                DateTime dFrom = DateTime.ParseExact(From, "MM-dd-yyyy", CultureInfo.InvariantCulture);
                DateTime dTo = DateTime.ParseExact(To, "MM-dd-yyyy", CultureInfo.InvariantCulture);


                Reservations = (from Obj in DB.tbl_Reservations select Obj).OrderByDescending(x => x.Sid).Take(50).ToList();
                //foreach (var Reservation in Reservations)
                //{
                //    DateTime ResDate = new DateTime();
                //    if (DateTime.TryParseExact(Reservation.ReservationDate, "MM-dd-yyyy", CultureInfo.CurrentCulture, DateTimeStyles.None, out ResDate))
                //    {
                //        if (ResDate >= dFrom && ResDate <= dTo)
                //        {
                //            SortedReservation.Add(Reservation);
                //        }
                //    }                    
                //}

                HttpContext.Current.Session["CalenderList"] = Reservations;


                return jsSerializer.Serialize(new { retCode = 1, ArrReservation = Reservations });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

    }
}
