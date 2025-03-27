using crudoperation_linq.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace crudoperation_linq.Controllers
{
    public class empController : Controller
    {
        // GET: emp
        DataClasses1DataContext db = new DataClasses1DataContext("Data Source=TGS131;Initial Catalog=employees;Integrated Security=True;Encrypt=False");
        public ActionResult Index()
        {
            IList<employe> employelist = new List<employe>();
            var query = from qrs in db.Employees select qrs;
            var listdata = query.ToList();

            foreach (var employedata in listdata)
            {
                employelist.Add(new employe()
                {
                    id = employedata.id,
                    employename = employedata.EmpName,
                    employeaddress = employedata.EmpAddress,
                    employeemailid = employedata.EmpEmailId,
                });
            }
            return View(employelist);
        }

        public ActionResult Create()
        {
            employe emps = new employe();
            return View(emps);
        }

        [HttpPost]
        public ActionResult Create(employe mod)
        {
            Employee emps = new Employee();
            emps.EmpName = mod.employename;
            emps.EmpAddress = mod.employeaddress;
            emps.EmpEmailId = mod.employeemailid;
            db.Employees.InsertOnSubmit(emps);
            db.SubmitChanges();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            employe model = db.Employees.Where(val => val.id == id).Select(val => new employe()
            {
                id = val.id,
                employename = val.EmpName,
                employeaddress = val.EmpAddress,
                employeemailid = val.EmpEmailId
            }).SingleOrDefault();

            return View(model);

        }

        public ActionResult Edit(employe mod)
        {
            Employee emp = db.Employees.Where(val => val.id == mod.id).Single<Employee>();
            emp.id = mod.id;
            emp.EmpName = mod.employename;
            emp.EmpAddress = mod.employeaddress;
            emp.EmpEmailId = mod.employeemailid;
            db.SubmitChanges();
            return RedirectToAction("index");
        }

        public ActionResult Delete(int id)
        {
            employe emp = db.Employees.Where(val => val.id == id).Select(val => new employe()
            {
                id = val.id,
                employename = val.EmpName,
                employeaddress = val.EmpAddress,
                employeemailid = val.EmpEmailId
            }).SingleOrDefault();

            return View(emp);
        }

        [HttpPost]
        public ActionResult Delete(employe mod)
        {
            Employee emp = db.Employees.Where(val => val.id == mod.id).Single<Employee>();
            db.Employees.DeleteOnSubmit(emp);
            db.SubmitChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Details(int id)
        {
            employe emp = db.Employees.Where(val => val.id == id).Select(val => new employe()
            {
                id = val.id,
                employename = val.EmpName,
                employeaddress = val.EmpAddress,
                employeemailid = val.EmpEmailId,
            }).SingleOrDefault();
            return View(emp);
        }
    }
}