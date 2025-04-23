using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class DepartmentCreateViewModel
    {
        [Required(ErrorMessage = "Department name is required")]
        [StringLength(100, ErrorMessage = "Department name cannot exceed 100 characters")]
        public string DepartmentName { get; set; }

        public string Description { get; set; }
    }

    public class DepartmentUpdateViewModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Department name is required")]
        [StringLength(100, ErrorMessage = "Department name cannot exceed 100 characters")]
        public string DepartmentName { get; set; }

        public string Description { get; set; }
        public bool IsActive { get; set; }
    }

    public class DepartmentDisplayViewModel
    {
        public Guid Id { get; set; }
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        public int DoctorCount { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
