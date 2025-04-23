using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class ScheduleCreateViewModel
    {
        public Guid DoctorId { get; set; }

        [Required(ErrorMessage = "Day of week is required")]
        public DayOfWeek DayOfWeek { get; set; }

        [Required(ErrorMessage = "Start time is required")]
        public TimeSpan StartTime { get; set; }

        [Required(ErrorMessage = "End time is required")]
        public TimeSpan EndTime { get; set; }

        [Range(1, 100, ErrorMessage = "Maximum appointments must be between 1 and 100")]
        public int MaxAppointments { get; set; }

        public bool IsAvailable { get; set; } = true;
    }

    public class ScheduleUpdateViewModel
    {
        public Guid Id { get; set; }
        public Guid DoctorId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int MaxAppointments { get; set; }
        public bool IsAvailable { get; set; }
    }

    public class ScheduleDisplayViewModel
    {
        public Guid Id { get; set; }
        public string DoctorName { get; set; }
        public string DayOfWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int MaxAppointments { get; set; }
        public bool IsAvailable { get; set; }
    }
}
