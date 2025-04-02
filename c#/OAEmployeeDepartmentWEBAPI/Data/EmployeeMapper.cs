using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class EmployeeMapper : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.EmployeeName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.DateOfBirth)
                .IsRequired();

            builder.Property(e => e.Address)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(e => e.Phone)
                .IsRequired()
                .HasMaxLength(15);

            builder.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(e => e.ProfilePic)
                .HasMaxLength(255);
        }
    }
}
