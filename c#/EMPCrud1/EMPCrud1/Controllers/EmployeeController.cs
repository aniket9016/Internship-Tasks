using EMPCrud1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EMPCrud1.Controllers
{
    public class EmployeeController : Controller
    {
        readonly EmployeeDBDataContext EMPDB=new EmployeeDBDataContext("Data Source=tgs131;Initial Catalog=LINQ;Integrated Security=True;Encrypt=False");
        // GET: Employee
        public ActionResult Index()
        {
            var Emplist=new List<Employee>();
            var query=from emp in EMPDB.Employees select emp;
            var listdata=query.ToList();
            foreach (var item in listdata)
            {
                Emplist.Add(new Employee()
                {
                    Eno = item.Eno,
                    Ename = item.Ename,
                    Job = item.Job,
                    Salary = item.Salary,
                    Dname = item.Dname
                });
            }
            return View(Emplist);
        }
        public ActionResult Create()
        {
            Employee emps=new Employee();
            return View(emps);
        }

    }
}