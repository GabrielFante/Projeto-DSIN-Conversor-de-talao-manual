namespace DSIN.Domain.Inter;

public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken ct);
}