using SessionbasedAuthenticationDemo.Models;

namespace SessionbasedAuthenticationDemo.Repository
{
    public interface IUserManager
    {
        Task SignIn(HttpContext httpContext, CookieUserItem user, bool isPersistent = false);
        Task SignOut(HttpContext httpContext);
    }
}
