namespace JobGenius.Models
{
    public class JobApplication
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int JobId { get; set; }
        public DateTime AppliedDate { get; set; }
    }
}
