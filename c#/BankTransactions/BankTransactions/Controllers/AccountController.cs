using BankTransactions.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace BankTransactions.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult Login() => View();

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.AccountNumber == model.AccountNumber);
            if (user == null)
            {
                ModelState.AddModelError("", "Invalid account number or password.");
                return View(model);
            }

            var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);

            if (result.Succeeded)
            {
                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = model.RememberMe, 
                    ExpiresUtc = model.RememberMe ? DateTime.UtcNow.AddDays(14) : null 
                };

                await _signInManager.SignInAsync(user, authProperties);

                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError("", "Invalid account number or password.");
            return View(model);
        }


        public IActionResult Register() => View();

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var userExists = await _userManager.Users.AnyAsync(u => u.AccountNumber == model.AccountNumber);
            if (userExists)
            {
                ModelState.AddModelError("", "Account number already exists.");
                return View(model);
            }

            var user = new ApplicationUser
            {
                UserName = model.AccountNumber,
                AccountNumber = model.AccountNumber
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                TempData["SuccessMessage"] = "Registration successful! Please log in.";
                return RedirectToAction("Login");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return View(model);
        }

        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            Response.Cookies.Delete(".AspNetCore.Identity.Application"); 
            TempData["SuccessMessage"] = "You have been logged out.";
            return RedirectToAction("Login");
        }

    }
}