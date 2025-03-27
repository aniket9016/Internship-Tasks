using Microsoft.EntityFrameworkCore;

namespace jQueryAjaxCRUDInASPNETCore.Models
{
    public class TransactionDBContext:DbContext
    {
        public TransactionDBContext(DbContextOptions<TransactionDBContext> options) : base(options) { }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
