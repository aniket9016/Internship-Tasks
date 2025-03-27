using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;
using JobPortal.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web;

namespace JobPortal.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser, string> signInManager;

        public AccountController()
        {
            userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            signInManager = new SignInManager<ApplicationUser, string>(userManager, HttpContext.GetOwinContext().Authentication);
        }


        // REGISTER
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user.Id, "User");

                    await signInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    return RedirectToAction("Index", "Home");
                }
                AddErrors(result);
            }
            return View(model);
        }

        // LOGIN
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await userManager.FindAsync(model.Email, model.Password);
            if (user != null)
            {
                await signInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError("", "Invalid login attempt.");
            return View(model);
        }


        // LOGOUT
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }

        // PROFILE
        [Authorize]
        public ActionResult Profile()
        {
            var user = userManager.FindById(User.Identity.GetUserId());
            return View(user);
        }

        // EDIT PROFILE
        [Authorize]
        public ActionResult EditProfile()
        {
            var user = userManager.FindById(User.Identity.GetUserId());
            return View(user);
        }

        [HttpPost]
        public ActionResult EditProfile(ApplicationUser model)
        {
            var user = userManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                user.FullName = model.FullName;
                user.Address = model.Address;
                user.PhoneNumber = model.PhoneNumber;
                db.SaveChanges();
                return RedirectToAction("Profile");
            }

            return View(model);
        }

        // DELETE ACCOUNT
        [Authorize]
        public ActionResult DeleteAccount()
        {
            var user = userManager.FindById(User.Identity.GetUserId());
            return View(user);
        }

        [HttpPost, ActionName("DeleteAccount")]
        public ActionResult ConfirmDeleteAccount()
        {
            var user = userManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                db.Users.Remove(user);
                db.SaveChanges();
                FormsAuthentication.SignOut();
                return RedirectToAction("Register");
            }

            return RedirectToAction("Profile");
        }

        // HELPER FUNCTION TO ADD ERRORS
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
    }
}
