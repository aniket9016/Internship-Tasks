using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public string Company { get; set; }

        public string Location { get; set; } 

        public string JobType { get; set; } 

        public decimal Salary { get; set; }

        public int ExperienceRequired { get; set; } 

        public DateTime PostedOn { get; set; } = DateTime.Now;

        [ForeignKey("PostedBy")]
        public string PostedById { get; set; } 

        public virtual ApplicationUser PostedBy { get; set; }
    }
}
