using DSIN.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DSIN.Data.Contexts.Configurations;

public class VehicleConfig : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.ToTable("Vehicle");
        builder.HasKey(v => v.Id);
        builder.Property(v => v.Plate).HasMaxLength(10).IsRequired();
        builder.Property(v => v.Model).HasMaxLength(100).IsRequired();
        builder.Property(v => v.Color).HasMaxLength(50).IsRequired();
        builder.HasIndex(v => v.Plate).IsUnique();
    }
}
