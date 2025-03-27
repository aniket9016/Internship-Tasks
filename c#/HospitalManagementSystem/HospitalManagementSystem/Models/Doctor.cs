using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.Models
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Specialization { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required]
        public string Email { get; set; }

        // Relationship with Patients
        public ICollection<Patient> Patients { get; set; }

        // Relationship with Appointments
        public ICollection<Appointment> Appointments { get; set; }
    }
}
