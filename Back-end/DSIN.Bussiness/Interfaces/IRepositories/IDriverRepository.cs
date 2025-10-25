using DSIN.Bussiness.Models;

namespace DSIN.Bussiness.Interfaces.IRepositories;

public interface IDriverRepository
{
    Task<Driver?> GetByIdAsync(Guid id, CancellationToken ct);
    Task<Driver?> GetByCnhAsync(string cnh, CancellationToken ct);
    Task AddAsync(Driver driver, CancellationToken ct);
}
