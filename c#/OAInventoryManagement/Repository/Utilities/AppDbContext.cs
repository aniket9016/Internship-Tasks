using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository.Utilities
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemImages> ItemImages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<SupplierItem> SupplierItems { get; set; }
        public DbSet<CustomerItem> CustomerItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Category - Item (One to Many)
            modelBuilder.Entity<Item>()
                .HasOne(i => i.Category)
                .WithMany(c => c.Items)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Item - ItemImages (One to Many)
            modelBuilder.Entity<ItemImages>()
                .HasOne(ii => ii.Item)
                .WithMany(i => i.ItemImages)
                .HasForeignKey(ii => ii.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // SupplierItem - Item (One to One)
            modelBuilder.Entity<SupplierItem>()
                .HasOne(si => si.Item)
                .WithOne(i => i.SupplierItems)
                .HasForeignKey<SupplierItem>(si => si.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - SupplierItems (One to Many)
            modelBuilder.Entity<SupplierItem>()
                .HasOne(si => si.User)
                .WithMany(u => u.SupplierItems)
                .HasForeignKey(si => si.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // CustomerItem - Item (One to One)
            modelBuilder.Entity<CustomerItem>()
                .HasOne(ci => ci.Item)
                .WithOne(i => i.CustomerItems)
                .HasForeignKey<CustomerItem>(ci => ci.ItemId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - CustomerItems (One to Many)
            modelBuilder.Entity<CustomerItem>()
                .HasOne(ci => ci.User)
                .WithMany(u => u.CustomerItems)
                .HasForeignKey(ci => ci.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserType - User (One to Many)
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserTypes)
                .WithMany(ut => ut.Users)
                .HasForeignKey(u => u.UserTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
