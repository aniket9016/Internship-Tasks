using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Data
{
    public class Employee : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? HireDate { get; set; }
        public string JobTitle { get; set; }
        public decimal Salary { get; set; }
        public Guid DepartmentId { get; set; }
        public string Role { get; set; } 

        [JsonIgnore]
        public virtual Department? Department { get; set; }
    }
}
