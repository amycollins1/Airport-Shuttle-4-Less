using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Admin.Handler
{
    /// <summary>
    /// Summary description for AdminHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AdminHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string GetAllDriverCustomer()
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where (obj.UserType == "Customer" || obj.UserType == "Driver") && obj.IsActive == true select obj).OrderBy(x => x.FirstName).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        #region Customer
        [WebMethod(EnableSession = true)]
        public string GetAllCustomer()
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.UserType == "Customer" select obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CustomerStatus(bool Status, Int64 CustomerId)
        {
            try
            {
                var Data = (from obj in DB.tbl_Logins where obj.Sid == CustomerId select obj).FirstOrDefault();
                Data.IsActive = (!Status);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateCustomer(tbl_Login Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.FirstName = Obj.FirstName;
                List.LastName = Obj.LastName;
                List.Gender = Obj.Gender;
                List.MobileNo = Obj.MobileNo;
                List.Address = Obj.Address;
                List.Email = Obj.Email;
                List.Password = Obj.Password;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetCustomer(Int64 Sid)
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.Sid == Sid select obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        #region Driver
        [WebMethod(EnableSession = true)]
        public string GetAllDriver()
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.UserType == "Driver" select obj).OrderBy(x => x.FirstName).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetDriver(Int64 Sid)
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.Sid == Sid select obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateDriver(tbl_Login Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.FirstName = Obj.FirstName;
                List.LastName = Obj.LastName;
                List.Gender = Obj.Gender;
                List.MobileNo = Obj.MobileNo;
                List.Address = Obj.Address;
                List.Percentage = Obj.Percentage;
                List.Email = Obj.Email;
                List.Password = Obj.Password;

                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }


        [WebMethod(EnableSession = true)]
        public string DriverStatus(bool Status, Int64 DriverId)
        {
            try
            {
                var Data = (from obj in DB.tbl_Logins where obj.Sid == DriverId select obj).FirstOrDefault();
                Data.IsActive = (!Status);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        #region Comments
        [WebMethod(EnableSession = true)]
        public string CommentStatus(bool Status, Int64 CommentId)
        {
            try
            {
                var Data = (from obj in DB.tbl_Comments where obj.Sid == CommentId select obj).FirstOrDefault();
                Data.IsActive = (!Status);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CommentDelete(Int64 CommentId)
        {
            try
            {
                var Data = (from obj in DB.tbl_Comments where (obj.Sid == CommentId) select obj).FirstOrDefault();
                DB.tbl_Comments.DeleteOnSubmit(Data);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        #endregion



        [WebMethod(EnableSession = true)]
        public string GetAllVehicle()
        {
            try
            {
                var List = (from obj in DB.tbl_VehInfos where obj.Model != "Two Stop Shuttle" && obj.IsActive == true && obj.VehMakeId != null && obj.VehTypeId != null select obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string LoadFredrickCars(string Service, string Tab, Int64 AirpotID, Int64 LocationID, int Passengers)
        {

            try
            {

                if (Tab == "5")
                {
                    #region Fredrick Rates
                    Int64 AirportID = AirpotID;
                    Int64 FredrickID = LocationID;
                    //if (Service == "To Airport")
                    //{
                    //    FredrickID = LocationID;
                    //    AirportID = AirpotID;
                    //}
                    //else
                    //{
                    //    FredrickID = AirpotID;
                    //    AirportID = LocationID;
                    //}

                    var List = (from ObjVehInfo in DB.tbl_VehInfos
                                join rates in DB.tbl_RateFredricks on ObjVehInfo.Sid equals rates.VehicleId
                                join Fredrick in DB.tbl_Fredricks on rates.FredrickId equals Fredrick.Sid
                                join Airport in DB.tbl_AirportFredricks on rates.AirportId equals Airport.Sid
                                where ObjVehInfo.MaxCapacity >= Passengers && ObjVehInfo.Model != "Two Stop Shuttle" && ObjVehInfo.IsActive == true 
                                && ObjVehInfo.VehMakeId != null && ObjVehInfo.VehTypeId != null && rates.FredrickId == FredrickID && rates.AirportId == AirportID
                                select new
                                {
                                    RateID = rates.Sid,
                                    VehicleID = ObjVehInfo.Sid,
                                    VehicleModel = ObjVehInfo.Model,
                                    MaxCapacity = ObjVehInfo.MaxCapacity,
                                    MaxBaggage = ObjVehInfo.MaxBaggage,
                                    MinCapacity = ObjVehInfo.MinCapacity,
                                    MinBaggage = ObjVehInfo.MinBaggage,
                                    FredrickName = Fredrick.Name,
                                    AirportName = Airport.Name,
                                    BaseRate = rates.Rate,
                                    FredrickId = rates.FredrickId,
                                    AirportId = rates.AirportId
                                }).ToList();


                    var ListADCH = (from Obj in DB.tbl_AD_CH_BaggageFredericks select Obj).ToList();

                    if (List.Count > 0)
                    {
                        return jsSerializer.Serialize(new { retCode = 1, VehInfo = List, ListADCH = ListADCH });
                    }
                    else
                    {
                        return jsSerializer.Serialize(new { retCode = 2 });
                    }
                    #endregion
                }
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
            return jsSerializer.Serialize(new { retCode = 0 });
        }

        #region Offer
        [WebMethod(EnableSession = true)]
        public string GetAllOffer()
        {
            try
            {
                var List = (from obj in DB.tbl_Offers select obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }

        }

        [WebMethod(EnableSession = true)]
        public string GetOffer(Int64 Sid)
        {
            try
            {
                var List = (from obj in DB.tbl_Offers where obj.Sid == Sid select obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string OfferStatus(bool Status, Int64 OfferId)
        {
            try
            {
                var Data = (from obj in DB.tbl_Offers where obj.Sid == OfferId select obj).FirstOrDefault();
                Data.IsActive = (!Status);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateOffer(tbl_Offer Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_Offers where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.Name = Obj.Name;
                List.Code = Obj.Code;
                List.Percents = Obj.Percents;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        [WebMethod(EnableSession = true)]
        public string GetReservation(Int64 Sid)
        {
            try
            {
                var ReservationDetail = (from obj in DB.tbl_Reservations where obj.Sid == Sid select obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, ReservationDetail = ReservationDetail });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string AddCustomer(tbl_Login Obj)
        {
            try
            {
                DB.tbl_Logins.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllSnow()
        {
            try
            {
                var List = (from obj in DB.tbl_SnowCharges select obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        [WebMethod(EnableSession = true)]
        public string UpdateSnowCharges(Int64 Sid)
        {
            try
            {
                var Data = (from obj in DB.tbl_SnowCharges where obj.Sid == Sid select obj).FirstOrDefault();
                Data.IsActive = true;
                var Obj = (from obj in DB.tbl_SnowCharges where obj.IsActive == true select obj).FirstOrDefault();
                Obj.IsActive = false;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetHaltSettings()
        {
            try
            {
                var List = (from obj in DB.tbl_HourlySettings select obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

    }
}
