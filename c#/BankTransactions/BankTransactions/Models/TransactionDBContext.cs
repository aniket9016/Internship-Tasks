using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BankTransactions.Models
{
    public class TransactionDBContext : DbContext
    {
        public TransactionDBContext(DbContextOptions<TransactionDBContext> options) : base(options)
        { }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
