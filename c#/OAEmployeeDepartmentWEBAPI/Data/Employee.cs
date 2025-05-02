using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization; 

namespace Data
{
    public class Employee : BaseEntity
    {
        [Required]
        public string EmployeeName { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [Required]
        public string Address { get; set; }

        [Required, Phone]
        public string Phone { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string ProfilePic { get; set; }

        public string? Department { get; set; }
    }
}
