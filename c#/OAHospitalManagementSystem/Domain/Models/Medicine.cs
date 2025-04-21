using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Medicine : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Dosage { get; set; }
        public string SideEffects { get; set; }
        public string Precautions { get; set; }
        public string Interactions { get; set; }
        public string Manufacturer { get; set; }
        public DateTime ExpiryDate { get; set; }
        public decimal Price { get; set; }
        public bool RequiresPrescription { get; set; }
        public int Stock { get; set; }
        public virtual ICollection<PrescriptionItem> PrescriptionItems { get; set; } = new List<PrescriptionItem>();
    }
}
