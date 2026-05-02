using Frederick.DL;
using System;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Frederick.Customer.Handler
{
    /// <summary>
    /// Summary description for DefaultHandler
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DefaultHandler : System.Web.Services.WebService
    {
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string GetReservations(string Email)
        {
            try
            {
                var List = (from Obj in DB.tbl_Reservations where Obj.Email == Email select Obj).ToList();
                return jsSerializer.Serialize(new { retCode = 1, List = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Message = ex.Message });
            }
        }
    }
}
