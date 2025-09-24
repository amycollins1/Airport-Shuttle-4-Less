using Frederick.DL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Frederick.Admin
{
    /// <summary>
    /// Summary description for ImageUploader
    /// </summary>
    public class ImageUploader : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            DBHelperDataContext DB = new DBHelperDataContext();
            context.Response.ContentType = "text/plain";
            try
            {
                string Type = System.Convert.ToString(context.Request.QueryString["Type"]);
                if (Type == "DriverProfile" || Type == "DriverLicense" || Type == "DriverDocs")
                {
                    string dirFullPath = HttpContext.Current.Server.MapPath("~/DriverDocument/"); 
                    string Id = System.Convert.ToString(context.Request.QueryString["id"]);

                    string[] files;
                    int numFiles;
                    files = System.IO.Directory.GetFiles(dirFullPath);
                    numFiles = files.Length;
                    numFiles = numFiles + 1;
                    Guid DocumentName = Guid.NewGuid();
                    string str_image = "";
                    string path = context.Request.Form[0];
                    foreach (string s in context.Request.Files)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        string fileName = file.FileName;
                        string fileExtension = file.ContentType;

                        if (!string.IsNullOrEmpty(fileName))
                        {
                            fileExtension = Path.GetExtension(fileName);
                            string name = "";
                            if (Type == "DriverProfile")
                                name = "DriverProfile_" + Id.ToString();
                            if (Type == "DriverLicense")
                                name = "DriverLicense_" + Id.ToString();
                            if (Type == "DriverDocs")
                                name = "DriverDocs_" + Id.ToString();

                            str_image = name + fileExtension;
                            string pathToSave_100 = HttpContext.Current.Server.MapPath("~/DriverDocument/") + str_image;
                            if (path == " ")
                            {
                                //file.SaveAs(pathToSave_100);
                                Id = (from r in DB.tbl_Logins orderby r.Sid select r.Sid).Max().ToString();
                                if (Convert.ToInt64(Id) > 0)
                                {
                                    tbl_Login DriverDetails = DB.tbl_Logins.Single(x => x.Sid == Convert.ToInt64(Id));
                                    if (Type == "DriverProfile")
                                        DriverDetails.Profile = str_image;
                                    if (Type == "DriverLicense")
                                        DriverDetails.License = str_image;
                                    if (Type == "DriverDocs")
                                        DriverDetails.Docs = str_image;

                                    DB.SubmitChanges();
                                    FileInfo f = new FileInfo(pathToSave_100);
                                    file.SaveAs(pathToSave_100);
                                }
                            }
                            else
                            {

                                tbl_Login DriverDetails = DB.tbl_Logins.Single(x => x.Sid == Convert.ToInt64(Id));
                                if (Type == "DriverProfile")
                                    DriverDetails.Profile = str_image;
                                if (Type == "DriverLicense")
                                    DriverDetails.License = str_image;
                                if (Type == "DriverDocs")
                                    DriverDetails.Docs = str_image;

                                DB.SubmitChanges();
                                FileInfo f = new FileInfo(pathToSave_100);
                                file.SaveAs(pathToSave_100); 
                            }
                        }
                    }
                    context.Response.Write(str_image);
                }
                if (Type == "VehicleImage")
                {
                    string dirFullPath = HttpContext.Current.Server.MapPath("~/images/VehicleImages/");
                    string Id = System.Convert.ToString(context.Request.QueryString["id"]);

                    string[] files;
                    int numFiles;
                    files = System.IO.Directory.GetFiles(dirFullPath);
                    numFiles = files.Length;
                    numFiles = numFiles + 1;
                    Guid DocumentName = Guid.NewGuid();
                    string str_image = "";
                    string path = context.Request.Form[0];
                    foreach (string s in context.Request.Files)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        string fileName = file.FileName;
                        string fileExtension = file.ContentType;

                        if (!string.IsNullOrEmpty(fileName))
                        {
                            fileExtension = Path.GetExtension(fileName);
                            string name = Id.ToString(); 

                            str_image = name + fileExtension;
                            string pathToSave_100 = HttpContext.Current.Server.MapPath("~/images/VehicleImages/") + str_image;

                            tbl_VehInfo VehicleDetails = DB.tbl_VehInfos.Single(x => x.Sid == Convert.ToInt64(Id));
                            VehicleDetails.Image = str_image;
                            DB.SubmitChanges();

                            FileInfo f = new FileInfo(pathToSave_100);
                            file.SaveAs(pathToSave_100);
                        }
                    }
                    context.Response.Write(str_image);
                }

            }
            catch (Exception ac)
            {

            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}