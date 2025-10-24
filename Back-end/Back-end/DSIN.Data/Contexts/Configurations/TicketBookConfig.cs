using DSIN.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DSIN.Data.Contexts.Configurations;

public class TicketBookConfig : IEntityTypeConfiguration<TicketBook>
{
    public void Configure(EntityTypeBuilder<TicketBook> b)
    {
        b.ToTable("TicketBook");
        b.HasKey(t => t.Id);

        b.Property(t => t.PlateSnapshot).HasMaxLength(10).IsRequired();
        b.Property(t => t.DriverNameSnapshot).HasMaxLength(150);
        b.Property(t => t.DriverCnhSnapshot).HasMaxLength(20);
        b.Property(t => t.VehicleModelSnapshot).HasMaxLength(100);
        b.Property(t => t.VehicleColorSnapshot).HasMaxLength(50);

        b.Property(t => t.ViolationCode).HasMaxLength(120).IsRequired();
        b.Property(t => t.ViolationDescription).HasMaxLength(500).IsRequired();
        b.Property(t => t.Location).HasMaxLength(200);

        b.HasOne(t => t.Agent).WithMany().HasForeignKey(t => t.AgentId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne(t => t.Driver).WithMany().HasForeignKey(t => t.DriverId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne(t => t.Vehicle).WithMany().HasForeignKey(t => t.VehicleId).OnDelete(DeleteBehavior.Restrict);
    }
}
