using Frederick.BL;
using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.AdminCorporate.Handler
{
    /// <summary>
    /// Summary description for CorporativeHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CorporativeHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        #region Reservation
        [WebMethod(EnableSession = true)]
        public string AddReservation(tbl_CorpReservation Reservation, List<string> FnameList, List<string> LnameList, List<string> MobileList, List<string> AirlineList, List<string> FlightList, List<string> TimeList, bool IsDriver, bool IsBWI, bool IsCorp)
        {
            try
            {
                string Result = "";
                List<tbl_CorpReservationDetail> PassengerList = new List<tbl_CorpReservationDetail>();
                tbl_CorpReservationDetail PassengerDetail = new tbl_CorpReservationDetail();
                if (Reservation.Sid == 0)
                {
                    string Today = DateTime.Now.Date.ToString("MM-dd-yyyy");
                    string tm = DateTime.Now.ToString("HH:mm");
                    Reservation.DateTime = Today + " " + tm;
                    Reservation.ReservationNo = ResNo(Reservation.CompanyName);
                    Reservation.CreatedBy = "Admin";
                    DB.tbl_CorpReservations.InsertOnSubmit(Reservation);
                    DB.SubmitChanges();
                    for (int i = 0; i < Convert.ToInt64(Reservation.Passenger); i++)
                    {
                        PassengerDetail = new tbl_CorpReservationDetail();
                        PassengerDetail.FirstName = FnameList[i];
                        PassengerDetail.LastName = LnameList[i];
                        PassengerDetail.MobileNo = MobileList[i];
                        if (Reservation.Service == "From")
                        {
                            PassengerDetail.Airline = AirlineList[i];
                            PassengerDetail.FlightNo = FlightList[i];
                        }
                        PassengerDetail.Time = DefaultManager.GetTime(TimeList[i]);
                        PassengerDetail.ReservationNo = Reservation.ReservationNo;
                        PassengerList.Add(PassengerDetail);
                        //DB.tbl_CopReservationDetails.InsertOnSubmit(PassengerDetail);
                        //DB.SubmitChanges();
                    }
                    DB.tbl_CorpReservationDetails.InsertAllOnSubmit(PassengerList);
                    DB.SubmitChanges();
                    if (IsDriver != false || IsBWI != false || IsCorp != false)
                    {
                        if (Reservation.DriverId == 0)
                            Result = EmailManager.CorpEmail(Reservation, PassengerList, IsCorp, false, IsBWI);
                        else
                            Result = EmailManager.CorpEmail(Reservation, PassengerList, IsCorp, IsDriver, IsBWI);
                    }
                }
                else
                {
                    var Reservations = (from objReservation in DB.tbl_CorpReservations where objReservation.Sid == Reservation.Sid select objReservation).FirstOrDefault();
                    Reservations.Service = Reservation.Service;
                    Reservations.Passenger = Reservation.Passenger;
                    Reservations.ReservationDate = Reservation.ReservationDate;
                    Reservations.DriverId = Reservation.DriverId;
                    Reservations.DropAddress = Reservation.DropAddress;
                    Reservations.PickupAddress = Reservation.PickupAddress;
                    Reservations.CompanyName = Reservation.CompanyName;
                    Reservations.IsCreditCard = Reservation.IsCreditCard;
                    Reservations.TotalAmount = Reservation.TotalAmount;
                    Reservations.Remark = Reservation.Remark;
                    Reservations.Status = Reservation.Status;
                    DB.SubmitChanges();

                    PassengerList = (from objReservation in DB.tbl_CorpReservationDetails where objReservation.ReservationNo == Reservations.ReservationNo select objReservation).ToList();
                    if (PassengerList.Count == Convert.ToInt64(Reservation.Passenger))
                    {
                        for (int i = 0; i < PassengerList.Count; i++)
                        {
                            PassengerList[i].FirstName = FnameList[i];
                            PassengerList[i].LastName = LnameList[i];
                            PassengerList[i].MobileNo = MobileList[i];
                            if (Reservation.Service == "From")
                            {
                                PassengerList[i].Airline = AirlineList[i];
                                PassengerList[i].FlightNo = FlightList[i];
                            }
                            PassengerList[i].Time = DefaultManager.GetTime(TimeList[i]);
                        }
                    }
                    else
                    {
                        DB.tbl_CorpReservationDetails.DeleteAllOnSubmit(PassengerList);
                        DB.SubmitChanges();
                        PassengerList = new List<tbl_CorpReservationDetail>();

                        for (int i = 0; i < Convert.ToInt64(Reservation.Passenger); i++)
                        {
                            PassengerDetail = new tbl_CorpReservationDetail();
                            PassengerDetail.ReservationNo = Reservations.ReservationNo;
                            PassengerDetail.FirstName = FnameList[i];
                            PassengerDetail.LastName = LnameList[i];
                            PassengerDetail.MobileNo = MobileList[i];
                            if (Reservation.Service == "From")
                            {
                                PassengerDetail.Airline = AirlineList[i];
                                PassengerDetail.FlightNo = FlightList[i];
                            }
                            PassengerDetail.Time = DefaultManager.GetTime(TimeList[i]);
                            PassengerList.Add(PassengerDetail);
                        }
                        DB.tbl_CorpReservationDetails.InsertAllOnSubmit(PassengerList);
                    }

                    DB.SubmitChanges();
                    if (IsDriver != false || IsBWI != false || IsCorp != false)
                    {
                        if (Reservation.DriverId == 0)
                            Result = EmailManager.CorpEmail(Reservations, PassengerList, IsCorp, false, IsBWI);
                        else
                            Result = EmailManager.CorpEmail(Reservations, PassengerList, IsCorp, IsDriver, IsBWI);
                    }
                }

                return jsSerializer.Serialize(new { retCode = 1, Result = Result });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Session = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllReservation()
        {
            try
            {
                var List = (from Obj in DB.tbl_CorpReservations select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetReservation(Int64 Sid)
        {
            try
            {
                var List = (from Obj in DB.tbl_CorpReservations
                            join Det in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Det.ReservationNo
                            //join Driver in DB.Trans_Tbl_Logins on Obj.DriverId equals Driver.Sid
                            where Obj.Sid == Sid
                            select new
                            {
                                Obj.Sid,
                                Obj.CompanyName,
                                Obj.DateTime,
                                Obj.DriverId,
                                Obj.DropAddress,
                                Obj.IsCreditCard,
                                Obj.Passenger,
                                Obj.PickupAddress,
                                Obj.Remark,
                                Obj.ReservationDate,
                                Obj.ReservationNo,
                                Obj.Service,
                                Obj.TotalAmount,
                                Obj.Status,
                                Det.FirstName,
                                Det.LastName,
                                Det.MobileNo,
                                Det.Airline,
                                Det.FlightNo,
                                Det.Time,
                            }).ToList();
                return jsSerializer.Serialize(new { retCode = 1, ReservationDetail = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetReservationDetail(string ResNo, Int64 DriverId)
        {
            try
            {
                tbl_Login Driver = new tbl_Login();
                var List = (from Obj in DB.tbl_CorpReservationDetails where Obj.ReservationNo == ResNo select Obj).ToList();
                if (DriverId != 0)
                {
                    Driver = (from Obj in DB.tbl_Logins where Obj.UserType == "Driver" && Obj.Sid == DriverId select Obj).FirstOrDefault();
                }
                return jsSerializer.Serialize(new { retCode = 1, List = List, Driver = Driver });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string SearchReservation(string CompanyName, string Status)
        {
            try
            {
                List<ResList> ResesrvationList = new List<ResList>();

                var test = (from Obj in DB.tbl_CorpReservations
                            join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                            select new ResList
                            {
                                Sid = Obj.Sid,
                                ReservationNo = Obj.ReservationNo,
                                ReservationDate = Obj.ReservationDate,
                                Passenger = Obj.Passenger,
                                Service = Obj.Service,
                                Status = Obj.Status,
                                PickupAddress = Obj.PickupAddress,
                                DropAddress = Obj.DropAddress,
                                Driver = Obj.DriverId.ToString(),
                                CreatedDate = Obj.DateTime,
                                CreatedBy = Obj.CreatedBy,
                                Remark = Obj.Remark,
                                Time = Detail.Time,
                                TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                            }).ToList();

                if (CompanyName == "" && Status == "All")
                    
                    ResesrvationList = (from Obj in DB.tbl_CorpReservations
                                        join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                        select new ResList
                                        {
                                            Sid = Obj.Sid,
                                            ReservationNo = Obj.ReservationNo,
                                            ReservationDate = Obj.ReservationDate,
                                            Passenger = Obj.Passenger,
                                            Service = Obj.Service,
                                            Status = Obj.Status,
                                            PickupAddress = Obj.PickupAddress,
                                            DropAddress = Obj.DropAddress,
                                            Driver = Obj.DriverId.ToString(),
                                            CreatedDate = Obj.DateTime,
                                            CreatedBy = Obj.CreatedBy,
                                            Remark = Obj.Remark,
                                            Time = Detail.Time,
                                            TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                        }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).OrderBy(x => x.ReservationDate).ToList();
                else if (CompanyName == "")
                {
                    ResesrvationList = (from Obj in DB.tbl_CorpReservations
                                        join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                        where Obj.Status == Status
                                        select new ResList
                                        {
                                            Sid = Obj.Sid,
                                            ReservationNo = Obj.ReservationNo,
                                            ReservationDate = Obj.ReservationDate,
                                            Passenger = Obj.Passenger,
                                            Service = Obj.Service,
                                            Status = Obj.Status,
                                            PickupAddress = Obj.PickupAddress,
                                            DropAddress = Obj.DropAddress,
                                            Driver = Obj.DriverId.ToString(),
                                            CreatedDate = Obj.DateTime,
                                            CreatedBy = Obj.CreatedBy,
                                            Remark = Obj.Remark,
                                            Time = Detail.Time,
                                            TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                        }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).OrderBy(x => x.ReservationDate).ToList();
                }
                else if (Status == "All")
                {
                    ResesrvationList = (from Obj in DB.tbl_CorpReservations
                                        where Obj.CompanyName == CompanyName
                                        join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                        select new ResList
                                        {
                                            Sid = Obj.Sid,
                                            ReservationNo = Obj.ReservationNo,
                                            ReservationDate = Obj.ReservationDate,
                                            Passenger = Obj.Passenger,
                                            Service = Obj.Service,
                                            Status = Obj.Status,
                                            PickupAddress = Obj.PickupAddress,
                                            DropAddress = Obj.DropAddress,
                                            Driver = Obj.DriverId.ToString(),
                                            CreatedDate = Obj.DateTime,
                                            CreatedBy = Obj.CreatedBy,
                                            Remark = Obj.Remark,
                                            Time = Detail.Time,
                                            TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                        }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).OrderBy(x => x.ReservationDate).ToList();
                }
                else
                {
                    ResesrvationList = (from Obj in DB.tbl_CorpReservations
                                        join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                        where Obj.CompanyName == CompanyName && Obj.Status == Status
                                        select new ResList
                                        {
                                            Sid = Obj.Sid,
                                            ReservationNo = Obj.ReservationNo,
                                            ReservationDate = Obj.ReservationDate,
                                            Passenger = Obj.Passenger,
                                            Service = Obj.Service,
                                            Status = Obj.Status,
                                            PickupAddress = Obj.PickupAddress,
                                            DropAddress = Obj.DropAddress,
                                            Driver = Obj.DriverId.ToString(),
                                            CreatedDate = Obj.DateTime,
                                            CreatedBy = Obj.CreatedBy,
                                            Remark = Obj.Remark,
                                            Time = Detail.Time,
                                            TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                        }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).OrderBy(x => x.ReservationDate).ToList();
                }
                return jsSerializer.Serialize(new { retCode = 1, ResesrvationList = ResesrvationList });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }
        #endregion

        #region Complete Reservation
        [WebMethod(EnableSession = true)]
        public string GetAllConfReservation()
        {
            try
            {
                DateTime Today = DateTime.Now.Date;
                var List = (from Obj in DB.tbl_CorpReservations
                            let rDate = new DateTime(Convert.ToInt32(Obj.ReservationDate.Substring(6, 4)), Convert.ToInt32(Obj.ReservationDate.Substring(0, 2)), Convert.ToInt32(Obj.ReservationDate.Substring(3, 2)))
                            where rDate <= Today && Obj.Status == "Confirmed"
                            select Obj).OrderBy(x => x.ReservationDate).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CompleteReservation(Int64[] ResIds)
        {
            try
            {
                tbl_CorpReservation Reservation = new tbl_CorpReservation();
                for (int i = 0; i < ResIds.Length; i++)
                {
                    Reservation = (from Obj in DB.tbl_CorpReservations where Obj.Sid == ResIds[i] select Obj).FirstOrDefault();
                    Reservation.Status = "Completed";
                }
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }
        #endregion

        #region Reports

        [WebMethod(EnableSession = true)]
        public string CompanyResReport(string From, string To, string CompanyName)
        {
            try
            {
                decimal TotalAmount = 0, PercentageOfAmount = 0;//
                List<tbl_Login> DriverList = new List<tbl_Login>();
                DateTime dFrom = DateTime.ParseExact(From, "MM-dd-yyyy", CultureInfo.InvariantCulture);
                DateTime dTo = DateTime.ParseExact(To, "MM-dd-yyyy", CultureInfo.InvariantCulture);

                List<DefaultManager.ResReport> ResList = new List<DefaultManager.ResReport>();

                if (From == To)
                {
                    ResList = (from Obj in DB.tbl_CorpReservations
                               join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                               where Obj.ReservationDate == From && Obj.CompanyName == CompanyName && Obj.Status == "Completed"
                               select new DefaultManager.ResReport
                               {
                                   ReservationNo = Obj.ReservationNo,
                                   ReservationDate = Obj.ReservationDate,
                                   Passenger = Obj.Passenger,
                                   Service = Obj.Service,
                                   Source = Obj.PickupAddress,
                                   Destination = Obj.DropAddress,
                                   Driver = Drivers.FirstName + " " + Drivers.LastName,
                                   DriverId = Convert.ToInt64(Obj.DriverId),
                                   TotalAmount = Convert.ToDecimal(Obj.TotalAmount),
                               }).OrderBy(x => x.ReservationDate).ToList();
                }
                else
                    ResList = (from Obj in DB.tbl_CorpReservations
                               join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                               let rDate = new DateTime(Convert.ToInt32(Obj.ReservationDate.Substring(6, 4)), Convert.ToInt32(Obj.ReservationDate.Substring(0, 2)), Convert.ToInt32(Obj.ReservationDate.Substring(3, 2)))
                               where dFrom <= rDate && rDate <= dTo && Obj.CompanyName == CompanyName && Obj.Status == "Completed"
                               select new DefaultManager.ResReport
                               {
                                   ReservationNo = Obj.ReservationNo,
                                   ReservationDate = Obj.ReservationDate,
                                   Passenger = Obj.Passenger,
                                   Service = Obj.Service,
                                   Source = Obj.PickupAddress,
                                   Destination = Obj.DropAddress,
                                   Driver = Drivers.FirstName + " " + Drivers.LastName,
                                   DriverId = Convert.ToInt64(Obj.DriverId),
                                   TotalAmount = Convert.ToDecimal(Obj.TotalAmount),
                               }).OrderBy(x => x.ReservationDate).ToList();
                if (ResList.Count > 0)
                {
                    List<DefaultManager.ResReport> DisDriverList = new List<DefaultManager.ResReport>();
                    DisDriverList = ResList.GroupBy(Obj => Obj.DriverId).Select(g => g.First()).ToList();

                    for (int i = 0; i < DisDriverList.Count; i++)
                    {
                        tbl_Login Driver = (from Obj in DB.tbl_Logins where Obj.Sid == DisDriverList[i].DriverId select Obj).FirstOrDefault();
                        DriverList.Add(Driver);
                    }

                    Decimal Percentage;
                    for (int i = 0; i < ResList.Count; i++)
                    {
                        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                        tbl_Login SelDriver = DriverList.Where(r => r.Sid == ResList[i].DriverId).FirstOrDefault();
                        Percentage = (Convert.ToDecimal(ResList[i].TotalAmount) * Convert.ToDecimal(SelDriver.Percentage)) / 100;
                        PercentageOfAmount = PercentageOfAmount + Percentage;
                    }
                }
                DataTable dtTable = DefaultManager.ConvertToDatatable(ResList);
                TotalAmount = Math.Round(TotalAmount, 2);
                PercentageOfAmount = Math.Round(PercentageOfAmount, 2);
                Session["CompanyReport"] = dtTable;
                Session["CompanyTotalAmount"] = TotalAmount + "^" + PercentageOfAmount;
                return jsSerializer.Serialize(new { retCode = 1, ResList = ResList, TotalAmount = TotalAmount, PercentageOfAmount = PercentageOfAmount });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string DriverReport(string From, string To, Int64 DriverId)
        {
            try
            {
                decimal TotalAmount = 0, PercentageOfAmount = 0;//
                List<tbl_Login> DriverList = new List<tbl_Login>();
                DateTime dFrom = DateTime.ParseExact(From, "MM-dd-yyyy", CultureInfo.InvariantCulture);
                DateTime dTo = DateTime.ParseExact(To, "MM-dd-yyyy", CultureInfo.InvariantCulture);

                List<DefaultManager.ResReport> ResList = new List<DefaultManager.ResReport>();

                if (From == To)
                {
                    ResList = (from Obj in DB.tbl_CorpReservations
                               join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                               where Obj.ReservationDate == From && Obj.DriverId == DriverId && Obj.Status == "Completed"
                               select new DefaultManager.ResReport
                               {
                                   ReservationNo = Obj.ReservationNo,
                                   ReservationDate = Obj.ReservationDate,
                                   Passenger = Obj.Passenger,
                                   Service = Obj.Service,
                                   Source = Obj.PickupAddress,
                                   Destination = Obj.DropAddress,
                                   Driver = Drivers.FirstName + " " + Drivers.LastName,
                                   DriverId = Convert.ToInt64(Obj.DriverId),
                                   TotalAmount = Convert.ToDecimal(Obj.TotalAmount),
                               }).OrderBy(x => x.ReservationDate).ToList();
                }
                else
                    ResList = (from Obj in DB.tbl_CorpReservations
                               join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                               let rDate = new DateTime(Convert.ToInt32(Obj.ReservationDate.Substring(6, 4)), Convert.ToInt32(Obj.ReservationDate.Substring(0, 2)), Convert.ToInt32(Obj.ReservationDate.Substring(3, 2)))
                               where dFrom <= rDate && rDate <= dTo && Obj.DriverId == DriverId && Obj.Status == "Completed"
                               select new DefaultManager.ResReport
                               {
                                   ReservationNo = Obj.ReservationNo,
                                   ReservationDate = Obj.ReservationDate,
                                   Passenger = Obj.Passenger,
                                   Service = Obj.Service,
                                   Source = Obj.PickupAddress,
                                   Destination = Obj.DropAddress,
                                   Driver = Drivers.FirstName + " " + Drivers.LastName,
                                   DriverId = Convert.ToInt64(Obj.DriverId),
                                   TotalAmount = Convert.ToDecimal(Obj.TotalAmount),
                               }).OrderBy(x => x.ReservationDate).ToList();
                if (ResList.Count > 0)
                {
                    List<DefaultManager.ResReport> DisDriverList = new List<DefaultManager.ResReport>();
                    DisDriverList = ResList.GroupBy(Obj => Obj.DriverId).Select(g => g.First()).ToList();

                    for (int i = 0; i < DisDriverList.Count; i++)
                    {
                        tbl_Login Driver = (from Obj in DB.tbl_Logins where Obj.Sid == DisDriverList[i].DriverId select Obj).FirstOrDefault();
                        DriverList.Add(Driver);
                    }

                    Decimal Percentage;
                    for (int i = 0; i < ResList.Count; i++)
                    {
                        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                        tbl_Login SelDriver = DriverList.Where(r => r.Sid == ResList[i].DriverId).FirstOrDefault();
                        Percentage = (Convert.ToDecimal(ResList[i].TotalAmount) * Convert.ToDecimal(SelDriver.Percentage)) / 100;
                        PercentageOfAmount = PercentageOfAmount + Percentage;
                    }
                }
                DataTable dtTable = DefaultManager.ConvertToDatatable(ResList);
                TotalAmount = Math.Round(TotalAmount, 2);
                PercentageOfAmount = Math.Round(PercentageOfAmount, 2);
                Session["DriverReport"] = dtTable;
                Session["DriverTotalAmount"] = TotalAmount + "^" + PercentageOfAmount;
                return jsSerializer.Serialize(new { retCode = 1, ResList = ResList, TotalAmount = TotalAmount, PercentageOfAmount = PercentageOfAmount });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllDriver()
        {
            try
            {
                var DriverList = (from Obj in DB.tbl_Logins where Obj.UserType == "Driver" && Obj.IsActive == true select Obj).ToList();

                return jsSerializer.Serialize(new { retCode = 1, DriverList = DriverList });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CorporateReport(string From, string To, string CompanyName)
        {
            try
            {
                decimal TotalAmount = 0;
                //GlobalDefaultTransfers GlobalDefault = new GlobalDefaultTransfers();
                //GlobalDefault = (GlobalDefaultTransfers)HttpContext.Current.Session["UserLogin"];

                DateTime dFrom = DateTime.ParseExact(From, "MM-dd-yyyy", CultureInfo.InvariantCulture);
                DateTime dTo = DateTime.ParseExact(To, "MM-dd-yyyy", CultureInfo.InvariantCulture);

                DefaultManager.ResReport ResReport = new DefaultManager.ResReport();
                List<DefaultManager.ResReport> TempResList = new List<DefaultManager.ResReport>();
                List<DefaultManager.ResReport> ResList = new List<DefaultManager.ResReport>();
                List<DefaultManager.ResReport> NewResList = new List<DefaultManager.ResReport>();
                if (From == To)
                {
                    ResList = (from Obj in DB.tbl_CorpReservations
                               join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                               join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                               where Obj.ReservationDate == From && Obj.CompanyName == CompanyName && Obj.Status == "Completed"
                               select new DefaultManager.ResReport
                               {
                                   ReservationNo = Obj.ReservationNo,
                                   ReservationDate = Obj.ReservationDate,
                                   Passenger = Obj.Passenger,
                                   PassengerName = Detail.FirstName + " " + Detail.LastName,
                                   Service = Obj.Service,
                                   Source = Obj.PickupAddress,
                                   Destination = Obj.DropAddress,
                                   Driver = Drivers.FirstName + " " + Drivers.LastName,
                                   TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                   Remark = Obj.Remark,
                               }).OrderBy(x => x.ReservationDate).ToList();
                }
                else
                    ResList = (from Obj in DB.tbl_CorpReservations
                               join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                               join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                               let rDate = new DateTime(Convert.ToInt32(Obj.ReservationDate.Substring(6, 4)), Convert.ToInt32(Obj.ReservationDate.Substring(0, 2)), Convert.ToInt32(Obj.ReservationDate.Substring(3, 2)))
                               where dFrom <= rDate && rDate <= dTo && Obj.CompanyName == CompanyName && Obj.Status == "Completed"
                               select new DefaultManager.ResReport
                               {
                                   ReservationNo = Obj.ReservationNo,
                                   ReservationDate = Obj.ReservationDate,
                                   Passenger = Obj.Passenger,
                                   PassengerName = Detail.FirstName + " " + Detail.LastName,
                                   Service = Obj.Service,
                                   Source = Obj.PickupAddress,
                                   Destination = Obj.DropAddress,
                                   Driver = Drivers.FirstName + " " + Drivers.LastName,
                                   TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                   Remark = Obj.Remark,
                               }).OrderBy(x => x.ReservationDate).ToList();

                string PassengerName = "";
                for (int i = 0; i < ResList.Count; i++)
                {
                    PassengerName = "";
                    if (i == 0)
                    {
                        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                        TempResList = ResList.Where(x => x.ReservationNo == ResList[i].ReservationNo).ToList();
                        for (int j = 0; j < TempResList.Count; j++)
                        {
                            if (j == 0)
                                PassengerName = PassengerName + TempResList[j].PassengerName;
                            else
                                PassengerName = PassengerName + ", " + TempResList[j].PassengerName;
                        }
                        TempResList[0].PassengerName = PassengerName;
                        NewResList.Add(TempResList[0]);
                    }
                    //else if ((ResList[i - 1].ReservationNo == ResList[i].ReservationNo) && i == ResList.Count - 1)
                    //{
                    //    PassengerName = PassengerName + TempResList[i].PassengerName;
                    //}
                    else if (ResList[i - 1].ReservationNo == ResList[i].ReservationNo)
                        continue;
                    else
                    {
                        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                        TempResList = ResList.Where(x => x.ReservationNo == ResList[i].ReservationNo).ToList();
                        for (int j = 0; j < TempResList.Count; j++)
                        {
                            if (j == 0)
                                PassengerName = PassengerName + TempResList[j].PassengerName;
                            else
                                PassengerName = PassengerName + ", " + TempResList[j].PassengerName;
                        }
                        TempResList[0].PassengerName = PassengerName;
                        NewResList.Add(TempResList[0]);
                    }
                }
                //for (int i = 0; i < ResList.Count; i++)
                //{
                //    ResReport = ResList[i];
                //    if (i == 0)
                //        PassengerName = ResListTempResList
                //    else if ((ResList[i - 1].ReservationNo == ResList[i].ReservationNo) && i == ResList.Count - 1)
                //    {
                //        PassengerName = PassengerName + ", " + ResList[i].PassengerName;
                //        ResReport.PassengerName = PassengerName;
                //        NewResList.Add(ResReport);
                //    }
                //    else if (ResList[i - 1].ReservationNo == ResList[i].ReservationNo)
                //        PassengerName = PassengerName + ", " + ResList[i].PassengerName;
                //    else if (i == ResList.Count - 1)
                //    {
                //        PassengerName = PassengerName + ", " + ResList[i].PassengerName;
                //    }
                //    else
                //        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                //}
                //for (int i = 0; i < ResList.Count; i++)
                //{
                //    if (i == 0)
                //        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                //    else if (ResList[i - 1].ReservationNo == ResList[i].ReservationNo)
                //    {
                //        continue;
                //    }
                //    else
                //        TotalAmount = TotalAmount + ResList[i].TotalAmount;
                //}

                DataTable dtTable = DefaultManager.ConvertToDatatable(NewResList);
                TotalAmount = Math.Round(TotalAmount, 2);
                Session["AdminCorporateReport"] = dtTable;
                Session["AdminCorporateTotalAmount"] = TotalAmount;
                return jsSerializer.Serialize(new { retCode = 1, ResList = NewResList, TotalAmount = TotalAmount });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }
        #endregion

        #region Dashboard

        [WebMethod(EnableSession = true)]
        public string LoadDashboard()
        {
            try
            {
                System.Diagnostics.Stopwatch sw = System.Diagnostics.Stopwatch.StartNew();
                DateTime dtToday = DateTime.Now.Date;
                string Today = DateTime.Now.ToString("MM-dd-yyyy");
                string Tomorrow = DateTime.Now.AddDays(1).ToString("MM-dd-yyyy");

                var ServiceToday = (from Obj in DB.tbl_CorpReservations
                                    join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                                    join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                    where Obj.ReservationDate == Today && Obj.Status != "Completed"
                                    select new ResList
                                    {
                                        Sid = Obj.Sid,
                                        ReservationNo = Obj.ReservationNo,
                                        ReservationDate = Obj.ReservationDate,
                                        Passenger = Obj.Passenger,
                                        Service = Obj.Service,
                                        Status = Obj.Status,
                                        PickupAddress = Obj.PickupAddress,
                                        DropAddress = Obj.DropAddress,
                                        Driver = Drivers.FirstName + " " + Drivers.LastName,
                                        Time = Detail.Time,
                                        TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                    }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).OrderBy(x => x.Time).ToList();

                var ServiceTomorrow = (from Obj in DB.tbl_CorpReservations
                                       join Drivers in DB.tbl_Logins on Obj.DriverId equals Drivers.Sid
                                       join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                       where Obj.ReservationDate == Tomorrow
                                       select new ResList
                                       {
                                           Sid = Obj.Sid,
                                           ReservationNo = Obj.ReservationNo,
                                           ReservationDate = Obj.ReservationDate,
                                           Passenger = Obj.Passenger,
                                           Service = Obj.Service,
                                           Status = Obj.Status,
                                           PickupAddress = Obj.PickupAddress,
                                           DropAddress = Obj.DropAddress,
                                           Driver = Drivers.FirstName + " " + Drivers.LastName,
                                           Time = Detail.Time,
                                           TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                       }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).OrderBy(x => x.Time).ToList();

                var ResToday = (from Obj in DB.tbl_CorpReservations
                                    //join Drivers in DB.Trans_Tbl_Logins on Obj.DriverId equals Drivers.Sid
                                join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                where Obj.DateTime.StartsWith(Today)
                                select new ResList
                                {
                                    Sid = Obj.Sid,
                                    ReservationNo = Obj.ReservationNo,
                                    ReservationDate = Obj.ReservationDate,
                                    Passenger = Obj.Passenger,
                                    Service = Obj.Service,
                                    Status = Obj.Status,
                                    PickupAddress = Obj.PickupAddress,
                                    DropAddress = Obj.DropAddress,
                                    Driver = GetDriver(Obj.DriverId.ToString()),
                                    Time = Detail.Time,
                                    TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).ToList();

                var UnAssigned = (from Obj in DB.tbl_CorpReservations
                                      //join Drivers in DB.Trans_Tbl_Logins on Obj.DriverId equals Drivers.Sid
                                  join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                  where Obj.ReservationDate == Tomorrow
                                  select new ResList
                                  {
                                      Sid = Obj.Sid,
                                      ReservationNo = Obj.ReservationNo,
                                      ReservationDate = Obj.ReservationDate,
                                      Passenger = Obj.Passenger,
                                      Service = Obj.Service,
                                      Status = Obj.Status,
                                      PickupAddress = Obj.PickupAddress,
                                      DropAddress = Obj.DropAddress,
                                      Driver = "",
                                      Time = Detail.Time,
                                      TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                  }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).ToList();

                var OnlineResList = (from Obj in DB.tbl_CorpReservations
                                         //join Drivers in DB.Trans_Tbl_Logins on Obj.DriverId equals Drivers.Sid
                                     join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                     where Obj.Status == "New"
                                     select new ResList
                                     {
                                         Sid = Obj.Sid,
                                         ReservationNo = Obj.ReservationNo,
                                         ReservationDate = Obj.ReservationDate,
                                         Passenger = Obj.Passenger,
                                         Service = Obj.Service,
                                         Status = Obj.Status,
                                         PickupAddress = Obj.PickupAddress,
                                         DropAddress = Obj.DropAddress,
                                         Driver = "",
                                         Time = Detail.Time,
                                         TotalAmount = 0,
                                     }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).ToList();

                var UpcomingList = (from Obj in DB.tbl_CorpReservations
                                        //join Drivers in DB.Trans_Tbl_Logins on Obj.DriverId equals Drivers.Sid
                                    join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                    where Obj.ReservationDate == Tomorrow || Obj.ReservationDate == Today
                                    select new ResList
                                    {
                                        Sid = Obj.Sid,
                                        ReservationNo = Obj.ReservationNo,
                                        ReservationDate = Obj.ReservationDate,
                                        Passenger = Obj.Passenger,
                                        Service = Obj.Service,
                                        Status = Obj.Status,
                                        PickupAddress = Obj.PickupAddress,
                                        DropAddress = Obj.DropAddress,
                                        Driver = GetDriver(Obj.DriverId.ToString()),
                                        Time = Detail.Time,
                                        TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                    }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).ToList();

                var PendingList = (from Obj in DB.tbl_CorpReservations
                                       //join Drivers in DB.Trans_Tbl_Logins on Obj.DriverId equals Drivers.Sid
                                   join Detail in DB.tbl_CorpReservationDetails on Obj.ReservationNo equals Detail.ReservationNo
                                   let rDate = new DateTime(Convert.ToInt32(Obj.ReservationDate.Substring(6, 4)), Convert.ToInt32(Obj.ReservationDate.Substring(0, 2)), Convert.ToInt32(Obj.ReservationDate.Substring(3, 2)))
                                   where rDate >= dtToday
                                   select new ResList
                                   {
                                       Sid = Obj.Sid,
                                       ReservationNo = Obj.ReservationNo,
                                       ReservationDate = Obj.ReservationDate,
                                       Passenger = Obj.Passenger,
                                       Service = Obj.Service,
                                       Status = Obj.Status,
                                       PickupAddress = Obj.PickupAddress,
                                       DropAddress = Obj.DropAddress,
                                       Driver = GetDriver(Obj.DriverId.ToString()),
                                       Time = Detail.Time,
                                       TotalAmount = CheckDecimal(Obj.TotalAmount.ToString()),
                                   }).GroupBy(x => x.ReservationNo).Select(x => x.FirstOrDefault()).ToList();
                sw.Stop();
                Int64 elapsedMs = sw.ElapsedMilliseconds / 1000;

                return jsSerializer.Serialize(new { retCode = 1, ServiceToday = ServiceToday, ServiceTomorrow = ServiceTomorrow, ResToday = ResToday, UnAssigned = UnAssigned, OnlineResList = OnlineResList, UpcomingList = UpcomingList, PendingList = PendingList, elapsedMs = elapsedMs });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }
        #endregion

        #region Delete Reservation
        [WebMethod(EnableSession = true)]
        public string SearchResNo(string ResNo)
        {
            try
            {
                var Reservation = (from Obj in DB.tbl_CorpReservations where Obj.ReservationNo == ResNo select Obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, Reservation = Reservation });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string DeleteReservation(Int64 Sid)
        {
            try
            {
                var Reservation = (from Obj in DB.tbl_CorpReservations where Obj.Sid == Sid select Obj).FirstOrDefault();
                var ReservationDetail = (from Obj in DB.tbl_CorpReservationDetails where Obj.ReservationNo == Reservation.ReservationNo select Obj).ToList();

                DB.tbl_CorpReservations.DeleteOnSubmit(Reservation);
                DB.SubmitChanges();

                DB.tbl_CorpReservationDetails.DeleteAllOnSubmit(ReservationDetail);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, Reservation = Reservation });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }
        #endregion

        [WebMethod(EnableSession = true)]
        public string GetAllDropdown()
        {
            try
            {
                var DriverList = (from Obj in DB.tbl_Logins where Obj.UserType == "Driver" && Obj.IsActive == true select Obj).ToList();

                var CompanyList = (from Obj in DB.tbl_CorpLogins select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, DriverList = DriverList, CompanyList = CompanyList });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllCompany()
        {
            try
            {
                var CompanyList = (from Obj in DB.tbl_CorpLogins select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, CompanyList = CompanyList });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllCorporateAccount()
        {
            try
            {
                var CompanyList = (from Obj in DB.tbl_CorpLogins select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, CompanyList = CompanyList });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }

        #region Method & Class

        public string ResNo(string CompanyName)
        {
            string No = "";
            Int64 Count = (from objReservation in DB.tbl_CorpReservations where objReservation.CompanyName == CompanyName select objReservation).Count();
            No = (Count + 1).ToString("D5");

            return "AS4L_" + CompanyName + "-" + No;
        }

        public decimal CheckDecimal(string Total)
        {
            if (Total == null)
                return 0;
            else
                return Convert.ToDecimal(Total);
        }

        public string GetDriver(string DriverId)
        {
            try
            {
                if (DriverId != null && DriverId != "0")
                {
                    var Drivers = (from Obj in DB.tbl_Logins where Obj.Sid == Convert.ToInt64(DriverId) select Obj).FirstOrDefault();
                    return Drivers.FirstName + " " + Drivers.LastName;
                }

                else
                    return "";
            }
            catch (Exception)
            {
                return "";
            }
        }

        public class ResList
        {
            public Int64 Sid { get; set; }
            public string ReservationNo { get; set; }
            public string ReservationDate { get; set; }
            public string Time { get; set; }
            public string Passenger { get; set; }
            public string Service { get; set; }
            public string Status { get; set; }
            public string PickupAddress { get; set; }
            public string DropAddress { get; set; }
            public string CreatedDate { get; set; }
            public string CreatedBy { get; set; }
            public string Remark { get; set; }
            public decimal TotalAmount { get; set; }
            public string Driver { get; set; }
        }
        #endregion
    }
}
