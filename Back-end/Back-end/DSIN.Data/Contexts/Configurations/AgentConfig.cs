using DSIN.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DSIN.Data.Contexts.Configurations;

public class AgentConfig : IEntityTypeConfiguration<Agent>
{
    public void Configure(EntityTypeBuilder<Agent> b)
    {
        b.ToTable("Agent");
        b.HasKey(a => a.Id);
        b.Property(a => a.Name).HasMaxLength(150).IsRequired();
        b.Property(a => a.Email).HasMaxLength(150).IsRequired();
        b.Property(a => a.PasswordHash).HasMaxLength(256).IsRequired();
        b.HasIndex(a => a.Email).IsUnique();
    }
}
