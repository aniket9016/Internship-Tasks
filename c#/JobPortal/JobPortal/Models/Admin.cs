using System;
using System.ComponentModel.DataAnnotations;

namespace JobPortal.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Department { get; set; } // Example: HR, IT, Management

        public bool CanManageJobs { get; set; } = true;

        public bool CanManageUsers { get; set; } = true;

        [DataType(DataType.Date)]
        public DateTime JoiningDate { get; set; } = DateTime.Now;
    }
}
