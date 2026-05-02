using Frederick.BL;
using Frederick.DL;
using System;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;

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
        DBHelperDataContext DB = new DBHelperDataContext();
        JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public string Login(string Email, string Password)
        {
            try
            {
                var LoginDetails = (from Obj in DB.tbl_Logins where Obj.Email == Email && Obj.Password == Password select Obj).FirstOrDefault();
                if (LoginDetails == null)
                    return jsSerializer.Serialize(new { retCode = -1 });
                return jsSerializer.Serialize(new { retCode = 1, LoginDetails = LoginDetails });
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
                var List = (from Obj in DB.tbl_Logins where Obj.Email == Login.Email select Obj).ToList();

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
                var LoginDetails = (from Obj in DB.tbl_Logins where Obj.Email == Email select Obj).FirstOrDefault();
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
                var LoginDetails = (from Obj in DB.tbl_CorpLogins where Obj.Email == Email && Obj.Password == Password select Obj).FirstOrDefault();
                if (LoginDetails == null)
                    return jsSerializer.Serialize(new { retCode = -1 });
                return jsSerializer.Serialize(new { retCode = 1, LoginDetails = LoginDetails });
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
                var List = (from Comm in DB.tbl_Comments select Comm).ToList();
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
                tbl_Comment Comment = new tbl_Comment();
                Comment.Name = Name;
                Comment.Comment = Message;
                Comment.Email = Email;
                Comment.PhoneNo = PhoneNo;
                Comment.Date = Date;
                Comment.IsActive = false;
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
    }
}
