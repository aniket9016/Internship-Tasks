using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductCategoryCRUD.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string? CategoryType{ get; set; }
        public virtual ICollection<Product>? Products { get; set; }
    }
}
