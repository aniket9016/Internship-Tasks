using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Item : BaseEntity
    {
        public string ItemCode { get; set; }
        [Required(ErrorMessage = "ItemName is required")]
        public string ItemName { get; set; }

        [Required(ErrorMessage = "ItemDescription is required")]
        public string ItemDescription { get; set; }

        [Required(ErrorMessage = "Price is required")]
        public int Price { get; set; }

        [Required(ErrorMessage = "CategoryId is required")]
        public Guid CategoryId { get; set; }
        public virtual Category? Category { get; set; }

        public virtual List<ItemImages>? ItemImages { get; set; }
        public virtual SupplierItem? SupplierItems { get; set; }
        public virtual CustomerItem? CustomerItems { get; set; }

    }
}
