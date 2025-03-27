using JQueryAjaxCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace JQueryAjaxCRUD
{
    public class TransactionDbContext : DbContext
    {
        public TransactionDbContext(DbContextOptions<TransactionDbContext> options) : base(options) { }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
