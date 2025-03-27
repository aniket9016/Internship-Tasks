using System;
using System.Linq;
using System.Web.Mvc;
using JobPortal.Models;
using Microsoft.AspNet.Identity;

namespace JobPortal.Controllers
{
    public class JobController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // LIST ALL JOBS
        public ActionResult Index()
        {
            return View(db.Jobs.ToList());
        }

        // JOB DETAILS
        public ActionResult Details(int id)
        {
            var job = db.Jobs.Find(id);
            if (job == null)
            {
                return HttpNotFound();
            }
            return View(job);
        }

        // ADD JOB (Admin Only)
        [Authorize(Roles = "Admin")]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult Create(Job job)
        {
            if (ModelState.IsValid)
            {
                job.PostedOn = DateTime.Now;
                job.PostedById = User.Identity.GetUserId();
                db.Jobs.Add(job);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(job);
        }

        // EDIT JOB (Admin Only)
        [Authorize(Roles = "Admin")]
        public ActionResult Edit(int id)
        {
            var job = db.Jobs.Find(id);
            if (job == null)
            {
                return HttpNotFound();
            }
            return View(job);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public ActionResult Edit(Job job)
        {
            if (ModelState.IsValid)
            {
                db.Entry(job).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(job);
        }

        // DELETE JOB (Admin Only)
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int id)
        {
            var job = db.Jobs.Find(id);
            if (job == null)
            {
                return HttpNotFound();
            }
            return View(job);
        }

        [HttpPost, ActionName("Delete")]
        [Authorize(Roles = "Admin")]
        public ActionResult ConfirmDelete(int id)
        {
            var job = db.Jobs.Find(id);
            if (job != null)
            {
                db.Jobs.Remove(job);
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
