using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
