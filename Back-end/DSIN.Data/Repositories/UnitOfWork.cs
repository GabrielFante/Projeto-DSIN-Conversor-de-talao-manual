using DSIN.Business.Interfaces.IRepositories;
using DSIN.Data.Contexts;

namespace DSIN.Data.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly TicketingDbContext _context;
    public UnitOfWork(TicketingDbContext context) => _context = context;
    public Task<int> SaveChangesAsync(CancellationToken ct) => _context.SaveChangesAsync(ct);
}
