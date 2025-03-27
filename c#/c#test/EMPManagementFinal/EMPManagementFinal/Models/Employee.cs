using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EMPManagementFinal.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmpId { get; set; }

        [Required(ErrorMessage = "Employee name is required")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        [Column("EmployeeName")]
        public string EmpName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [StringLength(150, ErrorMessage = "Email cannot exceed 150 characters")]
        [Column("EmailAddress")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number")]
        [StringLength(15, ErrorMessage = "Phone number cannot exceed 15 digits")]
        [Column("PhoneNumber")]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Gender is required")]
        [Column("Gender")]
        public string Gender { get; set; } = string.Empty;

        [Required(ErrorMessage = "Date of Birth is required")]
        [DataType(DataType.Date)]
        [Column("DateOfBirth")]
        public DateTime DOB { get; set; }

        [Required(ErrorMessage = "Department is required")]
        [ForeignKey("Department")]
        [Column("DepartmentID")]
        public int DeptId { get; set; }

        public Department? Department { get; set; }

        [Required(ErrorMessage = "City is required")]
        [ForeignKey("City")]
        [Column("CityID")]
        public int CityId { get; set; }

        public City? City { get; set; }
        public ICollection<Salary>? Salary { get; set; }
    }
}
