using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmpMan.Models
{
    public class Department
    {
        [Key]
        public int DeptId { get; set; }

        [Required(ErrorMessage = "Department name is required")]
        [StringLength(100, ErrorMessage = "Department name cannot exceed 100 characters")]
        public string DeptName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
