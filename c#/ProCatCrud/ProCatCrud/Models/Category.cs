using System.ComponentModel.DataAnnotations;

namespace ProCatCrud.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryType { get; set; }
        public virtual ICollection<Product>? Products { get; set; }
    }
}
