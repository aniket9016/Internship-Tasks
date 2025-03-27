using Microsoft.AspNetCore.Mvc;

namespace JobGenius.Controllers
{
    public class JobController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details(int id)
        {
            ViewData["JobId"] = id;
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string jobTitle, string description)
        {
            ViewData["Message"] = "Job created successfully!";
            return View();
        }
    }
}
