using DSIN.Bussiness.Interfaces.IRepositories;
using DSIN.Bussiness.Models;
using DSIN.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DSIN.Data.Repositories;

public class DriverRepository : IDriverRepository
{
    private readonly TicketingDbContext _context;
    public DriverRepository(TicketingDbContext context) => _context = context;

    public Task<Driver?> GetByIdAsync(Guid id, CancellationToken ct)
        => _context.Drivers.FirstOrDefaultAsync(d => d.Id == id, ct);

    public Task<Driver?> GetByCnhAsync(string cnh, CancellationToken ct)
        => _context.Drivers.FirstOrDefaultAsync(d => d.Cnh == cnh, ct);

    public async Task AddAsync(Driver driver, CancellationToken ct)
        => await _context.Drivers.AddAsync(driver, ct);
}
