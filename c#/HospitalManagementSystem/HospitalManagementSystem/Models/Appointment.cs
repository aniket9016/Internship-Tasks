using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }  // Ensure this property exists

        [Required]
        public string Time { get; set; }  // Add this if needed

        public string Status { get; set; } = "Scheduled";  // Default value

        // Navigation Properties
        public virtual Patient? Patient { get; set; }
        public virtual Doctor? Doctor { get; set; }
    }
}
