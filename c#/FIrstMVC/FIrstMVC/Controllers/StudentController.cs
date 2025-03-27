using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FIrstMVC.Models; 

namespace FIrstMVC.Controllers
{
    public class StudentController : Controller
    {
        public List<Student> studentList = new List<Student>
        {
            new Student { StudentId = 1, StudentName = "John", Age = 18 },
            new Student { StudentId = 2, StudentName = "Steve", Age = 21 },
            new Student { StudentId = 3, StudentName = "Bill", Age = 25 },
            new Student { StudentId = 4, StudentName = "Ram", Age = 20 },
            new Student { StudentId = 5, StudentName = "Ron", Age = 31 },
            new Student { StudentId = 6, StudentName = "Chris", Age = 17 },
            new Student { StudentId = 7, StudentName = "Rob", Age = 19 }
        };

        public ActionResult Index()
        {
            return View(studentList);
        }
    }
}
