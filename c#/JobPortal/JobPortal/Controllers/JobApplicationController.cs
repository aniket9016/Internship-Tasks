using System;
using System.Linq;
using System.Web.Mvc;
using JobPortal.Models;
using Microsoft.AspNet.Identity;

namespace JobPortal.Controllers
{
    [Authorize]
    public class JobApplicationController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // APPLY FOR A JOB
        public ActionResult Apply(int jobId)
        {
            var userId = User.Identity.GetUserId();
            var job = db.Jobs.Find(jobId);

            if (job == null)
            {
                return HttpNotFound();
            }

            var application = new JobApplication
            {
                JobId = jobId,
                ApplicantId = userId,
                AppliedOn = DateTime.Now,
                Status = "Applied"
            };

            db.JobApplications.Add(application);
            db.SaveChanges();

            return RedirectToAction("MyApplications");
        }

        // VIEW MY APPLICATIONS
        public ActionResult MyApplications()
        {
            var userId = User.Identity.GetUserId();
            var applications = db.JobApplications.Where(a => a.ApplicantId == userId).ToList();
            return View(applications);
        }

        // ADMIN: VIEW ALL APPLICATIONS
        [Authorize(Roles = "Admin")]
        public ActionResult AllApplications()
        {
            return View(db.JobApplications.ToList());
        }

        // ADMIN: UPDATE APPLICATION STATUS
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateStatus(int id)
        {
            var application = db.JobApplications.Find(id);
            if (application == null)
            {
                return HttpNotFound();
            }
            return View(application);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateStatus(JobApplication application)
        {
            if (ModelState.IsValid)
            {
                db.Entry(application).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("AllApplications");
            }
            return View(application);
        }
    }
}
