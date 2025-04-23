using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Billing : BaseEntity
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid? PatientVisitId { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public DateTime BillingDate { get; set; }
        public string PaymentMethod { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        [ForeignKey("DoctorId")]
        public virtual Doctor Doctor { get; set; }
        [ForeignKey("PatientVisitId")]
        public virtual PatientVisit PatientVisit { get; set; }
    }

    public enum PaymentStatus
    {
        Paid,
        Unpaid,
        Pending,
        Refunded,
        Cancelled
    }
}
