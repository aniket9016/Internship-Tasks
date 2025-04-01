using Microsoft.AspNetCore.Mvc;
using SessionBasedAuthentication.Models;

namespace SessionBasedAuthentication.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login() => View();

        [HttpPost]
        public IActionResult Login(User user)
        {
            if (user.Username == "admin" && user.Password == "password")
            {
                HttpContext.Session.SetString("User", user.Username);
                return RedirectToAction("Dashboard");
            }
            ViewBag.Message = "Invalid credentials";
            return View();
        }

        public IActionResult Dashboard()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("User")))
                return RedirectToAction("Login");

            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }

}
