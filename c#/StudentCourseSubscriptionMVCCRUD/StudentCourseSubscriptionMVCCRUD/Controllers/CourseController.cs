using StudentCourseSubscriptionMVCCRUD.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentCourseSubscriptionMVCCRUD.Controllers
{
    public class CourseController : Controller
    {
        private readonly SCSContext db=new SCSContext();
        // GET: Course
        public ActionResult Index()
        {
            return View(db.Courses.ToList());
        }
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Course course)
        {
            if (ModelState.IsValid)
            {
                db.Courses.Add(course);
                db.SaveChanges();
                return RedirectToAction("Index", "Course");
            }
            return View(course);
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Course course = db.Courses.Find(id);
            if (course == null)
            {
                return HttpNotFound();
            }
            db.Courses.Remove(course);
            db.SaveChanges();
            TempData["SuccessMessage"] = "Course deleted successfully!";
            return RedirectToAction("Index", "Course");
        }
        public ActionResult Details(int id)
        {
            Course course = db.Courses.Find(id);
            return View(course);
        }
        public ActionResult Edit(int id)
        {
            Course course = db.Courses.Find(id);
            return View(course);
        }
        [HttpPost]
        public ActionResult Edit(Course course)
        {
            if (ModelState.IsValid)
            {
                db.Entry(course).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", "Course");
            }
            return View(course);
        }
    }
}