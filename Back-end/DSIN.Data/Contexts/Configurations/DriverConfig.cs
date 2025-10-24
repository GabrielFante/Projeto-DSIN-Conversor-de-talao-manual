using DSIN.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DSIN.Data.Contexts.Configurations;

public class DriverConfig : IEntityTypeConfiguration<Driver>
{
	public void Configure(EntityTypeBuilder<Driver> b)
	{
		b.ToTable("Driver");
		b.HasKey(d => d.Id);
		b.Property(d => d.Name).HasMaxLength(150);
		b.Property(d => d.Cnh).HasMaxLength(20);
		b.HasIndex(d => d.Cnh).IsUnique(false); // pode ser nulo ou duplicado
	}
}
