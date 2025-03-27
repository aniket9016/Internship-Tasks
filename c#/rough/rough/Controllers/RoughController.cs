using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace rough.Controllers
{
    public class RoughController : Controller
    {
        // GET: Rough
        public ActionResult Index()
        {
            ViewBag.Message = "Hello from viewbag";
            ViewData["Message"] = "Hello from ViewData!";
            TempData["Message"] = "Hello from tempdata";
            return View("About");
        }
    }
}