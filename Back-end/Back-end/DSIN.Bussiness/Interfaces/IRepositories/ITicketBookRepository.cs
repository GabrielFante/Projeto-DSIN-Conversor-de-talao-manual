using Dsin.Ticketing.Domain.Entities;

namespace DSIN.Bussiness.Interfaces.Repositories;

public interface ITicketBookRepository
{
    Task<TicketBook?> GetByIdAsync(Guid id, CancellationToken ct);
    Task AddAsync(TicketBook ticket, CancellationToken ct);
    Task<IReadOnlyList<TicketBook>> ListAsync(int skip, int take, CancellationToken ct);
}