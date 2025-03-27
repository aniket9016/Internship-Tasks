using Microsoft.EntityFrameworkCore;

namespace MovieDemo.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
    }
}
