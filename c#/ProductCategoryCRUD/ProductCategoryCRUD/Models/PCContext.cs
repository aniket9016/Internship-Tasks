using ProductCategoryCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace ProductCategoryCRUD.Models
{
    public class PCContext : DbContext
    {
        public PCContext(DbContextOptions<PCContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId);
        }
    }
}

