using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User : BaseEntity
    {
        public string UserId { get; set; }
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        [Required(ErrorMessage = "PhoneNumber is required")]
        public string PhoneNumber { get; set; }

        public string? Photo { get; set; }

        public Guid UserTypeId { get; set; }
        public virtual UserType? UserTypes{ get; set; }

        public virtual List<SupplierItem>? SupplierItems { get; set; }
        public virtual List<CustomerItem>? CustomerItems { get; set; }

    }

}
