using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Collections.Generic;

namespace EmployeeDepartmentCRUD.Models
{
    public class DBContext : DbContext
    {
        public DBContext() : base("DefaultConnection") { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Employee>()
                .HasRequired(e => e.Department)   
                .WithMany(d => d.Employees)       
                .HasForeignKey(e => e.DepartmentId) 
                .WillCascadeOnDelete(false);      
        }
    }
}
