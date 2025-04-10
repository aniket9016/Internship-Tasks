using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class Category : BaseEntity
    {
        [Required(ErrorMessage = "CategoryName is required")]
        public string CategoryName { get; set; }

        public virtual List<Item>? Items { get; set; }
    }
}
