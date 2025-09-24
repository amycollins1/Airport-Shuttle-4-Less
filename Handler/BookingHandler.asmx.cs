using Frederick.BL;
using Frederick.DL;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Handler
{
    /// <summary>
    /// Summary description for BookingHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class BookingHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string AddReservation(tbl_Reservation Reservation, bool IsEmail)
        {
            try
            {
                if (Reservation.Sid == 0)
                {
                    Reservation.Source = Regex.Replace(Reservation.Source, @"\s+", " ").Trim();
                    Reservation.Destination = Regex.Replace(Reservation.Destination, @"\s+", " ").Trim();
                    DB.tbl_Reservations.InsertOnSubmit(Reservation);
                    DB.SubmitChanges();
                }
                else
                {
                    var Res = (from Obj in DB.tbl_Reservations where Obj.Sid == Reservation.Sid select Obj).FirstOrDefault();
                    Res.ReservationDate = Reservation.ReservationDate;
                    Res.Service = Reservation.Service;
                    Res.Time = Reservation.Time;
                    Res.Source = Regex.Replace(Reservation.Source, @"\s+", " ").Trim();
                    Res.Destination = Regex.Replace(Reservation.Destination, @"\s+", " ").Trim();
                    Res.Address = Reservation.Address;
                    Res.Passenger = Reservation.Passenger;
                    Res.CardLast4 = Reservation.CardLast4;
                    Res.CardType = Reservation.CardType;
                    Res.PaymentType = Reservation.PaymentType;
                    Res.VehicleId = Reservation.VehicleId;
                    Res.VehicleRate = Reservation.VehicleRate;

                    Res.Remark = Reservation.Remark;
                    Res.BaseCharge = Reservation.BaseCharge;
                    Res.Distance = Reservation.Distance;
                    Res.Fare = Reservation.Fare;
                    Res.IsMeetAndGreet = Reservation.IsMeetAndGreet;
                    Res.IsLateNight = Reservation.IsLateNight;
                    Res.IsChildSeat = Reservation.IsChildSeat;
                    Res.ChildSeatType = Reservation.ChildSeatType;
                    Res.ChildCharge = Reservation.ChildCharge;
                    Res.IsPetInCage = Reservation.IsPetInCage;
                    Res.PetInCageCharge = Reservation.PetInCageCharge;
                    Res.Gratuity = Reservation.Gratuity;
                    Res.ExtraBags = Reservation.ExtraBags;
                    Res.ExtraBagCharge = Reservation.ExtraBagCharge;
                    Res.Passenger = Reservation.Passenger;
                    Res.Adults = Reservation.Adults;
                    Res.AdultCharge = Reservation.AdultCharge;
                    Res.Childs = Reservation.Childs;
                    Res.ChildCharge = Reservation.ChildCharge;
                    Res.Toll = Reservation.Toll;
                    Res.Parking = Reservation.Parking;
                    Res.TotalFare = Reservation.TotalFare;
                    Res.OfferDetail = Reservation.OfferDetail;
                    Res.IsPaid = Reservation.IsPaid;
                    Res.IsSanitization = Reservation.IsSanitization;
                    Res.DriverId = Reservation.DriverId;
                    Res.DriverName = Reservation.DriverName;
                    Res.DriverPercent = Reservation.DriverPercent;
                    Res.Status = Reservation.Status;

                    Res.Hours = Reservation.Hours;
                    Res.Airlines = Reservation.Airlines;
                    Res.FlightNumber = Reservation.FlightNumber;

                    Res.IsSnow = Reservation.IsSnow;
                    Res.Snow = Reservation.Snow;
                    Res.Stops = Reservation.Stops;
                    Res.IsHalt = Reservation.IsHalt;
                    Res.HourlySettingID = Reservation.HourlySettingID;
                    Res.HaltingHours = Reservation.HaltingHours;
                    Res.HaltingDiscount = Reservation.HaltingDiscount;
                    Res.CardProcessingFee = Reservation.CardProcessingFee;
                    DB.SubmitChanges();
                    Reservation.ReservationId = Res.ReservationId;
                }

                if (IsEmail)
                    EmailManager.CustomerBody(Reservation.ReservationId);

                return jsSerializer.Serialize(new { retCode = 1, ReservationId = Reservation.ReservationId });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string ApplyOffer(string Code)
        {
            try
            {
                var OfferDetails = (from Obj in DB.tbl_Offers where Obj.Code == Code select Obj).FirstOrDefault();
                if (OfferDetails != null)
                    return jsSerializer.Serialize(new { retCode = 1, OfferDetails = OfferDetails });
                else
                    return jsSerializer.Serialize(new { retCode = 0 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CheckEmail(string Email)
        {
            try
            {
                var Details = (from Obj in DB.tbl_Logins where Obj.Email == Email && Obj.IsActive == true select Obj).FirstOrDefault();
                if (Details != null)
                    return jsSerializer.Serialize(new { retCode = 1, Details = Details });
                else
                    return jsSerializer.Serialize(new { retCode = 0 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
    }
}
