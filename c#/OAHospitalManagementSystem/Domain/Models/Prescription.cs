using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Prescription : BaseEntity
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid PatientVisitId { get; set; }
        [Required]
        public DateTime PrescriptionDate { get; set; }
        public string Notes { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        [ForeignKey("DoctorId")]
        public virtual Doctor Doctor { get; set; }
        [ForeignKey("PatientVisitId")]
        public virtual PatientVisit PatientVisit { get; set; }
        public virtual ICollection<PrescriptionItem> PrescriptionItems { get; set; } = new List<PrescriptionItem>();
    }
}
