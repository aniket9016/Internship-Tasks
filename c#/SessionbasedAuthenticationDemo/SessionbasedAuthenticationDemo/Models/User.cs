using System.ComponentModel.DataAnnotations;

namespace SessionbasedAuthenticationDemo.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Name { get; set; }
        public DateTime? DateTimeUtc { get; set; }=DateTime.UtcNow;
    }
}
