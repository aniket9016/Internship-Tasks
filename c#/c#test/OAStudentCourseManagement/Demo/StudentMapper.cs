using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data
{
    public class StudentMapper : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(d => d.Age)
                .IsRequired();

            builder.Property(d => d.Email)
                .IsRequired()
                .HasMaxLength(150);

            builder.HasIndex(d => d.Email)
                .IsUnique();
        }
    }
}
