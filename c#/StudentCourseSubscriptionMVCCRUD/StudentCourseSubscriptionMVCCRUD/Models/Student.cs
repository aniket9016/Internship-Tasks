using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentCourseSubscriptionMVCCRUD.Models
{
    public class Student
    {
        [Key]
        public int StudentID { get; set; }

        [Required]
        public string StudentName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Invalid phone number.")]
        public string Phone { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string EnrollmentNo { get; set; }
        public virtual ICollection<Subscription> Subscriptions { get; set; }
    }
}
