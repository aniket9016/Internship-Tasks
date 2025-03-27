using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpMan.Models
{
    public class Salary
    {
        [Key]
        public int SalaryId { get; set; } // Primary Key

        [Required]
        [ForeignKey("Employee")] // Foreign Key to Employee
        public int EmpId { get; set; }

        public virtual Employee Employee { get; set; } // Navigation Property

        [Required(ErrorMessage = "Salary amount is required")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Date is required")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
    }
}
