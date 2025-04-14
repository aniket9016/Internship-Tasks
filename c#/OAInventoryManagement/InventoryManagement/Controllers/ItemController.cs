using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
    public class ItemController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
