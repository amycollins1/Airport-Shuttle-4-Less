using Frederick.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Handler
{
    /// <summary>
    /// Summary description for SearchHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SearchHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string LoadVehicles(Int64 Tab, Int64 Capacity)
        {
            try
            {
                List<tbl_VehInfo> VehInfo = new List<tbl_VehInfo>();
                if (Tab == 1 || Tab == 2)
                    VehInfo = (from ObjVehInfo in DB.tbl_VehInfos
                               where ObjVehInfo.MaxCapacity >= Capacity && ObjVehInfo.Model != "Two Stop Shuttle" && ObjVehInfo.IsActive == true
                               orderby ObjVehInfo.BaseCharge ascending
                               select ObjVehInfo).ToList();
                else if (Tab == 3)
                    VehInfo = (from ObjVehInfo in DB.tbl_VehInfos
                               where ObjVehInfo.MaxCapacity >= Capacity && ObjVehInfo.PerHour != null && ObjVehInfo.IsActive == true
                               orderby ObjVehInfo.BaseCharge ascending
                               select ObjVehInfo).ToList();
                return jsSerializer.Serialize(new { retCode = 1, VehInfo = VehInfo });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string LoadFredrickCars(string Service, string Tab, Int64 From, Int64 To, int Passengers)
        {           

            try
            {

                if (Tab == "5")
                {
                    #region Fredrick Rates
                    Int64 AirportID = 0;
                    Int64 FredrickID = 0;
                    if (Service == "To Airport")
                    {
                        FredrickID = From;
                        AirportID = To;
                    }
                    else
                    {
                        FredrickID = To;
                        AirportID = From;
                    }

                    var List = (from ObjVehInfo in DB.tbl_VehInfos
                               join rates in DB.tbl_RateFredricks on ObjVehInfo.Sid equals rates.VehicleId
                                join Fredrick in DB.tbl_Fredricks on rates.FredrickId equals Fredrick.Sid
                                join Airport in DB.tbl_AirportFredricks on rates.AirportId equals Airport.Sid
                                where ObjVehInfo.MaxCapacity >= Passengers && ObjVehInfo.Model != "Two Stop Shuttle" && ObjVehInfo.IsActive == true
                                select new
                                {
                                    RateID = rates.Sid,
                                    VehicleID = ObjVehInfo.Sid,
                                    VehicleModel = ObjVehInfo.Model,
                                    MaxCapacity= ObjVehInfo.MaxCapacity, 
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
            return jsSerializer.Serialize(new { retCode = 0  });
        }
    }
}
