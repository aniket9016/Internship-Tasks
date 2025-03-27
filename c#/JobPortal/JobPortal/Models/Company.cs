using System.ComponentModel.DataAnnotations;

namespace JobPortal.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Location { get; set; }

        public string Industry { get; set; } // Example: IT, Finance, Healthcare

        public string Website { get; set; }

        public string Description { get; set; }
    }
}
