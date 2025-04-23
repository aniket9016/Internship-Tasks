using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class PatientVisitCreateViewModel
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid DiseaseId { get; set; }

        [Required(ErrorMessage = "Visit date is required")]
        public DateTime VisitDate { get; set; }

        public string Diagnosis { get; set; }
        public string Treatment { get; set; }
        public Guid? AppointmentId { get; set; }
    }

    public class PatientVisitUpdateViewModel
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid DiseaseId { get; set; }
        public DateTime VisitDate { get; set; }
        public string Diagnosis { get; set; }
        public string Treatment { get; set; }
        public Guid? AppointmentId { get; set; }
    }

    public class PatientVisitDisplayViewModel
    {
        public Guid Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public string DiseaseName { get; set; }
        public DateTime VisitDate { get; set; }
        public string Diagnosis { get; set; }
        public string Treatment { get; set; }
        public bool HasPrescription { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
