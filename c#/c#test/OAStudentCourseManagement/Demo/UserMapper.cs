using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data
{
    public class UserMapper : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Username)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(d => d.Password)
                .IsRequired()
                .HasMaxLength(256);

            builder.HasIndex(d => d.Username)
                .IsUnique();
        }
    }
}
