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
    /// Summary description for MasterHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MasterHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string AddUpdateDriver(tbl_Login Obj)
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
        public string InsertCoupon(tbl_Offer Obj)
        {
            try
            {
                DB.tbl_Offers.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }


        [WebMethod(EnableSession = true)]
        public string LoadAllComment()
        {
            try
            {
                var List = (from Obj in DB.tbl_Comments select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string LoadCarDetails()
        {
            try
            {
                var List = (from Obj in DB.tbl_VehTypes select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        #region Car Details
        [WebMethod(EnableSession = true)]
        public string AddVehicleType(tbl_VehType Obj)
        {
            try
            {
                DB.tbl_VehTypes.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CarTypeStatus(bool Status, Int64 TypeId)
        {
            try
            {
                var Data = (from obj in DB.tbl_VehTypes where obj.Sid == TypeId select obj).FirstOrDefault();
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
        public string GetVehicle(Int64 Sid)
        {
            try
            {
                var List = (from obj in DB.tbl_VehTypes where obj.Sid == Sid select obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateVehicleType(tbl_VehType Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_VehTypes where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.Name = Obj.Name;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        #region Vehicle Info

        [WebMethod(EnableSession = true)]
        public string LoadCarMake()
        {
            try
            {
                var List = (from Obj in DB.tbl_VehMakes select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string AddVehicleInfo(tbl_VehInfo Obj)
        {
            try
            {
                DB.tbl_VehInfos.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetVehicleInfo(Int64 Sid)
        {
            try
            {
                //var List = (from obj in DB.tbl_VehInfos where obj.Sid == Sid select obj).FirstOrDefault();
                var List = (from Obj in DB.tbl_VehInfos
                            join VehMake in DB.tbl_VehMakes on Obj.VehMakeId equals VehMake.Sid
                            join VehType in DB.tbl_VehTypes on Obj.VehTypeId equals VehType.Sid
                            where Obj.Sid == Sid
                            select Obj).FirstOrDefault();

                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateVehicleInfo(tbl_VehInfo Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_VehInfos where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.VehMakeId = Obj.VehMakeId;
                List.VehTypeId = Obj.VehTypeId;
                List.Model = Obj.Model;
                List.RegistrationYear = Obj.RegistrationYear;
                List.MaxCapacity = Obj.MaxCapacity;
                List.MaxBaggage = Obj.MaxBaggage;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string LoadVehicleInfo()
        {
            try
            {
                var List = (from Obj in DB.tbl_VehInfos
                            join VehMake in DB.tbl_VehMakes on Obj.VehMakeId equals VehMake.Sid
                            join VehType in DB.tbl_VehTypes on Obj.VehTypeId equals VehType.Sid
                            select new
                            {
                                Obj.Sid,
                                Obj.RegistrationYear,
                                Obj.MaxCapacity,
                                Obj.Model,
                                Obj.MaxBaggage,
                                VehMakeName = VehMake.Name,
                                VehTypeName = VehType.Name,
                                IsActive = Obj.IsActive,
                            }).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        [WebMethod(EnableSession = true)]
        public string CarInfoStatus(bool Status, Int64 MakeId)
        {
            try
            {
                var Data = (from obj in DB.tbl_VehInfos where obj.Sid == MakeId select obj).FirstOrDefault();
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

        #region Vehicle Manufacture
        [WebMethod(EnableSession = true)]
        public string AddVehicleMake(tbl_VehMake Obj)
        {
            try
            {
                DB.tbl_VehMakes.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetMake(Int64 Sid)
        {
            try
            {
                var List = (from obj in DB.tbl_VehMakes where obj.Sid == Sid select obj).FirstOrDefault();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateVehicleMake(tbl_VehMake Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_VehMakes where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.Name = Obj.Name;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        [WebMethod(EnableSession = true)]
        public string CarMakeStatus(bool Status, Int64 MakeId)
        {
            try
            {
                var Data = (from obj in DB.tbl_VehMakes where obj.Sid == MakeId select obj).FirstOrDefault();
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

        #region Hourly Rate

        [WebMethod(EnableSession = true)]
        public string LoadHourlyRate()
        {
            try
            {
                var List = (from Obj in DB.tbl_VehInfos
                            join VehType in DB.tbl_VehTypes on Obj.VehTypeId equals VehType.Sid
                            select new
                            {
                                Obj.Sid,
                                Obj.MinHours,
                                Obj.PerHour,
                                VehTypeName = VehType.Name,
                            }).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetLoadHourlyRate(Int64 Sid)
        {
            try
            {
                //var List = (from obj in DB.tbl_VehInfos where obj.Sid == Sid select obj).FirstOrDefault();
                var List = (from Obj in DB.tbl_VehInfos
                            join VehType in DB.tbl_VehTypes on Obj.VehTypeId equals VehType.Sid
                            where Obj.Sid == Sid
                            select Obj).FirstOrDefault();

                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateLoadHourlyRate(tbl_VehInfo Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_VehInfos where obj.Sid == Obj.Sid select obj).FirstOrDefault();

                List.MinHours = Obj.MinHours;
                List.PerHour = Obj.PerHour;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        #region Distance Rate
        [WebMethod(EnableSession = true)]
        public string LoadDistanceRate()
        {
            try
            {
                var List = (from Obj in DB.tbl_VehInfos
                            join VehType in DB.tbl_VehTypes on Obj.VehTypeId equals VehType.Sid
                            select new
                            {
                                Obj.Sid,
                                Obj.BaseCharge,
                                Obj.PerMile,
                                VehTypeName = VehType.Name,
                            }).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }


        [WebMethod(EnableSession = true)]
        public string GetLoadDistanceRate(Int64 Sid)
        {
            try
            {
                //var List = (from obj in DB.tbl_VehInfos where obj.Sid == Sid select obj).FirstOrDefault();
                var List = (from Obj in DB.tbl_VehInfos
                            join VehType in DB.tbl_VehTypes on Obj.VehTypeId equals VehType.Sid
                            where Obj.Sid == Sid
                            select Obj).FirstOrDefault();

                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateLoadDistanceRate(tbl_VehInfo Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_VehInfos where obj.Sid == Obj.Sid select obj).FirstOrDefault();

                List.BaseCharge = Obj.BaseCharge;
                List.PerMile = Obj.PerMile;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        #region Profile
        [WebMethod(EnableSession = true)]
        public string GetProfileDetails(Int64 Sid)
        {
            try
            {
                var ProfileDetails = (from obj in DB.tbl_Logins where obj.Sid == Sid select obj).FirstOrDefault();

                return jsSerializer.Serialize(new { retCode = 1, ProfileDetails = ProfileDetails });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateProfile(Int64 Sid, String Password, String FirstName, String LastName, String Address, String ContactNumber, String Gender)
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.Sid == Sid select obj).FirstOrDefault();
                List.Password = Password;
                List.FirstName = FirstName;
                List.LastName = LastName;
                List.Address = Address;
                List.MobileNo = ContactNumber;
                List.Gender = Gender;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion
    }
}
