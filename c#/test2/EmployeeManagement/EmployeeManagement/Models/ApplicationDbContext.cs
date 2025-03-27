using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Salary> Salaries { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=TGS131;Initial Catalog=RoughEmpMan;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<City>(entity =>
        {
            entity.Property(e => e.CityName).HasMaxLength(100);
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasIndex(e => e.CityId, "IX_Employees_CityId");

            entity.HasIndex(e => e.DeptId, "IX_Employees_DeptId");

            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Name).HasMaxLength(100);

            entity.HasOne(d => d.City).WithMany(p => p.Employees).HasForeignKey(d => d.CityId);

            entity.HasOne(d => d.Dept).WithMany(p => p.Employees).HasForeignKey(d => d.DeptId);
        });

        modelBuilder.Entity<Salary>(entity =>
        {
            entity.HasIndex(e => e.EmpId, "IX_Salaries_EmpId");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Emp).WithMany(p => p.Salaries).HasForeignKey(d => d.EmpId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
