using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize(Roles = "User,Admin")]
public class UserController : Controller
{
    public IActionResult Dashboard()
    {
        return View();
    }

    public IActionResult Profile()
    {
        return View();
    }
}
