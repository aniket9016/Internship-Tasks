using SessionbasedAuthenticationDemo.Models;
using SessionbasedAuthenticationDemo.ViewModel;

namespace SessionbasedAuthenticationDemo.Repository
{
    public interface ICookieUserItem
    {
        CookieUserItem Register(Register model);
        CookieUserItem? Validate(Login model);
    }
}
