using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeManagement.Models
{
    public class Salary
    {
        [Key]
        [ForeignKey("Employee")]
        public int Id { get; set; }  // Primary Key and also acts as Foreign Key to Employee

        public virtual Employee Employee { get; set; }

        [Required(ErrorMessage = "Salary amount is required")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Date is required")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
    }
}
