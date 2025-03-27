using StudentCourseSubscriptionMVCCRUD.Models;
using System;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;

namespace StudentCourseSubscriptionMVCCRUD.Controllers
{
    public class SubscriptionController : Controller
    {
        private readonly SCSContext db=new SCSContext();
        // GET: Subscription
        public ActionResult Index()
        {
            var subscription = db.Subscriptions
                    .Include(stu=>stu.Student)
                    .Include(cou=>cou.Course)
                    .ToList();
            return View(subscription);
        }
        public ActionResult Create()
        {
            ViewBag.StudentID = new SelectList(db.Students, "StudentID", "StudentName");
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Subscription sub)
        {
            if (ModelState.IsValid)
            {
                db.Subscriptions.Add(sub);
                db.SaveChanges();
                TempData["SuccessMessage1"] = "Subscription created successfully!";
                return RedirectToAction("Index", "Subscription");
            }
            ViewBag.StudentID = new SelectList(db.Students, "StudentID", "StudentName",sub.StudentID);
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName",sub.CourseID);
            return View(sub);
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Subscription sub= db.Subscriptions.Find(id);
            if (sub == null)
            {
                return HttpNotFound();
            }
            db.Subscriptions.Remove(sub);
            db.SaveChanges();
            TempData["SuccessMessage"] = "Subscription deleted successfully!";
            return RedirectToAction("Index");
        }
        public ActionResult Details(int id)
        {
            Subscription sub= db.Subscriptions.Find(id);
            if (sub== null)
            {
                return HttpNotFound();
            }
            return View(sub);
        }
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Subscription sub = db.Subscriptions.Find(id);
            if (sub == null)
            {
                return HttpNotFound();
            }
            ViewBag.StudentID = new SelectList(db.Students, "StudentID", "StudentName", sub.StudentID);
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", sub.CourseID);
            return View(sub);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SubscriptionID,StudentID,CourseID,Status")] Subscription sub, bool IsActive)
        {
            if (ModelState.IsValid)
            {
                // Set the Status based on the IsActive checkbox value
                sub.Status = IsActive ? "Active" : "Inactive";

                db.Entry(sub).State = EntityState.Modified;
                db.SaveChanges();

                TempData["SuccessMessage3"] = "Subscription updated successfully!";
                return RedirectToAction("Index");
            }

            ViewBag.StudentID = new SelectList(db.Students, "StudentID", "StudentName", sub.StudentID);
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", sub.CourseID);

            return View(sub);
        }

    }
}