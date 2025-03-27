using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EMPManagementFinal.Models
{
    public class Salary
    {
        [Key]
        public int SalaryId { get; set; } 

        [Required]
        [ForeignKey("Employee")] 
        public int EmpId { get; set; }
        public Employee? Employee { get; set; }

        [Required(ErrorMessage = "Salary amount is required")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Date is required")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
    }
}
