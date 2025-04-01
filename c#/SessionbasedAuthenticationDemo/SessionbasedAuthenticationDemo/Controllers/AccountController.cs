using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SessionbasedAuthenticationDemo.Models;
using SessionbasedAuthenticationDemo.Repository;
using SessionbasedAuthenticationDemo.ViewModel;

namespace SessionbasedAuthenticationDemo.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserManager _userManager;
        private readonly ICookieUserItem _userRepository;

        public AccountController(IUserManager userManager, ICookieUserItem userRepository)
        {
            _userManager = userManager;
            _userRepository = userRepository;
        }

        public IActionResult Login()
        {
            return View();
        }

        [Authorize]
        public IActionResult Profile()
        {
            return View(User.Claims.ToDictionary(x => x.Type, x => x.Value));
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync(Login model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = _userRepository.Validate(model);

            if (user == null)
            {
                ModelState.AddModelError("", "Invalid email or password.");
                return View(model);
            }

            await _userManager.SignIn(HttpContext, user, false);
            return LocalRedirect("~/Home/Index");
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> RegisterAsync(Register model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var user = _userRepository.Register(model);

            await _userManager.SignIn(HttpContext, user, false);
            return LocalRedirect("~/Home/Index");
        }

        public async Task<IActionResult> LogoutAsync()
        {
            await _userManager.SignOut(HttpContext);
            return Redirect("~/Home/Index");
        }
    }
}
