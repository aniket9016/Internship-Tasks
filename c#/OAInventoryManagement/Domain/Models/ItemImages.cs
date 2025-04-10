using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ItemImages : BaseEntity
    {
        [Required(ErrorMessage = "ItemId is required")]
        public Guid ItemId { get; set; }
        public virtual Item? Item { get; set; }

        [Required(ErrorMessage = "ItemImage is required")]
        public string ItemImage { get; set; }
    }
}
