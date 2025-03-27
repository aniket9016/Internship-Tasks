using System.Linq;
using System.Web.Mvc;
using JobPortal.Models;
using Microsoft.AspNet.Identity;

namespace JobPortal.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // DASHBOARD VIEW
        public ActionResult Dashboard()
        {
            var totalUsers = db.Users.Count();
            var totalJobs = db.Jobs.Count();
            var totalApplications = db.JobApplications.Count();

            ViewBag.TotalUsers = totalUsers;
            ViewBag.TotalJobs = totalJobs;
            ViewBag.TotalApplications = totalApplications;

            return View();
        }

        // MANAGE USERS
        public ActionResult ManageUsers()
        {
            return View(db.Users.ToList());
        }

        // MANAGE JOB APPLICATIONS
        public ActionResult ManageApplications()
        {
            return View(db.JobApplications.ToList());
        }
    }
}
