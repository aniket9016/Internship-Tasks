using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TransactionApp.Models
{
    public class Transaction1 : IValidatableObject
    {
        [Key]
        public int TransactionId { get; set; }

        [Column(TypeName = "varchar(14)")]
        [Display(Name = "Account Number")]
        [Required(ErrorMessage = "Account Number is required.")]
        [StringLength(14, MinimumLength = 14, ErrorMessage = "Account Number must be exactly 14 characters.")]
        [RegularExpression(@"^\d{14}$", ErrorMessage = "Account Number must be numeric and exactly 14 digits.")]
        public string? TransactionAccountNumber { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "Beneficiary Name")]
        [Required(ErrorMessage = "Beneficiary Name is required.")]
        [StringLength(100, ErrorMessage = "Beneficiary Name cannot exceed 100 characters.")]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Beneficiary Name can only contain letters.")]
        public string? TransactionBeneficiaryName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name = "Bank Name")]
        [Required(ErrorMessage = "Bank Name is required.")]
        [StringLength(100, ErrorMessage = "Bank Name cannot exceed 100 characters.")]
        [RegularExpression(@"^[a-zA-Z\s]+$", ErrorMessage = "Bank Name must contain only letters.")]
        public string? TransactionBankName { get; set; }

        [Column(TypeName = "nvarchar(11)")]
        [Display(Name = "IFSC Code")]
        [Required(ErrorMessage = "IFSC Code is required.")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "IFSC Code must be exactly 11 characters.")]
        [RegularExpression(@"^[A-Z]{4}0[A-Z0-9]{6}$", ErrorMessage = "Invalid IFSC Code format.")]
        public string? BANKIFSCCode { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        [Display(Name = "Amount")]
        [Required(ErrorMessage = "Transaction Amount is required.")]
        [Range(1, 1000000, ErrorMessage = "Amount must be between 1 and 1,000,000.")]
        public decimal TransactionAmount { get; set; }


        [Display(Name = "Transaction Date")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        [Required(ErrorMessage = "Transaction Date is required.")]
        public DateTime TransactionDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (TransactionDate > DateTime.Today)
            {
                yield return new ValidationResult("Transaction Date cannot be in the future.", new[] { nameof(TransactionDate) });
            }
        }
    }
}
