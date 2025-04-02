using EmployeeWEBAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ProductWEBAPI.Models
{
    public class AppDbcontext:DbContext
    {
        public AppDbcontext(DbContextOptions<AppDbcontext> options):base(options) { }

        public DbSet<Employee> Employees{ get; set; }
    }
}
