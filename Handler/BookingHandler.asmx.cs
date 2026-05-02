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
                // Clean up Source and Destination whitespace
                Reservation.Source = Regex.Replace(Reservation.Source, @"\s+", " ").Trim();
                Reservation.Destination = Regex.Replace(Reservation.Destination, @"\s+", " ").Trim();

                if (Reservation.Sid == 0)
                {
                    DB.tbl_Reservations.InsertOnSubmit(Reservation);
                    DB.SubmitChanges();
                }
                else
                {
                    var res = (from obj in DB.tbl_Reservations where obj.Sid == Reservation.Sid select obj).FirstOrDefault();
                    if (res == null)
                    {
                        return jsSerializer.Serialize(new { retCode = 0, Error = "Reservation not found." });
                    }

                    // Assign all updatable fields (remove duplicates)
                    res.ReservationDate = Reservation.ReservationDate;
                    res.Service = Reservation.Service;
                    res.Time = Reservation.Time;
                    res.Source = Reservation.Source;
                    res.Destination = Reservation.Destination;
                    res.Address = Reservation.Address;
                    res.Passenger = Reservation.Passenger;
                    res.CardLast4 = Reservation.CardLast4;
                    res.CardType = Reservation.CardType;
                    res.PaymentType = Reservation.PaymentType;
                    res.VehicleId = Reservation.VehicleId;
                    res.VehicleRate = Reservation.VehicleRate;
                    res.Remark = Reservation.Remark;
                    res.BaseCharge = Reservation.BaseCharge;
                    res.Distance = Reservation.Distance;
                    res.Fare = Reservation.Fare;
                    res.IsMeetAndGreet = Reservation.IsMeetAndGreet;
                    res.IsLateNight = Reservation.IsLateNight;
                    res.IsChildSeat = Reservation.IsChildSeat;
                    res.ChildSeatType = Reservation.ChildSeatType;
                    res.ChildCharge = Reservation.ChildCharge;
                    res.IsPetInCage = Reservation.IsPetInCage;
                    res.PetInCageCharge = Reservation.PetInCageCharge;
                    res.Gratuity = Reservation.Gratuity;
                    res.ExtraBags = Reservation.ExtraBags;
                    res.ExtraBagCharge = Reservation.ExtraBagCharge;
                    res.Adults = Reservation.Adults;
                    res.AdultCharge = Reservation.AdultCharge;
                    res.Childs = Reservation.Childs;
                    res.Toll = Reservation.Toll;
                    res.Parking = Reservation.Parking;
                    res.TotalFare = Reservation.TotalFare;
                    res.OfferDetail = Reservation.OfferDetail;
                    res.IsPaid = Reservation.IsPaid;
                    res.IsSanitization = Reservation.IsSanitization;
                    res.DriverId = Reservation.DriverId;
                    res.DriverName = Reservation.DriverName;
                    res.DriverPercent = Reservation.DriverPercent;
                    res.Status = Reservation.Status;
                    res.Hours = Reservation.Hours;
                    res.Airlines = Reservation.Airlines;
                    res.FlightNumber = Reservation.FlightNumber;
                    res.IsSnow = Reservation.IsSnow;
                    res.Snow = Reservation.Snow;
                    res.Stops = Reservation.Stops;
                    res.IsHalt = Reservation.IsHalt;
                    res.HourlySettingID = Reservation.HourlySettingID;
                    res.HaltingHours = Reservation.HaltingHours;
                    res.HaltingDiscount = Reservation.HaltingDiscount;
                    res.CardProcessingFee = Reservation.CardProcessingFee;

                    DB.SubmitChanges();
                    Reservation.ReservationId = res.ReservationId;
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
