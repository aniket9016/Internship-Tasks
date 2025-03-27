using LINQ2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LINQ2.Controllers
{
    public class MovieController : Controller
    {
        // GET: Movie/Random
        public ActionResult Random()
        {
            var movie=new Movie() { Name="Shrek"};
            //ViewData["RandomMovie"]=movie;
            //ViewBag.Movie=movie;

            return View(movie);
        }
        public ActionResult Edit(int id)
        {
            return Content("ID : " + id);
        }
        public ActionResult Index(int? pageIndex,string sortBy)
        {
            if (!pageIndex.HasValue)
            {
                pageIndex = 1;
            }
            if(String.IsNullOrWhiteSpace(sortBy))
            {
                sortBy = "Name";
            }
            return Content(string.Format("pageindex: {0} sortby: {1}",pageIndex,sortBy));
        }
    }
}