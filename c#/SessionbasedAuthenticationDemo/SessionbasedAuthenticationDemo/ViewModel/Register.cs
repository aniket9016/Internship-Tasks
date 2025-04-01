using System.ComponentModel.DataAnnotations;

namespace SessionbasedAuthenticationDemo.ViewModel
{
    public class Register:Login
    {
        [Required,Compare("Password",ErrorMessage = "Password and Confirm Password do not match")]
        public string ConfirmPassword { get; set; }

    }
}
