using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class MedicalRecord : BaseEntity
    {
        public Guid PatientId { get; set; }
        public Guid? DiseaseId { get; set; }
        [Required]
        public DateTime RecordDate { get; set; }
        public string Symptoms { get; set; }
        public string Diagnosis { get; set; }
        public string Treatment { get; set; }
        public string Notes { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        [ForeignKey("DiseaseId")]
        public virtual Disease Disease { get; set; }
    }
}
