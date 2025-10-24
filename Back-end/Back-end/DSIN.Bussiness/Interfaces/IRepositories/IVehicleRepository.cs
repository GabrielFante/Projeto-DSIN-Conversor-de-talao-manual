using Dsin.Ticketing.Domain.Entities;

namespace Dsin.Ticketing.Domain.Ports.Repositories;

public interface IVehicleRepository
{
    Task<Vehicle?> GetByPlateAsync(string plate, CancellationToken ct);
    Task AddAsync(Vehicle vehicle, CancellationToken ct);
}