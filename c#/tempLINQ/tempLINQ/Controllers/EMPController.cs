using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using tempLINQ.Models;

namespace tempLINQ.Controllers
{
    public class EMPController : Controller
    {
        // GET: EMP
        readonly DataClasses1DataContext db=new DataClasses1DataContext("Data Source=TGS131;Initial Catalog=LINQROUGH;Integrated Security=True;Encrypt=False");
        public ActionResult Index()
        {
            var emplist=new List<EmpModel>();
            var query=from q in db.EMPDetails select q;
            var listdata=query.ToList();
            foreach (var emp in listdata)
            {
                emplist.Add(new EmpModel()
                {
                    id=emp.eid,
                    name=emp.ename,
                    sal=emp.salary,
                    ct=emp.city,
                    gen=emp.gender,
                });
            }
            return View(emplist);
        }
        public ActionResult Create()
        {
            EmpModel emps = new EmpModel();
            return View(emps);
        }
        [HttpPost]
        public ActionResult Create(EmpModel mod)
        {
            EMPDetail empd = new EMPDetail()
            {
                ename=mod.name,
                salary=mod.sal,
                city=mod.ct,
                gender=mod.gen,
            };
            db.EMPDetails.InsertOnSubmit(empd);
            db.SubmitChanges();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult Delete(EmpModel mod)
        {
            EMPDetail emp =db.EMPDetails.Where(val=>val.eid==mod.id).Single<EMPDetail>();
            db.EMPDetails.DeleteOnSubmit(emp);
            db.SubmitChanges();
            return RedirectToAction("Index");
        }
    }
}