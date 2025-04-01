using System.ComponentModel.DataAnnotations;

namespace BankTransactions.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "⚠ Account Number is required.")]
        [MinLength(12, ErrorMessage = "⚠ Account Number must be exactly 12 digits.")]
        [MaxLength(12, ErrorMessage = "⚠ Account Number must be exactly 12 digits.")]
        [RegularExpression(@"^\d{12}$", ErrorMessage = "⚠ Account Number must contain exactly 12 digits (0-9).")]
        public string AccountNumber { get; set; }

        [Required(ErrorMessage = "⚠ Password is required.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
