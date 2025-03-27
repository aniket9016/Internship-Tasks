using System.ComponentModel.DataAnnotations;

namespace MvcCalculator.Models
{
    public class CalculatorModel
    {
        [Required]
        public double Number1 { get; set; }

        [Required]
        public double Number2 { get; set; }

        public string Operation { get; set; } 

        public double Result { get; set; }
    }
}
