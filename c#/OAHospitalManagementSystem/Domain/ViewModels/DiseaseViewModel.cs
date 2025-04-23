using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class DiseaseCreateViewModel
    {
        [Required(ErrorMessage = "Disease name is required")]
        [StringLength(100, ErrorMessage = "Disease name cannot exceed 100 characters")]
        public string Name { get; set; }

        public string Description { get; set; }
        public string Symptoms { get; set; }
        public string Treatment { get; set; }
        public Guid? DepartmentId { get; set; }
    }

    public class DiseaseUpdateViewModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Disease name is required")]
        [StringLength(100, ErrorMessage = "Disease name cannot exceed 100 characters")]
        public string Name { get; set; }

        public string Description { get; set; }
        public string Symptoms { get; set; }
        public string Treatment { get; set; }
        public Guid? DepartmentId { get; set; }
        public bool IsActive { get; set; }
    }

    public class DiseaseDisplayViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Symptoms { get; set; }
        public string Treatment { get; set; }
        public string DepartmentName { get; set; }
        public bool IsActive { get; set; }
    }
}
