using DSIN.Business.Interfaces.IRepositories;
using DSIN.Business.Models;
using DSIN.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DSIN.Data.Repositories;

public class TicketBookRepository : ITicketBookRepository
{
    private readonly TicketingDbContext _context;
    public TicketBookRepository(TicketingDbContext context) => _context = context;

    public Task<TicketBook?> GetByIdAsync(Guid id, CancellationToken ct)
        => _context.TicketBooks
            .Include(t => t.Agent)
            .Include(t => t.Driver)
            .Include(t => t.Vehicle)
            .FirstOrDefaultAsync(t => t.Id == id, ct);

    public async Task AddAsync(TicketBook ticket, CancellationToken ct)
        => await _context.TicketBooks.AddAsync(ticket, ct);

    public async Task<IReadOnlyList<TicketBook>> ListAsync(int skip, int take, CancellationToken ct)
        => await _context.TicketBooks
            .OrderByDescending(t => t.OccurredAt)
            .Skip(skip)
            .Take(take)
            .Include(t => t.Agent)
            .Include(t => t.Driver)
            .Include(t => t.Vehicle)
            .ToListAsync(ct);
}
