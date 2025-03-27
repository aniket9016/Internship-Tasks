namespace SessionbasedAuthenticationDemo.Models
{
    public class CookieUserItem
    {
        public Guid UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime? DateTimeUtc { get; set; } = DateTime.UtcNow;
    }
}
