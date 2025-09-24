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
    /// Summary description for HourlySettingHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class HourlySettingHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();


        [WebMethod(EnableSession = true)]
        public string GetHourlySetting()
        {
            try
            {
                var List = (from obj in DB.tbl_HourlySettings select obj).OrderBy(x => x.Sid).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string AddUpdateHourlySetting(tbl_HourlySetting Obj)
        {
            try
            {
                DB.tbl_HourlySettings.InsertOnSubmit(Obj);
                DB.SubmitChanges();

                return jsSerializer.Serialize(new { retCode = 1, Session = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

    }
}
