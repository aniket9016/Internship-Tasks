using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using StudentCourseSubscriptionMVCCRUD.Models;
using System.Web.Mvc;

namespace StudentCourseSubscriptionMVCCRUD.Controllers
{
    public class StudentController : Controller
    {
        private readonly SCSContext db=new SCSContext();
        // GET: Student
        public ActionResult Index()
        {
            return View(db.Students.ToList());
        }
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Student student)
        {
            if (ModelState.IsValid)
            {
                db.Students.Add(student);
                db.SaveChanges();
                return RedirectToAction("Index", "Student");
            }
            return View(student);
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            Course course= db.Courses.Find(id);
            if (course== null)
            {
                return HttpNotFound();
            }
            db.Courses.Remove(course);
            db.SaveChanges();
            TempData["SuccessMessage"] = "Course deleted successfully!";
            return RedirectToAction("Index", "Student");
        }
        public ActionResult Details(int id)
        {
            Student student = db.Students.Find(id);
            return View(student);
        }
        public ActionResult Edit(int id)
        {
            Student student = db.Students.Find(id);
            return View(student);
        }
        [HttpPost]
        public ActionResult Edit(Student student)
        {
            if (ModelState.IsValid)
            {
                db.Entry(student).State=EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index", "Student");
            }
            return View(student);
        }
    }
}