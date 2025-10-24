using DSIN.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DSIN.Data.Contexts;

public class TicketingDbContext : DbContext
{
    public TicketingDbContext(DbContextOptions<TicketingDbContext> options) : base(options) { }

    public DbSet<Agent> Agents => Set<Agent>();
    public DbSet<Driver> Drivers => Set<Driver>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<TicketBook> TicketBooks => Set<TicketBook>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasCharSet("utf8mb4").UseCollation("utf8mb4_0900_ai_ci");

        var dtoToUtc = new ValueConverter<DateTimeOffset, DateTime>(
            v => v.UtcDateTime,
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );
        modelBuilder.Entity<TicketBook>()
                    .Property(p => p.OccurredAt)
                    .HasConversion(dtoToUtc);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TicketingDbContext).Assembly);
    }
}