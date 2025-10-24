using DSIN.Business.Interfaces.IRepositories;
using DSIN.Business.Models;
using DSIN.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DSIN.Data.Repositories;

public class AgentRepository : IAgentRepository
{
    private readonly TicketingDbContext _context;
    public AgentRepository(TicketingDbContext context) => _context = context;

    public Task<Agent?> GetByIdAsync(Guid id, CancellationToken ct)
        => _context.Agents.FirstOrDefaultAsync(a => a.Id == id, ct);

    public async Task AddAsync(Agent agent, CancellationToken ct)
        => await _context.Agents.AddAsync(agent, ct);
}
