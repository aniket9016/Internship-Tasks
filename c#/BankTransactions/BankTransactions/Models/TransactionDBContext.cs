using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BankTransactions.Models; 

public class TransactionDBContext : IdentityDbContext<ApplicationUser>
{
    public TransactionDBContext(DbContextOptions<TransactionDBContext> options) : base(options) { }

    public DbSet<Transaction> Transactions { get; set; } 

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Ensure AccountNumber is unique
        builder.Entity<ApplicationUser>()
            .HasIndex(u => u.AccountNumber)
            .IsUnique();
    }
}
