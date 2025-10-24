using Dsin.Ticketing.Domain.Entities;

namespace DSIN.Bussiness.Interfaces.Repositories;

public interface IDriverRepository
{
    Task<Driver?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<Driver?> GetByCnhAsync(string cnh, CancellationToken ct);
    Task AddAsync(Driver driver, CancellationToken ct);
}
