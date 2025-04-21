using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Disease> Diseases { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PatientVisit> PatientVisits { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<PrescriptionItem> PrescriptionItems { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Appointment
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            // Billing
            modelBuilder.Entity<Billing>()
                .HasOne(b => b.Patient)
                .WithMany(p => p.Billings)
                .HasForeignKey(b => b.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.Doctor)
                .WithMany(d => d.Billings)
                .HasForeignKey(b => b.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.Department)
                .WithMany()
                .HasForeignKey(b => b.DepartmentId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Billing>()
                .HasOne(b => b.PatientVisit)
                .WithMany(pv => pv.Billings)
                .HasForeignKey(b => b.PatientVisitId)
                .OnDelete(DeleteBehavior.SetNull);

            // Department
            modelBuilder.Entity<Department>()
                .HasMany(d => d.Doctors)
                .WithOne(doc => doc.Department)
                .HasForeignKey(doc => doc.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Disease
            modelBuilder.Entity<Disease>()
                .HasOne(d => d.Department)
                .WithMany()
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Disease>()
                .HasMany(d => d.PatientVisits)
                .WithOne(pv => pv.Disease)
                .HasForeignKey(pv => pv.DiseaseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Disease>()
                .HasMany(d => d.MedicalRecords)
                .WithOne(mr => mr.Disease)
                .HasForeignKey(mr => mr.DiseaseId)
                .OnDelete(DeleteBehavior.SetNull);

            // Doctor
            modelBuilder.Entity<Doctor>()
                .HasMany(d => d.Schedules)
                .WithOne(s => s.Doctor)
                .HasForeignKey(s => s.DoctorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Doctor>()
                .HasMany(d => d.Prescriptions)
                .WithOne(p => p.Doctor)
                .HasForeignKey(p => p.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            // MedicalRecord
            modelBuilder.Entity<MedicalRecord>()
                .HasOne(m => m.Patient)
                .WithMany(p => p.MedicalRecords)
                .HasForeignKey(m => m.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            // PatientVisit
            modelBuilder.Entity<PatientVisit>()
                .HasOne(pv => pv.Patient)
                .WithMany(p => p.PatientVisits)
                .HasForeignKey(pv => pv.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PatientVisit>()
                .HasOne(pv => pv.Doctor)
                .WithMany(d => d.PatientVisits)
                .HasForeignKey(pv => pv.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PatientVisit>()
                .HasOne(pv => pv.Appointment)
                .WithMany()
                .HasForeignKey(pv => pv.AppointmentId)
                .OnDelete(DeleteBehavior.SetNull);

            // Prescription
            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.Patient)
                .WithMany(pat => pat.Prescriptions)
                .HasForeignKey(p => p.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Prescription>()
                .HasOne(p => p.PatientVisit)
                .WithMany(pv => pv.Prescriptions)
                .HasForeignKey(p => p.PatientVisitId)
                .OnDelete(DeleteBehavior.Restrict);

            // PrescriptionItem
            modelBuilder.Entity<PrescriptionItem>()
                .HasOne(pi => pi.Medicine)
                .WithMany(m => m.PrescriptionItems)
                .HasForeignKey(pi => pi.MedicineId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PrescriptionItem>()
                .HasOne(pi => pi.Prescription)
                .WithMany(p => p.PrescriptionItems)
                .HasForeignKey(pi => pi.PrescriptionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
