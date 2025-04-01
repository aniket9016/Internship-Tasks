using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string AccountNumber { get; set; }
}
