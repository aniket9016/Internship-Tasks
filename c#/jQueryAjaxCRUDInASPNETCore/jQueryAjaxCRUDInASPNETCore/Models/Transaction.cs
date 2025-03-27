using Microsoft.VisualBasic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace jQueryAjaxCRUDInASPNETCore.Models
{
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        [DisplayName("Account Number")]
        [Required(ErrorMessage = "⚠ Account Number is required.")]
        [MinLength(12, ErrorMessage = "⚠ Account Number must be exactly 12 digits.")]
        [MaxLength(12, ErrorMessage = "⚠ Account Number must be exactly 12 digits.")]
        [RegularExpression(@"^\d{12}$", ErrorMessage = "⚠ Account Number must contain exactly 12 digits (0-9).")]
        public string AccountNumber { get; set; }

        [DisplayName("Beneficiary Name")]
        [Required(ErrorMessage = "⚠ Beneficiary Name is required.")]
        public string BeneficiaryName { get; set; }

        [DisplayName("Bank Name")]
        [Required(ErrorMessage = "⚠ Bank Name is required.")]
        public string BankName { get; set; }

        [DisplayName("SWIFT Code")]
        [Required(ErrorMessage = "⚠ SWIFT Code is required.")]
        [MaxLength(11, ErrorMessage = "⚠ SWIFT Code cannot exceed 11 characters.")]
        [RegularExpression(@"^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$", ErrorMessage = "⚠ Invalid SWIFT Code format.")]
        public string SWIFTCode { get; set; }

        [Required(ErrorMessage = "⚠ Amount is required.")]
        [Range(1, double.MaxValue, ErrorMessage = "⚠ Amount must be greater than zero.")]
        public int Amount { get; set; }
        [DisplayFormat(DataFormatString ="{0:MM/dd/yyyy}")]
        public DateTime Date { get; set; }
    }
}
