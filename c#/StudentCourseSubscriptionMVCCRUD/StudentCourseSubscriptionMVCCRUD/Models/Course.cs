using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentCourseSubscriptionMVCCRUD.Models
{
    public class Course
    {
        [Key]
        public int CourseID { get; set; }

        [Required]
        public string CourseName { get; set; }

        [Required]
        public int Duration { get; set; }

        public virtual ICollection<Subscription> Subscriptions { get; set; }
    }
}
