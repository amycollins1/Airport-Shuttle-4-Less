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
    /// Summary description for FredrickHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class FrederickHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        #region Frederick
        [WebMethod(EnableSession = true)]
        public string AddFrederick(tbl_Fredrick Obj)
        {
            try
            {
                DB.tbl_Fredricks.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllFrederick()
        {
            try
            {
                var List = (from Obj in DB.tbl_Fredricks select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string ActivateFrederick(Int64 Sid)
        {
            try
            {
                var Data = (from obj in DB.tbl_Fredricks where obj.Sid == Sid select obj).FirstOrDefault();
                Data.IsActive = (!Data.IsActive);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetFrederick(Int64 Sid)
        {
            try
            {
                var List = (from Obj in DB.tbl_Fredricks where Obj.Sid == Sid select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateFrederick(tbl_Fredrick Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_Fredricks where obj.Sid == Obj.Sid select obj).FirstOrDefault();
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

        #region Airport
        [WebMethod(EnableSession = true)]
        public string AddAirport(tbl_AirportFredrick Obj)
        {
            try
            {
                DB.tbl_AirportFredricks.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllAirport()
        {
            try
            {
                var List = (from Obj in DB.tbl_AirportFredricks select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string ActivateAirport(Int64 Sid)
        {
            try
            {
                var Data = (from obj in DB.tbl_AirportFredricks where obj.Sid == Sid select obj).FirstOrDefault();
                Data.IsActive = (!Data.IsActive);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAirport(Int64 Sid)
        {
            try
            {
                var List = (from Obj in DB.tbl_AirportFredricks where Obj.Sid == Sid select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateAirport(tbl_Fredrick Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_AirportFredricks where obj.Sid == Obj.Sid select obj).FirstOrDefault();
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

        #region Rate
        [WebMethod(EnableSession = true)]
        public string AddRate(tbl_RateFredrick Obj)
        {
            try
            {
                var Rate = (from obj in DB.tbl_RateFredricks where obj.FredrickId == Obj.FredrickId && obj.AirportId == Obj.AirportId && obj.VehicleId == Obj.VehicleId select Obj).ToList();

                if (Rate.Count == 0)
                {
                    DB.tbl_RateFredricks.InsertOnSubmit(Obj);
                    DB.SubmitChanges();

                    return jsSerializer.Serialize(new { retCode = 1 });
                }
                else
                    return jsSerializer.Serialize(new { retCode = -1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllRate()
        {
            try
            {
                var List = (from Obj in DB.tbl_RateFredricks
                            join Fredrick in DB.tbl_Fredricks on Obj.FredrickId equals Fredrick.Sid
                            join Airport in DB.tbl_AirportFredricks on Obj.AirportId equals Airport.Sid
                            join Vehicle in DB.tbl_VehInfos on Obj.VehicleId equals Vehicle.Sid
                            select new
                            {
                                Obj.Sid,
                                FredrickName = Fredrick.Name,
                                AirportName = Airport.Name,
                                VehicleId = Vehicle.Sid,
                                Vehicle.Model,
                                Obj.Rate,
                                Obj.VehicleRate,
                                Obj.IsActive
                            }).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string ActivateRate(Int64 Sid)
        {
            try
            {
                var Data = (from obj in DB.tbl_RateFredricks where obj.Sid == Sid select obj).FirstOrDefault();
                Data.IsActive = (!Data.IsActive);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetRate(Int64 Sid)
        {
            try
            {
                var List = (from Obj in DB.tbl_RateFredricks
                            join Fredrick in DB.tbl_Fredricks on Obj.FredrickId equals Fredrick.Sid
                            join Airport in DB.tbl_AirportFredricks on Obj.AirportId equals Airport.Sid
                            where Obj.Sid == Sid
                            select new
                            {
                                Obj.Sid,
                                FredrickName = Fredrick.Name,
                                AirportName = Airport.Name,
                                Obj.Rate,
                                Obj.VehicleId,
                                Obj.VehicleRate
                            }).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateRate(tbl_RateFredrick Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_RateFredricks where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.FredrickId = Obj.FredrickId;
                List.AirportId = Obj.AirportId;
                List.Rate = Obj.Rate;
                List.VehicleId = Obj.VehicleId;
                List.VehicleRate = Obj.VehicleRate;
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllActivatedFrederick()
        {
            try
            {
                var List = (from Obj in DB.tbl_Fredricks where Obj.IsActive == true select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllActivatedAirport()
        {
            try
            {
                var List = (from Obj in DB.tbl_AirportFredricks where Obj.IsActive == true select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllVehicles()
        {
            try
            {
                var List = (from Obj in DB.tbl_VehInfos where Obj.IsActive == true select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }
        #endregion

        #region Frederick AD CH Baggage Rate
        [WebMethod(EnableSession = true)]
        public string AddAD_CH_Baggage_Rate(tbl_AD_CH_BaggageFrederick Obj)
        {
            try
            {
                DB.tbl_AD_CH_BaggageFredericks.InsertOnSubmit(Obj);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAllAD_CH_Baggage_Rate()
        {
            try
            {
                var List = (from Obj in DB.tbl_AD_CH_BaggageFredericks select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string GetAD_CH_Baggage_Rate(Int64 Sid)
        {
            try
            {
                var List = (from Obj in DB.tbl_AD_CH_BaggageFredericks where Obj.Sid == Sid select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string UpdateAD_CH_Baggage_Rate(tbl_AD_CH_BaggageFrederick Obj)
        {
            try
            {
                var List = (from obj in DB.tbl_AD_CH_BaggageFredericks where obj.Sid == Obj.Sid select obj).FirstOrDefault();
                List.AdultRate = Obj.AdultRate;
                List.ChildRate = Obj.ChildRate;
                List.BaggageRate = Obj.BaggageRate;
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
