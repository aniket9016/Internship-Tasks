using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Models
{
    public class EmpDBContext : DbContext
    {
        public EmpDBContext(DbContextOptions<EmpDBContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<City> Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // One-to-One: Employee - Salary
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Salary)
                .WithOne(s => s.Employee)
                .HasForeignKey<Salary>(s => s.Id);

            // One-to-Many: Department - Employees
            modelBuilder.Entity<Department>()
                .HasMany(d => d.Employees)
                .WithOne(e => e.Department)
                .HasForeignKey(e => e.DeptId);

            // One-to-Many: City - Employees
            modelBuilder.Entity<City>()
                .HasMany(c => c.Employees)
                .WithOne(e => e.City)
                .HasForeignKey(e => e.CityId);
        }
    }
}
