using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Models
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Job")]
        public int JobId { get; set; }

        [ForeignKey("Applicant")]
        public string ApplicantId { get; set; }

        public DateTime AppliedOn { get; set; } = DateTime.Now;

        public string ResumeUrl { get; set; }

        public string Status { get; set; } // Applied, Shortlisted, Rejected, Hired

        public virtual Job Job { get; set; }
        public virtual ApplicationUser Applicant { get; set; }
    }
}
