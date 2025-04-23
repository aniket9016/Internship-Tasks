using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class AppointmentCreateViewModel
    {
        [Required(ErrorMessage = "Patient is required")]
        public Guid PatientId { get; set; }

        [Required(ErrorMessage = "Doctor is required")]
        public Guid DoctorId { get; set; }

        [Required(ErrorMessage = "Appointment date is required")]
        public DateTime AppointmentDate { get; set; }

        [Required(ErrorMessage = "Appointment time is required")]
        public string AppointmentTime { get; set; }

        public string ReasonForVisit { get; set; }
    }

    public class AppointmentUpdateViewModel
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string AppointmentTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public string ReasonForVisit { get; set; }
    }

    public class AppointmentDisplayViewModel
    {
        public Guid Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public string DoctorSpecialization { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string AppointmentTime { get; set; }
        public string Status { get; set; }
        public string ReasonForVisit { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
