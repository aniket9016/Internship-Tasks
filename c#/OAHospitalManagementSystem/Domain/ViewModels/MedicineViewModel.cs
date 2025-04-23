using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class MedicineCreateViewModel
    {
        [Required(ErrorMessage = "Medicine name is required")]
        [StringLength(100, ErrorMessage = "Medicine name cannot exceed 100 characters")]
        public string Name { get; set; }

        public string Description { get; set; }
        public string Dosage { get; set; }
        public DateTime ExpiryDate { get; set; }

        [Range(0, 1000000, ErrorMessage = "Price must be between 0 and 1,000,000")]
        public decimal Price { get; set; }

        public bool RequiresPrescription { get; set; }

        [Range(0, 100000, ErrorMessage = "Stock must be between 0 and 100,000")]
        public int Stock { get; set; }
    }

    public class MedicineUpdateViewModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Medicine name is required")]
        [StringLength(100, ErrorMessage = "Medicine name cannot exceed 100 characters")]
        public string Name { get; set; }

        public string Description { get; set; }
        public string Dosage { get; set; }
        public DateTime ExpiryDate { get; set; }

        [Range(0, 1000000, ErrorMessage = "Price must be between 0 and 1,000,000")]
        public decimal Price { get; set; }

        public bool RequiresPrescription { get; set; }

        [Range(0, 100000, ErrorMessage = "Stock must be between 0 and 100,000")]
        public int Stock { get; set; }

        public bool IsActive { get; set; }
    }

    public class MedicineDisplayViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Dosage { get; set; }
        public DateTime ExpiryDate { get; set; }
        public decimal Price { get; set; }
        public bool RequiresPrescription { get; set; }
        public int Stock { get; set; }
        public bool IsActive { get; set; }
    }
}
