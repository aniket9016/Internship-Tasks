using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpMan.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }

        [DisplayName("Name")]
        [Column(TypeName = "nvarchar(50)")] // Changed to `nvarchar(50)` for consistency
        [Required(ErrorMessage = "Employee Name is Required")]
        public string EmpName { get; set; }

        [DisplayName("Email")]
        [Column(TypeName = "nvarchar(50)")]
        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [DisplayName("Phone No")]
        [Required(ErrorMessage = "Phone No is Required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone No must be exactly 10 digits and contain only numbers")]
        public string Phone { get; set; }

        [DisplayName("Gender")]
        [Column(TypeName = "nvarchar(10)")]
        [Required(ErrorMessage = "Gender is Required")]
        public string Gender { get; set; }

        [DisplayName("Date of Birth")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Required(ErrorMessage = "Date of Birth is Required")]
        public DateTime DOB { get; set; }

        [Required(ErrorMessage = "Department is Required")]
        [ForeignKey("Department")]
        public int DeptId { get; set; }
        public virtual Department Department { get; set; }

        [Required(ErrorMessage = "City is Required")]
        [ForeignKey("City")]
        public int CityId { get; set; }
        public virtual City City { get; set; }

        public virtual ICollection<Salary> Salary { get; set; } = new List<Salary>();
    }
}
