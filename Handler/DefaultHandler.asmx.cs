using Frederick.BL;
using Frederick.DL;
using System;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.Services.Description;

namespace Frederick.Handler
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
        private readonly DBHelperDataContext DB = new DBHelperDataContext();
        private readonly JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string Login(string Email, string Password)
        {
            try
            { 
                var loginDetails = DB.tbl_Logins.FirstOrDefault(x => x.Email == Email && x.Password == Password);
                if (loginDetails == null)
                    return jsSerializer.Serialize(new { retCode = -1 });
                return jsSerializer.Serialize(new { retCode = 1, LoginDetails = loginDetails });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string Register(tbl_Login Login)
        {
            try
            {
                var List = (from obj in DB.tbl_Logins where obj.Email == Login.Email select obj).ToList();

                if (List.Count > 0)
                    return jsSerializer.Serialize(new { retCode = -1 });
                else
                {
                    DB.tbl_Logins.InsertOnSubmit(Login);
                    DB.SubmitChanges();

                    EmailManager.RegisterMail(Login.Email);

                    return jsSerializer.Serialize(new { retCode = 1 });
                }
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string MailPassword(string Email)
        {
            try
            {
                var LoginDetails = (from obj in DB.tbl_Logins where obj.Email == Email select obj).FirstOrDefault();
                if (LoginDetails != null)
                {
                    string Name = LoginDetails.FirstName + " " + LoginDetails.LastName;
                    EmailManager.MailPassword(Name, LoginDetails.Email, LoginDetails.Password);
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

        #region CoOperative

        [WebMethod(EnableSession = true)]
        public string CorporateLogin(string Email, string Password)
        {
            try
            { 
                var loginDetails = DB.tbl_CorpLogins.FirstOrDefault(x => x.Email == Email && x.Password == Password);
                if (loginDetails == null)
                    return jsSerializer.Serialize(new { retCode = -1 });
                return jsSerializer.Serialize(new { retCode = 1, LoginDetails = loginDetails });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(EnableSession = true)]
        public string CorporateRegister(tbl_CorpLogin objArr)
        {
            try
            {
                DB.tbl_CorpLogins.InsertOnSubmit(objArr);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception)
            {
                return jsSerializer.Serialize(new { retCode = 0 });
            }
        }

        #endregion

        #region Comment
        [WebMethod(true)]
        public string LoadAllComment()
        {
            try
            {
                var List = (from comm in DB.tbl_Comments select comm).ToList();
                return jsSerializer.Serialize(new { retCode = 1, Arr = List });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Error = ex.Message });
            }
        }

        [WebMethod(true)]
        public string SaveComment(string Name, string Message, string Email, string PhoneNo, string Date)
        {
            try
            {
                // IDE0017: Object initialization can be simplified - Fixed using object initializer
                var Comment = new tbl_Comment
                {
                    Name = Name,
                    Comment = Message,
                    Email = Email,
                    PhoneNo = PhoneNo,
                    Date = Date,
                    IsActive = false
                };
                
                DB.tbl_Comments.InsertOnSubmit(Comment);
                DB.SubmitChanges();
                EmailManager.EnquiryMail(Name, Email, PhoneNo, Message);

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Msg = ex.Message });
            }
        }

        [WebMethod(true)]
        public string DeleteComment(Int64 Sid)
        {
            try
            {
                tbl_Comment Comm = DB.tbl_Comments.Single(x => x.Sid == Sid);
                DB.tbl_Comments.DeleteOnSubmit(Comm);
                DB.SubmitChanges();
                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Msg = ex.Message });
            }
        }

        #endregion

        [WebMethod(true)]
        public string EnquiryMail(string Name, string MobileNo, string Email, string Message)
        {
            try
            {
                EmailManager.EnquiryMail(Name, MobileNo, Email, Message);

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Msg = ex.Message });
            }
        }

        [WebMethod(true)]
        public string QuoteMail(string first_name, string last_name, string pick_up_date, string pick_up_time, string pick_up_location, string destination, string service_type, string vehicle_type, string hours, string passengers, string phone, string email, string message, string current_page_url, string CCEmails, string gRecaptchaToken)
        {
            try
            {

                 // ===== GOOGLE reCAPTCHA v2 VERIFICATION =====

                string secretKey = "6Lco5GwtAAAAAKNGbknNXxhpmTuRMuPTYwzo12Qr";

                using (WebClient client = new WebClient())
                {
                    var response = client.DownloadString(
                        "https://www.google.com/recaptcha/api/siteverify" +
                        "?secret=" + secretKey +
                        "&response=" + gRecaptchaToken
                    );

                    JObject result = JObject.Parse(response);

                    bool success = result.Value<bool>("success");

                    if (!success)
                    {
                        return jsSerializer.Serialize(new
                        {
                            retCode = 0,
                            Msg = "Please complete the CAPTCHA."
                        });
                    }
                }
                // Create a unique hash for the enquiry data
                string enquiryHash = string.Join("|",
                    first_name, last_name, pick_up_date, pick_up_time, pick_up_location, destination,
                    service_type, vehicle_type, hours, passengers, phone, email, message, current_page_url, CCEmails
                ).GetHashCode().ToString();

                // Use session to store last enquiry info per email
                string sessionKey = "LastQuoteMail_" + (email ?? "");
                var lastEnquiry = Context.Session[sessionKey] as Tuple<string, DateTime>;
                var now = DateTime.UtcNow;
                if (lastEnquiry != null)
                {
                    // If same hash and within 2 minutes, skip sending
                    if (lastEnquiry.Item1 == enquiryHash && (now - lastEnquiry.Item2).TotalSeconds < 120)
                    {
                        return jsSerializer.Serialize(new { retCode = 1, msg = "Duplicate ignored" });
                    }
                }

                // Store this enquiry in session
                Context.Session[sessionKey] = Tuple.Create(enquiryHash, now);

                EmailManager.QuoteMail(first_name, last_name, pick_up_date, pick_up_time, pick_up_location, destination, service_type, vehicle_type, hours, passengers, phone, email, message, current_page_url, CCEmails);

                return jsSerializer.Serialize(new { retCode = 1 });
            }
            catch (Exception ex)
            {
                return jsSerializer.Serialize(new { retCode = 0, Msg = ex.Message });
            }
        }
    }
}
