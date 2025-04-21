using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Schedule : BaseEntity
    {
        public Guid DoctorId { get; set; }
        [Required]
        public DayOfWeek DayOfWeek { get; set; }
        [Required]
        public TimeSpan StartTime { get; set; }
        [Required]
        public TimeSpan EndTime { get; set; }
        public int MaxAppointments { get; set; }
        public bool IsAvailable { get; set; } = true;
        [ForeignKey("DoctorId")]
        public virtual Doctor Doctor { get; set; }
    }
}
