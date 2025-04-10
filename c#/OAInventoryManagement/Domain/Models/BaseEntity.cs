using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; } 

        [Required(ErrorMessage = "CreatedAt is required")]
        public DateTime CreatedAt { get; set; } 

        [Required(ErrorMessage = "UpdatedAt is required")]
        public DateTime UpdatedAt { get; set; } 

        [Required(ErrorMessage = "CreatedBy is required")]
        public string CreatedBy { get; set; }

        [Required(ErrorMessage = "UpdatedBy is required")]
        public string UpdatedBy { get; set; }

        [Required(ErrorMessage = "IsActive is required")]
        public bool IsActive { get; set; } 
    }
}