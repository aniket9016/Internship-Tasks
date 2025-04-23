using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class PrescriptionCreateViewModel
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid PatientVisitId { get; set; }

        [Required(ErrorMessage = "Prescription date is required")]
        public DateTime PrescriptionDate { get; set; }

        public string Notes { get; set; }
        public List<PrescriptionItemViewModel> PrescriptionItems { get; set; } = new List<PrescriptionItemViewModel>();
    }

    public class PrescriptionItemViewModel
    {
        public Guid MedicineId { get; set; }

        [Required(ErrorMessage = "Dosage is required")]
        public string Dosage { get; set; }

        public string Frequency { get; set; }

        [Range(1, 365, ErrorMessage = "Duration must be between 1 and 365 days")]
        public int Duration { get; set; }

        public string Instructions { get; set; }

        [Range(1, 1000, ErrorMessage = "Quantity must be between 1 and 1000")]
        public int Quantity { get; set; }
    }

    public class PrescriptionUpdateViewModel
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid PatientVisitId { get; set; }
        public DateTime PrescriptionDate { get; set; }
        public string Notes { get; set; }
        public List<PrescriptionItemUpdateViewModel> PrescriptionItems { get; set; } = new List<PrescriptionItemUpdateViewModel>();
    }

    public class PrescriptionItemUpdateViewModel
    {
        public Guid Id { get; set; }
        public Guid MedicineId { get; set; }

        [Required(ErrorMessage = "Dosage is required")]
        public string Dosage { get; set; }

        public string Frequency { get; set; }

        [Range(1, 365, ErrorMessage = "Duration must be between 1 and 365 days")]
        public int Duration { get; set; }

        public string Instructions { get; set; }

        [Range(1, 1000, ErrorMessage = "Quantity must be between 1 and 1000")]
        public int Quantity { get; set; }
    }

    public class PrescriptionDisplayViewModel
    {
        public Guid Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public DateTime PrescriptionDate { get; set; }
        public string Notes { get; set; }
        public List<PrescriptionItemDisplayViewModel> Items { get; set; } = new List<PrescriptionItemDisplayViewModel>();
        public DateTime CreatedAt { get; set; }
    }

    public class PrescriptionItemDisplayViewModel
    {
        public Guid Id { get; set; }
        public string MedicineName { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public int Duration { get; set; }
        public string Instructions { get; set; }
        public int Quantity { get; set; }
    }
}
