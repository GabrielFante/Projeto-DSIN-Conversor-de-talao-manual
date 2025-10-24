using DSIN.Bussiness.Models;

namespace DSIN.Bussiness.Interfaces.Repositories;

public interface IAgentRepository
{
    Task<Agent?> GetByIdAsync(Guid id, CancellationToken ct);
    Task AddAsync(Agent agent, CancellationToken ct);
}