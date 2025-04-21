using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class PrescriptionItem : BaseEntity
    {
        public Guid PrescriptionId { get; set; }
        public Guid MedicineId { get; set; }
        [Required]
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public int Duration { get; set; }
        public string Instructions { get; set; }
        public int Quantity { get; set; }
        [ForeignKey("PrescriptionId")]
        public virtual Prescription Prescription { get; set; }
        [ForeignKey("MedicineId")]
        public virtual Medicine Medicine { get; set; }
    }
}
