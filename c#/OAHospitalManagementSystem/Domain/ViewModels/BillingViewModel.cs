using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class BillingCreateViewModel
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid? PatientVisitId { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        [Range(0, 1000000, ErrorMessage = "Amount must be between 0 and 1,000,000")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Billing date is required")]
        public DateTime BillingDate { get; set; }

        public string PaymentMethod { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    }

    public class BillingUpdateViewModel
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid? PatientVisitId { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        [Range(0, 1000000, ErrorMessage = "Amount must be between 0 and 1,000,000")]
        public decimal Amount { get; set; }

        public DateTime BillingDate { get; set; }
        public string PaymentMethod { get; set; }
        public PaymentStatus Status { get; set; }
    }

    public class BillingDisplayViewModel
    {
        public Guid Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public DateTime BillingDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
